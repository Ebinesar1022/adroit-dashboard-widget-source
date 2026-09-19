// ---- API SERVICE LAYER: swap the body of fetchDashboard with your own service code if needed ----
const CONFIG = {
  apiName: "getDashboardData",   // Custom API link name
  publicKey: "YOUR_PUBLIC_KEY",  // Custom API public key
};

const unwrap = (r) => {
  if (r?.today) return r;
  if (r?.result?.today) return r.result;
  if (r?.data?.today) return r.data;
  if (typeof r?.result === "string") return JSON.parse(r.result);
  return r?.result ?? r;
};

export async function fetchDashboard() {
  if (!window.ZOHO?.CREATOR) throw new Error("Creator JS SDK not loaded (open inside Creator)");
  await ZOHO.CREATOR.init();
  const resp = await ZOHO.CREATOR.UTIL.invokeCustomApi({
    api_name: CONFIG.apiName, http_method: "GET", public_key: CONFIG.publicKey,
  });
  return unwrap(resp);
}

// Optional: raw report fetch (JS API v2 getRecords)
export const getReportRecords = (report_name, extra = {}) =>
  ZOHO.CREATOR.DATA.getRecords({ report_name, max_records: 200, ...extra }).then((r) => r.data || []);
