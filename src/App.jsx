// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Alert,
//   Typography,
//   Paper,
//   Chip,
//   Divider,
// } from "@mui/material";

// /* =========================================================
//    CONFIGURATION
// ========================================================= */

// const CONFIG = {
//   APP_NAME: "adroit",

//   REPORTS: {
//     SERVICE_CALL_LOG: "Service_Call_Log",
//     SERVICE_REPORT: "Service_Report",
//     SERVICE_FEEDBACK: "Service_Feedback1",
//     FIELD_EXECUTIVE: "Field_Executive",
//     EMPLOYEES: "Employees",
//     SERVICE_QUOTATION: "Service_Quotation",
//     SERVICE_INVOICE: "Service_Invoice_Follow_up",
//     CUSTOMER: "Customer",
//     REJECTION_REPLACEMENT: "Rejection_And_Replacement_Register",
//     STANDBY_UNIT: "Stand_By_Unit",
//     AMC_CONTRACT: "AMC_Contract",
//     PRODUCT: "Product",
//     EXPENSE_ENGINEER: "Expense_of_Engineer",
//     REWORK: "Rework",
//     TRAINING_REPORT: "Training_Report",
//     TOOL_KIT: "Service_Tools_Kit_of_Engineers",
//     VEHICLE_SERVICE: "Vehicle_Service_Report",
//     INTERNAL_CALIBRATION: "Internal_Calibration",
//   },

//   PAGE_SIZE: 200,
// };

// /* =========================================================
//    DATE UTILITIES
// ========================================================= */

// function pad(value) {
//   return String(value).padStart(2, "0");
// }

// function formatDate(date) {
//   if (!date) {
//     return "";
//   }

//   const d = new Date(date);

//   if (Number.isNaN(d.getTime())) {
//     return "";
//   }

//   return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
// }

// function today() {
//   return formatDate(new Date());
// }

// function startOfWeek(date = new Date()) {
//   const d = new Date(date);

//   const day = d.getDay();

//   /*
//     Sunday = 0
//     Monday = 1
//     ...
//   */

//   const diff = day === 0 ? -6 : 1 - day;

//   d.setDate(d.getDate() + diff);

//   return d;
// }

// function startOfMonth(date = new Date()) {
//   const d = new Date(date);

//   return new Date(d.getFullYear(), d.getMonth(), 1);
// }

// function endOfMonth(date = new Date()) {
//   const d = new Date(date);

//   return new Date(d.getFullYear(), d.getMonth() + 1, 0);
// }

// function subtractDays(date, days) {
//   const d = new Date(date);

//   d.setDate(d.getDate() - days);

//   return d;
// }

// function isBetween(date, start, end) {
//   if (!date) {
//     return false;
//   }

//   const d = new Date(date);

//   if (Number.isNaN(d.getTime())) {
//     return false;
//   }

//   return d >= new Date(start) && d <= new Date(end);
// }

// /* =========================================================
//    VALUE UTILITIES
// ========================================================= */

// function number(value) {
//   if (value === null || value === undefined || value === "") {
//     return 0;
//   }

//   const n = Number(value);

//   return Number.isNaN(n) ? 0 : n;
// }

// function round(value, decimals = 1) {
//   const multiplier = Math.pow(10, decimals);

//   return Math.round(number(value) * multiplier) / multiplier;
// }

// function percentage(part, total) {
//   if (!total) {
//     return 0;
//   }

//   return round((part * 100) / total, 1);
// }

// /* =========================================================
//    CREATOR API
// ========================================================= */

// async function getAllRecords(reportName, criteria = "") {
//   let allRecords = [];

//   let cursor = null;

//   let page = 0;

//   try {
//     do {
//       page++;

//       const config = {
//         // app_name: CONFIG.APP_NAME,
//         report_name: reportName,
//         max_records: 1000,
//       };

//       if (criteria) {
//         config.criteria = criteria;
//       }

//       if (cursor) {
//         config.record_cursor = cursor;
//       }

//       console.log(`Fetching ${reportName} - page ${page}`);

//       const response = await ZOHO.CREATOR.DATA.getRecords(config);

//       console.log(response, "Response from Creator API ______>>>>");
//       const records = response?.data || [];

//       allRecords.push(...records);

//       cursor = response?.record_cursor || null;
//     } while (cursor);

//     console.log(`${reportName}: ${allRecords.length} records`);

//     return allRecords;
//   } catch (error) {
//     console.error(`Failed to fetch ${reportName}`, error);

//     throw error;
//   }
// }

// /* =========================================================
//    DATASET LOADER
// ========================================================= */

// async function loadDashboardData() {
//   /*
//     IMPORTANT:

//     Phase 1 deliberately fetches the raw
//     datasets.

//     We will use these datasets in Phase 2,
//     3 and 4 instead of repeatedly calling
//     Creator.
//   */

//   const [
//     serviceCallLogs,
//     serviceReports,
//     feedbacks,
//     fieldExecutives,
//     employees,
//     quotations,
//     invoices,
//     customers,
//     replacements,
//     standbyUnits,
//     amcContracts,
//     products,
//     engineerExpenses,
//     reworks,
//     trainingReports,
//     toolReports,
//     vehicleReports,
//     calibrationRecords,
//   ] = await Promise.all([
//     getAllRecords(CONFIG.REPORTS.SERVICE_CALL_LOG),

//     getAllRecords(CONFIG.REPORTS.SERVICE_REPORT),

//     getAllRecords(CONFIG.REPORTS.SERVICE_FEEDBACK),

//     getAllRecords(CONFIG.REPORTS.FIELD_EXECUTIVE),

//     getAllRecords(CONFIG.REPORTS.EMPLOYEES),

//     getAllRecords(CONFIG.REPORTS.SERVICE_QUOTATION),

//     getAllRecords(CONFIG.REPORTS.SERVICE_INVOICE),

//     getAllRecords(CONFIG.REPORTS.CUSTOMER),

//     getAllRecords(CONFIG.REPORTS.REJECTION_REPLACEMENT),

//     getAllRecords(CONFIG.REPORTS.STANDBY_UNIT),

//     getAllRecords(CONFIG.REPORTS.AMC_CONTRACT),

//     getAllRecords(CONFIG.REPORTS.PRODUCT),

//     getAllRecords(CONFIG.REPORTS.EXPENSE_ENGINEER),

//     getAllRecords(CONFIG.REPORTS.REWORK),

//     getAllRecords(CONFIG.REPORTS.TRAINING_REPORT),

//     getAllRecords(CONFIG.REPORTS.TOOL_KIT),

//     getAllRecords(CONFIG.REPORTS.VEHICLE_SERVICE),

//     getAllRecords(CONFIG.REPORTS.INTERNAL_CALIBRATION),
//   ]);

//   return {
//     serviceCallLogs,
//     serviceReports,
//     feedbacks,
//     fieldExecutives,
//     employees,
//     quotations,
//     invoices,
//     customers,
//     replacements,
//     standbyUnits,
//     amcContracts,
//     products,
//     engineerExpenses,
//     reworks,
//     trainingReports,
//     toolReports,
//     vehicleReports,
//     calibrationRecords,
//   };
// }

// /* =========================================================
//    DATASET SUMMARY
// ========================================================= */

// function getDatasetSummary(data) {
//   return Object.entries(data).map(([name, records]) => ({
//     name,
//     count: Array.isArray(records) ? records.length : 0,
//   }));
// }

// /* =========================================================
//    MAIN APP
// ========================================================= */

// export default function App() {
//   const [dashboardData, setDashboardData] = useState(null);

//   const [loading, setLoading] = useState(true);

//   const [error, setError] = useState("");

//   const loadData = async () => {
//     try {
//       setLoading(true);

//       setError("");

//       const data = await loadDashboardData();

//       setDashboardData(data);
//     } catch (err) {
//       console.error(err);

//       setError(err?.message || "Unable to load Creator data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const loadWidgetData = async () => {
//       try {
//         if (typeof ZOHO === "undefined") {
//           throw new Error("ZOHO Creator SDK is not available.");
//         }

//         await loadData();
//       } catch (err) {
//         console.error("Widget data loading failed", err);

//         setError(err?.message || "Unable to load Creator data.");

//         setLoading(false);
//       }
//     };

//     loadWidgetData();
//   }, []);

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           flexDirection: "column",
//           gap: 2,
//         }}
//       >
//         <CircularProgress />

//         <Typography>Loading service dashboard data...</Typography>
//       </Box>
//     );
//   }

//   /* =======================================================
//      ERROR
//   ======================================================= */

//   if (error) {
//     return (
//       <Box
//         sx={{
//           p: 4,
//           minHeight: "100vh",
//           background: "#f5f7fb",
//         }}
//       >
//         <Alert severity="error" sx={{ mb: 2 }}>
//           {error}
//         </Alert>

//         <Button variant="contained" onClick={loadData}>
//           Retry
//         </Button>
//       </Box>
//     );
//   }

//   /* =======================================================
//      PHASE 1 TEST SCREEN
//   ======================================================= */

//   const summary = getDatasetSummary(dashboardData);

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         background: "#f5f7fb",
//         p: 4,
//       }}
//     >
//       <Box
//         sx={{
//           maxWidth: 1200,
//           mx: "auto",
//         }}
//       >
//         <Box
//           sx={{
//             mb: 4,
//           }}
//         >
//           <Typography variant="h4" fontWeight={700}>
//             Adroit Service Performance Dashboard
//           </Typography>

//           <Typography color="text.secondary" sx={{ mt: 1 }}>
//             Phase 1 — Creator Data Layer
//           </Typography>

//           <Chip label={`Loaded on ${today()}`} sx={{ mt: 2 }} />
//         </Box>

//         <Paper
//           sx={{
//             p: 3,
//             borderRadius: 3,
//           }}
//         >
//           <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
//             Creator Dataset Status
//           </Typography>

//           <Divider sx={{ mb: 2 }} />

//           {summary.map((item) => (
//             <Box
//               key={item.name}
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 py: 1.2,
//                 borderBottom: "1px solid #eee",
//               }}
//             >
//               <Typography>{item.name}</Typography>

//               <Chip
//                 label={`${item.count} records`}
//                 color={item.count > 0 ? "success" : "default"}
//                 size="small"
//               />
//             </Box>
//           ))}
//         </Paper>

//         <Box
//           sx={{
//             mt: 3,
//             display: "flex",
//             gap: 2,
//           }}
//         >
//           <Button variant="contained" onClick={loadData}>
//             Refresh Data
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }
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
  APP_NAME: "adroit",

  REPORTS: {
    SERVICE_CALL_LOG: "Service_Call_Logs",
    SERVICE_REPORT: "All_Service_Reports",
    SERVICE_FEEDBACK: "All_Service_Feedback1",
    FIELD_EXECUTIVE: "Field_Executives",
    EMPLOYEES: "All_Employees",
    SERVICE_QUOTATION: "Service_Quotations",
    SERVICE_INVOICE: "Service_Invoice_Follow_up_Un_paid",
    CUSTOMER: "All_Customers",
    REJECTION_REPLACEMENT: "Rejection_And_Replacement_Register_Report",
    STANDBY_UNIT: "Stand_By_Unit1",
    AMC_CONTRACT: "All_AMC_Contract",
    PRODUCT: "All_Product",
    EXPENSE_ENGINEER: "Expense_of_Engineer_Report",
    REWORK: "All_Reworks",
    TRAINING_REPORT: "Training_Reports",
    TOOL_KIT: "Production_Tool_Kit_of_Engineers1",
    VEHICLE_SERVICE: "Vehicle_Service_Reports",
    INTERNAL_CALIBRATION: "Internal_Calibrations",
  },

  PAGE_SIZE: 1000,
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
   SEQUENTIAL FETCHING
========================================================= */

async function getAllRecords(reportName, criteria = "") {
  let allRecords = [];

  let cursor = null;

  let page = 0;

  try {
    do {
      page++;

      const config = {
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

      console.log(`${reportName} response:`, response);

      const records = response?.data || [];

      allRecords.push(...records);

      cursor = response?.record_cursor || null;

      console.log(`${reportName} - page ${page} loaded: ${records.length}`);
    } while (cursor);

    console.log(`${reportName}: ${allRecords.length} total records`);

    return allRecords;
  } catch (error) {
    console.error(`Failed to fetch ${reportName}`, error);

    throw error;
  }
}

/* =========================================================
   DATASET LOADER
   IMPORTANT:
   NO Promise.all()
========================================================= */

async function loadDashboardData() {
  const data = {};

  /* -----------------------------------------
     1. SERVICE CALL LOG
  ----------------------------------------- */

  console.log("1/18 Fetching Service Call Log...");

  data.serviceCallLogs = await getAllRecords(CONFIG.REPORTS.SERVICE_CALL_LOG);

  /* -----------------------------------------
     2. SERVICE REPORT
  ----------------------------------------- */

  console.log("2/18 Fetching Service Report...");

  data.serviceReports = await getAllRecords(CONFIG.REPORTS.SERVICE_REPORT);

  /* -----------------------------------------
     3. SERVICE FEEDBACK
  ----------------------------------------- */

  console.log("3/18 Fetching Service Feedback...");

  data.feedbacks = await getAllRecords(CONFIG.REPORTS.SERVICE_FEEDBACK);

  /* -----------------------------------------
     4. FIELD EXECUTIVE
  ----------------------------------------- */

  console.log("4/18 Fetching Field Executive...");

  data.fieldExecutives = await getAllRecords(CONFIG.REPORTS.FIELD_EXECUTIVE);

  /* -----------------------------------------
     5. EMPLOYEES
  ----------------------------------------- */

  console.log("5/18 Fetching Employees...");

  data.employees = await getAllRecords(CONFIG.REPORTS.EMPLOYEES);

  /* -----------------------------------------
     6. SERVICE QUOTATION
  ----------------------------------------- */

  console.log("6/18 Fetching Service Quotation...");

  data.quotations = await getAllRecords(CONFIG.REPORTS.SERVICE_QUOTATION);

  /* -----------------------------------------
     7. SERVICE INVOICE
  ----------------------------------------- */

  console.log("7/18 Fetching Service Invoice...");

  data.invoices = await getAllRecords(CONFIG.REPORTS.SERVICE_INVOICE);

  /* -----------------------------------------
     8. CUSTOMER
  ----------------------------------------- */

  console.log("8/18 Fetching Customer...");

  data.customers = await getAllRecords(CONFIG.REPORTS.CUSTOMER);

  /* -----------------------------------------
     9. REPLACEMENT
  ----------------------------------------- */

  console.log("9/18 Fetching Replacement...");

  data.replacements = await getAllRecords(CONFIG.REPORTS.REJECTION_REPLACEMENT);

  /* -----------------------------------------
     10. STANDBY UNIT
  ----------------------------------------- */

  console.log("10/18 Fetching Standby Unit...");

  data.standbyUnits = await getAllRecords(CONFIG.REPORTS.STANDBY_UNIT);

  /* -----------------------------------------
     11. AMC CONTRACT
  ----------------------------------------- */

  console.log("11/18 Fetching AMC Contract...");

  data.amcContracts = await getAllRecords(CONFIG.REPORTS.AMC_CONTRACT);

  /* -----------------------------------------
     12. PRODUCT
  ----------------------------------------- */

  console.log("12/18 Fetching Product...");

  data.products = await getAllRecords(CONFIG.REPORTS.PRODUCT);

  /* -----------------------------------------
     13. ENGINEER EXPENSE
  ----------------------------------------- */

  console.log("13/18 Fetching Engineer Expense...");

  data.engineerExpenses = await getAllRecords(CONFIG.REPORTS.EXPENSE_ENGINEER);

  /* -----------------------------------------
     14. REWORK
  ----------------------------------------- */

  console.log("14/18 Fetching Rework...");

  data.reworks = await getAllRecords(CONFIG.REPORTS.REWORK);

  /* -----------------------------------------
     15. TRAINING REPORT
  ----------------------------------------- */

  console.log("15/18 Fetching Training Report...");

  data.trainingReports = await getAllRecords(CONFIG.REPORTS.TRAINING_REPORT);

  /* -----------------------------------------
     16. TOOL KIT
  ----------------------------------------- */

  console.log("16/18 Fetching Tool Kit...");

  data.toolReports = await getAllRecords(CONFIG.REPORTS.TOOL_KIT);

  /* -----------------------------------------
     17. VEHICLE SERVICE
  ----------------------------------------- */

  console.log("17/18 Fetching Vehicle Service...");

  data.vehicleReports = await getAllRecords(CONFIG.REPORTS.VEHICLE_SERVICE);

  /* -----------------------------------------
     18. INTERNAL CALIBRATION
  ----------------------------------------- */

  console.log("18/18 Fetching Internal Calibration...");

  data.calibrationRecords = await getAllRecords(
    CONFIG.REPORTS.INTERNAL_CALIBRATION,
  );

  console.log("=================================");

  console.log("ALL DATASETS LOADED");

  console.log("=================================");

  return data;
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

      console.log("Starting dashboard data loading...");

      const data = await loadDashboardData();

      setDashboardData(data);

      console.log("Dashboard data loaded successfully");
    } catch (err) {
      console.error("Dashboard loading error:", err);

      setError(err?.message || "Unable to load Creator data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadWidgetData = async () => {
      try {
        if (typeof ZOHO === "undefined") {
          throw new Error("ZOHO Creator SDK is not available.");
        }

        console.log("ZOHO Creator SDK detected.");

        await loadData();
      } catch (err) {
        console.error("Widget data loading failed:", err);

        setError(err?.message || "Unable to load Creator data.");

        setLoading(false);
      }
    };

    loadWidgetData();
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
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight={700}>
            Adroit Service Performance Dashboard
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Phase 1 — Sequential Creator Data Layer
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
