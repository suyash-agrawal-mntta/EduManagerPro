/**
 * EduManagerPro - Phase 1 schema configuration.
 * Generates all 28 tabs required for backend data layer.
 * All tabs will be hidden from users - all interactions go through DAL.
 */

function initializeEduManagerProDB() {
  let ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // If running directly from script.google.com without a bound sheet:
  if (!ss) {
    // Create a new spreadsheet named "EduManagerPro Database"
    ss = SpreadsheetApp.create('EduManagerPro Database (Auto-Generated)');
    console.log(`Created new spreadsheet: ${ss.getUrl()}`);
    // Open the new sheet
    ss = SpreadsheetApp.openById(ss.getId());
  }
  
  // Define ALL 28 sheets and their core columns as per Section 5 Schema
  const schemaDefinition = {
    // 5 Support/Audit Tabs
    '_config': ['key', 'value', 'description'],
    '_audit_log': ['timestamp', 'user_role', 'action', 'table', 'row_id', 'field', 'old_val', 'new_val'],
    '_deleted': ['original_table', 'original_row_id', 'full_row_json', 'deleted_by', 'deleted_at', 'restored'],
    '_backup_log': ['backup_id', 'timestamp', 'type', 'rows', 'status', 'destination'],
    '_licence': ['school_id', 'plan_tier', 'purchase_date', 'payment_ref', 'upgrade_history_json', 'support', 'active'],
    
    // Core Data Tabs
    'students': ['student_id', 'name', 'dob', 'age', 'batch_id', 'classroom_id', 'fee_plan_type', 'status', 'deleted', 'deleted_at'],
    'families': ['family_id', 'student_id', 'parent1', 'parent2', 'guardian', 'primary_phone', 'whatsapp', 'email', 'pickup_list_json'],
    'medical': ['medical_id', 'student_id', 'allergies_json', 'conditions', 'medications', 'doctor_name', 'hospital'],
    'med_log': ['med_log_id', 'student_id', 'date', 'medicine', 'dose', 'time_given', 'administered_by', 'notes'],
    'attendance': ['att_id', 'student_id', 'date', 'status', 'check_in', 'check_out', 'marked_by'],
    'pickup_log': ['log_id', 'student_id', 'date', 'time', 'picked_up_by', 'verified_by', 'late_fee_applied'],
    'health_screen': ['log_id', 'student_id', 'date', 'temp', 'symptoms', 'cleared_by'],
    'fees': ['fee_id', 'student_id', 'type_id', 'amount', 'due_date', 'status', 'paid_date', 'mode', 'receipt_no'],
    'leads': ['lead_id', 'parent_name', 'phone', 'child_age', 'source', 'status', 'follow_up_date', 'notes', 'last_contact', 'batch_target', 'created_at'],
    'staff': ['staff_id', 'name', 'role', 'phone', 'email', 'join_date', 'status', 'bgv_status', 'document_json'],
    'classrooms': ['class_id', 'name', 'type', 'capacity', 'teacher_id', 'status'],
    'classroom_stu': ['map_id', 'class_id', 'student_id', 'term_id', 'status'],
    'ptm': ['ptm_id', 'student_id', 'staff_id', 'date', 'slot', 'notes', 'actions_json', 'status'],
    'transport': ['transport_id', 'vehicle_no', 'driver_id', 'route', 'student_ids_csv', 'fee'],
    'safety_log': ['log_id', 'type', 'date', 'details', 'action_taken', 'resolved'],
    'curriculum': ['curr_id', 'student_id', 'material_name', 'area', 'status', 'introduced', 'mastered', 'notes'],
    'communications': ['comm_id', 'type', 'recipient_ids_csv', 'channel', 'sent_at', 'content_ref', 'status'],
    'events': ['event_id', 'name', 'date', 'type', 'checklist_ref', 'budget', 'status'],
    
    // ECA Specific Tabs
    'eca_activities': ['eca_id', 'name', 'category', 'age_group', 'description', 'status'],
    'eca_batches': ['batch_id', 'eca_id', 'trainer_id', 'classroom_id', 'days', 'time', 'capacity', 'fee', 'start', 'end', 'status'],
    'eca_enrolments': ['enrol_id', 'batch_id', 'student_id', 'enrol_date', 'status'],
    'eca_fees': ['fee_id', 'enrol_id', 'month', 'amount', 'mode', 'reference', 'paid_at', 'receipt_no'],
    'eca_trainers': ['trainer_id', 'name', 'specialisation_csv', 'phone', 'contract_type', 'rate', 'bgv_status', 'active']
  };

  const sheetsCreated = [];

  // Loop through schema and create/verify sheets
  for (const [sheetName, headers] of Object.entries(schemaDefinition)) {
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheetsCreated.push(sheetName);
    }
    
    // Set headers if the first row is empty
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    const existingHeaders = headerRange.getValues()[0];
    
    if (existingHeaders[0] === "" || existingHeaders[0] == null) {
      headerRange.setValues([headers]);
      headerRange.setFontWeight("bold");
      // Freeze the top row
      sheet.setFrozenRows(1);
    }
    
    // As per spec: "All data tabs hidden via sheet.hideSheet() at deployment"
    // sheet.hideSheet(); // uncomment for production
  }

  // Populate or update _config named ranges
  const configSheet = ss.getSheetByName('_config');
  const defaultConfigs = [
    // Core Identity (6)
    ['SchoolName', 'EduManagerPro School', 'Name of the school'],
    ['SchoolType', 'Montessori', 'Montessori or Kindergarten'],
    ['SchoolTagline', 'Nurturing future leaders', 'School tagline'],
    ['PrincipalName', 'Jane Doe', 'Principal / Owner name'],
    ['FoundedYear', '2020', 'Year school was founded'],
    ['LanguagePref', 'English', 'Language preference'],
    // Address & Contact (7)
    ['SchoolAddress', '123 Edu Lane', 'Full address'],
    ['SchoolCity', 'Bangalore', 'City'],
    ['SchoolPIN', '560001', 'PIN code'],
    ['SchoolState', 'Karnataka', 'State'],
    ['SchoolPhone', '9876543210', 'Primary phone'],
    ['SchoolWhatsApp', '9876543210', 'WhatsApp number'],
    ['SchoolEmail', 'admin@example.com', 'School email'],
    // Social & Web (5)
    ['SchoolWebsite', 'https://example.com', 'Website URL'],
    ['SchoolFacebook', '', 'Facebook page name'],
    ['SchoolInstagram', '', 'Instagram handle'],
    ['SchoolYouTube', '', 'YouTube channel URL'],
    ['SchoolGoogle', '', 'Google Business profile'],
    // Fees & Admissions (6)
    ['SeatsPerBatch', '25', 'Max seats per batch'],
    ['MonthlyFee', '8500', 'Monthly tuition fee (Rs)'],
    ['CampFee', '3500', 'Summer camp fee (Rs)'],
    ['CampDates', 'May 1 - May 31', 'Summer camp dates'],
    ['EarlyBirdDate', 'March 31', 'Early bird deadline'],
    ['TourSchedule', 'Mon-Fri 10 AM', 'Tour schedule info']
  ];

  const lastRow = configSheet.getLastRow();
  let existingKeys = [];
  if (lastRow > 1) {
    existingKeys = configSheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
  }

  let nextRow = lastRow > 1 ? lastRow + 1 : 2;

  for (let i = 0; i < defaultConfigs.length; i++) {
    const key = defaultConfigs[i][0];
    if (!existingKeys.includes(key)) {
      // Append missing config
      configSheet.getRange(nextRow, 1, 1, 3).setValues([defaultConfigs[i]]);
      const cellRangeStr = '_config!B' + nextRow;
      ss.setNamedRange(key, ss.getRange(cellRangeStr));
      nextRow++;
    } else {
      // If the key exists, ensure its Named Range is correctly mapped (in case it was broken)
      const rowIndex = existingKeys.indexOf(key) + 2;
      ss.setNamedRange(key, ss.getRange('_config!B' + rowIndex));
    }
  }

  return `Database initialization complete. Processed ${Object.keys(schemaDefinition).length} tables. Created ${sheetsCreated.length} new tables.`;
}
