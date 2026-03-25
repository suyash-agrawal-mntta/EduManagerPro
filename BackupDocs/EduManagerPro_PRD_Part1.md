# EduManager Pro — Product Requirements Document
## Complete Build Specification for Claude Code
### PART 1 of 5 — Cover · Executive Summary · School Types · Pricing

> **Joining instruction:** Concatenate Part 1 → Part 2 → Part 3 → Part 4 → Part 5 in order.  
> Remove this joining-instruction line from the final combined document.

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
