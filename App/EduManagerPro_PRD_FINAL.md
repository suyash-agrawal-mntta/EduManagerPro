# EduManager Pro — Product Requirements Document
## Complete Build Specification for Claude Code
### PART 1 of 5 — Cover · Executive Summary · School Types · Pricing

---

**Developed by:** MNTTA — Montessori & Nursery Teachers Training Academy, Bangalore, India  
**Document type:** Product Requirements Document — Claude Code Build Command  
**Target market:** India's 2.5 lakh preschools · SEA Phase 2  
**Platform:** Google AppScript + HTML/CSS/JS + n8n + GoHighLevel  
**Pricing:** Rs.7,990 Early Bird · Rs.14,990 Standard · Rs.24,990 Pro Setup (all one-time, no subscriptions ever)  
**Confidential — For Developer Use Only**

---

## Table of Contents

1. [Executive Summary & Vision](#1-executive-summary--vision)
2. [School Type Configuration](#2-school-type-configuration)
3. [Pricing Architecture & Licence Management](#3-pricing-architecture--licence-management)
4. Module Specifications — 19 Modules *(in Parts 2, 3, 4)*
5. Data Architecture — Google Sheets Schema *(in Part 5)*
6. Technical Architecture *(in Part 5)*
7. GUI Design System & UX Requirements *(in Part 5)*
8. Build Sequence & Phase Plan *(in Part 5)*
9. Data Protection, Integrity & Backup *(in Part 5)*
10. Licence Delivery & Pricing Tiers *(in Part 5)*
11. Success Metrics *(in Part 5)*
12. Appendix — Module Build Priority *(in Part 5)*

---

## 1. Executive Summary & Vision

> **EduManager Pro** is a one-time-purchase, all-in-one preschool management and marketing platform built natively for Indian preschool owners. It is the **world's first school management system** to combine full operational management with a complete social media marketing engine — all in one product at a single lifetime price with no recurring charges, no subscriptions, and no per-user fees ever.

### 1.1 Problem Statement

Indian preschool owners face three simultaneous crises no single tool addresses today:

- **Administrative overload** — attendance, fees, parent communication, staff management, and compliance are managed across notebooks, WhatsApp groups, and disconnected Excel files with zero integration
- **Marketing paralysis** — 80% of preschool owners know they need to post on Instagram and Facebook but do not know what to write, how to design posts, or when to publish
- **Expensive and irrelevant software** — existing tools cost Rs.10,000–Rs.50,000/year, are built for the US/UK market, address only one function, and require recurring subscriptions that school owners deeply resent

### 1.2 Unique Differentiators

| Feature | Description |
|---------|-------------|
| Social media engine | 34 auto-personalised post templates + AI image prompts + Canva guide — no competitor has this anywhere in the world |
| WhatsApp-first architecture | All notifications, alerts, communications, receipts, and updates via WhatsApp — matching Indian parent behaviour |
| School-type adaptive | Montessori and Kindergarten modes — all templates, trackers, and reports adapt automatically to school type |
| Daily photo sharing | One-tap classroom photo to WhatsApp for all parents in a classroom — the #1 daily task Indian parents expect |
| Birthday management | Auto-alert + personalised WhatsApp + social media post on every child's birthday — zero misses |
| Auto-generated Parent Handbook | Professional PDF handbook auto-generated from school profile in one click — no competitor offers this |
| ECA Revenue Engine | Complete post-school-hour activity management — additional Rs.1.5–Rs.2.5L/month revenue for a 50-student school |
| India-native payments | UPI QR receipts, NEFT, cash/cheque log, Tally CSV export — not ACH or Stripe |
| One-time price forever | Rs.14,990 once — replaces Rs.20,000–Rs.75,000/year in combined annual subscriptions |
| MNTTA curriculum integration | Montessori material progression tracker aligned to MNTTA ECCE curriculum — only MNTTA can build this authentically |
| NEP 2020 & POCSO compliance | Built-in Indian regulatory compliance — no competitor addresses this |

---

## 2. School Type Configuration

EduManager Pro supports **TWO school types only**. Simplifying from three (removing "Integrated" as a separate type) reduces setup confusion and template maintenance overhead. Schools that blend Montessori and traditional methods select Montessori as their type and optionally use subject-grade fields alongside Montessori material tracking.

### 2.1 School Types

| Type | Full Description |
|------|-----------------|
| **Montessori** | Child-led work cycles · Material progression tracking across 5 areas (Practical Life, Sensorial, Language, Mathematics, Cultural) · Observation-based assessment (no grades, no worksheets) · MNTTA ECCE curriculum alignment · NEP 2020 Early Childhood Competency mapping · Child Portfolio PDF report · Montessori-specific social media templates and app language throughout |
| **Kindergarten (Traditional)** | Structured teacher-led sessions · Subject-based timetable (English, Maths, EVS, Hindi, Art, Music, PE) · Unit plan and lesson plan templates · Grade-based assessment (marks/grades) · Traditional report card with subject scores · Activity-focused and festival social media templates · CBSE/ICSE-aligned terminology in all reports and communications |

### 2.2 School Type Adaptation Matrix

| Module / Feature | Montessori | Kindergarten |
|-----------------|------------|-------------|
| Curriculum tracking | Montessori material progression map (5 areas) | Unit plan / lesson plan by subject |
| Student assessment | Observation notes + Child Portfolio | Grades + traditional report card |
| Progress report | Child Portfolio PDF with material progress | Subject-wise grades + attendance + comments |
| Social media templates | Montessori philosophy and child-led learning language | Activity, festival, and achievement-focused language |
| PTM pre-meeting summary | Material progress + observation highlights | Subject-wise grade summary |
| Lesson planning | Montessori 3-hour work period plan | Subject timetable per period |
| Parent Handbook content | Montessori philosophy section + prepared environment | School curriculum and subject overview |
| WhatsApp daily update | Work period summary — what materials child chose | Activity of the day |

### 2.3 School Type Selection Rules

- Selected **once** during 5-minute onboarding setup — shown as the first screen after entering school name
- Displayed as a permanent badge (e.g. `[Montessori]` or `[KG]`) throughout the entire app header
- **Can be changed** at any time in Settings → School Profile → School Type — all existing student data, fee records, and attendance logs are preserved
- Changing school type immediately updates: all social media template language, curriculum tracking screens, report card formats, and assessment methods

---

## 3. Pricing Architecture & Licence Management

### 3.1 Single-School Pricing Tiers

| Tier | Price | Inclusions |
|------|-------|-----------|
| **Early Bird** | Rs.7,990 one-time | First 100 buyers only · All 19 modules · Lifetime access · Email support 48hr response · Live counter on sales page showing slots remaining |
| **Standard** | Rs.14,990 one-time | Permanent price after early bird closes · All 19 modules · Lifetime access · WhatsApp support 24hr response · 1 free 30-minute onboarding call · Recommended hero tier |
| **Pro + Setup** | Rs.24,990 one-time | All Standard features + GoHighLevel CRM fully configured and connected + n8n automation workflows set up (8 workflows) + MNTTA expert 3-hour setup session + 3 months priority WhatsApp support |

> **CRITICAL ARCHITECTURE DECISION — Build one webapp, not three.**  
> All three tiers receive all 19 modules. Pricing differences are in support services and setup assistance only — never in software features. The app reads `plan_tier` from the `_licence` tab at startup and shows the appropriate support contact, upgrade options, and onboarding call booking link. Never lock any module or feature behind a tier.

```javascript
// Licence check — run at every app startup before rendering any screen
function getLicenceTier() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('_licence');
  return sheet.getRange('B2').getValue(); // returns: early_bird | standard | pro
}

function getSchoolType() {
  return SpreadsheetApp.getActive().getRangeByName('SchoolType').getValue();
  // returns: Montessori | KG
}
```

### 3.2 Licence Record — Fields Stored in `_licence` Tab

```
school_id             Auto-generated unique school identifier (SCH-NNN)
owner_name            String
email                 String
phone                 String
plan_tier             early_bird | standard | pro
purchase_date         Date (DD/MM/YYYY)
payment_mode          UPI | NEFT | Cash | Bank Transfer
payment_reference     String (UPI transaction ID or NEFT ref)
upgrade_history_json  JSON array of past plan changes with dates and amounts
support_entitlement   email_48hr | whatsapp_24hr | whatsapp_priority
onboarding_call_status  Not Scheduled | Scheduled (date) | Completed
school_type           Montessori | KG
active                Boolean (TRUE default — set FALSE only on refund)
```

### 3.3 My Plan Screen (Settings > My Plan)

The app shows this screen for every tier. Example for Standard tier:

```
CURRENT PLAN: Standard

Purchased: 15 March 2026
Licence: Permanent — no renewal, no subscription, ever.

WHAT IS INCLUDED:
✅ All 19 modules — full access
✅ Lifetime access — never expires
✅ WhatsApp support — 24-hour response
✅ Onboarding call — [Schedule Now / Completed on DD/MM/YYYY]

SUPPORT:
WhatsApp: [MNTTA support WhatsApp number]
Email: support@edumanagerpro.in

UPGRADE TO PRO — Rs.10,000 upgrade fee:
GoHighLevel CRM fully configured
+ n8n automation workflows set up
+ 3-hour MNTTA expert setup session
+ 3 months priority support
[UPGRADE NOW →]
```

### 3.4 Plan Upgrade Flow

1. Owner taps "Upgrade Now" in Settings → My Plan
2. Screen shows: current plan · target plan · delta benefits · upgrade fee (auto-calculated as difference)
3. Owner pays via UPI or NEFT to MNTTA bank details shown on screen
4. Owner enters payment reference in the upgrade form
5. MNTTA verifies payment and updates `plan_tier` in the `_licence` tab
6. Screen refreshes to show new plan
7. WhatsApp confirmation sent to owner: `"Your EduManager Pro plan has been upgraded to Pro. Our team will contact you within 24 hours to schedule your setup session. — MNTTA Support"`

**Rules:**
- No downgrades permitted — one-time licence is permanently activated at the tier purchased. Communicated clearly at checkout.
- 7-day refund window from purchase date if fewer than 20% of features used (assessed via `_audit_log` access count)
- Licence transfer allowed once per licence with documentation — Rs.999 transfer processing fee — handled by MNTTA support team

### 3.5 Multi-Branch / Franchise Pricing

| Enterprise Plan | Branches Included | Price (One-Time) | Effective Per-Branch Cost |
|-----------------|------------------|-----------------|--------------------------|
| Starter Network | 2–5 branches | Rs.34,990 | Rs.7,000–17,500 |
| Growth Network | 6–10 branches | Rs.54,990 | Rs.5,499–9,165 |
| Regional Chain | 11–25 branches | Rs.99,990 | Rs.4,000–9,090 |
| National Franchise | 26–50 branches | Rs.1,74,990 | Rs.3,500–6,730 |
| Enterprise Custom | 51+ branches | Custom quote | ~Rs.2,500/branch |

### 3.6 Multi-Branch Feature Requirements

| Feature | Requirement |
|---------|-------------|
| Franchisor dashboard | Consolidated real-time view: total enrolment across all branches · fee collection status per branch · attendance % per branch · marketing activity score (posts published this month per branch) · staff count · open admissions leads |
| Branch management | Add or remove branches from master account · each branch has its own School Profile (name, address, phone, staff) while inheriting the franchise brand kit (logo, colours, font) · assign branch manager with limited login showing only their branch |
| Brand control | Franchisor sets master brand kit — logo, primary colour, secondary colour, font, tagline · branches use brand kit in all templates and cannot override it · franchisor can push a batch update to all branch school profiles simultaneously |
| Data isolation | Each branch's student records, staff data, and financial data are completely isolated — branch manager sees only their branch · franchisor sees all branches · no accidental cross-branch data access |
| Consolidated reporting | Monthly consolidated PDF report: total revenue, total enrolment, occupancy % per branch, attendance trends, social media posts published per branch · exportable for franchisee review meetings |
| Template inheritance | Social media templates auto-fill with each branch's specific school name and contact details while using the master franchise content strategy and tone of voice |

---

*— End of Part 1 of 5 —*  
*Continue with Part 2: Module Specifications M1–M6*

## PART 2 of 5 — Module Specifications: M1–M6
### School Identity · Students · Admissions CRM · Attendance · Fees · Communication

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
## PART 3 of 5 — Module Specifications: M7–M13
### PTM · Social Media Engine · Staff · Curriculum · Calendar · Transport · Safety

---

### MODULE 7 — PTM (Parent-Teacher Meeting) Manager

#### PTM Record

```
ptm_id              PTM-NNN
student_id          FK → students
staff_id            FK → staff
date                Date
slot                Time (e.g. "10:15 AM")
notes               String (discussion notes taken during meeting)
actions_json        JSON array: [{ action, assigned_to, due_date, status }]
status              Scheduled | Completed | Cancelled | No-Show
```

#### Feature Specifications

| Feature | Requirement |
|---------|-------------|
| PTM schedule builder | Set PTM date · choose time slot duration (15, 20, or 30 minutes, configurable) · system auto-generates all slots for the school day · assign families to slots by batch / alphabetical / manual drag |
| PTM invite | Auto-generate personalised invite per family showing: date, time slot, teacher name, classroom, what to bring · WhatsApp to each parent · Google Calendar event link included |
| Pre-meeting child summary | Auto-generate per-child summary before PTM: attendance % · current fee status · material progress highlights (Montessori) or subject-wise grades (KG) · top 3 observation highlights · suggested discussion points · teacher reviews and personalises before the meeting |
| Meeting notes | Teacher records during PTM: discussion points raised · parent concerns noted · decisions made · action items with owner (school or parent) and due date |
| Action tracker | All PTM action items in a dashboard · status: Open / Completed / Overdue · WhatsApp reminder to assigned person on due date |
| PTM feedback | Post-meeting WhatsApp to parent (sent automatically 2 hours after scheduled slot): 3-question anonymous feedback form · results aggregated in M14 Reports dashboard |
| PTM history | Complete PTM history per child permanently stored: date · teacher · summary · action items · outcomes · accessible anytime from student profile |

---

### MODULE 8 — Social Media Marketing Engine

> **World-first differentiator.** No school management software globally includes a built-in marketing engine. This module alone justifies the purchase for most Indian preschool owners who struggle with consistent, quality social media content.

#### 34 Auto-Personalised Templates

| Category | Template IDs | Count |
|----------|-------------|-------|
| Summer Camp | SC-1 through SC-6 | 6 |
| Admissions Open | A-1 through A-6 | 6 |
| Parent Testimonials | T-1 through T-6 | 6 |
| Safety PSA | S-1 through S-6 | 6 |
| Free Trial Day | FT-1 through FT-4 | 4 |
| Content Calendar posts (Apr–Jun 2026) | — | 36 |

#### SUBSTITUTE() Formula Chain — Auto-Personalisation

Every `[bracket]` placeholder in every template is replaced automatically by a SUBSTITUTE() formula chain reading from School Profile Named Ranges:

| Placeholder | Named Range |
|-------------|-------------|
| `[School Name]` | `SchoolName` |
| `[Tagline]` | `SchoolTagline` |
| `[Address]` | `SchoolAddress` |
| `[City]` | `SchoolCity` |
| `[Phone]` | `SchoolPhone` |
| `[WhatsApp]` | `SchoolWhatsApp` |
| `[Email]` | `SchoolEmail` |
| `[Website]` | `SchoolWebsite` |
| `[Instagram]` | `SchoolInstagram` |
| `[Principal Name]` | `PrincipalName` |
| `[Founded Year]` | `FoundedYear` |
| `[Seats]` | `SeatsPerBatch` |
| `[Monthly Fee]` | `MonthlyFee` |
| `[Camp Fee]` | `CampFee` |
| `[Camp Dates]` | `CampDates` |
| `[Early Bird Date]` | `EarlyBirdDate` |
| `[Tour Schedule]` | `TourSchedule` |

**School type adaptation:**
- Montessori schools: language uses "prepared environment", "work period", "sensitive periods", "child-led learning", "3-hour work cycle"
- KG schools: language uses "structured curriculum", "unit plans", "activity-based learning", "CBSE-aligned"

#### Birthday Post Template (In Addition to 34 Templates)

A dedicated birthday social media post template auto-fills with:
- Child's first name (`preferred_name`)
- Age the child is turning (calculated from `dob`)
- Classroom name
- School name (`SchoolName`)
- School Instagram handle (`SchoolInstagram`)

Triggered from M11 birthday alert. One tap to generate post. One tap to copy caption. Parents screenshot and share — free organic marketing reach.

#### AI Image Prompt Library

One detailed AI image generation prompt per template. Each prompt specifies:
- **Indian children** (not Western-looking children)
- **Indian settings** (classroom with jute mat, clay pots, wooden Montessori materials, block-printed fabric)
- **Indian cultural elements**: terracotta flower pots, marigold garlands, brass diyas, dhurrie mats, children in kurta/salwar kameez, South Indian mother with bindi
- Art style: warm watercolour illustration, bright and inviting, child-friendly

Paste prompt directly into Canva Magic Media, DALL-E 3, or Midjourney to generate a professional, culturally appropriate image in under 30 seconds.

#### Content Calendar (April–June 2026, 36 Posts)

Each calendar entry contains all fields needed to publish the post:

```
date              String (e.g. "01 Apr")
day               String (e.g. "Tuesday")
month             String (e.g. "April 2026")
platform          Instagram Feed | Instagram Reels | WhatsApp Status | Facebook
post_type         Awareness | Educational | Engagement | Lead Generation |
                  Festival | Testimonial | Safety | Seasonal |
                  Behind the Scenes | Reel/Video
theme             Short description of post topic
template_caption  Caption with [brackets] — reference template, DO NOT EDIT
your_caption      SUBSTITUTE() formula output — fully personalised — COPY THIS TO POST
hashtags          20–30 platform-optimised hashtags across all 4 tiers
cta               Call to action text
canva_size        Canvas dimensions (e.g. "1080×1080 Feed Square" or "1080×1920 Reels")
ai_image_prompt   Complete image generation prompt (Indian context specified)
status            Planned | Designing | Scheduled | Published | Skipped
```

#### Canva Guide (In-App Reference Section)

| Guide Section | Content |
|---------------|---------|
| Brand kit setup | 7-step guide to creating Canva brand kit with logo, colours, fonts from school brand kit |
| Post sizes | 10 canvas sizes with pixel dimensions (Feed Square, Reels, Story, Facebook Cover, WhatsApp Status, etc.) |
| AI prompt formula | 7-part framework: Subject + Action + Emotion + Setting + Lighting + Art Style + Colour Palette |
| Optimal posting times | Morning 7:00–9:00 AM (school drop-off) · Lunch 12:00–1:30 PM · Evening 7:30–9:30 PM (peak engagement) · Best days: Tuesday, Thursday, Saturday |
| Hashtag strategy | 4 tiers: Broad (5–8 tags) + City-specific (5–8 tags) + Topic-specific (8–10 tags) + Branded school hashtag (2–3 tags) |
| Monthly checklist | 12 tasks: review calendar · create Canva designs · schedule posts · collect testimonial · check analytics · etc. |

#### Hashtag Generator

- Owner enters post topic (e.g. "Diwali celebration at our Montessori school")
- System generates 30 relevant hashtags across all 4 tiers
- City-specific hashtags auto-generated from `SchoolCity` named range (e.g. `#MontessoriBangalore`)
- One-tap copy all hashtags to clipboard

#### Testimonial Collection System

- Per-testimonial WhatsApp collection scripts (exact message to send to parent to request a testimonial)
- Consent status tracked per family: Not Asked / Asked / Consented / Declined
- 6 testimonial post templates (T-1 through T-6) with auto-fill
- Video testimonial filming guide with shot list and suggested questions

---

### MODULE 9 — Staff Management

#### Staff Profile

```
staff_id                STF-NNN
full_name               String
role                    Owner | Head Educator | Assistant Educator | Support Staff | ECA Trainer
qualification           String (e.g. "B.Ed", "Diploma in Montessori Education")
mntta_cert_number       String (MNTTA ECCE certificate number)
mntta_cert_expiry       Date
bgv_status              Pending | Verified | Failed
bgv_document_ref        Google Drive URL (background verification document)
aadhaar                 String (optional)
emergency_contact       String
join_date               Date
status                  Active | On Leave | Resigned
bank_name               String
account_number          String (masked in display: xxxxxx1234)
pf_enrolled             Boolean
esi_enrolled            Boolean
```

#### MNTTA Certification Tracker

- AppScript time trigger: 60 days before `mntta_cert_expiry` → WhatsApp to owner:  
  `"Ms [staff_name]'s MNTTA certification expires on [date]. Please contact MNTTA to renew. — EduManager Pro"`
- "MNTTA Certified ✓" badge displayed on staff profile card and in classroom roster
- **Unique to EduManager Pro — no competitor has this feature**

#### Teacher Profile Extension (for Head Educator and Assistant Educator roles)

```
classroom_id_primary      FK → classrooms (primary classroom as Head Teacher)
classroom_id_secondary    FK → classrooms (optional — for ECA or shared teaching)
age_groups_qualified      Array (e.g. ["3-4 years", "4-5 years", "5-6 years"])
school_type_certified     Montessori | KG | Both
teacher_login_email       String (email for limited-role teacher login)
```

**Business rule:** One teacher can be Head of only ONE classroom. A teacher can be listed as Assistant in multiple classrooms (for schools with shared or part-time teaching models).

#### Salary Register

```
salary_id               SAL-NNN
staff_id                FK → staff
month                   String (e.g. "March 2026")
basic                   Decimal
allowances              Decimal
gross                   Decimal (auto-calculated: basic + allowances)
pf_deduction            Decimal (12% of basic if pf_enrolled = TRUE)
esi_deduction           Decimal (0.75% of gross if esi_enrolled = TRUE)
other_deductions        Decimal
net_payable             Decimal (auto-calculated: gross - all deductions)
paid                    Boolean
paid_date               Date
payment_reference       String
```

Generate salary slip PDF with school letterhead. WhatsApp salary slip to staff member on payment.

#### Annual Appraisal System

Appraisal form with 5 rating criteria (score 1–5):

| Criterion | Description |
|-----------|-------------|
| Punctuality | Consistent timely arrival and adherence to schedule |
| Parent communication | Quality and professionalism of parent interactions |
| Classroom management | Effectiveness in maintaining a prepared, calm environment |
| Curriculum delivery | Skill in presenting Montessori materials or KG lessons |
| Professional development | Initiative in attending training and MNTTA programmes |

- Overall rating auto-calculated (average of 5 criteria)
- Comments field per criterion
- Historical appraisal records per staff member, all years

#### HR Document Generator

- Auto-generate Offer Letter from school letterhead template with staff name, role, salary, start date
- Auto-generate Appointment Letter from school letterhead template with terms of employment
- Download PDF · WhatsApp to staff member

#### Leave Management

- Leave request form: type (CL/PL/SL) · start date · end date · reason
- Owner approves or declines with one tap
- Leave balance auto-updated on approval
- Monthly leave summary per staff member

---

### MODULE 10 — Curriculum, Learning & Assessment

#### QUICK OBSERVATION — 15-Second Entry (MUST HAVE — Default Mode)

**Business rule:** A Montessori teacher observes children during a 3-hour work period. Interrupting children to make a structured note defeats the purpose. The Quick Observation entry must be the DEFAULT — not a secondary option. The full structured form exists but requires a deliberate "Add Full Note" tap to open.

**Quick Observation flow:**

1. Tap child's name from classroom roster
2. Select material from pre-loaded dropdown (Montessori area + material name)
3. Select status: `Not Introduced` · `Introduced` · `Practising` · `Mastered`
4. Optional: type 1-line free text note (not required to save)
5. Tap SAVE — entire flow takes 15 seconds

#### Curriculum Record

```
curr_id             OBS-NNN
student_id          FK → students
date                Date
material_name       String (from pre-loaded material list)
area                Practical Life | Sensorial | Language | Mathematics | Cultural
status              Not Introduced | Introduced | Practising | Mastered
notes               String (optional, 1-line quick note)
recorded_by         FK → staff
```

#### Montessori Material Progression Tracker (School Type: Montessori Only)

Pre-loaded material lists across five areas:

**Practical Life**  
Pouring dry · Pouring liquid · Spooning · Tongs · Folding · Buttoning · Zipping · Lacing · Washing hands · Watering plants · Sweeping · Dusting · Setting table · Washing dishes · Food preparation

**Sensorial**  
Pink Tower · Red Rods · Broad Stair · Cylinder Blocks (Set 1–4) · Colour Boxes 1, 2, 3 · Geometric Solids · Geometric Cabinet · Constructive Triangles · Binomial Cube · Trinomial Cube · Mystery Bag · Smelling Bottles · Tasting Bottles · Sound Cylinders · Thermic Tablets

**Language**  
Sandpaper Letters (vowels) · Sandpaper Letters (consonants) · Moveable Alphabet · Phonogram Objects · Phonemic Awareness · 3-Part Reading Cards · Command Cards · Reading Booklets · Pre-writing Strokes · Letter Formation · Grammar Symbols (noun, article, adjective, verb)

**Mathematics**  
Number Rods · Sandpaper Numbers · Number and Counters · Spindle Boxes · Golden Bead Material Introduction · Golden Bead Exchange Game · Teen Boards · Ten Boards · Short Bead Chains · Square and Cube Chains · Addition Strip Board · Subtraction Strip Board · Multiplication Bead Bar · Division Board

**Cultural**  
Land and Water Globe · Land and Water Maps · Puzzle Maps (Continent) · Puzzle Maps (Country) · Animal Classification Cards · Plant Life Cycle · Basic Science Experiments · Art · Music Appreciation

Per-child progress shown as a visual map: each material marked with status colour (grey = not introduced, yellow = introduced, blue = practising, green = mastered).

#### KG Lesson Plan Template (School Type: KG Only)

```
plan_id             LPL-NNN
week_start          Date
subject             String (English | Maths | EVS | Hindi | Art | Music | PE)
learning_objective  String
activity_description String
materials_needed    String
assessment_method   String
nep_competency      String (linked NEP 2020 ECCE competency)
```

Print-ready A4 PDF format. Weekly calendar view.

#### NEP 2020 Alignment

- Every learning activity or lesson plan linkable to a NEP 2020 Early Childhood Competency
- Compliance report: % of competencies covered in current term
- **Unique differentiator for school inspections and parent trust**

#### Full Observation Log (Detailed Mode — Accessible via "Add Full Note")

```
obs_id                  FUL-NNN
student_id              FK → students
date                    Date
concentration_span      Number (minutes observed)
social_interaction      Solitary | Parallel | Cooperative | Leadership
independence_level      Needs Help | Guided | Independent | Leads Others
emotional_state         Settled | Anxious | Excited | Withdrawn | Distressed
material_worked         String
material_status         Not Introduced | Introduced | Practising | Mastered
observations            Free text (up to 1000 characters)
recorded_by             FK → staff
```

#### Progress Report and Portfolio Generator

**Montessori (school type = Montessori):**
- Child Portfolio PDF: compiled from Full Observation logs + Quick Observation material progress map + teacher summary comments
- Termly generation (2 or 3 times per academic year)
- Professional layout with school brand kit (logo, colours)

**Kindergarten (school type = KG):**
- Traditional report card: subject-wise grades + attendance summary + teacher comments per subject
- Term-end generation

Both types: Download PDF · WhatsApp to parent (typically at PTM)

#### Monthly Activity Planner

- Monthly calendar view for the classroom
- Pre-loaded content: Indian festival activities, seasonal themes, Montessori work period plans (for Montessori), subject rotation plans (for KG)
- Editable by teacher
- Printable PDF for classroom noticeboard

---

### MODULE 11 — Events, Activities & School Calendar

#### Monthly Calendar View (GUI — MUST HAVE)

A full monthly grid showing 30 or 31 days for the current month.

**Colour-coded event indicators on each day cell:**

| Colour | Event Type |
|--------|-----------|
| Navy dot | School events and announcements |
| Purple dot | PTM slots |
| Orange dot | ECA batch sessions |
| Red dot | Public holidays and school closures |
| Gold dot | Fee due dates |
| Green dot | Admissions events and Free Trial Days |

**Interactions:**
- Tap any day → day panel slides up from bottom showing all events for that day
- Previous/Next month navigation arrows
- "Today" button to jump back to current date
- "Export Month" → PDF of the month view (for parent noticeboard or WhatsApp distribution)

#### Weekly Calendar View (GUI — MUST HAVE)

A 7-column grid (Monday through Sunday) with time slots from 7:00 AM to 7:00 PM in 30-minute increments.

**Blocks shown:**

| Block type | Display |
|------------|---------|
| Regular school hours | Shaded background |
| ECA batch sessions | Orange filled block with activity name and trainer name |
| PTM appointments | Purple filled block with parent name |
| Staff scheduled leave | Grey block with staff name |

- Classroom filter: view one classroom or all classrooms combined
- **Also serves as the ECA timetable manager** — used when creating ECA batches in M19 to check for scheduling conflicts

#### Add Event from Calendar

- Tap any date or time slot → "Add Event" appears
- Select type: School Event · PTM · ECA Session · Holiday · Fee Due Date · Other
- Fill event details → Save
- Event appears immediately on calendar
- Optional WhatsApp notification to relevant parents or teachers

#### Birthday Management (MUST HAVE)

**AppScript time trigger:** Every morning at 7:00 AM, system checks all student `dob` fields in the `students` tab.

**If any child has a birthday today OR tomorrow:**

1. A prominent birthday alert card appears at the top of the owner's home dashboard
   - Child photo, full name, classroom name, age they are turning
2. **Button 1:** "Send Birthday WhatsApp to Parent" — one tap sends:  
   `"Happy Birthday to our wonderful [preferred_name]! 🎂 [SchoolName] wishes [him/her] a magical [age]th birthday! May this year bring joy, learning, and endless wonder. 🌟 — The [SchoolName] Family"`
3. **Button 2:** "Generate Birthday Post" — one tap opens M8 birthday template auto-filled with child name and age, ready to copy and post on Instagram/Facebook

**Business rule:** The birthday alert is the first thing the owner sees every morning. Zero missed birthdays is non-negotiable. This single feature builds enormous parent goodwill.

#### Annual School Calendar

- Pre-loaded Indian national public holidays
- Add custom school holidays and events
- Term start/end dates from M1 academic year config
- Share full calendar: download PDF · WhatsApp broadcast to all parents

#### Event Planner

Event types: Annual Day · Sports Day · Graduation Ceremony · Grandparents Day · Field Trip · PTM · Custom

For each event: name + date + checklist template (pre-loaded per event type) + budget tracker + venue + responsible staff

#### Graduation Ceremony Planner

- Student list with programme roles assigned (e.g. anchor, performer, speech)
- Certificate generator: auto-fill student name, school name, academic year, programme title, principal signature placeholder
- Parent invitation letter
- Links to M8 graduation social media post template

#### Summer Camp Content Planner (Marketing — Operational Camp Management in M19)

- 4-week theme calendar (themes: Around the World · Little Scientists · Arts and Culture · Nature Warriors)
- Daily activity plan per week with pre-loaded activity suggestions
- Parent communication templates (announcement, registration, reminder, wrap-up)
- Direct link to M8 Summer Camp templates SC-1 through SC-6

#### Festival Activity Guides (Pre-loaded, 11 Festivals)

Pre-built classroom activity guides for: Diwali · Holi · Dussehra · Ganesh Chaturthi · Pongal/Sankranti · Independence Day · Republic Day · Teachers Day · Children's Day · Eid · Christmas

Each guide includes: suggested activities, craft ideas, story time content, parent communication template, social media post template from M8.

#### Google Calendar Sync (Enhanced)

- All school events, PTM appointments, and ECA batch sessions sync to owner's Google Calendar via Google Calendar API
- Parent PTM invites include a Google Calendar event link (parents add to their own calendar with one tap)
- ECA batch schedule shareable as a recurring Google Calendar event for parents who want weekly session reminders

---

### MODULE 12 — Transport Management

> No competitor — including Procare (US market leader) — has a transport management module. 60%+ of Indian preschool children use school transport. This is a significant product differentiator.

#### Vehicle Register

```
vehicle_id              VEH-NNN
vehicle_number          String (e.g. KA01AB1234)
make_model              String (e.g. "Tata Winger 9-seater")
capacity                Number (passenger seats)
insurance_expiry        Date
fitness_cert_expiry     Date
permit_expiry           Date
driver_id               FK → eca_trainers (reuse or separate drivers table — see schema)
status                  Active | Inactive
notes                   String
```

**Alert:** 30 days before any document expiry (insurance, fitness cert, permit) → WhatsApp to owner with specific document name and expiry date.

#### Driver Register

```
driver_id               DRV-NNN
full_name               String
licence_number          String
licence_expiry          Date
bgv_status              Pending | Verified | Failed
police_clearance_ref    Google Drive URL
phone                   String
emergency_contact       String
assigned_route_id       FK → routes
status                  Active | Inactive
```

#### Route Planner

- Create named routes (e.g. "Indiranagar Route", "HSR Layout Route", "Whitefield Route")
- Add stops in sequence with: stop name · landmark description · estimated arrival time
- Assign vehicle and driver to each route
- View all routes on a list with stop count and total time

#### Student Bus Assignment

- Assign each student to a route and a specific stop on that route
- View all students assigned to each route (roster per vehicle)
- Print daily pickup list per vehicle as PDF (includes student name, parent phone, stop name)

#### Transport Fee

- Transport fee is a separate fee head in M5 fee structure
- Monthly collection logged in M5 fees tab
- UPI receipt generated via M5 receipt generator
- Outstanding transport fees shown in M5 defaulter dashboard
- Exemption flag per student (marks student as walking or privately dropped)

#### WhatsApp Route Update Templates

| Template | Message |
|----------|---------|
| Bus departed | `"[SchoolName] bus has departed and will reach [Stop Name] at approximately [Time]. — [SchoolName]"` |
| Bus delayed | `"Our bus is delayed approximately [N] minutes due to [reason]. Revised arrival at [Stop Name]: [Time]. We apologise for the inconvenience. — [SchoolName]"` |
| Bus arrived at stop | `"Bus has reached [Stop Name]. [preferred_name] is on their way! — [SchoolName]"` |

One-tap send by owner or designated staff member to a route's parent WhatsApp group.

#### Document Expiry Dashboard

All vehicle and driver documents in one consolidated view:

| Indicator | Meaning |
|-----------|---------|
| Green | Valid — more than 30 days remaining |
| Amber | Expiring within 30 days — action needed |
| Red | Expired — vehicle should not operate |

WhatsApp alert sent to owner when any document status changes to Amber.

---

### MODULE 13 — Safety & Compliance

#### Visitor Log

```
visitor_id      VST-NNN
name            String
purpose         String (e.g. "Parent pickup", "Vendor delivery", "Inspection officer")
contact_number  String
person_met      String (staff name)
id_type_verified String (e.g. "Aadhaar", "Driving Licence", "PAN")
entry_time      Timestamp
exit_time       Timestamp
notes           String
```

Printable daily visitor report (A4 format) for school records and inspections.

#### POCSO Compliance Module

| Feature | Requirement |
|---------|-------------|
| Staff awareness checklist | Pre-loaded POCSO awareness checklist reviewed with all staff · each point confirmed with staff signature |
| Staff acknowledgement form | Digital form: staff reads and digitally signs POCSO policy · stored in their staff profile as Google Drive reference |
| Mandatory reporting SOP | Step-by-step reporting procedure document (who to call, what to record, how to respond) · printable PDF |
| Body safety policy | Pre-written body safety policy template for Parent Handbook (auto-inserted in M15 if school type = Montessori or KG) |
| Safe environment audit | Annual checklist: camera placement, blind spots, staff-to-child visibility, one-to-one interaction policy |

#### Fire Safety Log

```
drill_id        FDR-NNN
drill_date      Date
evacuation_time Number (minutes and seconds)
issues_noted    String (e.g. "Exit door in corridor stiff")
corrective_action String
next_drill_due  Date (auto-calculated: 3 months after drill_date)
extinguisher_inspection_date  Date
extinguisher_next_service     Date
```

#### CCTV Audit Log

```
audit_id        CCT-NNN
audit_date      Date
cameras_functional  Number
total_cameras       Number
last_recording_review Date
storage_days_confirmed Number (e.g. 30 days)
blind_spots_noted   String
corrective_action   String
```

#### Accident and Incident Report

```
incident_id     INC-NNN
date            Date
time            Time
child_name      String (student_id FK → students)
location        String (e.g. "Playground", "Classroom", "Corridor")
description     String (what happened)
action_taken    String (immediate first aid and response)
parent_notified_at  Timestamp
medical_treatment   String (None | First Aid | Doctor | Hospital)
follow_up_required  Boolean
follow_up_notes String
recorded_by     FK → staff
```

Printable A4 PDF format for school records. Required for insurance and inspection purposes.

#### Medical Emergency SOP

Pre-built step-by-step emergency response procedure:
- Step 1: Stay calm and assess the child
- Step 2: Call [SchoolPhone] emergency contact on file
- Step 3: Administer first aid (school kit location: [configured field])
- Step 4: Call parent emergency contact 1, then emergency contact 2
- Step 5: If needed, call [nearest hospital from SchoolCity config]
- Step 6: Notify school owner immediately
- Step 7: Complete incident report form

Emergency contacts pre-filled from nearest hospitals in `SchoolCity`.

#### Authorised Pickup Enforcement

Links directly to M2 (authorised_pickup_list) and M4 (pickup_log):
- System displays authorised persons with photos when staff is logging a pickup
- Alert if pickup attempted by unauthorised person
- All pickup events permanently logged with timestamp and staff signature

#### Safety PSA Social Media Templates (in M8)

6 India-specific Safety PSA posts included in M8 template library:

| Template ID | Topic |
|-------------|-------|
| S-1 | School Safety — 8-point safety commitment poster |
| S-2 | Monsoon Water Safety — flood, waterlogging, open drains |
| S-3 | Road Safety — pedestrian and vehicle awareness |
| S-4 | Diwali Fire Safety — sparklers, crackers, burn prevention |
| S-5 | Body Safety (POCSO-aware) — safe and unsafe touch, tell a trusted adult |
| S-6 | Digital and Screen Safety — screen time guidance for preschool age |

---

*— End of Part 3 of 5 —*  
*Continue with Part 4: Module Specifications M14–M19*
## PART 4 of 5 — Module Specifications: M14–M19
### Reports · Parent Handbook · CPD · Integrations · Classroom Management · ECA Revenue Engine

---

### MODULE 14 — Reports & Analytics Dashboard

#### Homepage Executive Dashboard (Always Visible on Home Screen)

**TODAY card:**
- Live attendance % for today · one-tap shortcut to open attendance marking screen
- Fees collected this month vs target (progress bar showing Rs. amounts)
- Next upcoming event with date and days-until countdown
- Social media posts published this month vs monthly target of 12

**BIRTHDAY ALERT (conditional — shown only when relevant):**
- Appears prominently when any child has a birthday today or tomorrow
- Large warm-coloured card: child photo · full name · classroom · age turning
- Button 1: "Send Birthday WhatsApp" — one tap, sends personalised message to parent
- Button 2: "Generate Birthday Post" — one tap, opens M8 birthday template pre-filled

**POST TODAY card:**
- Today's suggested social media post pulled from M8 content calendar
- First 3 lines of auto-personalised caption shown as preview
- "Copy Caption" button — copies SUBSTITUTE() output to device clipboard
- "Open in Canva" deep link

**QUICK ADD button (always visible):**
- Floating "+" button on every screen — see M3 for full specification
- Leads to 4-field lead capture bottom sheet

**FOLLOW UP card:**
- Leads not contacted in 48+ hours: count + names of top 3 oldest leads
- Students with overdue fees: count + total outstanding amount
- Documents (vehicle insurance, staff certificates) expiring within 30 days: count

#### Enrolment Analytics

| Metric | Display |
|--------|---------|
| Current enrolment | By batch and age group · total vs capacity |
| Occupancy % | Per batch with colour-coded capacity bar |
| Monthly enrolment trend | Line chart — new enrolments per month, current academic year |
| Batch capacity utilisation | Table: batch name · capacity · enrolled · available seats |
| Year-on-year comparison | Current academic year vs previous |

#### Fee Analytics

| Metric | Display |
|--------|---------|
| Collected vs expected | Bar chart per month — actual collected (teal) vs expected (grey outline) |
| Outstanding amount | Total school-wide + breakdown by student |
| Defaulter count | Students with any outstanding balance |
| Revenue by fee head | Pie chart: Tuition vs Transport vs Activity vs Other |
| Annual revenue chart | 12-month bar chart for current academic year |
| Plan-type tracking | Monthly/Quarterly/Annual plan due dates and collection status |

#### Attendance Analytics

| Metric | Display |
|--------|---------|
| School-wide attendance % | Per day, per week, per month |
| Below 75% flag | List of students with attendance below minimum threshold |
| Health screening summary | Count of students sent home per month, with reasons breakdown |
| Staff attendance summary | Present/absent/leave per staff member per month |

#### ECA Revenue Analytics

| Metric | Display |
|--------|---------|
| ECA collected vs expected | Per month, per activity |
| Per-activity revenue | Music · Dance · Karate · Art · Other — bar chart |
| Trainer cost vs revenue | Cost line vs revenue bar — net ECA profit per month |
| Occupancy per batch | Current enrolment vs capacity per ECA batch |

#### Marketing Analytics

| Metric | Display |
|--------|---------|
| Posts published | This month vs 12-post target · trend chart |
| Enquiries by source | Instagram · Facebook · WhatsApp · Referral · Walk-in — count and % |
| Lead conversion rate | Leads → Enrolled % per source per month |
| Free Trial conversion | Trial attended → Enrolled % |
| CRM pipeline distribution | Count of leads in each pipeline stage |

#### Annual School Report (End of Year)

Comprehensive year-end PDF report including:
- Total enrolment (peak and end-of-year)
- Total fee collected (tuition + ECA + transport)
- Average daily attendance %
- Staff headcount and turnover
- Events conducted (count by type)
- Social media posts published (total, by category)
- Safety drills completed
- ECA programmes run and total ECA revenue
- Year-on-year comparison across all key metrics

#### Custom Report Builder

- Select any combination of available metrics
- Set date range (custom from/to dates)
- Filter by batch or classroom
- Generate report → download as PDF or CSV

---

### MODULE 15 — Parent Handbook Generator

> Auto-generates a complete, professionally formatted Parent Handbook PDF from School Profile data in one click. No competitor offers this. Every new parent receives a personalised handbook on admission day — builds immediate trust and sets professional expectations from day one.

**Generation:** Owner taps "Generate Handbook" → PDF created in under 30 seconds → download and/or WhatsApp to parent.

#### Section 1 — School Identity

Auto-filled from M1 School Profile named ranges:
- School name, logo, tagline
- Full address and all contact details
- Principal/owner welcome message (editable template — owner personalises once, saved)
- School philosophy paragraph (auto-adapted to school type: Montessori philosophy text or KG curriculum approach text)
- MNTTA certification acknowledgement (if applicable)
- Year established

#### Section 2 — Academic Information

- Academic year dates (from M1 config)
- Daily routine schedule (editable template: arrival time, morning circle, work period, lunch, outdoor, dismissal)
- Curriculum overview (auto-adapted to school type)
- Assessment and reporting approach (portfolio + observation for Montessori; grades + report card for KG)
- PTM schedule (term dates from M1 config)

#### Section 3 — School Policies

- Attendance policy: minimum 75% attendance required · absenteeism procedure
- Punctuality: school open time from M1 config · late arrival procedure
- Holiday and absence notification procedure
- Medication administration policy (references the M2 medication log procedure)
- Allergy management policy
- School closure and emergency communication procedure

#### Section 4 — Safety Policies

- Gate safety procedure: who can collect the child, authorised pickup list rules
- CCTV notice (legal disclosure of camera monitoring)
- Visitor policy: all visitors must sign in and show ID
- Emergency response procedure summary
- POCSO body safety note for parents: what the school teaches, what parents should reinforce at home

#### Section 5 — Fee Schedule

- Fee structure: all fee heads with amounts (from M5 fee structure)
- Student's personal fee plan type (Monthly/Quarterly/Half-yearly/Annual — from enrolment record)
- Payment modes accepted: UPI · NEFT · Cash · Cheque
- Payment due dates specific to student's plan type
- Late payment policy
- Refund policy

#### Section 6 — Transport Information (shown only if student is assigned to a route in M12)

- Available route name and stops
- Drop-off time and pickup time
- Driver name and contact number
- Route update WhatsApp group join instructions

#### Section 7 — Parent Involvement

- PTM schedule: how and when PTMs are held
- Parent volunteer opportunities
- Classroom observation policy (can parents visit? advance notice required?)
- Communication channels: WhatsApp (primary) · Email (secondary) · In-person by appointment

#### Section 8 — FAQ

20 most common new-parent questions with answers auto-adapted to school type. Examples:
- *What should my child wear to school?*
- *What is a work period? (Montessori) / What subjects will my child study? (KG)*
- *How will I receive updates about my child's day?*
- *What happens if my child is absent?*
- *Can my child bring toys from home?*
- *How are fees collected and receipted?*
- *What is the late pickup policy?*

Owner can add custom Q&As from a form within the app.

#### Output and Delivery

- Download as professionally formatted PDF with school branding applied (logo, primary colour, font)
- WhatsApp directly to parent on admission day
- Print option (A4, both sides)
- Re-generate at any time — updates automatically when School Profile changes

---

### MODULE 16 — Staff CPD & Training Log (Simplified)

> **Scope clarification:** This module covers CPD (Continuing Professional Development) tracking and MNTTA certification monitoring for preschool staff. Full MNTTA trainee cohort management (for trainees enrolled in the MNTTA diploma) is an MNTTA internal product, not a preschool owner tool, and is **excluded** from this PRD.

#### MNTTA Certification Tracker

- Staff MNTTA/ECCE certificate number and expiry date stored in staff profile (M9)
- AppScript trigger 60 days before expiry: WhatsApp to owner with staff name and expiry date
- "MNTTA Certified ✓" badge visible on staff profile, classroom roster, and Parent Handbook (under staff section)

#### CPD Training Log

```
cpd_id              CPD-NNN
staff_id            FK → staff
training_name       String (e.g. "Child Protection Awareness Workshop")
date                Date
provider            String (e.g. "MNTTA", "NIPCCD", "External")
type                External Workshop | Internal Training | MNTTA Programme | Webinar | Conference
cpd_hours           Number (duration in hours)
certificate_ref     Google Drive URL (certificate scan)
notes               String
```

#### Internal Training Calendar

- Schedule in-house training sessions: topic, date, time, trainer, location
- Staff attendance register per session
- Notes and materials reference

#### Training Summary Report

| Report element | Content |
|----------------|---------|
| Annual CPD hours | Total CPD hours per staff member in current academic year |
| MNTTA cert status | Valid / Expiring / Expired per staff member — all in one table |
| Training type breakdown | Hours by External / Internal / MNTTA / Webinar |
| Budget tracking | Training cost vs budget (if budget field configured) |

---

### MODULE 17 — Integrations & Automation

#### GoHighLevel CRM Sync

- All new admissions leads auto-sync to GoHighLevel CRM pipeline via n8n webhook in real time
- Two-way status update: stage change in EduManager Pro updates GHL pipeline, and vice versa
- Lead source, child age, parent phone, and notes synced with each lead record
- **Pro Setup tier:** Full GoHighLevel pipeline configuration, lead stages, and automation sequences set up by MNTTA team within 48 hours of purchase

#### n8n Automation Workflows — 8 Pre-Built Workflows

| # | Trigger Event | Automated Action |
|---|--------------|-----------------|
| 1 | Student attendance check-in | WhatsApp to parent: safe arrival confirmation |
| 2 | Fee due date reached (plan-type aware) | WhatsApp to parent: fee payment reminder |
| 3 | Lead status unchanged for 48 hours | WhatsApp to owner: follow-up nudge for that lead |
| 4 | Trial completed + not enrolled after 3 days | WhatsApp to parent: follow-up enrolment message |
| 5 | Birthday check at 7:00 AM (daily AppScript trigger) | WhatsApp birthday template to owner · birthday alert on home dashboard |
| 6 | Student health-screened as Sent-Home | WhatsApp to parent: health alert with recovery guidance |
| 7 | Teacher marked absent | WhatsApp to owner: substitute assignment prompt with classroom name |
| 8 | ECA batch reaches 5 seats remaining | M8 auto-generates "Last Few Seats" urgency post template |

All n8n workflows are included in the Standard and Pro tiers. Pro Setup tier includes MNTTA team deploying and configuring all 8 workflows.

#### WhatsApp Business API Integration

- WABA-compliant message templates (all templates pre-approved format)
- Message delivery receipts (sent, delivered, read status where available)
- Opt-in / opt-out management per parent (stored in `families.arrival_alert_enabled` and expandable flags)
- Supports high-volume broadcasts (100+ recipients) without WhatsApp personal account limitations

#### Google Calendar Sync

- School events, PTM appointments, and ECA batch sessions sync to owner's Google Calendar via Google Calendar API
- Parent PTM invitations include a Google Calendar event link so parents can add to their own calendar with one tap
- ECA batch schedule can be shared as a recurring Google Calendar event to parents who want weekly session reminders on their phones

#### Tally CSV Export

- Monthly fee collection data formatted as Tally ERP-compatible CSV
- Auto-generated on 1st of each month and available on-demand at any time
- Eliminates manual re-entry of fee data by school accountant
- All fee heads, amounts, receipt numbers, and payment modes included

#### Inbound Webhooks

| Webhook | Action |
|---------|--------|
| Facebook Lead Form submission | Auto-creates lead record in M3 CRM with source = Facebook |
| Google Form enquiry submission | Auto-creates lead record in M3 CRM with source = Website |
| New web form enquiry (any source) | Auto-sends WhatsApp acknowledgement to parent: `"Hi [parent_name]! Thank you for your enquiry about [SchoolName]. We will call you within 24 hours. — [PrincipalName], [SchoolPhone]"` |

---

### MODULE 18 — Classroom & Teacher Management

#### Create Classroom

```
classroom_id            CLS-NNN
name                    String (e.g. "Sunflower Room", "Blue Room", "Room 1")
type                    Montessori Primary | Montessori Casa | KG Nursery | KG LKG | KG UKG
capacity                Number (maximum students this classroom can hold)
current_occupancy       Auto-calculated from classroom_students tab (count where status = Active)
head_teacher_id         FK → staff (role must be Head Educator)
asst_teacher_id         FK → staff (optional — role must be Assistant Educator)
school_type             Montessori | KG (inherited from M1 school type setting)
status                  Active | Inactive
```

#### Classroom Card View (Dashboard)

Each classroom displayed as a card:
- Room name + type badge
- Head teacher name (and assistant if assigned)
- Live occupancy bar: `[████████░░] 18/25 — 72%`
  - Green fill: under 80% capacity
  - Amber fill: 80–95% capacity
  - Red fill: at or over 100% capacity
- Quick action buttons: "View Students" · "Mark Attendance" · "WhatsApp Parents"

#### Assign Teacher to Classroom

- From classroom screen: select classroom → tap "Assign Head Teacher" → dropdown shows all staff with `role = Head Educator` → select → Save
- Optional: tap "Assign Assistant" → dropdown shows all staff with `role = Assistant Educator`
- **Business rule:** One teacher can be Head of only ONE classroom at any time. The system prevents double-assignment. A teacher can be Assistant in multiple classrooms.
- Historical assignment log: every change is recorded with the effective date, old teacher, and new teacher

#### Assign Child to Classroom — Three Methods

**Method 1 — At Enrolment:**  
During M3 admission flow → classroom selection dropdown shows classrooms with available seats matching child's age group → select and confirm → `classroom_id` updated on student record immediately

**Method 2 — Bulk Assignment:**  
Owner selects multiple enrolled students from a batch (multi-select checkbox list) → "Assign to Classroom" → select target classroom → confirm → all selected students assigned simultaneously → occupancy auto-updates

**Method 3 — Individual Transfer:**  
From student profile → "Transfer Classroom" → select target classroom → enter transfer date + reason → confirm → recorded in `classroom_students` tab with full history preserved

#### Classroom Students Tab

```
cs_id                   CST-NNN
classroom_id            FK → classrooms
student_id              FK → students
assigned_date           Date
transferred_from        FK → classrooms (previous classroom, null if first assignment)
transfer_reason         String (optional)
```

#### Classroom Roster View

Within each classroom card, tapping "View Students" shows:
- List of all enrolled students with photo and name
- Parent WhatsApp number per student (tap to open WhatsApp directly)
- Today's attendance status per student (colour coded: green = present, red = absent, grey = not marked)
- ECA activities each student is enrolled in
- Quick actions: "Mark Attendance for This Classroom" · "WhatsApp All Parents in Room"

#### Staff-to-Child Ratio Monitoring

After every classroom assignment or transfer, system checks:

| School Type | Maximum Ratio | Alert Threshold |
|-------------|--------------|-----------------|
| Montessori | 1:8 (1 teacher per 8 children) | Alert at 1:7 |
| KG | 1:12 (1 teacher per 12 children) | Alert at 1:11 |

Alert shown to owner: `"⚠️ Sunflower Room has 24 children and 2 educators (1:12 ratio — at limit for KG). Consider adding another educator."`

Ratio dashboard on home screen shows all classrooms colour-coded (green = safe, amber = near limit, red = over limit).

---

### MODULE 19 — Extra-Curricular Activities (ECA) Revenue Engine

> Post-school-hour activities represent Rs.2,000–Rs.5,000 per child per month in additional revenue for Indian preschools. A 50-student school running 3 ECA programmes can generate Rs.1.5–Rs.2.5 lakhs per month in additional revenue entirely separate from tuition fees. This module manages the full ECA lifecycle.

#### 19.1 Activity Setup

```
eca_id              ECA-NNN
name                String (e.g. "Bharatanatyam Dance", "Keyboard Music", "Karate", 
                            "Watercolour Art", "Yoga", "Abacus Maths")
category            Performing Arts | Martial Arts | Visual Arts | 
                    Academic | Sports | Wellness | Other
description         String (shown on parent-facing materials)
suitable_age_groups Array of strings (e.g. ["3-4 years", "4-5 years", "5-6 years"])
status              Active | Paused | Seasonal
```

#### 19.2 Batch Setup

```
batch_id            BCH-NNN
eca_id              FK → eca_activities
batch_name          String (e.g. "Monday Batch", "Advanced Group", "Age 4-5 Batch")
trainer_id          FK → eca_trainers
classroom_id        FK → classrooms (classroom used after school hours)
days_of_week        Array (e.g. ["Monday", "Wednesday", "Friday"])
time_slot_start     Time
time_slot_end       Time
start_date          Date
end_date            Date (null for ongoing batches)
max_students        Number
fee_per_month       Decimal (Rs.)
status              Active | Completed | Cancelled
```

**Conflict detection:** When creating a new batch, system checks if the trainer or the classroom is already assigned to another batch on the same day and overlapping time. If conflict detected → alert shown, Save blocked until resolved.

#### 19.3 ECA Trainer Management

ECA trainers are **completely separate** from regular school staff in M9. They are typically part-time, external, or contract-based instructors:

```
trainer_id              TRN-NNN
full_name               String
specialisation_csv      Comma-separated string (e.g. "Bharatanatyam, Kuchipudi")
phone                   String
whatsapp                String
email                   String
contract_type           Per Session | Monthly Retainer | Revenue Share %
rate                    Decimal (Rs. per session, or Rs. per month, or % of fees collected)
bgv_status              Pending | Verified | Failed
active                  Boolean
```

**Trainer payment tracker:**  
- Per Session: sessions delivered this month × rate = payable
- Monthly Retainer: fixed amount regardless of session count
- Revenue Share: (total fees collected from this trainer's batches) × % = payable
- Amount paid, outstanding balance, and payment history (with UPI/cash reference) tracked per month

**Trainer timetable:** Visual weekly view of all batches assigned to a trainer. Conflict detection runs at batch creation.

#### 19.4 ECA Enrolment

```
enrol_id                ENL-NNN
batch_id                FK → eca_batches
student_id              FK → students
enrolment_date          Date
status                  Active | Paused | Withdrawn
```

**Pre-enrolment validation checks (all three must pass):**
1. Student's age falls within `suitable_age_groups` for this ECA activity
2. Batch has not reached `max_students` capacity
3. No timing conflict with another ECA batch the student is already enrolled in

**Enrolment confirmation WhatsApp (auto-sent):**  
`"[preferred_name] is now enrolled in [activity name] at [SchoolName]! 🎉 Batch: [days] at [time_start]. First session: [start_date]. Monthly fee: Rs.[fee_per_month]. We look forward to seeing [him/her]! — [SchoolName] ([SchoolPhone])"`

#### 19.5 ECA Batch Roster and Attendance

- Each batch has a roster: list of enrolled students with parent WhatsApp numbers
- One-tap batch WhatsApp: `"Tomorrow's [activity name] session is confirmed at [time_start]. See you there! — [SchoolName]"`
- Separate ECA attendance per session (trainer marks present/absent for their batch independently of school day attendance)

#### 19.6 ECA Fee Management

**Key rule:** ECA fees are **completely separate** from tuition fees. Separate fee records, separate receipts, separate collection tracking. Optional: owner can enable "combined receipt mode" to issue a single receipt for tuition + ECA fees together.

**Monthly ECA fee collection flow:**
1. For each active ECA batch → list of enrolled students → current month payment status
2. Mark paid: record mode (UPI/Cash/Cheque) + reference number
3. Auto-generate ECA receipt PDF: school name · student name · activity name · batch name · month · amount · payment mode · reference · trainer name
4. WhatsApp receipt to parent immediately on generation

**ECA fee record:**
```
eca_fee_id          ECF-NNN
enrol_id            FK → eca_enrolments
month               String (e.g. "April 2026")
amount              Decimal (from batch fee_per_month)
mode                UPI | Cash | Cheque
reference           String
paid_at             Timestamp
receipt_number      String (auto-generated)
```

**ECA fee reminder (AppScript, 1st of each month):**  
WhatsApp to parents with unpaid ECA fees:  
`"Hi [parent_name], [preferred_name]'s [activity name] fee of Rs.[amount] for [month] is due. Pay via UPI: [SchoolUPI] or call [SchoolPhone]. Thank you! — [SchoolName]"`

**ECA defaulter handling:**  
If 2 or more consecutive months unpaid → system prompts owner to pause enrolment → on confirmation, `status` set to `Paused` → auto-WhatsApp to parent:  
`"[preferred_name]'s [activity name] enrolment has been temporarily paused due to outstanding fees of Rs.[amount]. Please contact us at [SchoolPhone] to resume. — [SchoolName]"`

#### 19.7 ECA Revenue Dashboard

| Dashboard element | Content |
|-------------------|---------|
| Monthly ECA revenue card (on home screen) | Total collected vs expected · per-activity breakdown · trainer cost · net ECA profit |
| ECA occupancy report | Capacity vs enrolment per batch · occupancy % · waitlist count · month-on-month trend |
| Low occupancy alert | Batches below 50% occupancy flagged for owner review |
| Combined school revenue | Tuition + ECA + Transport total · breakdown chart · year-to-date total · projected annual ECA revenue |

#### 19.8 Summer Camp as a Special ECA Programme

Summer Camp is managed as a time-bound ECA programme within M19. Marketing and promotion templates for Summer Camp are in M8 (SC-1 through SC-6).

**Summer Camp setup fields:**
```
Camp name           String (e.g. "Summer Camp 2026")
eca_id              FK → eca_activities (create an ECA activity named "Summer Camp")
start_date          Date
end_date            Date
daily_time_start    Time
daily_time_end      Time
age_group           String (e.g. "3–8 years")
max_students        Number
fee                 Decimal (Rs. for full camp duration — not monthly)
```

**Week-by-week theme planner (pre-loaded, editable):**

| Week | Theme | Sample Activities |
|------|-------|-------------------|
| Week 1 | Around the World | Passport craft, flags of countries, cultural dance, world cuisine tasting |
| Week 2 | Little Scientists | Volcano eruption, rainbow jar, magnet exploration, shadow science |
| Week 3 | Arts and Culture | Warli art painting, clay sculpture, puppet show, drama performance |
| Week 4 | Nature Warriors | Seed planting, composting bin, nature walk journal, recycled art |

**Daily activity plan structure per week:**  
Activity name · materials needed · responsible trainer/teacher · duration (minutes)

**Summer Camp Certificate Generator:**  
Auto-generate PDF participation certificate per child:
- Student's full name (auto-filled from student record)
- Camp name, school name, camp dates
- School logo from brand kit
- Principal name and signature placeholder
- Download PDF · WhatsApp to parent on the final day of camp

---

*— End of Part 4 of 5 —*  
*Continue with Part 5: Data Schema · Technical Architecture · GUI · Build Sequence · Data Protection · Licence Delivery · Success Metrics · Appendix*
## PART 5 of 5 — Data Architecture · Technical Architecture · GUI · Build Sequence · Data Protection · Licence Delivery · Success Metrics · Appendix

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

