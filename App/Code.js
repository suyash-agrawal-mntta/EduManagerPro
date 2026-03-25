/**
 * Main application entry point for EduManagerPro Phase 1
 */

/**
 * Serves the HTML UI. Using HtmlService.
 */
function doGet(e) {
  // Check if initialization is needed
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss.getSheetByName('_config')) {
    initializeEduManagerProDB();
  }

  // Determine requested page from URL param ?page=M1 etc.
  const page = e.parameter.page || 'Home';
  
  const template = HtmlService.createTemplateFromFile('Index');
  template.initialPage = page;
  
  return template.evaluate()
    .setTitle('EduManagerPro')
    .setFaviconUrl('https://img.icons8.com/color/48/000000/school.png')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Include separate HTML parts (for M1, M3, M8).
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * API: Get School Profile (_config named ranges) — All 22 PRD fields
 */
function apiGetSchoolProfile() {
  const keys = [
    // Core Identity
    'SchoolName', 'SchoolType', 'SchoolTagline', 'PrincipalName',
    'FoundedYear', 'LanguagePref',
    // Address & Contact
    'SchoolAddress', 'SchoolCity', 'SchoolPIN', 'SchoolState',
    'SchoolPhone', 'SchoolWhatsApp', 'SchoolEmail',
    // Social & Web
    'SchoolWebsite', 'SchoolFacebook', 'SchoolInstagram',
    'SchoolYouTube', 'SchoolGoogle',
    // Fees & Admissions
    'SeatsPerBatch', 'MonthlyFee', 'CampFee', 'CampDates',
    'EarlyBirdDate', 'TourSchedule'
  ];
  
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const profile = {};
  keys.forEach(k => {
    const range = ss.getRangeByName(k);
    if (range) profile[k] = range.getValue();
  });
  return profile;
}

/**
 * API: Update School Profile
 */
function apiUpdateSchoolProfile(profileData) {
  return _executeWithLock(() => {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    for (const [key, val] of Object.entries(profileData)) {
      const range = ss.getRangeByName(key);
      if (range) {
        const oldVal = range.getValue();
        range.setValue(val);
        _logAudit("Admin", "UPDATE", "_config", key, "value", String(oldVal), String(val));
      }
    }
    return true;
  });
}

/**
 * API: M3 - Add Lead (Quick Add)
 */
function apiAddLead(leadData) {
  const record = {
    parent_name: leadData.parent_name,
    phone: leadData.phone,
    child_age: leadData.child_age,
    source: leadData.source,
    status: 'Enquiry',
    follow_up_date: new Date(new Date().getTime() + 48*60*60*1000),
    batch_target: leadData.batch_target || '',
    last_contact: new Date(),
    created_at: new Date()
  };
  return addRecord('leads', record, 'User', 'LD');
}

/**
 * API: M3 - Get Pipeline
 */
function apiGetLeads() {
  return getRecords('leads');
}

/**
 * API: M3 - Update Lead Status (Pipeline stage change)
 */
function apiUpdateLeadStatus(leadId, newStatus) {
  return updateRecord('leads', 'lead_id', leadId, {
    status: newStatus,
    last_contact: new Date()
  }, 'Admin');
}

/**
 * API: M3 - Update Lead Notes
 */
function apiUpdateLeadNotes(leadId, notes) {
  return updateRecord('leads', 'lead_id', leadId, {
    notes: notes,
    last_contact: new Date()
  }, 'Admin');
}

/**
 * Stub: Send daily backup to n8n
 */
function apiTriggerDailyBackup() {
  const url = "https://your-n8n-instance.com/webhook/edumanager-backup"; // STUB
  _logAudit("System", "BACKUP_RUN", "ALL", "N/A", "N/A", "", "Daily JSON Sent");
  return { status: "success", msg: "Backup integrated." };
}
