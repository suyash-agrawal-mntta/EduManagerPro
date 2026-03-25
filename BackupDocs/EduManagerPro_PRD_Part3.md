## PART 3 of 5 — Module Specifications: M7–M13
### PTM · Social Media Engine · Staff · Curriculum · Calendar · Transport · Safety

> **Joining instruction:** This is Part 3. Place after Part 2, before Part 4. Remove this line from the final combined document.

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
