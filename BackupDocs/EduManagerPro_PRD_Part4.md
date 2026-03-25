## PART 4 of 5 — Module Specifications: M14–M19
### Reports · Parent Handbook · CPD · Integrations · Classroom Management · ECA Revenue Engine

> **Joining instruction:** This is Part 4. Place after Part 3, before Part 5. Remove this line from the final combined document.

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
