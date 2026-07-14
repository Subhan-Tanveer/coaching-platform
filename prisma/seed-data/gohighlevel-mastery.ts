import type { CourseContentSeed } from "./types";

const content: CourseContentSeed = {
  courseSlug: "gohighlevel-mastery",
  courseTitle: "GoHighLevel Mastery",
  courseDescription:
    "A complete, section-by-section walkthrough of GoHighLevel, the all-in-one CRM and marketing-automation platform used by agencies and businesses worldwide, covering every core area from Contacts and Conversations through Workflows, Payments, Sites, Memberships, and agency-level white-labeling.",
  modules: [
    {
      title: "What Is GoHighLevel & Who It's For",
      lessons: [
        {
          slug: "what-is-gohighlevel",
          title: "What Is GoHighLevel?",
          estimatedMinutes: 8,
          content: `# What Is GoHighLevel?

GoHighLevel (almost always shortened to "GHL") is an all-in-one sales and marketing platform built specifically for agencies and the small businesses they serve. Instead of stitching together a CRM, an email tool, an SMS tool, a landing page builder, a calendar app, and a course platform from five different vendors, GoHighLevel puts all of it inside one login, one database, and one contact record.

That "all-in-one" positioning is the whole point of the product. A typical marketing agency before GoHighLevel might pay for Mailchimp (email), Calendly (booking), ClickFunnels (funnels), ActiveCampaign (automation), Podium (reviews), and a separate CRM — and then spend hours a week trying to make them talk to each other. GoHighLevel replaces that stack with a single system where a contact's email history, text messages, calendar bookings, invoices, and pipeline stage all live on the same record.

## The core idea: one contact record, every channel

Everything in GoHighLevel revolves around the **contact**. When a lead fills out a form on your website, books a call, replies to a text, or pays an invoice, all of that activity attaches to one unified contact timeline. That's what lets a single workflow automation react to an email open, send a text, move a deal to a new pipeline stage, and notify a salesperson — all from one trigger.

## What's actually inside the platform

At a high level, GoHighLevel bundles together:

- A CRM (Contacts, Opportunities/Pipelines)
- A unified inbox for SMS, email, and social messaging (Conversations)
- Appointment scheduling (Calendars)
- Email and SMS marketing campaigns
- A drag-and-drop website, funnel, and blog builder (Sites)
- Forms and Surveys for lead capture
- Payments, invoicing, and product/order management
- Workflow automation (the engine that connects everything)
- A course/membership platform for selling digital products
- Reputation management (review requests and widgets)
- Reporting and attribution dashboards
- Agency-level tools for managing many client accounts at once (white-labeling, snapshots, sub-account management)

You'll spend the rest of this course going section by section through each of these.

## Common mistake

New users often try to use GoHighLevel like a simple contact list — importing contacts and sending one-off texts — and never touch Workflows. That's like buying a car and only using it in park. The real value of GoHighLevel shows up once automation is doing the follow-up for you; treat the manual features as the foundation and the automation layer as the payoff.

## Try it yourself

If you have access to a GoHighLevel account (agency trial or a sub-account), log in and simply click through the left-hand navigation once, section by section, without doing anything yet. Just notice which sections sound familiar from other tools you've used (email marketing, CRM, calendar) and which are unique to GoHighLevel (Workflows, Snapshots, Memberships). You'll revisit every one of them in this course.`,
        },
        {
          slug: "who-uses-gohighlevel",
          title: "Who Uses GoHighLevel, and Why",
          estimatedMinutes: 7,
          content: `# Who Uses GoHighLevel, and Why

GoHighLevel was built for one primary customer: the **marketing agency**. Understanding that origin explains almost every design decision in the product, including some things that feel unusual if you've only used single-purpose tools like Mailchimp or HubSpot.

## The three main types of users

**1. Marketing agencies.** An agency signs up for one "Agency" account and then creates a separate **sub-account** for each client they manage (you'll cover this structure in detail in the next module). The agency builds out funnels, automations, and reporting once, packages it as a reusable **Snapshot**, and deploys that same system into every new client's sub-account in minutes instead of rebuilding it from scratch.

**2. SaaS resellers.** Because GoHighLevel supports full white-labeling (custom domain, custom logo, hidden GoHighLevel branding), many agencies don't resell "GoHighLevel" at all — they resell their own branded software product, priced monthly, with GoHighLevel running underneath it. This business model is usually called "running GHL in SaaS Mode."

**3. Individual business owners.** Local businesses, coaches, consultants, and course creators use GoHighLevel directly (without an agency in between) as their CRM, calendar, and marketing system, particularly if they want one bill and one login instead of six.

## Why agencies specifically gravitate toward it

Agencies have a repeating problem: every new client needs roughly the same stack — a website, a lead-capture form, an automated follow-up sequence, a booking calendar, and a pipeline to track deals. Rebuilding that from scratch in five different tools for every client is slow and expensive. GoHighLevel's sub-account model plus Snapshots turns "set up a new client" into "clone a template and customize the details," which is the main reason the platform has become the default choice for marketing agencies over the last several years.

## Common mistake

Solo business owners sometimes sign up expecting something as simple as a basic CRM and are surprised by how much is packed into the interface. If that's you, don't try to learn every section on day one — set up Contacts, Conversations, and Calendars first (Tier 1 of this course), and layer in Payments, Marketing, and Automation once the basics feel comfortable.

## Pro tip

If you're evaluating GoHighLevel for an agency, think in terms of "how many tools can I retire" rather than "what does this one feature do." The return on investment usually comes from consolidation and reduced client churn (because switching a client off your all-in-one system is much more disruptive than canceling one add-on tool), not from any single standout feature.`,
        },
        {
          slug: "plans-and-editions-overview",
          title: "Plans, Editions & SaaS Mode",
          estimatedMinutes: 6,
          content: `# Plans, Editions & SaaS Mode

Before you start building inside GoHighLevel, it helps to understand the shape of its pricing, because that shape directly explains what an "agency" account can do that a single sub-account cannot.

## The typical plan tiers

GoHighLevel is sold in agency-level plans (the pricing details change over time, so always confirm current numbers on gohighlevel.com, but the structure has been stable):

- **Starter-level agency plan** — a smaller number of sub-accounts, core CRM/marketing features, good for a single business or a very small agency.
- **Unlimited-level agency plan** — unlimited sub-accounts, full white-labeling of the desktop app, this is the plan most growing agencies land on.
- **Pro / SaaS-level agency plan** — everything in Unlimited, plus the ability to natively rebill clients, white-label the mobile app, and run "SaaS Mode," where GoHighLevel automatically bills your clients on your behalf under your own branding and pricing.

## What "SaaS Mode" actually means

SaaS Mode is a specific feature, not just a marketing phrase. When it's turned on for a sub-account, GoHighLevel will automatically charge that client a recurring fee you configure, track usage-based costs (like SMS/email/phone number usage), and mark the sub-account as suspended or reactivated based on payment status — all without the agency manually invoicing anyone. This is how many agencies turn GoHighLevel into their own recurring-revenue software product.

## Add-on costs to know about

Two categories of usage are billed separately from the base subscription in most accounts:

- **Communication costs** — SMS segments, email sends, and phone number rental/minutes are typically billed based on usage (often through a wallet/rebilling system), separate from the flat monthly agency fee.
- **Premium actions/triggers** — certain advanced workflow features (like some AI-powered actions) may carry their own per-use cost.

## Common mistake

New agency owners sometimes assume the flat monthly plan fee covers unlimited texting and calling for every client. It generally does not — communication usage is metered. Budget for this, and pass appropriate margins on to clients if you're reselling, or you can end up subsidizing client texting costs out of your own pocket.

## Try it yourself

If you have access to an agency account, navigate to the agency-level Settings and look for "Billing" or "Company Billing." Note what's listed as your base subscription versus what's tracked as usage-based add-ons — this distinction matters a lot once you start managing multiple client sub-accounts.`,
        },
      ],
    },
    {
      title: "Agency vs. Sub-Account Structure & Setup",
      lessons: [
        {
          slug: "agency-vs-sub-account",
          title: "Agency Account vs. Sub-Account Explained",
          estimatedMinutes: 8,
          content: `# Agency Account vs. Sub-Account Explained

Every GoHighLevel login sits inside a two-level structure: the Agency account at the top, and one or more Sub-Accounts (also called "locations") underneath it. Understanding this split is the single most important structural concept in the whole platform, since almost every setting you'll encounter lives at one level or the other.

## The Agency level

The Agency account is the parent workspace. It's where you:

- Create, view, and manage every client Sub-Account
- Configure agency-wide white-labeling (custom domain, logo, app name)
- Build and store Snapshots (reusable templates you deploy into sub-accounts)
- Set up your own SaaS pricing/rebilling if you're reselling the platform
- Manage team members who need access across multiple clients
- View agency-level reporting rolled up across all sub-accounts

Think of the Agency account as mission control. You generally don't run a client's day-to-day marketing from here; you manage the fleet of client accounts from here.

## The Sub-Account level

A Sub-Account is a fully self-contained workspace for one specific business, whether that's your own business or a client's. Each Sub-Account has its own contacts and pipelines, calendars and booking pages, Conversations inbox and connected channels, funnels/websites/forms, workflows and automations, payment integrations and products, and reporting scoped only to that business.

Data does not flow between sub-accounts automatically. A contact created in Client A's sub-account is invisible to Client B's sub-account; they are logically separate CRMs even though they run on the same underlying platform. This isolation is deliberate. It's what makes it safe for one agency to manage dozens or hundreds of unrelated client businesses from a single Agency login.

## How agencies typically work day to day

1. Log in at the Agency level.
2. Click into the specific client's Sub-Account you need to work in (this switches your entire view, including navigation and contacts, to that client's isolated data).
3. Do the actual marketing and CRM work inside that Sub-Account.
4. Switch back to the Agency level, or directly into a different Sub-Account, when you need to work on another client.

## Common mistake

A very common beginner error is not realizing which sub-account you're currently inside of, and adding contacts or building automations in the wrong client's workspace. Always check the account switcher, usually in the top-left of the interface, before doing meaningful setup work, especially if you manage more than one sub-account.

## Pro tip

If you are a solo business owner rather than an agency, you'll still technically have an Agency shell with exactly one Sub-Account underneath it. Don't let the terminology confuse you; the concepts of Agency as container and Sub-Account as the actual working business still apply even with a single client.`,
        },
        {
          slug: "creating-a-sub-account",
          title: "Creating and Configuring a New Sub-Account",
          estimatedMinutes: 9,
          content: `# Creating and Configuring a New Sub-Account

Onboarding a new client in GoHighLevel means creating a new Sub-Account and running it through initial setup. Here is the real, step-by-step process.

## Step-by-step: creating a sub-account

1. From the Agency view, go to the Sub-Accounts (or "Locations") list.
2. Click Create Sub-Account (sometimes labeled "Add Location").
3. Enter the client's business details: business name, address, phone number, timezone, and industry/business type. Timezone matters immediately, since it affects how Calendars and Workflows schedule things.
4. Choose whether to start from a blank sub-account or import a Snapshot (a pre-built package of pipelines, workflows, funnels, and settings). Most agencies always deploy from a Snapshot rather than starting blank, since it saves hours of repetitive setup.
5. Save. GoHighLevel provisions the new, fully isolated workspace.

## Running the Launchpad

New sub-accounts typically surface a Launchpad, a checklist-style onboarding screen inside the sub-account that walks through the must-do setup items before the account is "live": connecting a business email sender, verifying a phone number for texting and calling, connecting payment processors if needed, and setting business hours. Don't skip this. A sub-account that hasn't verified its sending domain or phone number will have emails land in spam and texts fail to send.

## Key settings to configure immediately

- Business Profile (Settings, Business Profile): legal business name, address, and support contact info, which feeds into things like email footers and compliance fields.
- Phone Numbers: claim or port a number so Conversations and Calendars can send and receive SMS and calls.
- Email sending domain: connect and verify a domain via DNS records so marketing emails don't get flagged as spam and don't rely on a shared, generic sending address.
- Users: invite the client's team members, or your own account managers, and assign roles.

## Common mistake

Skipping domain and phone verification "for now" and moving straight to building funnels and workflows. Automations that are supposed to send a follow-up text or email will silently fail, or get flagged as spam, if the underlying sending identity was never verified. Always finish the Launchpad basics before building anything client-facing.

## Try it yourself

If you have an agency trial, create a test sub-account, deploy any available starter Snapshot into it, and walk through its Launchpad checklist end to end. Note which steps require information you don't yet have, like a client's live phone number; those are exactly the questions to ask a real client during onboarding.`,
        },
        {
          slug: "user-roles-and-permissions",
          title: "Users, Roles & Permissions",
          estimatedMinutes: 7,
          content: `# Users, Roles & Permissions

GoHighLevel controls who can see and do what through a combination of roles and permission scopes, applied both at the Agency level and within individual Sub-Accounts.

## The two broad role types

Agency-level users, often called Agency Admins, can be given access across some or all sub-accounts, plus agency-only tools like Snapshots and white-label settings. Sub-Account-level users are scoped to a single client's workspace only, a typical setup for a client's own staff or an account manager who only handles that one client.

Within a sub-account, users are commonly assigned as an Admin (full access to that sub-account) or a User (restricted access), and permissions can be fine-tuned further, for example granting access to Conversations and Calendars but hiding Settings and Payments from a front-line staff member.

## What permission scopes control

Permissions generally govern three things:

1. What features are visible at all (for example, can this person see the Payments tab)
2. What actions they can perform within a visible feature (view-only vs. edit vs. delete)
3. Which accounts their access applies to (a single sub-account, a group of sub-accounts, or all of them)

## Step-by-step: inviting a new user

1. Go to Settings, My Staff (or "Team") in the relevant Agency or Sub-Account view.
2. Click Add Employee/User.
3. Enter their name, email, and phone, used for two-factor authentication and notifications.
4. Choose the role type (Admin/User) and, if available, fine-tune specific permissions, such as restricting access to Payments or restricting deletion of contacts.
5. Select which sub-accounts this user should have access to, if inviting at the agency level.
6. Send the invite. The user receives an email to set their password and log in.

## Common mistake

Giving every team member full Admin access "to keep things simple" is a real security and operational risk; a staff member could delete pipelines, change payment integrations, or export the entire contact list. Scope access to what a role actually needs, especially for anyone who isn't a core account owner.

## Pro tip

If you manage client staff who should only ever answer Conversations and book appointments, like a front-desk receptionist, restrict their permissions to just Conversations and Calendars. That single change prevents accidental changes to workflows, payments, or pipeline structure that non-technical client staff often make by mistake.`,
        },
      ],
    },
    {
      title: "Navigating the Dashboard & Launchpad",
      lessons: [
        {
          slug: "sub-account-dashboard",
          title: "The Sub-Account Dashboard: Widgets & Overview",
          estimatedMinutes: 7,
          content: `# The Sub-Account Dashboard: Widgets and Overview

When you open a Sub-Account, the first screen you land on is the Dashboard. It's a widget-based overview built to answer one question at a glance: "how is this business doing right now?"

## What's on it

The default Dashboard typically includes widgets for:

- Funnel/website performance (visits, form submissions, opt-ins)
- Pipeline value and opportunity counts by stage
- Appointment counts (booked, showed, no-showed)
- Conversation activity (new conversations, response times)
- Ad account performance if Facebook/Google Ads are connected
- Recent contact activity

## Customizing the dashboard

Most widgets can be added, removed, resized, and reordered. Click the edit or customize control (often a pencil or gear icon in the corner of the dashboard) to enter edit mode, then add widgets from the widget library, drag them into the layout you want, and save. Agencies managing many clients often standardize a dashboard layout inside their Snapshot so every new client sub-account opens with the same reporting view.

## Why this screen matters more than it looks

For client-facing sub-accounts, the Dashboard often doubles as the "here's what we're doing for you" screen. Many agencies schedule a recurring client login or a screen-share specifically around this page, because it's the fastest way to show tangible marketing results without digging through individual reports.

## Common mistake

Leaving the Dashboard at its default widget set even when it doesn't match what the business actually cares about. A real estate agent's sub-account should probably foreground pipeline value and appointment shows; an e-commerce client should foreground order/revenue widgets. A generic dashboard makes the platform feel less valuable to the client, even if the underlying automation is working well.

## Try it yourself

Open a sub-account's Dashboard and try adding one widget you haven't seen before, then remove one that doesn't apply to that business. Get comfortable with the edit mode before you need to build a client-specific view under time pressure.`,
        },
        {
          slug: "the-launchpad",
          title: "The Launchpad: Getting a New Sub-Account Live",
          estimatedMinutes: 6,
          content: `# The Launchpad: Getting a New Sub-Account Live

The Launchpad is a guided setup checklist that appears inside a freshly created Sub-Account. Its job is to make sure the handful of foundational connections that everything else depends on actually get done, instead of being discovered missing weeks later when a workflow silently fails.

## What it typically walks you through

- Connecting or verifying a phone number for calling and texting
- Verifying an email sending domain
- Setting the business's operating hours and timezone
- Connecting a payment processor (if the business will take payments through GoHighLevel)
- Basic business profile details (address, support email, logo)

## Step-by-step: working through the Launchpad

1. Open the Sub-Account and locate Launchpad in the left navigation (new sub-accounts usually surface it automatically on first login).
2. Go through each checklist item in order. Items are typically marked complete with a checkmark once configured.
3. For anything you can't finish immediately (for example, a client hasn't provided their Stripe login yet), leave it open and revisit before you turn on client-facing automations that depend on it.
4. Once the essential items are done, the sub-account is considered "live" and ready for funnels, workflows, and campaigns to go out safely.

## Common mistake

Treating the Launchpad as optional busywork and jumping straight into building funnels and automations. If the sending domain isn't verified, marketing emails will often land in spam or fail outright; if the phone number isn't verified, SMS workflows silently do nothing. The Launchpad exists specifically to prevent these invisible failures.

## Pro tip

If you manage onboarding for many clients, keep a written checklist of exactly what information you need from a client before their first onboarding call (support email, business address, logo file, payment processor login or invite). Gathering it all up front means you can finish the Launchpad in one sitting instead of stalling out mid-setup.`,
        },
        {
          slug: "global-navigation-and-search",
          title: "Global Navigation, Search & the Account Switcher",
          estimatedMinutes: 5,
          content: `# Global Navigation, Search & the Account Switcher

Before diving into individual features, it's worth getting fluent in how you move around GoHighLevel itself, since the interface is dense and every section you'll study in this course lives behind this same navigation shell.

## The left-hand navigation

Inside a Sub-Account, the left sidebar is your main menu. Sections are grouped by function rather than listed flat: CRM-related tools (Contacts, Opportunities), communication tools (Conversations, Calendars), site-building tools (Sites, which covers Funnels, Websites, and the Blog), marketing tools (Marketing, Automation), commerce tools (Payments, Memberships), and reporting/configuration tools (Reporting, Settings). Some items expand into a submenu; hovering or clicking reveals the child pages inside that section.

## The account switcher

At the top of the screen (usually top-left, next to the business name or logo) is the account switcher, which lets an agency user jump between the Agency view and any Sub-Account they have access to, or move directly from one client's Sub-Account to another's without logging out. This is the single most important navigation control for anyone managing multiple clients, because it determines whose data you're currently looking at and editing.

## Global search

A search icon or bar (often near the top of the screen) lets you search across contacts, opportunities, and in some views conversations, by name, phone, email, or tag, without having to navigate into the Contacts section first.

## Common mistake

Confusing "which sub-account am I in" with "which sub-account do I want to be in." Because the interface for every sub-account looks structurally identical, it's easy to make an edit intending it for one client while actually inside a different client's workspace. Get in the habit of glancing at the account switcher and business name in the header before making structural changes like editing a workflow or deleting contacts.

## Try it yourself

Practice switching between two sub-accounts (or an Agency view and a single sub-account) several times in a row, and each time, look at the header to confirm you know exactly whose data is on screen. This becomes second nature quickly, but it's worth deliberately practicing early.`,
        },
      ],
    },
    {
      title: "Contacts: The CRM Core",
      lessons: [
        {
          slug: "the-contact-record",
          title: "The Contact Record",
          estimatedMinutes: 8,
          content: `# The Contact Record

Every person GoHighLevel knows about, whether a cold lead, a paying customer, or a former client, exists as a single Contact record. This record is the true center of gravity for the entire platform: conversations, appointments, opportunities, invoices, form submissions, and workflow history all attach to it.

## What's on a contact record

Opening a contact typically shows you:

- Basic info: name, email, phone, address, timezone, contact source
- Tags: freeform labels you or a workflow apply (for example "hot-lead," "webinar-attendee," "past-client")
- Custom fields: business-specific data points beyond the standard fields (for example "policy renewal date" for an insurance agency, or "preferred move-in date" for a property manager)
- A full activity timeline: every email, text, call, form submission, appointment, invoice, and workflow event, in chronological order
- Opportunities: which pipeline(s) this contact currently sits in, and at what stage
- Tasks and notes: manual to-dos and freeform notes staff can leave on the record

## Step-by-step: creating a contact manually

1. Go to Contacts in the left navigation.
2. Click Add Contact (or "New Contact").
3. Fill in at minimum a name and either an email or phone number, since most automations key off one of those to send messages.
4. Add tags and custom field values if you have them.
5. Save. The contact now appears in your Contacts list and can be added to a pipeline, calendar, or workflow.

More often, contacts are created automatically, through a form submission, a calendar booking, an inbound call or text, or an API/Zapier integration, rather than manual entry.

## Common mistake

Creating duplicate contacts by not checking whether someone already exists (for example, a lead re-submits a form with a slightly different email). GoHighLevel has duplicate-detection and merge tools; use Contacts, then look for a "Duplicate Contacts" or merge option regularly, especially for high-volume lead sources, to keep reporting and follow-up sequences accurate.

## Pro tip

Treat the contact timeline as your first troubleshooting stop. If a client asks "why didn't this lead get a follow-up text," open their contact record and read the timeline top to bottom; it will usually show you exactly which workflow ran, what it sent, and where (if anywhere) it stopped.`,
        },
        {
          slug: "tags-custom-fields-custom-values",
          title: "Tags, Custom Fields & Custom Values",
          estimatedMinutes: 8,
          content: `# Tags, Custom Fields & Custom Values

GoHighLevel gives you three related but distinct tools for storing and using information beyond a contact's name and phone number: Tags, Custom Fields, and Custom Values. Mixing these up is one of the most common points of confusion for new users.

## Tags

Tags are simple text labels applied to a contact, used mainly for segmentation and workflow logic. A contact can have many tags at once (for example "newsletter-subscriber," "customer," "vip"). Workflows commonly use "tag added" as a trigger and "add tag" or "remove tag" as an action, which makes tags the primary lightweight mechanism for moving contacts through different automation logic.

## Custom Fields

Custom Fields store structured data specific to a contact, such as a date, number, dropdown selection, or text value that doesn't fit the standard fields. Examples: "membership expiration date," "number of pets," "referral source." Unlike tags, a custom field holds one value (or a set of values, for multi-select fields) rather than functioning as an on/off label. Custom field values can be inserted into emails, texts, and documents using merge-tag style placeholders, for example:

\`\`\`
Hi {{contact.first_name}}, your membership renews on {{contact.custom_field.renewal_date}}.
\`\`\`

## Custom Values

Custom Values are account-wide reusable snippets, not tied to any individual contact, used for things that repeat across many templates: a business's phone number, address, a special offer's expiration date, or a shared disclaimer. Instead of retyping the business phone number in twenty different email templates, you set it once as a Custom Value and reference it everywhere with a placeholder, so updating it once updates every template that uses it.

## Step-by-step: creating a custom field

1. Go to Settings, Custom Fields.
2. Click Add Field, choose a data type (text, number, date, dropdown, checkbox, etc.), and give it a clear name.
3. Save, then it becomes available on every contact record and inside merge-tag pickers in emails, texts, and workflows.

## Common mistake

Using tags to store data that's really a custom field (for example, creating a different tag for every possible birthday month/day combination instead of one date-type custom field). This bloats your tag list and makes segmentation harder rather than easier. As a rule of thumb: if it's a yes/no label or a segment membership, use a tag; if it's a specific piece of data about the contact, use a custom field.`,
        },
        {
          slug: "smart-lists-filters-bulk-actions",
          title: "Smart Lists, Filters & Bulk Actions",
          estimatedMinutes: 7,
          content: `# Smart Lists, Filters & Bulk Actions

With potentially thousands of contacts in a sub-account, you need a way to slice the list down to exactly the group you care about, and then act on that group in one move. That's what Smart Lists, filters, and bulk actions are for.

## Filters

From the Contacts view, clicking Filters lets you narrow the list by tag, custom field value, pipeline stage, date added, source, city, and many other criteria, combinable with AND/OR logic (for example: has tag "past-client" AND custom field "last purchase" is more than 12 months ago).

## Smart Lists

A Smart List is a saved filter. Instead of rebuilding the same filter combination every time, you save it once (for example "Cold leads, no activity in 30 days") and it reappears as a one-click view any time you need it, updating dynamically as contacts move in and out of matching the criteria.

## Step-by-step: building and saving a Smart List

1. Go to Contacts and click Filters.
2. Add your filter conditions (tags, custom fields, date ranges, pipeline stage, etc.).
3. Apply the filter and confirm the resulting list looks right.
4. Click Save as Smart List (or similar) and give it a descriptive name.
5. The Smart List now appears as a tab or saved view you can return to any time.

## Bulk actions

Once you have a filtered list (or select contacts manually with checkboxes), bulk actions let you apply a change to every contact in the selection at once: add or remove a tag, add to a workflow, add to a campaign, export to CSV, or delete. This is how you launch a one-time campaign to a specific segment, or clean up a stale list, without touching contacts one at a time.

## Common mistake

Running a bulk action, especially "add to workflow" or "delete," on a filtered list without double-checking the filter first. It's easy to accidentally include far more contacts than intended (for example, forgetting a second filter condition), and bulk actions on a large contact list can send unwanted messages to people or delete records you needed. Always review the resulting contact count before confirming a bulk action.

## Try it yourself

Build a Smart List for "contacts added in the last 7 days with no tags," save it, and use it to spot leads that fell through the cracks after coming in through a form or ad, but never got tagged or moved into a workflow.`,
        },
      ],
    },
    {
      title: "Conversations: The Unified Inbox",
      lessons: [
        {
          slug: "unified-inbox-explained",
          title: "The Unified Inbox Explained",
          estimatedMinutes: 7,
          content: `# The Unified Inbox Explained

Conversations is GoHighLevel's messaging hub: every SMS, email, Facebook Messenger DM, Instagram DM, Google Business Profile chat message, WhatsApp message, and inbound/outbound phone call for a sub-account funnels into one inbox, organized as one thread per contact rather than one thread per channel.

## Why one thread per contact matters

In most single-purpose tools, a text conversation, an email thread, and a Facebook DM with the same person live in three completely separate places. In GoHighLevel, all of it appears on the same contact's conversation thread, in chronological order, regardless of which channel it came in on. A staff member can see that a lead texted a question yesterday and emailed a follow-up this morning without switching apps or tabs.

## The layout

The Conversations screen is typically split into three panes: a list of conversations on the left (filterable by unread, starred, assigned to me, or by channel), the active thread in the middle, and contact details (tags, custom fields, opportunity/pipeline status) on the right, so you can reply to a message and see full context on that person at the same time.

## Core actions inside a conversation

- Reply on whatever channel the message came in on (or switch channels, if you want to text someone who emailed you, for instance)
- Assign the conversation to a specific team member
- Mark as read/unread or star it for follow-up
- Add or remove tags directly from the thread
- Add an internal note visible only to your team, not the contact
- Trigger a workflow manually from the conversation

## Common mistake

Assuming a message channel is always available for a given contact. You can only reply via a channel that's actually connected for that contact, for example you can't send a Facebook Messenger reply to someone whose only path in was SMS. Check which channels actually show as available on a thread before assuming you can reach someone a particular way.

## Pro tip

Use the "assigned to" filter aggressively once more than one staff member handles conversations. Without clear assignment, it's common for two staff members to both think "someone else has this," and a lead goes unanswered. Many agencies build a workflow that auto-assigns new conversations round-robin to available staff for exactly this reason.`,
        },
        {
          slug: "connecting-channels",
          title: "Connecting Channels: SMS, Email, Social & GMB",
          estimatedMinutes: 8,
          content: `# Connecting Channels: SMS, Email, Social & GMB

Conversations can only show messages from channels you've actually connected. Setting these up correctly is a prerequisite for almost everything else in the platform, since Workflows, Campaigns, and Calendars all send through these same connections.

## SMS and calling (LC Phone)

GoHighLevel provides its own built-in telephony, often called LC Phone. Step-by-step:

1. Go to Settings, Phone Numbers.
2. Claim a new local or toll-free number, or port an existing business number.
3. Complete carrier registration requirements. In the US this generally requires A2P 10DLC brand and campaign registration for SMS, since unregistered numbers face heavy throughput limits and deliverability problems.
4. Once verified, the number is available for Conversations, Calendars (for confirmation texts), and Workflows to send from.

## Email

Email can be sent from a default shared sending address, but for real deliverability you should connect and verify your own domain: go to Settings, Email Services (or Domains), add your sending domain, and add the provided DNS records (SPF, DKIM, sometimes a CNAME) at your domain registrar. Verification can take anywhere from minutes to about 48 hours depending on DNS propagation.

## Facebook & Instagram Messenger

1. Go to Settings, Integrations (or directly from Conversations, look for "Connect Facebook/Instagram").
2. Log in with the Facebook account that manages the relevant business Page and Instagram professional account, and grant the requested permissions.
3. Select which Page (and linked Instagram account) to connect to this sub-account.
4. Messages sent to that Page's Messenger inbox or the Instagram account's DMs now appear inside Conversations.

## Google Business Profile chat

Similarly, connecting a Google Business Profile listing lets customers message the business directly from its Google Maps/Search listing, with those messages also landing in Conversations.

## Common mistake

Skipping A2P 10DLC registration for SMS and then wondering why text messages are delayed, filtered, or blocked entirely by carriers. This is a real compliance requirement in the US telecom system, not a GoHighLevel-specific hurdle, and it should be treated as part of onboarding, not an optional later step.

## Pro tip

Reconnect and re-authorize social channels proactively when you see a "disconnected" or "needs attention" flag. Facebook/Instagram access tokens expire periodically or get invalidated by password changes on the connected account, and a disconnected channel means those messages silently stop appearing until someone notices and reconnects it.`,
        },
        {
          slug: "manual-actions-assignment-snippets",
          title: "Manual Actions, Assignment & Snippets",
          estimatedMinutes: 6,
          content: `# Manual Actions, Assignment & Snippets

Beyond just reading and replying, Conversations includes several tools that make day-to-day message handling faster for a team, rather than relying purely on automation.

## Snippets (saved replies)

Snippets are reusable canned responses you can insert into a reply with a shortcut instead of retyping common answers (pricing questions, business hours, a booking link). To create one: go to Settings, Snippets (sometimes under Conversations settings), click Add Snippet, write the reusable text (merge tags like \`{{contact.first_name}}\` work here too), and save it with a short trigger keyword. When replying, typing that trigger (often prefixed with a slash, like \`/hours\`) brings up the snippet to insert instantly.

## Manual workflow and action triggers

From inside a conversation thread, staff can often manually add the contact to a workflow, add or remove a tag, or manually book/reschedule an appointment, without leaving the inbox. This matters for edge cases automation doesn't cover, for instance, a staff member decides mid-conversation that this lead deserves a "hot lead" nurture sequence even though no automated trigger fired for it.

## Assignment and internal notes

Conversations can be assigned to a specific team member (so it shows in their personal queue), and internal notes can be added to a thread that the contact never sees, useful for handoffs between staff ("spoke with him, he wants a callback after 3pm, don't text before then").

## Common mistake

Relying entirely on automation and never checking the unassigned/unclaimed conversation queue. Even well-automated accounts get inbound messages that don't match any trigger cleanly (a one-word reply, a channel with no automation built for it), and these can sit unanswered indefinitely if no human is regularly sweeping the inbox.

## Try it yourself

Create one snippet for your most commonly repeated answer (business hours, a booking link, or a pricing question) and practice inserting it into a test conversation. Then check whether your account has an "unassigned" filter and get in the habit of checking it at the start of each day.`,
        },
      ],
    },
    {
      title: "Calendars: Booking & Appointments",
      lessons: [
        {
          slug: "calendar-types-overview",
          title: "Calendar Types: Round Robin, Group, Personal & More",
          estimatedMinutes: 8,
          content: `# Calendar Types: Round Robin, Group, Personal & More

GoHighLevel's Calendars section replaces standalone booking tools like Calendly by embedding scheduling directly into the CRM, so a booked appointment automatically links to the contact record, can trigger workflows, and shows up in pipeline and reporting data. There are several calendar types, each suited to a different booking scenario.

## The main calendar types

- **Round Robin**: Distributes bookings evenly across a group of team members (for example, a sales team where any available rep can take the next demo call). GoHighLevel rotates who gets the next booking based on availability and, depending on settings, on balancing total bookings.
- **Collective/Group booking**: Books a slot only when multiple specific people are simultaneously available (for example, a demo that always needs both a salesperson and a technical specialist present).
- **Personal (one-on-one) booking**: A single staff member's own booking page, tied to their individual availability, common for coaches or account managers who want their own link.
- **Service/Class booking**: Designed for a scheduled service or class with a fixed number of spots, where multiple different contacts can book into the same time slot (for example, a group fitness class).
- **Booking widget/embed**: Any of the above calendar types can be embedded on a website or funnel page as a widget, rather than only shared as a standalone link.

## Choosing the right type

As a rule of thumb: use Personal calendars for a single dedicated point of contact, Round Robin when any of several interchangeable staff can take the meeting, Collective when a meeting genuinely needs more than one specific person, and Service/Class calendars for anything with multiple attendees per slot (classes, group sessions, workshops).

## Common mistake

Setting up a single Personal calendar for an entire sales team and hoping everyone remembers to check it, instead of using Round Robin. This tends to create double-bookings, missed leads, and uneven workload, exactly the coordination problem Round Robin calendars are designed to remove.

## Try it yourself

If you have calendar access, create a test Round Robin calendar with two team members, set different availability windows for each, and book two test appointments back to back to see how the system assigns and rotates them.`,
        },
        {
          slug: "building-a-calendar",
          title: "Building & Configuring a Calendar",
          estimatedMinutes: 9,
          content: `# Building and Configuring a Calendar

Setting up a calendar involves more than picking a type; the configuration choices you make directly determine how many no-shows and scheduling conflicts you'll deal with later.

## Step-by-step: creating a new calendar

1. Go to Calendars in the left navigation and click Add Calendar (or "+ New Calendar").
2. Choose the calendar type (Round Robin, Group, Personal, Service/Class, etc.).
3. Set availability: which days/hours this calendar can be booked, time slot duration (for example 30-minute increments), and buffer time between appointments.
4. Set booking limits: minimum scheduling notice (so people can't book 5 minutes from now), a maximum days-in-advance window, and a daily booking cap if needed.
5. Connect the calendar to a specific pipeline and stage if you want a booked appointment to automatically create or move an opportunity.
6. Configure confirmation and reminder messages (email and/or SMS) sent automatically when someone books, and reminders sent before the appointment.
7. Style and publish the booking widget, then copy its link or embed code for use on a website, funnel, or in a text/email.

## Reducing no-shows

The two biggest levers for reducing no-shows are automated reminders (typically a 24-hour and a 1-hour reminder, sent by SMS since text has much higher open rates than email) and a confirmation step, sometimes requiring the contact to explicitly confirm rather than just receiving a reminder passively. Both are usually configured directly in the calendar's notification settings, and can also be layered with a Workflow for more control (for example, a "no-show" tag applied automatically if a status isn't updated after the appointment time passes).

## Common mistake

Setting zero minimum scheduling notice and no buffer time, which allows someone to book an appointment that starts in two minutes, or back-to-back appointments with no travel/prep time for the staff member. Both are easy to fix in the calendar's booking rules but are frequently left at defaults.

## Pro tip

Link every client-facing calendar to a pipeline stage (for example, booking a "Strategy Call" calendar automatically creates an opportunity in the "Call Booked" pipeline stage). This turns your calendar into a lead-tracking tool automatically, rather than requiring manual pipeline updates every time someone books.`,
        },
        {
          slug: "booking-widget-embeds-and-automation",
          title: "Booking Widget Embeds & Automation Hooks",
          estimatedMinutes: 7,
          content: `# Booking Widget Embeds and Automation Hooks

Once a calendar is configured, the next step is putting it in front of contacts, and wiring up what should happen automatically before and after someone books.

## Ways to share a calendar

- **Direct link**: a standalone booking page URL you can text, email, or post anywhere.
- **Embedded widget**: an iframe-style embed you can drop into a Sites page, a funnel step, or an external website, so visitors book without leaving the page.
- **Inside a form or survey**: some setups route a qualified lead directly into a booking step immediately after they complete a form, chaining lead capture and scheduling into one flow.

## Automation hooks around booking

Calendars generate their own set of workflow triggers that you'll use heavily once you get to Automation, including "Appointment Booked," "Appointment Cancelled," "Appointment Rescheduled," and "Appointment Status changed to Show/No-show/Confirmed." These let you build sequences like: send a pre-call reminder text 1 hour before, tag a contact "no-show" and trigger a rebooking sequence automatically if they don't show, or notify a sales rep by internal SMS the moment a new call is booked on their calendar.

## Step-by-step: embedding a calendar on a page

1. Open the calendar's settings and look for Embed or Widget code.
2. Copy the provided embed snippet (or, if building inside GoHighLevel's own Sites builder, simply drag the Calendar/Booking element onto the page and select which calendar it should display).
3. Paste the embed code into the target page's HTML (if external) or configure the element directly (if inside Sites).
4. Test the live page by actually booking a test slot end-to-end, confirming the confirmation email/SMS arrives and the pipeline updates as expected.

## Common mistake

Publishing a booking widget without ever testing the full booking flow as an actual visitor would experience it. Issues like a wrong timezone display, a broken confirmation email, or a calendar that isn't actually connected to a verified phone number often only surface once you book a real test appointment.

## Try it yourself

Take any calendar you have access to, embed it on a test funnel page (or just use its direct link), and complete a real test booking. Then check the associated contact record to confirm the appointment, any pipeline movement, and the confirmation message all appear correctly.`,
        },
      ],
      quiz: {
        title: "Tier 1 Checkpoint: GoHighLevel Basics",
        questions: [
          {
            text: "In GoHighLevel's account structure, what is the main difference between the Agency account and a Sub-Account?",
            optionA: "There is no real difference; they are two names for the same workspace",
            optionB: "The Agency account is the parent workspace used to manage multiple isolated client workspaces, called Sub-Accounts",
            optionC: "Sub-Accounts are used only for billing, while the Agency account holds all contacts",
            optionD: "The Agency account can only be used by GoHighLevel employees, not customers",
            correctOption: "B",
          },
          {
            text: "What is a Snapshot primarily used for?",
            optionA: "Taking a screenshot of a workflow for documentation",
            optionB: "Packaging a reusable copy of pipelines, workflows, funnels, and other setup to deploy into new or existing sub-accounts",
            optionC: "Backing up a single contact record",
            optionD: "Generating a PDF report of agency billing",
            correctOption: "B",
          },
          {
            text: "What does 'SaaS Mode' allow an agency to do?",
            optionA: "Automatically bill clients on a recurring basis under the agency's own branding and pricing",
            optionB: "Convert contacts into calendar events automatically",
            optionC: "Disable all agency-level reporting",
            optionD: "Merge two sub-accounts into one",
            correctOption: "A",
          },
          {
            text: "On the Sub-Account Dashboard, what are the individual configurable blocks that display metrics called?",
            optionA: "Panels",
            optionB: "Modules",
            optionC: "Widgets",
            optionD: "Snapshots",
            correctOption: "C",
          },
          {
            text: "What is the primary purpose of the Launchpad inside a new Sub-Account?",
            optionA: "To display advertising for GoHighLevel's paid add-ons",
            optionB: "To guide the user through essential setup steps like phone and email verification before the account goes live",
            optionC: "To replace the need for a Dashboard",
            optionD: "To generate custom fields automatically from imported contacts",
            correctOption: "B",
          },
          {
            text: "What is the key difference between a Tag and a Custom Field on a contact record?",
            optionA: "Tags can only be added by workflows, while Custom Fields can only be added manually",
            optionB: "A Tag is a freeform label used mainly for segmentation, while a Custom Field stores a specific structured piece of data about the contact",
            optionC: "There is no difference; they are interchangeable",
            optionD: "Custom Fields only apply to companies, not individual contacts",
            correctOption: "B",
          },
          {
            text: "What is a Smart List in the Contacts section?",
            optionA: "A list of the most recently contacted leads only",
            optionB: "A saved, dynamically updating filter of contacts matching specific criteria",
            optionC: "A list that can only contain up to 100 contacts",
            optionD: "An AI-generated list of contacts likely to unsubscribe",
            correctOption: "B",
          },
          {
            text: "What makes the Conversations inbox 'unified'?",
            optionA: "It only supports one communication channel to keep things simple",
            optionB: "It merges messages from channels like SMS, email, and social DMs into one thread per contact",
            optionC: "It automatically translates messages into the recipient's language",
            optionD: "It combines the inboxes of every sub-account into a single shared inbox",
            correctOption: "B",
          },
          {
            text: "In the US, what compliance requirement commonly affects SMS deliverability and throughput on a GoHighLevel phone number?",
            optionA: "GDPR data residency rules",
            optionB: "A2P 10DLC brand and campaign registration",
            optionC: "PCI-DSS certification",
            optionD: "FCC broadcast licensing",
            correctOption: "B",
          },
          {
            text: "What is the main advantage of a Round Robin calendar over a single Personal calendar for a sales team?",
            optionA: "It automatically distributes bookings across multiple available team members instead of relying on one person's schedule",
            optionB: "It removes the need for confirmation emails",
            optionC: "It allows unlimited people to book the exact same time slot",
            optionD: "It disables reminder notifications to reduce message costs",
            correctOption: "A",
          },
        ],
      },
    },
    {
      title: "Opportunities & Pipelines",
      lessons: [
        {
          slug: "understanding-pipelines-and-opportunities",
          title: "Understanding Pipelines & Opportunity Records",
          estimatedMinutes: 8,
          content: `# Understanding Pipelines & Opportunity Records

Once a contact exists, GoHighLevel needs a way to track a potential deal with them, separate from the contact record itself. That's what an Opportunity is: a trackable deal or sales process, sitting inside a Pipeline, that moves through a series of Stages until it's won or lost.

## Contact vs. Opportunity

This distinction trips up a lot of new users. A Contact is the person or company. An Opportunity is a specific deal or sale associated with that contact, and importantly, one contact can have multiple opportunities at once (for example, a returning customer being pitched a second product) or across different pipelines. The contact record shows basic identity and history; the opportunity record shows deal-specific data: deal value, stage, pipeline, and expected close date.

## What a Pipeline looks like

A Pipeline is a horizontal, Kanban-style board of Stages (for example: New Lead, Contacted, Appointment Booked, Proposal Sent, Won, Lost). Each Opportunity appears as a card that gets dragged from stage to stage as the deal progresses, either manually by a salesperson or automatically via a Workflow.

## Step-by-step: creating a pipeline

1. Go to Opportunities (sometimes shown as "Pipelines") in the left navigation.
2. Click Pipelines, then Add Pipeline (or edit an existing one).
3. Name the pipeline (a business will often have more than one, for example a "Sales Pipeline" and a separate "Referral Partner Pipeline").
4. Add and name each Stage in the order deals should move through them.
5. Save. New opportunities can now be created directly, or generated automatically from a form submission, a calendar booking, or a workflow action.

## Common mistake

Building a single pipeline with far too many stages (12+), trying to capture every possible micro-step of a sales process. This makes the board hard to read at a glance and makes stage-based automation harder to reason about. Most effective pipelines have somewhere between 4 and 8 stages that represent genuinely distinct, decision-relevant moments in the deal.

## Pro tip

Always set a deal Value on opportunities, even estimated ones. Without it, Pipeline reporting (total pipeline value, forecasted revenue by stage) is meaningless, since GoHighLevel can only total what's actually entered on each opportunity.`,
        },
        {
          slug: "building-and-managing-a-pipeline",
          title: "Building & Managing a Pipeline",
          estimatedMinutes: 7,
          content: `# Building and Managing a Pipeline

Once a pipeline exists, day-to-day use is about keeping the board accurate and using its views to actually run a sales process, not just visualize one.

## Working the board

- Drag and drop: move an opportunity card between stages as a deal progresses; this can also be done from inside the opportunity's detail view via a stage dropdown.
- Filters and views: filter the board by owner (assigned salesperson), by tag, or by date range, and switch between a Kanban board view and a list/table view for the same pipeline.
- Won/Lost: marking an opportunity Won or Lost moves it out of active stages and into a closed status, and can optionally trigger a "reason lost" prompt for reporting on why deals fall through.

## Assigning ownership

Every opportunity can be assigned to a specific staff member, which matters both operationally (so the right person follows up) and for reporting (so you can see pipeline value and close rate broken down per rep).

## Automating stage movement

Rather than manually dragging every card, most agencies wire stage changes into Workflows: for example, a "Calendar Booked" trigger automatically creates or advances an opportunity to an "Appointment Scheduled" stage, or an "Invoice Paid" trigger automatically marks the opportunity Won. This keeps the pipeline accurate even when a busy sales team forgets to update it manually.

## Step-by-step: manually moving a deal and logging an outcome

1. Open the Opportunities board and locate the relevant card.
2. Drag it to the new stage, or open the opportunity and change its stage from the detail panel.
3. If moving to Won or Lost, confirm the final deal value is accurate and, if prompted, select a reason (for a lost deal, this feeds "reason lost" reporting).
4. Add a note summarizing the outcome for anyone else who touches this account later.

## Common mistake

Letting a pipeline silently accumulate stale opportunities that were never marked Won or Lost. This inflates the visible "open pipeline value" with deals that are actually dead, which misleads both sales forecasting and management reporting. Schedule a regular pipeline review (weekly for an active sales team) specifically to close out stale cards.`,
        },
        {
          slug: "automating-pipeline-stages",
          title: "Automating Pipeline Stage Changes",
          estimatedMinutes: 6,
          content: `# Automating Pipeline Stage Changes

Pipelines become far more powerful once you connect them to Workflows so that stage movement, and the actions that should follow it, happen automatically instead of depending on someone remembering to update a board.

## Common trigger-to-stage patterns

- Form submitted with "interested in [product]" checked, creates a new opportunity in the "New Lead" stage of the matching pipeline.
- Appointment booked on a sales calendar, moves the related opportunity to an "Appointment Scheduled" stage.
- Appointment marked as a no-show, moves the opportunity to a "Follow-Up Needed" stage and starts a re-engagement sequence.
- Invoice marked paid, moves the opportunity to "Won" and starts an onboarding/welcome workflow.
- No activity on an opportunity for 14 days, tags it "stale" and moves it to a "Needs Attention" stage, or notifies the assigned rep.

## Step-by-step: automating a stage change

1. Go to Automation and create (or edit) a Workflow.
2. Choose the trigger that should represent this business moment (for example "Appointment Status Changed").
3. Add a filter/condition if the trigger needs to be narrowed (for example, only fire for a specific calendar).
4. Add the "Update Opportunity" (or equivalent "move to pipeline stage") action, and select the target pipeline and stage.
5. Optionally chain further actions after the stage change (notify a rep, send a confirmation, add a tag).
6. Publish the workflow and test it with a real or sandbox trigger event.

## Common mistake

Building stage-changing workflows without also handling the reverse case, for example, automatically moving a deal to "Appointment Scheduled" on booking, but never building the companion automation that handles what happens on a cancellation or no-show. Half-built automation like this leaves pipelines showing stale, inaccurate stages for exactly the deals that most need attention.

## Pro tip

Whenever you automate a stage change, ask "what should also happen when this stage is reached?" A stage change is rarely the end goal by itself; it usually should also trigger a notification, a message to the contact, or a task for a team member. Build that follow-on action in the same workflow rather than leaving it as a separate manual step.`,
        },
      ],
    },
    {
      title: "Payments: Products, Invoicing & Subscriptions",
      lessons: [
        {
          slug: "connecting-payment-processors",
          title: "Connecting Payment Processors",
          estimatedMinutes: 7,
          content: `# Connecting Payment Processors

Before you can charge anyone through GoHighLevel, whether via an order form, invoice, or course offer, a sub-account needs a connected payment processor. GoHighLevel doesn't process payments itself; it integrates with providers like Stripe (the most common), PayPal, and a few regional/alternative gateways, and routes transactions through them.

## Step-by-step: connecting Stripe

1. Go to Payments, Integrations within the sub-account.
2. Choose Stripe and click Connect.
3. Either log in to an existing Stripe account or create a new one through the guided flow.
4. Authorize the connection, granting GoHighLevel permission to create charges, products, and manage subscriptions on that Stripe account.
5. Configure which payment methods to expose (cards, Apple Pay/Google Pay, ACH/bank debit, etc.) under Stripe Payment Method Management inside HighLevel, rather than needing to manage it separately in the Stripe dashboard.

## Where these connections are used

Once connected, the same payment processor powers several different areas: order forms and funnels, standalone invoices, the Payments product catalog, recurring Membership/Course offers, and any e-commerce store pages built in Sites. This is a good example of the "one system" philosophy: connect a processor once, and every revenue-generating feature in the sub-account can use it.

## Common mistake

Connecting a personal or test-mode Stripe account for a live client business, then wondering why real charges aren't appearing, or appear in test mode and are unrecoverable as real revenue. Always confirm you're connecting (and later, testing against) a live Stripe account in live mode before launching anything client-facing.

## Pro tip

If an agency is managing many client sub-accounts, decide early whether each client connects their own payment processor (money goes directly to them) or the agency's processor is used with revenue split some other way. Mixing these approaches inconsistently across clients tends to create confusing bookkeeping down the line.`,
        },
        {
          slug: "products-price-points-order-forms",
          title: "Products, Price Points & Order Forms",
          estimatedMinutes: 8,
          content: `# Products, Price Points & Order Forms

Once a payment processor is connected, GoHighLevel's Payments section lets you define what you're actually selling, and how customers pay for it.

## Products

A Product is the sellable thing itself (a service package, a physical item, a course, a membership tier). Each Product can have multiple **Prices** attached to it: one-time payment, a split-pay plan, a payment plus recurring balance (deposit-plus-subscription), a free trial period before billing starts, or a straightforward recurring subscription. This means a single product like "12-Week Coaching Program" can offer both "pay in full" and "3 monthly payments" as price options for the same underlying product.

## Step-by-step: creating a product with a price

1. Go to Payments, Products and click Add Product.
2. Enter the name, description, and image(s).
3. Click Add Price (or "add another price") and choose the pricing model: one-time, recurring, or a combination.
4. Set the amount, billing interval (if recurring), and currency.
5. Save. The product is now available to attach to an Order Form, a funnel checkout step, an invoice, or a course/membership offer.

## Order forms

An Order Form is a checkout page where a customer selects (or is pre-set into) a product and price, enters payment details, and completes the purchase, often embedded directly inside a funnel as the final step. Order forms support upsells and bump offers, letting you present an additional related product immediately after the initial purchase decision.

## Common mistake

Creating a new, separate product for every minor pricing variation (for example, one product for "Standard - Monthly" and a completely different product for "Standard - Annual") instead of adding multiple prices to one product. This fragments reporting, since revenue and purchase counts split across what should be a single product's performance view.

## Try it yourself

Build one test product with two prices attached (a one-time price and a recurring price), then create a simple order form for it and complete a test purchase in Stripe's test mode to see the full flow from product to paid transaction.`,
        },
        {
          slug: "invoices-subscriptions-transactions",
          title: "Invoices, Subscriptions & Transactions",
          estimatedMinutes: 7,
          content: `# Invoices, Subscriptions & Transactions

Beyond self-serve order forms, GoHighLevel's Payments section includes tools for direct invoicing and for tracking money that's already moved.

## Invoices

An Invoice is a one-off or recurring bill you send directly to a specific contact, useful for custom-quoted work, retainers, or any charge that doesn't fit a standardized order form. Step-by-step:

1. Go to Payments, Invoices and click Create Invoice.
2. Select the contact (or add a new one), then add line items, either from existing Products or as freeform line items with custom amounts.
3. Set the due date and whether it should recur automatically on a schedule.
4. Send the invoice by email/SMS directly from GoHighLevel, or copy a payable link.
5. Track its status (Sent, Viewed, Paid, Overdue) from the Invoices list.

## Subscriptions

The Subscriptions view lists every active recurring charge tied to the sub-account, regardless of whether it originated from an order form, a recurring invoice, or a manually created subscription. It shows status (active, past due, canceled), next billing date, and the underlying product or invoice it's attached to, and stays in sync with the connected processor. For Stripe specifically, if a subscription is canceled directly in the Stripe dashboard, GoHighLevel reflects that as canceled as well.

## Transactions

Transactions is the ledger: every individual charge, refund, and payment attempt, successful or failed, with timestamps, amounts, and the associated contact and product. This is your first stop when a client asks "did this specific customer actually pay?"

## Common mistake

Manually marking an invoice "paid" for bookkeeping convenience when the customer actually paid outside the system (cash, a different processor), without reflecting reality accurately. This desynchronizes GoHighLevel's revenue reporting from what actually happened and can trigger workflows (like "invoice paid" automations) based on inaccurate data.

## Pro tip

Use the "Invoice Paid" and "Subscription Payment Failed" workflow triggers to automate what most businesses do manually: send a receipt and kick off onboarding on successful payment, and send a dunning/payment-recovery sequence automatically when a recurring charge fails, rather than relying on staff to notice failed payments in the Transactions list.`,
        },
      ],
    },
    {
      title: "Marketing: Email & SMS Campaigns",
      lessons: [
        {
          slug: "email-builder-and-templates",
          title: "The Email Builder & Templates",
          estimatedMinutes: 8,
          content: `# The Email Builder & Templates

GoHighLevel includes its own drag-and-drop email builder, used both for one-time campaign emails and for the emails sent automatically inside Workflows. Everything you build here is reusable across both contexts.

## The builder itself

The Email Builder works block by block: text blocks, images, buttons, dividers, social icons, and layout containers can be dragged onto a canvas and rearranged freely, with styling controls (fonts, colors, spacing) applied per block or globally to match brand guidelines. There's typically also a plain HTML/code editing mode for advanced users who want pixel-level control or need to paste in custom-coded templates.

## Merge tags and personalization

Any contact or custom field can be inserted as a merge tag so the same template personalizes itself per recipient, for example:

\`\`\`
Hi {{contact.first_name}}, your appointment is confirmed for {{appointment.start_time}}.
\`\`\`

This is what lets a single template serve an entire list rather than needing a hand-written email per contact.

## Saving and reusing templates

Once built, a design can be saved as a Template, either private to your sub-account or, for agencies, pushed into a Snapshot so every new client account starts with the same branded templates already available (a welcome email, a newsletter shell, a receipt template, etc.).

## Step-by-step: building and saving a template

1. Go to Marketing, Emails, Templates and click Create Template (or "+ New").
2. Choose a starting layout or a blank canvas.
3. Drag in blocks, add your copy and images, and insert merge tags for personalization.
4. Preview on desktop and mobile sizing, since email clients render differently at each width.
5. Save as a Template so it can be reused in future Campaigns and Workflow email actions.

## Common mistake

Building an email almost entirely out of one large image (a common shortcut for match perfectly-designed visuals) instead of real text blocks. Many email clients block images by default, and image-heavy emails with little real text are also more likely to be flagged as spam. Keep a healthy ratio of real text to images, and always fill in image alt text.

## Pro tip

Send yourself and a colleague a real test send before launching any campaign, and check it on both a phone and a desktop email client. Rendering differences are common, and it's much cheaper to catch a broken layout in a test send than after it's gone out to a full list.`,
        },
        {
          slug: "email-campaigns-and-broadcasts",
          title: "Email Campaigns & Broadcasts",
          estimatedMinutes: 7,
          content: `# Email Campaigns & Broadcasts

While Workflows handle ongoing, triggered email automation, Campaigns (sometimes called Broadcasts) are for sending a one-time (or manually scheduled) email to a chosen list all at once, like a newsletter, a promotion, or an announcement.

## Step-by-step: sending a campaign

1. Go to Marketing, Emails and click Send Campaign (or "+ New Broadcast").
2. Choose the recipient list: an existing Smart List, a specific tag, or a manually built segment via filters.
3. Select or build the email (from a saved Template or from scratch).
4. Set the subject line, preview text, and sender name/address.
5. Choose to send immediately or schedule it for a specific date and time, and consider timezone-based sending if your list spans multiple regions.
6. Review the recipient count one more time, then send or schedule.

## Reading campaign results

After sending, GoHighLevel reports opens, clicks, bounces, unsubscribes, and spam complaints for the campaign, both in aggregate and per recipient in some views. These metrics also feed the "Email Events" workflow trigger family (opened, clicked, bounced, etc.), so a campaign send can itself kick off further automation, like tagging everyone who clicked a specific link as "interested" and enrolling them in a follow-up sequence.

## Deliverability basics

Consistent sender reputation matters more than any single send. Keep an eye on bounce rate (remove hard-bounced addresses) and spam complaint rate, warm up a new sending domain gradually rather than blasting a huge list on day one, and always include a working unsubscribe link, both because it's good practice and because it's a legal requirement (CAN-SPAM in the US, and similar laws elsewhere).

## Common mistake

Sending broad campaigns to an entire contact list, including old, disengaged, or unverified addresses, without segmenting by recent engagement. This tanks deliverability for the whole sending domain over time, since email providers watch bounce and complaint rates closely and can start routing future sends to spam even for engaged recipients.

## Try it yourself

Before your next real campaign, build a Smart List filtered to contacts who opened or clicked an email in the last 90 days, and compare a test send's engagement between that list and your full list. The gap will show you how much stale contacts are dragging down your numbers.`,
        },
        {
          slug: "sms-campaigns-and-compliance",
          title: "SMS Campaigns & Compliance",
          estimatedMinutes: 7,
          content: `# SMS Campaigns & Compliance

SMS campaigns work similarly to email campaigns structurally, a one-time or scheduled send to a chosen list, but text messaging carries its own delivery mechanics and legal requirements that are stricter than email.

## Step-by-step: sending an SMS campaign

1. Go to Marketing, choose the SMS/Bulk Request option (naming varies by account version).
2. Select the recipient list, being especially careful to only include contacts who have explicitly opted in to SMS.
3. Write the message. Keep it short, since SMS is billed and rendered in segments (traditionally around 160 characters per segment for plain text), and include an opt-out instruction like "Reply STOP to unsubscribe."
4. Insert merge tags for personalization if useful (a first name at the start of a text noticeably improves response rates).
5. Schedule or send immediately, respecting reasonable send-time windows (many jurisdictions restrict SMS marketing to daytime hours).

## Compliance essentials

SMS marketing in the US operates under TCPA rules and, at the carrier level, A2P 10DLC registration requirements. In practice this means: only text people who have given clear consent to receive marketing texts (not just transactional/appointment texts), always honor STOP requests immediately and automatically (GoHighLevel handles opt-outs from STOP replies natively), and keep records of how and when consent was collected. Unregistered or unverified numbers sending high volumes of unsolicited texts risk being throttled or blocked by carriers, independent of any GoHighLevel setting.

## SMS vs. email for different message types

SMS has dramatically higher open rates than email but a much smaller "acceptable message" window, both technically and in terms of what recipients tolerate. Time-sensitive, short messages (appointment reminders, urgent offers, quick check-ins) suit SMS well; longer-form content (newsletters, detailed offers, multi-paragraph updates) suits email better. Many effective campaigns pair both: an email with full details, and an SMS nudge pointing back to it.

## Common mistake

Treating an SMS list the same as an email list and blasting the same frequency and volume of promotional texts. Recipients tolerate far less promotional SMS volume before opting out or reporting spam compared to email; a good default is far less frequent, more targeted SMS sends than your email cadence.

## Pro tip

Always test your STOP/unsubscribe flow yourself on a real test number before launching a campaign. Confirm that replying STOP actually suppresses future sends to that contact, since this is both a legal requirement and a basic trust signal to your list.`,
        },
      ],
    },
    {
      title: "Marketing: Social Planner & Ad Reporting",
      lessons: [
        {
          slug: "social-media-planner",
          title: "The Social Media Planner",
          estimatedMinutes: 7,
          content: `# The Social Media Planner

GoHighLevel includes a built-in Social Planner that lets you draft, schedule, and publish posts across multiple connected social accounts from one calendar view, instead of switching between each platform's own native scheduler.

## Supported platforms and connections

The Social Planner typically supports Facebook Pages, Instagram (professional/business accounts), Google Business Profile posts, LinkedIn, TikTok, and X (formerly Twitter), depending on current integrations. Each platform must be connected individually under Marketing, Social Planner, Settings (or a similar Connections screen), which usually involves logging in to that platform and authorizing GoHighLevel to publish on your behalf.

## Step-by-step: scheduling a post

1. Go to Marketing, Social Planner and click Create Post (or "+ New Post").
2. Select which connected account(s) this post should publish to; you can often publish the same post to multiple platforms at once, with platform-specific previews.
3. Write the caption, attach images/video, and adjust formatting per platform if needed (for example, hashtags behave differently on Instagram versus LinkedIn).
4. Preview how the post will look on each selected platform.
5. Choose to publish immediately, schedule for a specific date/time, or save as a draft.
6. Use the calendar view to see your full content schedule at a glance and spot gaps or clustering.

## Approval workflows for agencies

Agencies managing content for clients often use a review/approval step: content is drafted and scheduled by the agency team, but held in a "pending approval" state until an assigned client user reviews and approves it, before it goes live. This keeps clients from being surprised by content going out under their brand without sign-off.

## Common mistake

Scheduling the same generic caption across every platform without platform-appropriate adjustments (for example, using visible hashtags that read naturally on Instagram but look out of place on LinkedIn or Facebook). Even when publishing to multiple platforms in one action, take a moment to tailor tone and formatting per platform.

## Try it yourself

Connect one social account (or use a test/sandbox account if available) and schedule a post for a week out, then check back on the day it's due to confirm it actually published as expected and rendered correctly.`,
        },
        {
          slug: "ad-manager-reporting",
          title: "Ad Manager Reporting",
          estimatedMinutes: 6,
          content: `# Ad Manager Reporting

GoHighLevel doesn't build or manage ad campaigns the way a dedicated ad platform does; instead, its Ad Reporting connects to Facebook Ads and Google Ads accounts to pull performance data into the same dashboard where you already track leads, pipeline, and revenue.

## Why this integration matters

Without it, a business runs ads in Facebook Ads Manager or Google Ads, then has to manually cross-reference spend and clicks against leads and sales happening inside a completely separate CRM. Connecting ad accounts to GoHighLevel lets you see ad spend next to the leads, appointments, and revenue those ads actually generated, all attributed back to the specific campaign, ad set, or ad that drove them (this ties directly into Attribution Reporting, covered later in this course).

## Step-by-step: connecting an ad account

1. Go to Settings, Integrations (or directly within Marketing, Ad Reporting).
2. Choose Facebook Ads or Google Ads and click Connect.
3. Log in with the account that has access to the relevant ad account(s) and authorize the requested permissions.
4. Select which specific ad account(s) to pull data from, since a login may have access to several.
5. Data typically begins populating within a short delay as the integration syncs historical and ongoing performance.

## What you can see once connected

Typical metrics available include spend, impressions, clicks, cost-per-click, cost-per-lead, and, when attribution is fully wired up through UTM parameters and connected forms/funnels, cost-per-appointment and cost-per-sale, broken down by campaign.

## Common mistake

Connecting the ad account but never actually using UTM parameters or GoHighLevel's tracking links on the ads themselves. Without consistent tracking parameters connecting an ad click to a form submission or funnel visit, GoHighLevel can show you spend totals but can't accurately attribute which specific leads or sales came from which ad, which defeats the main purpose of the integration.

## Pro tip

Review ad reporting inside GoHighLevel alongside, not instead of, the native Facebook/Google Ads dashboards. The native platforms remain the source of truth for granular ad-level optimization (creative testing, audience targeting); GoHighLevel's value is connecting that spend to what actually happened after the click, inside your CRM.`,
        },
      ],
    },
    {
      title: "Forms & Surveys",
      lessons: [
        {
          slug: "building-forms",
          title: "Building Forms",
          estimatedMinutes: 7,
          content: `# Building Forms

Forms are GoHighLevel's tool for quick, single-page lead capture: name, email, phone, and maybe one or two qualifying questions, built with a drag-and-drop editor and embeddable anywhere.

## Step-by-step: creating a form

1. Go to Sites, Forms (forms live under the Sites area since they're most often embedded on a website or funnel page) and click Build Form (or "+ New Form").
2. Choose a starting template or a blank canvas.
3. Drag in fields: standard fields (name, email, phone) plus any Custom Fields you've created, and optional elements like checkboxes, dropdowns, or file upload.
4. Configure the submit button, thank-you behavior (show a message, redirect to a URL, or advance to a booking step), and required-field validation.
5. Style the form to match your brand, then Save and Publish.
6. Copy the embed code or direct link to place the form on a website, funnel page, or external site.

## What happens on submission

A form submission always creates or updates a Contact record with whatever data was collected, and can be configured to automatically apply tags, add the contact to a specific pipeline/stage, and fire a "Form Submitted" workflow trigger, all without any external automation tool. A typical downstream workflow might send an instant confirmation text, notify a sales rep, and enroll the contact in a nurture sequence, all triggered by that one submission.

## Common mistake

Asking for too much information on a top-of-funnel lead capture form. Every additional required field measurably reduces completion rate. Keep initial lead-capture forms short (name, email, phone, maybe one qualifying question) and use a Survey, or a follow-up workflow, to gather deeper information after the initial opt-in.

## Try it yourself

Build a simple two-field form (name and email), embed it on a test page, and submit a real test entry. Check the resulting contact record to confirm the data landed correctly and that any configured tags or workflow triggers actually fired.`,
        },
        {
          slug: "building-surveys",
          title: "Building Surveys with Conditional Logic",
          estimatedMinutes: 8,
          content: `# Building Surveys with Conditional Logic

Where Forms are built for quick single-page capture, Surveys are built for multi-step qualification, intake, and quiz-style funnels, structured as a sequence of pages rather than one continuous scroll.

## How surveys differ structurally

A Survey is organized into multiple pages, each with its own title, description, and set of questions; respondents click Next to advance from one page to the next rather than seeing every question at once. This page-by-page structure reduces the perceived effort of a long questionnaire (showing one or two questions at a time feels much lighter than a single giant form) and enables conditional branching between pages.

## Conditional logic

Surveys support showing or skipping specific pages or questions based on a prior answer, for example, someone who answers "I rent my home" skips a page of homeowner-specific questions entirely, while someone who answers "I own my home" sees them. This is what makes surveys suitable for qualification: a single survey can route very different types of respondents down meaningfully different question paths while still ending in one unified submission.

## Step-by-step: building a branching survey

1. Go to Sites, Surveys and click Build Survey.
2. Add your first page of questions, then add subsequent pages for the rest of the flow.
3. On a question with branching answers, open its logic settings and configure which page each answer should jump to (for example, "skip to Page 4" for one answer, "continue to Page 2" for another).
4. Configure the final thank-you step, which can also redirect straight into a booking calendar for qualified respondents.
5. Preview the entire flow yourself, testing each branch, before publishing.

## Common mistake

Building complex branching logic but never testing every path before launch. It's easy to create a "dead end" where one branch's answer doesn't map to any next page, leaving respondents stuck. Walk through every possible answer combination once before publishing a branching survey.

## Pro tip

Use surveys, not forms, for anything resembling a quiz or an assessment (like "which package is right for you?"). The page-by-page structure combined with scoring-style conditional logic is specifically suited to that use case and converts noticeably better than cramming the same questions into one long form.`,
        },
        {
          slug: "submissions-and-routing-to-workflows",
          title: "Submissions & Routing to Workflows",
          estimatedMinutes: 6,
          content: `# Submissions & Routing to Workflows

Capturing a form or survey response is only half the job; what happens immediately afterward is where most of the actual business value comes from.

## Viewing submissions

Every form and survey has its own Submissions view (Sites, Forms, Submissions, or Sites, Surveys, Submissions), listing each response with a timestamp and a link straight to the resulting contact record, so you can audit exactly what came in and when without digging through the Contacts list.

## Routing into workflows

The real power comes from the "Form Submitted" and "Survey Submitted" workflow triggers. Instead of a staff member manually reading every submission and deciding what to do, a workflow can, based purely on the trigger firing (and optionally on specific answer values):

- Create or update the contact and apply relevant tags
- Create an opportunity in the right pipeline and stage
- Send an instant confirmation email/SMS to the respondent
- Notify the right internal team member, potentially different people depending on the answers given
- Deliver a lead magnet (a PDF, discount code, or booking link) automatically

## Step-by-step: wiring a form to a workflow

1. Build and publish the form or survey.
2. Go to Automation and create a new Workflow.
3. Set the trigger to Form Submitted (or Survey Submitted) and select the specific form/survey.
4. Add a condition step if you need to branch based on a specific answer (for example, routing "budget over $10k" leads to a different notification than smaller ones).
5. Add your actions: contact updates, tags, pipeline placement, messages, and internal notifications.
6. Publish and submit a real test entry to confirm every downstream action fires correctly.

## Common mistake

Building a beautiful, well-branched survey but never connecting it to a workflow, leaving submissions sitting in the Submissions list where no one reliably checks them. A survey without an automated response is just a slower, less useful form. Always pair meaningful forms and surveys with at least a confirmation message and an internal notification.`,
        },
      ],
      quiz: {
        title: "Tier 2 Checkpoint: The Revenue Engine",
        questions: [
          {
            text: "What is the key difference between a Contact and an Opportunity in GoHighLevel?",
            optionA: "They are the same thing, just named differently in different menus",
            optionB: "A Contact is the person or company, while an Opportunity represents a specific trackable deal that a contact is involved in",
            optionC: "An Opportunity can only exist without an associated Contact",
            optionD: "A Contact automatically expires after a deal is marked Won",
            correctOption: "B",
          },
          {
            text: "What is generally recommended for the number of stages in a well-designed pipeline?",
            optionA: "Exactly 2 stages: Open and Closed",
            optionB: "As many as possible, ideally over 20, to capture every micro-step",
            optionC: "Roughly 4 to 8 stages representing genuinely distinct, decision-relevant moments",
            optionD: "Pipelines cannot have custom stages at all",
            correctOption: "C",
          },
          {
            text: "Why does GoHighLevel need a connected payment processor like Stripe before it can accept payments?",
            optionA: "GoHighLevel processes payments internally and the connection is only for reporting",
            optionB: "GoHighLevel does not process payments itself; it routes charges through an integrated processor",
            optionC: "Payment processors are only required for physical product sales",
            optionD: "Stripe is required only for sending invoices, not for order forms",
            correctOption: "B",
          },
          {
            text: "In the Payments Products area, what is the benefit of adding multiple Prices to a single Product rather than creating separate products?",
            optionA: "It allows different payment options (like one-time vs. installments) for the same offer while keeping reporting unified under one product",
            optionB: "It is required because GoHighLevel does not allow more than one price per product otherwise",
            optionC: "It automatically applies a discount to every price",
            optionD: "It disables recurring billing for that product",
            correctOption: "A",
          },
          {
            text: "What does the Subscriptions view in Payments show?",
            optionA: "A list of every contact who has ever unsubscribed from email",
            optionB: "Every active recurring charge tied to the sub-account, along with its status and next billing date",
            optionC: "Only subscriptions created through order forms, not invoices",
            optionD: "A summary of ad account subscription costs",
            correctOption: "B",
          },
          {
            text: "What is a key reason to insert merge tags like {{contact.first_name}} into an email template?",
            optionA: "To prevent the email from being marked as spam automatically",
            optionB: "To personalize a single template for each recipient based on their own contact data",
            optionC: "To encrypt the email content",
            optionD: "Merge tags only work in SMS, not email",
            correctOption: "B",
          },
          {
            text: "Which compliance framework is most directly associated with SMS marketing consent requirements in the US?",
            optionA: "GDPR",
            optionB: "TCPA",
            optionC: "HIPAA",
            optionD: "SOC 2",
            correctOption: "B",
          },
          {
            text: "What is the main purpose of connecting a Facebook Ads or Google Ads account to GoHighLevel's Ad Reporting?",
            optionA: "To let GoHighLevel automatically create and launch new ad campaigns",
            optionB: "To see ad spend alongside the leads, appointments, and revenue those ads generated inside the same CRM",
            optionC: "To replace the need for a Facebook Business Manager account entirely",
            optionD: "It only tracks organic social posts, not paid ads",
            correctOption: "B",
          },
          {
            text: "What structurally distinguishes a Survey from a Form in GoHighLevel?",
            optionA: "Surveys can only be used internally and never shown to the public",
            optionB: "Surveys are organized into multiple pages with support for conditional branching between them, while Forms are typically single-page",
            optionC: "Forms support file uploads while Surveys never do",
            optionD: "There is no meaningful difference between the two features",
            correctOption: "B",
          },
          {
            text: "What is the recommended next step after building a well-designed lead capture form or survey?",
            optionA: "Leave it unconnected to any automation so staff can manually review every submission",
            optionB: "Connect it to a workflow so submissions automatically trigger confirmations, tagging, and notifications",
            optionC: "Delete the Submissions view to save storage",
            optionD: "Convert it into a Snapshot immediately before any testing",
            correctOption: "B",
          },
        ],
      },
    },
    {
      title: "Automation: The Workflow Builder in Depth",
      lessons: [
        {
          slug: "workflow-builder-anatomy-triggers",
          title: "Workflow Builder Anatomy: Triggers",
          estimatedMinutes: 9,
          content: `# Workflow Builder Anatomy: Triggers

Workflows are GoHighLevel's automation engine, the single feature that ties every other section of the platform together. If Contacts, Calendars, Payments, and Forms are the raw ingredients, Workflows are what actually cooks something out of them without a human doing it manually.

## The basic shape of a workflow

Every workflow starts with exactly one (or a small combined set of) Trigger, the event that starts the automation, followed by a sequence of Actions that run in response, often with Conditions/branches that route contacts down different paths depending on their data. The builder is a visual, drag-and-drop, left-to-right (or top-to-bottom, depending on view) canvas: you add a trigger, then chain steps below or after it, connected by arrows.

## Common trigger categories

- **Contact-based**: Contact Created, Tag Added/Removed, Custom Field changed.
- **Communication-based**: Form Submitted, Survey Submitted, Customer Replied (fires when a contact replies on any connected channel), Email Events (delivered, opened, clicked, bounced, spam-marked, unsubscribed).
- **Calendar-based**: Appointment Booked, Appointment Status Changed (confirmed, no-show, cancelled), Appointment Rescheduled.
- **Commerce-based**: Order Submitted, Invoice Paid, Subscription Payment Failed.
- **Pipeline-based**: Opportunity Stage Changed, Opportunity Created.
- **External/technical**: Inbound Webhook (fires when data is received at the workflow's own webhook URL, letting an outside tool like Zapier or a custom app kick off a GoHighLevel workflow), Scheduler (a time-based trigger that runs on a recurring schedule without needing a specific contact event).

## Step-by-step: starting a new workflow

1. Go to Automation, Workflows and click Create Workflow.
2. Choose to start from a template or a blank workflow.
3. Add a Trigger by clicking the "+" at the top of the canvas and selecting the event type.
4. Configure any trigger-specific filters (for example, restricting a "Form Submitted" trigger to one specific form rather than any form).
5. Save the trigger configuration before adding actions underneath it.

## Common mistake

Choosing a trigger that's broader than intended, for example, using a generic "Tag Added" trigger without realizing several different processes in the account add that same tag, causing the workflow to fire in unintended situations. Always check what else in the account could cause a given trigger to fire before assuming it only represents the one scenario you have in mind.

## Try it yourself

Open the trigger picker in a test workflow and read through the full list of available triggers once, even ones you don't immediately need. Knowing what's possible is what lets you recognize, weeks later, "oh, there's actually a trigger for that" instead of building a clunky manual workaround.`,
        },
        {
          slug: "actions-conditions-branching",
          title: "Actions, Conditions & If/Else Branching",
          estimatedMinutes: 9,
          content: `# Actions, Conditions & If/Else Branching

Once a trigger starts a workflow, Actions are what actually happen, and Conditions are what let the same workflow behave differently for different contacts.

## Common action categories

- **Communication actions**: Send Email, Send SMS, Send internal notification (to a team member).
- **Contact actions**: Add/Remove Tag, Update Contact field, Add Contact to another Workflow.
- **Pipeline actions**: Create Opportunity, Update Opportunity Stage.
- **Timing actions**: Wait/Delay (pause for a set duration, or until a specific date/time, or until a specific day of week).
- **Logic actions**: If/Else branching (splits contacts down two different paths based on a condition), Goal (ends a contact's journey through the workflow early if they've already achieved the desired outcome, like booking a call).
- **Integration actions**: Webhook (send data out to an external system), Zapier/API-style connections to third-party tools.

## Building a branch

An If/Else step evaluates a condition, commonly a tag, a custom field value, or an answer from a form/survey, and routes the contact down the "Yes" path or the "No" path, with each path able to contain its own independent sequence of further actions. This is what lets one workflow, rather than five separate ones, handle a lead who said "I'm ready to buy" differently from a lead who said "just researching."

## Step-by-step: adding a branch

1. In an open workflow, click the "+" below the point where you want to branch.
2. Select If/Else (or "Condition").
3. Define the condition (for example, "Custom Field: Budget is greater than 5000").
4. Add separate action sequences under the "Yes" and "No" outcomes.
5. Test both paths by simulating contacts that would land on each branch.

## Common mistake

The Workflow Builder prevents drawing a visual arrow back to a previous step (no visible loops), but it's still possible to build an effectively circular process using re-triggering (for example, a workflow that re-adds the same tag that triggered it, causing it to fire again unexpectedly). Always double-check your actions for anything that could re-trigger the same workflow's own trigger condition.

## Pro tip

Use Goals generously. A Goal step lets you say, in effect, "if this contact already booked a call, stop sending them 'book a call' reminder emails," even if they're mid-sequence. Without goals, contacts who convert early keep receiving irrelevant follow-up messages meant for people who haven't converted yet, which looks unprofessional and can even annoy a customer who already said yes.`,
        },
        {
          slug: "advanced-wait-webhooks-goals",
          title: "Advanced: Wait Steps, Webhooks & Goals",
          estimatedMinutes: 8,
          content: `# Advanced: Wait Steps, Webhooks & Goals

Beyond the basics, a handful of advanced building blocks let workflows handle real-world timing needs and connect to systems outside GoHighLevel entirely.

## Wait steps in depth

A Wait/Delay step can pause for a fixed duration ("wait 2 days"), until a specific date/time, until a specific day of the week (useful for making sure a sales follow-up email always lands on a weekday morning regardless of what day the trigger fired), or until a specific event happens (some builders support "wait until" a condition becomes true, rather than only a fixed delay).

## Webhooks: sending data out

An outbound Webhook action sends a structured payload from the workflow to an external URL, which is how GoHighLevel talks to tools that don't have a native, pre-built integration. A simplified example payload sent when an opportunity is marked Won might look like:

\`\`\`json
{
  "contact": {
    "first_name": "Jordan",
    "email": "jordan@example.com",
    "phone": "+15551234567"
  },
  "opportunity": {
    "name": "Website Redesign",
    "pipeline_stage": "Won",
    "value": 4500
  },
  "event": "opportunity_stage_changed"
}
\`\`\`

An external system (a Zapier automation, a custom backend, an accounting tool) receives this payload and can act on it however it needs to.

## Inbound webhooks: receiving data in

Conversely, a workflow can itself be triggered by an Inbound Webhook, meaning the workflow generates its own unique URL, and any external tool that sends data to that URL will start the workflow, optionally creating or updating a contact from the payload's fields. This is the main way to connect GoHighLevel to tools it doesn't natively integrate with, without needing custom development.

## Goals in depth

A Goal step is placed inside a workflow and, when its condition becomes true for a contact already progressing through the workflow (not just at the start), immediately exits that contact from the remaining steps. This is commonly used to stop a "nurture until they book" sequence the moment a contact actually books, regardless of which step they were currently sitting in.

## Common mistake

Building a webhook integration and never testing what happens if the external system is down or returns an error. Depending on configuration, a failed webhook call can silently stop the rest of the workflow for that contact. For anything business-critical, add a fallback path or at least a monitoring/alert step rather than assuming the external call will always succeed.

## Pro tip

When designing a webhook payload, include enough context (contact identifiers, the specific event, relevant values) that the receiving system doesn't need to make a second API call back into GoHighLevel just to figure out what happened. A well-designed payload should be self-contained.`,
        },
        {
          slug: "workflow-recipes-and-debugging",
          title: "Common Workflow Recipes & Debugging",
          estimatedMinutes: 8,
          content: `# Common Workflow Recipes & Debugging

With triggers, actions, conditions, and advanced steps covered, it helps to see a few realistic, end-to-end workflow patterns, and to know how to troubleshoot one that isn't behaving as expected.

## Recipe: new lead speed-to-lead sequence

Trigger: Form Submitted. Actions: instantly send a "thanks, we got your info" SMS and email, notify the assigned sales rep by internal SMS, wait 10 minutes, then check (If/Else) whether the lead has replied yet; if not, send a follow-up text; if still no reply after a day, add to a longer nurture sequence. This pattern, contacting a new lead within minutes rather than hours, is one of the highest-leverage automations most businesses can build, since lead response speed strongly correlates with conversion rate.

## Recipe: appointment no-show recovery

Trigger: Appointment Status Changed to No-Show. Actions: tag the contact "no-show," send a "sorry we missed you, here's a new link to rebook" message, wait 2 days, then check if they've rebooked (Goal); if not, escalate to a team member for a personal follow-up call.

## Recipe: failed payment recovery

Trigger: Subscription Payment Failed. Actions: send an immediate "your payment didn't go through, here's how to update it" email and SMS, wait 2 days, check if payment succeeded (Goal); if not, send a second reminder, and after a final grace period, notify an account manager or pause service access.

## Debugging a workflow that isn't working

1. Open the specific contact who should have triggered it, and check their activity timeline; it usually shows whether the workflow enrolled them at all.
2. If it never enrolled, re-check the trigger's filters, a too-narrow filter is the most common cause of a workflow silently never firing.
3. If it enrolled but stopped partway, look for a condition step that may have routed them somewhere unexpected, or an action that depends on an unverified sending channel (phone/email) failing silently.
4. Use any available "Execution Log" or history view on the workflow itself to see, across all contacts, where people are getting stuck.

## Common mistake

Assuming a workflow is "broken" when actually the trigger's filter conditions were simply never met by the test scenario being used to check it. Before assuming a bug, re-read the trigger and every condition step's exact criteria against the specific contact and event you're testing.

## Try it yourself

Pick one of the three recipes above and build a simplified version of it in a test workflow, then run yourself through it as if you were the contact (submit the form, or simulate the appointment status change) to see the full sequence execute end to end.`,
        },
      ],
    },
    {
      title: "Sites: Funnels, Websites & Blogs",
      lessons: [
        {
          slug: "funnels-vs-websites-vs-blogs",
          title: "Funnels vs. Websites vs. Blog: When to Use Each",
          estimatedMinutes: 7,
          content: `# Funnels vs. Websites vs. Blog: When to Use Each

GoHighLevel's Sites area brings together three related but distinct page-building tools: Funnels, Websites, and the Blog. They share the same underlying drag-and-drop page builder, but are structured for different purposes.

## Funnels

A Funnel is a linear, step-by-step sequence of pages built to guide a visitor toward one specific action, for example, a landing page, then an order form, then an upsell page, then a thank-you page. Funnels support split testing (A/B testing different versions of a step against each other) because the whole point of a funnel is optimizing a single conversion path. There is generally one clear "next step" at each stage rather than open navigation.

## Websites

A Website is a traditional, multi-page site meant for general browsing, typically with a navigation menu linking a homepage, an about page, a services page, a contact page, and so on. Unlike a funnel, visitors move freely rather than along one forced path, and split testing isn't offered on websites since there's no single conversion path to test.

## Blog

The Blog builder lets you publish articles (with categories, authors, and SEO-relevant fields like meta descriptions and slugs) as part of a Website, useful for content marketing and organic search traffic, without needing a separate blogging platform like WordPress bolted on.

## Choosing the right tool for the job

Use a Funnel when you have one specific offer and want to control the exact path a visitor takes to convert (a webinar registration, a lead magnet opt-in, a product launch). Use a Website for the business's general online presence, where visitors should be able to explore multiple pages freely. Use the Blog when publishing ongoing content for SEO and thought leadership, attached to the Website.

## Common mistake

Building a full multi-page navigational website when what the business actually needed was a single, focused funnel for a specific campaign (or vice versa: cramming a multi-step sales sequence into one long website page). Match the tool to the actual goal: is this "guide one visitor toward one action" (funnel) or "let anyone learn about the business broadly" (website)?

## Try it yourself

Sketch out, on paper, the difference between a funnel and a website for a hypothetical local business (say, a dental practice): what would the funnel's 3-4 step sequence be for a "free consultation" campaign, versus what pages a general website for that practice would need?`,
        },
        {
          slug: "the-page-builder",
          title: "The Page Builder: Sections, Elements & Templates",
          estimatedMinutes: 8,
          content: `# The Page Builder: Sections, Elements & Templates

Whether you're building a funnel step, a website page, or a blog post layout, you're working inside the same drag-and-drop page builder. Understanding its structure makes every page you build afterward faster.

## The building blocks

Pages are built from Sections (full-width horizontal blocks stacked vertically down the page), which contain Rows and Columns (for laying content out side by side), which in turn contain Elements: headlines, text, images, buttons, forms, calendars, videos, countdown timers, icon lists, testimonials, and more. This nested structure (Section > Row/Column > Element) is what lets you build a fully custom, responsive layout without writing code.

## Step-by-step: building a page

1. In Sites, choose Funnels, Websites, or Blog, and create a new page (or a new step, for a funnel).
2. Start from a template if one fits, or a blank page for full control.
3. Add a Section, then Rows/Columns inside it, then drag Elements into place.
4. Style each element (fonts, colors, spacing) using either the global theme settings or per-element overrides.
5. Preview in desktop, tablet, and mobile views, since GoHighLevel's builder lets you adjust layout independently per device size.
6. Publish the page (or funnel step) once satisfied.

## Reusability

Individual sections, or entire pages, can often be saved as reusable templates or added to a Snapshot, so an agency that's built a strong-converting landing page section once can reuse it across many client sites instead of rebuilding from scratch each time.

## Common mistake

Designing a page only in desktop view and never checking the mobile rendering before publishing. Since a large share of traffic to landing pages and funnels comes from mobile devices, a page that looks great on a laptop but has overlapping text or oversized images on a phone will actively hurt conversion rates. Always review and adjust the mobile view specifically, not just resize the browser window.

## Pro tip

Keep a small library of your own best-performing sections (a strong hero section, an effective testimonials layout, a clear pricing table) saved as reusable templates. This turns page building from "start from scratch every time" into "assemble from proven pieces," which is both faster and more reliable.`,
        },
        {
          slug: "publishing-domains-tracking",
          title: "Publishing, Domains & Tracking Codes",
          estimatedMinutes: 6,
          content: `# Publishing, Domains & Tracking Codes

Building a page is only useful once it's actually live on a domain visitors can reach, and once you can measure what happens after they arrive.

## Connecting a custom domain

By default, a new site or funnel is reachable at a GoHighLevel-provided subdomain, but most businesses want their own domain. Step-by-step:

1. Go to Sites, Domains (or the domain settings within a specific site/funnel).
2. Click Add Domain and enter the custom domain or subdomain you want to use (for example, offers.yourbusiness.com).
3. Add the DNS records GoHighLevel provides (typically a CNAME or A record) at your domain registrar or DNS host.
4. Wait for DNS propagation and verification, then assign the verified domain to the specific funnel or website.

## Tracking codes

Pages support inserting tracking/pixel codes, such as a Facebook Pixel, Google Analytics/Tag Manager snippet, or a custom script, either site-wide (in global tracking settings) or on a specific page, so ad platforms and analytics tools can measure visits, conversions, and ad attribution accurately.

## SEO basics on each page

Every page typically has editable SEO fields: page title, meta description, and a URL slug, plus, for blog posts, category and author fields. Filling these in properly matters for how the page appears in search results and when shared on social media (some builders also support custom social share/Open Graph images).

## Common mistake

Publishing a funnel or website without ever connecting the intended custom domain, launching a campaign on the temporary GoHighLevel subdomain instead. This looks less professional to visitors and, if the domain is switched later, breaks any links, ads, or bookmarks already pointing to the old address. Set up the final domain before driving real traffic.

## Try it yourself

If you have a spare domain or subdomain available, walk through connecting it to a test funnel end to end, including waiting for DNS verification, so you're comfortable with the process (and its occasional propagation delay) before a client deadline is on the line.`,
        },
      ],
    },
    {
      title: "Memberships & Courses",
      lessons: [
        {
          slug: "course-builder-products-offers",
          title: "Course Builder: Products, Offers, Modules & Lessons",
          estimatedMinutes: 8,
          content: `# Course Builder: Products, Offers, Modules & Lessons

GoHighLevel's Memberships area (sometimes labeled Courses) lets a business build and sell its own online courses or membership content directly inside the same platform used for its CRM and marketing, notably similar in concept to a dedicated course platform, but with the CRM, payments, and automation already built in around it.

## The content hierarchy

A course is organized as Products/Offers at the top, containing Courses, which are broken into Modules, which contain individual Lessons (video, text, downloadable files, or embedded content). This structure lets you organize content the way most learners expect: a course made of logically grouped modules, each holding a handful of individual lessons.

## Offers: how content maps to what's sold

An Offer bundles one or more Courses together and attaches a Payment Product/Price to it (one-time or recurring, as covered in the Payments module). When a customer completes a purchase tied to that offer, they're automatically granted access to every course included in it, no manual account-provisioning required.

## Step-by-step: building a course

1. Go to Memberships and click Create Course (or start from a template like "Small Course" or "Marathon Course," or a blank canvas).
2. Add Modules to represent major sections of the course.
3. Within each module, add Lessons: upload video, add text content, attach downloadable resources, or embed external video.
4. Set the course's access/branding settings (custom domain, logo, color theme for the learner-facing portal).
5. Create or select an Offer, attach this course to it, and connect a Payment Product/Price.
6. Publish the course and test the full purchase-to-access flow yourself.

## Common mistake

Publishing a course with modules in a logical instructional order internally, but without locking/dripping content appropriately, which can let a customer skip straight to advanced material before foundational lessons, or binge and churn immediately after finishing everything in one sitting. Consider whether drip-released content (unlocking new modules on a schedule) fits the course better than full immediate access.

## Try it yourself

Sketch an outline for a hypothetical 3-module mini-course on a topic you know well, then plan which lessons would go in each module, before you ever open the actual course builder. Having the structure clear on paper makes the build itself much faster.`,
        },
        {
          slug: "membership-levels-access-certificates",
          title: "Membership Levels, Access & Certificates",
          estimatedMinutes: 7,
          content: `# Membership Levels, Access & Certificates

Beyond a single flat course, GoHighLevel supports tiered membership structures and completion incentives that help increase both initial sales and long-term retention.

## Membership levels/tiers

You can create multiple access tiers for the same overall membership area, commonly a Basic tier with limited content and a Premium tier with full access, each tied to its own Offer and price. This supports upselling: a customer who joined at the Basic tier can later be offered an upgrade to Premium, unlocking additional courses or content without needing a completely separate purchase and account setup.

## Managing learner access

Access is granted and revoked automatically based on the underlying purchase/subscription status. If a recurring membership payment fails and isn't resolved, access can be automatically restricted; if a customer requests a refund, an admin can manually revoke access from their contact or offer record. Admins can also manually grant complimentary access (for example, to a business partner or an affiliate) without requiring a real purchase.

## Certificates

Completion certificates (or badges) can be configured to automatically issue once a student finishes all lessons in a course, or a specific set of required modules, which serves as both a motivational tool during the course and outside social proof afterward (a certificate a student can post on LinkedIn, for instance).

## Step-by-step: setting up a certificate

1. Open the relevant Course's settings and locate the Certificate option.
2. Design or upload a certificate template, including placeholders for the learner's name and completion date.
3. Set the completion criteria (all lessons, or specific required modules) that trigger automatic issuance.
4. Test by completing the course yourself as a student-view account and confirming the certificate generates and delivers correctly.

## Common mistake

Setting membership tier upsells without clearly explaining what's different between tiers on the sales page itself. If a Premium tier's added value isn't obvious to a prospective Basic buyer, the upsell rarely converts. Make the tier differences concrete and visible wherever the offer is presented, not just discoverable after purchase.`,
        },
        {
          slug: "selling-and-delivering-courses",
          title: "Selling & Delivering Your Course",
          estimatedMinutes: 7,
          content: `# Selling & Delivering Your Course

A course only generates revenue once it's actually connected to a sales page, a checkout flow, and a smooth delivery experience for the buyer. This lesson ties together Sites, Payments, and Memberships around one concrete goal: selling a course end to end.

## The typical sales flow

1. A prospect lands on a sales page (built in Sites, a Funnel is a natural fit here since the goal is one specific conversion action).
2. They click through to an Order Form, where the course Offer's Product and Price are presented, one-time or recurring.
3. On successful payment, GoHighLevel automatically provisions access to the associated course(s) tied to that Offer, no manual account creation needed.
4. A "Purchase" or "Offer Granted" event can trigger a Workflow: send a welcome email with login instructions, notify a success/support team member, and optionally add the new student to an onboarding email sequence.

## Delivering a good learner experience

Once inside, learners typically see a branded portal (matching your logo, colors, and optionally a custom domain) listing their purchased courses, with progress tracking per module/lesson. A clean, professional-feeling learner portal meaningfully affects perceived course value and completion rates, so it's worth spending real design time on the portal branding, not just the individual lesson content.

## Common mistake

Building a strong sales page and checkout flow but never testing the actual post-purchase experience as a real buyer would see it. Broken access provisioning, a confusing welcome email, or a learner portal that doesn't match the sales page's branding all undermine trust right after someone has just paid, which is exactly the wrong moment for a rough experience.

## Pro tip

Treat your own course's sales funnel and delivery flow as a living demonstration of what GoHighLevel can do for a client, if you're an agency. Since the same course/membership tooling you're using to sell your own product is available to every client sub-account, walking a prospective client through your own working example is often more convincing than any slide deck.

## Try it yourself

If you have a test sub-account available, build a minimal one-lesson course, attach it to a $0 or test-mode offer, and complete a full test purchase yourself, from sales page to checkout to logging into the learner portal, to see the entire chain work end to end.`,
        },
      ],
    },
    {
      title: "Reputation Management",
      lessons: [
        {
          slug: "automated-review-requests",
          title: "Automated Review Requests",
          estimatedMinutes: 7,
          content: `# Automated Review Requests

Reputation Management is GoHighLevel's toolset for getting more (and better) public reviews, systematically rather than by hoping happy customers remember to leave one unprompted.

## Why automation matters here

Businesses that switch from manually asking for reviews to automatically requesting them right after a service or purchase typically see a large jump in review volume, since the biggest barrier to getting reviews usually isn't customer satisfaction, it's simply that almost nobody leaves a review unless asked at the right moment.

## How a review request works

A review request, sent by email and/or SMS, invites a customer to rate their experience, commonly on a 1-5 star scale, and includes a link to a hosted review-collection page. Automated requests are typically triggered off a real business event: an appointment marked "Completed," an invoice marked "Paid," or a set number of days after a purchase.

## Step-by-step: setting up an automated request

1. Go to Reputation, Requests (or configure it via a Workflow using a "Request Review" action).
2. Choose the trigger event (for example, appointment completed, or X days after purchase).
3. Set up the message template (email and/or SMS) with the review link included.
4. Connect the review destination(s), typically Google Business Profile and/or Facebook, so the request routes to the platform(s) you want more reviews on.
5. Publish and test with a real or sandbox trigger event.

## Common mistake

Sending review requests immediately after every transaction regardless of how the interaction actually went, including cases you already know went poorly (a delayed service, a complaint). Sending an automatic "please review us" message right after a bad experience often produces a negative public review that a slightly later, more thoughtful outreach might have avoided or addressed privately first. Consider excluding contacts tagged with a recent complaint from automated review sequences.

## Pro tip

Time the request to the moment satisfaction is highest, not just to a fixed delay after purchase. For a service business, that's often right after the appointment when the value is freshest in the customer's mind, not a generic "7 days later" timer that might land well after the good feeling has faded.`,
        },
        {
          slug: "managing-and-responding-to-reviews",
          title: "Managing & Responding to Reviews",
          estimatedMinutes: 6,
          content: `# Managing & Responding to Reviews

Once review requests start generating responses, GoHighLevel gives you a central place to see and respond to them, without logging into Google Business Profile and Facebook separately.

## The smart routing pattern

A common and effective setup: if a customer rates the experience highly (typically 4 or 5 stars) on the internal request form, they're immediately redirected to leave that same positive review publicly on Google or Facebook; if they rate it low (1-3 stars), they're instead directed to a private internal feedback form. This captures public praise where it's most valuable, while routing dissatisfaction to a private channel where the business can actually address it before it becomes a public review.

## Responding to reviews in one place

The Reputation dashboard typically shows incoming Google and Facebook reviews together, letting you read and respond to them directly from GoHighLevel rather than switching between each platform's own dashboard, along with basic analytics: average rating, review volume over time, and rating distribution.

## Step-by-step: responding to a new review

1. Go to Reputation, Reviews (or similar) and open the new/unresponded review.
2. Read the full review and any internal notes on the associated contact, if it's a known customer.
3. Draft a genuine, specific response, acknowledging what they mentioned rather than a generic canned reply, especially for critical reviews.
4. Publish the response directly from GoHighLevel; it posts back to the original platform (Google or Facebook).

## Common mistake

Responding to negative reviews defensively or with a copy-pasted generic response. Prospective customers reading reviews often pay as much attention to how a business responds to criticism as to the complaint itself; a thoughtful, non-defensive response to a bad review can actually build more trust than having no negative reviews at all.

## Try it yourself

Draft (without necessarily sending) a response to a genuinely negative hypothetical review for a business you know, focusing on acknowledging the specific issue and describing a concrete resolution, rather than a generic apology.`,
        },
        {
          slug: "review-widgets-on-your-site",
          title: "Review Widgets on Your Site",
          estimatedMinutes: 6,
          content: `# Review Widgets on Your Site

Collecting and responding to reviews is only half the value; displaying them prominently on a website or funnel converts that reputation into visible social proof for new prospects.

## Widget types

GoHighLevel offers several review widget formats: a standard grid/list display of recent reviews, a carousel that rotates through testimonials, and a floating badge widget, a small, always-visible badge (often in a page corner) that continuously cycles through top reviews without taking up dedicated page space.

## Customization

Widgets typically support a full visual style editor: colors, fonts, star icon styles, and which specific reviews or platforms to pull from (for example, only Google reviews, or a combined feed of Google and Facebook). Some versions also offer AI-assisted summary options, condensing many reviews into a short trust-building summary line alongside the individual reviews.

## Step-by-step: adding a review widget to a page

1. Go to Reputation, Widgets and create or select a widget, choosing its type (grid, carousel, floating badge) and style.
2. Configure which reviews/platforms feed into it, and any minimum star rating filter (many businesses only display 4 and 5 star reviews publicly, while still collecting and responding to lower ratings internally).
3. Copy the embed code, or, if building directly inside the Sites page builder, drag the native Review Widget element onto the page and select the configured widget.
4. Preview the live widget on the page and confirm it updates as new qualifying reviews come in.

## Common mistake

Embedding a review widget once and never revisiting it. A widget frozen with old reviews (or empty because the review-source connection quietly broke) actively undercuts credibility, since visitors can tell when testimonials look stale or the widget looks broken. Periodically check that widgets are still pulling live, current reviews.

## Pro tip

Place a review widget near the point of decision on a page (right above a call-to-action button or an order form), not just buried at the bottom. Social proof is most persuasive exactly when a visitor is weighing whether to commit.`,
        },
      ],
    },
    {
      title: "Reporting & Analytics",
      lessons: [
        {
          slug: "attribution-reporting",
          title: "Attribution Reporting: Conversion & Source Reports",
          estimatedMinutes: 8,
          content: `# Attribution Reporting: Conversion & Source Reports

Attribution Reporting answers the question every marketer eventually asks: "where did this lead, appointment, or sale actually come from?" GoHighLevel provides two related but distinct attribution views: Conversion Reporting and Source Reporting.

## Conversion Reporting

Conversion Reporting focuses on outcomes over time: revenue generated, number of opportunities created, leads closed (won), total contacts added, and session/visit counts, typically plotted as trend graphs so you can see whether performance is improving, flat, or declining over a chosen date range. This view is best for a high-level "how is the business trending" check.

## Source Reporting

Source Reporting breaks the same kinds of outcomes down by where the traffic or lead actually originated: a specific ad campaign, an organic search visit, a referral link, a specific funnel, or a specific form. This is the view that answers "which channel is actually working," and it's what lets a business (or an agency reporting to a client) make a real case for shifting ad spend toward what's producing results and away from what isn't.

## How attribution data gets captured

Accurate attribution depends on UTM parameters (utm_source, utm_medium, utm_campaign, etc.) being present on the links that bring visitors in, and on GoHighLevel's own tracking being correctly installed on the destination pages (this ties directly back to the tracking codes and domain setup covered in the Sites module, and the ad account connections covered in the Marketing module). Without consistent UTM tagging on outbound links, this data degrades into a generic "direct/unknown" bucket that isn't actionable.

## Step-by-step: reviewing attribution for a campaign

1. Go to Reporting, Attribution (naming can vary slightly by account version).
2. Select the date range matching your campaign or reporting period.
3. Review the Conversion Report for overall trend, then switch to Source Reporting to break results down by channel/campaign.
4. Cross-reference against connected Ad Reporting figures (spend, clicks) to calculate cost-per-lead and cost-per-sale by source.

## Common mistake

Drawing conclusions from attribution data when UTM tagging has been inconsistent (some campaigns tagged carefully, others left untagged). This produces a skewed picture where properly tagged channels look artificially responsible for less than their real share, and "direct/unknown" ends up overstated. Standardize a UTM naming convention across every campaign before relying on source reporting to make budget decisions.`,
        },
        {
          slug: "call-reporting",
          title: "Call Reporting",
          estimatedMinutes: 6,
          content: `# Call Reporting

Call Reporting focuses specifically on phone activity moving through GoHighLevel's built-in telephony (LC Phone), giving visibility into a channel that's historically been hard to measure with typical web analytics tools.

## What it shows

The Call Reporting view is generally split into incoming and outgoing calls, filterable by a specific phone number or across all numbers on the account. For each, you can see call counts, answer rates, average call duration, and, when using dedicated tracking numbers per marketing channel, exactly which campaign or source drove each specific inbound call.

## Why dedicated tracking numbers matter

Assigning a different phone number to each major marketing channel (one number on a Google Ads landing page, a different number on a direct mail piece, another on a Facebook ad) lets you attribute inbound calls back to the specific source that generated them, the same way UTM parameters attribute web form submissions. Average call duration also serves as a rough lead-quality signal: very short calls across a given source may indicate that source is generating lower-intent leads even if the raw call volume looks good.

## Step-by-step: setting up channel-level call tracking

1. Claim additional phone numbers under Settings, Phone Numbers, one per channel you want to track separately.
2. Assign each number to the specific landing page, ad, or offline material for that channel.
3. Route all numbers to the same destination (a team, an IVR, or a specific rep) so the customer experience is consistent regardless of which number they called.
4. Review Call Reporting periodically, comparing volume and duration across numbers/channels.

## Common mistake

Only reviewing call reporting after a problem is already suspected (a client complaining calls aren't being answered), rather than checking it proactively. Missed-call rate is often a completely fixable operational issue (understaffed phone coverage, an unclear IVR menu) that simply goes unnoticed without a regular reporting habit.

## Pro tip

Call Reporting, note-taking, and Conversations are related but distinct: read appointment notes and conversation transcripts alongside raw call metrics when trying to diagnose why a particular channel's calls aren't converting, since the numbers alone won't tell you what was actually said.`,
        },
        {
          slug: "agency-and-team-reporting",
          title: "Agency & Team Performance Reporting",
          estimatedMinutes: 6,
          content: `# Agency & Team Performance Reporting

Beyond marketing attribution, GoHighLevel provides reporting focused on how individual team members and, for agencies, entire client sub-accounts are performing.

## Agent/team reporting

Agent Reporting tracks activity and outcomes per staff member: manual calls made, emails sent, appointments booked, and response times, letting a sales manager see not just pipeline totals but who on the team is actually driving activity and results. This is useful both for coaching underperforming reps and for recognizing what a top performer is doing differently.

## Agency-level rollup reporting

For agencies managing multiple sub-accounts, agency-level dashboards can roll up key metrics (new leads, appointments, revenue) across all client accounts at once, useful for spotting a client whose numbers have quietly dropped before the client themselves raises it as a complaint.

## Step-by-step: reviewing team performance

1. Go to Reporting, Agent Reporting (or the agency-level equivalent for a multi-account rollup).
2. Filter by date range and, if needed, by specific team member or sub-account.
3. Compare activity metrics (calls, texts, emails sent) against outcome metrics (appointments booked, deals won) to see not just effort but effectiveness.
4. Export or screenshot relevant views for use in a team meeting or a client-facing performance review.

## Common mistake

Judging team performance purely on activity volume (number of calls made) without pairing it against outcomes (appointments booked, deals closed). A rep with high call volume but a low booking rate may need coaching on call quality, not encouragement to make even more calls.

## Try it yourself

If you manage or can view an agency account with multiple sub-accounts, open the rollup reporting view and identify which single client sub-account has the largest month-over-month change (positive or negative) in a key metric like new leads or booked appointments; that's usually the account most worth a proactive check-in.`,
        },
      ],
    },
    {
      title: "Agency Settings: Snapshots, White-Label & Integrations",
      lessons: [
        {
          slug: "snapshots-cloning-deploying",
          title: "Snapshots: Cloning & Deploying Your Systems",
          estimatedMinutes: 8,
          content: `# Snapshots: Cloning & Deploying Your Systems

Snapshots are arguably the single most important tool for any agency running multiple client sub-accounts. A Snapshot is a packaged copy of a sub-account's configuration, funnels and websites, workflows, email/SMS templates, pipelines, custom fields, calendars, and surveys, that can be deployed into a brand-new (or existing) sub-account in a few clicks.

## Why this matters for agencies

Without Snapshots, onboarding a new client means manually rebuilding every pipeline, workflow, and template from scratch, every single time. With a well-built Snapshot, an agency builds its proven system once, and every new client sub-account starts pre-loaded with it, turning a multi-day setup process into a task that can be completed in under an hour, with only client-specific customization left to do (business name, logo, phone number, specific offer details).

## Step-by-step: creating a Snapshot

1. Fully build out a sub-account the way you want to template it, treating it as your master/reference account.
2. Go to the Agency view, Snapshots, and click Create Snapshot.
3. Select the source sub-account to capture, and choose which categories of assets to include (you can often selectively exclude certain items, like real client-specific contacts, from being captured).
4. Save and name the Snapshot clearly (for example, "Dental Client - Full System v3"), including a version number if you expect to iterate on it.

## Step-by-step: deploying a Snapshot into a new sub-account

1. Create the new Sub-Account (or select an existing one you want to overwrite/add to).
2. During or after creation, choose Import Snapshot and select the relevant Snapshot.
3. Confirm the import, then go through and customize the client-specific details: business info, connected phone number, payment processor connection, and any offer/pricing specifics unique to that client.
4. Run the Launchpad checklist and test key workflows before considering the account live.

## Common mistake

Deploying a Snapshot and assuming everything works immediately without customization. Snapshots carry over structure and content, but connections (a specific Stripe account, a specific phone number, specific ad account integrations) are account-specific and must be reconnected for each new client. A workflow referencing a calendar or phone number that doesn't exist yet in the new account will need to be repointed.

## Pro tip

Version your Snapshots deliberately as you improve your system (v1, v2, v3), rather than only maintaining one "current" version. This lets you track which clients are running on an older version and selectively push updates, rather than being uncertain what each existing client's account actually contains.`,
        },
        {
          slug: "white-labeling-and-saas-mode",
          title: "White-Labeling & SaaS Mode",
          estimatedMinutes: 8,
          content: `# White-Labeling & SaaS Mode

White-labeling is what lets an agency present GoHighLevel to its clients as its own branded software product, rather than visibly reselling a third-party platform.

## What white-labeling covers

At the Agency level, white-label settings typically let you replace the GoHighLevel name and logo throughout the interface, connect a custom domain so the login and app URL show your own branding instead of a gohighlevel.com address, customize the mobile app's icon and name (on higher plan tiers) so clients download what looks like your own dedicated app, and customize outbound system emails (password resets, notifications) to come from your domain and branding.

## Step-by-step: setting up basic white-labeling

1. Go to Agency Settings, Company (or "Agency Branding").
2. Upload your logo and set your brand colors.
3. Go to Domains and connect a custom domain for the app itself, adding the required DNS records.
4. Update default system email sender names/addresses to match your brand rather than a generic default.
5. If eligible, configure custom mobile app branding through the relevant agency-level settings.

## SaaS Mode: turning this into a resold product

SaaS Mode lets an agency define its own pricing plans for sub-accounts, and have GoHighLevel automatically bill clients on a recurring basis under that pricing, track usage costs (SMS, email, phone minutes) and roll them into client billing or absorb them per your chosen model, and automatically suspend or reactivate a sub-account based on payment status, without manual intervention.

## Step-by-step: launching a basic SaaS plan

1. Go to Agency Settings, SaaS Configurator (or similar).
2. Define one or more pricing plans (monthly fee, included usage allowances, overage rates).
3. Connect your agency-level Stripe account to receive the client billing.
4. Assign new sub-accounts to a SaaS plan as you onboard them, or migrate existing manually-billed clients onto a plan.

## Common mistake

Turning on white-labeling for the interface but forgetting to also update outbound system emails and the sending domain, so a client eventually receives a password-reset email that visibly comes from GoHighLevel's own domain, breaking the illusion of a fully custom product. Audit every client-facing touchpoint (login page, emails, mobile app if used) for leftover unbranded elements.

## Pro tip

Decide on your SaaS pricing structure and usage-cost pass-through policy before onboarding your first paying client under it, not after. Retroactively changing pricing or discovering you're absorbing more usage cost than expected is a much harder conversation to have with an existing client than getting it right from the start.`,
        },
        {
          slug: "custom-values-integrations-marketplace",
          title: "Custom Values, Integrations & the Marketplace/API",
          estimatedMinutes: 7,
          content: `# Custom Values, Integrations & the Marketplace/API

The final layer of agency-level configuration covers the tools that connect GoHighLevel to everything outside itself, and the account-wide shortcuts that make managing many templated sub-accounts practical.

## Custom Values, revisited at scale

As covered in the Contacts module, Custom Values are reusable, account-wide placeholders (a business phone number, an address, a special offer expiration date) referenced across templates. At the agency level, these become especially valuable inside Snapshots: build your templates referencing Custom Values like {{custom_values.business_phone}} rather than hardcoding a specific number, and each new client only needs to update the Custom Value once for every template referencing it to update automatically.

## Native integrations

Under Settings, Integrations, a sub-account can connect directly to common outside tools without custom development: Stripe/PayPal (Payments), Facebook/Instagram/Google Business Profile (Conversations and Marketing), Google Calendar/Outlook (two-way calendar sync for Calendars), Zapier (for connecting to thousands of other apps that don't have a native integration), and QuickBooks (for accounting sync), among others.

## The Marketplace and API

For anything not covered by a native integration, GoHighLevel exposes a REST API and hosts a Marketplace of third-party apps built by outside developers on top of that API, ranging from specialized reporting tools to industry-specific add-ons. Developers (or technical agencies) can also build custom integrations directly against the API using API keys or OAuth, for example, a custom app that syncs GoHighLevel contacts with an external inventory system.

## Step-by-step: connecting a Zapier automation

1. Go to Settings, Integrations and locate Zapier (or set up an Inbound/Outbound Webhook workflow action directly, for accounts without a native Zapier app connection).
2. Authenticate the connection using an API key or OAuth login, depending on the integration method offered.
3. In Zapier, build a Zap using GoHighLevel as either the trigger (something happens in GHL, do something elsewhere) or the action (something happens elsewhere, do something in GHL).
4. Test the Zap with real sample data before relying on it for live business processes.

## Common mistake

Hardcoding client-specific details (a phone number, a business name) directly into workflow text and email templates inside a Snapshot instead of using Custom Values. This forces you to manually hunt through every template for every client to update something that should have been a single Custom Value change.

## Pro tip

Before reaching for the API or a custom developer integration, check the Marketplace first. A large share of "I need GoHighLevel to talk to X" requests already have an existing, tested Marketplace app or a straightforward Zapier connection, which is far less work than building and maintaining a custom API integration.`,
        },
      ],
    },
    {
      title: "Capstone: Building a Complete Client System",
      lessons: [
        {
          slug: "capstone-end-to-end-client-system",
          title: "Capstone: Setting Up a Complete Client System End-to-End",
          estimatedMinutes: 12,
          content: `# Capstone: Setting Up a Complete Client System End-to-End

You've now gone section by section through GoHighLevel: the Agency/Sub-Account structure, Contacts, Conversations, Calendars, Opportunities, Payments, Marketing, Forms/Surveys, Workflows, Sites, Memberships, Reputation Management, Reporting, and agency-level Settings. This final lesson pulls all of it together into one realistic build: taking a new client from a blank sub-account to a fully running system.

## The scenario

Imagine you're onboarding a local business, say, a med spa, that wants leads captured online, automatically followed up with, booked onto a calendar, tracked through a sales pipeline, invoiced, and asked for a review afterward, all with minimal manual staff effort.

## Step-by-step: the full build

1. **Create the Sub-Account.** Set business name, timezone, and address. Deploy your agency's Snapshot if you have one built for this vertical, or start from a blank account if this is a genuinely new build.
2. **Run the Launchpad.** Verify a phone number for SMS/calling, verify the sending email domain, and complete the business profile.
3. **Set up Users.** Invite the client's front-desk staff with restricted permissions (Conversations and Calendars only) and any sales staff with broader access (Opportunities, Payments visibility).
4. **Build the Pipeline.** Create a "New Client" pipeline with stages like New Lead, Contacted, Consultation Booked, Proposal Sent, Won, Lost.
5. **Build the Calendar.** Create a "Free Consultation" booking calendar (Round Robin if multiple staff can take consultations), with a 24-hour and 1-hour SMS reminder configured, and connect it so a booking automatically creates an opportunity in the "Consultation Booked" stage.
6. **Build the lead capture Funnel.** A short landing page describing the offer, with an embedded Form (name, phone, email, one qualifying question) that flows directly into the booking Calendar step.
7. **Connect Payments.** Connect the client's Stripe account, create Products/Prices for their core service packages, and set up an Order Form or Invoice flow for post-consultation purchases.
8. **Build the core Workflow.** Trigger: Form Submitted. Actions: instant SMS/email confirmation, internal notification to staff, and enrollment into a nurture sequence with a Goal step that exits the sequence once the consultation is booked.
9. **Build the no-show and follow-up Workflows.** No-show trigger re-engages with a rebooking link; Invoice Paid trigger moves the opportunity to Won and starts an onboarding sequence; Appointment Completed trigger sends an automated review request after an appropriate delay.
10. **Set up Reputation Management.** Configure smart routing so 4-5 star responses go to a public Google review, while 1-3 star responses route to a private feedback form.
11. **Set up Reporting.** Confirm UTM tagging conventions for any ad campaigns, connect the ad account(s), and set up the Dashboard with widgets relevant to this business (pipeline value, appointments booked, review rating).
12. **Test the entire chain yourself.** Submit the form as a test lead, confirm the confirmation message and internal notification fire, book the consultation, confirm the pipeline stage updates, simulate a completed appointment and a paid invoice, and confirm the review request goes out. Only after a full clean test run should the system go live for real client traffic.

## Common mistake

Building each piece correctly in isolation but never testing the full chain end to end before launch. A working form, a working calendar, and a working workflow individually don't guarantee they're correctly wired to each other; the only way to catch a broken handoff between sections is to run one real test all the way through, exactly like a real customer would experience it.

## Pro tip

Once this system works well for one client, capture it as a Snapshot immediately, before you move on to the next client build. The value of everything you've learned in this course compounds fastest when your working systems become reusable templates rather than one-off builds you'd have to reconstruct from memory each time.

## Try it yourself

If you have access to a sandbox or trial account, attempt to build a simplified version of this entire chain, even with just one pipeline, one calendar, one form, and one workflow, end to end, and test it as a real lead would experience it. Completing this once, fully, is the single best way to cement everything covered in this course.`,
        },
      ],
      quiz: {
        title: "Tier 3 Checkpoint: Automation, Agency Tools & Mastery",
        questions: [
          {
            text: "In the Workflow Builder, what is the role of a Trigger?",
            optionA: "It is an optional decoration with no functional effect",
            optionB: "It is the event that starts the workflow, such as a form submission or a tag being added",
            optionC: "It always requires a webhook to function",
            optionD: "It only works with Calendar-related events",
            correctOption: "B",
          },
          {
            text: "What does a Goal step do inside a workflow?",
            optionA: "It deletes the contact from the account once reached",
            optionB: "It immediately exits a contact from the remaining workflow steps once its condition becomes true",
            optionC: "It pauses the entire workflow for all contacts until manually resumed",
            optionD: "It sends a webhook to an external CRM automatically",
            correctOption: "B",
          },
          {
            text: "What is the key structural difference between a Funnel and a Website in the Sites area?",
            optionA: "Funnels support free navigation between many pages, while Websites only allow one page",
            optionB: "A Funnel is a linear, step-by-step sequence built toward one specific action and supports split testing, while a Website allows free navigation across pages and does not",
            optionC: "Websites cannot include a Form, while Funnels can only include Forms",
            optionD: "There is no meaningful difference between the two",
            correctOption: "B",
          },
          {
            text: "In the Course/Membership area, what is the purpose of an Offer?",
            optionA: "It is a discount code applied automatically to all products",
            optionB: "It bundles one or more courses together and attaches a payment product/price, granting access automatically on purchase",
            optionC: "It is only used for free courses with no payment involved",
            optionD: "It replaces the need for building any course modules or lessons",
            correctOption: "B",
          },
          {
            text: "What is the recommended 'smart routing' pattern for review requests in Reputation Management?",
            optionA: "Route every response, regardless of rating, straight to a public review platform",
            optionB: "Route high ratings (4-5 stars) to a public review platform and low ratings (1-3 stars) to a private internal feedback form",
            optionC: "Ignore ratings below 5 stars entirely and never collect them",
            optionD: "Only collect reviews once per year regardless of transaction volume",
            correctOption: "B",
          },
          {
            text: "What is the main difference between Conversion Reporting and Source Reporting in Attribution?",
            optionA: "Conversion Reporting focuses on overall outcome trends over time, while Source Reporting breaks those outcomes down by where the traffic or lead originated",
            optionB: "Source Reporting only tracks phone calls",
            optionC: "Conversion Reporting is only available at the agency level",
            optionD: "They are identical views with different names",
            correctOption: "A",
          },
          {
            text: "Why do dedicated tracking phone numbers matter for Call Reporting?",
            optionA: "They are required for basic call functionality to work at all",
            optionB: "They let a business attribute inbound calls back to the specific marketing channel or campaign that generated them",
            optionC: "They automatically transcribe every call for free",
            optionD: "They replace the need for any SMS-capable number",
            correctOption: "B",
          },
          {
            text: "What is a Snapshot most accurately described as?",
            optionA: "A single screenshot of a client's dashboard for reporting purposes",
            optionB: "A packaged copy of a sub-account's pipelines, workflows, funnels, templates, and other setup that can be deployed into new or existing sub-accounts",
            optionC: "A billing report generated monthly for agency invoicing",
            optionD: "A backup of only a sub-account's contact list",
            correctOption: "B",
          },
          {
            text: "What does enabling SaaS Mode primarily allow an agency to do?",
            optionA: "Automatically bill sub-account clients on a recurring basis under the agency's own pricing and branding",
            optionB: "Disable all client access to their own sub-account",
            optionC: "Convert every workflow into a Snapshot automatically",
            optionD: "Remove the need to connect any payment processor",
            correctOption: "A",
          },
          {
            text: "In a well-built Snapshot used across many client sub-accounts, why should templates reference Custom Values (like a business phone number) instead of hardcoded text?",
            optionA: "Custom Values are required by law for SMS compliance",
            optionB: "Updating one Custom Value automatically updates every template referencing it, instead of requiring manual edits across every template for each client",
            optionC: "Hardcoded text cannot be used in email templates at all",
            optionD: "Custom Values only work inside Calendars, not templates",
            correctOption: "B",
          },
        ],
      },
    },
  ],
};

export default content;
