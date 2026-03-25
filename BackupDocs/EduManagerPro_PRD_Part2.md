## PART 2 of 5 — Module Specifications: M1–M6
### School Identity · Students · Admissions CRM · Attendance · Fees · Communication

> **Joining instruction:** This is Part 2. Place after Part 1, before Part 3. Remove this line from the final combined document.

---

## 4. Module Specifications — 19 Modules

> **Build sequence:** Phase 1 = M1, M3, M8 · Phase 2 = M2, M4, M5, M6, M18 · Phase 3 = M7, M9, M10, M11, M12, M13, M15, M19 · Phase 4 = M14, M16, M17

---

### MODULE 1 — School Identity & Configuration

#### School Profile — 22 Fields (All Stored as Named Ranges in `_config` Tab)

| Field | Named Range |
|-------|-------------|
| School Name | `SchoolName` |
| School Tagline | `SchoolTagline` |
| Full Address | `SchoolAddress` |
| City | `SchoolCity` |
| PIN Code | `SchoolPIN` |
| State | `SchoolState` |
| Primary Phone | `SchoolPhone` |
| WhatsApp Number | `SchoolWhatsApp` |
| Email Address | `SchoolEmail` |
| Website URL | `SchoolWebsite` |
| Facebook Page Name | `SchoolFacebook` |
| Instagram Handle | `SchoolInstagram` |
| YouTube Channel | `SchoolYouTube` |
| Google Business | `SchoolGoogle` |
| Principal / Owner Name | `PrincipalName` |
| Year Founded | `FoundedYear` |
| Max Seats per Batch | `SeatsPerBatch` |
| Monthly Tuition Fee | `MonthlyFee` |
| Summer Camp Fee | `CampFee` |
| Summer Camp Dates | `CampDates` |
| Early Bird Deadline | `EarlyBirdDate` |
| Tour Schedule | `TourSchedule` |

**Business rule:** Every module and all 34 social media templates auto-fill from these Named Ranges via SUBSTITUTE() formula chains. Owner fills the profile once and never re-types school details anywhere in the app.

#### Additional Configuration

| Feature | Requirement |
|---------|-------------|
| School type | Montessori or KG — selected at setup, displayed as badge on every screen, changeable in Settings with full data preservation |
| Brand kit | Upload school logo (PNG, transparent background) · Primary colour hex · Secondary colour hex · Font choice (default: Noto Sans for multilingual support) · All templates auto-apply brand kit |
| Academic year | Set academic year start and end dates · batch names (e.g. "June 2026", "January 2027") · term dates · Indian public holidays pre-loaded · school-specific holidays added by owner |
| Language | English (default) · Kannada · Hindi · Telugu · Tamil — selected at setup · student and parent names stored in chosen script |
| School timings | School open time · school close time · late pickup threshold (minutes after close) · late pickup fee amount per 15 minutes |

---

### MODULE 2 — Student Profiles & Enrolment

#### Student Master Record

```
student_id          STU-YYYYMMDD-NNN  (auto-generated, always Column A)
full_name           String
preferred_name      String (nickname — used in WhatsApp messages to parents)
dob                 Date (DD/MM/YYYY)
age                 Auto-calculated from dob — never stored manually
blood_group         A+ | A- | B+ | B- | AB+ | AB- | O+ | O- | Unknown
photo               Google Drive file URL
aadhaar             String (optional)
previous_school     String
batch_id            FK → batches
classroom_id        FK → classrooms
fee_plan_type       Monthly | Quarterly | Half-yearly | Annual
status              Active | Paused | Withdrawn
deleted             Boolean (default: FALSE)
deleted_at          Timestamp (default: null)
```

#### Family Profile

```
family_id               Auto-generated
student_id              FK → students
father_name             String
mother_name             String
guardian_name           String (if primary caregiver is not a parent)
primary_phone           String
whatsapp                String
email                   String
occupation              String
home_address            String
emergency_contact_1     JSON: { name, phone, relationship }
emergency_contact_2     JSON: { name, phone, relationship }
authorised_pickup_list  JSON array: [{ name, phone, relationship, photo_url }]
arrival_alert_enabled   Boolean (WhatsApp arrival alert on/off per family)
```

#### Medical Record

```
medical_id              MED-NNN
student_id              FK → students
allergy_list            JSON array: [{ allergen, severity, action_required }]
chronic_conditions      String
current_medications     String
doctor_name             String
doctor_phone            String
hospital_preference     String
vaccination_record      String or Google Drive file URL
last_physical_exam_date Date
```

#### Medication Administration Log

```
med_log_id              MLG-NNN
student_id              FK → students
date                    Date
medicine_name           String
dose                    String (e.g. "5ml", "1 tablet")
time_given              Time
given_by_staff_id       FK → staff
parent_instruction      String (typed verbatim from parent's written note)
notes                   String
```

**Business rule:** When medication is administered, auto-send WhatsApp to parent via n8n:  
`"[preferred_name] was given [medicine_name] [dose] at [time_given] today by [staff name]. — [SchoolName] ([SchoolPhone])"`

#### Sibling Linking

- `sibling_group_id` field on student record
- When two students share the same `family_id`, sibling discount auto-applies to the younger child's fee calculation
- Discount percentage configured in M5 fee structure setup

#### Document Checklist (tracked per student as Boolean fields)

`birth_certificate` · `address_proof` · `parent_id` · `medical_cert` · `vaccination_card` · `photo_uploaded` · `econsent_signed`

#### Student ID Card

Auto-generate printable A6-size PDF from student profile:
- Student photo, full name, classroom, school name, emergency contact number, blood group
- Download PDF button on student profile page
- Print-ready layout with school logo from brand kit

#### Enrolment Record

```
enrolment_id        ENR-NNN
student_id          FK → students
batch_id            FK → batches
enrolment_date      Date
classroom_id        FK → classrooms
fee_plan_type       Monthly | Quarterly | Half-yearly | Annual
admission_fee_paid  Boolean
status              Active | Paused | Withdrawn
```

---

### MODULE 3 — Admissions CRM & Lead Management

#### QUICK ADD — Floating "+" Button (MUST HAVE — Highest Priority)

**Requirement:** A floating "+" button is ALWAYS visible on EVERY screen of the app (bottom-right corner, above the navigation bar). Tapping it opens a minimal 4-field bottom sheet:

```
Parent Name     Text input
Phone           Tel input (auto-format: +91 prefix)
Child Age       Number input (in years)
Source          WhatsApp | Instagram | Facebook | Walk-in | Referral | Other
```

Saves in under 10 seconds. Lead record created in CRM immediately. Full details filled later by owner.

**Business rule:** This is the single most-used admissions feature. Accessible in exactly 1 tap from anywhere in the app — no navigation required. When a parent calls during the school day, the owner must be able to capture the lead while on the phone.

#### Lead Record Fields

```
lead_id             LED-NNN
parent_name         String
child_age           Number (in years)
source              WhatsApp | Instagram | Facebook | Walk-in | Referral | Other
status              Pipeline stage (see below)
last_contact        Timestamp
batch_target        String (e.g. "June 2026")
phone               String
notes               Free text
created_at          Timestamp
```

#### Lead Pipeline — Indian Batch-Centric Model

```
Enquiry
  → Tour Scheduled
    → Tour Completed
      → Free Trial Booked
        → Trial Completed
          → Application Submitted
            → Enrolled
            → Waitlisted
            → Lost
```

- Drag-and-drop or tap to move between stages
- Each lead card shows: parent name · child age · source tag · days since last contact · target batch
- Indian model: June and January intake batches — not US-style rolling admissions

#### Free Trial Day Manager

| Feature | Requirement |
|---------|-------------|
| Slot management | Max 4 trial children per session · booking calendar view |
| Confirmation | Auto-WhatsApp to parent on booking: date, time, school address, what to bring |
| Follow-up | n8n trigger: if trial completed and not enrolled after 24 hours → auto-send follow-up WhatsApp template to parent |
| Convert | "Mark as Enrolled" button on lead card → auto-creates full student profile from lead data |

#### Source Tracking Analytics

- Monthly report: Instagram vs Facebook vs WhatsApp vs Referral vs Walk-in (count and conversion rate per source)
- Lead-to-enrolment conversion rate per source
- Identifies highest-ROI marketing channel for owner's social media spending decisions

#### Follow-up Automation (via n8n)

- Lead status unchanged for 48 hours → WhatsApp nudge sent to owner: `"[parent_name]'s enquiry has had no update for 48 hours. Time to follow up?"`
- Trial completed + not enrolled in 3 days → auto-send follow-up WhatsApp template to parent: `"Hi [parent_name], we loved meeting [child_name] during the Free Trial! We have [N] seats remaining for [batch_target]. Would you like to confirm enrolment? — [PrincipalName], [SchoolName]"`

#### Batch Occupancy Tracker

- Real-time seats available per batch per age group (from M18 classroom capacity)
- Dashboard alert when batch reaches 80% capacity
- When 5 seats remaining → M8 auto-generates a "Last Few Seats" urgency post template

#### GoHighLevel Sync

- All new leads sync to GoHighLevel pipeline via n8n webhook in real time
- Two-way status update: stage change in EduManager Pro updates GHL, and vice versa
- Pro Setup tier includes full GHL pipeline configuration by MNTTA team

#### Admission Letter Generator

One-click admission confirmation letter:
- School letterhead with logo
- Student name, batch, assigned classroom, start date, fee schedule, fee plan type
- Download as PDF
- WhatsApp to parent immediately

---

### MODULE 4 — Attendance Tracking

#### DEFAULT BEHAVIOUR — Mark All Present First (MUST HAVE)

**Business rule:** Attendance screen opens with ALL students ALREADY MARKED PRESENT by default. Teacher only taps names to change status to Absent, Late, or Half-Day. This is the correct design for Indian preschools where 95% of children are present on any given day. A teacher in a 20-child classroom should need only 1–3 taps on most days, not 20. This saves 4–5 minutes every morning.

**Do NOT build a system that requires marking each child individually as the primary flow.**

#### Attendance Record

```
att_id              ATT-NNN
student_id          FK → students
date                Date
status              Present | Absent | Late | Half-Day   (default: Present)
check_in_time       Time (set when QR code scanned or manual check-in logged)
health_status       Healthy | Fever | Rash | Cough | Sent-Home
health_temp         Decimal (°C or °F — unit configured in M1 school settings)
marked_by           FK → staff
```

#### QR Code Check-in (Optional Feature)

- Generate a unique QR code per student (displayed in student profile, printable)
- Teacher scans on child's arrival → timestamp auto-recorded → status set to Present with time
- Overrides the default-present state with the actual physical check-in time

#### Morning Health Screening Log (MUST HAVE)

After attendance is marked, teacher records the gate health check. Stored in `health_screen` tab:

```
screen_id           HSC-NNN
student_id          FK → students
date                Date
temperature         Decimal (e.g. 98.6)
status              Healthy | Fever | Rash | Cough/Cold | Sent-Home
sent_home           Boolean
notes               String
recorded_by         FK → staff
```

**Business rule:** If `status = Sent-Home`, n8n triggers an immediate WhatsApp to parent:  
`"We noticed [preferred_name] had [health_status] today and have asked you to take them home. Please rest for 48 hours and return when fully well. — [SchoolName] ([SchoolPhone])"`

#### WhatsApp Arrival Alert

- Trigger: student check-in event (QR scan or manual mark)
- n8n sends WhatsApp to parent: `"[preferred_name] has arrived safely at [SchoolName] at [check_in_time]. Have a great day! — [SchoolName]"`
- Toggled on/off per family via `arrival_alert_enabled` field in `families` tab

#### Absence Notification

- Trigger: AppScript time-based trigger at 9:30 AM
- For every student NOT checked in by 9:30 AM → WhatsApp to parent:  
  `"We have not seen [preferred_name] today. Is everything okay? Please let us know. — [SchoolName]"`
- Can be suppressed per student when parent has pre-notified the absence

#### Pickup Log — Safety Critical (MUST HAVE)

Stored in `pickup_log` tab (separate from attendance):

```
pickup_id                       PKP-NNN
student_id                      FK → students
att_id                          FK → attendance (links to today's record)
collector_name                  String (must match authorised_pickup_list)
relationship                    String
time_of_collection              Timestamp
verified_against_authorised_list Boolean
staff_id                        FK → staff (staff member who released the child)
notes                           String
```

**Business rule — enforcement flow:**

1. Staff taps "Log Pickup" for a student
2. System displays the authorised pickup list for that child (names + photos from M2 `families` tab)
3. Staff visually confirms identity and taps the correct person from the list
4. If the person is NOT on the authorised list → system shows a red warning and requires owner override with a mandatory written reason
5. Child must never be released without a completed pickup log entry — the Save button for attendance is blocked until pickup is logged at end of day

#### Late Pickup Tracking

- Trigger: child still present after (school close time + late pickup threshold from M1 config)
- Late pickup fee calculated: (minutes late ÷ 15) × per-15-minute fee rate from M1 config
- Fee auto-added to next month's fee collection screen for this student
- WhatsApp to parent: `"[preferred_name] was picked up at [time], [N] minutes after school close. A late pickup charge of Rs.[amount] has been added to your account. — [SchoolName]"`

#### Teacher Login — Limited-Role Access

**Business rule:** Teachers log in with their own credentials (email set in their staff profile in M9). A teacher session sees ONLY their assigned classroom's students. Teachers can ONLY:
- Mark attendance for their classroom
- Add Quick Observations in M10 (Curriculum module)

Teachers CANNOT access: fee records, CRM pipeline, other classrooms, staff records, salary information, or management reports.

#### Substitute Teacher Assignment (MUST HAVE)

**Trigger:** A teacher marks themselves absent, or the owner marks a teacher as absent in staff attendance.

**Automated flow:**

1. System shows owner alert: `"⚠️ [Classroom Name] is uncovered. [Teacher Name] is absent today."`
2. System lists available staff not currently assigned to another classroom
3. Owner taps to assign the substitute for today only
4. Staff-to-child ratio dashboard updates with substitute counted
5. Auto-generate WhatsApp to all parents in the affected classroom:  
   `"[Teacher Name] is unwell today. [Substitute Name] will be with [Classroom Name]. We appreciate your understanding. — [SchoolName]"`

#### Staff Attendance

- Separate daily check-in/check-out for all staff members
- Leave request form (type + dates + reason) → approval by owner
- Leave balance tracker: CL (Casual Leave) · PL (Privilege Leave) · SL (Sick Leave) per Indian labour norms
- Monthly staff attendance summary report

#### Monthly Attendance Reports

- Per student: days present / absent / late / health-sent-home · attendance percentage
- Attendance below 75% flagged with visual indicator
- Annual attendance register PDF — format aligned to school inspection requirements
- Bulk PDF generation for all students in a single export

---

### MODULE 5 — Fee Management

#### Fee Plan Types — Critical for Indian Preschool Market

| Plan Type | Payment Due Months | Reminder Sent On |
|-----------|-------------------|-----------------|
| Monthly | Every month | 1st of every month |
| Quarterly | April, July, October, January | 1st of each of those months only |
| Half-yearly | April, October | 1st of April and 1st of October only |
| Annual | April only | 1st of April only |

**Business rule:** Fee plan is selected per student at enrolment (M2 enrolment record). Reminders are sent ONLY on actual due dates. A student on Quarterly plan must NEVER receive a fee reminder in May, June, August, September, November, or December.

#### Fee Structure Setup

- Configure fee heads: Tuition · Admission (one-time, charged once) · Transport · Activity · Material · Late Pickup · Custom (unlimited custom fee heads)
- Set amount per fee head per plan type
- Sibling discount: configured as a percentage, auto-applied to the younger sibling's tuition fee
- Scholarship flag per student with discount percentage
- Fee heads can be enabled or disabled per student individually

#### Fee Collection Record

```
fee_id              FEE-NNN
student_id          FK → students
month               String (e.g. "April 2026" or "Q1 April 2026")
fee_head            String (e.g. "Tuition", "Transport", "Activity")
amount              Decimal
plan_type           Monthly | Quarterly | Half-yearly | Annual
mode                UPI | NEFT | IMPS | Cash | Cheque
upi_ref             String (UPI transaction ID)
cheque_number       String
bank_name           String
paid_at             Timestamp
receipt_number      Auto-generated: RCP-[SCHOOLCODE]-YYYY-NNN
```

#### UPI Receipt Generator

Auto-generate formatted PDF receipt on payment:
- School name (as per GST registration if applicable)
- GSTIN (optional, from M1 School Profile)
- Student name and batch
- Fee heads itemised with amounts
- Total amount in words (Indian legal format — e.g. "Rupees Eight Thousand Five Hundred Only")
- Payment mode and transaction reference
- Receipt number and date
- School stamp placeholder box
- School logo from brand kit

Receipt delivered: Download PDF + WhatsApp to parent immediately on generation.

#### Fee Reminder System

- AppScript trigger fires on the due date specific to each student's plan type
- First reminder WhatsApp to parent:  
  `"Hi [parent_name], [preferred_name]'s [fee_head] fee of Rs.[amount] for [period] is due. Pay via UPI: [SchoolUPI] or call us at [SchoolPhone]. Thank you! — [SchoolName]"`
- Second reminder 5 days later if still unpaid
- Owner escalation alert after 10 days unpaid: `"Rs.[amount] outstanding for [student name] — [N] days overdue. Action needed."`

#### Defaulter Dashboard

- All students with outstanding fees listed
- Filter by: batch · classroom · months overdue · amount range
- Total outstanding amount shown (school-wide)
- One-tap WhatsApp to individual parent
- Bulk WhatsApp to all defaulters in a selected batch or classroom

#### Tally CSV Export

- Monthly fee collection data exported as Tally ERP-compatible CSV
- Available on-demand or auto-generated on 1st of each month
- Eliminates manual re-entry by school accountant

#### Annual Fee Report

- Bar chart: fee collected vs expected per month
- Year-to-date total collected
- Total outstanding across all students
- Revenue breakdown by fee head (pie chart)
- Export as PDF for CA or accountant

---

### MODULE 6 — Parent Communication Hub

#### Daily Classroom Photo and Video Sharing (MUST HAVE — #1 Daily Feature)

**Business rule:** This is the most-used daily feature in EduManager Pro. Indian parents expect photos of their child in class by noon every day. This feature must be accessible in exactly 2 taps from the home screen. Every design decision must optimise for speed and simplicity.

**User flow:**

1. Teacher or owner taps "Share Photos" (large prominent button on home screen)
2. Selects classroom
3. Takes photo with device camera OR picks from gallery (maximum 8 images per send)
4. App auto-resizes images to WhatsApp-optimal dimensions (max 5MB per image)
5. Preview shown with caption field (pre-filled: `"Good morning from [Classroom Name] at [SchoolName]! 🌱"`)
6. Selects recipients: **All Parents in Classroom** (default) OR individual parents (multi-select)
7. One tap → sends via WhatsApp

#### WhatsApp Broadcast Generator

Pre-written templates (all auto-filled from School Profile Named Ranges):

| Template | Purpose |
|----------|---------|
| Holiday Notice | Announce school holiday with date and reopening |
| Assessment Schedule | Share exam or evaluation dates |
| Event Invite | Invite parents to school event |
| Fee Reminder | Gentle fee reminder (separate from M5 automation) |
| School Closure Alert | Emergency or planned closure notification |
| Parent Meeting Invite | PTM or general parent meeting |
| Emergency Notice | Urgent communication to all parents |
| Weekly Classroom Update | Summary of the week's activities and learning |
| Custom Broadcast | Free-text broadcast to selected recipients |

**Recipients:** All parents · Specific batch · Specific classroom · Individual family

#### Circular Generator

- Create school circulars with auto-applied school letterhead (logo + school name + address)
- Rich text editor (bold, italic, lists, headings)
- Auto-insert: school name, date, principal name, school logo
- Download as PDF
- WhatsApp to selected recipients or print

#### eConsent Forms

Types: Field trip permission · Photo/video consent · Medical treatment consent · Event participation · Custom

- Digital acknowledgement via WhatsApp reply ("Reply YES to confirm")
- Status tracked per family: Pending / Confirmed / Declined
- Reminder auto-sent after 48 hours if no response received
- Consent log stored per student per form type

#### Emergency Alert

- One-tap broadcast to ALL parents simultaneously
- Highest priority delivery — skips all queuing
- Message format: school name · date and time · situation summary · immediate instructions
- Delivery tracking: sent count, delivered count

#### Communication Log

- Full history of all broadcasts, circulars, and individual messages per family
- Searchable by: date range · message type · family name
- Sent/delivered status displayed where WhatsApp API provides confirmation

#### Monthly Newsletter Template

- Sections: Principal's message · Events this month · Child spotlight · Learning highlight · Upcoming dates and reminders
- Download as formatted PDF
- Distribute via WhatsApp or email

---

*— End of Part 2 of 5 —*  
*Continue with Part 3: Module Specifications M7–M13*
