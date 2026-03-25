## PART 5 of 5 — Data Architecture · Technical Architecture · GUI · Build Sequence · Data Protection · Licence Delivery · Success Metrics · Appendix

> **Joining instruction:** This is Part 5 — the final part. Place after Part 4. Remove this line from the final combined document.

---

## 5. Data Architecture — Google Sheets Schema

> One workbook per school. 28 tabs total. All tabs hidden via `sheet.hideSheet()` at deployment. All data access through AppScript DAL functions only — direct Sheet interaction by any user is blocked. Named Ranges for all `_config` fields. Soft deletes only — `sheet.deleteRow()` is never called.

### 5.1 Complete Tab Reference (28 Tabs)

| Tab Name | Type | Key Columns | Protection Level |
|----------|------|-------------|-----------------|
| `_config` | Config | key · value (22 rows — all Named Ranges: SchoolName, SchoolPhone, SchoolType, CampDates, etc.) | Full — no user edit |
| `_audit_log` | System | timestamp · user_role · action · table · row_id · field · old_val · new_val | Append-only |
| `_deleted` | Recovery | original_table · original_row_id · full_row_json · deleted_by · deleted_at · restored | Append-only |
| `_backup_log` | System | backup_id · timestamp · type · rows_backed_up · status · destination | Append-only |
| `_licence` | System | school_id · plan_tier · purchase_date · payment_ref · upgrade_history_json · support · active | Full — MNTTA edit only |
| `students` | Data | student_id · full_name · preferred_name · dob · age · batch_id · classroom_id · fee_plan_type · status · deleted · deleted_at | Full |
| `families` | Data | family_id · student_id · father_name · mother_name · guardian_name · primary_phone · whatsapp · email · authorised_pickup_list_json · arrival_alert_enabled | Full |
| `medical` | Data | medical_id · student_id · allergy_list_json · chronic_conditions · medications · doctor_name · doctor_phone · hospital_preference · vaccination_record · last_exam_date | Full |
| `med_log` | Data | log_id · student_id · date · medicine_name · dose · time_given · given_by_staff_id · parent_instruction · notes | Full |
| `attendance` | Data | att_id · student_id · date · status · check_in_time · health_status · health_temp · marked_by | Full |
| `pickup_log` | Data | pickup_id · student_id · att_id · collector_name · relationship · time_of_collection · verified_against_authorised_list · staff_id · notes | Full |
| `health_screen` | Data | screen_id · student_id · date · temperature · status · sent_home · notes · recorded_by | Full |
| `fees` | Data | fee_id · student_id · month · fee_head · amount · plan_type · mode · upi_ref · cheque_number · bank_name · paid_at · receipt_number | Full |
| `leads` | Data | lead_id · parent_name · child_age · source · status · last_contact · batch_target · phone · notes · created_at | Full |
| `staff` | Data | staff_id · full_name · role · classroom_id · mntta_cert_number · mntta_cert_expiry · bgv_status · bgv_doc_ref · join_date · status · teacher_login_email | Full |
| `classrooms` | Data | classroom_id · name · type · capacity · head_teacher_id · asst_teacher_id · school_type · status | Full |
| `classroom_students` | Data | cs_id · classroom_id · student_id · assigned_date · transferred_from · transfer_reason | Full |
| `ptm` | Data | ptm_id · student_id · staff_id · date · slot · notes · actions_json · status | Full |
| `transport` | Data | vehicle_id or driver_id · vehicle_number · make_model · capacity · insurance_expiry · fitness_cert_expiry · driver_id · assigned_route | Full |
| `safety_log` | Data | log_id · type (visitor/drill/incident) · date · details · action_taken · resolved · recorded_by | Full |
| `curriculum` | Data | curr_id · student_id · date · material_name · area · status · notes · recorded_by | Full |
| `observations` | Data | obs_id · student_id · date · concentration_span · social_interaction · independence_level · emotional_state · material_worked · material_status · observations_text · recorded_by | Full |
| `communications` | Data | comm_id · type · recipient_ids_csv · channel · sent_at · content_ref · status | Full |
| `events` | Data | event_id · name · date · type · checklist_ref · budget · status | Full |
| `eca_activities` | Data | eca_id · name · category · suitable_age_groups_json · description · status | Full |
| `eca_batches` | Data | batch_id · eca_id · trainer_id · classroom_id · batch_name · days_of_week_csv · time_slot_start · time_slot_end · start_date · end_date · max_students · fee_per_month · status | Full |
| `eca_enrolments` | Data | enrol_id · batch_id · student_id · enrolment_date · status | Full |
| `eca_fees` | Data | eca_fee_id · enrol_id · month · amount · mode · reference · paid_at · receipt_number | Full |
| `eca_trainers` | Data | trainer_id · full_name · specialisation_csv · phone · whatsapp · contract_type · rate · bgv_status · active | Full |

### 5.2 Row ID Format Reference

| Table | Prefix | Example |
|-------|--------|---------|
| students | STU | STU-20260615-001 |
| families | FAM | FAM-20260615-001 |
| medical | MED | MED-20260615-001 |
| med_log | MLG | MLG-20260615-001 |
| attendance | ATT | ATT-20260615-001 |
| pickup_log | PKP | PKP-20260615-001 |
| health_screen | HSC | HSC-20260615-001 |
| fees | FEE | FEE-20260615-001 |
| leads | LED | LED-20260615-001 |
| staff | STF | STF-20260615-001 |
| classrooms | CLS | CLS-20260615-001 |
| classroom_students | CST | CST-20260615-001 |
| ptm | PTM | PTM-20260615-001 |
| eca_activities | ECA | ECA-20260615-001 |
| eca_batches | BCH | BCH-20260615-001 |
| eca_enrolments | ENL | ENL-20260615-001 |
| eca_fees | ECF | ECF-20260615-001 |
| eca_trainers | TRN | TRN-20260615-001 |

### 5.3 AppScript DAL — 10 Mandatory Coding Rules

These rules are non-negotiable. Violating any of them creates data integrity risks that will cause production failures.

1. **All reads and writes through the DAL only.** Every interaction with the Sheet goes through typed AppScript functions: `getStudents()`, `addFeeRecord()`, `markAttendance()`, etc. No module ever calls `sheet.getRange().setValue()` directly from a UI handler.

2. **Every write appends to `_audit_log`.** Format: `timestamp | user_role | action (INSERT/UPDATE/DELETE) | table_name | row_id | field_changed | old_value | new_value`. The audit log is append-only — existing rows cannot be edited or deleted.

3. **Every row has a unique auto-generated ID in Column A.** Format: `PREFIX-YYYYMMDD-NNN`. Never use row numbers as identifiers — row numbers change silently when rows are sorted and break all relationships.

4. **Soft deletes only — never `sheet.deleteRow()`.** `deleteRecord()` sets `deleted = TRUE` and `deleted_at = timestamp`, then moves the complete row as a JSON snapshot to the `_deleted` tab. Owner can restore from Settings → Deleted Records in 30 seconds. Data loss through normal app operation is physically impossible.

5. **No formulas in data tabs.** All tabs store raw values only. All calculations (age from DOB, fee totals, attendance %) are performed in AppScript code. Sheets store the computed result as a plain value. Formulas in data tabs break when rows are inserted and cause `#REF!` errors.

6. **No merged cells in any data tab.** Merged cells break `sheet.getValues()`, `sheet.getLastRow()`, and all CSV exports. Merged cells are only allowed in `_config` for visual display, and `_config` is read exclusively via Named Ranges.

7. **Continuous data from Row 2.** Row 1 is always the header row. Data rows are continuous with no empty rows between records. An empty row causes `sheet.getLastRow()` to return an incorrect position, causing new records to overwrite existing data.

8. **Foreign keys enforced in AppScript before every write.** Before inserting a fee record: verify the `student_id` exists. Before inserting an ECA enrolment: verify `batch_id` and `student_id` exist. Before deleting a student: check for linked records and require owner confirmation. Document all FK relationships in a data dictionary comment at the top of the DAL module.

9. **All tabs hidden at deployment.** Call `sheet.hideSheet()` on every data tab at initial deployment. The school owner who navigates to the Sheet URL sees only a blank file. The web app is the only sanctioned interface.

10. **`LockService.getScriptLock()` before every write.** Acquire the lock with a 10-second timeout before every write operation. This prevents concurrent access corruption when two staff members (e.g. owner and teacher) submit forms simultaneously. Release the lock in a `finally` block.

---

## 6. Technical Architecture

### 6.1 V1 — Google AppScript + HTML/CSS/JS (Build This First)

| Component | Specification |
|-----------|--------------|
| **Frontend** | HTML, CSS, and JavaScript served via AppScript `HtmlService.createTemplateFromFile()`. Mobile-first responsive design — 375px width is the baseline. All CSS written for 375px and scaled up. Target load time: under 3 seconds on Indian 4G network. |
| **Backend / Database** | Google Sheets (28 tabs per school). AppScript is the application server — all business logic, validation, automation, and DAL functions run in AppScript. |
| **Authentication — Owner** | Google OAuth via `Session.getActiveUser()`. School owner's Google account is the login. The AppScript Web App is deployed to run "as the user accessing the web app" so each school owner's data is scoped to their own Google account. |
| **Authentication — Teacher** | Separate AppScript Web App deployment with role-restricted code. Teacher's login email (stored in staff profile) grants access to attendance and curriculum only. No access to fees, CRM, or management data. |
| **AppScript triggers** | Time-based triggers set via `ScriptApp.newTrigger()`: birthday check at 7:00 AM daily · absence notification at 9:30 AM daily · fee reminder on due dates · document expiry alerts at 8:00 AM daily · backup at 2:00 AM daily |
| **n8n integration** | AppScript sends webhook POST requests to n8n cloud. n8n handles: WhatsApp Business API calls · GoHighLevel API calls · Google Calendar API calls · Any external API that requires OAuth token management |
| **Infrastructure cost (V1)** | Rs.0/month for school data (Google Drive free tier: 15GB per account, sufficient for 500+ schools). MNTTA infrastructure: Rs.0/month for V1. |
| **Scalability limits** | AppScript 6-minute execution hard limit · Google Sheets 10M cells per workbook · LockService serialises concurrent writes (safe for up to 5–10 simultaneous users). Migrate to V2 when any trigger condition in Section 6.3 is met. |

### 6.2 V1 Startup Code — Licence and School Type Check

```javascript
function doGet(e) {
  const tier = getLicenceTier();        // early_bird | standard | pro
  const schoolType = getSchoolType();   // Montessori | KG
  const isActive = getIsActive();       // Boolean

  if (!isActive) {
    return HtmlService.createHtmlOutput('<h2>This licence is inactive. Contact MNTTA support.</h2>');
  }

  const template = HtmlService.createTemplateFromFile('Index');
  template.planTier = tier;
  template.schoolType = schoolType;

  return template.evaluate()
    .setTitle('EduManager Pro — ' + SpreadsheetApp.getActive().getRangeByName('SchoolName').getValue())
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getLicenceTier() {
  return SpreadsheetApp.getActive().getSheetByName('_licence').getRange('B2').getValue();
}

function getSchoolType() {
  return SpreadsheetApp.getActive().getRangeByName('SchoolType').getValue();
}

function getIsActive() {
  return SpreadsheetApp.getActive().getSheetByName('_licence').getRange('B13').getValue() === true;
}
```

### 6.3 V2 Migration — React + Supabase (Build After 50 Paying Customers)

**Migrate when ANY of these conditions is met:**
- School exceeds 300 active students
- More than 5 staff members using the app simultaneously on a regular basis
- AppScript execution timeouts occurring 3 or more times per week
- More than 25 branches in a franchise network

| V2 Component | Specification |
|--------------|--------------|
| **Frontend** | React.js + Tailwind CSS · Progressive Web App (PWA) installable on Android and iOS without App Store · Offline-capable for attendance and fee collection |
| **Backend** | Supabase (PostgreSQL + Auth + Storage + Realtime) · Row-level security policies for multi-tenancy · Each V1 Sheet tab maps directly to a Supabase table with identical column names — zero data transformation required for migration |
| **Mobile (V3)** | React Native · Android-first (85%+ of Indian school owners use Android) · Biometric login support |
| **Migration path** | Export all 28 tabs as CSV from V1 backup · import each CSV to corresponding Supabase table · AppScript DAL functions rewritten as Supabase Edge Functions with identical signatures · Frontend connects to Supabase API instead of `google.script.run` |

---

## 7. GUI Design System & UX Requirements

### 7.1 Core Design Principles (Non-Negotiable)

| Principle | Implementation Requirement |
|-----------|---------------------------|
| **One task per screen** | Each screen solves one problem. One primary action button maximum per screen. No cross-module clutter on a single view. |
| **Three-tap rule** | Any core daily task must be completable in 3 taps or fewer from the home screen. If a flow requires more than 3 taps, redesign it before building it. |
| **Default to most common action** | Attendance: all students marked Present by default. Lead form: 4-field Quick Add is the default. Observation: 15-second Quick entry is the default. |
| **Zero jargon** | No technical or business jargon visible to users. Not "CRM", not "pipeline", not "DAL", not "module". Every label is a plain action: "Today's Attendance", "WhatsApp Parents", "Add Enquiry". |
| **Mobile-first** | Design at 375px width. Every screen usable with one hand on a smartphone. Desktop is a secondary use case — mobile is the primary. |
| **Forgiving interface** | Soft deletes only (recoverable for 30 days from Settings). Autosave every 30 seconds. Confirmation dialog before any action that cannot be immediately undone. |
| **WhatsApp-native** | Every "Send to Parent" action defaults to WhatsApp. Message previewed before sending. Email is always the secondary option, never the default. |
| **Indian cultural context** | Warm colour palette (saffron, teal, marigold accents). Illustrations of Indian children and Indian classroom settings throughout the app. DD/MM/YYYY date format everywhere. Rs. currency symbol (not INR, not ₹ in code). Noto Sans font for full Devanagari, Kannada, Tamil, Telugu script support. |

### 7.2 Bottom Navigation Bar — 5 Tabs (Always Visible)

| Tab | Icon | Modules Accessible |
|-----|------|--------------------|
| **Home** | House | Dashboard · birthday alerts · today's post · quick add · follow-up |
| **School** | Building | M2 Students · M4 Attendance · M5 Fees · M9 Staff · M12 Transport · M13 Safety · M18 Classrooms |
| **Parents** | Family | M6 Communication · M6 Photo Sharing · M7 PTM · M15 Handbook · eConsents |
| **Marketing** | Megaphone | M8 Social Media Engine · M8 Content Calendar · M3 Admissions CRM · M19 ECA promotions |
| **Reports** | Chart | M14 Analytics · M5 fee reports · M4 attendance reports · M19 ECA revenue · annual report |

### 7.3 Homepage — Daily Command Centre (Full Specification)

**TODAY card (always shown at top):**
- Live attendance % for today with colour-coded indicator (green > 85%, amber 70–85%, red < 70%)
- One-tap shortcut to attendance marking screen
- Fees collected this month: Rs.[amount] of Rs.[target] with progress bar
- Next event: [event name] · [N] days away
- Social media: [N] of 12 posts published this month

**BIRTHDAY ALERT (conditional — shown only when any child has birthday today or tomorrow):**
- Occupies top position when active, above all other cards
- Warm saffron background with birthday icon
- Child photo · full name · classroom name · age turning today/tomorrow
- **Button 1:** "Send Birthday WhatsApp" — one tap, sends personalised WhatsApp to parent, logs communication
- **Button 2:** "Create Birthday Post" — one tap, opens M8 birthday template pre-filled, caption ready to copy

**POST TODAY card:**
- Pulled from M8 content calendar for today's date
- Shows: platform icon (Instagram/Facebook) · post type · first 3 lines of auto-personalised caption
- "Copy Caption" button — copies full SUBSTITUTE()-processed caption to device clipboard instantly
- "Open Canva" — deep link to Canva with suggested template size in URL parameters

**QUICK ADD floating button:**
- Fixed position, bottom-right corner, above the navigation bar
- Visible on EVERY screen at all times (including within other screens, not only home)
- Tapping opens 4-field bottom sheet: Parent Name · Phone · Child Age · Source
- One tap to save — creates lead record in M3 CRM

**FOLLOW UP card:**
- Leads not contacted in 48+ hours: "[N] leads need a follow-up" · tap to see names
- Students with overdue fees: "[N] students · Rs.[total] outstanding" · tap to see list
- Documents expiring within 30 days: "[N] documents" · tap to see detail

### 7.4 Colour System

| Token | Hex Value | Usage |
|-------|-----------|-------|
| Primary Teal | `#148F77` | Primary action buttons · active navigation tab · section header bars |
| Secondary Navy | `#1A3A5C` | Page and screen titles · data labels · important text |
| Warm Gold | `#B7950B` | Alerts · early bird badges · birthday alerts · highlight states |
| Saffron Accent | `#E67E22` | ECA module accents · warm highlights |
| App Background | `#FAFAFA` | Main app background (warm white — not pure white #FFFFFF which is too harsh in Indian sunlight) |
| Text Primary | `#2C3E50` | All body text and labels |
| Text Secondary | `#7F8C8D` | Hints · captions · secondary information |
| Success Fill | `#D5F5E3` | Background for: Paid · Present · Published states |
| Success Text | `#1E8449` | Text on success-fill backgrounds |
| Warning Fill | `#FEF9E7` | Background for: Due · Expiring · Pending states |
| Warning Text | `#B7950B` | Text on warning-fill backgrounds |
| Danger Fill | `#FADBD8` | Background for: Absent · Overdue · Expired states |
| Danger Text | `#922B21` | Text on danger-fill backgrounds |
| Info Fill | `#D6EAF8` | Background for: Selected items · info panels |
| Info Text | `#1A3A5C` | Text on info-fill backgrounds |

**Typography:** Noto Sans at all sizes. Font sizes:
- 28px: Screen and page titles
- 20px: Section headings and card titles
- 16px: Body text and form labels
- 13px: Secondary labels and captions
- 11px: Hints, footnotes, and metadata

### 7.5 Onboarding — 5-Minute Setup Flow

The onboarding is a linear 6-step wizard. Each step shows a progress indicator (e.g. "Step 2 of 6").

```
Step 1 (30 seconds)
Enter: School name · City · Primary phone · WhatsApp number
Effect: School name populates immediately in app header and all templates

Step 2 (20 seconds)
Select: School Type — Montessori or Kindergarten
Effect: UI immediately adapts — curriculum, templates, reports, and app language change

Step 3 (30 seconds)
Upload: School logo (PNG, max 2MB)
Effect: Logo appears immediately in Parent Handbook preview and brand kit preview

Step 4 (30 seconds)
Enter: Current batch name (e.g. "June 2026") · Batch start date · Maximum seats
Effect: Admissions CRM pipeline is ready to receive leads

Step 5 (60 seconds)
Action: Preview your first auto-personalised social media post
Copy the caption. Your first social media post is ready to publish.
Effect: Owner sees the value of the product immediately

Step 6 (60 seconds)
Action: Add 3 students (quick form — name, DOB, parent phone)
Effect: Students appear simultaneously in attendance, fee management, and student profiles
```

**Post-onboarding screen:** "Your school is ready!"
- Summary of what was set up
- 3 suggested first actions:
  - "Mark today's attendance" (shortcut)
  - "Add your first admissions enquiry" (shortcut)
  - "Post today's social media content" (shortcut)

---

## 8. Build Sequence & Phase Plan

| Phase | Timeline | Deliverables | Revenue Target |
|-------|----------|-------------|----------------|
| **Phase 1 — MVP** | Weeks 1–4 | M1 School Identity + 22-field profile form · M3 Admissions CRM with floating Quick Add button · M8 Social Media Engine with all 34 templates and SUBSTITUTE() chain · Complete 28-tab Google Sheets workbook as per Section 5 schema · 5-layer data protection implemented · 3-copy backup system with AppScript triggers · Licence check on startup · 5-minute onboarding wizard · Mobile-first design per Section 7 · Deploy as AppScript Web App · Launch Early Bird pricing at Rs.7,990 | Rs.3.99L (50 buyers) |
| **Phase 2 — Operations Core** | Weeks 5–10 | M2 Student Profiles + family + medical + medication log · M4 Attendance with Mark-All-Present default + health screening + pickup log + substitute assignment + WhatsApp arrival alert · M5 Fee Management with all plan types + UPI receipts + fee reminders · M6 Parent Communication + daily photo sharing as primary feature · M18 Classroom and Teacher Management with ratio monitoring | Rs.12L (100 buyers) |
| **Phase 3 — Full Suite** | Weeks 11–18 | M7 PTM Manager · M9 Staff Management + salary + appraisal · M10 Curriculum with Quick Observation as default + Montessori material tracker · M11 Calendar GUI (monthly and weekly views) + Birthday Management system · M12 Transport Management · M13 Safety and POCSO Compliance · M15 Parent Handbook PDF Generator · M19 ECA Revenue Engine (complete — activities, batches, trainers, enrolment, fees, revenue dashboard, Summer Camp) | Rs.22L (200 buyers) |
| **Phase 4 — Intelligence** | Weeks 19–24 | M14 Reports and Analytics Dashboard with all cards · M16 CPD Training Log · M17 n8n integrations with all 8 pre-built automation workflows + GoHighLevel sync · Multi-branch Enterprise tier with Franchisor dashboard · Birthday automation trigger and social post generation | Rs.34L (250+ buyers) |
| **Phase 5 — V2 Platform** | Months 7–12 | React + Supabase full rebuild · Progressive Web App (PWA) installable on Android and iOS · React Native Android app · SEA market entry: Thailand, Malaysia, UAE (Indian diaspora preschools) | Rs.60L+ (400+ buyers) |

---

## 9. Data Protection, Integrity & Backup

### 9.1 Five-Layer Protection Model

| Layer | Implementation |
|-------|---------------|
| **1 — Sheet protection** | Every tab protected via `sheet.protect().setPassword('generated-secret')`. Any direct user edit attempt shows: "This range is protected. You don't have permission to edit it." AppScript service account bypasses protection internally via `SpreadsheetApp`. End users cannot bypass. |
| **2 — DAL wall** | All reads and writes through typed AppScript DAL functions. No UI handler ever calls `sheet.getRange().setValue()` directly. The web app interface never touches the Sheet. |
| **3 — Input validation** | Before every write: required fields present and non-empty · text fields within max character length · dates valid in DD/MM/YYYY format · numeric fields positive and within expected range · all FK references exist in their respective tabs. Invalid data rejected with a clear, friendly error message in the GUI — the Sheet never receives invalid data. |
| **4 — Soft deletes only** | `deleteRecord()` sets `deleted = TRUE`, `deleted_at = ISO timestamp`, and moves the complete row as a JSON string to the `_deleted` tab. Owner restores any deleted record from Settings → Deleted Records → select record → Restore. Takes 30 seconds. Zero permanent data loss through normal app operation. |
| **5 — Audit log** | Every successful write appends one row to `_audit_log`: timestamp · user_role · INSERT/UPDATE/DELETE · table_name · row_id · field_changed · old_value · new_value. The `_audit_log` tab is append-only — AppScript code never updates or deletes existing audit rows. Complete reconstruction of any change ever made is always possible. |

### 9.2 Automated 3-Copy Backup System (3-2-1 Rule)

| Copy | When | Where Stored | Retention | Max Data Loss |
|------|------|-------------|-----------|--------------|
| **Daily snapshot** | Every night at 2:00 AM IST | "EduManager Backups" folder in the school's own Google Drive | Last 30 nightly copies | Changes since last 2 AM backup |
| **Weekly CSV export** | Every Sunday at 3:00 AM IST | MNTTA's separate backup Google Drive account (completely independent of school account) | Last 12 weekly exports per school | Up to 1 week of changes |
| **Monthly PDF summary** | 1st of each month at 8:00 AM IST | Owner's phone via WhatsApp (key metrics PDF) | Permanent on owner's device | Summary data only |

**Daily backup implementation:**
```javascript
function dailyBackup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const date = Utilities.formatDate(new Date(), 'Asia/Kolkata', 'yyyy-MM-dd');
  const backupFolder = DriveApp.getFoldersByName('EduManager Backups').next();

  // Create dated copy
  DriveApp.getFileById(ss.getId()).makeCopy('backup_' + date, backupFolder);

  // Delete copies older than 30 days
  const files = backupFolder.getFiles();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  while (files.hasNext()) {
    const f = files.next();
    if (f.getDateCreated() < cutoff) f.setTrashed(true);
  }

  // Log backup success
  appendToBackupLog('daily', 'success', ss.getSheets().reduce((n,s) => n + s.getLastRow(), 0));

  // Send WhatsApp confirmation to owner via n8n webhook
  notifyOwnerBackupComplete(date);
}
```

**Owner WhatsApp confirmation (sent at 2:05 AM IST):**  
`"EduManager Pro nightly backup complete for [SchoolName] — [date] 2:00 AM. [N] student records backed up. Backup ID: [backup_id]. All data safe. ✅ — EduManager Pro"`

**Backup health check:** After each backup, verify: file was created successfully · file size is within expected range (not suspiciously small) · row counts are consistent with previous backup. If any check fails → WhatsApp alert to owner AND to MNTTA support number.

### 9.3 Recovery Scenarios

| Incident | Severity | How It Was Prevented | Recovery Method |
|----------|----------|---------------------|----------------|
| Accidental cell edit in Sheet | Low | Sheet protection blocks the edit before it registers | No action needed — protection worked. App shows: "Use the app to update data." |
| Row sort scrambles data order | Medium | Row IDs in Column A keep all relationships intact regardless of row order | File → Version History → Restore. Takes 60 seconds. Or AppScript can re-sort by ID. |
| Staff or student record deleted | High | Soft delete moves full JSON snapshot to `_deleted` tab | Settings → Deleted Records → find record → Restore. 30 seconds. Zero data loss. |
| Entire Sheet tab deleted | Critical | Tab hidden from tab bar — owner doesn't know it exists or how to delete it | Edit → Undo (immediate) or File → Version History → Restore or Copy 1 (daily backup). |
| Google account hacked or locked | Critical | Copy 2 (weekly CSV) in MNTTA backup account is completely independent of school account | MNTTA imports last weekly CSV to a new Google account. Max loss: up to 1 week of changes. |
| Named range or formula corruption in `_config` | Medium | AppScript nightly health check validates all 22 Named Ranges after backup | AppScript auto-repairs Named Ranges from `_config` tab master list. WhatsApp alert sent to owner. |

---

## 10. Licence Delivery & Pricing Tiers

### 10.1 One Webapp — Three Service Levels

All three pricing tiers receive the same webapp with all 19 modules fully enabled. Pricing differences are entirely in support services and setup assistance — never in software features or feature access.

The app reads `plan_tier` from the `_licence` tab at every startup and shows:
- Appropriate support channel (Email for Early Bird · WhatsApp for Standard · Priority WhatsApp for Pro)
- Onboarding call booking link (Standard and Pro only)
- GHL and n8n setup status (Pro only)

### 10.2 Licence Delivery Flow (Steps Performed by MNTTA on Each Purchase)

1. Payment received — MNTTA notified via payment gateway webhook
2. Create new Google Sheet workbook from MNTTA master template workbook (File → Make a Copy)
3. Set `plan_tier` in `_licence` tab Row 2 Column B: `early_bird` or `standard` or `pro`
4. Set `SchoolType` Named Range in `_config` tab: `Montessori` or `KG` (confirmed with buyer)
5. Set school owner's Google email as the authorised user for the Web App
6. Deploy AppScript Web App → copy the deployment URL
7. Send WhatsApp to school owner:  
   `"Welcome to EduManager Pro! 🎉 Your school management system is ready. Open it here: [URL]. Bookmark this link on your phone — this is your school's app. Watch the 5-minute setup video: [URL]. For support: [MNTTA WhatsApp]. — MNTTA Team"`
8. For Pro Setup tier: schedule 3-hour expert setup session within 48 hours of purchase

### 10.3 My Plan Screen — Full Specification (Settings → My Plan)

Display the following for each tier:

```
CURRENT PLAN: [Early Bird / Standard / Pro]

Purchased: [DD/MM/YYYY]
Licence type: Permanent — no renewal, no subscription, ever.

WHAT IS INCLUDED:
✅ All 19 modules — full access
✅ Lifetime access — this licence never expires
[✅ if Standard or Pro] WhatsApp support — 24-hour response
[✅ if Standard or Pro] Onboarding call — [Schedule Now / Completed DD/MM/YYYY]
[✅ if Pro] GoHighLevel CRM — [Configured / Pending setup]
[✅ if Pro] n8n automation workflows — [Active / Pending setup]
[✅ if Pro] 3-month priority support — [Active until DD/MM/YYYY]

CONTACT SUPPORT:
[if Early Bird]  Email: support@mntta.in (48-hour response)
[if Standard]    WhatsApp: [MNTTA support number] (24-hour response)
[if Pro]         WhatsApp: [MNTTA priority number] (priority queue)

[if Early Bird or Standard — show upgrade section]
UPGRADE AVAILABLE:
[Early Bird → Standard]  Upgrade fee: Rs.7,000  (Rs.14,990 – Rs.7,990)
[Early Bird → Pro]       Upgrade fee: Rs.17,000 (Rs.24,990 – Rs.7,990)
[Standard → Pro]         Upgrade fee: Rs.10,000 (Rs.24,990 – Rs.14,990)
[UPGRADE NOW →] button
```

---

## 11. Success Metrics

### 11.1 Business Metrics (MNTTA Revenue Targets)

| Milestone | Target |
|-----------|--------|
| Month 1 | 50 Early Bird licences sold · Rs.3.99L revenue · 10 MNTTA diploma graduates using system · Net Promoter Score (NPS) ≥ 70 |
| Month 6 | 200 licences total · Rs.22L cumulative revenue · Schools active in 5+ Indian cities · 5 Enterprise (multi-branch) licences sold |
| Month 12 | 500 licences total · Rs.55L+ cumulative revenue · Average user satisfaction 4.5 out of 5 · 1 new testimonial video per week from school owners |
| Year 2 | 2,000 schools · Thailand and Malaysia pilot (50 schools) · Android app published on Google Play Store · 3 franchise chain partnerships signed |

### 11.2 Product Engagement Metrics (Per School)

| Metric | Target |
|--------|--------|
| Daily engagement | App opened 5 or more days per week · attendance marked by 9:45 AM every school day · at least 1 classroom photo shared to parents per week |
| Social media output | 3 or more posts per week using M8 templates · 40 or more parent enquiries per month from social media · admission conversion rate 50% or higher |
| Operational efficiency | Attendance marking completed in under 2 minutes · monthly fee reconciliation completed in under 5 minutes · WhatsApp broadcast to all parents sent in under 30 seconds |
| ECA revenue | School running at least 1 ECA programme within 3 months of purchase · ECA generating Rs.50,000 or more per month additional revenue within 6 months |
| NPS and referral | NPS score 70 or higher at the 90-day survey · 40% of buyers refer at least one other school owner within 6 months |

---

## 12. Appendix — Module Build Priority

| Module | Business Value | Build Effort | Recommended Phase |
|--------|---------------|-------------|-------------------|
| M8 Social Media Engine | ★★★★★ | Low — Excel toolkit already built, convert to web | Phase 1 — MVP |
| M3 Admissions CRM + Quick Add | ★★★★★ | Medium | Phase 1 — MVP |
| M1 School Identity + Configuration | ★★★★★ | Low | Phase 1 — MVP |
| M4 Attendance + Health Screening + Pickup Log + Substitute | ★★★★★ | Medium | Phase 2 |
| M5 Fee Management + Instalment Plans | ★★★★★ | Medium | Phase 2 |
| M6 Communication + Daily Photo Sharing | ★★★★★ | Low-Medium | Phase 2 |
| M18 Classroom + Teacher Management | ★★★★★ | Medium | Phase 2 |
| M2 Student Profiles + Medical + Medication Log | ★★★★ | Medium | Phase 2 |
| M7 PTM Manager | ★★★★ | Medium | Phase 3 |
| M15 Parent Handbook PDF Generator | ★★★★ | Medium | Phase 3 |
| M11 Calendar GUI + Birthday Management | ★★★★ | Medium | Phase 3 |
| M19 ECA Revenue Engine | ★★★★ | Medium-High | Phase 3 |
| M12 Transport Management | ★★★★ | Medium | Phase 3 |
| M13 Safety and POCSO Compliance | ★★★★ | Low | Phase 3 |
| M9 Staff Management + Salary + Appraisal | ★★★ | Medium | Phase 3 |
| M10 Curriculum + Quick Observation + Material Tracker | ★★★ | High — Montessori progression data model is complex | Phase 3 |
| M14 Reports and Analytics Dashboard | ★★★ | Medium | Phase 4 |
| M17 Integrations (n8n + GoHighLevel) | ★★★★ | High | Phase 4 |
| M16 CPD Log — Simplified | ★★ | Low | Phase 4 |

---

## How to Use This PRD with Claude Code — 5 Recommended Sessions

### Session 1 — Foundation (Phase 1)

Prompt to give Claude Code:

```
Read the attached EduManagerPro_PRD_FINAL.md completely before writing any code.

Build Phase 1 of EduManager Pro as specified.

Deliverables for this session:
1. Create the complete 28-tab Google Sheets workbook with all tabs as specified 
   in Section 5 of the PRD. All tabs must be hidden (sheet.hideSheet()).
   All 22 Named Ranges must be defined in the _config tab.
2. Build the AppScript Web App with HTML/CSS/JS frontend.
   Mobile-first: 375px baseline. Colour system from Section 7.4.
3. Implement Module 1 (M1): School Identity 22-field form.
4. Implement Module 3 (M3): Admissions CRM with the floating Quick Add button
   visible on every screen.
5. Implement Module 8 (M8): Social Media Engine with all 34 templates
   and SUBSTITUTE() formula chain across all 17 placeholders.
6. Implement the 5-layer data protection model (Section 9.1).
7. Implement the 3-copy backup system with AppScript time triggers (Section 9.2).
8. Implement the startup licence check (Section 6.2 code).
9. Implement the 5-minute onboarding wizard (Section 7.5).
10. Deploy as AppScript Web App. Provide the deployment URL.

Do NOT build any other modules in this session.
At the end, export the complete AppScript project and write a handoff note 
describing what was built and what the next session should continue from.
```

### Session 2 — Operations Core (Phase 2)

```
Read the attached EduManagerPro_PRD_FINAL.md.
The Phase 1 code is attached [attach ZIP from Session 1].

Continue building EduManager Pro. Add Phase 2 modules:
- M2: Student Profiles with family profile, medical record, and medication administration log
- M4: Attendance with Mark-All-Present as default, morning health screening log,
  pickup log, substitute teacher assignment, WhatsApp arrival alert via n8n
- M5: Fee Management with all four plan types (Monthly/Quarterly/Half-yearly/Annual),
  plan-aware fee reminders, UPI receipt generator
- M6: Parent Communication Hub with daily classroom photo sharing as the primary feature
- M18: Classroom and Teacher Management with staff-to-child ratio monitoring

All specifications are in Section 4 of the PRD.
```

### Session 3 — Full Suite (Phase 3)

```
Read the attached EduManagerPro_PRD_FINAL.md.
Previous session code is attached [attach ZIP].

Add Phase 3 modules:
- M7: PTM Manager
- M9: Staff Management with salary register and appraisal
- M10: Curriculum with Quick Observation (15-second entry) as the DEFAULT mode,
  plus Montessori material progression tracker with all 5 areas and pre-loaded materials
- M11: Calendar GUI (monthly grid view and weekly grid view) plus Birthday Management
  with 7 AM daily trigger
- M12: Transport Management
- M13: Safety and POCSO Compliance
- M15: Parent Handbook PDF Generator
- M19: ECA Revenue Engine — complete implementation including activities, batches,
  external trainer management, enrolment with validation, fee management,
  revenue dashboard, and Summer Camp as special ECA programme

All specifications in Section 4.
```

### Session 4 — Intelligence (Phase 4)

```
Read the attached EduManagerPro_PRD_FINAL.md.
Previous session code is attached [attach ZIP].

Add Phase 4:
- M14: Reports and Analytics Dashboard with all cards as specified in Section 4
- M16: CPD Training Log (simplified scope — see M16 specification)
- M17: All n8n integration webhooks for the 8 pre-built automation workflows,
  GoHighLevel sync, Tally CSV export, and inbound webhooks
- Multi-branch Enterprise tier: Franchisor dashboard with consolidated view
- Birthday post generation automation linked to M8 birthday template
- WhatsApp Business API integration

All specifications in Section 4 and Section 6.
```

### Session 5 — Polish & Deploy

```
Read the attached EduManagerPro_PRD_FINAL.md.
Complete EduManager Pro code is attached [attach ZIP].

Final polish and deployment:
1. Apply the complete design system from Section 7 consistently across all 19 modules:
   - Colour tokens from Section 7.4
   - Typography sizes and Noto Sans font
   - Bottom navigation bar (5 tabs) as specified in Section 7.2
   - Three-tap rule enforced — review every flow
2. Verify the 5-minute onboarding wizard is complete and functional
3. Verify all 8 n8n automation workflows are triggering correctly
4. Verify the 5-layer data protection is active on all 28 tabs
5. Verify all 3 backup triggers are set and running
6. Test with sample school data: 30 students, 5 staff, 3 classrooms, 2 ECA batches
7. Write the production deployment checklist (step-by-step for MNTTA staff to deploy 
   a new school)
8. Write the school owner setup guide (plain language, no technical terms,
   with screenshots)
9. Create the master template workbook that MNTTA will copy for each new customer
10. Final validation: all 28 tabs present, hidden, named ranges defined,
    backup triggers active, licence check working
```

---

## Competitive Positioning Statement

> **"EduManager Pro is the only preschool management system in India built by educators for educators, designed for Indian school owners and Indian parents, priced to be owned and not rented, and the only system in the world that also runs your school's marketing — all for Rs.14,990, once, forever."**

---

*EduManager Pro — Product Requirements Document*  
*Developed by MNTTA, Montessori & Nursery Teachers Training Academy, Bangalore, India*  
*For developer use only — Confidential*

*— End of Part 5 of 5 — End of Document —*
