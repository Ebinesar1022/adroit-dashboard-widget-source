import { useEffect, useState } from "react";
import { Box, Tabs, Tab, CircularProgress, Alert, Grid, Card, CardContent, Typography, Rating, Table, TableHead, TableBody, TableRow, TableCell, Chip, Stack } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { Gauge } from "@mui/x-charts/Gauge";
import { fetchDashboard } from "./services/api";

const n = (v) => Number(v) || 0;
const arr = (v) => (Array.isArray(v) ? v : []);
const Tile = ({ label, value, color }) => (
  <Card sx={{ borderRadius: 3, height: "100%" }}><CardContent sx={{ textAlign: "center" }}>
    <Typography variant="body2" color="text.secondary">{label}</Typography>
    <Typography variant="h5" fontWeight={700} color={color}>{value ?? 0}</Typography>
  </CardContent></Card>
);
const Tiles = ({ items }) => (
  <Grid container spacing={2} mb={3}>{items.map(([l, v, c]) => <Grid item xs={6} md={3} key={l}><Tile label={l} value={v} color={c}/></Grid>)}</Grid>
);
const Panel = ({ title, children, xs = 12, md = 6 }) => (
  <Grid item xs={xs} md={md}><Card sx={{ borderRadius: 3, height: "100%" }}><CardContent>
    <Typography variant="h6" mb={1} fontSize={16} fontWeight={600}>{title}</Typography>{children}
  </CardContent></Card></Grid>
);
const Empty = () => <Typography color="text.secondary" p={2}>No data available</Typography>;
const FeedbackList = ({ items, dateKey, textKey, nameKey, ratingKey }) => (
  <Stack spacing={1} sx={{ maxHeight: 340, overflow: "auto" }}>
    {items.length === 0 && <Empty/>}
    {items.map((f, i) => {
      const r = n(f[ratingKey]);
      return <Alert key={i} icon={false} severity={ratingKey ? (r >= 4 ? "success" : r <= 2 ? "error" : "warning") : "error"}>
        <Typography variant="caption">{String(f[dateKey] ?? "")}</Typography>
        <Typography variant="body2">{f[textKey]} – Customer: {f[nameKey]}</Typography>
        {ratingKey && <Rating size="small" value={r} readOnly/>}
      </Alert>;
    })}
  </Stack>
);
const Bars = ({ labels, series, stack }) => (
  <BarChart height={300} xAxis={[{ scaleType: "band", data: labels }]}
    series={series.map((s) => ({ ...s, ...(stack ? { stack: "a" } : {}) }))}/>
);

function Today({ d = {} }) {
  const t = d.tiles || {}, ex = arr(d.executives), it = d.invoiceTrend || {}, r = d.repeatReasons || {}, g = d.feedbackGauge || {};
  const rc = n(r.lackOfKnowledge) + n(r.partsUnavailability) + n(r.powerIssue);
  return <>
    <Typography mb={2} color="text.secondary">Date: {d.date}</Typography>
    <Tiles items={[["Total Calls Logged Today", t.total_calls_today],["Service Executives Active Today", t.executives_act_today],["Service Reports Submitted", t.service_reports_submitted_count],["Quotations Sent Today", t.quot_sent_today],["Customer Feedbacks Collected", t.cust_feedback_rec],["Pending Calls > 48 Hrs", t.pending_calls,"error.main"],["Customer Regret Cases", t.customer_regret_cases_count,"error.main"],["Repeat Calls Logged", t.repeated_calls_count],["Invoices Generated Today", t.invoices_gen_today],["Invoice Amounts (₹)", `₹ ${t.total_invoiced_amt_today ?? 0}`]]}/>
    <Grid container spacing={2}>
      <Panel title="Service Executive Performance (Today)" md={12}>
        {ex.length ? <Bars labels={ex.map(e=>e.Engineer_Name)} series={[{label:"Assigned",data:ex.map(e=>n(e.assignedToday)),color:"#3b82f6"},{label:"Closed",data:ex.map(e=>n(e.completedToday)),color:"#16a34a"}]}/> : <Empty/>}
      </Panel>
      <Panel title="Invoice Amount Trend (Today)" md={12}>
        <Bars labels={["AMC","Install","Repair","Service","Spares"]} series={[{label:"₹",data:[n(it.amc_amt),n(it.installtion_amt),n(it.repair_amt),n(it.service_amt),n(it.spares_amt)],color:"#3b82f6"}]}/>
      </Panel>
      <Panel title="Repeat Calls Reason Breakdown">
        {rc ? <PieChart height={260} series={[{innerRadius:50,data:[{id:0,value:n(r.lackOfKnowledge),label:"Lack of Knowledge",color:"#3b82f6"},{id:1,value:n(r.partsUnavailability),label:"Parts Unavailability",color:"#16a34a"},{id:2,value:n(r.powerIssue),label:"Power Issue",color:"#f59e0b"}]}]}/> : <Empty/>}
      </Panel>
      <Panel title={`Service Feedback Trend (Avg ${g.average_rating ?? 0}/5)`}>
        <Gauge height={220} value={n(g.percentage)} startAngle={-90} endAngle={90} text={({value})=>`${value}%`}/>
      </Panel>
    </Grid>
  </>;
}

function Weekly({ d = {} }) {
  const e = d.engineerCalls || {}, eng = arr(e.per_engineer), ag = arr(d.pendingAgeing), amc = d.amcAnalytics || {}, rt = d.redTag || {}, sat = arr(d.satisfaction);
  const valid = sat.filter(w => n(w.average_rating) > 0);
  const avg = valid.length ? +(valid.reduce((s,w)=>s+n(w.average_rating),0)/valid.length).toFixed(1) : 0;
  return <>
    <Tiles items={[["Avg Calls Attended per Engineer", e.average_calls_per_engineer_week],["Average Response Time (hrs)", d.avgResponseTime],["Repeat Call %", `${d.repeatCallPct ?? 0}%`],["Customer Regret %", `${n(d.customerRegretPct).toFixed(2)}%`],["Google Review Collection %", `${d.googleReviewPct ?? 0}%`],["AMC Leads Generated", d.amcLeads],["Pending Replacements", d.pendingReplacements],["Standby Units Pending Collection", d.standbyUnits]]}/>
    <Grid container spacing={2}>
      <Panel title="Engineer-wise Call Volume" md={12}>
        {eng.length ? <Bars stack labels={eng.map(x=>x.engineer_name)} series={[{label:"Completed",data:eng.map(x=>n(x.calls_completed)),color:"#5dc35a"},{label:"Pending",data:eng.map(x=>n(x.calls_pending)),color:"#e84c3d"}]}/> : <Empty/>}
      </Panel>
      <Panel title="Customer Satisfaction">
        <Stack alignItems="center" mb={1}><Typography variant="h3" fontWeight={700}>{avg}</Typography><Rating value={avg} precision={0.5} readOnly/></Stack>
        {sat.length ? <BarChart height={200} xAxis={[{scaleType:"band",data:sat.map(w=>w.week_label)}]} series={[{label:"Avg rating",data:sat.map(w=>n(w.average_rating)),color:"#f59e0b"}]}/> : <Empty/>}
      </Panel>
      <Panel title="Recent Feedbacks"><FeedbackList items={arr(d.recentFeedbacks)} dateKey="created_date" textKey="comments" nameKey="customer_name" ratingKey="rating"/></Panel>
      <Panel title="Pending Call Ageing">
        <Bars stack labels={ag.map((_,i)=>`Week ${i+1}`)} series={[{label:"0-2 Days",data:ag.map(x=>n(x["0-2_Days"])),color:"#3b82f6"},{label:"3-5 Days",data:ag.map(x=>n(x["3-5_Days"])),color:"#10b981"},{label:">5 Days",data:ag.map(x=>n(x.above_5_Days)),color:"#f59e0b"}]}/>
      </Panel>
      <Panel title="AMC Offer vs Closed – Conversion">
        <PieChart height={260} series={[{innerRadius:60,data:[{id:0,value:n(amc.closed),label:`Closed – ${n(amc.closed)} (${n(amc.closed_percent)}%)`,color:"#10b981"},{id:1,value:Math.max(n(amc.total)-n(amc.closed),0),label:`Offered – ${n(amc.total)}`,color:"#3b82f6"}]}]}/>
      </Panel>
      <Panel title="Red Tag Item Trend (Service Dept)" md={12}>
        <Bars labels={["Week 1","Week 2","Week 3","Week 4"]} series={[{label:"Red Tag Items",data:[n(rt.week1),n(rt.week2),n(rt.week3),n(rt.week4)],color:"#ef4444"}]}/>
      </Panel>
    </Grid>
  </>;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const chipColor = { green: "success", orange: "warning", red: "error", blue: "info" };
function Monthly({ d = {} }) {
  const c = d.callLogs || {}, cc = d.complaintCost || {}, ex = d.expense || {}, pf = d.positiveFeedback || {}, sat = d.satisfaction || {}, tr = arr(d.repeatTrend), cal = arr(d.calibration);
  return <>
    <Typography fontWeight={600} mb={1}>Total Calls Logged (Month)</Typography>
    <Tiles items={[["Warranty",c.warranty_count],["Post Warranty",c.post_warranty],["AMC",c.amc_count],["Warranty Expense",`₹ ${c.warranty_amount ?? 0}`],["Post Warranty Expense",`₹ ${c.post_warranty_amount ?? 0}`]]}/>
    <Typography fontWeight={600} mb={1}>Service Insights</Typography>
    <Tiles items={[["Indirect Expenses",`₹ ${d.indirectExpense ?? 0}`],["Repeat Call Analysis",`${d.repeatCallAnalysis?.repead_calls ?? 0} calls`],["Stock Unavailability Delays",`${d.stockDelays ?? 0} cases`],["Training Hours Conducted",`${d.trainingHours ?? 0} hrs`],["Tool & Vehicle Inspections",`${d.toolCompliance?.compliance_percentage ?? 0}%`],["Customer Feedback Summary",`${pf.avg_feedback ?? 0} ⭐ | ${pf.positive_feedback_percentage ?? 0}% Positive`]]}/>
    <Grid container spacing={2}>
      <Panel title="Expense Breakdown">
        <PieChart height={260} series={[{data:[{id:0,value:n(ex.direct_expense),label:`Direct ₹${n(ex.direct_expense)} (${n(ex.direct_percent)}%)`,color:"#3b82f6"},{id:1,value:n(ex.indirect_expense),label:`Indirect ₹${n(ex.indirect_expense)} (${n(ex.indirect_percent)}%)`,color:"#10b981"}]}]}/>
      </Panel>
      <Panel title="Complaint Cost by Category">
        {cc.has_data ? <BarChart layout="horizontal" height={260} yAxis={[{scaleType:"band",data:["Under Warranty","Post Warranty","AMC"]}]} xAxis={[{max:100}]} series={[{data:[n(cc.w_percentage),n(cc.pw_percentage),n(cc.amc_percentage)],color:"#837459",valueFormatter:v=>`${v.toFixed(1)}%`}]}/> : <Empty/>}
      </Panel>
      <Panel title="Repeat Call Trend – Month-over-Month">
        {tr.length ? <LineChart height={260} xAxis={[{scaleType:"point",data:tr.map(x=>x.month)}]} series={[{label:"Repeat Calls",data:tr.map(x=>n(x.repeat_calls)),color:"#3b82f6"}]}/> : <Empty/>}
      </Panel>
      <Panel title="% Positive Feedback"><Gauge height={220} value={n(pf.positive_feedback_percentage)} startAngle={-90} endAngle={90} text={({value})=>`${value}%`}/></Panel>
      <Panel title={`Customer Satisfaction (${sat.overall_count ?? 0} reviews)`}>
        <Stack alignItems="center"><Typography variant="h3" fontWeight={700}>{sat.overall_average ?? 0}</Typography><Rating value={n(sat.overall_average)} precision={0.5} readOnly/></Stack>
        <BarChart height={200} xAxis={[{scaleType:"band",data:MONTHS}]} series={[{label:"Avg rating",data:MONTHS.map(m=>n(sat[m]?.average)),color:"#f59e0b"}]}/>
      </Panel>
      <Panel title="Recent Complaints"><FeedbackList items={arr(d.recentComplaints)} dateKey="feedback_date" textKey="customer_feedback" nameKey="customer_name"/></Panel>
      <Panel title="Calibration / Maintenance Reports" md={12}>
        <Box sx={{ overflowX: "auto" }}><Table size="small">
          <TableHead><TableRow>{["Equipment","Report Type","Last Service Date","Next Service Date","Service Person","Status"].map(h=><TableCell key={h} sx={{fontWeight:600}}>{h}</TableCell>)}</TableRow></TableHead>
          <TableBody>{cal.map((r,i)=>(
            <TableRow key={i} sx={{bgcolor: r.is_due_this_month ? "#fffacd" : r.is_overdue ? "#ffe6e6" : undefined}}>
              <TableCell>{r.equipment}</TableCell><TableCell>{r.report_type}</TableCell><TableCell>{r.last_service_date}</TableCell><TableCell>{r.next_service_date}</TableCell><TableCell>{r.service_person}</TableCell>
              <TableCell><Chip size="small" label={r.status} color={chipColor[r.status_color] || "default"}/></TableCell>
            </TableRow>))}</TableBody>
        </Table></Box>
      </Panel>
    </Grid>
  </>;
}

export default function App() {
  const [tab, setTab] = useState(0), [data, setData] = useState(null), [err, setErr] = useState(null);
  useEffect(() => { fetchDashboard().then(setData).catch((e) => setErr(e?.message || JSON.stringify(e))); }, []);
  if (err) return <Alert severity="error" sx={{ m: 2 }}>Failed to load dashboard: {err}</Alert>;
  if (!data) return <Box p={6} textAlign="center"><CircularProgress/></Box>;
  return <Box p={2} bgcolor="#f4f7fb" minHeight="100vh">
    <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 2 }}><Tab label="Today's"/><Tab label="Weekly"/><Tab label="Monthly"/></Tabs>
    {tab === 0 && <Today d={data.today}/>}{tab === 1 && <Weekly d={data.weekly}/>}{tab === 2 && <Monthly d={data.monthly}/>}
  </Box>;
}
