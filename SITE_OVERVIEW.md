# Workcraft Consult Site Overview

## What this website is for

Workcraft Consult is a professional services and learning website for people and organisations seeking practical help with:

- Professional training and development
- Business and management consultancy
- Digital learning and professional tools
- Project management education and supervised project practice

The main public call to action is the **Project Management Bootcamp** pilot. Its purpose is to combine PMP-aligned exam preparation with practical project work, accessible tools and responsible AI-assisted workflows.

The website is not presented as a PMI-authorised training provider. Public and FAQ content clearly states that Workcraft Consult is independent and that the programme does not satisfy the PMP 35-hour education requirement.

## Primary audiences

- Working professionals seeking practical project management skills
- Aspiring project practitioners
- Organisations seeking training or management consultancy
- Learners interested in future bootcamp cohorts
- Administrators who need to review interest registrations and contact messages

## How to navigate the site

### Public pages

- **Home:** Overview of services, the bootcamp and Workcraft's approach.
- **Services:** Training, consultancy and digital learning services.
- **Training:** Details of the Project Management Bootcamp, format, schedule and expected outputs.
- **About:** Mission, values and reason for the organisation's practice-first approach.
- **FAQ:** Programme, PMI, eligibility and application questions.
- **Contact:** General enquiries sent to the Workcraft team.
- **Register interest:** Free registration for people who want updates when bootcamp applications open.
- **Learner portal:** Sign-in area for learners. It opens for use when a cohort is active.
- **Dashboard:** Authenticated learner area.
- **Admin:** Authenticated staff area for reviewing and managing form submissions.

The header provides desktop and mobile navigation. Anonymous visitors see the Learner Portal link and Register Interest action. Signed-in users see Dashboard or Admin, depending on their role.

## Current functionality

- Responsive public website with light and dark themes
- React routes for all main public and account areas
- Express API for health checks, forms and authentication
- Interest registration saved in PostgreSQL
- Contact message submission saved in PostgreSQL
- Secure HTTP-only authentication cookie
- Admin and learner role separation
- Admin views for interest registrations and contact messages
- CSV export for interest registrations
- Database-backed form submission and rate limiting
- Vercel routing for the public client and API

## What is still to be done

### Paramount before launch

1. **Confirm real business contact details**
   - Replace the placeholder phone number and verify `hello@workcraftconsult.com`.
   - Ensure email and phone details are monitored and answered.

2. **Configure the production domain**
   - Add the domain to Vercel.
   - Add the exact DNS records shown by Vercel.
   - Set one canonical hostname and redirect alternatives to it.
   - Set `CLIENT_ORIGIN` to the public HTTPS origin.

3. **Configure production secrets**
   - Create a unique production `JWT_SECRET`.
   - Configure the production Neon `DATABASE_URL`.
   - Add and protect the initial admin credentials.
   - Redeploy after environment changes.

4. **Run production database setup**
   - Apply the Drizzle migrations.
   - Seed the initial admin account.
   - Verify database health with `/api/health/db`.

5. **Add email delivery**
   - Sending forms currently saves submissions to the database.
   - It does not yet email applicants or staff.
   - Add notifications and confirmation emails before relying on applications as a support workflow.

6. **Complete production and security verification**
   - Test registration, login, logout, contact forms and admin access.
   - Verify role restrictions and cookie behaviour.
   - Check rate limits and validation under production settings.
   - Remove or rotate any credentials used during testing.

### High priority

- Replace the bootcamp "coming soon" state when applications open.
- Publish real dates, fees, application instructions and cohort capacity.
- Implement application and enrolment workflows.
- Define learner coursework, sessions and resources.
- Create the first cohort portal experience.
- Add notification preferences and consent management.
- Add privacy, terms and cookie policies where required.
- Add business analytics and conversion tracking with explicit consent.
- Add legal review for data collection and programme claims.

### Later enhancements

- Programme, cohort and enrolment management
- Payments or invoices
- Scheduled email campaigns
- Course modules and downloadable resources
- Assignment submission and instructor feedback
- Attendance and progress tracking
- Certificates and portfolio records
- More detailed admin search, filtering and export
- Automated backups and operational monitoring
- Search engine metadata and social sharing previews
- Privacy controls and account deletion
- Automated tests for API and key user journeys

## Operational areas

### Interest registrations

Visitors can register without creating an account. Submissions include learner details and consent. Administrators can review submissions in `/admin` and export interest registrations as CSV.

### Contact messages

Public visitors can submit general enquiries. Submissions are stored in the database and visible to administrators in `/admin`.

### Learner accounts

Learner accounts are currently authenticated server-side. The learner dashboard should later contain cohort-specific sessions, resources and assignments.

### Admin accounts

Admin accounts can access protected interest and contact management APIs. The initial account is created through the database seed command and should be kept out of public documentation and source control.

## Critical content safeguards

Keep these statements accurate across the site:

- The programme is a Workcraft Consult programme, not a PMI-authorised course.
- It does not count toward the PMP 35-hour education requirement.
- PMP eligibility and exam certification are determined by PMI.
- Exam passes, employment and work experience are not guaranteed.
- Fees and application dates should not be presented as confirmed until published.

## Repository documentation

- [README.md](README.md) contains setup, deployment and database instructions.
- [SITE_OVERVIEW.md](SITE_OVERVIEW.md) describes the product, navigation and launch priorities.
