import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

/* =========================================================
   ADROIT SERVICE PERFORMANCE DASHBOARD  (Zoho Creator widget)

   Everything lives in this single file:

     1. CONFIG                 report link names + parity switches
     2. Date / value helpers
     3. Creator data layer     sequential, cursor pagination, cache
     4. Calculations           the 32 former Deluge functions
     5. Original page CSS      copied verbatim from the Deluge page
     6. UI                     same markup / class names as the Deluge page

   Architecture:
     ZOHO.CREATOR.DATA.getRecords()  ->  React state  ->  JS calculations
     -> the original dashboard markup.

   No Deluge functions, no invokeCustomApi, no embeddedApp.init(),
   and no Promise.all: exactly ONE Creator request is in flight at a time.
========================================================= */

/* =========================================================
   1. CONFIGURATION
========================================================= */

const CONFIG = {
  REPORTS: {
    SERVICE_CALL_LOG: "Service_Call_Logs",
    SERVICE_REPORT: "All_Service_Reports",
    SERVICE_FEEDBACK: "All_Service_Feedback1",
    FIELD_EXECUTIVE: "Field_Executives",
    EMPLOYEES: "All_Employees",
    SERVICE_QUOTATION: "Service_Quotations",
    SERVICE_INVOICE: "Service_Invoice_Follow_up_Un_paid",
    REJECTION_REPLACEMENT: "Rejection_And_Replacement_Register_Report",
    STANDBY_UNIT: "Stand_By_Unit1",
    AMC_CONTRACT: "All_Amc_Contracts",
    PRODUCT: "All_Product",
    EXPENSE_ENGINEER: "Expense_of_Engineer_Report",
    REWORK: "All_Reworks",
    TRAINING_REPORT: "Training_Reports",
    TOOL_KIT: "Production_Tool_Kit_of_Engineers1",
    VEHICLE_SERVICE: "Vehicle_Service_Reports",
    INTERNAL_CALIBRATION: "Internal_Calibrations",
  },

  PAGE_SIZE: 1000,

  // Employees.Department_Role record that identifies service engineers
  // (hard-coded in the Deluge functions).
  SERVICE_DEPARTMENT_ROLE_ID: "302392000000624113",

  // Deluge's toStartOfWeek(): 1 = Monday, 0 = Sunday.
  // TODO: confirm against the live Deluge dashboard.
  WEEK_STARTS_ON: 1,

  // true  = reproduce the Deluge expression literally (parity with the current dashboard)
  // false = use the evidently intended meaning
  PARITY: {
    // customerRegretCases: `ID != null && Rating == "2" || Rating == "1" && Call_attended_date == today`
    // -> Rating 2 is NOT limited to today, only Rating 1 is.
    regretCasesPrecedence: true,
    // expenseBreakdown: the rework total is added INSIDE the per-expense-record
    // loop, so it is multiplied by the number of expense records.
    expenseReworkInsideLoop: true,
  },

  // Console diagnostics per dataset (turn off once the widget is verified).
  DEBUG: true,
};

const R = CONFIG.REPORTS;

/* =========================================================
   2. DATE / VALUE HELPERS
========================================================= */

const MONTH_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const MONTH_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const DAY_MS = 86400000;

const pad2 = (n) => String(n).padStart(2, "0");
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addYears = (d, n) => new Date(d.getFullYear() + n, d.getMonth(), d.getDate());
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0);
const startOfYear = (d) => new Date(d.getFullYear(), 0, 1);
const startOfWeek = (d) => addDays(startOfDay(d), -((d.getDay() - CONFIG.WEEK_STARTS_ON + 7) % 7));
const minDate = (a, b) => (a < b ? a : b);
const daysBetween = (from, to) => Math.round((startOfDay(to) - startOfDay(from)) / DAY_MS);

/**
 * Creator returns dates as text in the app's date format
 * (dd-MMM-yyyy, dd-MM-yyyy, yyyy-MM-dd ...; date-times add HH:mm[:ss]).
 * Parsed explicitly instead of via `new Date(string)`, which is
 * implementation-defined for these formats.
 */
function parseDateTime(value) {
  if (value === null || value === undefined || value === "") return null;
  if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;

  const s = String(value).trim();
  const time = "(?:[ T,]+(\\d{1,2}):(\\d{2})(?::(\\d{2}))?)?";
  let m;
  let y;
  let mo;
  let d;

  if ((m = s.match(new RegExp("^(\\d{4})[-/.](\\d{1,2})[-/.](\\d{1,2})" + time)))) {
    y = +m[1];
    mo = +m[2] - 1;
    d = +m[3];
  } else if ((m = s.match(new RegExp("^(\\d{1,2})[-/. ]([A-Za-z]{3,9})[-/. ,]+(\\d{2,4})" + time)))) {
    mo = MONTH_SHORT.findIndex((n) => n.toLowerCase() === m[2].slice(0, 3).toLowerCase());
    if (mo < 0) return null;
    d = +m[1];
    y = +m[3];
  } else if ((m = s.match(new RegExp("^(\\d{1,2})[-/.](\\d{1,2})[-/.](\\d{2,4})" + time)))) {
    d = +m[1];
    mo = +m[2] - 1;
    y = +m[3];
  } else {
    return null;
  }

  if (y < 100) y += 2000;
  if (mo < 0 || mo > 11 || d < 1 || d > 31) return null;

  return new Date(y, mo, d, +(m[4] || 0), +(m[5] || 0), +(m[6] || 0));
}

function parseDate(value) {
  const d = parseDateTime(value);
  return d ? startOfDay(d) : null;
}

const sameDay = (value, day) => {
  const d = parseDate(value);
  return d !== null && d.getTime() === day.getTime();
};
const inRange = (value, from, to) => {
  const d = parseDate(value);
  return d !== null && d >= from && d <= to;
};
const onOrBefore = (value, day) => {
  const d = parseDate(value);
  return d !== null && d <= day;
};
const onOrAfter = (value, day) => {
  const d = parseDate(value);
  return d !== null && d >= day;
};

const fmtDate = (d) => (d ? `${pad2(d.getDate())}-${pad2(d.getMonth() + 1)}-${d.getFullYear()}` : "");
const fmtDateMon = (d) => (d ? `${pad2(d.getDate())}-${MONTH_SHORT[d.getMonth()]}-${d.getFullYear()}` : "");
const fmtDateSpaced = (d) => (d ? `${pad2(d.getDate())} ${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}` : "");

/* ---- value helpers -------------------------------------------------- */

const isBlank = (v) =>
  v === null ||
  v === undefined ||
  v === "" ||
  (Array.isArray(v) && v.length === 0) ||
  (typeof v === "object" && !Array.isArray(v) && Object.keys(v).length === 0);
const hasValue = (v) => !isBlank(v);

/** Lookup field -> record ID ({ ID, display_value }). */
function lookupId(v) {
  if (v === null || v === undefined || v === "") return "";
  if (typeof v === "object") return v.ID !== undefined ? String(v.ID) : v.id !== undefined ? String(v.id) : "";
  return String(v);
}

/** Text of a field; for a lookup it is the display value. */
function text(v) {
  if (v === null || v === undefined) return "";
  if (Array.isArray(v)) return v.map(text).join(", ");
  if (typeof v === "object") {
    const d = v.display_value ?? v.zc_display_value;
    return d === undefined || d === null ? "" : String(d);
  }
  return String(v);
}

function num(v) {
  if (v === null || v === undefined || v === "") return 0;
  const n = typeof v === "number" ? v : Number(String(v).replace(/,/g, "").trim());
  return Number.isFinite(n) ? n : 0;
}

/** Deluge `.toNumber()` on a rating; NaN when it is not numeric. */
function rating(v) {
  const s = text(v).trim();
  if (s === "") return NaN;
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

const isTrue = (v) => v === true || String(v).toLowerCase() === "true";
const asRows = (v) => (Array.isArray(v) ? v : []);
const sum = (list, fn) => list.reduce((acc, item) => acc + fn(item), 0);
const round = (n, places = 1) => {
  const p = 10 ** places;
  return Math.round((n + Number.EPSILON) * p) / p;
};
const natureOf = (rec) => text(rec.Nature_Of_Calls);

function countBy(list, keyFn) {
  const map = new Map();
  list.forEach((item) => {
    const key = keyFn(item);
    map.set(key, (map.get(key) || 0) + 1);
  });
  return map;
}

/* =========================================================
   3. CREATOR DATA LAYER
   - one request in flight at any time (single promise chain)
   - sequential record_cursor pagination
   - each dataset fetched once, then cached
   - HTTP 400 = "no records" -> empty dataset (the data appears as
     soon as the report has records)
========================================================= */

const criteriaDate = fmtDateMon;

/**
 * stage:    which tab first needs the dataset (loaded lazily per tab)
 * criteria: OPTIONAL server-side narrowing for growth-prone reports. The
 *           calculations always re-filter in JS, so if Creator rejects a
 *           criteria string the report is simply re-fetched unfiltered.
 * fields:   top-level fields the calculations read (diagnostics only).
 */
const DATASETS = {
  /* ---- today: also shared by weekly / monthly ---- */
  serviceCallLogs: {
    report: R.SERVICE_CALL_LOG,
    label: "Service Call Log",
    stage: "today",
    // Year-to-date (repeat-call trend) or pending at any age (pending > 48 hrs).
    criteria: (today) =>
      `(Date_field >= "${criteriaDate(minDate(startOfYear(today), startOfWeek(today)))}" || Status == "Pending")`,
    fields: [
      "Date_field", "Status", "Customer_Name", "Service_Engineer_Name",
      "Nature_Of_Calls", "Repeat_Call_Reason", "Service_Call_Log_No",
    ],
  },
  serviceReports: {
    report: R.SERVICE_REPORT,
    label: "Service Report",
    stage: "today",
    criteria: (today) =>
      `(Call_Attended_Date >= "${criteriaDate(minDate(startOfWeek(today), startOfMonth(today)))}" || Added_Time >= "${criteriaDate(startOfMonth(today))} 00:00:00")`,
    fields: [
      "Call_Attended_Date", "Call_Received_Date", "Service_Call_Log",
      "Service_Engineer_Name", "Status", "Product", "Added_Time", "Spare_Replaced",
    ],
  },
  feedbacks: {
    report: R.SERVICE_FEEDBACK,
    label: "Service Feedback",
    stage: "today",
    fields: ["Company_Name", "Rating", "Call_attended_date", "Any_additional_comments_or_suggestions_would_be_appreciated1"],
  },
  fieldExecutives: {
    report: R.FIELD_EXECUTIVE,
    label: "Field Executive",
    stage: "today",
    fields: ["Date_field", "Leave_Break", "Employee_Name", "Did_you_collect_google_rating"],
  },
  employees: {
    report: R.EMPLOYEES,
    label: "Employees",
    stage: "today",
    fields: ["Employee_Name", "Department_Role"],
  },
  quotations: {
    report: R.SERVICE_QUOTATION,
    label: "Service Quotation",
    stage: "today",
    fields: ["Date_field", "Status", "Customer_Name", "Nature_of_Calls"],
  },
  invoices: {
    report: R.SERVICE_INVOICE,
    label: "Service Invoice",
    stage: "today",
    fields: ["Date_field", "Customer", "Final_Total", "Spare_Amount", "Service_Amount", "Service_Call_Log"],
  },

  /* ---- weekly ---- */
  replacements: {
    report: R.REJECTION_REPLACEMENT,
    label: "Rejection & Replacement",
    stage: "weekly",
    fields: ["Department", "Date_field", "Status"],
  },
  standbyUnits: {
    report: R.STANDBY_UNIT,
    label: "Stand By Unit",
    stage: "weekly",
    fields: ["StandBy_To", "Outward_Date", "Inward_Date"],
  },
  amcContracts: {
    report: R.AMC_CONTRACT,
    label: "AMC Contract",
    stage: "weekly",
    fields: ["Quotation_Number"],
  },
  products: {
    report: R.PRODUCT,
    label: "Product",
    stage: "weekly",
    criteria: () => "Is_Red_Tag_Material == true",
    fields: ["Product_Name", "Is_Red_Tag_Material"],
  },

  /* ---- monthly ---- */
  engineerExpenses: {
    report: R.EXPENSE_ENGINEER,
    label: "Engineer Expense",
    stage: "monthly",
    fields: ["Date_field1234567890", "Service_Engineer_Name", "Overall_Engineer", "Material_Replaced1"],
  },
  reworks: {
    report: R.REWORK,
    label: "Rework",
    stage: "monthly",
    fields: ["Date_field", "Approximate_Cost"],
  },
  trainingReports: {
    report: R.TRAINING_REPORT,
    label: "Training Report",
    stage: "monthly",
    fields: ["Report"],
  },
  toolReports: {
    report: R.TOOL_KIT,
    label: "Tool Kit",
    stage: "monthly",
    fields: ["Month_field", "Status", "Service_Tools_Kit_of_Engineers"],
  },
  vehicleReports: {
    report: R.VEHICLE_SERVICE,
    label: "Vehicle Service",
    stage: "monthly",
    fields: ["Month_field", "Status", "Service_Tools_Kit_of_Engineers|Report"],
  },
  calibrationRecords: {
    report: R.INTERNAL_CALIBRATION,
    label: "Internal Calibration",
    stage: "monthly",
    fields: [
      "UUC_E", "Meter_Type", "Meter_Make", "Meter_S", "Calibration_Type",
      "Rev_Date", "Approved_By", "Tested_By", "Rev_No",
    ],
  },
};

const stageKeys = (stage) => Object.keys(DATASETS).filter((key) => DATASETS[key].stage === stage);

// One Creator request at a time, across every dataset and every tab.
let requestChain = Promise.resolve();
const datasetCache = new Map();
// "unknown" -> "ok" | "unsupported": does getRecords accept field_config?
const runtime = { fieldConfig: "unknown" };

// Console diagnostics (CONFIG.DEBUG): window.__ADROIT_DEBUG__
//   .datasets  per-report request info      .data     raw records per dataset
//   .results   every headline value per tab .text()   the same as tab-separated text
const debugStore = { datasets: {}, data: {}, results: {} };
debugStore.text = () =>
  Object.values(debugStore.results)
    .flat()
    .map((r) => `${r.tab}\t${r.label}\t${r.value}`)
    .join("\n");
if (typeof window !== "undefined") window.__ADROIT_DEBUG__ = debugStore;

function enqueue(task) {
  const result = requestChain.then(task);
  requestChain = result.catch(() => undefined);
  return result;
}

function describeError(error) {
  if (!error) return "unknown error";
  if (typeof error === "string") return error;
  if (error.message) return error.code ? `${error.code}: ${error.message}` : error.message;
  try {
    return JSON.stringify(error);
  } catch (e) {
    return String(error);
  }
}

/** All pages of one report, strictly one after another. */
async function fetchAllPages(reportName, criteria, useFieldConfig) {
  const records = [];
  let cursor = null;

  do {
    const config = { report_name: reportName, max_records: CONFIG.PAGE_SIZE };
    // By default Creator only returns the report's quick-view columns;
    // "all" also brings back fields/subforms that are not on the report grid.
    if (useFieldConfig) config.field_config = "all";
    if (criteria) config.criteria = criteria;
    if (cursor) config.record_cursor = cursor;

    const response = await window.ZOHO.CREATOR.DATA.getRecords(config);
    const rows = response?.data || [];
    records.push(...rows);
    cursor = response?.record_cursor || null;

    if (!cursor && rows.length >= CONFIG.PAGE_SIZE) {
      console.warn(`[Creator] ${reportName}: got ${rows.length} records and no record_cursor - the list may be truncated.`);
    }
  } while (cursor);

  return records;
}

/**
 * Creator answers HTTP 400 both for "no records" and for parameters it does
 * not accept, so a failed request is retried with progressively fewer
 * options (criteria, then field_config) before the dataset is called empty.
 */
async function fetchWithFallback(def, criteria, meta) {
  const wantFieldConfig = runtime.fieldConfig !== "unsupported";

  try {
    const records = await fetchAllPages(def.report, criteria, wantFieldConfig);
    if (wantFieldConfig) runtime.fieldConfig = "ok";
    return records;
  } catch (error) {
    meta.error = describeError(error);
  }

  if (criteria) {
    meta.criteriaRejected = true;
    try {
      const records = await fetchAllPages(def.report, "", wantFieldConfig);
      if (wantFieldConfig) runtime.fieldConfig = "ok";
      return records;
    } catch (error) {
      meta.error = describeError(error);
    }
  }

  if (wantFieldConfig && runtime.fieldConfig !== "ok") {
    try {
      const records = await fetchAllPages(def.report, "", false);
      runtime.fieldConfig = "unsupported";
      meta.fieldConfigRejected = true;
      return records;
    } catch (error) {
      meta.error = describeError(error);
    }
  }

  return [];
}

function auditFields(key, def, records) {
  if (!records.length || !def.fields) return;

  const present = new Set();
  records.forEach((rec) => Object.keys(rec || {}).forEach((k) => present.add(k)));

  const missing = def.fields.filter((f) => !f.split("|").some((name) => present.has(name)));
  if (missing.length) {
    console.warn(
      `[Creator] ${key} (${def.report}): field(s) not returned - ${missing.join(", ")}. ` +
        "Check the field link names / the report's columns. Returned fields: " +
        [...present].join(", "),
    );
  }
}

async function requestDataset(key, def, criteria) {
  const started = Date.now();
  const meta = {
    report: def.report,
    criteria: criteria || null,
    count: 0,
    ms: 0,
    error: null,
    criteriaRejected: false,
    fieldConfigRejected: false,
  };

  const records = await fetchWithFallback(def, criteria, meta);

  meta.count = records.length;
  meta.ms = Date.now() - started;
  if (records.length) meta.error = null;
  debugStore.datasets[key] = meta;
  debugStore.data[key] = records;

  if (CONFIG.DEBUG) {
    const notes = [];
    if (meta.criteriaRejected) notes.push("criteria rejected -> loaded unfiltered");
    if (meta.fieldConfigRejected) notes.push("field_config rejected");
    if (!records.length) notes.push(meta.error ? `no records (${meta.error})` : "no records");
    console.log(
      `[Creator] ${def.label} (${def.report}): ${records.length} records in ${meta.ms} ms` +
        (notes.length ? ` - ${notes.join("; ")}` : ""),
    );
    auditFields(key, def, records);
  }

  return records;
}

function loadDataset(key, today) {
  const def = DATASETS[key];
  const criteria = def.criteria ? def.criteria(today) : "";
  const cacheKey = `${key}|${criteria}`;

  if (!datasetCache.has(cacheKey)) {
    datasetCache.set(cacheKey, enqueue(() => requestDataset(key, def, criteria)));
  }
  return datasetCache.get(cacheKey);
}

/* =========================================================
   4. CALCULATIONS  (the former Deluge functions)
   Each one is a pure function of the fetched datasets and "today".
========================================================= */

const serviceEngineers = (D) =>
  (D.employees || []).filter((e) => lookupId(e.Department_Role) === CONFIG.SERVICE_DEPARTMENT_ROLE_ID);

/** Bar height in px: scaled, at least 10 when there is a value, 2 when zero. */
function barHeight(value, maxValue, maxBar) {
  let h = round((value * maxBar) / maxValue, 1);
  if (value > 0 && h < 10) h = 10;
  if (h === 0) h = 2;
  return h;
}

/* ---------- TODAY ---------- */

/** serviceOverviewDashboard.tileSectionTodayFunc() */
function calcTodayTiles(D, today) {
  const callLogs = D.serviceCallLogs || [];
  const feedbacks = D.feedbacks || [];
  const isToday = (v) => sameDay(v, today);

  const total_calls_today = callLogs.filter((c) => isToday(c.Date_field)).length;

  const leaveList = ["Emergency Leave", "Informed Leave"];
  const executives_act_today = (D.fieldExecutives || []).filter(
    (f) => isToday(f.Date_field) && !leaveList.includes(text(f.Leave_Break)),
  ).length;

  // Completed call logs that have a service report attended today (each call log once).
  const completedIds = new Set(callLogs.filter((c) => text(c.Status) === "Completed").map((c) => String(c.ID)));
  const reportedIds = new Set();
  (D.serviceReports || []).forEach((r) => {
    if (!isToday(r.Call_Attended_Date)) return;
    const id = lookupId(r.Service_Call_Log);
    if (id && completedIds.has(id)) reportedIds.add(id);
  });

  const quot_sent_today = (D.quotations || []).filter(
    (q) => isToday(q.Date_field) && text(q.Status) === "Sent",
  ).length;

  const cust_feedback_rec = feedbacks.filter((f) => hasValue(f.Company_Name) && isToday(f.Call_attended_date)).length;

  const twoDaysBefore = addDays(today, -2);
  const pending_calls = callLogs.filter(
    (c) => text(c.Status) === "Pending" && onOrBefore(c.Date_field, twoDaysBefore),
  ).length;

  const rated = (f, value) => text(f.Rating) === value;
  const customer_regret_cases_count = feedbacks.filter((f) =>
    CONFIG.PARITY.regretCasesPrecedence
      ? rated(f, "2") || (rated(f, "1") && isToday(f.Call_attended_date))
      : (rated(f, "1") || rated(f, "2")) && isToday(f.Call_attended_date),
  ).length;

  // Customers with two or more pending calls logged today.
  const pendingToday = countBy(
    callLogs.filter((c) => isToday(c.Date_field) && text(c.Status) === "Pending"),
    (c) => lookupId(c.Customer_Name),
  );
  let repeated_calls_count = 0;
  pendingToday.forEach((n, customerId) => {
    if (customerId && n >= 2) repeated_calls_count += 1;
  });

  const invoicesToday = (D.invoices || []).filter((i) => isToday(i.Date_field) && hasValue(i.Customer));

  return {
    total_calls_today,
    executives_act_today,
    service_reports_submitted_count: reportedIds.size,
    quot_sent_today,
    cust_feedback_rec,
    pending_calls,
    customer_regret_cases_count,
    repeated_calls_count,
    invoices_gen_today: invoicesToday.length,
    total_invoiced_amt_today: round(sum(invoicesToday, (i) => num(i.Final_Total)), 2),
  };
}

/** serviceOverviewDashboard.executivePerformanceToday() */
function calcExecutivePerformance(D, today) {
  const reports = (D.serviceReports || []).filter((r) => sameDay(r.Call_Attended_Date, today));

  const rows = serviceEngineers(D).map((eng) => {
    const mine = reports.filter((r) => lookupId(r.Service_Engineer_Name) === String(eng.ID));
    return {
      Engineer_Name: text(eng.Employee_Name),
      assignedToday: mine.length,
      completedToday: mine.filter((r) => text(r.Status) === "Completed").length,
    };
  });

  let maxValue = 0;
  rows.forEach((r) => {
    maxValue = Math.max(maxValue, r.assignedToday, r.completedToday);
  });
  if (maxValue === 0) maxValue = 1;
  else if (maxValue < 10) maxValue = 10;

  return rows.map((r) => ({
    ...r,
    assignedHeight: barHeight(r.assignedToday, maxValue, 155),
    completedHeight: barHeight(r.completedToday, maxValue, 155),
  }));
}

/** serviceOverviewDashboard.invoiceAmountTrendToday() */
function calcInvoiceTrend(D, today) {
  const invoicesToday = (D.invoices || []).filter((i) => sameDay(i.Date_field, today));
  const callLogs = D.serviceCallLogs || [];
  const byId = new Map(callLogs.map((c) => [String(c.ID), c]));
  const byNumber = new Map(callLogs.map((c) => [text(c.Service_Call_Log_No), c]));

  let amc = 0;
  let installation = 0;
  let repair = 0;
  invoicesToday.forEach((inv) => {
    const call = byId.get(lookupId(inv.Service_Call_Log)) || byNumber.get(text(inv.Service_Call_Log));
    const nature = call ? natureOf(call) : "";
    const amount = num(inv.Final_Total);
    if (nature === "AMC") amc += amount;
    else if (nature === "Installation") installation += amount;
    else if (nature === "Repair") repair += amount;
  });

  const amounts = {
    amc_amt: round(amc, 2),
    installtion_amt: round(installation, 2),
    repair_amt: round(repair, 2),
    service_amt: round(sum(invoicesToday, (i) => num(i.Service_Amount)), 2),
    spares_amt: round(sum(invoicesToday, (i) => num(i.Spare_Amount)), 2),
  };

  let maxValue = Math.max(0, ...Object.values(amounts));
  if (maxValue === 0) maxValue = 1;
  else if (maxValue < 10000) maxValue = 10000;

  return {
    ...amounts,
    amc_height: barHeight(amounts.amc_amt, maxValue, 180),
    install_height: barHeight(amounts.installtion_amt, maxValue, 180),
    repair_height: barHeight(amounts.repair_amt, maxValue, 180),
    service_height: barHeight(amounts.service_amt, maxValue, 180),
    spares_height: barHeight(amounts.spares_amt, maxValue, 180),
  };
}

/** serviewOverviewOverallDashboard.repeatCallsReasonBreakdownTodayFunc() */
function calcRepeatReasons(D, today) {
  let knowledge = 0;
  let parts = 0;
  let power = 0;
  let total = 0;

  (D.serviceCallLogs || [])
    .filter((c) => sameDay(c.Date_field, today))
    .forEach((c) => {
      const reason = text(c.Repeat_Call_Reason);
      if (reason === "") return;
      total += 1;
      if (reason === "Lack of Knowledge") knowledge += 1;
      else if (reason === "Parts Unavailability") parts += 1;
      else if (reason === "Power Issue") power += 1;
    });

  const pct = (n) => (total > 0 ? (n * 100) / total : 0);
  return {
    lackOfKnowledge: pct(knowledge),
    partsUnavailability: pct(parts),
    powerIssue: pct(power),
    totalRepeatCalls: total,
  };
}

/** serviewOverviewOverallDashboard.getServiceFeedbackTrend()  (all-time, as in Deluge) */
function calcFeedbackTrend(D) {
  const records = (D.feedbacks || []).filter((f) => hasValue(f.Company_Name) && hasValue(f.Rating));
  if (!records.length) return { average_rating: 0, percentage: 0, total_count: 0 };

  const average = sum(records, (f) => num(f.Rating)) / records.length;
  return {
    average_rating: round(average, 1),
    percentage: round((average / 5) * 100, 1),
    total_count: records.length,
  };
}

/* ---------- WEEKLY ---------- */

/** weeklyServiceOverview.getWeeklyGoogleReviewCount() */
function calcGoogleReviewCount(D, today) {
  const from = startOfWeek(today);
  return (D.fieldExecutives || []).filter(
    (f) =>
      inRange(f.Date_field, from, today) &&
      hasValue(f.Employee_Name) &&
      text(f.Did_you_collect_google_rating) === "Yes",
  ).length;
}

/**
 * weeklyServiceOverview.engineerWiseCallAttended()
 * + avgCallsAttendedPerEngineerWeekly()  (bar heights)
 *
 * The dashboard markup reads engineerWiseCallAttended() (Completed / Pending
 * counted separately) and the segment heights come from the height logic of
 * avgCallsAttendedPerEngineerWeekly(). That function's own `completed` count
 * (`... && Status == "Completed" || Status == "Closed"`) is NOT used by the
 * markup, so its precedence problem is not carried over.
 */
function calcEngineerWeekly(D, today) {
  const from = startOfWeek(today);
  const calls = (D.serviceCallLogs || []).filter((c) => inRange(c.Date_field, from, today));
  const engineers = serviceEngineers(D);

  let totalCalls = 0;
  const perEngineer = engineers.map((eng) => {
    const mine = calls.filter((c) => lookupId(c.Service_Engineer_Name) === String(eng.ID));
    const total = mine.length;
    const completed = mine.filter((c) => text(c.Status) === "Completed").length;
    const pending = mine.filter((c) => text(c.Status) === "Pending").length;
    totalCalls += total;

    let completedPercent = 0;
    let pendingPercent = 0;
    if (total > 0) {
      completedPercent = round((completed * 100) / total, 1);
      pendingPercent = round((pending * 100) / total, 1);
    }
    if (completed > 0 && completedPercent < 5) completedPercent = 5;
    if (pending > 0 && pendingPercent < 5) pendingPercent = 5;

    const totalPercent = completedPercent + pendingPercent;
    if (totalPercent > 100) {
      completedPercent = round((completedPercent * 100) / totalPercent, 1);
      pendingPercent = round((pendingPercent * 100) / totalPercent, 1);
    }

    return {
      engineer_id: eng.ID,
      engineer_name: text(eng.Employee_Name),
      total_calls_this_week: total,
      calls_completed: completed,
      calls_pending: pending,
      completed_height: completedPercent,
      pending_height: pendingPercent,
    };
  });

  return {
    from_date: from,
    to_date: today,
    per_engineer: perEngineer,
    total_calls: totalCalls,
    num_engineers: engineers.length,
    average_calls_per_engineer_week: engineers.length > 0 ? round(totalCalls / engineers.length, 1) : 0,
  };
}

/** weeklyServiceOverview.repeatCallPercentageWeekly()  (rolling 7 days, as in Deluge) */
function calcRepeatCallPercentWeekly(D, today) {
  const from = addDays(today, -6);
  const calls = (D.serviceCallLogs || []).filter(
    (c) => hasValue(c.Customer_Name) && inRange(c.Date_field, from, today) && text(c.Status) !== "Pending",
  );
  if (calls.length === 0) return 0;

  let repeated = 0;
  countBy(calls, (c) => lookupId(c.Customer_Name)).forEach((n) => {
    if (n > 1) repeated += n; // every call of a repeating customer counts
  });
  return round((repeated * 100) / calls.length, 1);
}

/** weeklyServiceOverview.customerRegretPercentageWeekly() */
function calcCustomerRegretPercentWeekly(D, today) {
  const from = startOfWeek(today);
  const weekly = (D.feedbacks || []).filter(
    (f) => hasValue(f.Company_Name) && inRange(f.Call_attended_date, from, today),
  );
  if (weekly.length === 0) return 0;

  const regret = weekly.filter((f) => ["1", "2", "3"].includes(text(f.Rating))).length;
  return (regret * 100) / weekly.length;
}

/** weeklyServiceOverview.amcLeadsGenerated() */
function calcAmcLeads(D, today) {
  const from = startOfWeek(today);
  return (D.serviceCallLogs || []).filter(
    (c) => natureOf(c) === "AMC" && inRange(c.Date_field, from, today) && text(c.Status) === "Completed",
  ).length;
}

/** weeklyServiceOverview.pendingReplacements() */
function calcPendingReplacements(D, today) {
  const from = startOfWeek(today);
  return (D.replacements || []).filter(
    (r) => text(r.Department) === "Service" && inRange(r.Date_field, from, today) && text(r.Status) === "Pending",
  ).length;
}

/** weeklyServiceOverview.standbyUnitPending() */
function calcStandbyPending(D, today) {
  const from = startOfWeek(today);
  return (D.standbyUnits || []).filter(
    (s) => hasValue(s.StandBy_To) && inRange(s.Outward_Date, from, today) && isBlank(s.Inward_Date),
  ).length;
}

/**
 * weeklyServiceOverview.pendingCallAging()
 * Up to four weekly windows inside the current month.
 * Age = whole days between the window end and the day the call was logged.
 */
function calcPendingAging(D, today) {
  const monthStart = startOfMonth(today);
  const pending = (D.serviceCallLogs || []).filter((c) => text(c.Status) === "Pending");
  const weeks = [];

  [0, 7, 14, 21].forEach((offset) => {
    const end = addDays(today, -offset);
    if (offset > 0 && end < monthStart) return;

    let start = startOfWeek(end);
    if (start < monthStart) start = monthStart;

    let d0to2 = 0;
    let d3to5 = 0;
    let dAbove5 = 0;
    pending
      .filter((c) => inRange(c.Date_field, start, end))
      .forEach((c) => {
        const age = Math.abs(daysBetween(end, parseDate(c.Date_field)));
        if (age <= 2) d0to2 += 1;
        else if (age <= 5) d3to5 += 1;
        else dAbove5 += 1;
      });

    weeks.push({
      "0-2_Days": d0to2,
      "3-5_Days": d3to5,
      above_5_Days: dAbove5,
      Total: d0to2 + d3to5 + dAbove5,
    });
  });

  return weeks;
}

/** weeklyServiceOverview.getWeeklyAMCAnalytics() */
function calcAmcAnalytics(D, today) {
  const from = startOfWeek(today);
  const quotations = (D.quotations || []).filter(
    (q) =>
      hasValue(q.Customer_Name) &&
      text(q.Nature_of_Calls) === "AMC" &&
      inRange(q.Date_field, from, today),
  );

  const convertedQuotationIds = new Set((D.amcContracts || []).map((c) => lookupId(c.Quotation_Number)));
  const closed = quotations.filter((q) => convertedQuotationIds.has(String(q.ID))).length;
  const total = quotations.length;
  const pending = total - closed;

  return {
    week_start: from,
    week_end: today,
    total,
    closed,
    pending,
    closed_percent: total > 0 ? round((closed * 100) / total, 1) : 0,
    pending_percent: total > 0 ? round((pending * 100) / total, 1) : 0,
  };
}

/** weeklyServiceOverview.redTagItemTrendWeeklyFunc()  (current month, 4 buckets) */
function calcRedTagTrend(D, today) {
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const redTagNames = new Set(
    (D.products || []).filter((p) => isTrue(p.Is_Red_Tag_Material)).map((p) => text(p.Product_Name)),
  );

  const counts = [0, 0, 0, 0];
  (D.serviceReports || []).forEach((r) => {
    const date = parseDate(r.Call_Attended_Date);
    if (!date || date < monthStart || date > monthEnd) return;
    const name = text(r.Product);
    if (name === "" || !redTagNames.has(name)) return;
    counts[Math.min(3, Math.floor(daysBetween(monthStart, date) / 7))] += 1;
  });

  return {
    week1: counts[0],
    week2: counts[1],
    week3: counts[2],
    week4: counts[3],
    maxValue: Math.max(1, ...counts),
  };
}

/** weeklyServiceOverview.getWeeklySatisfactionData()  (oldest week first, as in Deluge) */
function calcWeeklySatisfaction(D, today) {
  const feedbacks = (D.feedbacks || []).filter((f) => hasValue(f.Company_Name));
  const weeks = [];

  [1, 2, 3, 4].forEach((weekNum) => {
    const end = addDays(today, -(weekNum - 1) * 7);
    const start = startOfWeek(end);
    const inWeek = feedbacks.filter((f) => inRange(f.Call_attended_date, start, end));

    let average = 0;
    if (inWeek.length > 0) {
      average = round(sum(inWeek, (f) => num(f.Rating)) / inWeek.length, 1);
    }

    let barHeightPx = round((average / 5) * 150, 1);
    if (average > 0 && barHeightPx < 10) barHeightPx = 10;

    weeks.push({
      week_number: weekNum,
      week_label: `Week ${weekNum}`,
      average_rating: average,
      total_feedback: inWeek.length,
      bar_height: barHeightPx,
    });
  });

  return weeks.reverse();
}

/** serviceOverviewDashboard.getRecentFeedbacks()  (first 5, in report order) */
function calcRecentFeedbacks(D) {
  return (D.feedbacks || [])
    .filter((f) => hasValue(f.Company_Name))
    .slice(0, 5)
    .map((f) => {
      const comments = text(f.Any_additional_comments_or_suggestions_would_be_appreciated1);
      const value = rating(f.Rating);
      return {
        id: f.ID,
        created_date: parseDate(f.Call_attended_date),
        customer_name: text(f.Company_Name),
        rating: Number.isFinite(value) ? value : 0,
        comments: comments !== "" ? comments : "No comments",
      };
    });
}

/** weeklyServiceOverview.averageResponseTime()  (hours, returned as text) */
function calcAverageResponseTime(D, today) {
  const from = startOfWeek(today);
  const reports = (D.serviceReports || []).filter(
    (r) =>
      hasValue(r.Call_Received_Date) &&
      hasValue(r.Service_Call_Log) &&
      inRange(r.Call_Attended_Date, from, today),
  );
  if (reports.length === 0) return "0";

  let hours = 0;
  let valid = 0;
  reports.forEach((r) => {
    const received = parseDate(r.Call_Received_Date); // text such as 16.12.24
    const attended = parseDate(r.Call_Attended_Date);
    if (!received || !attended) return;
    const taken = (attended - received) / 3600000;
    if (taken >= 0) {
      hours += taken;
      valid += 1;
    }
  });

  return valid > 0 ? String(round(hours / valid, 1)) : "0";
}

/* ---------- MONTHLY ---------- */

/** monthlyServiceOverview.totalCallLogsTileFunc() */
function calcTotalCallLogs(D, today) {
  const from = startOfMonth(today);
  let warranty = 0;
  let postWarranty = 0;
  let amc = 0;

  (D.serviceCallLogs || [])
    .filter((c) => inRange(c.Date_field, from, today))
    .forEach((c) => {
      const nature = natureOf(c);
      if (nature === "Warranty") warranty += 1;
      else if (nature === "PW") postWarranty += 1;
      else if (nature === "AMC") amc += 1;
    });

  // The expense amounts are commented out in the Deluge function (always 0).
  return {
    warranty_count: warranty,
    post_warranty: postWarranty,
    amc_count: amc,
    warranty_amount: 0,
    post_warranty_amount: 0,
  };
}

const monthExpenses = (D, from, to) =>
  (D.engineerExpenses || []).filter((e) => inRange(e.Date_field1234567890, from, to));
const monthReworkCost = (D, from, to) =>
  sum(
    (D.reworks || []).filter((r) => inRange(r.Date_field, from, to)),
    (r) => num(r.Approximate_Cost),
  );

/** monthlyServiceOverview.indirectExpense() */
function calcIndirectExpense(D, today) {
  const from = startOfMonth(today);
  const engineer = sum(monthExpenses(D, from, today), (e) =>
    sum(asRows(e.Material_Replaced1), (row) => num(row.Engineer_Expenses)),
  );
  return round(engineer + monthReworkCost(D, from, today), 2);
}

/** monthlyServiceOverview.repeatCallAnalysis() */
function calcRepeatCallAnalysis(D, today) {
  const from = startOfMonth(today);
  const pending = (D.serviceCallLogs || []).filter(
    (c) => hasValue(c.Customer_Name) && inRange(c.Date_field, from, today) && text(c.Status) === "Pending",
  );

  let customers = 0;
  countBy(pending, (c) => lookupId(c.Customer_Name)).forEach((n) => {
    if (n > 1) customers += 1;
  });
  return { repead_calls: customers };
}

/** monthlyServiceOverview.stockUnavailabilityDelayCountFunc() */
function calcStockDelays(D, today) {
  const from = startOfMonth(today);
  return (D.serviceReports || []).filter(
    (r) => text(r.Status) === "Pending For Spares" && inRange(r.Call_Attended_Date, from, today),
  ).length;
}

/** monthlyServiceOverview.monthlyTrainingHoursConducted() */
function calcTrainingHours(D, today) {
  const from = startOfMonth(today);
  let total = 0;
  (D.trainingReports || []).forEach((t) => {
    asRows(t.Report).forEach((row) => {
      if (inRange(row.Date_field, from, today)) total += num(row.Total_Hours);
    });
  });
  return round(total, 2);
}

/** monthlyServiceOverview.calculateToolVehicleCompliance() */
function calcCompliance(D, today) {
  const monthName = MONTH_LONG[today.getMonth()];

  // Every subform row of a report counts as "required"; all of them are
  // "completed" once the parent report is Approved.
  const tally = (reports, subformNames) => {
    let required = 0;
    let completed = 0;
    reports
      .filter((r) => text(r.Month_field) === monthName)
      .forEach((r) => {
        const name = subformNames.find((n) => asRows(r[n]).length > 0);
        const rows = name ? asRows(r[name]) : [];
        required += rows.length;
        if (text(r.Status) === "Approved") completed += rows.length;
      });
    return { required, completed };
  };

  const tool = tally(D.toolReports || [], ["Service_Tools_Kit_of_Engineers"]);
  // Deluge reads the same subform name for vehicles; "Report" is its own comment's guess.
  const vehicle = tally(D.vehicleReports || [], ["Service_Tools_Kit_of_Engineers", "Report"]);

  const totalRequired = tool.required + vehicle.required;
  const totalCompleted = tool.completed + vehicle.completed;

  return {
    tool_required: tool.required,
    tool_completed: tool.completed,
    vehicle_required: vehicle.required,
    vehicle_completed: vehicle.completed,
    total_required: totalRequired,
    total_completed: totalCompleted,
    compliance_percentage: totalRequired > 0 ? round((totalCompleted / totalRequired) * 100, 2) : 0,
  };
}

/** monthlyServiceOverview.positiveFeedbackFunc()  (all-time, as in Deluge) */
function calcPositiveFeedback(D) {
  const records = (D.feedbacks || []).filter((f) => hasValue(f.Company_Name));
  if (records.length === 0) return { positive_feedback_percentage: 0, avg_feedback: 0 };

  const positive = records.filter((f) => rating(f.Rating) >= 4).length;
  return {
    positive_feedback_percentage: round((positive * 100) / records.length, 1),
    avg_feedback: round(sum(records, (f) => num(f.Rating)) / records.length, 1),
  };
}

/**
 * monthlyServiceOverview.getCompliantCostByCategory()
 * Spare lines by nature of call. Deluge compares the report's Added_Time
 * (date-time) with the date `today`, i.e. midnight; kept as is.
 */
function calcCostByCategory(D, today) {
  const from = startOfMonth(today);
  let amc = 0;
  let pw = 0;
  let warranty = 0;

  (D.serviceReports || []).forEach((report) => {
    const added = parseDateTime(report.Added_Time);
    if (!added || added < from || added > today) return;

    asRows(report.Spare_Replaced).forEach((line) => {
      if (!inRange(line.Date_field, from, today)) return;
      const nature = text(line.Nature_of_Calls);
      if (nature === "AMC") amc += 1;
      else if (nature === "PW") pw += 1;
      else if (nature === "Warranty") warranty += 1;
    });
  });

  const total = amc + pw + warranty;
  const pct = (n) => (total > 0 ? (n / total) * 100 : 0);
  return {
    amc_percentage: pct(amc),
    pw_percentage: pct(pw),
    w_percentage: pct(warranty),
    has_data: total > 0,
  };
}

/** monthlyServiceOverview.expenseBreakdown() */
function calcExpenseBreakdown(D, today) {
  const from = startOfMonth(today);
  const records = monthExpenses(D, from, today).filter((e) => hasValue(e.Service_Engineer_Name));
  const rework = monthReworkCost(D, from, today);

  let direct = 0;
  let indirect = 0;
  records.forEach((rec) => {
    direct += sum(asRows(rec.Material_Replaced1), (row) => num(row.Direct_Expense));
    indirect += num(rec.Overall_Engineer);
    if (CONFIG.PARITY.expenseReworkInsideLoop) indirect += rework;
  });
  if (!CONFIG.PARITY.expenseReworkInsideLoop) indirect += rework;

  const total = direct + indirect;
  return {
    direct_expense: round(direct, 2),
    indirect_expense: round(indirect, 2),
    total_expense: round(total, 2),
    direct_percent: total > 0 ? round((direct * 100) / total, 1) : 0,
    indirect_percent: total > 0 ? round((indirect * 100) / total, 1) : 0,
  };
}

/** monthlyServiceOverview.repeatCallTrendMonthly()  (Jan..current month, year to date) */
function calcRepeatCallTrend(D, today) {
  const yearStart = startOfYear(today);
  const perMonth = Array.from({ length: 12 }, () => new Map());

  (D.serviceCallLogs || [])
    .filter(
      (c) =>
        inRange(c.Date_field, yearStart, today) && text(c.Status) !== "Pending" && hasValue(c.Customer_Name),
    )
    .forEach((c) => {
      const customers = perMonth[parseDate(c.Date_field).getMonth()];
      const id = lookupId(c.Customer_Name);
      customers.set(id, (customers.get(id) || 0) + 1);
    });

  return MONTH_SHORT.slice(0, today.getMonth() + 1).map((month, i) => {
    let repeats = 0;
    perMonth[i].forEach((n) => {
      if (n > 1) repeats += n; // all calls of a repeating customer are repeat calls
    });
    return { month, repeat_calls: repeats };
  });
}

/** monthlyServiceOverview.customerSatisfactionMonthly() */
function calcSatisfactionMonthly(D, today) {
  const year = today.getFullYear();
  const months = MONTH_SHORT.map((name) => ({ name, total: 0, count: 0 }));

  (D.feedbacks || []).forEach((f) => {
    const date = parseDate(f.Call_attended_date);
    if (!date || date.getFullYear() !== year) return;
    const value = rating(f.Rating);
    if (!Number.isFinite(value) || value <= 0 || value > 5) return;
    months[date.getMonth()].total += value;
    months[date.getMonth()].count += 1;
  });

  const totalRatings = sum(months, (m) => m.total);
  const totalCount = sum(months, (m) => m.count);

  return {
    months: months.map((m) => ({
      name: m.name,
      average: m.count > 0 ? round(m.total / m.count, 2) : 0,
      count: m.count,
    })),
    overall_average: totalCount > 0 ? round(totalRatings / totalCount, 2) : 0,
    overall_count: totalCount,
  };
}

/** monthlyServiceOverview.recentComplaintsMonthly() */
function calcRecentComplaints(D, today) {
  const from = startOfMonth(today);
  return (D.feedbacks || [])
    .filter((f) => onOrAfter(f.Call_attended_date, from) && hasValue(f.Company_Name) && rating(f.Rating) <= 3)
    .map((f) => ({
      customer_name: text(f.Company_Name),
      customer_feedback: text(f.Any_additional_comments_or_suggestions_would_be_appreciated1),
      feedback_date: parseDate(f.Call_attended_date),
    }));
}

/** monthlyServiceOverview.calibrationAndMaintanenceReportTableFunc() */
function calcCalibrationTable(D, today) {
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  return (D.calibrationRecords || []).map((record) => {
    let equipment = text(record.UUC_E);
    if (equipment === "") equipment = `${text(record.Meter_Type)} - ${text(record.Meter_Make)}`;

    let reportType = text(record.Calibration_Type);
    if (reportType === "") reportType = "Calibration Report";

    const lastService = parseDate(record.Rev_Date);
    let nextService = null;
    let dueThisMonth = false;
    let overdue = false;
    if (lastService) {
      nextService = addYears(lastService, 1);
      dueThisMonth = nextService.getMonth() === currentMonth && nextService.getFullYear() === currentYear;
      overdue = nextService < today;
    }

    let servicePerson = "Not Assigned";
    if (hasValue(record.Approved_By)) servicePerson = text(record.Approved_By);
    else if (hasValue(record.Tested_By)) servicePerson = text(record.Tested_By);

    let status = "Pending";
    let statusColor = "orange";
    if (hasValue(record.Approved_By)) {
      if (dueThisMonth) {
        status = "Completed";
        statusColor = "green";
      } else {
        status = "Up to Date";
        statusColor = "blue";
      }
    } else if (overdue) {
      status = "Overdue";
      statusColor = "red";
    }

    return {
      equipment,
      report_type: reportType,
      last_service_date: lastService ? fmtDateSpaced(lastService) : "N/A",
      next_service_date: nextService ? fmtDateSpaced(nextService) : "N/A",
      is_due_this_month: dueThisMonth,
      is_overdue: overdue,
      service_person: servicePerson,
      status,
      status_color: statusColor,
    };
  });
}

/* ---------- view models ---------- */

function computeTodayView(D, today) {
  return {
    tiles: calcTodayTiles(D, today),
    executives: calcExecutivePerformance(D, today),
    invoiceTrend: calcInvoiceTrend(D, today),
    repeatReasons: calcRepeatReasons(D, today),
    feedbackTrend: calcFeedbackTrend(D),
  };
}

function computeWeeklyView(D, today) {
  const satisfaction = calcWeeklySatisfaction(D, today);
  const rated = satisfaction.filter((w) => w.average_rating > 0);
  const overallAvg = rated.length > 0 ? round(sum(rated, (w) => w.average_rating) / rated.length, 1) : 0;
  const fullStars = Math.floor(overallAvg);

  return {
    googleReviews: calcGoogleReviewCount(D, today),
    engineer: calcEngineerWeekly(D, today),
    avgResponseTime: calcAverageResponseTime(D, today),
    repeatCallPercent: calcRepeatCallPercentWeekly(D, today),
    regretPercent: calcCustomerRegretPercentWeekly(D, today),
    amcLeads: calcAmcLeads(D, today),
    pendingReplacements: calcPendingReplacements(D, today),
    standbyPending: calcStandbyPending(D, today),
    aging: calcPendingAging(D, today),
    amc: calcAmcAnalytics(D, today),
    redTag: calcRedTagTrend(D, today),
    satisfaction,
    overallAvg,
    fullStars,
    hasHalfStar: overallAvg - fullStars >= 0.5,
    recentFeedbacks: calcRecentFeedbacks(D),
  };
}

function computeMonthlyView(D, today) {
  return {
    callLogs: calcTotalCallLogs(D, today),
    indirectExpense: calcIndirectExpense(D, today),
    repeatCalls: calcRepeatCallAnalysis(D, today).repead_calls,
    stockDelays: calcStockDelays(D, today),
    trainingHours: calcTrainingHours(D, today),
    compliance: calcCompliance(D, today),
    positiveFeedback: calcPositiveFeedback(D),
    costByCategory: calcCostByCategory(D, today),
    expense: calcExpenseBreakdown(D, today),
    repeatTrend: calcRepeatCallTrend(D, today),
    satisfaction: calcSatisfactionMonthly(D, today),
    complaints: calcRecentComplaints(D, today),
    calibration: calcCalibrationTable(D, today),
  };
}

/**
 * Flat list of every headline value, using the labels shown on screen, so the
 * widget can be checked value-by-value against the Deluge dashboard
 * (printed to the console when CONFIG.DEBUG is on).
 */
function summarizeView(tab, view) {
  const rows = [];
  const add = (label, value) => rows.push({ tab, label, value: String(value) });

  if (tab === "today") {
    const t = view.tiles;
    add("Total Calls Logged Today", t.total_calls_today);
    add("Service Executives Active Today", t.executives_act_today);
    add("Service Reports Submitted", t.service_reports_submitted_count);
    add("Quotations Sent Today", t.quot_sent_today);
    add("Customer Feedbacks Collected", t.cust_feedback_rec);
    add("Pending Calls > 48 Hrs", t.pending_calls);
    add("Customer Regret Cases", t.customer_regret_cases_count);
    add("Repeat Calls Logged", t.repeated_calls_count);
    add("Invoices Generated Today", t.invoices_gen_today);
    add("Invoice Amounts (₹)", t.total_invoiced_amt_today);

    view.executives.forEach((e) =>
      add(`Executive ${e.Engineer_Name}: assigned / closed`, `${e.assignedToday} / ${e.completedToday}`),
    );

    const inv = view.invoiceTrend;
    add("Invoice Amount Trend: AMC", inv.amc_amt);
    add("Invoice Amount Trend: Install", inv.installtion_amt);
    add("Invoice Amount Trend: Repair", inv.repair_amt);
    add("Invoice Amount Trend: Service", inv.service_amt);
    add("Invoice Amount Trend: Spares", inv.spares_amt);

    const r = view.repeatReasons;
    add("Repeat Calls Reason: total calls", r.totalRepeatCalls);
    add("Repeat Calls Reason: Lack of Knowledge %", round(r.lackOfKnowledge, 1));
    add("Repeat Calls Reason: Parts Unavailability %", round(r.partsUnavailability, 1));
    add("Repeat Calls Reason: Power Issue %", round(r.powerIssue, 1));

    const f = view.feedbackTrend;
    add("Service Feedback Trend: average rating", f.average_rating);
    add("Service Feedback Trend: percent", `${f.percentage}%`);
    add("Service Feedback Trend: feedback count", f.total_count);
  }

  if (tab === "weekly") {
    add("Avg Calls Attended per Engineer", view.engineer.average_calls_per_engineer_week);
    add("Average Response Time (hrs)", view.avgResponseTime);
    add("Repeat Call %", `${view.repeatCallPercent.toFixed(1)}%`);
    add("Customer Regret %", `${round(view.regretPercent, 2).toFixed(2)}%`);
    add("Google Review Collection %", `${view.googleReviews}%`);
    add("AMC Leads Generated", view.amcLeads);
    add("Pending Replacements", view.pendingReplacements);
    add("Standby Units Pending Collection", view.standbyPending);

    view.engineer.per_engineer.forEach((e) =>
      add(
        `Engineer-wise Call Volume ${e.engineer_name}: total / completed / pending`,
        `${e.total_calls_this_week} / ${e.calls_completed} / ${e.calls_pending}`,
      ),
    );

    add("Customer Satisfaction: average rating", view.overallAvg);
    view.satisfaction.forEach((w) => add(`Weekly Rating Trend ${w.week_label} (${w.total_feedback} feedbacks)`, w.average_rating));
    add("Recent Feedbacks: rows shown", view.recentFeedbacks.length);

    view.aging.forEach((w, i) =>
      add(
        `Pending Call Ageing Week ${i + 1}: 0-2 / 3-5 / >5 days`,
        `${w["0-2_Days"]} / ${w["3-5_Days"]} / ${w.above_5_Days}`,
      ),
    );

    add("AMC Offer vs Closed: offered", view.amc.total);
    add("AMC Offer vs Closed: closed", view.amc.closed);
    add("AMC Offer vs Closed: closed %", `${view.amc.closed_percent}%`);

    add("Red Tag Item Trend: Week 1", view.redTag.week1);
    add("Red Tag Item Trend: Week 2", view.redTag.week2);
    add("Red Tag Item Trend: Week 3", view.redTag.week3);
    add("Red Tag Item Trend: Week 4", view.redTag.week4);
  }

  if (tab === "monthly") {
    add("Total Calls Logged: Warranty", view.callLogs.warranty_count);
    add("Total Calls Logged: Post Warranty", view.callLogs.post_warranty);
    add("Total Calls Logged: AMC", view.callLogs.amc_count);
    add("Expenses for Complaints: Warranty Expense", view.callLogs.warranty_amount);
    add("Expenses for Complaints: Post Warranty", view.callLogs.post_warranty_amount);

    add("Indirect Expenses", view.indirectExpense);
    add("Repeat Call Analysis (calls)", view.repeatCalls);
    add("Stock Unavailability Delays (cases)", view.stockDelays);
    add("Training Hours Conducted (hrs)", view.trainingHours);
    add("Tool & Vehicle Inspections Completed", `${view.compliance.compliance_percentage}%`);
    add("Customer Feedback Summary: average", view.positiveFeedback.avg_feedback);
    add("Customer Feedback Summary: % positive", `${view.positiveFeedback.positive_feedback_percentage}%`);

    const e = view.expense;
    add("Expense Breakdown: Direct", `${e.direct_expense} (${e.direct_percent}%)`);
    add("Expense Breakdown: Indirect", `${e.indirect_expense} (${e.indirect_percent}%)`);

    const c = view.costByCategory;
    add("Complaint Cost by Category: has data", c.has_data);
    add("Complaint Cost by Category: Under Warranty %", round(c.w_percentage, 1));
    add("Complaint Cost by Category: Post Warranty %", round(c.pw_percentage, 1));
    add("Complaint Cost by Category: AMC %", round(c.amc_percentage, 1));

    view.repeatTrend.forEach((m) => add(`Repeat Call Trend ${m.month}`, m.repeat_calls));

    add("Customer Satisfaction: average rating", view.satisfaction.overall_average);
    add("Customer Satisfaction: reviews", view.satisfaction.overall_count);
    add("Recent Complaints: rows shown", view.complaints.length);
    view.calibration.forEach((k) => add(`Calibration: ${k.equipment}`, `${k.status} (next ${k.next_service_date})`));
  }

  return rows;
}

/* =========================================================
   5. ORIGINAL PAGE CSS
   Copied verbatim from the Deluge page's <style> block, so the
   widget looks exactly like the existing dashboard.
========================================================= */

const STYLES = `
/* ================= TABS ================= */
.tab-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    max-width: 100%;
    margin: 0;
    padding: 0;
}
.tab-input { display: none; }
.tab-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 0;
    padding: 0;
    list-style: none;
}
.tab-label {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    background: #91b6ff;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;
    color: #374151;
    transition: all 0.3s ease;
}
.tab-label:hover { background: #d1d5db; }
.tab-input:checked + label.tab-label {
    background-color: #2563eb !important;
    color: #ffffff !important;
}
.tab-content {
    display: none;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: #f4f7fb;
    margin-top: 20px;
}
#tab1:checked ~ .tab-contents #content1,
#tab2:checked ~ .tab-contents #content2,
#tab3:checked ~ .tab-contents #content3 { display: block; }

/* ================= RESPONSIVE ================= */
@media (max-width:1000px){ .kpi-row{ grid-template-columns: repeat(3, 1fr); } .main-grid{ grid-template-columns:1fr; } }
@media (max-width:640px){ .kpi-row{ grid-template-columns:repeat(2,1fr); } .donut-wrapper{ flex-direction:column; gap:20px; } }

/* ================= BODY ================= */
body{margin:0;padding:0;font-family:'Poppins',sans-serif;background:#f4f7fb;color:#0f172a;line-height:1.4;}

/* ================= TODAY DASHBOARD ================= */
header{padding:18px 26px;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.05);display:flex;justify-content:space-between;align-items:center;}
  header h1{font-size:18px;font-weight:600;}
  header .date{font-size:13px;color:#6b7280;}
  .container{
   /* max-width:1400px; */
    margin:18px auto;
    width: 100%;
      max-width: inherit;
    }
  
  /* COUNT TILES */
  .tiles{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;margin-bottom:18px;}
  .tile{background:#fff;padding:14px;border-radius:12px;box-shadow:0 6px 12px rgba(16,24,40,0.04);}
  .tile .label{font-size:13px;color:#6b7280;margin-bottom:6px;}
  .tile .value{font-weight:700;font-size:20px;margin-bottom:4px;text-align: center;}

  .red{color:#ef4444;}

  /* CHARTS */
  .charts{display:grid;grid-template-columns:2fr 1fr;gap:14px;}
  .card{background:#fff;padding:16px;border-radius:12px;box-shadow:0 6px 12px rgba(16,24,40,0.04);}
  .card h3{font-size:16px;margin-bottom:12px;}

  /* VERTICAL BAR CHART */
  .legend{display:flex;gap:20px;margin-bottom:20px;}
  .legend span{display:flex;align-items:center;gap:6px;font-size:14px;}
  .dot{width:14px;height:14px;border-radius:3px;}
  .assigned-dot{background:#3b82f6;}
  .closed-dot{background:#16a34a;}

  .bar-chart-row{
    display:flex;
    align-items:flex-end;
    justify-content:space-around;
    height:200px;
    gap:20px;
    border-left:1px solid #ccc;
    border-bottom:1px solid #ccc;
    padding-bottom:10px;
}
.bar-group{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:6px;
}
.bars{
    display:flex;
    gap:6px;
    align-items:flex-end;
    height:180px;
}
.bar-container{
    display:flex;
    flex-direction:column;
    align-items:center;
}
.bar{
    width:30px;
    border-radius:6px 6px 0 0;
}
/* ===== BAR CHART ANIMATION (CSS ONLY) ===== */
.bar {
    transform-origin: bottom;
    transform: scaleY(0);
    animation: grow 1.4s ease-out forwards;
}

/* Delay each bar slightly using nth-child */
.bar-container:nth-child(1) .bar {
    animation-delay: .1s;
}
.bar-container:nth-child(2) .bar {
    animation-delay: .2s;
}

@keyframes grow {
    to { transform: scaleY(1); }
}
.assigned{background:#3b82f6;}
.closed{background:#16a34a;}
.exec-label{font-size:14px;margin-top:6px;text-align:center;}

/* Number on top of each bar */
.bar-number{
    font-size:12px;
    font-weight:600;
    color:#0f172a;
    margin-bottom:4px;
}

  /* Placeholders for other charts */
  .line-chart,.pie-chart,.gauge-chart{height:120px;background:linear-gradient(90deg,#2463eb,#9db9ff);border-radius:6px;}
  .small-cards{display:flex;flex-direction:column;gap:12px;}
  table{width:100%;border-collapse:collapse;}
  th,td{padding:8px 10px;text-align:left;border-bottom:1px solid rgba(15,23,42,0.05);font-size:13px;}
  th{color:#6b7280;font-weight:600;}

  @media(max-width:900px){.charts{grid-template-columns:1fr;}}
.pie-chart{
  width:150px;
  height:150px;
  border-radius:50%;
  margin:auto;
  position:relative;
  /* Using CSS variables to define slices dynamically */
  --k: calc(var(--knowledge) * 1%);
  --p: calc(var(--parts) * 1%);
  --pw: calc(var(--power) * 1%);
  background:
    conic-gradient(
      #3b82f6 0% var(--k),
      #16a34a var(--k) calc(var(--k) + var(--p)),
      #f59e0b calc(var(--k) + var(--p)) 100%
    );
}

.pie-chart .label{
  position:absolute;
  font-size:12px;
  font-weight:600;
  color:#fff;
  text-shadow:0 0 3px rgba(0,0,0,0.5);
  display:flex;
  align-items:center;
  justify-content:center;
  width:35px;
  height:20px;
  border-radius:6px;
}
/* ===== PIE CHART ANIMATION (CSS ONLY) ===== */
.pie-chart {
    transform: rotate(-90deg);
    animation: pieSpin 1.2s ease-out forwards;
}

@keyframes pieSpin {
    to { transform: rotate(0deg); }
}
.pie-chart .knowledge{top:20px;left:50%;}
.pie-chart .parts{bottom:90px;left:30px;}
.pie-chart .power{bottom:30px;right:70px;}

.legend{
  display:flex;
  justify-content:space-around;
  font-size:13px;
  gap:5px;
}
.dot{
  width:14px;
  height:14px;
  border-radius:50%;
  display:inline-block;
  margin-right:6px;
}
  /* -------------------- gauge-cnt2 -------------------- */
    .gauge-cnt2-wrapper {
      flex: 0 0 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .gauge-cnt2-container {
      position: relative;
      width: 450px;
      height: 170px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .gauge-cnt2-arc-container {
      position: relative;
      width: 160px;
      height: 80px;
    }

    .gauge-cnt2-bg-arc {
      width: 160px;
      height: 80px;
      border-radius: 80px 80px 0 0;
      background: #e8ecef;
      position: relative;
      overflow: hidden;
    }

    .gauge-cnt2-progress-arc {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 160px;
      height: 80px;
      border-radius: 80px 80px 0 0;
      background: linear-gradient(90deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #1dd1a1 75%, #10ac84 100%);
      clip-path: polygon(0 100%,
          0 0,
          calc(var(--percentage, 0) * 1%) 0,
          calc(var(--percentage, 0) * 1%) 100%);
      animation: fillgauge-cnt2Arc 2s ease-out forwards;
    }

    @keyframes fillgauge-cnt2Arc {
      from {
        clip-path: polygon(0 100%, 0 100%, 0 100%, 0 100%);
      }

      to {
        clip-path: polygon(0 100%,
            0 0,
            calc(var(--percentage, 0) * 1%) 0,
            calc(var(--percentage, 0) * 1%) 100%);

      }
    }

    .gauge-cnt2-inner-cutout {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 60px;
      background: #fff;
      border-radius: 60px 60px 0 0;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .gauge-cnt2-value-display {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      z-index: 10;
    }

    .gauge-cnt2-percentage {
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 4px;
    }

    .gauge-cnt2-text {
      font-size: 11px;
      color: #6c757d;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .gauge-cnt2-wrapper {
      position: relative;
      /* make wrapper relative for absolute positioning */
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }



    .gauge-cnt2-indicator {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 4px;
      height: 60px;
      background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
      transform-origin: bottom center;
      transform: translateX(-50%) rotate(calc(-90deg + (var(--percentage, 0) * 1.8deg)));
      border-radius: 4px 4px 0 0;
      animation: rotateIndicator 2s ease-out forwards;
      z-index: 5;
      box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    }

    .gauge-cnt2-indicator::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    @keyframes rotateIndicator {
      from {
        transform: translateX(-50%) rotate(-90deg);
      }

      to {
        transform: translateX(-50%) rotate(calc(-90deg + (var(--percentage, 0) * 1.8deg)));
      }
    }

    .gauge-cnt2-labels {
      position: absolute;
      bottom: -5px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      font-size: 10px;
      color: #adb5bd;
      font-weight: 600;
    }

    /* Heading inside the gauge-cnt2 curve */
    /* Heading inside the gauge-cnt2, above the arc */
    .gauge-cnt2-inside-heading {
      position: absolute;
      top: 10px;
      /* adjust as needed to sit in the red box area */
      left: 50%;
      transform: translateX(-50%);
      font-size: 14px;
      font-weight: 700;
      color: #333;
      text-align: center;
      z-index: 10;
      pointer-events: none;
      /* ensures it doesn’t interfere with gauge-cnt2 hover/animation */
    }
    /* ================== INVOICE COLUMN CHART ================== */
.invoice-chart{
    display:flex;
    justify-content:space-between;
    align-items:flex-end;
    height:220px;
    padding:10px 6px 0;
    border-bottom:1px solid #d1d5db;
    border-left:1px solid #d1d5db;
}

.col{
    display:flex;
    flex-direction:column;
    align-items:center;
    gap:6px;
    flex:1;
}

.col-bar{
    width:32px;
    background:#3b82f6;
    border-radius:6px 6px 0 0;
    height:var(--h);
    
    /* Animation */
    transform-origin:bottom;
    transform:scaleY(0);
    animation:growCol 1.4s ease-out forwards;
}

@keyframes growCol{
    to{ transform:scaleY(1); }
}

.col-label{
    font-size:13px;
    font-weight:600;
    margin-top:4px;
}

.col-value{
    font-size:12px;
    color:#4b5563;
}

.label {
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
}

/* ================= WEEKLY DASHBOARD ================= */
:root {
  --bg:#f8f9fa;
  --card:#ffffff;
  --muted:#6b7280;
  --completed:#5dc35a;
  --pending:#e84c3d;
  --radius:12px;
}
/* Reset */
*{box-sizing:border-box;margin:0;padding:0;}
body{
  font-family:Inter, sans-serif;
  background:var(--bg);
  color:#111827;
}
/* WRAPPER */
.weekly-wrap{
  width:100%;
  max-width:1200px;
  margin:20px auto;
  padding:0 16px;
  box-sizing:border-box;
}
/* Heading Card */
.weekly-heading-card {
  background: var(--card);
  border-radius: var(--radius);
  padding: 20px 30px;
  margin-bottom: 30px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.12);
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  color: #111827;
  border-left: 6px solid #a3dda1;
  width:100%;
}
/* KPI Tiles */
.weekly-kpi-grid{
  display:grid;
  grid-template-columns:repeat(4, 1fr);
  gap:16px;
  margin-bottom:40px;
}
.weekly-kpi-card{
  background:var(--card);
  border-radius:var(--radius);
  padding:20px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  box-shadow:0 2px 8px rgba(0,0,0,0.08);
  transition:.3s;
  border-bottom: 4px solid #5dc35a91;
}
.weekly-kpi-card:hover{
  transform:translateY(-5px);
  box-shadow:0 4px 16px rgba(0,0,0,0.15);
}
.weekly-kpi-title{color:var(--muted);font-size:13px;margin-bottom:8px;text-align:center;}
.weekly-kpi-value{font-size:22px;font-weight:700;color:#000;text-align:center;}
/* Chart Cards */
.weekly-chart-card{
  background:var(--card);
  border-radius:var(--radius);
  padding:20px;
  box-shadow:0 2px 8px rgba(0,0,0,0.08);
  margin-bottom:40px;
}
.weekly-chart-title{
  font-weight:600;
  margin-bottom:16px;
  text-align:center;
  font-size: 18px;
}
/* Legend */
.weekly-legend{display:flex;justify-content:center;gap:20px;margin-bottom:15px;font-size:13px;color:#111;}
.weekly-legend-item{display:flex;align-items:center;gap:6px;}
.weekly-legend-color{width:15px;height:15px;border-radius:3px;}
/* Bar Chart */
.weekly-bar-chart{
  display:flex;
  align-items:flex-end;
  justify-content: space-around;
  height:250px;
  border-left:2px solid #444;
  border-bottom:2px solid #444;
  padding-bottom:10px;
  gap:20px;
}
.weekly-bar-group{display:flex;flex-direction:column;align-items:center;}
.weekly-bar {
  width:100px;
  height:180px;
  border-radius:0px;
  overflow:hidden;
  display:flex;
  flex-direction:column-reverse;
}
.weekly-bar .weekly-segment:last-child {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.weekly-bar .weekly-segment:first-child {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
.weekly-segment{
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  color:#fff;
  font-size:10px;
  font-weight:600;
  opacity:0;
  animation: grow 1s forwards;
}
.completed{background:var(--completed);}
.pending{background:var(--pending);}
.weekly-value{font-size:12px;font-weight:600;margin-bottom:6px;text-align:center;}
.weekly-label{font-size:13px;margin-top:6px;text-align:center;}
@keyframes grow{
  0%{opacity:0;transform:translateY(20px);}
  100%{opacity:1;transform:translateY(0);}
}
/* Donut Chart */
.weekly-donut-container {position: relative;width: 200px;height: 200px;margin: auto;}
.weekly-donut {
  width: 100%;height: 100%;border-radius: 50%;
  background: conic-gradient(#3b82f6 0% 50%, #10b981 50% 100%);
  display: flex;align-items: center;justify-content: center;
  animation: rotateDonut 2s ease-out;
}
@keyframes rotateDonut{0%{transform:rotate(-360deg);}100%{transform:rotate(0deg);}}
.weekly-donut-inner{
  width:60%;height:60%;background:#fff;
  border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-weight:600;font-size:16px;
}
/* Satisfaction Grid */
.weekly-satisfaction-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:25px;
}
/* Customer Satisfaction Styles */
.weekly-rating-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 10px;
}
.weekly-rating-display {
  text-align: center;
  margin-bottom: 30px;
}
.weekly-rating-score {
  font-size: 56px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 10px;
}
.weekly-stars-container {
  font-size: 32px;
  margin-bottom: 10px;
  letter-spacing: 4px;
}
.weekly-star.filled {
  color: #fbbf24;
  text-shadow: 0 2px 4px rgba(251, 191, 36, 0.3);
}
.weekly-star.empty {
  color: #d1d5db;
}
.weekly-rating-label {
  font-size: 14px;
  color: var(--muted);
  font-weight: 500;
}
/* Weekly Trend Bars */
.weekly-trend-title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 15px;
  text-align: center;
}
.weekly-trend {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 180px;
  width: 100%;
  padding: 0 20px 30px 15px;
  border-left: 2px solid #d1d5db;
  border-bottom: 2px solid #d1d5db;
  gap: 30px;
  position: relative;
}
.weekly-week-bar-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex: 1;
  min-width: 50px;
}
.weekly-week-bar {
  width: 50px;
  background: linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%);
  border-radius: 6px 6px 0 0;
  box-shadow: 0 -2px 10px rgba(251, 191, 36, 0.4);
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: growBar 1.2s ease forwards;
  opacity: 0;
  min-height: 20px;
}
.weekly-week-bar:hover {
  transform: translateY(-5px);
  box-shadow: 0 -4px 15px rgba(251, 191, 36, 0.6);
  filter: brightness(1.1);
}
.weekly-week-bar::after {
  content: attr(data-rating);
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 700;
  color: #111827;
  background: #fff;
  padding: 3px 8px;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  opacity: 0;
  transition: opacity 0.3s;
  white-space: nowrap;
}
.weekly-week-bar:hover::after {
  opacity: 1;
}
.weekly-week-label {
  font-size: 12px;
  color: #6b7280;
  font-weight: 600;
  margin-top: 8px;
}
@keyframes growBar {
  0% { opacity: 0; transform: scaleY(0); transform-origin: bottom; }
  100% { opacity: 1; transform: scaleY(1); transform-origin: bottom; }
}
/* Feedback Section */
.weekly-feedback-section {
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}
.weekly-feedback-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 15px;
  color: #111827;
}
.weekly-complaints-list {
  max-height: 340px;
  overflow-y: auto;
  padding-right: 10px;
}
.weekly-feedback-item {
  padding: 15px;
  border-left: 4px solid #10b981;
  background: #f0fdf4;
  margin-bottom: 12px;
  border-radius: 6px;
  transition: transform 0.2s, box-shadow 0.2s;
}
.weekly-feedback-item:hover {
  transform: translateX(5px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.weekly-feedback-item.positive { border-left-color: #10b981; background: #f0fdf4; }
.weekly-feedback-item.neutral { border-left-color: #f59e0b; background: #fffbeb; }
.weekly-feedback-item.negative { border-left-color: #ef4444; background: #fef2f2; }
.weekly-feedback-date { font-size: 11px; color: #6b7280; margin-bottom: 6px; font-weight: 500; }
.weekly-feedback-text { font-size: 13px; color: #111827; margin-bottom: 8px; line-height: 1.5; }
.weekly-feedback-rating { font-size: 14px; color: #fbbf24; display: flex; align-items: center; gap: 6px; }
.weekly-rating-number { font-weight: 600; color: #111827; font-size: 12px; }
/* Responsive */
@media(max-width:1200px){ .weekly-kpi-grid{grid-template-columns:repeat(2,1fr);} }
@media(max-width:700px){ .weekly-kpi-grid{grid-template-columns:1fr;} .weekly-satisfaction-grid{grid-template-columns:1fr;} }

/* ================= MONTHLY DASHBOARD ================= */
:root{
  --bg33:#f0f2f5;
  --card33:#ffffff;
  --accent-blue33:#3b82f6;
  --accent-green33:#10b981;
  --accent-amber33:#f59e0b;
  --text-dark33:#1f2937;
  --text-muted33:#6b7280;
  --border-grey3:#d1d5db;
}
/* Dashboard Wrapper */
.dashboard-container3 {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}
.page-title3{
  font-size:28px;
  background:var(--card33);
  border-radius:14px;
  padding:16px;
  box-shadow:0 2px 6px rgba(0,0,0,0.07);
  border-top:6px solid #9ea7b5;
  margin:16px 0;
  font-weight:500;
  text-align:center;
}

/* Cards */
.card3{
  background:var(--card33);
  border-radius:14px;
  padding:16px;
  box-shadow:0 2px 6px rgba(0,0,0,0.07);
  border-bottom:3px solid var(--border-grey3);
  margin-bottom:16px;
}
.cards3{
  margin-bottom:16px;
}
.card3 h3{
  margin:0 0 16px 0;
  font-size:16px;
  font-weight:600;
}

/* Top Section */
.top-section3{
  display:flex;
  gap:16px;
  margin-bottom:16px;
}
.top-section3 .card3{
  flex:1;
}
.top-section3 .cards3{
  flex:1;
}

/* Tiles */
.tiles3{
  display:flex;
  gap:16px;
}
.tile3{
  flex:1;
  background:#ffffff;
  border-radius:5px;
  padding:16px;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  box-shadow:0 4px 12px rgba(0,0,0,0.04);
  transition:all .2s ease;
  cursor:pointer;
}
.tile3:hover{
  transform:translateY(-3px);
  box-shadow:0 10px 24px rgba(0,0,0,0.1);
}
.label3{font-size:14px;font-weight:500;text-align:center;color: #626262;}
.value3{font-size:20px;font-weight:600;text-align:center;}

/* Service Insights Grid */
.service-grid3{
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:16px;
}
@media(max-width:1100px){
  .service-grid3{grid-template-columns:repeat(2,1fr);}
}
@media(max-width:700px){
  .service-grid3{grid-template-columns:1fr;}
}

/* FLEX ROW FOR PIE + BAR CHART */
.flex-chart-container3{
  display:flex;
  gap:16px;
  flex-wrap:wrap;
  justify-content:space-between;
}

/* Charts Cards */
.flex-chart-container3 .card3{
  flex:1;
  min-width:300px;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding:16px;
}

/* PIE CHART */
.pie-chart3{
  width:200px;
  height:200px;
  border-radius:50%;
  --direct3:60;
  --indirect3:40;
  background: conic-gradient(var(--accent-blue33) 0% calc(var(--direct3)*1%), var(--accent-green33) calc(var(--direct3)*1%) 100%);
  transform: rotate(-90deg);
  animation: pieSpin3 1.2s ease-out forwards;
  position: relative;
}
@keyframes pieSpin3{
  from { transform: rotate(-90deg) scale(0.7); opacity:0;}
  to { transform: rotate(-90deg) scale(1); opacity:1;}
}

/* Pie Tooltips */
.pie-chart-container3 {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pie-chart-container3 .tooltip3 {
  position:absolute;
  padding:5px 10px;
  background:#1f2937;
  color:#fff;
  border-radius:6px;
  font-size:12px;
  font-weight:600;
  white-space:nowrap;
  opacity:0;
  pointer-events:none;
  transition:opacity .2s;
}
.direct-tooltip3{
  top:10%;
  left:50%;
  transform:translateX(-50%);
}
.indirect-tooltip3{
  bottom:10%;
  left:50%;
  transform:translateX(-50%);
}
.pie-chart-container3:hover .tooltip3{
  opacity:1;
}

/* Legend */
.legend3{
  display:flex;
  justify-content:center;
  gap:16px;
  margin-top:16px;
  font-size:14px;
}
.dot3{
  width:14px;
  height:14px;
  border-radius:50%;
  display:inline-block;
  margin-right:6px;
}
.direct-dot3{background:var(--accent-blue33);}
.indirect-dot3{background:var(--accent-green33);}

/* BAR CHART */
.bar-chart-container3{
  width:100%;
}
.bar3{
  background:#f8f9fa;
  border-radius:12px;
  padding:16px;
  margin-bottom:16px;
  display:flex;
  flex-direction:column;
  gap:8px;
}
.bar-label3{
  font-size:14px;
  font-weight:500;
  color:#636161;
}
.bar-inner3{
  height:25px;
  border-radius:12px;
  position:relative;
  overflow:hidden;
}
.bar-fill3{
  height:100%;
  border-radius:12px;
  width:0%;
  animation: fillBar3 1.2s forwards;
  position:relative;
  background:#837459;
}
.bar-fill3.post3{background:#837459;}
.bar-fill3.amc3{background:#837459;}
.bar-fills3{
  height:100%;
  border-radius:12px;
  width:0%;
  animation: fillBar3 1.2s forwards;
  position:relative;
  background:#f59e0b;
}
.bar-fill3.posts3{background:#10b981;}
.bar-value3{
  position:absolute;
  right:8px;
  top:0;
  bottom:0;
  display:flex;
  align-items:center;
  color:#fff;
  font-weight:600;
  font-size:12px;
}
@keyframes fillBar3{
  to { width: var(--bar-width); }
}

/* Responsive */
@media(max-width:1000px){
  .flex-chart-container3{
    flex-direction:column;
    align-items:center;
  }
  .flex-chart-container3 .card3{
    max-width:100%;
  }
}

/* Line Chart */
.line-chart3 {
  position: relative;
  height: 250px;
  margin-top:16px;
}
.line-chart3 svg {
  width: 100%;
  height: 100%;
}
.stroke_blue3 {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine3 2s forwards ease-out;
}
@keyframes drawLine3 {
  to { stroke-dashoffset: 0; }
}
.point3 {
  opacity: 0;
  transform: scale(0);
  animation: appearPoint3 2s forwards ease-out;
  animation-delay: 2s;
}
@keyframes appearPoint3 {
  to { opacity: 1; transform: scale(1); }
}

/* Legend */
.legend3 {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}
.legend-item3 {
  display: flex;
  align-items: center;
  gap: 8px;
}
.legend-color3 {
  width: 20px;
  height: 4px;
  border-radius: 2px;
}

/* Table */
.table3 th, .table3 td {
  padding: 16px;
  border-bottom:1px solid #eee;
}
.table3 th {
  border-bottom:2px solid #ddd;
  background:#f3f4f6;
  text-align:left;
}
 /* Customer Satisfaction */
      .satisfaction-grid3 {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 25px;
      }

      .rating-display3 {
        text-align: center;
        padding: 20px;
      }

      .rating-score3 {
        font-size: 64px;
        font-weight: 700;
        color: #667eea;
        margin-bottom: 10px;
      }

      .rating-stars3 {
        font-size: 32px;
        color: #fbbf24;
        margin-bottom: 10px;
      }

      .rating-label3 {
        color: #6b7280;
        font-size: 14px;
      }

      /* Complaints List */
      .complaints-list3 {
        max-height: 300px;
        overflow-y: auto;
      }

      .complaint-item3 {
        padding: 15px;
        border-left: 4px solid #ef4444;
        background: #fef2f2;
        margin-bottom: 12px;
        border-radius: 6px;
        transition: transform 0.3s ease;
      }

      .complaint-item3:hover {
        transform: translateX(5px);
      }

      .complaint-date3 {
        font-size: 11px;
        color: #991b1b;
        font-weight: 600;
        margin-bottom: 5px;
      }

      .complaint-text3{
        font-size: 13px;
        color: #7f1d1d;
      }

      /* Competitors Section */
      .competitors-table3 {
        width: 100%;
        border-collapse: collapse;
      }

      .competitors-table3 th {
        background: #c1c1c1;
        color: #141414;
        padding: 15px;
        text-align: left;
        font-weight: 600;
      }

      .competitors-table3 td {
        padding: 15px;
        border-bottom: 1px solid #e5e7eb;
      }

      .competitors-table3 tr:hover {
        background: #f9fafb;
      }

      /* Stacked Bar Chart */
      .stacked-bar-chart3 {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 10px 0;
      }

      .stacked-bar-row3 {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .stacked-bar-label3 {
        width: 80px;
        font-size: 13px;
        font-weight: 500;
        color: #4b5563;
      }

      .stacked-bar3 {
        flex: 1;
        height: 40px;
        display: flex;
        border-radius: 6px;
        overflow: hidden;
        background: #f3f4f6;
      }

      .stacked-segment3 {
        height: 100%;
        transition: all 0.6s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
      }

      .stacked-segment3:hover {
        opacity: 0.8;
        filter: brightness(1.1);
      }

      .segment-price3 {
        background: #ef4444;
      }

      .segment-quality3 {
        background: #f59e0b;
      }

      .segment-delivery3 {
        background: #8b5cf6;
      }

      .segment-other3 {
        background: #6b7280;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .charts-grid3 {
          grid-template-columns: 1fr;
        }

        .satisfaction-grid3 {
          grid-template-columns: 1fr;
        }
      }

      /* Animation Classes */
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .animate-in3 {
        animation: fadeInUp 0.6s ease forwards;
      }
        /* Bar Chart */
      .bar-chart3 {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        height: 250px;
        gap: 15px;
      }


      .bar-group-yoy3 {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .bars-yoy3 {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 200px;
        width: 100%;
        justify-content: center;
      }

      .bar-yoy3 {
        width: 70px;
        border-radius: 4px 4px 0 0;
        transition: all 0.6s ease;
        position: relative;
        cursor: pointer;
      }

      .bar-yoy3:hover {
        opacity: 0.8;
        transform: scaleY(1.05);
      }

      .bar-yoy3:hover .bar-value-label3 {
        opacity: 1;
        transform: translateY(-5px);
      }

      .bar-group3 {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      }

      .bars3 {
        display: flex;
        align-items: flex-end;
        gap: 4px;
        height: 200px;
        width: 100%;
        justify-content: center;
      }

      .bars3 {
        width: 20px;
        border-radius: 4px 4px 0 0;
        transition: all 0.6s ease;
        position: relative;
        cursor: pointer;
      }

      .bars3:hover {
        opacity: 0.8;
        transform: scaleY(1.05);
      }

      .bars3:hover .bar-value-label3 {
        opacity: 1;
        transform: translateY(-5px);
      }

      .bar-value-label3 {
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%);
        background: #1f2937;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 600;
        white-space: nowrap;
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        z-index: 10;
      }

      .bar-value-label3::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #1f2937;
      }

      .bar.sales3 {
        background: linear-gradient(180deg, #10b981 0%, #059669 100%);
      }

      .bar.cost3 {
        background: linear-gradient(180deg, #8b5cf6 0%, #7c3aed 100%);
      }

      .bar.profit3 {
        background: linear-gradient(180deg, #f59e0b 0%, #d97706 100%);
      }

      .bar-label3 {
        font-size: 11px;
        color: #6b7280;
        font-weight: 500;
        text-align: center;
      }

      /* Horizontal Bar Chart */
      .horizontal-bar-chart3 {
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 10px 0;
      }

      .horizontal-bar-row3 {
        display: flex;
        align-items: center;
        gap: 15px;
      }

      .horizontal-bar-label3 {
        min-width: 100px;
        font-size: 13px;
        font-weight: 600;
        color: #1f2937;
      }

      .horizontal-bar-wrapper3 {
        flex: 1;
        position: relative;
      }

      .horizontal-bar3 {
        height: 40px;
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        transition: all 0.6s ease;
        cursor: pointer;
      }

      .horizontal-bar3:hover {
        transform: scaleX(1.02);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .horizontal-bar-value3 {
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
        color: white;
        font-size: 14px;
        font-weight: 700;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
      }

      .horizontal-bar.q13 {
        background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
      }

      .horizontal-bar.q23 {
        background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
      }

      .horizontal-bar.q33 {
        background: linear-gradient(90deg, #10b981 0%, #059669 100%);
      }

      .horizontal-bar.q43 {
        background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
      }
       /* -------------------- Gauge -------------------- */
    .gauge-wrapper3 {
      flex: 0 0 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .gauge-container3 {
      position: relative;
      width: 450px;
      height: 130px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    }

    .gauge-arc-container3 {
      position: relative;
      width: 160px;
      height: 80px;
    }

    .gauge-bg-arc3 {
      width: 160px;
      height: 80px;
      border-radius: 80px 80px 0 0;
      background: #e8ecef;
      position: relative;
      overflow: hidden;
    }

    .gauge-progress-arc3 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 160px;
      height: 80px;
      border-radius: 80px 80px 0 0;
      background: linear-gradient(90deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #1dd1a1 75%, #10ac84 100%);
      clip-path: polygon(0 100%,
          0 0,
          calc(var(--percentage, 0) * 1%) 0,
          calc(var(--percentage, 0) * 1%) 100%);
      animation: fillGaugeArc 2s ease-out forwards;
    }

    @keyframes fillGaugeArc {
      from {
        clip-path: polygon(0 100%, 0 100%, 0 100%, 0 100%);
      }

      to {
        clip-path: polygon(0 100%,
            0 0,
            calc(var(--percentage, 0) * 1%) 0,
            calc(var(--percentage, 0) * 1%) 100%);

      }
    }

    .gauge-inner-cutout3 {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 60px;
      background: #fff;
      border-radius: 60px 60px 0 0;
      box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .gauge-value-display3 {
      position: absolute;
      bottom: 15px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      z-index: 10;
    }

    .gauge-percentage3 {
      font-size: 28px;
      font-weight: 800;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1;
      margin-bottom: 4px;
    }

    .gauge-text3 {
      font-size: 11px;
      color: #6c757d;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
   .gauge-wrapper3 {
  position: relative; /* make wrapper relative for absolute positioning */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 6px;
  margin-bottom: 16px;
  border-radius: 14px;
    padding: 16px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.07);
    border-bottom: 3px solid var(--border-grey3);
}



    .gauge-indicator3 {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 4px;
      height: 60px;
      background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
      transform-origin: bottom center;
      transform: translateX(-50%) rotate(calc(-90deg + (var(--percentage, 0) * 1.8deg)));
      border-radius: 4px 4px 0 0;
      animation: rotateIndicator 2s ease-out forwards;
      z-index: 5;
      box-shadow: 0 0 10px rgba(102, 126, 234, 0.5);
    }

    .gauge-indicator3::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 16px;
      height: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      border: 3px solid #fff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    @keyframes rotateIndicator {
      from {
        transform: translateX(-50%) rotate(-90deg);
      }

      to {
        transform: translateX(-50%) rotate(calc(-90deg + (var(--percentage, 0) * 1.8deg)));
      }
    }

    .gauge-labels3 {
      position: absolute;
      bottom: -5px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 5px;
      font-size: 10px;
      color: #adb5bd;
      font-weight: 600;
    }
    /* Heading inside the gauge curve */
/* Heading inside the gauge, above the arc */
.gauge-inside-heading3 {
  position: absolute;
  top: 10px; /* adjust as needed to sit in the red box area */
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  font-weight: 700;
  color: #333;
  text-align: center;
  z-index: 10;
  pointer-events: none; /* ensures it doesn’t interfere with gauge hover/animation */
}
.chart-gauge-wrapper3{
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.chart-gauge-wrapper3 .card3,
.chart-gauge-wrapper3 .gauge-wrapper3 {
  flex: 1;
  min-width: 300px;
}
    .benchmarks-section3 {
      background: #ffffff;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
      max-width: 1360px;
      margin: 0 auto;
    margin-bottom : 15px;
    }

    .section-header3 {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #e5e7eb;
    }

    .section-title3 {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
    }

    .benchmark-table3 {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      border: 2px solid #d1d5db; /* full table border */
    }

    .benchmark-table3 th,
    .benchmark-table3 td {
      padding: 12px 10px;
      border: 1px solid #d1d5db; /* all cell borders */
      vertical-align: middle;
      text-align: center;
    }

    .benchmark-table3 th {
      background: #f3f4f6;
      font-size: 14px;
      font-weight: 600;
      color: #111827;
    }

    .benchmark-table3 td:first-child {
      text-align: left;
      font-weight: 500;
    }
`;

/* =========================================================
   6. UI
   Same markup and class names as the Deluge page, so the
   original CSS above applies unchanged.
========================================================= */
/* @@UI_SECTION@@ */

// Not part of the original design: only the loading / error notices.
const EXTRA_STYLES = `
.widget-status{padding:40px 20px;text-align:center;color:#6b7280;font-size:14px;}
.widget-error{color:#b91c1c;}
`;

const starText = (value) => {
  let s = "";
  for (let i = 1; i <= 5; i += 1) s += i <= value ? "★" : "☆";
  return s;
};

/* ---------------------------------------------------------
   TAB 1 - TODAY'S
--------------------------------------------------------- */

function TodayView({ view, today }) {
  const { tiles, executives, invoiceTrend, repeatReasons, feedbackTrend } = view;

  const CIRCUMFERENCE = 502.65; // 2 * PI * r (r = 80)
  const noReasons = !repeatReasons.totalRepeatCalls;
  const knowledgePercent = noReasons ? 0 : repeatReasons.lackOfKnowledge;
  const partsPercent = noReasons ? 0 : repeatReasons.partsUnavailability;
  const powerPercent = noReasons ? 0 : repeatReasons.powerIssue;
  const knowledgeLength = (knowledgePercent / 100) * CIRCUMFERENCE;
  const partsLength = (partsPercent / 100) * CIRCUMFERENCE;
  const powerLength = (powerPercent / 100) * CIRCUMFERENCE;
  const partsOffset = 0 - knowledgeLength;
  const powerOffset = 0 - (knowledgeLength + partsLength);

  const tileList = [
    ["Total Calls Logged Today", tiles.total_calls_today],
    ["Service Executives Active Today", tiles.executives_act_today],
    ["Service Reports Submitted", tiles.service_reports_submitted_count],
    ["Quotations Sent Today", tiles.quot_sent_today],
    ["Customer Feedbacks Collected", tiles.cust_feedback_rec],
    ["Pending Calls > 48 Hrs", tiles.pending_calls, true],
    ["Customer Regret Cases", tiles.customer_regret_cases_count, true],
    ["Repeat Calls Logged", tiles.repeated_calls_count],
    ["Invoices Generated Today", tiles.invoices_gen_today],
    ["Invoice Amounts (₹)", `₹ ${tiles.total_invoiced_amt_today}`],
  ];

  const invoiceColumns = [
    ["AMC", invoiceTrend.amc_height, invoiceTrend.amc_amt],
    ["Install", invoiceTrend.install_height, invoiceTrend.installtion_amt],
    ["Repair", invoiceTrend.repair_height, invoiceTrend.repair_amt],
    ["Service", invoiceTrend.service_height, invoiceTrend.service_amt],
    ["Spares", invoiceTrend.spares_height, invoiceTrend.spares_amt],
  ];

  const legendRows = [
    ["#3b82f6", "Lack of Knowledge", knowledgePercent],
    ["#16a34a", "Parts Unavailability", partsPercent],
    ["#f59e0b", "Power Issue", powerPercent],
  ];

  return (
    <>
      <header>
        <h1>TAB 1 — TODAY'S</h1>
        <div className="date">Date: {fmtDate(today)}</div>
      </header>

      <main className="container">
        {/* COUNT TILES */}
        <section className="tiles">
          {tileList.map(([label, value, red]) => (
            <div className="tile" key={label}>
              <div className="label">{label}</div>
              <div className={red ? "value red" : "value"}>{value}</div>
            </div>
          ))}
        </section>

        {/* CHARTS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* VERTICAL BAR CHART */}
          <div className="card">
            <h3>Service Executive Performance (Today)</h3>

            <div className="legend">
              <span>
                <span className="dot assigned-dot"></span>Assigned
              </span>
              <span>
                <span className="dot closed-dot"></span>Closed
              </span>
            </div>

            <div className="bar-chart-row">
              {executives.map((exec, i) => (
                <div className="bar-group" key={i}>
                  <div className="bars">
                    <div className="bar-container">
                      <div className="bar-number">{exec.assignedToday}</div>
                      <div className="bar assigned" style={{ height: `${exec.assignedHeight}px` }}></div>
                    </div>
                    <div className="bar-container">
                      <div className="bar-number">{exec.completedToday}</div>
                      <div className="bar closed" style={{ height: `${exec.completedHeight}px` }}></div>
                    </div>
                  </div>
                  <div className="exec-label">{exec.Engineer_Name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Invoice Amount Trend Chart */}
          <div className="card">
            <h3>Invoice Amount Trend (Today)</h3>

            <div className="invoice-chart">
              {invoiceColumns.map(([label, height, amount]) => (
                <div className="col" key={label}>
                  <div className="col-bar" style={{ "--h": `${height}px` }}></div>
                  <div className="col-label">{label}</div>
                  <div className="col-value">₹ {amount}</div>
                </div>
              ))}
            </div>
          </div>

          {/* PIE LEFT + GAUGE RIGHT */}
          <div style={{ display: "flex", gap: "14px", margin: "10px" }}>
            {/* PIE CHART (LEFT) */}
            <div className="card" style={{ flex: 1 }}>
              <h3>Repeat Calls Reason Breakdown</h3>

              <div style={{ position: "relative", width: "250px", height: "250px", margin: "20px auto" }}>
                {noReasons ? (
                  <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%" }}>
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#e5e7eb" strokeWidth="60"></circle>
                    <circle cx="100" cy="100" r="50" fill="white"></circle>
                    <text
                      x="100"
                      y="105"
                      textAnchor="middle"
                      style={{ fontSize: "16px", fill: "#999", fontWeight: 600 }}
                    >
                      No Data
                    </text>
                  </svg>
                ) : (
                  <>
                    <svg viewBox="0 0 200 200" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                      {knowledgePercent > 0 && (
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="60"
                          strokeDasharray={`${knowledgeLength} ${CIRCUMFERENCE}`}
                          strokeDashoffset={0}
                          style={{ transition: "all 1s ease" }}
                        ></circle>
                      )}
                      {partsPercent > 0 && (
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#16a34a"
                          strokeWidth="60"
                          strokeDasharray={`${partsLength} ${CIRCUMFERENCE}`}
                          strokeDashoffset={partsOffset}
                          style={{ transition: "all 1s ease" }}
                        ></circle>
                      )}
                      {powerPercent > 0 && (
                        <circle
                          cx="100"
                          cy="100"
                          r="80"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="60"
                          strokeDasharray={`${powerLength} ${CIRCUMFERENCE}`}
                          strokeDashoffset={powerOffset}
                          style={{ transition: "all 1s ease" }}
                        ></circle>
                      )}
                      <circle cx="100" cy="100" r="50" fill="white"></circle>
                    </svg>

                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                      }}
                    >
                      <div style={{ fontSize: "32px", fontWeight: 700, color: "#1f2937" }}>
                        {repeatReasons.totalRepeatCalls}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>Total Calls</div>
                    </div>
                  </>
                )}
              </div>

              {/* Legend */}
              <div
                style={{
                  marginTop: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                {legendRows.map(([color, label, percent]) => (
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }} key={label}>
                    <span
                      style={{
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: color,
                        display: "inline-block",
                      }}
                    ></span>
                    <span style={{ fontSize: "14px", color: "#555" }}>
                      {label}: {round(percent, 1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* GAUGE CHART (RIGHT) */}
            <div className="gauge-cnt2-container" style={{ "--percentage": feedbackTrend.percentage }}>
              <div className="gauge-cnt2-inside-heading">
                Service Feedback Trend (Avg: {feedbackTrend.average_rating}/5)
              </div>

              <div className="gauge-cnt2-arc-container">
                <div className="gauge-cnt2-bg-arc">
                  <div className="gauge-cnt2-progress-arc"></div>
                </div>

                <div className="gauge-cnt2-inner-cutout"></div>
                <div className="gauge-cnt2-indicator"></div>
                <div className="gauge-cnt2-value-display">
                  <div className="gauge-cnt2-percentage">{feedbackTrend.percentage}%</div>
                  <div className="gauge-cnt2-text">Average</div>
                </div>
              </div>

              <div className="gauge-cnt2-labels">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

/* ---------------------------------------------------------
   TAB 2 - WEEKLY
--------------------------------------------------------- */

function WeeklyView({ view }) {
  const { engineer, aging, amc, redTag, satisfaction, recentFeedbacks } = view;

  const kpis = [
    ["Avg Calls Attended per Engineer", engineer.average_calls_per_engineer_week],
    ["Average Response Time (hrs)", view.avgResponseTime],
    ["Repeat Call %", `${view.repeatCallPercent.toFixed(1)}%`],
    ["Customer Regret %", `${round(view.regretPercent, 2).toFixed(2)}%`],
    ["Google Review Collection %", `${view.googleReviews}%`],
    ["AMC Leads Generated", view.amcLeads],
    ["Pending Replacements", view.pendingReplacements],
    ["Standby Units Pending Collection", view.standbyPending],
  ];

  // Red tag bars: max 200px, at least 30px when there is a value.
  const redTagBars = [redTag.week1, redTag.week2, redTag.week3, redTag.week4].map((count) => {
    let height = redTag.maxValue > 0 ? (count * 200) / redTag.maxValue : 0;
    if (count > 0 && height < 30) height = 30;
    return { count, height };
  });

  return (
    <div className="weekly-wrap">
      <h1 className="weekly-heading-card">Weekly Performance Dashboard</h1>

      {/* KPI Tiles */}
      <div className="weekly-kpi-grid">
        {kpis.map(([title, value]) => (
          <div className="weekly-kpi-card" key={title}>
            <div className="weekly-kpi-title">{title}</div>
            <div className="weekly-kpi-value">{value}</div>
          </div>
        ))}
      </div>

      {/* Engineer-wise Stacked Bar Chart */}
      <div className="weekly-chart-card">
        <div className="weekly-chart-title">Engineer-wise Call Volume</div>
        <div className="weekly-legend">
          <div className="weekly-legend-item">
            <div className="weekly-legend-color completed"></div> Completed
          </div>
          <div className="weekly-legend-item">
            <div className="weekly-legend-color pending"></div> Pending
          </div>
        </div>
        <div className="weekly-bar-chart">
          {engineer.per_engineer.map((e, i) => (
            <div className="weekly-bar-group" key={i}>
              <div className="weekly-bar">
                <div className="weekly-segment completed" style={{ height: `${e.completed_height}%` }}>
                  {e.calls_completed}
                </div>
                <div className="weekly-segment pending" style={{ height: `${e.pending_height}%` }}>
                  {e.calls_pending}
                </div>
              </div>
              <div className="weekly-value">Total: {e.total_calls_this_week}</div>
              <div className="weekly-label">{e.engineer_name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Satisfaction Section */}
      <div className="weekly-chart-card">
        <div className="weekly-chart-title">Customer Satisfaction</div>
        <div className="weekly-satisfaction-grid">
          {/* Left Side: Rating Display */}
          <div className="weekly-rating-section">
            <div className="weekly-rating-display">
              <div className="weekly-rating-score">{view.overallAvg}</div>
              <div className="weekly-stars-container">
                {[1, 2, 3, 4, 5].map((n) => {
                  const filled = n <= view.fullStars || (n === view.fullStars + 1 && view.hasHalfStar);
                  return (
                    <span className={filled ? "weekly-star filled" : "weekly-star empty"} key={n}>
                      ★
                    </span>
                  );
                })}
              </div>
              <div className="weekly-rating-label">Average Customer Rating</div>
            </div>

            {/* Weekly Trend Bars */}
            <div className="weekly-trend-title">Weekly Rating Trend</div>
            <div className="weekly-trend">
              {satisfaction.length > 0 ? (
                satisfaction.map((w, i) => (
                  <div className="weekly-week-bar-group" key={w.week_label}>
                    <div
                      className="weekly-week-bar"
                      data-rating={w.average_rating}
                      style={{ height: `${w.bar_height}%`, animationDelay: `${i * 0.2}s` }}
                    ></div>
                    <div className="weekly-week-label">{w.week_label}</div>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center", padding: "20px", color: "#6b7280" }}>No data available</div>
              )}
            </div>
          </div>

          {/* Right Side: Recent Feedbacks */}
          <div className="weekly-feedback-section">
            <h3 className="weekly-feedback-title">Recent Feedbacks</h3>
            <div className="weekly-complaints-list">
              {recentFeedbacks.length > 0 ? (
                recentFeedbacks.map((f, i) => {
                  const feedbackClass = f.rating >= 4 ? "positive" : f.rating <= 2 ? "negative" : "neutral";
                  return (
                    <div className={`weekly-feedback-item ${feedbackClass}`} key={f.id || i}>
                      <div className="weekly-feedback-date">{fmtDateMon(f.created_date)}</div>
                      <div className="weekly-feedback-text">
                        {f.comments} – Customer: {f.customer_name}
                      </div>
                      <div className="weekly-feedback-rating">
                        {starText(f.rating)} <span className="weekly-rating-number">{f.rating}</span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ textAlign: "center", padding: "20px", color: "#6b7280" }}>No feedback available</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Call Ageing Section */}
      <div className="weekly-chart-card">
        <div className="weekly-chart-title">Pending Call Ageing</div>
        <div className="weekly-legend">
          <div className="weekly-legend-item">
            <div className="weekly-legend-color" style={{ background: "#3b82f6" }}></div> 0-2 Days
          </div>
          <div className="weekly-legend-item">
            <div className="weekly-legend-color" style={{ background: "#10b981" }}></div> 3-5 Days
          </div>
          <div className="weekly-legend-item">
            <div className="weekly-legend-color" style={{ background: "#f59e0b" }}></div> &gt;5 Days
          </div>
        </div>
        <div className="weekly-bar-chart">
          {aging.map((pc, i) => {
            const d02 = pc["0-2_Days"];
            const d35 = pc["3-5_Days"];
            const d5 = pc.above_5_Days;
            const total = d02 + d35 + d5;
            const share = (n) => (total > 0 ? (n * 100) / total : 0) || 2;

            return (
              <div className="weekly-bar-group" key={i}>
                <div className="weekly-bar">
                  <div className="weekly-segment" style={{ height: `${share(d02)}%`, background: "#3b82f6" }}>
                    {d02}
                  </div>
                  <div className="weekly-segment" style={{ height: `${share(d35)}%`, background: "#10b981" }}>
                    {d35}
                  </div>
                  <div className="weekly-segment" style={{ height: `${share(d5)}%`, background: "#f59e0b" }}>
                    {d5}
                  </div>
                </div>
                <div className="weekly-value">Total: {total}</div>
                <div className="weekly-label">Week {i + 1}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AMC Offer vs Closed */}
      <div className="weekly-chart-card" style={{ textAlign: "center" }}>
        <div className="weekly-chart-title">AMC Offer vs Closed – Conversion Chart</div>

        <div className="weekly-donut-container">
          <div
            className="weekly-donut"
            style={{
              background: `conic-gradient(from 0deg, #10b981 0% ${amc.closed_percent}%, #3b82f6 ${amc.closed_percent}% 100%)`,
            }}
          >
            <div className="weekly-donut-inner">{amc.total}</div>
          </div>
        </div>

        <div
          className="weekly-legend"
          style={{ justifyContent: "center", display: "flex", gap: "20px", marginTop: "15px" }}
        >
          <div className="weekly-legend-item" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              className="weekly-legend-color"
              style={{ width: "15px", height: "15px", background: "#10b981" }}
            ></div>
            Closed - {amc.closed} ({amc.closed_percent}%)
          </div>

          <div className="weekly-legend-item" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              className="weekly-legend-color"
              style={{ width: "15px", height: "15px", background: "#3b82f6" }}
            ></div>
            Offered - {amc.total}
          </div>
        </div>
      </div>

      {/* Red Tag Item Trend */}
      <div className="weekly-chart-card">
        <div className="weekly-chart-title">Red Tag Item Trend (Service Dept)</div>
        <div className="weekly-legend">
          <div className="weekly-legend-item">
            <div className="weekly-legend-color" style={{ background: "#ef4444" }}></div> Red Tag Items
          </div>
        </div>
        <div
          className="weekly-bar-chart"
          style={{
            height: "200px",
            gap: "20px",
            borderLeft: "2px solid #444",
            borderBottom: "2px solid #444",
            paddingBottom: "10px",
            justifyContent: "space-around",
          }}
        >
          {redTagBars.map((bar, i) => (
            <div className="weekly-bar-group" key={i}>
              <div className="weekly-bar" style={{ height: `${bar.height}px` }}>
                <span className="weekly-segment" style={{ color: "#ffffff", fontSize: "12px", fontWeight: 600 }}>
                  {bar.count}
                </span>
              </div>
              <div className="weekly-label">Week {i + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   TAB 3 - MONTHLY
--------------------------------------------------------- */

const BADGE_BASE = {
  display: "inline-block",
  padding: "5px 12px",
  borderRadius: "12px",
  fontSize: "12px",
  fontWeight: 600,
};
const BADGE_COLORS = {
  green: { backgroundColor: "#d4edda", color: "#155724" },
  orange: { backgroundColor: "#fff3cd", color: "#856404" },
  red: { backgroundColor: "#f8d7da", color: "#721c24" },
  blue: { backgroundColor: "#d1ecf1", color: "#0c5460" },
};

function RepeatTrendChart({ trend }) {
  const count = trend.length;
  const chartWidth = Math.max(700, 80 + count * 90);

  let maxValue = Math.max(0, ...trend.map((t) => t.repeat_calls));
  maxValue = maxValue > 0 ? maxValue + 10 : 100;

  const xStart = 80;
  const xGap = count <= 1 ? 0 : (chartWidth - xStart - 40) / (count - 1);
  const yMin = 180;
  const yRange = yMin - 20;

  const points = trend.map((t, i) => ({
    x: xStart + i * xGap,
    y: yMin - (t.repeat_calls / maxValue) * yRange,
    month: t.month,
  }));

  return (
    <svg viewBox={`0 0 ${chartWidth} 220`} preserveAspectRatio="xMidYMid meet">
      <line x1="50" y1="20" x2="50" y2="180" stroke="#e0e0e0" strokeWidth="1" />
      <line x1="50" y1="180" x2={chartWidth - 20} y2="180" stroke="#e0e0e0" strokeWidth="2" />
      <text x="30" y="185" fontSize="11" fill="#666">0</text>
      <text x="30" y="140" fontSize="11" fill="#666">25</text>
      <text x="30" y="95" fontSize="11" fill="#666">50</text>
      <text x="30" y="50" fontSize="11" fill="#666">75</text>
      <text x="25" y="25" fontSize="11" fill="#666">100</text>

      <polyline
        points={points.map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        className="stroke_blue3"
      />

      {points.map((p, i) => (
        <React.Fragment key={i}>
          <circle cx={p.x} cy={p.y} r="5" fill="#3b82f6" className="point3" />
          <text x={p.x} y="200" textAnchor="middle" fontSize="12" fill="#666">
            {p.month}
          </text>
        </React.Fragment>
      ))}
    </svg>
  );
}

function MonthlyView({ view }) {
  const { callLogs, expense, costByCategory, positiveFeedback, satisfaction, complaints, calibration } = view;

  const overallAvg = satisfaction.overall_average;
  const fullStars = Math.floor(overallAvg);
  const hasHalf = overallAvg - fullStars >= 0.5;
  let starDisplay = "";
  for (let i = 1; i <= 5; i += 1) {
    starDisplay += i <= fullStars || (i === fullStars + 1 && hasHalf) ? "★" : "☆";
  }

  const costBars = [
    ["Under Warranty", costByCategory.w_percentage, ""],
    ["Post Warranty", costByCategory.pw_percentage, " post3"],
    ["AMC", costByCategory.amc_percentage, " amc3"],
  ];

  return (
    <div className="dashboard-container3">
      <div className="page-title3">Monthly Insights</div>

      {/* TOP SECTION */}
      <div className="top-section3">
        <div className="cards3">
          <h3>Total Calls Logged (Month)</h3>
          <div className="tiles3">
            <div className="tile3">
              <div className="label3">Warranty</div>
              <div className="value3">{callLogs.warranty_count}</div>
            </div>
            <div className="tile3">
              <div className="label3">Post Warranty</div>
              <div className="value3">{callLogs.post_warranty}</div>
            </div>
            <div className="tile3">
              <div className="label3">AMC</div>
              <div className="value3">{callLogs.amc_count}</div>
            </div>
          </div>
        </div>

        <div className="cards3">
          <h3>Expenses for Complaints</h3>
          <div className="tiles3">
            <div className="tile3">
              <div className="label3">Warranty Expense</div>
              <div className="value3">₹ {callLogs.warranty_amount}</div>
            </div>
            <div className="tile3">
              <div className="label3">Post Warranty</div>
              <div className="value3">₹ {callLogs.post_warranty_amount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* SERVICE INSIGHTS */}
      <div className="cards3">
        <h3>Service Insights</h3>
        <div className="service-grid3">
          <div className="tile3">
            <div className="label3">Indirect Expenses</div>
            <div className="value3">₹ {view.indirectExpense}</div>
          </div>
          <div className="tile3">
            <div className="label3">Repeat Call Analysis</div>
            <div className="value3">{view.repeatCalls} calls</div>
          </div>
          <div className="tile3">
            <div className="label3">Stock Unavailability Delays</div>
            <div className="value3">{view.stockDelays} cases</div>
          </div>
          <div className="tile3">
            <div className="label3">Training Hours Conducted</div>
            <div className="value3">{view.trainingHours} hrs</div>
          </div>
          <div className="tile3">
            <div className="label3">Tool &amp; Vehicle Inspections Completed</div>
            <div className="value3">{view.compliance.compliance_percentage}%</div>
          </div>
          <div className="tile3">
            <div className="label3">Customer Feedback Summary</div>
            <div className="value3">
              {positiveFeedback.avg_feedback} ⭐ | {positiveFeedback.positive_feedback_percentage}% Positive
            </div>
          </div>
        </div>
      </div>

      {/* PIE + BAR CHART FLEX SECTION */}
      <div className="flex-chart-container3">
        {/* PIE CHART */}
        <div className="card3 pie-chart-container3">
          <h3>Expense Breakdown</h3>

          <div
            className="pie-chart3"
            style={{ "--direct3": expense.direct_percent, "--indirect3": expense.indirect_percent }}
          ></div>

          <div className="tooltip3 direct-tooltip3">
            Direct: ₹ {expense.direct_expense} ({expense.direct_percent}%)
          </div>
          <div className="tooltip3 indirect-tooltip3">
            Indirect: ₹ {expense.indirect_expense} ({expense.indirect_percent}%)
          </div>

          <div className="legend3">
            <span>
              <span className="dot3 direct-dot3"></span>
              Direct - ₹ {expense.direct_expense} ({expense.direct_percent}%)
            </span>
            <span>
              <span className="dot3 indirect-dot3"></span>
              Indirect - ₹ {expense.indirect_expense} ({expense.indirect_percent}%)
            </span>
          </div>
        </div>

        {costByCategory.has_data ? (
          <div className="card3 bar-chart-container3">
            <h3>Complaint Cost by Category</h3>

            {costBars.map(([label, percent, extraClass]) => (
              <div className="bar3" key={label}>
                <div className="bar-label3">{label}</div>
                <div className="bar-inner3">
                  <div className={`bar-fill3${extraClass}`} style={{ "--bar-width": `${percent}%` }}>
                    <div className="bar-value3">{round(percent, 1)}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="card3 bar-chart-container3"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "300px" }}
          >
            <div style={{ color: "#6b7280", fontSize: "16px" }}>
              No complaint cost category data available for this period
            </div>
          </div>
        )}
      </div>

      {/* REPEAT CALL TREND + POSITIVE FEEDBACK GAUGE */}
      <div className="chart-gauge-wrapper3">
        <div className="card3">
          <h3>Repeat Call Trend – Month-over-Month</h3>
          <div className="line-chart3">
            <RepeatTrendChart trend={view.repeatTrend} />
          </div>
          <div className="legend3">
            <div className="legend-item3">
              <div className="legend-color3" style={{ background: "#3b82f6" }}></div>
              <span>Repeat Calls</span>
            </div>
          </div>
        </div>

        <div className="gauge-wrapper3">
          <div className="gauge-container3" style={{ "--percentage": positiveFeedback.positive_feedback_percentage }}>
            <div className="gauge-inside-heading3">% Positive Feedback</div>

            <div className="gauge-arc-container3">
              <div className="gauge-bg-arc3">
                <div className="gauge-progress-arc3"></div>
              </div>

              <div className="gauge-inner-cutout3"></div>

              <div className="gauge-indicator3"></div>
              <div className="gauge-value-display3">
                <div className="gauge-percentage3">{positiveFeedback.positive_feedback_percentage}</div>
                <div className="gauge-text3">Feedback</div>
              </div>
            </div>

            <div className="gauge-labels3">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOMER SATISFACTION */}
      <div className="benchmarks-section3 animate-in">
        <div className="section-header3">
          <div className="section-title3">Customer Satisfaction ({satisfaction.overall_count} reviews)</div>
        </div>
        <div className="satisfaction-grid3">
          <div>
            <div className="rating-display3">
              <div className="rating-score3">{overallAvg}</div>
              <div className="rating-stars3">{starDisplay}</div>
              <div className="rating-label3">Average Customer Rating</div>
            </div>
            <div className="bar-chart3" style={{ height: "180px", marginTop: "20px" }}>
              {satisfaction.months.map((m) => {
                let heightPercent = 0;
                if (m.average > 0) {
                  heightPercent = (m.average / 5.0) * 100;
                  if (heightPercent < 5) heightPercent = 5;
                }
                return (
                  <div className="bar-group3" key={m.name}>
                    <div className="bars3">
                      <div
                        className="bar3"
                        style={
                          m.count > 0
                            ? {
                                height: `${heightPercent}%`,
                                background: "linear-gradient(180deg, #fbbf24 0%, #f59e0b 100%)",
                              }
                            : { height: "5%", background: "#e5e7eb" }
                        }
                      ></div>
                    </div>
                    <div className="bar-label3">{m.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "15px", color: "#1f2937" }}>
              Recent Complaints
            </h3>
            <div className="complaints-list3">
              {complaints.length > 0 ? (
                complaints.map((c, i) => (
                  <div className="complaint-item3" key={i}>
                    <div className="complaint-date3">{fmtDate(c.feedback_date)}</div>
                    <div className="complaint-text3">
                      {c.customer_feedback} - Customer: {c.customer_name}
                    </div>
                  </div>
                ))
              ) : (
                <div className="complaint-item3">
                  <div className="complaint-date3">Empty</div>
                  <div className="complaint-text3">No Data found!</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CALIBRATION / MAINTENANCE REPORTS */}
      <div className="card3">
        <h3>Calibration / Maintenance Reports</h3>
        <table className="table3" style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
          <thead>
            <tr>
              <th>Equipment</th>
              <th>Report Type</th>
              <th>Last Service Date</th>
              <th>Next Service Date</th>
              <th>Service Person</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {calibration.map((record, i) => {
              let rowStyle = {};
              if (record.is_due_this_month) rowStyle = { backgroundColor: "#fffacd" };
              else if (record.is_overdue) rowStyle = { backgroundColor: "#ffe6e6" };

              return (
                <tr style={rowStyle} key={i}>
                  <td>{record.equipment}</td>
                  <td>{record.report_type}</td>
                  <td>{record.last_service_date}</td>
                  <td>{record.next_service_date}</td>
                  <td>{record.service_person}</td>
                  <td style={{ textAlign: "center" }}>
                    <span style={{ ...BADGE_BASE, ...BADGE_COLORS[record.status_color] }}>{record.status}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
   APP: tabs + lazy, sequential dataset loading
--------------------------------------------------------- */

function Notice({ children, error }) {
  return <div className={error ? "widget-status widget-error" : "widget-status"}>{children}</div>;
}

export default function App() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [tab, setTab] = useState("today");
  const [datasets, setDatasets] = useState({});
  const [stages, setStages] = useState({ today: "idle", weekly: "idle", monthly: "idle" });
  const [fatal, setFatal] = useState("");
  const started = useRef({});
  const printed = useRef({});

  // Loads the datasets of one tab, one request after another; each result is
  // published as soon as it arrives. Datasets already loaded are not re-fetched.
  const startStage = useCallback(
    async (stage) => {
      if (started.current[stage]) return;
      started.current[stage] = true;
      setStages((prev) => ({ ...prev, [stage]: "loading" }));

      try {
        for (const key of stageKeys(stage)) {
          const records = await loadDataset(key, today);
          setDatasets((prev) => ({ ...prev, [key]: records }));
        }
        setStages((prev) => ({ ...prev, [stage]: "done" }));
      } catch (error) {
        console.error("Dashboard loading error:", error);
        setFatal(describeError(error));
      }
    },
    [today],
  );

  useEffect(() => {
    if (!window.ZOHO?.CREATOR?.DATA?.getRecords) {
      setFatal("Zoho Creator Widget SDK is not available.");
      return;
    }
    startStage("today");
  }, [startStage]);

  useEffect(() => {
    if (fatal) return;
    if (tab === "weekly") startStage("weekly");
    if (tab === "monthly") startStage("monthly");
  }, [tab, fatal, startStage]);

  const todayReady = stages.today === "done";
  const weeklyReady = todayReady && stages.weekly === "done";
  const monthlyReady = todayReady && stages.monthly === "done";

  const todayView = useMemo(
    () => (todayReady ? computeTodayView(datasets, today) : null),
    [todayReady, datasets, today],
  );
  const weeklyView = useMemo(
    () => (weeklyReady ? computeWeeklyView(datasets, today) : null),
    [weeklyReady, datasets, today],
  );
  const monthlyView = useMemo(
    () => (monthlyReady ? computeMonthlyView(datasets, today) : null),
    [monthlyReady, datasets, today],
  );

  // CONFIG.DEBUG: print every computed value once per tab, with the on-screen
  // labels, so it can be compared with the Deluge dashboard.
  useEffect(() => {
    if (!CONFIG.DEBUG) return;
    [["today", todayView], ["weekly", weeklyView], ["monthly", monthlyView]].forEach(([name, view]) => {
      if (!view || printed.current[name]) return;
      printed.current[name] = true;
      const rows = summarizeView(name, view);
      debugStore.results[name] = rows;
      console.log(`[Dashboard] ${name} values - compare with the Deluge dashboard (copy(__ADROIT_DEBUG__.text()) copies all tabs)`);
      console.table(rows.map(({ label, value }) => ({ label, value })));
    });
  }, [todayView, weeklyView, monthlyView]);

  const loading = <Notice>{fatal ? "" : "Loading dashboard data..."}</Notice>;

  return (
    <>
      <style>{STYLES}</style>
      <style>{EXTRA_STYLES}</style>

      <div className="tab-container">
        {fatal && <Notice error>{fatal}</Notice>}

        {/* Tabs Inputs */}
        <input
          type="radio"
          name="tabs"
          id="tab1"
          className="tab-input"
          checked={tab === "today"}
          onChange={() => setTab("today")}
        />
        <input
          type="radio"
          name="tabs"
          id="tab2"
          className="tab-input"
          checked={tab === "weekly"}
          onChange={() => setTab("weekly")}
        />
        <input
          type="radio"
          name="tabs"
          id="tab3"
          className="tab-input"
          checked={tab === "monthly"}
          onChange={() => setTab("monthly")}
        />

        {/* Tabs Buttons */}
        <div className="tab-buttons">
          <label htmlFor="tab1" className="tab-label">Today's</label>
          <label htmlFor="tab2" className="tab-label">Weekly</label>
          <label htmlFor="tab3" className="tab-label">Monthly</label>
        </div>

        {/* Tabs Content */}
        <div className="tab-contents">
          <div id="content1" className="tab-content">
            {todayView ? <TodayView view={todayView} today={today} /> : loading}
          </div>

          <div id="content2" className="tab-content">
            {weeklyView ? <WeeklyView view={weeklyView} /> : tab === "weekly" ? loading : null}
          </div>

          <div id="content3" className="tab-content">
            {monthlyView ? <MonthlyView view={monthlyView} /> : tab === "monthly" ? loading : null}
          </div>
        </div>
      </div>
    </>
  );
}
