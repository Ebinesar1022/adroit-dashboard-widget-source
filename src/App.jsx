import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Alert,
  Typography,
  Paper,
  Chip,
  Divider,
} from "@mui/material";

/* =========================================================
   CONFIGURATION
========================================================= */

const CONFIG = {
  APP_NAME: "shanth_adroitpower",

  REPORTS: {
    SERVICE_CALL_LOG: "Service_Call_Log",
    SERVICE_REPORT: "Service_Report",
    SERVICE_FEEDBACK: "Service_Feedback1",
    FIELD_EXECUTIVE: "Field_Executive",
    EMPLOYEES: "Employees",
    SERVICE_QUOTATION: "Service_Quotation",
    SERVICE_INVOICE: "Service_Invoice_Follow_up",
    CUSTOMER: "Customer",
    REJECTION_REPLACEMENT: "Rejection_And_Replacement_Register",
    STANDBY_UNIT: "Stand_By_Unit",
    AMC_CONTRACT: "AMC_Contract",
    PRODUCT: "Product",
    EXPENSE_ENGINEER: "Expense_of_Engineer",
    REWORK: "Rework",
    TRAINING_REPORT: "Training_Report",
    TOOL_KIT: "Service_Tools_Kit_of_Engineers",
    VEHICLE_SERVICE: "Vehicle_Service_Report",
    INTERNAL_CALIBRATION: "Internal_Calibration",
  },

  PAGE_SIZE: 200,
};

/* =========================================================
   DATE UTILITIES
========================================================= */

function pad(value) {
  return String(value).padStart(2, "0");
}

function formatDate(date) {
  if (!date) {
    return "";
  }

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return "";
  }

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function today() {
  return formatDate(new Date());
}

function startOfWeek(date = new Date()) {
  const d = new Date(date);

  const day = d.getDay();

  /*
    Sunday = 0
    Monday = 1
    ...
  */

  const diff = day === 0 ? -6 : 1 - day;

  d.setDate(d.getDate() + diff);

  return d;
}

function startOfMonth(date = new Date()) {
  const d = new Date(date);

  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function endOfMonth(date = new Date()) {
  const d = new Date(date);

  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function subtractDays(date, days) {
  const d = new Date(date);

  d.setDate(d.getDate() - days);

  return d;
}

function isBetween(date, start, end) {
  if (!date) {
    return false;
  }

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return false;
  }

  return d >= new Date(start) && d <= new Date(end);
}

/* =========================================================
   VALUE UTILITIES
========================================================= */

function number(value) {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const n = Number(value);

  return Number.isNaN(n) ? 0 : n;
}

function round(value, decimals = 1) {
  const multiplier = Math.pow(10, decimals);

  return Math.round(number(value) * multiplier) / multiplier;
}

function percentage(part, total) {
  if (!total) {
    return 0;
  }

  return round((part * 100) / total, 1);
}

/* =========================================================
   CREATOR API
========================================================= */

async function getAllRecords(reportName, criteria = "") {
  let allRecords = [];

  let cursor = null;

  let page = 0;

  try {
    do {
      page++;

      const config = {
        app_name: CONFIG.APP_NAME,
        report_name: reportName,
        max_records: CONFIG.PAGE_SIZE,
      };

      if (criteria) {
        config.criteria = criteria;
      }

      if (cursor) {
        config.record_cursor = cursor;
      }

      console.log(`Fetching ${reportName} - page ${page}`);

      const response = await ZOHO.CREATOR.DATA.getRecords(config);

      const records = response?.data || [];

      allRecords.push(...records);

      cursor = response?.record_cursor || null;
    } while (cursor);

    console.log(`${reportName}: ${allRecords.length} records`);

    return allRecords;
  } catch (error) {
    console.error(`Failed to fetch ${reportName}`, error);

    throw error;
  }
}

/* =========================================================
   DATASET LOADER
========================================================= */

async function loadDashboardData() {
  /*
    IMPORTANT:

    Phase 1 deliberately fetches the raw
    datasets.

    We will use these datasets in Phase 2,
    3 and 4 instead of repeatedly calling
    Creator.
  */

  const [
    serviceCallLogs,
    serviceReports,
    feedbacks,
    fieldExecutives,
    employees,
    quotations,
    invoices,
    customers,
    replacements,
    standbyUnits,
    amcContracts,
    products,
    engineerExpenses,
    reworks,
    trainingReports,
    toolReports,
    vehicleReports,
    calibrationRecords,
  ] = await Promise.all([
    getAllRecords(CONFIG.REPORTS.SERVICE_CALL_LOG),

    getAllRecords(CONFIG.REPORTS.SERVICE_REPORT),

    getAllRecords(CONFIG.REPORTS.SERVICE_FEEDBACK),

    getAllRecords(CONFIG.REPORTS.FIELD_EXECUTIVE),

    getAllRecords(CONFIG.REPORTS.EMPLOYEES),

    getAllRecords(CONFIG.REPORTS.SERVICE_QUOTATION),

    getAllRecords(CONFIG.REPORTS.SERVICE_INVOICE),

    getAllRecords(CONFIG.REPORTS.CUSTOMER),

    getAllRecords(CONFIG.REPORTS.REJECTION_REPLACEMENT),

    getAllRecords(CONFIG.REPORTS.STANDBY_UNIT),

    getAllRecords(CONFIG.REPORTS.AMC_CONTRACT),

    getAllRecords(CONFIG.REPORTS.PRODUCT),

    getAllRecords(CONFIG.REPORTS.EXPENSE_ENGINEER),

    getAllRecords(CONFIG.REPORTS.REWORK),

    getAllRecords(CONFIG.REPORTS.TRAINING_REPORT),

    getAllRecords(CONFIG.REPORTS.TOOL_KIT),

    getAllRecords(CONFIG.REPORTS.VEHICLE_SERVICE),

    getAllRecords(CONFIG.REPORTS.INTERNAL_CALIBRATION),
  ]);

  return {
    serviceCallLogs,
    serviceReports,
    feedbacks,
    fieldExecutives,
    employees,
    quotations,
    invoices,
    customers,
    replacements,
    standbyUnits,
    amcContracts,
    products,
    engineerExpenses,
    reworks,
    trainingReports,
    toolReports,
    vehicleReports,
    calibrationRecords,
  };
}

/* =========================================================
   DATASET SUMMARY
========================================================= */

function getDatasetSummary(data) {
  return Object.entries(data).map(([name, records]) => ({
    name,
    count: Array.isArray(records) ? records.length : 0,
  }));
}

/* =========================================================
   MAIN APP
========================================================= */

export default function App() {
  const [dashboardData, setDashboardData] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);

      setError("");

      const data = await loadDashboardData();

      setDashboardData(data);
    } catch (err) {
      console.error(err);

      setError(err?.message || "Unable to load Creator data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    /*
      Initialize Creator Widget
    */

    const initialize = async () => {
      try {
        if (typeof ZOHO === "undefined") {
          throw new Error("ZOHO Creator SDK is not available.");
        }

        await ZOHO.embeddedApp.init();

        console.log("Zoho Creator SDK initialized");

        await loadData();
      } catch (err) {
        console.error("Widget initialization failed", err);

        setError(err?.message || "Widget initialization failed.");

        setLoading(false);
      }
    };

    initialize();
  }, []);

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <CircularProgress />

        <Typography>Loading service dashboard data...</Typography>
      </Box>
    );
  }

  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <Box
        sx={{
          p: 4,
          minHeight: "100vh",
          background: "#f5f7fb",
        }}
      >
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>

        <Button variant="contained" onClick={loadData}>
          Retry
        </Button>
      </Box>
    );
  }

  /* =======================================================
     PHASE 1 TEST SCREEN
  ======================================================= */

  const summary = getDatasetSummary(dashboardData);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "#f5f7fb",
        p: 4,
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        <Box
          sx={{
            mb: 4,
          }}
        >
          <Typography variant="h4" fontWeight={700}>
            Adroit Service Performance Dashboard
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Phase 1 — Creator Data Layer
          </Typography>

          <Chip label={`Loaded on ${today()}`} sx={{ mt: 2 }} />
        </Box>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
            Creator Dataset Status
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {summary.map((item) => (
            <Box
              key={item.name}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 1.2,
                borderBottom: "1px solid #eee",
              }}
            >
              <Typography>{item.name}</Typography>

              <Chip
                label={`${item.count} records`}
                color={item.count > 0 ? "success" : "default"}
                size="small"
              />
            </Box>
          ))}
        </Paper>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            gap: 2,
          }}
        >
          <Button variant="contained" onClick={loadData}>
            Refresh Data
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
