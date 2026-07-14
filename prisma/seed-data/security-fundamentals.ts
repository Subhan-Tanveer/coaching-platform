import type { CourseContentSeed } from "./types";

const content: CourseContentSeed = {
  courseSlug: "security-fundamentals",
  courseTitle: "Security Fundamentals",
  courseDescription:
    "A practical, developer-focused curriculum covering the mindset, attack techniques, and defenses behind building secure applications — from the OWASP Top 10 to injection, XSS, authentication, cryptography, and secure API design.",
  modules: [
    {
      title: "Thinking Like an Attacker: AppSec Foundations",
      lessons: [
        {
          slug: "why-appsec-matters",
          title: "Why Application Security Is Every Developer's Job",
          estimatedMinutes: 7,
          content: `# Why Application Security Is Every Developer's Job

For a long time, security was treated as somebody else's problem — a separate team that ran scans after the code was "done" and threw a report over the wall. That model doesn't hold up anymore. Modern software ships continuously, integrates dozens of third-party services, and gets probed by automated tools within minutes of being exposed to the internet. The only realistic way to keep up is for the people writing the code to also be the people thinking about how it can be abused.

## Security is a quality attribute, not a feature

You already think about performance, reliability, and maintainability while you write code — you don't wait for a "performance team" to bolt speed on afterward. Security belongs in that same category. A feature that can be trivially exploited to leak other users' data isn't "done," no matter how well it satisfies the functional requirements. Treating security as a checkbox at the end, rather than a property of the design, is why the same handful of mistakes — unvalidated input, missing access checks, secrets left in source control — show up in breach reports year after year.

## The cost curve

A flaw caught while you're typing it — by a linter, a code review comment, or your own second thought — costs a few minutes. The same flaw caught by an automated scan before release costs a ticket and a delayed deploy. Caught in production by an attacker, it costs an incident response process, a disclosure decision, customer trust, and potentially legal exposure. The underlying defect is identical in all three cases; only the cost of fixing it changes. This is the strongest argument for building security awareness into everyday development rather than treating it as a release-gate activity.

## You don't need to be a security researcher

This course is not about becoming a penetration tester. It's about recognizing the handful of recurring failure patterns — unvalidated input, missing authorization checks, weak cryptography, insecure defaults — that account for the overwhelming majority of real-world application vulnerabilities, and building the habit of asking "how could this be misused?" as naturally as you already ask "how could this fail under load?"

## Mental model

Treat every piece of code you write as running in a hostile environment: inputs are adversarial until proven otherwise, dependencies can have bugs or be compromised, and any assumption you don't explicitly enforce will eventually be violated by someone probing for a way in. You don't need to be paranoid about every line — but you do need to know which lines matter, and this course is about training that instinct.`,
        },
        {
          slug: "trust-boundaries-attack-surface",
          title: "Trust Boundaries and Attack Surface",
          estimatedMinutes: 8,
          content: `# Trust Boundaries and Attack Surface

Two ideas do more to organize secure-coding thinking than any specific vulnerability list: **trust boundaries** and **attack surface**. Once you can spot them in a system, most of the OWASP Top 10 becomes a description of what happens when they're ignored.

## Trust boundaries

A trust boundary is any point where data crosses from a context you control (or trust) less into one you control (or trust) more — or vice versa. Examples:

- A request arriving from a user's browser into your API server
- A response coming back from a third-party payment provider
- A file uploaded by a user before it's processed by your server
- Data read from a database that other services also write to
- A message pulled from a queue that other teams publish to
- An environment variable or config value set by an external deployment pipeline

Every one of these crossings is a place where you must ask: "do I actually know what's in this data, or am I assuming it's safe because it came from somewhere I usually trust?" The mistake behind most real-world vulnerabilities is treating data as validated because it *crossed* a trust boundary safely once, rather than validating it *at* the boundary, every time.

## Attack surface

Attack surface is the sum of every point where an outside actor can attempt to interact with your system: every HTTP endpoint, every form field, every HTTP header your code reads, every cookie, every file upload, every webhook receiver, every admin panel, every dependency your code pulls in and executes. The bigger the attack surface, the more places a defect can hide, and the harder it is to review all of them carefully.

Reducing attack surface is one of the highest-leverage things you can do for security, and it's often free:

- Turn off or remove endpoints, debug routes, and admin panels that aren't in active use
- Don't expose internal APIs to the public internet just because it's convenient
- Request the minimum database permissions and OAuth scopes a service actually needs
- Remove unused dependencies instead of leaving them installed "in case"

## A simple mental diagram

Picture a request's path: browser, then a load balancer, then an API server, then application logic, then a database. Each step is a trust boundary. It's tempting to validate input once, at the outermost edge, and assume everything downstream is now safe. In practice, internal services get compromised, other teams' code has bugs, and data gets combined in ways the original validation didn't anticipate. The safer mental model is: validate at every boundary you control, not just the first one.

## Common mistake

Assuming that because a request passed through authentication middleware, every value inside it is now trustworthy. Authentication tells you *who* is asking. It says nothing about whether the specific values they sent — a product ID, a file path, a quantity field — are valid, in range, or theirs to touch. That's a separate check, made at a separate boundary.`,
        },
        {
          slug: "common-attack-vectors-overview",
          title: "Common Attack Vectors Overview",
          estimatedMinutes: 7,
          content: `# Common Attack Vectors Overview

An **attack vector** is a path an attacker uses to reach and exploit a weakness in your system. You don't need to memorize an exhaustive list, but you should be able to recognize the shapes these attacks take, because most real incidents are a variation on one of a small set of themes.

## The vectors you'll encounter constantly

- **Injection** — untrusted input is inserted into a command, query, or interpreter (SQL, shell commands, LDAP queries, template engines) in a way that changes its meaning.
- **Cross-Site Scripting (XSS)** — untrusted input ends up rendered as HTML or JavaScript in someone else's browser, letting an attacker run code in that user's session.
- **Cross-Site Request Forgery (CSRF)** — a malicious page tricks a logged-in user's browser into firing a request against your site, using the victim's own authenticated session.
- **Broken authentication and session management** — weak password storage, predictable session tokens, or sessions that never expire.
- **Broken access control** — the system correctly identifies who a user is, but fails to check whether they're allowed to touch a specific resource.
- **Security misconfiguration** — default credentials, verbose error messages, open cloud storage buckets, unnecessary services left running.
- **Vulnerable and outdated components** — a library or framework your code depends on has a known, published vulnerability.
- **Server-Side Request Forgery (SSRF)** — an attacker tricks your server into making a request to an internal or unintended destination on their behalf.
- **Insecure deserialization** — untrusted data is turned back into objects or structures in a way that lets an attacker control program behavior.

## The common thread

Almost every vector above comes down to one root cause: trusting data that originated outside your system's boundary — a form field, an HTTP header, a file upload, a third-party API response, or a serialized object pulled from cache. The specific mechanics differ, but the underlying failure is always the same: something crossed a trust boundary without being checked, and the receiving code assumed it was safe.

## Why the list keeps looking similar

Attack vectors don't really change year to year — SQL injection has been on security lists for decades and is still common. What changes is where they show up: it used to be desktop applications and traditional web forms; now it's GraphQL resolvers, serverless functions, mobile app backends, and CI/CD pipelines. The pattern is portable even when the technology isn't, which is why understanding the *mechanism* behind an attack matters more than memorizing where it applies today.

## Checklist: spotting risk before it ships

- Does this code accept input from outside the system (user, third-party API, file, queue message)?
- Is that input used to build a query, command, file path, URL, or piece of markup?
- Is there an explicit check — not an assumption — that the input is well-formed and that the caller is allowed to request it?
- If this input turned out to be malicious, what's the worst it could do with the privileges this code runs under?`,
        },
      ],
    },
    {
      title: "The OWASP Top 10 in Practice",
      lessons: [
        {
          slug: "what-is-owasp-top-10",
          title: "What Is OWASP and Why the Top 10 Matters",
          estimatedMinutes: 6,
          content: `# What Is OWASP and Why the Top 10 Matters

**OWASP** (the Open Worldwide Application Security Project) is a nonprofit foundation that produces free, community-maintained resources on application security — the Top 10 list, the Cheat Sheet Series, testing guides, and open-source tools. Nobody pays for a seat at the table; the material is written and reviewed by practitioners who volunteer their time, which is part of why it's treated as an industry-neutral reference point rather than a vendor's marketing document.

## What the Top 10 actually is

The **OWASP Top 10** is an awareness document, not a compliance checklist and not an exhaustive vulnerability catalog. It ranks the categories of weakness that show up most often and cause the most damage across real applications, based on a combination of contributed vulnerability data and a practitioner survey. Each edition groups many specific CWEs (Common Weakness Enumeration entries) into broader categories so the list stays memorable and prioritization stays possible — nobody can defend against a list of two hundred CWEs in order, but a list of ten categories is something a team can actually plan around.

This course uses the **OWASP Top 10:2025**, the current edition. The categories are:

1. **A01:2025 – Broken Access Control** — the system fails to enforce what an authenticated user is actually allowed to do (this category now also absorbs Server-Side Request Forgery).
2. **A02:2025 – Security Misconfiguration** — insecure defaults, unnecessary features enabled, or missing hardening.
3. **A03:2025 – Software Supply Chain Failures** — risk introduced through dependencies, build pipelines, and third-party components.
4. **A04:2025 – Cryptographic Failures** — missing, weak, or misapplied cryptography that exposes sensitive data.
5. **A05:2025 – Injection** — untrusted input changes the meaning of a query, command, or interpreter call.
6. **A06:2025 – Insecure Design** — the vulnerability is baked into the architecture, not just a coding slip.
7. **A07:2025 – Authentication Failures** — weaknesses in verifying who a user is.
8. **A08:2025 – Software or Data Integrity Failures** — code or data is trusted without verifying it hasn't been tampered with.
9. **A09:2025 – Security Logging and Alerting Failures** — attacks go undetected because nothing was logged, or logs were never watched.
10. **A10:2025 – Mishandling of Exceptional Conditions** — errors, edge cases, and failure paths that leave the system in an insecure state.

## Why the ranking moves between editions

Comparing the 2025 list to the well-known 2021 edition, access control still sits at #1, but Security Misconfiguration moved up, and Software Supply Chain Failures is new as its own category — reflecting a real shift in how attackers have been operating, targeting build pipelines and third-party packages rather than only application code. The Top 10 is refreshed periodically for exactly this reason: it's meant to track where real damage is currently happening, not to be a fixed catechism.

## How to use this list as a developer

Don't treat "we covered the Top 10" as a finish line — it's a floor, not a ceiling. Its real value is as shared vocabulary: when a teammate says "that's an A05 injection risk" or "this is a broken access control issue," everyone on the team knows roughly what class of problem is being discussed and roughly how serious it tends to be. The rest of this course walks through each category in enough depth to actually prevent it, not just recognize its name.`,
        },
        {
          slug: "access-control-misconfig-supply-chain",
          title: "Access Control, Misconfiguration, and Supply Chain Risks",
          estimatedMinutes: 9,
          content: `# Access Control, Misconfiguration, and Supply Chain Risks

The top three categories in the OWASP Top 10:2025 share a theme: each one is about the system failing to enforce a boundary that was supposed to exist. Let's look at each at a high level — later modules in this course go much deeper on each of them.

## A01:2025 — Broken Access Control

This is the most common and most damaging category on the list, holding the #1 spot for multiple editions running. It covers any situation where the system correctly authenticates a user (it knows who they are) but fails to authorize the action (it doesn't properly check what they're allowed to do). Classic examples: changing an ID in a URL to view another user's invoice, calling an admin-only API endpoint directly because the frontend just hides the button, or a regular user editing an object they don't own because the server trusts a client-supplied owner field.

As of the 2025 edition, **Server-Side Request Forgery (SSRF)** — where an attacker tricks your server into making a request on their behalf to an internal or unintended destination — has been folded into this category, since at its core SSRF is also a failure to enforce which destinations a piece of server logic is allowed to reach.

## A02:2025 — Security Misconfiguration

Software can be implemented perfectly and still be exposed because of how it's deployed and configured: default admin credentials never changed, cloud storage buckets left publicly readable, verbose stack traces shown to end users, unnecessary services and ports left running, or security headers never set. This category moved up significantly in the 2025 ranking, reflecting how often cloud and infrastructure misconfiguration — rather than application code bugs — is the actual entry point attackers use.

## A03:2025 — Software Supply Chain Failures

Modern applications are assembled from dozens or hundreds of third-party packages, base container images, and CI/CD tooling. This category — new as its own entry in 2025 — covers the risk introduced by that supply chain: a dependency with a known vulnerability, a compromised package registry account publishing a malicious update, a build pipeline with excessive permissions, or a dependency confusion attack that tricks your build into pulling an attacker's package instead of your internal one. It reflects a real shift in attacker behavior: compromising one popular package can compromise every application that depends on it, which is a far better return on effort than attacking one application at a time.

## The pattern underneath all three

None of these three categories are about a single missing input filter. They're about **enforcement gaps** — a check that should exist somewhere in the system (an authorization check, a hardened default, a trusted build artifact) but doesn't. That's why they sit at the top of the list: they tend to be systemic rather than local, one wrong assumption can affect every endpoint or every deployment, and they're often invisible until someone actively tests for them.

## Mental model

Ask, for every resource your code touches: "who is allowed to do this, specifically, and where is that enforced?" If the honest answer is "the UI doesn't show the button to other users" or "we haven't gotten around to configuring that yet" or "we trust that our dependencies are fine," you've found a gap in one of these three categories.`,
        },
        {
          slug: "injection-crypto-insecure-design",
          title: "Injection, Cryptographic Failures, and Insecure Design",
          estimatedMinutes: 9,
          content: `# Injection, Cryptographic Failures, and Insecure Design

## A04:2025 — Cryptographic Failures

This category covers what goes wrong around protecting sensitive data — not attacks on the math behind cryptographic algorithms (exceptionally rare in practice), but failures in how cryptography is used or omitted entirely: sensitive data transmitted in plaintext, passwords hashed with a fast general-purpose hash instead of a dedicated password-hashing algorithm, encryption keys hardcoded into source code, or sensitive data collected and stored when it didn't need to be at all. We cover this in depth in Tier 3.

## A05:2025 — Injection

Injection happens when untrusted input is passed to an interpreter — a SQL engine, an OS shell, an LDAP query, a template engine — in a way that lets the attacker change what that interpreter executes rather than just supplying a value to it. SQL injection is the best-known example, but the same root mechanism applies to command injection, NoSQL injection, and template injection. We spend an entire tier on this because it remains one of the most exploitable and most preventable categories on the list — the fix (parameterization, or separating code from data) is well understood and highly effective when actually applied.

## A06:2025 — Insecure Design

This is the category that's easiest to under-appreciate as "just" a coding issue, because it isn't one. Insecure design means the vulnerability was baked into the architecture or business logic before a single line of code was written — for example, a password-reset flow that emails a temporary password instead of a time-limited single-use token, or a checkout flow that trusts the client to report the price of an item. No amount of careful coding fixes a design that never accounted for the abuse case in the first place. The remedy is threat modeling and secure design patterns applied during planning, not just code review afterward — something this course returns to directly in its capstone module.

## Why these three sit together

Each of these categories illustrates a different point in the software lifecycle where security needs attention: A04 is about how you protect data once you've decided to collect it, A05 is about how you compose untrusted input into commands and queries at implementation time, and A06 is about whether the system was even designed to resist abuse before a single line of code existed. Seeing them side by side is a reminder that writing secure code is necessary but not sufficient — secure design and correct use of cryptography have to happen earlier and more broadly than the code itself.

## Checklist

- Is sensitive data being collected that doesn't strictly need to be, and if it must be collected, is it encrypted appropriately in transit and at rest?
- Does any code build a query, command, or interpreter call by concatenating untrusted input into it?
- Was this feature's abuse case (what happens if a user does the opposite of what we expect) considered during design, or only during a code review afterward?`,
        },
        {
          slug: "auth-integrity-logging-exceptions",
          title: "Authentication, Integrity, Logging, and Exceptional Conditions",
          estimatedMinutes: 9,
          content: `# Authentication, Integrity, Logging, and Exceptional Conditions

## A07:2025 — Authentication Failures

This category covers weaknesses in verifying who a user actually is: allowing weak or well-known passwords, permitting unlimited login attempts (making brute-forcing feasible), exposing session identifiers in URLs, or failing to invalidate sessions on logout or password change. It also covers credential-stuffing exposure — reusing the same password-checking logic across accounts without any rate limiting or anomaly detection lets an attacker test stolen credential lists from other breaches against your login form. We dedicate a full module in Tier 2 to authentication and session security.

## A08:2025 — Software or Data Integrity Failures

This category is about trusting code or data without verifying it hasn't been tampered with: applying software updates without verifying a cryptographic signature, deserializing data from an untrusted source into live objects, or relying on a CI/CD pipeline that doesn't verify the integrity of what it deploys. The common failure mode is that something is assumed to be what it claims to be, with no check that would catch it if it weren't.

## A09:2025 — Security Logging and Alerting Failures

Renamed in the 2025 edition (previously "Security Logging and Monitoring Failures") to emphasize that logging alone isn't enough — an attack that's logged but that nobody is alerted to might as well not have been logged at all. This category covers insufficient logging of security-relevant events (failed logins, access-control failures, high-value transactions), logs that don't include enough context to investigate an incident, and the absence of any alerting pipeline that would tell a human a suspicious pattern is happening in near-real time.

## A10:2025 — Mishandling of Exceptional Conditions

New to the Top 10 in the 2025 edition, this category covers the security consequences of poor error handling: a payment service that "fails open" (allows a transaction when its fraud-check dependency times out, instead of blocking it), an exception handler that leaks a stack trace containing internal details, or logical edge cases (empty input, negative numbers, unicode normalization quirks) that push the application into a state its author never intended. It's a recognition that a huge share of real vulnerabilities live in the unhappy path of the code — the branch nobody writes a test for.

## The pattern underneath all four

Each of these is a category where something was supposed to happen — verify identity, verify integrity, record and alert on suspicious activity, handle failure safely — and either didn't happen at all, or happened in a way that quietly failed. They're a reminder that security work isn't only about stopping an attacker's first move; it's also about making sure the system behaves safely when something has already gone wrong, been guessed correctly, or hasn't been checked.

## Mental model

For every sensitive action in your system, ask three questions: How do we know this request is really from who it claims to be? What happens if this step fails partway through? Would we even notice if someone were actively trying to abuse this right now? If any answer is "we haven't really thought about that," you've found a gap that maps to one of these four categories.`,
        },
      ],
    },
    {
      title: "Input Validation and Output Encoding Basics",
      lessons: [
        {
          slug: "input-validation-fundamentals",
          title: "Input Validation Fundamentals",
          estimatedMinutes: 8,
          content: `# Input Validation Fundamentals

Input validation is the practice of checking that data coming into your system actually matches what you expect before you act on it — the right type, the right shape, the right range, from an allowed set of values. It's the first line of defense against nearly every attack vector covered so far, but it's also widely misunderstood, because "validation" gets conflated with "sanitization" and "encoding," which are related but different tools.

## Allowlisting beats denylisting

There are two ways to define "valid" input: describe what's *allowed* (an allowlist, or positive validation) or describe what's *forbidden* (a denylist, or negative validation). Allowlisting is almost always the better choice, because it's a closed, finite, checkable set — you can enumerate exactly what you accept. Denylisting requires you to anticipate every malicious variant in advance, and attackers are specifically good at finding the one encoding, casing, or edge case you forgot to block.

\`\`\`text
Denylist (fragile):     reject input containing "<script>"
Allowlist (robust):     accept only letters, digits, spaces, ".", "_", "-", 1-50 chars, for a username field
\`\`\`

An attacker can trivially get past a denylist that blocks the literal string "<script>" by changing its casing or using an HTML entity encoding instead. An allowlist that only accepts a known-safe character set doesn't care what tricks the attacker tries — anything outside the allowed set is rejected, full stop.

## What to validate

- **Type** — is this actually a number, when a number was expected?
- **Length** — is this within a sane bound? An unbounded "name" field is a resource-exhaustion risk as much as a UX bug.
- **Format** — does an email address, phone number, or date actually match the expected pattern?
- **Range** — is a quantity or an ID a positive number within the range the business logic allows?
- **Membership** — is a value one of a fixed, known set of options (a country code, a status enum)?

## Where to validate

Validate on the server, always — client-side validation is a UX convenience, not a security control, because an attacker can simply skip your JavaScript and send requests directly to your API. It's fine and good practice to *also* validate on the client for a responsive user experience, but the server-side check is the one that actually protects the system, since it's the one an attacker cannot bypass by tampering with the request.

## Validation is not a silver bullet

Input validation reduces the shape of what gets into your system, but it does not automatically make that data safe to use in every context. A string that passes validation as "a valid product name" can still be dangerous if it's later rendered into HTML without encoding, or concatenated into a SQL query without parameterization. Validation answers "is this the kind of thing I expect?" — it doesn't answer "is this safe to use here, in this specific sink?" That second question is answered by output encoding and parameterization, which the next lesson covers.

## Checklist

- Does every field have an explicit type, length, and format check, defined as an allowlist where possible?
- Is validation enforced server-side, regardless of what client-side checks also exist?
- Are validation failures rejected outright (not silently truncated or "cleaned up") so malformed input never quietly becomes valid input?`,
        },
        {
          slug: "output-encoding-fundamentals",
          title: "Output Encoding Fundamentals",
          estimatedMinutes: 8,
          content: `# Output Encoding Fundamentals

If input validation answers "is this the kind of data I expect?", **output encoding** answers a different question: "how do I safely place this data into the specific context I'm about to put it in?" The two are complementary, and confusing them is one of the most common sources of real vulnerabilities — particularly Cross-Site Scripting.

## Why validation alone doesn't protect output

Imagine a comment field that validates its input as "any string up to 500 characters" — a perfectly reasonable validation rule. Now imagine that string is a script tag designed to steal cookies. It's a valid comment by the validation rule (it's a string, under 500 characters), but if it's rendered directly into an HTML page, the browser will execute it as a script. The data wasn't invalid — the problem is that it was placed into a context (HTML) without being encoded for that context.

## Encoding is context-specific

The same piece of data needs to be encoded differently depending on where it's being inserted:

- **HTML body context** — encode angle brackets, ampersands, and quote characters as HTML entities so they display as text instead of being parsed as markup.
- **HTML attribute context** — quote the attribute and encode characters that could break out of the quotes.
- **JavaScript context** — encode so the string can't break out of a quoted string literal or contain characters JavaScript would interpret specially.
- **URL context** — percent-encode characters that have special meaning in a URL.
- **SQL context** — this one isn't solved by encoding at all; it's solved by parameterized queries, covered in Tier 2.

\`\`\`text
Raw value:        Hi, I'm <b>here</b>
HTML-encoded:     Hi, I&#39;m &lt;b&gt;here&lt;/b&gt;
\`\`\`

Notice the encoded version still represents the same underlying text — it just can no longer be interpreted as markup by the browser. That's the whole idea: encoding preserves meaning for the end viewer while stripping the ability to be interpreted as code by the layer rendering it.

## Let your framework do it

Every modern templating engine and frontend framework (React, Vue, Django templates, Rails' ERB, Handlebars in escaped mode) HTML-encodes values by default when you use its normal interpolation syntax. The dangerous pattern is almost always an explicit escape hatch — an unescaped-HTML prop in React, a "safe" filter in Jinja2, a raw-HTML directive in Vue — used on a value that came from user input. These escape hatches exist for legitimate cases (rendering trusted, pre-sanitized HTML), but using them on unvalidated user content is how encoding gets skipped and XSS gets introduced.

## Common mistake

Treating "we validate all our inputs" as equivalent to "we're protected from XSS." Validation controls what gets *stored*; encoding controls what happens when stored data is *rendered*. A system can have perfect input validation and still be vulnerable to XSS if it forgets to encode on output — and conversely, correct output encoding protects you even against input your validation missed, which is exactly why it's considered the primary defense against XSS, not a secondary one.`,
        },
        {
          slug: "defense-in-depth-least-privilege",
          title: "Defense in Depth, Least Privilege, and Secure Defaults",
          estimatedMinutes: 8,
          content: `# Defense in Depth, Least Privilege, and Secure Defaults

The lessons so far have focused on specific techniques — validating input, encoding output. This lesson steps back to cover three design principles that make every other defense more effective, because they assume any single control might fail.

## Defense in depth

Defense in depth means layering multiple, independent controls so that if one fails, another still stops the attack. A web application that relies solely on input validation to prevent SQL injection is one missed field away from a breach. The same application with input validation *and* parameterized queries *and* a database account with minimal permissions *and* a web application firewall has four independent layers — an attacker who slips past one still has to beat the next.

The key word is *independent*. Adding three variations of the same control (three different denylist filters, say) isn't defense in depth — it's the same layer painted three times. Real depth comes from combining controls that fail for different reasons: validation fails because someone forgot a field; parameterized queries don't care whether validation ran at all; restricted database permissions limit the damage even if both of the previous layers are bypassed.

## Least privilege

Every account, process, API key, and service should hold the minimum set of permissions it needs to do its job, and nothing more. A web application's database account almost never needs permission to drop tables. A microservice that only reads a products table shouldn't have write access to a users table. A CI pipeline that builds and tests code shouldn't have production deployment credentials unless it's the one job actually responsible for deploying.

The benefit of least privilege isn't preventing the initial compromise — it's limiting the blast radius once something does go wrong. If an application server is compromised and its database credentials only allow reading a handful of specific tables, the incident is contained. If those same credentials have full administrative rights over the entire database, the same initial compromise becomes catastrophic.

## Secure defaults

A secure default means the out-of-the-box configuration of a system is the safe one, and insecure behavior has to be deliberately opted into — not the other way around. Examples: a new password-reset flow should default to expiring tokens quickly rather than someone remembering to add an expiration later; a new API endpoint should default to requiring authentication rather than being public until someone remembers to lock it down; a cookie should default to being restricted to secure connections and hidden from JavaScript rather than needing every developer to remember to add those flags each time.

Secure defaults matter because they protect you against the failure mode that's hardest to prevent through review alone: forgetting. A team of careful, well-intentioned developers will still occasionally skip a step under deadline pressure. A secure default means skipping that step doesn't create a vulnerability — it just means you got the safe behavior without having to think about it.

## Mental model

Design as if some control, somewhere, will eventually fail or be forgotten — because across a large enough codebase and long enough timeline, it will. Defense in depth limits how far a single failure gets. Least privilege limits how much damage it does once it gets there. Secure defaults reduce how often it happens in the first place. None of the three replaces careful coding — they're what keeps a single lapse from becoming an incident.`,
        },
      ],
      quiz: {
        title: "Tier 1 Checkpoint: AppSec Foundations",
        questions: [
          {
            text: "What is a trust boundary?",
            optionA:
              "A point where data crosses from a less trusted context into a more trusted one, or vice versa",
            optionB: "The maximum number of users a server can trust simultaneously",
            optionC: "A firewall rule that blocks all inbound traffic",
            optionD: "A cryptographic algorithm used to verify user identity",
            correctOption: "A",
          },
          {
            text: "Which best describes 'attack surface'?",
            optionA: "The total number of successful attacks against a system in the last year",
            optionB:
              "The sum of all points where an outside actor can attempt to interact with a system",
            optionC: "The physical space occupied by production servers",
            optionD: "The number of developers who have write access to a repository",
            correctOption: "B",
          },
          {
            text: "According to the OWASP Top 10:2025, which category holds the #1 position?",
            optionA: "Injection",
            optionB: "Cryptographic Failures",
            optionC: "Broken Access Control",
            optionD: "Security Logging and Alerting Failures",
            correctOption: "C",
          },
          {
            text: "Which category is new to the OWASP Top 10 as of the 2025 edition, reflecting risks introduced by third-party packages and build pipelines?",
            optionA: "Insecure Design",
            optionB: "Software Supply Chain Failures",
            optionC: "Security Misconfiguration",
            optionD: "Mishandling of Exceptional Conditions",
            correctOption: "B",
          },
          {
            text: "Server-Side Request Forgery (SSRF) was folded into which OWASP Top 10:2025 category?",
            optionA: "Injection",
            optionB: "Broken Access Control",
            optionC: "Cryptographic Failures",
            optionD: "Software or Data Integrity Failures",
            correctOption: "B",
          },
          {
            text: "Why is allowlisting (positive validation) generally preferred over denylisting (negative validation)?",
            optionA: "It requires less code to implement in every case",
            optionB: "It automatically encodes output for every context",
            optionC:
              "It defines a closed, finite set of accepted values instead of trying to anticipate every malicious variant",
            optionD: "It removes the need for server-side validation entirely",
            correctOption: "C",
          },
          {
            text: "A comment field only allows strings up to 500 characters, and a user submits a short string containing a script tag, which passes validation. What does this scenario best illustrate?",
            optionA:
              "Input validation alone doesn't protect against XSS -- output encoding at render time is also required",
            optionB: "The validation logic is broken and needs a longer length limit",
            optionC: "SQL injection has occurred",
            optionD: "The dependency supply chain has been compromised",
            correctOption: "A",
          },
          {
            text: "Which of the following is the best example of 'least privilege' in practice?",
            optionA: "Giving every microservice full administrative database access 'just in case'",
            optionB:
              "A database account for a read-only reporting service that can only read the specific tables it needs",
            optionC: "Disabling all logging to reduce noise",
            optionD: "Using the same API key across all environments for simplicity",
            correctOption: "B",
          },
          {
            text: "What is the key difference between 'defense in depth' and simply adding more of the same type of check?",
            optionA: "There is no difference; more checks are always better",
            optionB:
              "Defense in depth requires layering independent controls that fail for different reasons, not duplicating the same control",
            optionC: "Defense in depth means using only denylist-based filters",
            optionD: "Defense in depth applies only to network firewalls",
            correctOption: "B",
          },
          {
            text: "Which statement about the OWASP Top 10 is most accurate?",
            optionA: "It is a legally binding compliance standard that all applications must pass",
            optionB: "It is an exhaustive list of every possible vulnerability a system could have",
            optionC:
              "It is an awareness document ranking common, high-impact categories of weakness based on community data and survey input",
            optionD: "It never changes between editions since attack techniques don't evolve",
            correctOption: "C",
          },
        ],
      },
    },
    {
      title: "Injection Attacks and Prevention",
      lessons: [
        {
          slug: "sql-injection-explained",
          title: "SQL Injection Explained",
          estimatedMinutes: 8,
          content: `# SQL Injection Explained

SQL injection happens when untrusted input is concatenated directly into a SQL query string, allowing an attacker to change the structure of the query itself rather than just supplying a value. It has been on every major vulnerability list for over two decades, remains extremely common, and is also one of the most completely preventable issues in this course — which makes it a good case study in the gap between "known" and "actually prevented."

## How it works

Consider a login check built by string concatenation:

\`\`\`python
query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"
\`\`\`

An attacker who controls the username field can submit a value like:

\`\`\`text
' OR '1'='1' --
\`\`\`

The resulting query becomes, in effect:

\`\`\`sql
SELECT * FROM users WHERE username = '' OR '1'='1' -- ' AND password = '...'
\`\`\`

The double-dash starts a SQL comment, discarding the rest of the original query, and '1'='1' is always true, so the query returns every row in the users table — the attacker has bypassed the password check entirely, without knowing a single valid password.

## Beyond authentication bypass

Depending on the database and the permissions of the account the application connects with, SQL injection can go far beyond bypassing a login form: reading arbitrary tables (including other users' data), modifying or deleting data, and in some configurations, executing operating system commands through database-specific extensions. The severity depends heavily on how much the database account is allowed to do — another reminder of why least privilege matters even when a specific vulnerability does occur.

## Where it hides

SQL injection isn't limited to obvious login forms. It shows up anywhere a query is built from input: search filters, sort-order parameters ("sort by column X"), pagination parameters, and even values that seem numeric (an ID pulled from a URL and concatenated into a query without being cast to an integer first).

## Common mistake

Believing that manually escaping quotes in application code is a sufficient fix. It reduces the obvious cases but is fragile against encoding quirks, multi-byte character sets, and the many database-specific edge cases in how escaping is interpreted. The next lesson covers the actual, reliable fix.`,
        },
        {
          slug: "preventing-sql-injection",
          title: "Preventing SQL Injection with Parameterized Queries",
          estimatedMinutes: 9,
          content: `# Preventing SQL Injection with Parameterized Queries

The reliable fix for SQL injection is parameterized queries (also called prepared statements): instead of building a query by concatenating strings, you send the database a fixed query template separately from the values that fill its placeholders. The database driver keeps code and data apart at the protocol level, so a value can never be reinterpreted as part of the query's structure — no matter what characters it contains.

## Vulnerable vs. fixed

\`\`\`python
# Vulnerable: user input becomes part of the query text
query = "SELECT * FROM users WHERE username = '" + username + "' AND password_hash = '" + password_hash + "'"
cursor.execute(query)

# Fixed: the query structure and the values are sent separately
query = "SELECT * FROM users WHERE username = %s AND password_hash = %s"
cursor.execute(query, (username, password_hash))
\`\`\`

In the fixed version, even if username contains an attempted injection payload, the database treats it as a single literal string value to compare against the username column — it can never be interpreted as query syntax, because it was never part of the query text the database parsed.

## ORMs help, but don't assume immunity

Object-relational mappers (ORMs) like SQLAlchemy, Prisma, ActiveRecord, or Entity Framework use parameterized queries under the hood for their standard query-building methods, which is a major reason to prefer them. But nearly every ORM also offers an escape hatch for raw SQL for cases the query builder can't express. Using that escape hatch with string concatenation reintroduces the exact same vulnerability an ORM is otherwise protecting you from.

\`\`\`javascript
// Still vulnerable, even though it's "using an ORM": raw SQL built by string interpolation
await prisma.$queryRawUnsafe("SELECT * FROM users WHERE username = '" + username + "'");

// Fixed: parameterized, even through the raw-query escape hatch
await prisma.$queryRaw\`SELECT * FROM users WHERE username = \${username}\`;
\`\`\`

## What doesn't reliably work

- Manual escaping — fragile against encoding edge cases and easy to get wrong on one code path while fixing another.
- Denylisting keywords like DROP or comment markers — trivially bypassed with alternate syntax, casing, or comments.
- Client-side validation — irrelevant, since the request to the database happens entirely server-side.

## Checklist

- Does every query that includes a variable use parameter placeholders, never string concatenation or interpolation?
- If a raw-query escape hatch is used, are the values still passed as parameters rather than interpolated into the string?
- Does the database account the application connects with hold only the permissions the application actually needs (defense in depth, in case a parameterization gap is ever missed)?`,
        },
        {
          slug: "command-injection-and-other-injection",
          title: "Command Injection and Other Injection Variants",
          estimatedMinutes: 9,
          content: `# Command Injection and Other Injection Variants

SQL is the best-known target of injection, but the same underlying mechanism — untrusted input changing the meaning of a command sent to an interpreter — applies anywhere your application hands a string to something that parses it as a command rather than as plain data.

## Command injection

This happens when user input is passed into a function that runs a shell command, and the input contains shell metacharacters the application didn't expect.

\`\`\`python
# Vulnerable: filename is concatenated into a shell command
os.system("convert " + filename + " output.png")
\`\`\`

If filename is set to a value like "image.jpg; rm -rf /data", the shell executes both the intended command and the attacker's injected one, because a semicolon separates commands in most shells.

\`\`\`python
# Fixed: pass arguments as a list, bypassing the shell entirely
subprocess.run(["convert", filename, "output.png"], shell=False)
\`\`\`

Passing arguments as a list (with shell=False, the safer default in most languages' process APIs) means the operating system receives each argument as a discrete value — there's no shell parsing step in which metacharacters like semicolons, pipes, or backticks could be reinterpreted.

## NoSQL injection

Document databases aren't immune just because they're not SQL. MongoDB queries built from raw JSON input can be manipulated with operators:

\`\`\`javascript
// If \`password\` comes straight from the request body as an object:
db.users.find({ username: username, password: password });
// An attacker sends: { "password": { "$ne": null } }
// The query becomes "password not equal to null" -- true for any user with a password set
\`\`\`

The fix is the same principle as SQL: never pass a raw, unvalidated object structure from user input directly into a query. Validate that fields are the expected primitive type (a string, not an object) before using them.

## Template injection

Server-side template engines (Jinja2, Freemarker, Twig, Handlebars in certain modes) can be tricked into evaluating attacker-controlled expressions if user input is inserted into a template before it's rendered, rather than passed in as data to the render call.

\`\`\`python
# Vulnerable: user input becomes part of the template source itself
template = Template("Hello, " + user_name + "!")
template.render()

# Fixed: user input is passed as a data value into a fixed template
template = Template("Hello, {{ name }}!")
template.render(name=user_name)
\`\`\`

## The unifying principle

Every variant here — SQL, shell commands, NoSQL query operators, template syntax — follows the same rule: keep the structure of the command fixed and separate from the untrusted data that fills it in. Whenever you find yourself building a command, query, or template by string-concatenating user input into it, that's the exact shape of an injection vulnerability, regardless of which interpreter is on the receiving end.

## Checklist

- Does any code build a shell command, query, or template by concatenating strings that include user input?
- Are OS-level commands invoked with an argument list (shell disabled) rather than through a shell string?
- Are inputs to a document database validated as primitive types before being placed into a query object?`,
        },
      ],
    },
    {
      title: "Path Traversal, File Upload, and Redirect Vulnerabilities",
      lessons: [
        {
          slug: "path-traversal-explained",
          title: "Path Traversal Explained and Prevented",
          estimatedMinutes: 8,
          content: `# Path Traversal Explained and Prevented

Path traversal (also called directory traversal) happens when an application takes a user-supplied filename or path and uses it to access a file on disk, without verifying that the resulting path stays inside the directory it was supposed to be confined to. By including sequences like "../" (or their encoded equivalents), an attacker can walk the resulting path outside the intended folder and reach arbitrary files elsewhere on the filesystem — configuration files, source code, credentials, or other users' data.

## How it works

Imagine an endpoint that serves user-uploaded documents by filename:

\`\`\`text
GET /files?name=invoice-2026-03.pdf
\`\`\`

\`\`\`python
# Vulnerable: the filename is concatenated directly into a filesystem path
@app.get("/files")
def get_file(name: str):
    return send_file(os.path.join("/var/app/uploads", name))
\`\`\`

If an attacker requests a name of "../../../../etc/passwd" instead of a real filename, the resulting path resolves outside the uploads directory entirely, and the server happily reads and returns whatever file that constructed path points to, because nothing checked that the final path was still inside "/var/app/uploads".

## Encoding tricks that bypass naive filters

A common but fragile defense is to reject any filename containing the literal string "..". Attackers routinely bypass this with URL-encoded variants (%2e%2e%2f), double-encoded variants (%252e%252e%252f), backslash variants on Windows-hosted servers, or absolute paths that don't even need "../" at all (a filename of simply "/etc/passwd" reaches the same place if the base directory isn't enforced). As with denylisting elsewhere in this course, trying to enumerate every malicious variant is a losing game.

## The reliable fix: resolve and verify containment

Rather than trying to spot malicious-looking input, resolve the final, absolute, canonical path and explicitly verify it is still located inside the intended base directory before touching the filesystem.

\`\`\`python
# Fixed: resolve the real path and verify it stays inside the allowed base directory
base_dir = os.path.realpath("/var/app/uploads")
requested_path = os.path.realpath(os.path.join(base_dir, name))

if not requested_path.startswith(base_dir + os.sep):
    raise HTTPException(status_code=400, detail="Invalid file path")

return send_file(requested_path)
\`\`\`

os.path.realpath resolves any "../" segments, symlinks, and relative components down to a single, absolute, canonical path, which is what you actually need to check against the base directory — checking the raw, unresolved string is exactly what encoding tricks are designed to slip past.

## An even better fix: don't accept paths from the client at all

The most robust option is to avoid taking a filesystem path from user input in the first place. Store an opaque identifier (a database row's primary key, or a randomly generated storage key) alongside the real filename and physical location, and have the client refer to files by that identifier rather than by a path. The server then looks up the real, trusted path server-side — there's no path for an attacker to manipulate, because none was ever accepted as input.

## Checklist

- Does any code build a filesystem path by directly joining user-supplied input, without resolving and verifying the result stays inside an intended base directory?
- Are encoded variants of "../" (URL-encoded, double-encoded, backslash) considered, not just the literal characters?
- Where possible, is a database-backed opaque identifier used instead of a client-supplied filename or path at all?`,
        },
        {
          slug: "insecure-file-upload-handling",
          title: "Insecure File Upload Handling",
          estimatedMinutes: 9,
          content: `# Insecure File Upload Handling

Letting users upload files — profile pictures, documents, attachments — is one of the highest-risk features a web application can offer, because it hands an external party the ability to place a file, potentially containing executable content, directly onto your infrastructure. Getting file upload handling wrong is a well-worn path to full remote code execution, not just a data-exposure bug.

## The core risk: uploading something that gets executed

If uploaded files are stored inside a directory the web server will execute as code — and requests to that directory aren't restricted to static content — an attacker can upload a server-side script disguised as an "image" and then simply request it directly to have the server execute it.

\`\`\`python
# Vulnerable: trusts the client-supplied filename and extension, saves into a web-served directory
filename = request.files["avatar"].filename
request.files["avatar"].save(os.path.join("static/uploads", filename))
\`\`\`

If a client uploads a file named "shell.php" (or ".jsp", ".aspx", matching whatever your stack executes) and the "static/uploads" directory is served by a runtime that executes those extensions, requesting "/uploads/shell.php" afterward runs the attacker's code on your server, with whatever permissions the web process has.

## Validate content, not just the extension or declared content type

Both the filename's extension and the Content-Type header on the upload request are entirely attacker-controlled and prove nothing about what the file actually contains. A real defense checks the file's actual content — its magic bytes (the fixed byte sequence most file formats begin with) — against what's expected, and ideally re-encodes or re-processes the file (for images, decoding and re-saving through an image library) rather than trusting the bytes the client uploaded verbatim.

\`\`\`python
# Fixed: verify actual file content, store outside the web root with a generated name
import imghdr

uploaded = request.files["avatar"]
detected_type = imghdr.what(uploaded.stream)  # inspects magic bytes, ignores filename/Content-Type
if detected_type not in ("jpeg", "png", "webp"):
    raise HTTPException(status_code=400, detail="Unsupported file type")

stored_name = f"{uuid4()}.{detected_type}"
uploaded.save(os.path.join("/var/app/private-uploads", stored_name))
# Served later only through an application route that streams the file back
# with a fixed, safe Content-Type -- never directly by the web server.
\`\`\`

## Other upload-specific risks worth designing for

- **Size limits** — an upload endpoint with no maximum file size is a straightforward resource-exhaustion vector; enforce a limit before reading the full file into memory, not after.
- **Decompression bombs** — a small compressed file (a zip or image with extreme compression) that expands to gigabytes when processed can exhaust memory or disk on the server; apply limits to decompressed size, not just the uploaded size.
- **Polyglot files** — a file crafted to be simultaneously valid as two different formats (for example, a GIF that's also a valid HTML file), which can enable XSS if the file is ever served with a browser-guessable content type instead of a fixed, explicit one.
- **Filename-based path traversal** — the filename field itself is user input and should go through the same path-traversal defenses as the previous lesson, never used to build a storage path directly.

## Structural defenses

- Store uploads outside the directory the web server executes as code, or in dedicated object storage (such as S3), not inside your application's own served directory tree.
- Generate a new, random storage filename server-side rather than trusting the client's filename for anything beyond display.
- Serve uploaded files back with an explicit, fixed Content-Type your application controls, and, for anything not meant to be rendered inline, a Content-Disposition header forcing a download rather than inline rendering.
- Scan uploads for malware where the threat model justifies it (user-generated content shared with other users is a materially higher risk than a private single-user file).

## Checklist

- Is the actual file content validated (magic bytes, or full re-encoding for images), not just the extension or client-supplied Content-Type?
- Are uploaded files stored outside any web-executable directory, with a server-generated filename rather than the client's original one?
- Are file size and decompressed-size limits enforced before processing?
- Are uploaded files served back with an explicit, fixed Content-Type the application controls?`,
        },
        {
          slug: "open-redirects-unvalidated-forwards",
          title: "Open Redirects and Unvalidated Forwards",
          estimatedMinutes: 7,
          content: `# Open Redirects and Unvalidated Forwards

Many applications redirect users based on a URL parameter — sending someone back to the page they were on before logging in, for example. When the redirect destination is taken from user input and used without validation, the application becomes a tool an attacker can use to redirect victims to an arbitrary destination, while the link itself still points at your trusted domain.

## How it's exploited

\`\`\`text
https://yourbank.example/login?next=https://yourbank-secure.example.attacker.com/phish
\`\`\`

\`\`\`python
# Vulnerable: redirects to whatever URL the "next" parameter contains
@app.get("/login")
def login_redirect(next: str, user=Depends(authenticate)):
    return redirect(next)
\`\`\`

A victim who receives this link sees a URL that genuinely starts with your trusted domain, which is often enough to get past a wary user's suspicion (and past some naive link-scanning tools). After authenticating, they're silently sent on to the attacker's look-alike phishing page — or, in an OAuth context, an open redirect on a trusted authorization server can sometimes be chained to leak an authorization code or access token to an attacker-controlled endpoint.

## Why "it just redirects" undersells the risk

An open redirect is frequently dismissed as low-severity because it doesn't, by itself, let an attacker touch your data. But it's a phishing amplifier (a malicious link that visibly starts with a domain the victim trusts) and, in flows involving OAuth or single sign-on, an open redirect on the wrong endpoint can be a component of a much more serious token-theft chain. Treat it as worth fixing, not as noise.

## The fix: validate against an allowlist, or avoid raw URLs entirely

\`\`\`python
# Fixed: only ever redirect to a known-safe, relative, in-application path
ALLOWED_REDIRECT_PATHS = {"/dashboard", "/settings", "/onboarding"}

@app.get("/login")
def login_redirect(next: str, user=Depends(authenticate)):
    if next not in ALLOWED_REDIRECT_PATHS:
        next = "/dashboard"
    return redirect(next)
\`\`\`

A stronger, even simpler pattern where it fits your application: don't pass a raw URL at all. Pass a short, server-defined key ("checkout", "onboarding-step-2") that maps to a fixed, trusted destination on the server side, so there's no URL for an attacker to substitute in the first place.

If your application genuinely needs to redirect to different domains you don't fully control in advance (linking out to a partner site, say), validate the destination's host against an explicit allowlist of permitted domains, rather than checking only that it "looks like" a URL or checking for the substring of your own domain (an attacker can trivially register a domain such as yourbank.example.attacker.com, which contains your domain name as a substring but is not your domain at all).

## Checklist

- Does any redirect or forward use a raw, user-supplied URL without validating it against an allowlist of relative paths or trusted domains?
- Would checking "does the URL contain our domain name" be fooled by a lookalike domain such as yourdomain.attacker.com? (If so, it's not a real check.)
- Where feasible, is the redirect destination selected from a fixed, server-defined set of keys rather than passed as a raw URL at all?`,
        },
      ],
    },
    {
      title: "XSS and CSRF Deep Dive",
      lessons: [
        {
          slug: "xss-explained",
          title: "Cross-Site Scripting (XSS) Explained",
          estimatedMinutes: 9,
          content: `# Cross-Site Scripting (XSS) Explained

Cross-Site Scripting (XSS) happens when untrusted input ends up being interpreted as HTML or JavaScript in another user's browser. Because the malicious script runs with the same trust and permissions as the legitimate site's own code, it can read cookies and local storage, make authenticated requests on the victim's behalf, log keystrokes, or redirect the page entirely — all while appearing to the victim's browser as if it's simply part of the page they're already on.

## The three common types

**Stored XSS** — the malicious input is saved on the server (typically in a database) and served back to other users later, without proper encoding. A comment field that stores a script payload and displays it to every visitor is the classic example. This is generally the most dangerous variant because it doesn't require tricking a specific victim into clicking anything — anyone who views the affected page is exposed.

**Reflected XSS** — the malicious input is part of the request itself (commonly a URL query parameter) and is echoed back in the immediate response without encoding, for example in a search-results page that displays "You searched for: [query]" verbatim. This requires convincing a victim to click a crafted link, but is still widely exploited through phishing.

**DOM-based XSS** — the vulnerability lives entirely in client-side JavaScript, which takes some attacker-influenced value (a URL fragment, the referrer, a query parameter) and writes it into the page using an unsafe DOM API without it ever touching the server at all.

## A concrete example

\`\`\`html
<!-- Vulnerable server-side template: renders search term directly into HTML, unescaped -->
<p>You searched for: {{ search_term | safe }}</p>
\`\`\`

If search_term contains a broken image tag with an onerror handler that fetches a URL and appends the page's cookies, the browser attempts to load the broken image, the onerror handler fires, and the victim's cookies are sent to the attacker's server — all triggered simply by the victim viewing a page with that search term reflected back, no click required beyond the initial visit.

## Why it matters beyond "just" a broken page

XSS is often underestimated because the payload looks like a cosmetic glitch in a demo. In a real attack, the script runs with full access to whatever the legitimate page's JavaScript has access to: session cookies (if not protected — see the cookie-security lesson later in this module), authentication tokens stored in local storage, and the ability to submit forms or call APIs as the logged-in victim. A stored XSS payload on a popular page can compromise every visitor who views it, silently, until it's found and removed.

## Checklist

- Does any page render user-supplied or third-party content into HTML, an HTML attribute, or a script block?
- Is that content passed through an explicit "raw"/"safe"/unescaped-HTML-style escape hatch, or through the framework's normal encoded interpolation?
- Does any client-side JavaScript write a URL fragment, query parameter, or referrer value into the DOM using an unsafe HTML-injection API?`,
        },
        {
          slug: "preventing-xss",
          title: "Preventing XSS: Encoding, Sanitization, and CSP",
          estimatedMinutes: 10,
          content: `# Preventing XSS: Encoding, Sanitization, and CSP

Preventing XSS is mostly about applying the output-encoding concept from Tier 1 rigorously and consistently, backed up by a couple of additional layers for the cases where you genuinely need to allow some HTML.

## Layer 1: context-aware output encoding

The primary defense is encoding data for the specific context it's rendered into, and letting your framework do it automatically rather than hand-rolling it.

\`\`\`jsx
// React encodes this automatically -- safe by default
<p>You searched for: {searchTerm}</p>

// Vulnerable: explicitly opts out of encoding
<p dangerouslySetInnerHTML={{ __html: searchTerm }} />
\`\`\`

\`\`\`text
Jinja2 (Flask/Django-style templates) auto-escapes by default:
  <p>You searched for: {{ search_term }}</p>

Vulnerable: the |safe filter explicitly disables escaping:
  <p>You searched for: {{ search_term | safe }}</p>
\`\`\`

The pattern to watch for in code review is always the same: a named escape hatch (an unescaped-HTML prop, a "safe" filter, a raw-HTML directive, a "trust this HTML" helper) applied to a value that ultimately traces back to user input.

## Layer 2: sanitization, when you actually need to allow HTML

Sometimes a feature genuinely requires rendering user-authored HTML — a rich-text comment editor, for instance. In that case, encoding everything isn't an option, because you want some tags to render. The answer is a dedicated HTML sanitization library (such as DOMPurify on the client, or a library like bleach in Python) that parses the HTML and strips anything not on an explicit allowlist of safe tags and attributes.

\`\`\`javascript
// Vulnerable: rendering rich-text input with no sanitization
element.innerHTML = userSuppliedHtml;

// Fixed: sanitize against an allowlist before rendering
element.innerHTML = DOMPurify.sanitize(userSuppliedHtml);
\`\`\`

Never write your own HTML sanitizer with regular expressions — the HTML and JavaScript parsing rules browsers use are notoriously full of edge cases (nested encodings, malformed tags that browsers still execute), and dedicated libraries exist specifically because getting this right by hand is extremely difficult.

## Layer 3: Content Security Policy (CSP)

CSP is a response header that tells the browser which sources of scripts, styles, and other resources are allowed to execute on the page, acting as a safety net if an encoding or sanitization gap is ever missed.

\`\`\`text
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'
\`\`\`

A well-configured CSP means that even if an attacker manages to inject a script tag, the browser will refuse to execute it unless it comes from an explicitly allowed source. CSP is defense in depth — it doesn't replace encoding and sanitization, but it substantially reduces the impact if either one has a gap.

## Common mistake

Relying on a denylist-style input filter (stripping the literal string for a script tag) as the primary XSS defense. Attackers routinely bypass such filters with alternate tags, unusual casing, or encoded characters. Encoding at output time is what actually closes the vulnerability, because it doesn't depend on anticipating every possible malicious tag in advance.`,
        },
        {
          slug: "csrf-explained-and-prevented",
          title: "Cross-Site Request Forgery (CSRF) Explained and Prevented",
          estimatedMinutes: 9,
          content: `# Cross-Site Request Forgery (CSRF) Explained and Prevented

Cross-Site Request Forgery exploits a specific browser behavior: when your browser has an active session with a site, it automatically attaches that site's cookies to any request sent to it — even a request triggered by a completely different, malicious site you happen to have open in another tab.

## How the attack works

Suppose your bank's site processes fund transfers via a simple form post, and relies solely on the session cookie to know who's making the request:

\`\`\`html
<!-- Hosted on attacker.example, visited by a victim who is
     currently logged into their bank in another tab -->
<form action="https://bank.example/transfer" method="POST">
  <input type="hidden" name="to_account" value="attacker-account-number" />
  <input type="hidden" name="amount" value="5000" />
</form>
<script>document.forms[0].submit();</script>
\`\`\`

If the victim is logged into the bank site when they load the attacker's page, their browser automatically attaches the bank's session cookie to this forged request, since cookies are sent based on the destination domain, not on which page initiated the request. From the bank server's point of view, this looks like a perfectly legitimate, authenticated request — because the session cookie really is valid. The victim never sees anything happen; the transfer is submitted invisibly by a hidden auto-submitting form.

## Why cookies alone aren't proof of a legitimate request

A valid session cookie proves the browser making the request belongs to someone who's logged in. It says nothing about whether that specific request was actually initiated by the user intentionally clicking something on your site, versus being forged by another page the victim happens to have open. CSRF defenses exist specifically to close that gap.

## Defense 1: CSRF tokens (synchronizer token pattern)

The server generates a unique, unpredictable token per session (or per form), embeds it in the legitimate form, and rejects any state-changing request that doesn't include the matching token.

\`\`\`html
<form action="/transfer" method="POST">
  <input type="hidden" name="csrf_token" value="server-generated-unguessable-value" />
</form>
\`\`\`

Because an attacker's forged form on a different origin has no way to read this token (same-origin policy prevents them from fetching your page's content), they can't include a valid one, and the server rejects the forged request.

## Defense 2: SameSite cookies

Modern browsers support a SameSite cookie attribute that restricts when a cookie is attached to cross-site requests.

\`\`\`text
Set-Cookie: session=abc123; Secure; HttpOnly; SameSite=Strict
\`\`\`

SameSite=Strict or SameSite=Lax tells the browser not to send the cookie along with requests initiated from a different site — which directly blocks the forged-form scenario above, since the browser simply won't attach the session cookie to a cross-origin POST. Most modern frameworks and browsers now default new cookies to SameSite=Lax specifically because CSRF was so common under the old "always send" default.

## Why you generally want both

SameSite cookies are broad, browser-enforced protection with almost no implementation effort, but rely entirely on browser support and correct configuration. CSRF tokens are explicit and framework-independent, but require the server and every relevant form to cooperate. Using both is standard defense-in-depth practice: SameSite=Lax (or Strict) as the baseline, with explicit CSRF tokens on especially sensitive state-changing actions.

## Checklist

- Does every state-changing request (POST/PUT/PATCH/DELETE) require something a different origin can't forge — a CSRF token, a custom header checked server-side, or reliance on SameSite cookies?
- Are session cookies set with SameSite=Lax or Strict, along with Secure and HttpOnly?
- Are GET requests kept free of side effects, so simply loading a URL (which CSRF tokens don't protect against, since GETs are often triggered by image tags) can never change state?`,
        },
      ],
    },
    {
      title: "CORS, Clickjacking, and Security Headers",
      lessons: [
        {
          slug: "cors-misconfiguration",
          title: "CORS Misconfiguration Explained and Fixed",
          estimatedMinutes: 9,
          content: `# CORS Misconfiguration Explained and Fixed

Cross-Origin Resource Sharing (CORS) is a browser mechanism that relaxes the same-origin policy — the default rule that JavaScript running on one origin cannot read responses from a different origin. CORS exists to enable legitimate cross-origin use cases (a frontend on app.example.com calling an API on api.example.com), but a misconfigured CORS policy can quietly turn into a way for any website on the internet to make authenticated requests to your API and read the results.

## What CORS actually controls

CORS doesn't prevent a cross-origin request from being sent — a browser will still send it. What CORS controls is whether the browser lets the requesting page's JavaScript read the response. The server communicates this via response headers:

\`\`\`text
Access-Control-Allow-Origin: https://app.example.com
Access-Control-Allow-Credentials: true
\`\`\`

This tells the browser: "JavaScript running on https://app.example.com is allowed to read this response." If your API instead reflects back whatever Origin header the request happened to send, or uses a wildcard alongside credentials, that guarantee falls apart.

## The dangerous misconfiguration

\`\`\`python
# Vulnerable: reflects any requesting origin back as allowed, with credentials enabled
@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = request.headers.get("Origin", "*")
    response.headers["Access-Control-Allow-Credentials"] = "true"
    return response
\`\`\`

With this configuration, a malicious page hosted anywhere — attacker.example — can send an authenticated request to your API (the victim's browser will attach their session cookie automatically, exactly as in CSRF) and, because the server reflects attacker.example back as an allowed origin, the attacker's JavaScript is permitted to read the full response, including whatever sensitive data it contains. This is strictly worse than CSRF in one respect: CSRF lets an attacker trigger an action without seeing the result, while a CORS misconfiguration like this lets them read the result directly.

## The fix: an explicit allowlist, never a reflected or wildcard origin with credentials

\`\`\`python
# Fixed: only a known, explicit set of origins is ever allowed, and never combined
# with a wildcard when credentials are involved
ALLOWED_ORIGINS = {"https://app.example.com", "https://admin.example.com"}

@app.after_request
def add_cors_headers(response):
    origin = request.headers.get("Origin")
    if origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
    return response
\`\`\`

Two rules worth memorizing: never combine Access-Control-Allow-Origin: * with Access-Control-Allow-Credentials: true (browsers actually reject this combination outright, but reflecting the request's Origin header back has the same practical effect while technically avoiding the literal wildcard, so it isn't a safe workaround); and never treat "the Origin header was present and looked like a URL" as validation — it must be checked against a real, explicit allowlist.

## Preflight requests

For many cross-origin requests (custom headers, methods beyond simple GET/POST, non-form content types), the browser first sends an OPTIONS "preflight" request asking the server which origins, methods, and headers are permitted, before sending the real request. The same allowlist logic needs to apply consistently to preflight responses — a preflight that approves an origin the real request handler doesn't also validate creates an inconsistency an attacker can exploit.

## Checklist

- Does the API ever reflect the request's Origin header back as Access-Control-Allow-Origin, rather than checking it against an explicit allowlist?
- Is Access-Control-Allow-Credentials: true ever combined with an effectively unrestricted allowed origin?
- Is the same origin-validation logic applied consistently across both preflight (OPTIONS) responses and the actual request handlers?`,
        },
        {
          slug: "clickjacking-defenses",
          title: "Clickjacking and Frame-Busting Defenses",
          estimatedMinutes: 7,
          content: `# Clickjacking and Frame-Busting Defenses

Clickjacking tricks a victim into clicking something on your site that they didn't intend to click, by rendering your page inside an invisible or disguised frame on an attacker's page, and positioning the attacker's own decoy content directly beneath the victim's cursor.

## How the attack works

An attacker builds a page with an enticing button ("Click to claim your prize"), and layers your site's genuine page — say, a "Delete Account" or "Authorize This App" button — on top of it as a transparent iframe, precisely aligned so your real button sits exactly where the decoy button appears to be.

\`\`\`html
<!-- Hosted on attacker.example -->
<style>
  iframe { opacity: 0.0; position: absolute; top: 0; left: 0; width: 500px; height: 500px; }
  .decoy-button { position: absolute; top: 250px; left: 100px; }
</style>
<div class="decoy-button">Click to claim your prize!</div>
<iframe src="https://victim-site.example/account/delete-confirm"></iframe>
\`\`\`

The victim sees only the attacker's enticing decoy button. When they click it, they're actually clicking the invisible, precisely-overlaid "Confirm Delete Account" button from your real site, rendered inside the iframe — and because it's genuinely your site loaded in the frame, the click carries the victim's real, authenticated session with it.

## Why this bypasses CSRF defenses

Clickjacking isn't stopped by CSRF tokens, because the request isn't forged at all — it's a completely legitimate request to your own site, submitted through your own real form, using the victim's own valid session. The problem isn't the request; it's that the victim didn't knowingly choose to submit it, because they couldn't see what they were actually clicking on.

## The fix: tell the browser your page must not be framed

\`\`\`text
X-Frame-Options: DENY
Content-Security-Policy: frame-ancestors 'none'
\`\`\`

Either header tells the browser to refuse to render your page inside a frame on any other site at all. If a small number of trusted, same-origin or partner contexts genuinely need to frame a specific page, scope the exception narrowly rather than disabling framing protection site-wide:

\`\`\`text
Content-Security-Policy: frame-ancestors 'self' https://trusted-partner.example
\`\`\`

frame-ancestors (part of CSP) is the modern, more flexible mechanism and supersedes X-Frame-Options in browsers that support it, but shipping both together is common practice, since X-Frame-Options is still honored by some older clients and adds a redundant layer at essentially no cost.

## Not every page needs this, but sensitive ones always do

A public marketing page has little to lose from being framed. Any page that performs a sensitive, state-changing action — account settings, payment confirmation, permission grants, "authorize this application" screens — should always send a framing-denial header, since those are exactly the actions clickjacking is built to trick a victim into triggering.

## Checklist

- Do pages that perform sensitive or state-changing actions send X-Frame-Options and/or a Content-Security-Policy frame-ancestors directive?
- If a page must be framed by a partner site, is the exception scoped to specific trusted origins rather than left wide open?
- Has this been verified by actually trying to frame the page from a different origin, not just assumed from the header being present somewhere in configuration?`,
        },
        {
          slug: "security-headers-reference",
          title: "The Security Headers Reference: CSP, HSTS, and More",
          estimatedMinutes: 9,
          content: `# The Security Headers Reference: CSP, HSTS, and More

Several of this course's lessons have introduced individual security response headers where they were most relevant — Content-Security-Policy alongside XSS, framing headers alongside clickjacking, cookie flags alongside session security. This lesson collects the full set in one place, since in practice they're configured together, once, at the framework or reverse-proxy level, and are worth reviewing as a complete baseline rather than piecemeal.

## Content-Security-Policy (CSP)

Restricts which sources of scripts, styles, images, and other resources the browser will load and execute on your page, acting as a safety net against XSS even when an encoding or sanitization gap slips through.

\`\`\`text
Content-Security-Policy: default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'self'
\`\`\`

## Strict-Transport-Security (HSTS)

Tells the browser to only ever connect to your site over HTTPS for a specified duration, refusing to fall back to plain HTTP even if a user types an insecure URL or an old bookmark points at http://.

\`\`\`text
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload
\`\`\`

The includeSubDomains directive extends the same enforcement to every subdomain, and preload allows a domain to be baked directly into browsers' built-in HSTS lists, so protection applies even on a user's very first visit, before the site has ever had a chance to send the header.

## X-Content-Type-Options

\`\`\`text
X-Content-Type-Options: nosniff
\`\`\`

Prevents the browser from trying to guess ("sniff") a resource's content type based on its content rather than trusting the server's declared Content-Type header. Without this, a file your server serves as, say, plain text could be reinterpreted and executed as a script or stylesheet if the browser decides its content looks like one — relevant, for instance, to the file-upload risks covered earlier in this module.

## Referrer-Policy

\`\`\`text
Referrer-Policy: strict-origin-when-cross-origin
\`\`\`

Controls how much information about the current page's URL is sent in the Referer header when a user navigates to a different site or loads a cross-origin resource. Full URLs, including query strings, can carry sensitive data (a session token accidentally embedded in a URL, a search term); this header limits what leaks to third parties through simple link-following.

## Permissions-Policy

\`\`\`text
Permissions-Policy: geolocation=(), camera=(), microphone=()
\`\`\`

Explicitly disables browser features and APIs (camera, microphone, geolocation, and others) that the page doesn't use, so that even if a script injection or a compromised third-party script somehow runs on the page, it can't invoke capabilities the page never needed in the first place — another instance of least privilege, applied to the browser rather than to a server-side account.

## Framing and CORS headers, previously covered

X-Frame-Options / CSP's frame-ancestors (clickjacking defense, previous lesson) and Access-Control-Allow-Origin and related CORS headers (previous lesson) round out the set — they're included here only as a pointer back, since they were covered in depth already.

## A pragmatic baseline

\`\`\`text
Content-Security-Policy: default-src 'self'; object-src 'none'; frame-ancestors 'self'
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=()
\`\`\`

Most modern frameworks offer a security-headers middleware or plugin that sets sensible defaults for all of these in one place, which is generally preferable to hand-writing each header in every route — consistent with the secure-defaults principle from Tier 1: make the safe configuration the one that requires no extra effort to get.

## Checklist

- Is a Content-Security-Policy configured, scoped as tightly as the application's actual resource needs allow?
- Is HSTS enabled with a meaningful max-age, and includeSubDomains where appropriate?
- Are X-Content-Type-Options, Referrer-Policy, and Permissions-Policy all explicitly set, rather than left at browser defaults?
- Are these headers configured centrally (middleware or reverse proxy), so new routes inherit them automatically instead of depending on every developer remembering to add them?`,
        },
      ],
    },
    {
      title: "SSRF, XXE, and Insecure Deserialization",
      lessons: [
        {
          slug: "ssrf-in-depth",
          title: "Server-Side Request Forgery (SSRF) In Depth",
          estimatedMinutes: 9,
          content: `# Server-Side Request Forgery (SSRF) In Depth

Server-Side Request Forgery was introduced briefly in Tier 1 as part of the Broken Access Control category — a reminder that it's fundamentally a failure to control which destinations server-side code is allowed to reach. This lesson goes deeper into how it's actually exploited and defended against, because the mechanics matter once you're the one implementing the fix.

## The core pattern

SSRF happens whenever your server makes an outbound HTTP request to a URL that's influenced by user input — fetching a linked image to generate a thumbnail, validating a webhook URL, calling an API the user specified. If that URL isn't restricted, an attacker can direct your server to make requests on their behalf to destinations the attacker couldn't otherwise reach directly.

\`\`\`python
# Vulnerable: fetches whatever URL the user provides, with no destination restriction
@app.post("/import-avatar")
def import_avatar(image_url: str):
    response = requests.get(image_url)
    save_avatar(response.content)
\`\`\`

## Why "just the internet" isn't the only risk

The most damaging SSRF exploitation targets destinations that are reachable from your server but not from the public internet at all:

\`\`\`text
http://169.254.169.254/latest/meta-data/iam/security-credentials/
http://localhost:8080/admin/internal-metrics
http://10.0.4.12:5432/
\`\`\`

Cloud providers expose an instance metadata service on a well-known internal address (commonly 169.254.169.254), which, if reachable, can hand back temporary cloud credentials scoped to whatever role the server is running as — turning an SSRF bug into full access to the cloud account's permissions. The same technique reaches internal-only admin panels, databases, and services that were deliberately never exposed externally, precisely because whoever designed them assumed only trusted internal callers could reach them.

## Blind SSRF

Not every SSRF vulnerability returns the fetched response directly to the attacker. "Blind" SSRF occurs when the server makes the request but doesn't return its content — the attacker can still confirm the request happened (through timing differences, or by pointing the URL at a server they control and watching for the incoming request in their own logs), and in some cases can still trigger side effects (an internal API call that changes state) even without ever seeing a response.

## Defenses

\`\`\`python
# Fixed: validate the destination against an allowlist and resolved IP range,
# and disable following redirects to a different host after the check
import ipaddress
from urllib.parse import urlparse

ALLOWED_HOSTS = {"images.trusted-cdn.example"}

def is_safe_url(url: str) -> bool:
    parsed = urlparse(url)
    if parsed.scheme not in ("https",):
        return False
    if parsed.hostname not in ALLOWED_HOSTS:
        return False
    resolved_ip = ipaddress.ip_address(socket.gethostbyname(parsed.hostname))
    return not (resolved_ip.is_private or resolved_ip.is_loopback or resolved_ip.is_link_local)

@app.post("/import-avatar")
def import_avatar(image_url: str):
    if not is_safe_url(image_url):
        raise HTTPException(status_code=400, detail="URL not allowed")
    response = requests.get(image_url, allow_redirects=False, timeout=3)
    save_avatar(response.content)
\`\`\`

Key points this fix relies on: validating against an explicit allowlist of hosts wherever the use case allows it (far stronger than trying to denylist "internal-looking" addresses); resolving the hostname and checking the actual IP address, not just the string, since a hostname can be crafted to resolve to an internal address (DNS rebinding is a known technique specifically for defeating string-only checks); disabling automatic redirect-following, since a URL that passes validation can still redirect to an internal address on the next hop; and applying a short timeout so a hung internal request doesn't tie up server resources.

## Network-level defense in depth

Application-level validation should be backed by network segmentation: the servers making these outbound requests shouldn't have network-level access to sensitive internal services or the cloud metadata endpoint in the first place, wherever that's operationally feasible. This is defense in depth from Tier 1 applied directly — the application check might have a gap someday; a network that simply can't reach the sensitive destination closes that gap regardless.

## Checklist

- Does any server-side code make an outbound request to a URL influenced by user input, without validating the destination?
- Is the destination checked against an explicit allowlist, with the resolved IP verified as not private, loopback, or link-local?
- Are automatic redirects disabled (or re-validated on each hop) so a URL that passes the initial check can't redirect to an internal address?
- Is the cloud metadata endpoint, and other sensitive internal services, unreachable at the network level from servers that make outbound requests on behalf of users?`,
        },
        {
          slug: "xxe-injection",
          title: "XML External Entity (XXE) Injection",
          estimatedMinutes: 8,
          content: `# XML External Entity (XXE) Injection

XXE injection targets applications that parse XML input using a parser configured to resolve "external entities" — a legitimate XML feature that, left enabled for untrusted input, lets an attacker read local files, make outbound network requests from your server, or in some configurations cause denial of service, all through a single crafted XML document.

## Background: what an external entity is

XML supports defining reusable values via entities, including entities that load their content from an external source rather than being defined inline:

\`\`\`text
<?xml version="1.0"?>
<!DOCTYPE foo [
  <!ENTITY xxe SYSTEM "file:///etc/passwd">
]>
<foo>&xxe;</foo>
\`\`\`

If the XML parser processing this document is configured to resolve external entities (which many parsers historically did by default), it will read the referenced file from disk and substitute its contents wherever &xxe; appears in the document — and whatever value results is then available to the application that requested the parse, often reflected back in a response or error message.

## What an attacker can reach with this

- **Local file disclosure** — reading arbitrary files the application process has permission to read, including configuration files and credentials, exactly as with the file:// example above.
- **Server-Side Request Forgery** — an entity pointing at an http:// URL makes your server issue an outbound request, carrying all the same risks as the SSRF lesson just covered.
- **Denial of service** — the classic "billion laughs" pattern nests entities that each expand into several copies of the next, so a tiny XML document can expand to an astronomically large one in memory once fully resolved.

## A concrete vulnerable example

\`\`\`python
# Vulnerable: default XML parsing behavior resolves external entities
from lxml import etree
tree = etree.parse(untrusted_xml_file)
\`\`\`

Many XML libraries, across many languages, historically shipped with external entity resolution enabled by default, meaning any code that simply parses untrusted XML without explicit hardening is very likely exposed, whether or not the developer ever intended to support this feature at all.

## The fix: disable external entities and DTD processing entirely

\`\`\`python
# Fixed: explicitly disable external entity resolution and DTD processing
from lxml import etree
parser = etree.XMLParser(resolve_entities=False, no_network=True, dtd_validation=False, load_dtd=False)
tree = etree.parse(untrusted_xml_file, parser)
\`\`\`

The overwhelming majority of applications that accept XML have no legitimate need for external entities or a document type definition (DTD) at all — the fix is almost always to disable this functionality outright, rather than trying to allow it selectively for trusted input only. Most modern XML libraries provide a documented, one-line way to disable it; the work is mostly in remembering to check, since the vulnerable default is easy to leave untouched.

## It's not limited to obvious "upload an XML file" features

XXE shows up anywhere XML is parsed from an untrusted source, which is broader than it first appears: SOAP-based APIs, SAML authentication assertions (themselves XML), RSS/Atom feed parsers, Microsoft Office document formats (which are XML-based archives internally), and SVG image files (also XML) have all been real-world sources of XXE vulnerabilities, often in code paths nobody thought of as "the XML parsing feature."

## Checklist

- Does any code parse XML from an untrusted source (uploads, API requests, SAML assertions, SVG or Office-format files) using a parser's default configuration?
- Is external entity resolution and DTD processing explicitly disabled on every XML parser instance handling untrusted input, not just the ones an initial audit happened to notice?
- Are XML-based file formats (SVG, DOCX/XLSX, SOAP payloads) recognized as XML parsing surfaces, not overlooked because they don't look like "raw XML" at first glance?`,
        },
        {
          slug: "insecure-deserialization-explained",
          title: "Insecure Deserialization Explained and Prevented",
          estimatedMinutes: 9,
          content: `# Insecure Deserialization Explained and Prevented

Serialization converts an in-memory object into a format that can be stored or transmitted (a byte stream, a string); deserialization reverses the process, reconstructing an object from that data. Insecure deserialization happens when an application deserializes data from an untrusted source without verifying it hasn't been tampered with — and in several popular serialization formats, deserializing attacker-controlled data can lead directly to arbitrary code execution, not just corrupted data.

## Why this is more dangerous than it sounds

In many languages, several serialization formats (Python's pickle, Java's native serialization, PHP's unserialize, Ruby's Marshal and YAML) don't just restore plain data — they can reconstruct arbitrary objects, including triggering constructors, destructors, or "magic methods" that run automatically during the reconstruction process. If an attacker can control the serialized bytes being deserialized, they can potentially craft a payload that instantiates objects chosen specifically to execute code as a side effect of being deserialized, without needing any other vulnerability at all.

## A concrete example

\`\`\`python
# Vulnerable: deserializes a value that came from a cookie the client controls
import pickle
session_data = pickle.loads(base64.b64decode(request.cookies["session"]))
\`\`\`

Because pickle.loads can reconstruct arbitrary Python objects, including ones whose construction has side effects, an attacker who can set that cookie value can potentially craft a payload that executes arbitrary code the moment the server deserializes it — before the application has done anything with the "session data" at all. The vulnerability fires during deserialization itself, which is what makes this class of bug so severe: there's no separate step where a check could have caught it first.

## The fix: don't deserialize untrusted data with a format capable of arbitrary object reconstruction

\`\`\`python
# Fixed: use a data-only format (JSON) and verify integrity before trusting the contents
import json, hmac, hashlib

def load_session(cookie_value: str, secret_key: bytes):
    raw, signature = cookie_value.rsplit(".", 1)
    expected_signature = hmac.new(secret_key, raw.encode(), hashlib.sha256).hexdigest()
    if not hmac.compare_digest(signature, expected_signature):
        raise ValueError("Tampered or invalid session")
    return json.loads(base64.b64decode(raw))
\`\`\`

JSON (and similar data-only formats) can only represent plain data structures — strings, numbers, lists, and objects with no ability to instantiate arbitrary classes or trigger code during parsing — which closes off the entire class of "deserialization itself executes code" vulnerabilities. Combining it with a cryptographic signature (verified with a constant-time comparison, to avoid a timing side-channel on the comparison itself) additionally ensures the data hasn't been tampered with, addressing the "Software or Data Integrity Failures" category from Tier 1 at the same time.

## When you must use a format capable of arbitrary object reconstruction

Some ecosystems and legacy integrations still require formats like Java serialization or pickle. If deserializing genuinely untrusted input with one of these is unavoidable, mitigations include: cryptographically signing the serialized data and rejecting anything that fails verification before deserializing at all, using a strict allowlist of classes the deserializer is permitted to instantiate (several libraries support this explicitly), and running the deserialization step in a sandboxed, least-privilege process so that even a successful exploit is contained. None of these are as strong as simply not deserializing untrusted data in an unsafe format, and should be treated as a fallback, not a first choice.

## Checklist

- Does any code deserialize data from a cookie, request body, cache, or message queue using a format capable of reconstructing arbitrary objects (pickle, Java serialization, unsafe YAML load, PHP unserialize)?
- Where a data-only format (JSON) would suffice, is it used instead, with a cryptographic signature verifying the data hasn't been tampered with?
- If an unsafe format is unavoidable for legacy reasons, is there a class allowlist and/or sandboxing in place around the deserialization step?`,
        },
      ],
    },
    {
      title: "Authentication, Session Security, and Access Control",
      lessons: [
        {
          slug: "password-storage-hashing",
          title: "Password Storage and Hashing",
          estimatedMinutes: 9,
          content: `# Password Storage and Hashing

If your database is ever breached — and across a large enough industry, breaches happen regularly even to careful teams — the difference between "we leaked usernames and unusable hashes" and "we leaked every user's plaintext password" comes down entirely to how passwords were stored. This is one of the highest-leverage security decisions in any application, made once, early, in the authentication code.

## Never store plaintext, and don't stop at "just hash it"

Storing passwords as plaintext means a database breach directly exposes every user's real password — for that site and, thanks to password reuse, very likely several others. The obvious fix is hashing, but not all hashing is equal. A fast, general-purpose hash like SHA-256 is designed to be fast — exactly the wrong property for password storage, because it means an attacker with the hash can try billions of guesses per second on modern hardware (especially GPUs), turning even a moderately complex password into something crackable within a practical timeframe.

## Use a dedicated password-hashing algorithm

Purpose-built password hashing algorithms — Argon2 (the current recommended default), bcrypt, and scrypt — are deliberately slow and tunable, and they incorporate a per-password salt automatically.

\`\`\`python
# Vulnerable: fast, general-purpose hash with no salt
import hashlib
password_hash = hashlib.sha256(password.encode()).hexdigest()

# Fixed: dedicated password-hashing algorithm with automatic salting
import bcrypt
password_hash = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
\`\`\`

## Why salting matters

A salt is random data unique to each password, mixed in before hashing. Without it, two users with the same password produce the identical hash, and an attacker can precompute a lookup table (a "rainbow table") mapping common passwords to their hashes once, then instantly reverse any hash that matches. With a unique salt per password, the same password produces a different hash for every user, and precomputed tables become useless — the attacker has to attack each hash individually. Modern password-hashing libraries generate and store the salt for you automatically as part of the hash output, so you rarely need to manage it by hand.

## Tuning the work factor

Argon2 and bcrypt both take a configurable cost or work factor parameter that controls how many rounds of computation the algorithm performs — deliberately making each individual hash attempt slower. The setting should be tuned so hashing takes a noticeable-but-acceptable fraction of a second on your production hardware, and revisited periodically, since hardware gets faster over time and yesterday's safe setting can become inadequate.

## What this doesn't replace

Strong password hashing protects you if your database is breached — it doesn't prevent an attacker from trying to log in with commonly reused or breached passwords in the first place. That's a separate concern (rate limiting login attempts, checking submitted passwords against known-breached password lists, encouraging or requiring MFA), covered later in this module.

## Checklist

- Are passwords hashed with a dedicated password-hashing algorithm (Argon2, bcrypt, or scrypt), never a general-purpose fast hash?
- Is a unique salt generated per password (usually automatic with the libraries above)?
- Is the work factor tuned to be as slow as your users' tolerance for login latency allows, and revisited as hardware improves?`,
        },
        {
          slug: "secure-session-cookies",
          title: "Secure Session Management and Cookies",
          estimatedMinutes: 9,
          content: `# Secure Session Management and Cookies

Once a user authenticates, most web applications track their identity across subsequent requests using a session — commonly a cookie holding a session identifier. How that session is created, transmitted, and stored has its own set of well-known failure modes, independent of whether the initial password check was done correctly.

## The three cookie flags that matter most

\`\`\`text
Set-Cookie: session=8f2c9a...; Secure; HttpOnly; SameSite=Lax
\`\`\`

- **Secure** — the cookie is only ever sent over HTTPS, never plain HTTP, preventing it from being captured by anyone intercepting traffic on an insecure network.
- **HttpOnly** — the cookie is inaccessible to JavaScript, which means that even if an XSS vulnerability exists elsewhere on the page, the attacker's injected script can't simply read and exfiltrate the session cookie.
- **SameSite** — as covered in the CSRF lesson, restricts whether the cookie is attached to cross-site requests.

Missing any one of these on a session cookie removes a layer of protection against a specific, common attack: no Secure exposes the cookie to network interception, no HttpOnly means an XSS bug becomes a full session-hijacking bug instead of "just" running arbitrary JavaScript, and no SameSite reopens CSRF.

## Session fixation

Session fixation is an attack where an attacker sets or predicts a victim's session identifier before they log in — for example, by sending a victim a link containing a pre-chosen session ID — then, once the victim authenticates using that session, the attacker uses the same, now-authenticated, session ID themselves. The defense is straightforward: always issue a brand-new session identifier at the moment of successful login, never reuse whatever session ID, if any, existed beforehand.

## Session expiration and invalidation

Sessions should expire after a reasonable period of inactivity, and — just as importantly — should be explicitly invalidated server-side on logout and on password change. A common mistake is treating "logout" as a purely client-side action (deleting the cookie in the browser) without invalidating the corresponding session on the server; if an attacker already captured that session identifier through some other means, deleting the browser's copy of the cookie does nothing to stop them from continuing to use it.

## Where to store tokens: cookies vs. local storage

For traditional session identifiers and authentication tokens, HttpOnly cookies are generally preferred over localStorage or sessionStorage, precisely because HttpOnly cookies are invisible to JavaScript and therefore immune to being read by an XSS payload. Storing a token in localStorage for convenience, so client-side JavaScript can attach it to API calls manually, trades away that protection — if an XSS vulnerability ever exists anywhere on the page, localStorage tokens can be read and exfiltrated directly.

## Checklist

- Do session and authentication cookies set Secure, HttpOnly, and an appropriate SameSite value?
- Is a new session identifier issued at login, rather than reusing a pre-login session ID?
- Are sessions invalidated server-side on logout and password change, not just cleared client-side?`,
        },
        {
          slug: "mfa-account-recovery",
          title: "Multi-Factor Authentication and Account Recovery",
          estimatedMinutes: 7,
          content: `# Multi-Factor Authentication and Account Recovery

Even a perfectly hashed, perfectly stored password can be compromised through means entirely outside your control — phishing, reuse of a password breached on another site, or malware on the user's device. Multi-factor authentication (MFA) and carefully designed account-recovery flows are how you limit the damage when a password alone is no longer a reliable proof of identity.

## What MFA actually adds

MFA requires a second, independent factor beyond "something the user knows" (the password) — commonly "something the user has" (a time-based one-time code from an authenticator app, a hardware security key) or "something the user is" (biometrics, typically checked locally on-device rather than sent to your server). The critical property is independence: a phished or breached password alone should not be sufficient to log in if MFA is enabled, because the attacker would also need to separately compromise the second factor.

## SMS is better than nothing, but has known weaknesses

SMS-based one-time codes are far better than no second factor at all, but are considered the weakest common form of MFA, because phone numbers can be hijacked through SIM-swapping attacks (tricking or bribing a mobile carrier into transferring a victim's number to an attacker-controlled SIM) and SMS messages can potentially be intercepted at the carrier network level. Authenticator-app-based time-based one-time passwords (TOTP) and hardware security keys (following the WebAuthn/FIDO2 standard) are stronger, because they don't depend on the phone network at all.

## The account-recovery flow is often the weakest link

A meticulously secured login flow is only as strong as the password-reset flow sitting next to it, because "I forgot my password" is functionally a second authentication path — and it's frequently built with far less scrutiny than the primary login.

\`\`\`text
Insecure pattern:  email a temporary password in plaintext, valid indefinitely
Better pattern:    email a single-use, cryptographically random token,
                   embedded in a link, expiring in a short window (e.g. 15-60 minutes),
                   invalidated immediately after first use
\`\`\`

A secure recovery flow should generate a token that's unpredictable (not a short numeric code an attacker could brute-force, unless attempts are strictly rate-limited), expire quickly, be usable exactly once, and — critically — not reveal whether a given email address has an account at all. A reset flow that says "no account found for that email" for unregistered addresses, but "reset link sent" for registered ones, leaks which emails belong to registered users, which is itself a privacy and enumeration issue.

## Account recovery should also require re-authentication for MFA changes

If a user can disable MFA or re-register a new authenticator purely through the password-reset flow, an attacker who compromises the recovery flow (say, by gaining access to the victim's email) effectively bypasses MFA entirely. Sensitive account changes — disabling MFA, changing the recovery email, adding a new trusted device — should generally require the existing MFA factor to confirm, not just a freshly reset password.

## Checklist

- Is MFA available, and ideally required, for accounts with access to sensitive data or actions?
- Does the password-reset flow use a single-use, short-lived, high-entropy token rather than a reusable temporary password?
- Does disabling or changing MFA require confirming the existing second factor, not just a password reset?`,
        },
        {
          slug: "access-control-failures",
          title: "Access Control Failures: IDOR and Privilege Escalation",
          estimatedMinutes: 9,
          content: `# Access Control Failures: IDOR and Privilege Escalation

Broken access control sits at the top of the OWASP Top 10:2025 for good reason — it's common, it's often trivial to exploit once found, and unlike an injection vulnerability that requires crafting a specific malicious payload, exploiting a missing authorization check can be as simple as changing a number in a URL.

## Insecure Direct Object References (IDOR)

IDOR happens when an application uses a client-supplied identifier to look up a resource, without verifying that the currently authenticated user is actually allowed to access that specific resource.

\`\`\`text
GET /api/invoices/1042
\`\`\`

If this endpoint fetches invoice 1042 and returns it to whoever asks — checking only that some valid user is logged in, not that this user owns invoice 1042 — then any authenticated user can enumerate invoice IDs and read everyone else's invoices, just by changing the number in the URL.

\`\`\`python
# Vulnerable: fetches by ID with no ownership check
@app.get("/api/invoices/{invoice_id}")
def get_invoice(invoice_id: int, current_user: User):
    return db.get_invoice(invoice_id)

# Fixed: verifies the invoice belongs to the requesting user
@app.get("/api/invoices/{invoice_id}")
def get_invoice(invoice_id: int, current_user: User):
    invoice = db.get_invoice(invoice_id)
    if invoice.owner_id != current_user.id:
        raise HTTPException(status_code=404)
    return invoice
\`\`\`

Returning a 404 (rather than a 403) for resources the user doesn't own is a deliberate, common choice — it avoids confirming to an attacker that the ID exists at all, which slightly slows down enumeration attempts.

## Privilege escalation

Privilege escalation happens when a user gains access to functionality or data reserved for a higher privilege level than their own. Vertical privilege escalation means a regular user gains admin-level capabilities (for example, calling an admin API endpoint directly, bypassing a UI that simply hides the button for non-admins). Horizontal privilege escalation means a user accesses another user's data at the same privilege level (IDOR, above, is the most common example of this).

A frequent root cause of vertical privilege escalation is trusting a client-supplied role or permission field:

\`\`\`text
Vulnerable request body, submitted by an ordinary user:
{ "user_id": 55, "role": "admin", "action": "delete_user" }
\`\`\`

If the server accepts the role field from the request body rather than looking up the actual role stored server-side for that authenticated user, any user can simply edit the request to claim an admin role.

## Deny by default

The most robust structural fix is to make every route deny access by default, and require an explicit, positive authorization check before granting it — rather than allowing access by default and trying to remember to add restrictions to the sensitive routes. Centralizing this logic (in middleware, a policy layer, or a well-tested authorization library) rather than re-implementing ad-hoc checks in every handler dramatically reduces the chance that one endpoint gets missed.

## Checklist

- For every endpoint that accepts an ID, is there an explicit check that the requesting user actually owns or is permitted to access that specific object — not just that they're logged in at all?
- Is the user's role or permission level always looked up server-side from a trusted source, never trusted from a client-supplied field?
- Is the default posture "deny unless explicitly authorized," enforced centrally, rather than "allow unless someone remembered to restrict it"?`,
        },
      ],
      quiz: {
        title: "Tier 2 Checkpoint: Injection, XSS, CSRF, and Access Control",
        questions: [
          {
            text: "In SQL injection, what does a parameterized query fundamentally do differently from string concatenation?",
            optionA: "It encrypts the entire query before sending it to the database",
            optionB:
              "It sends the query structure and the data values separately, so values can never be reinterpreted as query syntax",
            optionC: "It automatically escapes single quotes in the application code",
            optionD: "It blocks any input containing the word SELECT",
            correctOption: "B",
          },
          {
            text: "Why is passing OS command arguments as a list (with the shell disabled) safer than building a shell command string?",
            optionA: "It runs the command with lower operating-system privileges automatically",
            optionB:
              "It bypasses the shell's parsing step entirely, so metacharacters like semicolons and pipes cannot be reinterpreted as separate commands",
            optionC: "It automatically validates the filename against a database",
            optionD: "It encrypts the command before execution",
            correctOption: "B",
          },
          {
            text: "What is the primary defense against Cross-Site Scripting (XSS)?",
            optionA: "Denylisting the literal string for a script tag in user input",
            optionB:
              "Context-aware output encoding at render time, applied by default through your framework",
            optionC: "Requiring multi-factor authentication on every page",
            optionD: "Rate-limiting how often a page can be requested",
            correctOption: "B",
          },
          {
            text: "A developer needs to allow users to submit rich-text comments containing some HTML formatting. What is the recommended approach?",
            optionA: "Disable output encoding for that field only",
            optionB:
              "Use a dedicated HTML sanitization library to strip anything not on an explicit allowlist of tags and attributes",
            optionC: "Write a custom regular expression to strip script tags",
            optionD: "Store the HTML encrypted so it can't be tampered with",
            correctOption: "B",
          },
          {
            text: "Why does a CSRF attack succeed even though the victim never explicitly submitted anything themselves?",
            optionA:
              "The victim's browser automatically attaches the site's session cookie to the forged request, regardless of which page triggered it",
            optionB: "CSRF attacks require the victim to type in their password on the attacker's page",
            optionC: "The attacker has already stolen the victim's session cookie directly",
            optionD: "CSRF only works if the victim disabled their firewall",
            correctOption: "A",
          },
          {
            text: "Which cookie attribute setting most directly mitigates CSRF by restricting when a cookie is sent along with cross-site requests?",
            optionA: "HttpOnly",
            optionB: "Secure",
            optionC: "SameSite=Lax or SameSite=Strict",
            optionD: "Max-Age=0",
            correctOption: "C",
          },
          {
            text: "Why should passwords be hashed with Argon2 or bcrypt instead of a fast general-purpose hash like SHA-256?",
            optionA: "SHA-256 cannot process passwords longer than 8 characters",
            optionB:
              "Argon2 and bcrypt are deliberately slow and tunable, making large-scale guessing attacks impractical, and they incorporate salting",
            optionC: "SHA-256 is not supported by most databases",
            optionD: "Argon2 and bcrypt encrypt the password instead of hashing it",
            correctOption: "B",
          },
          {
            text: "What problem does a unique per-password salt solve?",
            optionA: "It speeds up the hashing computation",
            optionB:
              "It prevents attackers from using a precomputed lookup table to reverse many hashes at once, since identical passwords now produce different hashes",
            optionC: "It allows the original password to be recovered from the hash if needed",
            optionD: "It replaces the need for HTTPS",
            correctOption: "B",
          },
          {
            text: "Why is HttpOnly on a session cookie an important defense even if the application has no known SQL injection or CSRF issues?",
            optionA:
              "It prevents JavaScript, including an attacker's injected script from an XSS bug, from reading the cookie value",
            optionB: "It encrypts the cookie's contents in the browser's storage",
            optionC: "It automatically logs the user out after 24 hours",
            optionD: "It prevents the cookie from being sent over HTTPS",
            correctOption: "A",
          },
          {
            text: "A regular user is able to call an admin-only 'delete user' API endpoint directly, even though the button is hidden from them in the UI. What category of vulnerability is this, and what's the underlying cause?",
            optionA: "SQL injection, caused by unescaped input in the delete query",
            optionB:
              "Broken access control, caused by relying on the UI to hide functionality instead of enforcing authorization server-side",
            optionC: "Cryptographic failure, caused by a weak session token",
            optionD: "CSRF, caused by a missing SameSite cookie attribute",
            correctOption: "B",
          },
        ],
      },
    },
    {
      title: "Cryptography and Secrets Management",
      lessons: [
        {
          slug: "cryptographic-failures",
          title: "Cryptographic Failures: What Actually Goes Wrong",
          estimatedMinutes: 9,
          content: `# Cryptographic Failures: What Actually Goes Wrong

When people picture cryptographic vulnerabilities, they often imagine an attacker mathematically breaking an encryption algorithm. In practice, that's exceptionally rare — modern, properly implemented algorithms like AES and the cryptography behind TLS are not what fails. Real cryptographic failures, the ones behind A04:2025 in the OWASP Top 10, are almost always failures of use, not of math.

## The most common real-world failures

- **Sensitive data transmitted or stored without encryption at all** — the simplest failure, and still extremely common: an internal API called over plain HTTP, a database backup stored unencrypted in cloud storage.
- **Home-grown or outdated algorithms** — implementing your own encryption scheme, or using long-deprecated algorithms (MD5, SHA-1, DES) for anything security-sensitive, because "it's already in the codebase" or "it's faster."
- **Hardcoded or embedded keys** — an encryption key or API secret committed directly into source code, which means anyone with repository access has the key.
- **Weak randomness** — using a standard pseudorandom number generator to generate something security-sensitive, such as a password-reset token or session ID, instead of a cryptographically secure random source.
- **Collecting sensitive data you didn't need** — the strongest cryptographic protection for a piece of data is not needing to store it at all. Many breaches expose data (old, unused fields; data retained "just in case") that had no ongoing business purpose.

## A concrete randomness example

\`\`\`python
# Vulnerable: Python's random module is not cryptographically secure
import random
reset_token = str(random.randint(100000, 999999))

# Fixed: use a cryptographically secure random source
import secrets
reset_token = secrets.token_urlsafe(32)
\`\`\`

The standard random module is built for simulations and games, not security — its output is predictable enough, given enough samples, that an attacker can potentially reconstruct its internal state and predict future "random" values. Password-reset tokens, session identifiers, and API keys must come from a cryptographically secure random source (the secrets module in Python, crypto.randomBytes in Node.js, SecureRandom in Java).

## "Don't roll your own crypto"

This is one of the oldest and most consistently validated pieces of security advice, and it applies even to experienced engineers. Cryptographic algorithms and protocols are full of extremely subtle failure modes (timing side-channels, padding oracle attacks, incorrect IV reuse) that are invisible in normal testing and only surface under focused attack. The correct approach is almost always to use a well-reviewed, actively maintained library's high-level API, rather than assembling primitives (a cipher, a mode, a padding scheme) by hand.

## Checklist

- Is any sensitive data transmitted or stored without encryption, where encryption would be reasonably expected?
- Are any deprecated algorithms (MD5, SHA-1, DES) still used for anything security-relevant?
- Are encryption keys and secrets kept out of source code (see the secrets-management lesson later in this module)?
- Are security-sensitive random values (tokens, session IDs) generated from a cryptographically secure random source, not a general-purpose one?`,
        },
        {
          slug: "encryption-in-transit-and-at-rest",
          title: "Encryption in Transit and at Rest",
          estimatedMinutes: 9,
          content: `# Encryption in Transit and at Rest

Two separate questions determine whether sensitive data is actually protected: is it encrypted while moving between systems (in transit), and is it encrypted while sitting in storage (at rest)? Both matter, and they protect against different threats.

## Encryption in transit

Data in transit is protected primarily through TLS (Transport Layer Security) — the protocol behind HTTPS. TLS protects data traveling between the client and server from anyone intercepting network traffic (an attacker on the same public Wi-Fi network, a compromised router, an ISP) reading or tampering with it along the way.

Practical requirements for correct TLS usage:

- Enforce HTTPS everywhere, including redirecting any plain HTTP request to HTTPS rather than serving content over both.
- Use HSTS (the Strict-Transport-Security header) so browsers refuse to fall back to plain HTTP even if a user types an insecure URL or clicks an old link.
- Keep TLS configuration current — disable outdated protocol versions and weak cipher suites, and let a maintained library or reverse proxy manage this rather than hand-configuring it.
- Remember that TLS protects data between hops, not necessarily end to end — if your request passes through multiple internal services, each hop needs its own TLS termination and re-establishment, or you have an unencrypted gap internally.

## Encryption at rest

Data at rest is protected by encrypting it as it's stored — on disk, in a database, in a backup, in object storage. This defends against a different threat: someone gaining direct access to the storage medium itself (a stolen laptop, a misconfigured cloud storage bucket, a decommissioned hard drive that wasn't wiped, a database backup file that leaks).

Most managed database and cloud storage services offer encryption at rest as a built-in, often default, feature — enabling it is usually a configuration setting rather than something you implement yourself. The harder cases are backups (are they encrypted with the same rigor as the live database?) and application-level encryption for particularly sensitive fields (should a field like a national ID number be encrypted at the application layer, in addition to whatever the underlying storage provides, so that even someone with raw database access can't read it directly?).

## Field-level encryption for especially sensitive data

For a small number of especially sensitive fields, encrypting at the application layer — before the value is ever written to the database — adds a meaningful extra layer, because it protects the data even from someone with direct database access (a compromised database admin account, a SQL injection vulnerability that would otherwise expose the raw column). This comes with real trade-offs: encrypted fields generally can't be searched or indexed the normal way, so it's usually reserved for a small set of fields where the sensitivity clearly justifies the added complexity, not applied blanket across an entire schema.

## Common mistake

Treating "our cloud provider encrypts data at rest by default" as equivalent to "our sensitive data is fully protected." Storage-level encryption at rest protects against someone stealing the physical disk or an unauthorized snapshot — it does essentially nothing against a SQL injection vulnerability, a compromised application server, or an overly-privileged database account, all of which read data through the normal, already-decrypted application path. At-rest encryption and access control are complementary, not substitutes for each other.

## Checklist

- Is HTTPS enforced everywhere, with HTTP requests redirected and HSTS enabled?
- Is encryption at rest enabled for databases, backups, and object storage, including backups specifically, not just the live database?
- Are a small number of especially sensitive fields considered for additional application-layer encryption, where justified?`,
        },
        {
          slug: "secrets-management",
          title: "Secrets Management: Keys, Tokens, and Vaults",
          estimatedMinutes: 9,
          content: `# Secrets Management: Keys, Tokens, and Vaults

API keys, database passwords, encryption keys, and third-party service tokens are collectively "secrets" — credentials that, if exposed, let an attacker impersonate your application or access the systems it depends on. How your team manages these secrets is frequently the actual entry point in real incidents, more often than a flaw in the application's own code.

## Never commit secrets to source control

This is the single most common secrets-related mistake, and it's persistent because it's so easy to do by accident: an environment file committed once, a database password hardcoded during a debugging session and never removed, an API key pasted into a comment. Once a secret has been committed, deleting it in a later commit is not sufficient — the value still exists in the repository's history, and if the repository is ever public (or a private repository is leaked or made public later), every past commit is exposed along with it.

\`\`\`python
# Vulnerable: secret hardcoded directly in source
DATABASE_PASSWORD = "Sup3rS3cret!2024"

# Fixed: read from environment, populated by a secrets manager or deployment config
DATABASE_PASSWORD = os.environ["DATABASE_PASSWORD"]
\`\`\`

If a secret is ever accidentally committed, the correct response is to treat it as compromised immediately and rotate (replace) the credential, not just to remove it from the latest commit. Simply removing it from the current file leaves the old value permanently readable in git history.

## Environment variables are a start, not the whole answer

Reading secrets from environment variables instead of hardcoding them is a meaningful improvement, but has its own limits: environment variables can leak into logs, error-reporting tools, or child-process environments if you're not careful, and they typically have no built-in mechanism for rotation, fine-grained access control, or audit logging of who accessed which secret and when.

## Dedicated secrets managers

For production systems, a dedicated secrets manager (such as HashiCorp Vault, AWS Secrets Manager, Azure Key Vault, or Google Secret Manager) provides what plain environment variables don't: secrets are encrypted at rest, access is controlled and logged per-service or per-identity, and secrets can be rotated on a schedule, or immediately if a leak is suspected, without redeploying application code that references them by name rather than by value.

## Least privilege applies to secrets too

A service should only be able to read the specific secrets it needs — a payment-processing microservice shouldn't have access to the secrets used by an unrelated reporting service. This limits the blast radius if any single service is compromised, the same principle covered in Tier 1's defense-in-depth lesson, applied specifically to credential access.

## Checklist

- Are there any secrets hardcoded in source code or committed to version control history, checked with a secret-scanning tool rather than just manual review?
- Are secrets loaded from environment variables or a dedicated secrets manager, rather than checked into the repository?
- Is there a process to immediately rotate a credential the moment it's suspected of being exposed, rather than just deleting it from the latest commit?
- Does each service or component have access only to the specific secrets it needs, not a shared set of all the credentials?`,
        },
      ],
    },
    {
      title: "Misconfiguration, Dependencies, and Supply Chain",
      lessons: [
        {
          slug: "security-misconfiguration",
          title: "Security Misconfiguration in Depth",
          estimatedMinutes: 8,
          content: `# Security Misconfiguration in Depth

Security Misconfiguration climbed to #2 in the OWASP Top 10:2025, reflecting a pattern seen across many real incidents: the application code itself was fine, but how it was deployed, configured, or exposed created the actual opening an attacker used.

## Common forms

- **Default credentials left unchanged** — admin panels, databases, and infrastructure tools shipped with a well-known default username and password that's never rotated.
- **Unnecessary features left enabled** — sample applications, debug endpoints, directory listing, or admin interfaces that should never have been exposed to production, still reachable because nobody explicitly disabled them.
- **Verbose error messages in production** — a stack trace or detailed database error returned directly to the end user, which can reveal internal file paths, library versions, or even fragments of a query, all useful reconnaissance for an attacker.
- **Missing security headers** — no Content-Security-Policy, no X-Content-Type-Options, no Strict-Transport-Security, leaving the browser without instructions that would otherwise reduce the impact of other bugs.
- **Overly permissive cloud storage** — a storage bucket or blob container configured as publicly readable, or writable, when it should be private, often the result of a default setting nobody revisited.
- **Outdated software left unpatched** — an operating system, web server, or framework version with known, publicly documented vulnerabilities that a patch already exists for.

## A concrete example

\`\`\`text
Vulnerable response (production):
  500 Internal Server Error
  Traceback (most recent call last):
    File "/app/src/routes/payments.py", line 84, in charge_card
    psycopg2.errors.UniqueViolation: duplicate key value violates
    unique constraint "payments_transaction_id_key"

Fixed response (production):
  500 Internal Server Error
  { "error": "Something went wrong. Please try again." }
  (full detail logged server-side, with a correlation ID, for developers to investigate)
\`\`\`

The fixed version still gives developers everything they need to debug the issue, through server-side logs tied to a correlation ID the user can reference if they contact support, without handing an attacker internal file paths, library names and versions, or database schema details for free.

## Why this category is hard to catch with code review alone

Misconfiguration often lives outside the application's own source code entirely — in infrastructure-as-code files, cloud console settings, reverse proxy configuration, or a checkbox in a third-party dashboard. A perfect code review of the application logic won't catch a publicly readable storage bucket configured in a separate infrastructure repository, which is why configuration needs its own review process (automated configuration scanning, infrastructure-as-code review, periodic audits) rather than being assumed to be covered by application code review.

## Hardening as an ongoing process, not a one-time task

Secure configuration isn't a checklist you complete once at launch — new services get added, new default settings ship with new software versions, and cloud provider defaults change over time. Treating hardening as a continuous, periodically-revisited process, ideally automated via configuration-scanning tools that flag drift from a known-good baseline, catches the misconfigurations that inevitably creep back in as a system evolves.

## Checklist

- Have all default credentials on every deployed system been changed?
- Are debug endpoints, verbose error pages, and directory listings disabled in production?
- Are standard security response headers configured (CSP, HSTS, X-Content-Type-Options)?
- Is cloud storage access reviewed periodically for accidental public exposure?`,
        },
        {
          slug: "vulnerable-outdated-components",
          title: "Vulnerable and Outdated Components",
          estimatedMinutes: 8,
          content: `# Vulnerable and Outdated Components

Almost no modern application is written entirely from scratch — it's assembled from a framework, dozens (often hundreds, transitively) of open-source libraries, and a runtime. Each of those is a piece of code you didn't write, don't fully review, and are nonetheless trusting to run inside your application with whatever permissions your application has.

## Why this is a distinct risk from your own code

A vulnerability in a dependency affects every application that uses it, which makes popular libraries an efficient target: an attacker who finds, or is informed of, a vulnerability in a widely-used logging library or web framework can potentially compromise thousands of unrelated applications with a single exploit, rather than needing to find a unique flaw in each one individually. Once a vulnerability is publicly disclosed, commonly tracked as a CVE (a Common Vulnerabilities and Exposures entry), it becomes a race between defenders patching and attackers scanning the internet for still-vulnerable, unpatched instances.

## Knowing what's actually in your dependency tree

Most projects depend directly on a modest number of packages, but each of those pulls in its own dependencies. Transitively, a typical modern application can depend on hundreds of packages nobody on the team explicitly chose or reviewed. You can't manage the risk of a component you don't know you're running, which is why maintaining visibility into the full dependency tree, not just direct dependencies, is a prerequisite for managing this risk at all.

## Practical practices

- **Automated dependency scanning** — tools that check your dependency tree against databases of known vulnerabilities and flag matches, ideally as part of CI so a vulnerable dependency is caught before merge, not discovered months later.
- **Keep dependencies current** — a dependency with a patch available for a known vulnerability, left un-upgraded, is a self-inflicted risk; regular, incremental upgrades are far less disruptive than the "we haven't upgraded in three years and now everything breaks at once" scenario.
- **Remove what you don't use** — every dependency, even an unused one still listed in a manifest file, is attack surface and a maintenance burden; periodically prune dependencies the project no longer actually needs.
- **Pin versions and review changes** — use lockfiles so builds are reproducible, and review the diff, or at minimum the changelog, when upgrading a dependency, rather than blindly accepting whatever the latest version does.
- **Prefer actively maintained projects** — a library with no updates in years, no responsive maintainer, and open, unaddressed security reports is a growing risk even before a specific vulnerability is found in it.

## An example of the asymmetry

A single vulnerability disclosed in a widely-used JSON parsing library, logging framework, or compression utility can require emergency patching across an enormous share of the industry within days, not because those particular applications were poorly written, but because they all depended, sometimes transitively and unknowingly, on the same small piece of shared code. This is exactly why dependency management is treated as its own top-level security discipline rather than folded into general code quality.

## Checklist

- Is there automated scanning, in CI rather than just occasionally by hand, that checks dependencies against known vulnerability databases?
- Are dependency upgrades applied on a regular cadence, rather than deferred indefinitely?
- Is the full transitive dependency tree visible to the team, not just the packages listed directly in the manifest?
- Are unused dependencies periodically removed?`,
        },
        {
          slug: "software-supply-chain-security",
          title: "Software Supply Chain Security",
          estimatedMinutes: 9,
          content: `# Software Supply Chain Security

Vulnerable dependencies, covered in the previous lesson, are about code that has a flaw. Supply chain security is a related but distinct concern: what if a dependency, or the pipeline that builds and ships your software, has been deliberately compromised by an attacker, not merely buggy, but actively malicious?

## Why attackers target the supply chain

Compromising a single popular package, or a single build system, can compromise every downstream application that depends on it — a far better return on an attacker's effort than trying to breach one target application at a time. This is precisely why Software Supply Chain Failures earned its own dedicated category in the OWASP Top 10:2025: the attack pattern has become common and damaging enough to warrant being tracked separately from simply having an outdated dependency.

## Common supply chain attack patterns

- **Compromised maintainer accounts** — an attacker gains access to a legitimate package maintainer's publishing credentials and pushes a malicious update to an existing, trusted package, which then gets pulled automatically by anyone with an unpinned or loosely-pinned dependency.
- **Typosquatting** — publishing a malicious package with a name deliberately similar to a popular one, hoping developers mistype the name during installation.
- **Dependency confusion** — an organization uses an internally-named private package, and an attacker publishes a same-named package to a public registry with a higher version number; misconfigured tooling may then pull the attacker's public package instead of the intended internal one.
- **Compromised build pipelines** — an attacker gains access to CI/CD infrastructure itself and injects malicious code during the build or deployment process, meaning the source code repository can look completely clean while the deployed artifact is not.

## Defenses

- **Lockfiles and version pinning** — commit lockfiles so builds use exactly the versions that were reviewed, not whatever the latest compatible version happens to be today.
- **Verify package integrity** — modern package managers check cryptographic hashes of downloaded packages against the lockfile; don't disable this check for convenience.
- **Namespace internal packages clearly**, and configure package managers to look at your private registry first, or exclusively, for internally-named packages, closing the dependency-confusion gap.
- **Limit CI/CD pipeline permissions** — a pipeline that only needs to run tests shouldn't hold production deployment credentials; a pipeline that deploys shouldn't have broader cloud permissions than the specific deployment action requires.
- **Software Bill of Materials (SBOM)** — maintaining a generated, up-to-date inventory of exactly what components and versions make up a shipped artifact, so that when a new vulnerability is disclosed, you can immediately check whether, and where, you're affected, rather than manually auditing everything from scratch.
- **Signed commits and artifacts** — cryptographically signing commits and build artifacts lets you verify that code came from a trusted source and wasn't altered in transit through the pipeline, directly addressing the Software or Data Integrity Failures category covered earlier in this course.

## Mental model

Treat every dependency, and every stage of your build and deployment pipeline, as something that could theoretically be compromised, not because you distrust any specific maintainer, but because the incentives for attackers to target widely-used infrastructure are only growing. The defenses above don't require assuming malice everywhere; they require not assuming trust is unconditional and permanent just because it was warranted the last time you checked.

## Checklist

- Are lockfiles committed and package integrity verification enabled, rather than always resolving to "latest"?
- Is there a plan for dependency confusion? Does your package manager configuration prioritize your private registry for internally-named packages?
- Do CI/CD pipelines hold only the permissions the specific job requires, with production deployment credentials isolated from broader build/test jobs?
- Is there an up-to-date inventory (an SBOM or equivalent) of what's actually in your shipped artifacts?`,
        },
      ],
    },
    {
      title: "Business Logic Flaws, Race Conditions, and Denial of Service",
      lessons: [
        {
          slug: "business-logic-vulnerabilities",
          title: "Business Logic Vulnerabilities Explained",
          estimatedMinutes: 8,
          content: `# Business Logic Vulnerabilities Explained

Business logic vulnerabilities are flaws in the rules and workflows an application enforces, rather than in any specific line of vulnerable code. A business logic flaw can exist in an application with perfect input validation, parameterized queries, and airtight authentication — because the problem isn't a technical defect, it's that the designed workflow itself permits something it shouldn't.

## Why these don't look like other vulnerabilities

Every vulnerability class covered so far in this course — injection, XSS, broken access control — has a recognizable technical signature: a missing encoding step, an unparameterized query, a missing ownership check. A business logic flaw often involves no malformed input, no unusual characters, and no rejected request at all — every individual request is perfectly well-formed and would pass any input validation or authentication check. The flaw is in the sequence of otherwise-valid actions, or in an assumption the workflow's designer didn't realize could be violated.

## Examples

- **Price and quantity manipulation** — a checkout flow that trusts a client-supplied price or discount percentage instead of recalculating it server-side from the actual product and coupon records.
- **Workflow step skipping** — an application exposes each step of a multi-step process (address, payment, confirmation) as an independent endpoint, and never checks that a later step is only reachable after the required earlier steps actually completed.
- **Negative-value abuse** — a "transfer funds" or "add to cart" quantity field that accepts a negative number, which some business logic silently interprets as a valid instruction to subtract instead of add, effectively reversing the intended operation.
- **Self-referential abuse** — a referral or reward system (this course's threat-modeling lesson used exactly this example) that never considers a user referring their own second account.
- **Coupon and promotion stacking** — a discount system that never checks whether a "first purchase only" coupon has already been used by the same underlying customer under a different account or email alias.

## A concrete example

\`\`\`text
Intended flow: submit order -> pay -> receive confirmation email -> item ships

Actual behavior observed: an attacker calls the "confirmation email" endpoint
directly, with an order ID for an order they never actually paid for, and the
shipping process (which triggers off the confirmation-sent event, not off a
verified payment status) ships the item anyway.
\`\`\`

Nothing in this example involves malformed input. Every request is syntactically valid and properly authenticated as the attacker's own account. The flaw is that the shipping trigger was implicitly, incorrectly, assumed to only ever fire after a real payment — an assumption the workflow never actually enforced as a hard check.

## Why this is squarely an Insecure Design issue

This category of flaw is exactly what A06:2025 (Insecure Design) in the OWASP Top 10 is about: no amount of careful coding of the confirmation-email endpoint fixes a workflow that never verified payment status before triggering shipment. The fix has to happen at the design and business-rule level — every state-changing step in a critical workflow must independently re-verify the actual state it depends on (was this order actually paid, in a status the payment provider itself confirmed?) rather than trusting that "if this endpoint was called, the prior steps must have happened."

## How to find them

Business logic flaws are largely invisible to automated scanners, because there's no malformed syntax for a scanner to flag — a scanner sees a well-formed request and a normal-looking response. Finding them requires a human asking, for each step of a workflow: what does this endpoint assume must have already happened, and is that assumption actually enforced anywhere, or just implied by the normal UI flow? This is precisely the habit the threat-modeling lesson earlier in this course was building.

## Checklist

- For each step in a multi-step workflow (checkout, onboarding, approval), is the required prior state (payment confirmed, prior step completed) independently re-verified server-side, not just assumed because this endpoint was reached?
- Are prices, discounts, and quantities always recalculated server-side from trusted records, never accepted as a client-supplied value?
- Do reward, referral, or promotional systems account for a single real-world user operating multiple accounts?
- Do quantity or amount fields reject negative values where a negative number would invert the intended operation?`,
        },
        {
          slug: "race-conditions-toctou",
          title: "Race Conditions and Time-of-Check to Time-of-Use Bugs",
          estimatedMinutes: 9,
          content: `# Race Conditions and Time-of-Check to Time-of-Use Bugs

A race condition occurs when the correctness of an operation depends on the precise timing or ordering of multiple concurrent actions, and an attacker can exploit a gap between two steps that were assumed to happen atomically (as a single, uninterruptible unit) but actually don't.

## The classic pattern: Time-of-Check to Time-of-Use (TOCTOU)

Many vulnerable operations follow a "check, then act" pattern: check some condition is true, then perform an action based on that check having been true. If another request can act in the gap between the check and the action, the condition the action relies on may no longer hold by the time it actually executes.

\`\`\`python
# Vulnerable: checks the balance, then deducts it, as two separate,
# non-atomic database operations
def withdraw(account_id, amount):
    balance = db.get_balance(account_id)
    if balance >= amount:
        db.set_balance(account_id, balance - amount)
        return True
    return False
\`\`\`

If two withdrawal requests for the same account arrive at nearly the same instant, both can read the same starting balance during the "check" step, before either has performed its "deduct" step. Both checks pass, both deductions proceed, and the account ends up overdrawn — the account holder has successfully withdrawn more money than they had, purely because the check and the deduction weren't a single atomic operation.

## Where this shows up beyond banking examples

- **Coupon or promo code redemption** — a single-use code redeemed many times simultaneously, before the "already used" flag is set by any of the concurrent requests.
- **Inventory and stock limits** — many concurrent purchase requests for the last item in stock, each of which checks "is it still in stock?" and finds yes, before any of them decrements the count.
- **Rate limit bypass** — many requests fired simultaneously to slip in under a rate limiter that reads a counter, checks it, and increments it as separate steps rather than one atomic operation.
- **File and resource creation** — checking that a file or resource doesn't already exist, then creating it, with another process able to create it (or replace it, in some filesystem-level TOCTOU attacks) in between.

## The fix: make the check and the action atomic

The reliable fix is to eliminate the gap entirely, by making the check and the update a single atomic database operation rather than two separate round trips.

\`\`\`python
# Fixed: the condition and the update happen as a single atomic
# database statement, so no other request can act in between
def withdraw(account_id, amount):
    result = db.execute(
        "UPDATE accounts SET balance = balance - %s "
        "WHERE id = %s AND balance >= %s",
        (amount, account_id, amount),
    )
    return result.rows_affected == 1
\`\`\`

Because the balance check (balance >= amount) is part of the same SQL statement as the update, the database's own concurrency control guarantees no other transaction can slip a conflicting update in between the check and the write — there's no window where two requests can both see a passing check. The same principle applies with row-level locking (SELECT ... FOR UPDATE), database unique constraints (letting the database itself reject a second "redeem this single-use code" attempt rather than checking for prior use in application code), or atomic increment/decrement primitives many databases and caches expose directly.

## Why load testing and manual QA usually miss these

Race conditions typically require concurrent requests arriving within a very narrow timing window, which ordinary manual testing and even most automated functional tests rarely produce by accident — everything looks correct when tested one request at a time. This is why they're consistently among the more under-tested categories of vulnerability, and why they're worth deliberately checking for on any endpoint that reads a value, decides something based on it, and then writes an updated value back, rather than relying on normal testing to surface them.

## Checklist

- Does any endpoint check a condition (balance, stock, single-use status) and then act on it as two separate steps, rather than one atomic database operation?
- Are single-use resources (coupons, invite codes, one-time tokens) enforced with a database-level uniqueness guarantee, not just an application-level "have we seen this before" check?
- Has any endpoint that reads-then-writes a shared value been tested under genuinely concurrent load, not just sequential requests?`,
        },
        {
          slug: "dos-resource-exhaustion-defenses",
          title: "Denial of Service and Resource Exhaustion Defenses",
          estimatedMinutes: 8,
          content: `# Denial of Service and Resource Exhaustion Defenses

Earlier in this course, rate limiting was introduced briefly as a defense against credential-stuffing and API abuse. This lesson widens the lens: denial of service isn't only about an attacker deliberately flooding your servers with traffic — it's about any way a small, cheap request can force your system to do a disproportionately large amount of work, memory allocation, or storage, to the point that legitimate users can no longer be served.

## Volumetric vs. algorithmic denial of service

**Volumetric** denial of service is the intuitive kind: sheer request volume overwhelming available capacity, whether from a botnet or simply an unthrottled script. This is generally addressed primarily at the infrastructure layer (a CDN, a load balancer, a dedicated DDoS-mitigation service) rather than in application code.

**Algorithmic** denial of service is the kind application code is directly responsible for preventing: a single, small, legitimate-looking request that triggers disproportionately expensive processing on the server. This category is easy to overlook because the request itself never looks malicious.

\`\`\`text
Example: a regular-expression search field that accepts user-supplied patterns
containing nested quantifiers, such as (a+)+b, evaluated against a long
non-matching input -- causing "catastrophic backtracking" where matching time
grows exponentially with input length, turning a tiny request into a CPU-bound
hang.
\`\`\`

Other common examples covered elsewhere in this course from a different angle include decompression bombs (Tier 2's file-upload lesson) and XML entity expansion (the "billion laughs" pattern from the XXE lesson) — both are algorithmic denial-of-service techniques wearing a file-format-specific disguise.

## Practical defenses

- **Rate limiting, scoped correctly** — per-user or per-API-key limits (harder to rotate around than per-IP limits), applied especially tightly to expensive or sensitive operations, not just login.
- **Request size and complexity limits** — caps on request body size, upload size, decompressed size, pagination page size, and query complexity (particularly relevant for GraphQL, where a single query can be crafted to request deeply nested data), rejected before the expensive work begins rather than after.
- **Timeouts on every external and expensive call** — a request to a slow downstream service, a slow regular expression, or a large computation should have an enforced timeout, so one slow operation can't tie up a request-handling thread or process indefinitely.
- **Avoiding backtracking-prone regular expressions**, or using a regex engine with linear-time guarantees, for any pattern that will ever be evaluated against untrusted or attacker-influenced input.
- **Queuing and backpressure** — expensive asynchronous work (report generation, bulk exports, image processing) should go through a queue with concurrency limits, rather than being kicked off synchronously and unboundedly for every request that asks for it.

## The relationship to fail-closed design

A rate limiter or resource guard that fails open when it errors (allowing unlimited requests through if the rate-limiting service itself is unreachable) defeats the purpose of having one in the first place — this is the same fail-closed principle from the exceptional-conditions lesson in Tier 3, applied specifically to resource protection.

## Checklist

- Are rate limits scoped per-user or per-API-key, applied more tightly on expensive or sensitive endpoints, and enforced with a fail-closed default?
- Are request size, decompressed size, and query-complexity limits enforced before expensive processing begins, not after?
- Do regular expressions or other pattern-matching logic evaluated against untrusted input risk catastrophic backtracking?
- Is expensive asynchronous work processed through a bounded queue rather than kicked off synchronously and without limit?`,
        },
      ],
    },
    {
      title: "Modern Authentication and Authorization: OAuth, OIDC, and JWT",
      lessons: [
        {
          slug: "oauth-oidc-fundamentals",
          title: "OAuth 2.0 and OpenID Connect Fundamentals",
          estimatedMinutes: 9,
          content: `# OAuth 2.0 and OpenID Connect Fundamentals

Tier 2 covered authentication in the context of a user logging into your own application directly. Modern applications frequently also need to let users log in via a third party ("Sign in with Google"), or let a third-party application access a slice of your API on a user's behalf, without ever handling that user's actual password. OAuth 2.0 and OpenID Connect are the standards that solve these two related, but distinct, problems — and conflating them is a common source of real vulnerabilities.

## Two different questions

OAuth 2.0 answers: "can this application access this specific resource, on this user's behalf, with this specific scope of permission?" It's an authorization framework — it's about delegated access to something, not about proving who the user is. OpenID Connect (OIDC) is built on top of OAuth 2.0 specifically to answer a different question: "who is this user, really?" It adds an identity layer (the ID token) on top of OAuth's access-delegation mechanics.

A common and consequential mistake is using a bare OAuth access token as proof of identity — treating "this application was granted access to the user's profile data" as equivalent to "this really is that user" — when OAuth alone was never designed to make that guarantee. If your application needs to know who someone is (a login flow), it needs OIDC's ID token, not just an OAuth access token.

## The authorization code flow, at a high level

\`\`\`text
1. Your app redirects the user to the identity provider (e.g. Google), with a
   requested scope and a redirect_uri your app registered in advance.
2. The user authenticates with the identity provider and approves the
   requested access.
3. The identity provider redirects back to your registered redirect_uri with
   a short-lived authorization code.
4. Your server exchanges that code, server-to-server, for an access token
   (and, with OIDC, an ID token) -- this exchange requires your app's own
   client secret, so a code intercepted in the browser redirect alone isn't
   sufficient to obtain a token.
5. Your server uses the access token to call the provider's API on the
   user's behalf, and/or validates the ID token to establish who logged in.
\`\`\`

The authorization code flow is deliberately structured so the actual token exchange happens server-to-server, using a confidential client secret, rather than the token ever appearing directly in a browser redirect — a design that specifically defends against a network observer or a malicious browser extension capturing it in transit.

## PKCE: protecting public clients

Single-page applications and mobile apps can't safely hold a client secret (anything shipped to the client can be extracted). Proof Key for Code Exchange (PKCE) closes this gap: the client generates a random secret value locally, sends a hashed version of it with the initial authorization request, and must present the original value during the token exchange — an attacker who intercepts the authorization code redirect still can't complete the exchange without the value that was only ever kept locally on the legitimate client. PKCE is now recommended for every OAuth client type, not only public clients without a secret.

## The redirect_uri is a critical, exact-match check

The identity provider must validate the redirect_uri on every request against an exact, pre-registered value — not a prefix match, not a pattern, not "any URL on this domain." A loose redirect_uri check is one of the most common real-world OAuth misconfigurations, and it directly enables an attacker to redirect the authorization code (or token) to a destination they control, turning a properly-designed flow into an open-redirect-style token theft, exactly the risk covered in Tier 2's open-redirect lesson, now with an OAuth code or token as the prize instead of a phishing link.

## Checklist

- Does the application ever treat a raw OAuth access token as proof of a user's identity, instead of validating an OIDC ID token for that purpose?
- Does the authorization code exchange happen server-to-server with a confidential client secret, or with PKCE for clients that can't hold one?
- Does the identity provider integration validate redirect_uri as an exact match against a pre-registered value, never a loose prefix or pattern?
- Is the requested OAuth scope limited to the minimum the application actually needs, rather than requesting broad access "in case it's useful later"?`,
        },
        {
          slug: "jwt-security-attacks-best-practices",
          title: "JWT Security: Common Attacks and Best Practices",
          estimatedMinutes: 9,
          content: `# JWT Security: Common Attacks and Best Practices

JSON Web Tokens (JWTs) are a compact, self-contained way to represent claims (a user ID, an expiration time, a role) as a signed token, widely used for API authentication and as the ID token format in OpenID Connect. Their self-contained nature — the server doesn't need to look anything up to validate one, in principle — is also exactly what makes JWT-specific implementation mistakes so consistently exploitable.

## Structure, briefly

A JWT is three base64url-encoded segments separated by dots: a header (describing the signing algorithm), a payload (the claims), and a signature (proving the header and payload haven't been tampered with, computed with a server-held secret or private key). Critically, the header and payload are only encoded, not encrypted — anyone who intercepts a JWT can trivially decode and read its contents. A JWT's guarantee is integrity (it wasn't altered) and authenticity (it was issued by whoever holds the signing key), never confidentiality.

## Attack 1: the "none" algorithm

\`\`\`text
Header:  { "alg": "none", "typ": "JWT" }
Payload: { "sub": "user123", "role": "admin" }
Signature: (empty)
\`\`\`

The JWT specification includes a legitimate "none" algorithm for cases where a signature genuinely isn't needed. Several early JWT libraries would honor whatever algorithm the token's own header claimed, meaning an attacker could take any valid token, change its algorithm to "none," strip the signature, and modify the payload freely — and a naive verifier would accept it, because it was never told to expect that particular header value.

\`\`\`python
# Vulnerable: trusts the algorithm specified in the token itself
decoded = jwt.decode(token, key, algorithms=jwt.get_unverified_header(token)["alg"])

# Fixed: the server dictates which algorithm(s) are acceptable, never the token
decoded = jwt.decode(token, key, algorithms=["RS256"])
\`\`\`

The fix is to always specify the accepted algorithm(s) explicitly on the verifying side, and reject anything else outright, rather than letting the token's own header dictate how it should be checked.

## Attack 2: algorithm confusion (RS256 to HS256)

Some libraries, when configured to accept either an asymmetric algorithm (RS256, verified with a public key) or a symmetric one (HS256, verified with a shared secret), can be tricked: if an attacker knows the server's RS256 public key (which is, by design, not secret — that's the point of asymmetric cryptography) and the server's verification code passes that same public key value as the HS256 secret when the token claims to use HS256, the attacker can forge a token by signing it with the public key treated as an HMAC secret, since the attacker knows that value.

The fix, again, is to pin the expected algorithm on the server side explicitly and refuse to honor whatever the token's header requests, plus using distinct, purpose-specific keys rather than reusing the same key material across algorithm types.

## Attack 3: missing or ineffective expiration

A JWT with no exp (expiration) claim, or one that's set unreasonably far in the future, remains valid indefinitely once issued. Because JWTs are typically validated statelessly (no server-side lookup to check if a specific token has been revoked), a compromised long-lived JWT can't simply be "logged out" the way a traditional server-side session can — the token remains valid until it either expires or the signing key itself is rotated.

## Practical guidance

- Always set a short exp on access tokens (minutes, not days), and use a separate, revocable refresh-token mechanism for longer-lived sessions rather than issuing long-lived JWTs directly.
- Pin the accepted signing algorithm(s) explicitly on the verifying side; never derive it from the token's own header.
- Keep sensitive data out of the payload entirely — remember it's readable by anyone who has the token, not just the server.
- Have a real revocation strategy for cases that demand it (a compromised token, a terminated employee's session) — a short-lived deny-list checked at validation time, or simply keeping access-token lifetimes short enough that revocation matters less.
- Validate the audience (aud) and issuer (iss) claims, not just the signature, so a token legitimately issued for one service can't be replayed against a different one that happens to trust the same signing key.

## Checklist

- Does the JWT verification code explicitly pin the accepted algorithm(s), rather than trusting the algorithm named in the token's own header?
- Are access tokens short-lived, with a separate, revocable mechanism for longer sessions?
- Is any sensitive data placed in a JWT payload, forgetting that it's readable, not encrypted, by anyone who obtains the token?
- Are audience and issuer claims validated, not just the cryptographic signature?`,
        },
        {
          slug: "api-keys-service-to-service-auth",
          title: "API Keys, Service-to-Service Auth, and Token Scoping",
          estimatedMinutes: 8,
          content: `# API Keys, Service-to-Service Auth, and Token Scoping

Not every caller of your API is a human user going through a login flow. Third-party integrations, internal microservices, and automated scripts typically authenticate with an API key or a service-level credential instead — and these have their own, distinct set of common mistakes, separate from the user-authentication and OAuth topics covered so far.

## API keys are bearer credentials — treat them accordingly

An API key is usually a bearer credential: whoever presents it is granted whatever access it carries, with no further proof required. This means API keys deserve the same handling rigor as passwords and session tokens — generated with a cryptographically secure random source, transmitted only over HTTPS, never logged in plaintext, and never embedded in a URL query string (URLs routinely end up in server logs, browser history, and Referer headers, all of which are far more widely accessible than a request body or header).

\`\`\`text
Vulnerable: GET /api/reports?api_key=sk_live_a1b2c3...
Better:     GET /api/reports  with header  Authorization: Bearer sk_live_a1b2c3...
\`\`\`

## Scope every credential to what it actually needs

The least-privilege principle from Tier 1 applies directly to API keys and service credentials: a key issued to a read-only reporting integration shouldn't be capable of writes; a key issued to one customer's integration shouldn't be able to access another customer's data even if it guesses their resource IDs. This means your API needs a real authorization check behind every key, not just a check that "some valid key was presented" — the same lesson as Broken Access Control and BOLA, applied to machine callers instead of human ones.

\`\`\`python
# Vulnerable: any valid API key can access any customer's data
@app.get("/api/customers/{customer_id}/invoices")
def get_invoices(customer_id: int, api_key: str = Header(...)):
    key_record = db.get_api_key(api_key)
    if not key_record:
        raise HTTPException(401)
    return db.get_invoices(customer_id)

# Fixed: the key's own scope determines which customer's data it may access
@app.get("/api/customers/{customer_id}/invoices")
def get_invoices(customer_id: int, api_key: str = Header(...)):
    key_record = db.get_api_key(api_key)
    if not key_record or key_record.customer_id != customer_id:
        raise HTTPException(403)
    return db.get_invoices(customer_id)
\`\`\`

## Service-to-service authentication

For calls between your own internal services, avoid relying on network location alone ("it's on the internal network, so it must be trusted") as the entire authentication mechanism — internal networks get compromised, and a single breached service shouldn't automatically gain trusted access to every other internal service. Mutual TLS (mTLS, where both sides present and verify certificates) or short-lived service tokens issued by an internal identity provider are stronger patterns, giving you the ability to identify, scope, and revoke access per calling service rather than trusting anything that simply happens to originate from inside the network perimeter.

## Key rotation and revocation

Every API key and service credential should be individually revocable without affecting every other credential, and rotating a key should be a routine, low-friction operation, not an emergency-only procedure. Supporting two active keys briefly during a planned rotation (so a client can switch over without a hard cutover causing an outage) is a common, worthwhile pattern. This connects directly back to the secrets-management lesson from Tier 3: a key that's hard to rotate is a key that's more likely to stay in use long after it should have been retired.

## Checklist

- Are API keys transmitted only via headers or request bodies over HTTPS, never as URL query parameters?
- Does every API-key-authenticated endpoint enforce the specific scope tied to that key, not just check that some valid key was presented?
- Is service-to-service authentication based on verifiable credentials (mTLS, short-lived service tokens), not solely on network location?
- Can any individual API key or service credential be revoked and rotated independently, without a coordinated outage?`,
        },
      ],
    },
    {
      title: "Security Beyond the Web: Mobile and Cloud Application Security",
      lessons: [
        {
          slug: "mobile-app-security-fundamentals",
          title: "Mobile Application Security Fundamentals",
          estimatedMinutes: 8,
          content: `# Mobile Application Security Fundamentals

Everything this course has covered so far applies to a mobile app's backend API exactly as it does to a web application's. But the mobile client itself — the compiled app running on a device you don't control — introduces its own distinct set of risks, because unlike a web page, a mobile app's code and stored data are physically present on a device an attacker (or the device's own user) can inspect at length, offline, without ever touching your servers.

## The client is not a trusted environment

A web browser at least runs your JavaScript inside a sandbox with some baseline protections. A mobile app, once installed, is fully under the device owner's control: it can be decompiled, its network traffic intercepted, its local storage inspected, and its logic patched or bypassed, all without needing to compromise your servers at all. The core mental shift this requires: anything that must remain secret or must not be tampered with cannot live solely on the client, no matter how the client is built.

## Insecure local data storage

Mobile apps frequently cache data locally for offline use or performance — and it's easy to store more than intended in a form that's trivially readable by anyone with access to the device (or, on a rooted/jailbroken device, by any other app).

\`\`\`text
Vulnerable: storing an OAuth refresh token, a full user profile including
government ID numbers, or a cached copy of sensitive documents in plain
SharedPreferences / UserDefaults / a plaintext local SQLite database.

Better: store only what's genuinely needed offline, use the platform's
dedicated secure storage (Android Keystore-backed EncryptedSharedPreferences,
iOS Keychain) for tokens and credentials, and treat anything cached locally
as a security-relevant design decision, not an implementation afterthought.
\`\`\`

## Hardcoded secrets in mobile binaries

An API key, a signing secret, or a hardcoded encryption key embedded in a mobile app's compiled binary is not meaningfully protected by the fact that it's "compiled" rather than "in source code" — decompiling a mobile app to extract embedded strings is a well-established, low-effort technique. Any credential that must remain secret cannot ship inside a client binary at all; it belongs on the server, with the mobile client authenticating as a specific installed instance rather than holding the actual shared secret itself.

## Insecure communication

Mobile apps must enforce the same transport-security requirements covered in Tier 3's encryption lesson — TLS everywhere, certificate validation never disabled for convenience during development and then accidentally shipped that way. Additionally, certificate pinning (validating that the server's certificate matches a specific, expected value, not merely that it's signed by any trusted certificate authority) is a mobile-specific hardening technique worth considering for especially sensitive apps, since it protects against a compromised or coerced certificate authority, at the cost of needing a deliberate update process when certificates legitimately rotate.

## Client-side security checks are UX, not security controls

Exactly as with client-side input validation on the web (Tier 1), any check performed only inside the mobile app — a jailbreak/root detection routine, a client-side license check, a "this feature requires a paid plan" gate — can be patched, bypassed, or simply skipped by an attacker running a modified build. These checks can be reasonable UX or abuse-friction measures, but the actual security-relevant enforcement (what data a user can access, what actions they're authorized for) must be enforced server-side, exactly as this course has emphasized for web clients throughout.

## Checklist

- Does the mobile app store tokens, credentials, or sensitive cached data in plain local storage instead of the platform's dedicated secure storage?
- Are any secrets that must remain confidential embedded directly in the compiled app, rather than kept server-side?
- Is TLS certificate validation always enforced in release builds, with certificate pinning considered for particularly sensitive apps?
- Is every security-relevant check the mobile app performs also independently enforced server-side, not trusted as a client-side gate alone?`,
        },
        {
          slug: "cloud-security-misconfigurations-iam",
          title: "Cloud Security Misconfigurations and IAM",
          estimatedMinutes: 9,
          content: `# Cloud Security Misconfigurations and IAM

Tier 3's earlier lesson on security misconfiguration mentioned publicly exposed cloud storage as one example among several. Cloud environments deserve a deeper, dedicated look, because misconfigurations here tend to be both extremely common in real incidents and structurally different from a typical application bug — they usually involve permissions and infrastructure settings, not application code at all.

## The shared responsibility model

Cloud providers secure the infrastructure underneath their services (the physical data centers, the hypervisor, in many cases the managed service's own software); you remain responsible for how you configure and use what you're given — access policies, network rules, data classification, and what you expose publicly. "We're on a major cloud provider" says nothing about whether a specific storage bucket, database, or API is correctly locked down; that responsibility never transfers away from the customer.

## Overly permissive IAM policies

Identity and Access Management (IAM) misconfiguration is consistently one of the most common root causes behind real cloud breaches. The failure pattern is familiar from this course's least-privilege principle, just at cloud-account scale:

\`\`\`text
Vulnerable: granting a service or developer role "*.*" / Administrator-equivalent
access because it was the fastest way to unblock a task, with a plan to
"tighten it up later" that never happens.

Better: grant only the specific actions on the specific resources a role
actually needs, using the cloud provider's policy simulation or access-analyzer
tooling to verify a policy grants no more than intended before it ships.
\`\`\`

Overly broad IAM roles are dangerous precisely because their damage potential is invisible until something goes wrong — a compromised credential or a single vulnerable service with an overly generous role can cascade into access far beyond what that specific component ever needed, echoing the SSRF-and-cloud-metadata risk covered earlier in this course.

## Publicly exposed storage and services

Object storage buckets, databases, and search indexes left publicly readable (or, worse, writable) by a default or overlooked setting are among the most common real-world cloud breach vectors, precisely because the misconfiguration is often silent — nothing crashes, no error is logged, the data is just quietly reachable by anyone who finds the URL or hostname. Regularly auditing what's actually publicly accessible (many cloud providers now offer built-in public-exposure alerts) rather than assuming defaults are safe is essential, especially since defaults have changed direction more than once across providers' histories.

## Excessive trust between environments

A staging or development environment with weaker controls that nonetheless shares credentials, database access, or a network path with production undermines whatever hardening production itself has — an attacker who compromises the weaker environment inherits a path into the stronger one. Environments should be isolated with their own credentials and, where feasible, their own cloud accounts or projects, not merely separated by naming convention within a single shared account.

## Infrastructure as code doesn't automatically mean secure

Managing infrastructure through code (Terraform, CloudFormation, and similar tools) is a major improvement for consistency and reviewability over manual console clicking, but a misconfigured policy defined in code is exactly as insecure as one clicked by hand — the format changed, not the need for review. Automated scanning of infrastructure-as-code for common misconfigurations (public buckets, overly broad IAM policies, missing encryption settings), ideally in CI before a change is applied, catches issues before they reach a live environment rather than after.

## Checklist

- Are IAM roles and policies scoped to the specific actions and resources a service or person actually needs, verified with policy analysis tooling rather than assumed?
- Is public accessibility of storage, databases, and other services actively and regularly audited, not just set once and assumed to remain correct?
- Are staging/development environments isolated from production credentials and network access, rather than sharing them for convenience?
- Is infrastructure-as-code scanned for common misconfigurations before changes are applied, the same way application dependencies are scanned?`,
        },
        {
          slug: "container-kubernetes-security-basics",
          title: "Container and Kubernetes Security Basics",
          estimatedMinutes: 8,
          content: `# Container and Kubernetes Security Basics

Most applications today ship inside containers, frequently orchestrated by Kubernetes or a similar platform. Containers and orchestration bring real operational benefits, but they also introduce a layer most of this course hasn't touched yet: the security of the image you build, and the runtime environment that executes it.

## Base image and image-build hygiene

A container image is built from a base image plus whatever your build process adds on top — and a base image is, itself, a dependency exactly like the packages covered in Tier 3's supply-chain lesson, with the same risks: known vulnerabilities, unmaintained upstream sources, and unnecessary bloat that expands attack surface.

\`\`\`text
Vulnerable: FROM some-base-image:latest
  -- "latest" is a moving target with no guarantee of what you actually get,
  -- and floating tags make builds non-reproducible and hard to audit.

Better: FROM some-base-image:3.12.4-slim@sha256:<digest>
  -- pinned to a specific, minimal, digest-verified version, scanned for
  -- known vulnerabilities as part of the build pipeline.
\`\`\`

Prefer minimal base images (slim or distroless variants) that don't include a shell, package manager, or debugging tools in the production image at all — none of that is needed to run the application, and each included tool is one more thing an attacker can use if they ever gain a foothold inside a running container.

## Don't run as root inside the container

Containers, by default in many setups, run as the root user inside the container's own namespace. If an attacker manages to break out of the application process (through a vulnerability in the application or one of its dependencies), running as root inside the container makes several container-escape techniques meaningfully easier, and gives an attacker who does escape broader capabilities inside the host than a properly restricted non-root user would.

\`\`\`text
Dockerfile fix: create and switch to a dedicated non-root user
  RUN adduser --disabled-password --uid 10001 appuser
  USER appuser
\`\`\`

## Secrets don't belong in images

Exactly as with source code (Tier 3's secrets-management lesson), a credential baked into a container image layer during the build remains recoverable from that layer even if a later layer appears to remove it, and every image push distributes it further. Secrets belong in a runtime-injected mechanism (environment variables sourced from a secrets manager, mounted secret volumes, or a Kubernetes-native secrets integration), never baked into the image itself.

## Kubernetes-specific hardening basics

- **Network policies** — by default, many Kubernetes clusters allow any pod to talk to any other pod; explicit network policies restricting which pods can communicate with which apply the same least-privilege and network-segmentation principles covered earlier in this course, at the pod-to-pod level.
- **Pod security standards** — restrict pods from running as privileged, from mounting the host's filesystem or network namespace, and from requesting capabilities they don't need, mirroring the non-root, minimal-image guidance above at the orchestration-policy level rather than leaving it to each Dockerfile's discipline alone.
- **RBAC (role-based access control)** — Kubernetes' own permission model for who and what can call the cluster's API should follow the same least-privilege principle as cloud IAM: a workload's service account should hold only the specific permissions it needs against the cluster API, not a broad or cluster-admin-equivalent role by default.
- **Secrets at rest** — Kubernetes Secrets are only base64-encoded by default, not encrypted, unless encryption at rest is explicitly enabled for the cluster's secret storage — a commonly missed configuration step that leaves them no more protected than plaintext to anyone with access to the underlying storage.

## Checklist

- Are container images built from pinned, minimal, digest-verified base images, scanned for known vulnerabilities in CI, rather than floating "latest" tags?
- Does the application inside the container run as a dedicated non-root user?
- Are secrets injected at runtime rather than baked into any image layer?
- Are Kubernetes network policies, pod security standards, and RBAC scoped to least privilege, and is encryption at rest enabled for cluster secrets?`,
        },
      ],
    },
    {
      title: "Secure SDLC, DevSecOps, and Incident Response",
      lessons: [
        {
          slug: "secure-sdlc-shift-left",
          title: "Secure SDLC and Shifting Security Left",
          estimatedMinutes: 8,
          content: `# Secure SDLC and Shifting Security Left

This course has covered a long list of individual vulnerability classes and defenses. This lesson steps back to address a process question: at what point in building software should security actually happen? The answer that's consistently validated by real-world experience — and the organizing idea behind "DevSecOps" — is: throughout, starting as early as possible, not as a gate bolted onto the end.

## What "shifting left" means

Visualize the software development lifecycle as a left-to-right timeline: requirements and design, implementation, build, testing, deployment, operation. "Shifting left" means moving security activities earlier on that timeline — catching a flawed assumption during design instead of during a pre-release security review, catching a vulnerable pattern while a developer is typing it instead of during a pen test months later. This is a direct extension of the cost-curve argument from this course's very first lesson: the earlier a flaw is caught, the cheaper it is to fix, and shifting left is the practice of deliberately engineering your process to catch things earlier.

## Security activities at each stage

- **Requirements and design** — threat modeling (covered in this course's threat-modeling lesson), security requirements defined alongside functional ones, not as a separate afterthought document.
- **Implementation** — secure coding standards, IDE-integrated linting for common security anti-patterns, and code review that explicitly includes the security-review checklist this course builds toward in its capstone.
- **Build** — dependency and container image scanning (Tier 3's supply-chain and container-security lessons), secret-scanning to catch credentials accidentally committed before they ever reach a shared branch.
- **Testing** — automated security testing (SAST and DAST, covered in depth in the next lesson) integrated into the same pipeline as functional tests, not run manually and occasionally.
- **Deployment** — infrastructure-as-code scanning, verifying signed artifacts (Tier 3's supply-chain lesson), and deploying with the least-privilege credentials the deployment step actually needs.
- **Operation** — the logging, alerting, and incident-response practices covered elsewhere in this tier, treating production as a phase that still needs active security attention, not a finish line.

## Why this is a cultural shift, not just a tooling one

Simply adding a security-scanning tool to a CI pipeline without changing anything else tends to produce a wall of findings nobody has ownership of fixing, which teams learn to ignore within a few weeks. The practices that actually work treat security findings the same way a team treats a failing test or a broken build: owned by whoever's change introduced it, triaged promptly, and blocking merge for genuinely high-severity issues rather than accumulating in a backlog nobody revisits. This is why DevSecOps is described as a culture and practice, not a product you install — the tools support the shift, but the shift itself is in how a team assigns ownership and urgency to what the tools find.

## A lightweight way to start

You don't need a fully mature security program to begin shifting left. A practical starting sequence: add dependency and secret scanning to CI first (highest signal-to-effort ratio, and the checks covered in this course's supply-chain lesson); add the security-review checklist explicitly to your team's code review template next; introduce a brief threat-modeling pass for new features with real external-facing surface area; and only then invest in more involved testing like DAST scanning, once the earlier, cheaper stages are already catching the more common issues.

## Mental model

Every stage of the SDLC this lesson lists is a chance to catch a problem before the next, more expensive stage does. A vulnerability that reaches production wasn't necessarily missed by one team doing a bad job — it's usually a sign that every earlier stage that could have caught it didn't have a check in place to do so. Shifting left is the discipline of adding those checks progressively earlier, rather than accepting that security review at the very end is the only place issues get caught.

## Checklist

- Is threat modeling part of the design conversation for new features with meaningful external attack surface, not just something covered in a training course?
- Are dependency scanning, secret scanning, and container image scanning integrated into CI, blocking merge for high-severity findings, rather than run manually and occasionally?
- Does code review explicitly include a security pass (the capstone checklist from this course is one starting point), rather than assuming security is someone else's separate review?
- Is there clear ownership for triaging and fixing security findings from automated tools, rather than findings accumulating in an unowned backlog?`,
        },
        {
          slug: "sast-dast-security-testing",
          title: "SAST, DAST, and Security Testing in CI/CD",
          estimatedMinutes: 9,
          content: `# SAST, DAST, and Security Testing in CI/CD

The previous lesson mentioned automated security testing as one stage in a secure SDLC. This lesson goes into the two dominant categories of automated application security testing — SAST and DAST — what each one actually catches, and why most mature programs run both rather than choosing one over the other.

## Static Application Security Testing (SAST)

SAST tools analyze your source code, bytecode, or binaries without running the application, looking for patterns known to be dangerous: string-concatenated SQL queries, calls to a shell with unsanitized input, use of a deprecated cryptographic function, a hardcoded credential left in a source file.

**Strengths**: runs early, directly on code, without needing a running environment; can point precisely at the offending line; integrates naturally into the same pull-request workflow as linting and unit tests, catching issues before merge.

**Limitations**: SAST tools reason about code structure and known-dangerous patterns, not runtime behavior, which means they're prone to false positives (flagging a pattern that's actually handled safely nearby) and can miss vulnerabilities that only manifest through the way multiple components interact at runtime, or through business-logic flaws like the ones covered earlier in this tier, which have no unsafe syntax pattern to detect at all.

## Dynamic Application Security Testing (DAST)

DAST tools interact with a running application from the outside, the way an actual attacker would — sending crafted HTTP requests to a live (typically staging) instance and observing the responses for signs of a vulnerability, without any access to or knowledge of the source code.

**Strengths**: tests the application as it's actually deployed and configured, catching issues that only exist in the deployed environment (a missing security header, a misconfiguration that source code alone wouldn't reveal) and issues in components without available source code at all (a third-party service, a legacy system).

**Limitations**: runs later in the pipeline, against a running instance, so feedback arrives after the code is already built and deployed somewhere; can struggle to reach deeply nested or unusual application states without guidance (a multi-step workflow with a business-logic flaw, again, may be invisible to a generic crawler that doesn't know the intended flow); and generally can't point to a specific line of source code the way SAST can, only the request/response pair that revealed the issue.

## Why teams run both, not one instead of the other

\`\`\`text
                SAST                          DAST
When:      pre-build, on source code      post-deploy, on a running app
Sees:      source code structure          actual runtime behavior
Catches:   known-dangerous code patterns  misconfigurations, runtime-only issues
Misses:    runtime/environment issues     business logic, code without a running instance
\`\`\`

SAST and DAST look for different things, from different vantage points, at different pipeline stages, which is precisely why they're complementary rather than substitutes for one another — the categories one is weak at tend to be exactly where the other is strong. Software Composition Analysis (SCA — the dependency-scanning practice from Tier 3's supply-chain lesson) is often grouped alongside these two as a third pillar, since it addresses a risk neither SAST nor DAST is designed to catch well: known vulnerabilities in third-party code you didn't write.

## Neither replaces manual review or threat modeling

Both SAST and DAST are pattern- and behavior-based, and neither can reason about whether a feature's business rules make sense, whether a design decision considered its abuse case, or whether a genuinely novel vulnerability class exists that no tool has been taught to recognize yet. Automated testing raises the floor efficiently and cheaply; it doesn't replace the human judgment this entire course has been building toward, particularly for business logic and design-level issues.

## Checklist

- Is SAST integrated into the pull-request or pre-merge workflow, giving developers feedback before code is merged, not just periodically?
- Is DAST run against a realistic staging environment on a regular cadence, or before major releases, and are its findings actually triaged rather than archived?
- Is dependency/SCA scanning treated as a distinct, necessary third pillar alongside SAST and DAST, not assumed to be covered by either?
- Is it understood, by the team relying on these tools, that neither SAST nor DAST reliably catches business logic flaws or design-level issues, which still require human review?`,
        },
        {
          slug: "incident-response-basics-for-developers",
          title: "Incident Response Basics for Developers",
          estimatedMinutes: 8,
          content: `# Incident Response Basics for Developers

Every defense covered in this course reduces the likelihood of a security incident; none of them reduce it to zero. At some point, a well-run engineering organization will have to respond to a real security incident — and developers, not just a dedicated security team, are usually essential participants in that response, because they're the ones who understand the system well enough to investigate and fix it quickly.

## What counts as a security incident

A security incident is any event that indicates a security control has failed or been bypassed: a confirmed data breach, but also a suspicious pattern that hasn't been fully explained yet (an unexplained spike in failed logins, an alert from the logging-and-alerting pipeline covered earlier in this tier, a report from an external security researcher, a dependency vulnerability disclosed for a package your production system uses). Treating only fully-confirmed breaches as "real" incidents, and dismissing early signals as noise, is how a fast, contained response turns into a slow, sprawling one.

## The rough shape of an incident response

\`\`\`text
1. Detect     -- an alert fires, a report comes in, or a suspicious pattern
                 is noticed (the logging/alerting practice from this tier
                 is what makes this stage possible at all).
2. Contain    -- limit ongoing damage first, even before the full cause is
                 understood: revoke a suspected-compromised credential,
                 disable an exploited endpoint, isolate an affected service.
3. Eradicate  -- fix the actual root cause: patch the vulnerability, remove
                 any backdoor or unauthorized access the attacker established.
4. Recover    -- restore normal operation, verifying the fix actually holds
                 under the same conditions that triggered the incident.
5. Review     -- a blameless post-incident review: what happened, what let
                 it happen, what will change so the same gap doesn't recur.
\`\`\`

## Why "contain first, fully understand later" is the right order

A natural developer instinct is to want to fully understand a problem before acting on it — the same instinct that serves well when debugging a normal production incident. In a security incident, this instinct can cost valuable time an active attacker is using to do more damage. The priority order is different: take the fastest safe action that stops ongoing harm (rotating a likely-compromised key, disabling a specific exploited endpoint) even before the full extent or root cause is understood, and continue investigating in parallel rather than waiting for complete certainty first.

## What developers specifically contribute

- **Fast, accurate technical context** — which systems the affected code touches, what data it has access to, and what a specific vulnerability actually allows, information a dedicated security or incident-response team may not have without the developer who wrote or maintains the code.
- **Safe, verified fixes** — writing and validating an actual code fix for the root cause, ideally with the same review rigor as any other production change, even under time pressure, since a rushed fix that introduces a new bug compounds the incident rather than resolving it.
- **Evidence preservation** — resisting the urge to immediately delete or overwrite something that looks like attacker activity before it's been examined or copied; logs, affected records, and the state of a compromised system are all part of understanding what actually happened and are useful for both the internal review and any legal or disclosure obligations.

## Communication discipline during an incident

Speculation shared as fact spreads quickly during a live incident and is hard to walk back. Sticking to what's actually confirmed, being explicit about what's still unknown, and channeling updates through whatever the organization's designated incident-communication process is (rather than parallel, inconsistent updates from multiple people) keeps a chaotic situation from becoming a confused one on top of it.

## The blameless postmortem

The review stage works only if people are willing to be candid about what actually happened, including their own role in it — which requires the review to focus on what allowed the incident (a missing check, a gap in the deploy process, an assumption nobody questioned) rather than on assigning individual blame. A team that fears blame in a postmortem will, rationally, share less detail next time, which is precisely the opposite of what makes the next incident easier to catch and contain.

## Checklist

- Does the team have a rough, agreed-upon shape for incident response (detect, contain, eradicate, recover, review), even informally, rather than improvising the process for the first time during an actual incident?
- Is the instinct, during a live incident, to take a fast, safe containment action first, rather than waiting for full understanding before acting at all?
- Is evidence (logs, affected records, system state) preserved rather than immediately cleaned up, once something looks like active attacker behavior?
- Does the organization run blameless post-incident reviews focused on process and system gaps, rather than individual fault?`,
        },
      ],
    },
    {
      title: "API Security and Secure-by-Design Capstone",
      lessons: [
        {
          slug: "api-security-fundamentals",
          title: "API Security Fundamentals",
          estimatedMinutes: 9,
          content: `# API Security Fundamentals

Most of what this course has covered applies just as much to APIs as to traditional web applications — injection, broken access control, and authentication failures don't care whether the response is HTML or JSON. But APIs, especially those consumed by mobile apps, single-page applications, and third-party integrations, have a few failure patterns that deserve specific attention.

## Broken Object Level Authorization (BOLA)

This is the API-specific name for the IDOR pattern covered in Tier 2, and it's consistently the most common and most severe API-specific vulnerability found in real-world testing. Any endpoint that accepts an object identifier must verify that the authenticated caller is actually authorized to access that specific object, not merely that they're authenticated at all. Because APIs are often called directly by scripts and tools rather than only through a UI that hides unauthorized options, BOLA is often trivial to find and exploit by simply enumerating IDs.

## Mass assignment

Mass assignment happens when an API endpoint automatically maps every field in a request body onto a data object, without restricting which fields the client is actually allowed to set.

\`\`\`text
Client sends, when updating their own profile:
{ "display_name": "Alex", "is_admin": true }
\`\`\`

\`\`\`python
# Vulnerable: every field in the request body is applied directly
user.update(**request.json)

# Fixed: only explicitly allowed fields can be set this way
allowed_fields = {"display_name", "bio", "avatar_url"}
updates = {k: v for k, v in request.json.items() if k in allowed_fields}
user.update(**updates)
\`\`\`

If the vulnerable version is deployed, a user updating their own display name could also sneak an admin flag into the same request body, and if the framework maps request fields directly onto the database model, they've just granted themselves administrator access.

## Rate limiting and resource exhaustion

Without rate limiting, an API is exposed to brute-force credential attacks, scraping of an entire dataset through repeated enumeration, and simple resource-exhaustion denial of service from a client that sends far more requests than any legitimate use case would. Rate limiting should be applied per-user or per-API-key, not just per-IP-address (which is easy to rotate around), and set tightly on especially sensitive endpoints like login and password reset.

## Excessive data exposure

It's common, especially with APIs built by directly serializing an internal data model, for an endpoint to return far more fields than the calling client actually needs, trusting the frontend to simply not display the extra fields. This is risky because it puts sensitive data (internal flags, other users' partial data included by a sloppy join, hashed passwords) on the wire, where it's visible to anyone inspecting the raw response, regardless of what the UI chooses to render. APIs should explicitly define and return only the fields a given response is meant to expose, rather than serializing an entire internal object by default.

## Checklist

- Does every endpoint that accepts an object ID verify the caller is authorized for that specific object, not just authenticated in general?
- Are update endpoints restricted to an explicit allowlist of fields the client may set, rather than accepting and applying the entire request body?
- Is rate limiting applied per-user/per-key on sensitive endpoints, not just relied on at the network level?
- Do API responses return only the fields a client actually needs, rather than the full internal object?`,
        },
        {
          slug: "threat-modeling-basics",
          title: "Secure by Design: Threat Modeling Basics",
          estimatedMinutes: 9,
          content: `# Secure by Design: Threat Modeling Basics

Every lesson so far in this course has focused on recognizing and fixing a specific class of vulnerability once it exists in code. Threat modeling moves the work earlier: it's a structured way to think through how a system could be abused while it's still being designed, before a single line of implementation exists, directly addressing the Insecure Design category (A06:2025) from the OWASP Top 10.

## Why this matters more than late-stage code review

A code review can catch a missing input check. It generally cannot catch that an entire feature's business logic assumes something an attacker can trivially violate — for example, a checkout flow that trusts a client-submitted price, or a referral-bonus system that never considers what happens if a user refers themselves through a second account. These aren't bugs in a specific line of code; they're gaps in what the design considered at all, and no amount of careful implementation of a flawed design fixes the flaw.

## A lightweight framework: STRIDE

STRIDE is a widely used mnemonic for categories of threat to consider for a given piece of a system:

- **Spoofing** — could someone convincingly pretend to be a user, service, or component they aren't?
- **Tampering** — could someone modify data or code in a way they shouldn't be able to?
- **Repudiation** — could someone deny having taken an action, because there's no reliable record that they did?
- **Information disclosure** — could someone see data they shouldn't have access to?
- **Denial of service** — could someone make the system, or part of it, unavailable to legitimate users?
- **Elevation of privilege** — could someone gain capabilities beyond what they should have?

You don't need a formal workshop to get value from this. Running through the six letters against a new feature's design for a few minutes, asking how each category of abuse could apply here, regularly surfaces issues that a purely functional design discussion misses entirely.

## A practical, lightweight process

1. **Draw the data flow** — what data moves between which components, and where are the trust boundaries (Tier 1's concept, made concrete here)?
2. **Ask "what could go wrong" at each boundary** — apply STRIDE, or simply "how could this be abused," at each point data crosses a trust boundary.
3. **Decide what's worth mitigating now** — not every theoretical threat justifies engineering effort; weigh likelihood and impact, and document the ones you're consciously choosing to accept for now versus the ones you're fixing before shipping.
4. **Revisit when the design changes** — a threat model is a snapshot; a significant change to the feature (a new integration, a new user role) is a reason to revisit it, not a one-time exercise you complete and file away.

## A concrete example

A "referral bonus" feature: user A shares a link, user B signs up using it, and both receive a credit. A purely functional design might stop there. A five-minute threat-modeling pass immediately raises questions the functional spec didn't: What stops user A from creating a second account and referring themselves repeatedly? Is there a limit on how many referral credits a single account can accumulate? Is the referral relationship logged in a way that could be investigated if abuse is suspected? None of these require exotic attack techniques to find — they require asking the question before the feature ships rather than after fraud is discovered in production.

## Mental model

Threat modeling isn't a separate discipline reserved for security specialists — it's the habit of asking "how would I abuse this if I were trying to?" about your own design, before someone else asks it for you in production. Building this into design discussions and planning documents, even briefly, catches an entire category of issues that no amount of secure coding technique can retroactively fix.`,
        },
        {
          slug: "logging-monitoring-exceptional-conditions",
          title: "Logging, Alerting, and Handling Exceptional Conditions Securely",
          estimatedMinutes: 8,
          content: `# Logging, Alerting, and Handling Exceptional Conditions Securely

The last two categories in the OWASP Top 10:2025 — Security Logging and Alerting Failures, and Mishandling of Exceptional Conditions — are easy to overlook because they're not about a specific exploitable input. They're about whether your system notices when something is going wrong, and behaves safely when it does.

## What to log

Security-relevant events deserve deliberate, consistent logging: authentication attempts (successful and failed), access-control denials, password and permission changes, and high-value business actions (large transactions, administrative operations). The goal is being able to reconstruct what happened during an investigation, who did what, from where, and when, not logging everything indiscriminately.

## What not to log

Logs are frequently under-protected relative to the primary database, which makes them a poor place for secrets. Never log passwords, even failed attempts (a user who mistypes their password into the username field would otherwise have their real password recorded in a log file), full credit card numbers, authentication tokens, or other sensitive personal data in plaintext. A useful habit: before adding a log line, ask whether this exact data, sitting in a log aggregation tool that more people have access to than the production database, would be a problem if it leaked.

## Logging without alerting is a false sense of security

A log entry that nobody ever looks at until after an incident provides no protection during the incident itself; it's only useful for the postmortem. This category was specifically renamed from "monitoring" to "alerting" to emphasize this: the goal is a pipeline where a suspicious pattern (repeated failed logins from one account, a sudden spike in access-control denials, a user account suddenly performing at a volume wildly outside its normal pattern) triggers a notification to a human in something close to real time, not just an entry that exists to be found later.

## Handling exceptional conditions securely

Mishandling of Exceptional Conditions covers what happens when something goes wrong, an unexpected input, a downstream service timing out, an edge case nobody wrote a test for, and whether the system's response to that failure is itself secure.

\`\`\`python
# Vulnerable: fails open -- if the fraud-check service times out,
# the transaction proceeds anyway
try:
    fraud_check_result = fraud_service.check(transaction, timeout=2)
    if fraud_check_result.is_fraudulent:
        reject(transaction)
    else:
        approve(transaction)
except TimeoutError:
    approve(transaction)  # dangerous: silently allows the transaction through

# Fixed: fails closed -- an inability to check is treated as "cannot approve"
try:
    fraud_check_result = fraud_service.check(transaction, timeout=2)
    if fraud_check_result.is_fraudulent:
        reject(transaction)
    else:
        approve(transaction)
except TimeoutError:
    reject(transaction)  # or queue for manual review -- never silently approve
\`\`\`

The general principle is failing closed rather than failing open: when a security-relevant check can't be completed, the safe default is to deny or hold the action, not to let it through on the assumption that failures are rare and probably harmless. This applies well beyond fraud checks: an authorization service that's unreachable should not result in access being granted by default, and a rate limiter that errors shouldn't silently stop limiting.

## Checklist

- Are authentication events, access-control denials, and high-value actions logged with enough context to investigate later?
- Are passwords, tokens, and full sensitive-data values kept out of logs entirely?
- Is there active alerting on suspicious patterns, not just passive log storage?
- Do security-relevant checks fail closed (deny by default) when a dependency errors or times out, rather than failing open?`,
        },
        {
          slug: "security-code-review-checklist",
          title: "Capstone: The Security Code Review Checklist",
          estimatedMinutes: 10,
          content: `# Capstone: The Security Code Review Checklist

This final lesson pulls the entire course together into a single, practical tool: a checklist you can actually use during code review, organized around the categories covered in each tier. It won't catch everything, no checklist does, but it systematizes the questions this course has spent nine modules building intuition for, so you don't have to rediscover them from scratch on every pull request.

## Trust boundaries and input handling

- Does this change accept data from outside the system (user input, a third-party API response, a file, a queue message)?
- Is that input validated server-side against an explicit allowlist of type, length, format, and range, not just checked client-side?
- Is any output rendered into HTML, an attribute, JavaScript, or a URL properly encoded for that specific context, with no unescaped-HTML-style escape hatch applied to unsanitized user content?

## Injection

- Does any code build a SQL query, shell command, or template by concatenating or interpolating untrusted input, rather than using parameterized queries, argument lists, or safe template APIs?
- If a raw-query or shell escape hatch is used, are values still passed as parameters, not interpolated into the string?

## Access control

- Does every endpoint that accepts an object ID verify the requesting user is actually authorized for that specific object, not just authenticated in general?
- Is the user's role or permission always looked up server-side, never trusted from a client-supplied field?
- Is the default posture "deny unless explicitly authorized"?

## Authentication and session handling

- Are passwords hashed with Argon2 or bcrypt, with no plaintext or fast-hash storage anywhere in the flow?
- Do session cookies set Secure, HttpOnly, and an appropriate SameSite value?
- Is a new session issued at login, and are sessions invalidated server-side on logout and password change?
- Does the password-reset flow use a single-use, short-lived, high-entropy token?

## Cryptography and secrets

- Is sensitive data encrypted in transit (HTTPS enforced) and at rest?
- Are any secrets — API keys, database passwords, encryption keys — hardcoded in source or committed to version control, instead of loaded from environment variables or a secrets manager?
- Are security-sensitive random values generated from a cryptographically secure source?

## Configuration and dependencies

- Are default credentials changed, debug endpoints disabled, and verbose error details kept out of production responses?
- Is there automated dependency scanning in CI, and are dependencies kept reasonably current?
- Are lockfiles committed, and is package integrity verification enabled?

## APIs specifically

- Do update endpoints restrict which fields a client can set (no mass assignment), rather than applying the entire request body?
- Is rate limiting applied per-user/per-key on sensitive endpoints?
- Do responses return only the fields a client actually needs?

## Design, logging, and failure handling

- Was this feature's abuse case considered during design (a quick STRIDE pass), not just its happy path?
- Are security-relevant events logged with enough context to investigate, without logging secrets or full sensitive values?
- Is there alerting on suspicious patterns, not just passive log storage?
- Do security-relevant checks fail closed (deny by default) if a dependency errors or times out?

## How to actually use this in review

Don't try to run this entire checklist against every single-line change, that's how checklists stop being used at all. Instead, match the relevant section to what the change actually touches: a change to a login endpoint should trigger the authentication and access-control sections; a new dependency should trigger the configuration-and-dependencies section; a new API route should trigger the API section. Over time, the goal isn't to keep consulting this list forever; it's that the questions on it become the automatic second thoughts you have while writing the code in the first place, which is exactly the shift in mindset this course opened with.`,
        },
      ],
      quiz: {
        title: "Tier 3 Checkpoint: Cryptography, Supply Chain, and Secure Design",
        questions: [
          {
            text: "Why is 'don't roll your own crypto' considered strong advice even for experienced engineers?",
            optionA: "Custom implementations are always slower than library implementations",
            optionB:
              "Cryptographic algorithms and protocols have subtle failure modes (timing side-channels, IV reuse, padding oracles) that are invisible in normal testing",
            optionC: "Only government agencies are legally allowed to implement cryptography",
            optionD: "Custom crypto is always more expensive to license",
            correctOption: "B",
          },
          {
            text: "What is the main difference in threat model between encryption in transit and encryption at rest?",
            optionA: "They protect against the same threat and are interchangeable",
            optionB:
              "In transit protects data while moving over a network, such as interception; at rest protects data on storage media from direct access, such as a stolen disk or leaked backup",
            optionC: "Encryption at rest is only relevant for mobile applications",
            optionD: "In transit encryption is optional if at-rest encryption is enabled",
            correctOption: "B",
          },
          {
            text: "A developer commits an API key to a git repository, then removes it in the next commit. What is the correct response?",
            optionA: "Nothing further is needed since the current codebase no longer contains the key",
            optionB:
              "Rotate (replace) the credential immediately, since it remains readable in the repository's history",
            optionC: "Rename the environment variable that stores it",
            optionD: "Add the file to .gitignore going forward",
            correctOption: "B",
          },
          {
            text: "Why did Software Supply Chain Failures become its own dedicated category in the OWASP Top 10:2025?",
            optionA: "Because it is easier to test for than injection vulnerabilities",
            optionB:
              "Because compromising a single widely-used package or build pipeline can compromise every downstream application depending on it, reflecting a real shift in attacker behavior",
            optionC: "Because it replaced Cryptographic Failures entirely",
            optionD: "Because dependencies are no longer considered part of an application's attack surface",
            correctOption: "B",
          },
          {
            text: "What is 'dependency confusion'?",
            optionA: "Forgetting to update a dependency to its latest version",
            optionB:
              "An attacker publishes a public package with the same name as an internal private package, hoping misconfigured tooling pulls the attacker's version instead",
            optionC: "Two developers using different versions of the same library in the same project",
            optionD: "A dependency that has conflicting license terms",
            correctOption: "B",
          },
          {
            text: "What is 'mass assignment' in the context of API security?",
            optionA: "Sending the same request to many API endpoints simultaneously",
            optionB:
              "An endpoint automatically applies every field in a request body to a data object, letting a client set fields (like an admin flag) it shouldn't be able to",
            optionC: "Rate limiting multiple users at once",
            optionD: "Returning too many records in a single paginated response",
            correctOption: "B",
          },
          {
            text: "What does it mean for a security check to 'fail closed' rather than 'fail open'?",
            optionA: "The system stops logging when an error occurs",
            optionB:
              "When a security-relevant check cannot be completed, such as a timeout, the system denies or holds the action by default rather than allowing it through",
            optionC: "The application shuts down entirely whenever any error occurs",
            optionD: "Failed login attempts are permanently locked out with no recovery option",
            correctOption: "B",
          },
          {
            text: "In the STRIDE threat-modeling framework, which category concerns whether someone could deny having taken an action due to a lack of reliable records?",
            optionA: "Spoofing",
            optionB: "Tampering",
            optionC: "Repudiation",
            optionD: "Elevation of privilege",
            correctOption: "C",
          },
          {
            text: "Why is Broken Object Level Authorization (BOLA) considered especially common and severe in APIs specifically?",
            optionA: "APIs cannot use HTTPS, making them inherently less secure",
            optionB:
              "APIs are frequently called directly by scripts and tools rather than only through a UI that hides unauthorized options, making missing per-object authorization checks easy to find and exploit by enumerating IDs",
            optionC: "APIs never use authentication tokens",
            optionD: "BOLA only affects GraphQL APIs, not REST APIs",
            correctOption: "B",
          },
          {
            text: "A code review checklist item asks whether a new login-related change hashes passwords with Argon2 or bcrypt and sets Secure, HttpOnly, and SameSite on session cookies. Which two OWASP Top 10:2025 categories does this checklist item most directly address?",
            optionA: "Software Supply Chain Failures and Security Misconfiguration",
            optionB: "Injection and Insecure Design",
            optionC: "Authentication Failures and Cryptographic Failures",
            optionD: "Mishandling of Exceptional Conditions and Security Logging and Alerting Failures",
            correctOption: "C",
          },
        ],
      },
    },
  ],
};

export default content;
