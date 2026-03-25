// Companion reporting config that lives with the page.
// Replace this with your real endpoint later when your server is ready.
window.MAINTENANCE_REPORT_ENDPOINT = '';

// Local test sink: captures score events in browser storage.
window.MAINTENANCE_REPORT_HANDLER = function maintenanceReportHandler(payload) {
  try {
    const key = 'maintenanceDemoScoreEvents';
    const existing = JSON.parse(window.localStorage.getItem(key) || '[]');
    existing.push(payload);
    window.localStorage.setItem(key, JSON.stringify(existing));
  } catch {
    // Ignore localStorage errors in strict browser modes.
  }
};
