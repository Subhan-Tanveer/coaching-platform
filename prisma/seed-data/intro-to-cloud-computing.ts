import type { CourseContentSeed } from "./types";

const content: CourseContentSeed = {
  courseSlug: "intro-to-cloud-computing",
  courseTitle: "Intro to Cloud Computing",
  courseDescription:
    "A vendor-neutral, zero-to-solid-fundamentals course covering how cloud computing actually works — service models, global infrastructure, compute, storage, networking, databases, scaling, security, and cost — so you can reason about any cloud platform, not just memorize one vendor's console.",
  modules: [
    {
      title: "What Is Cloud Computing?",
      lessons: [
        {
          slug: "what-is-cloud-computing",
          title: "What Is Cloud Computing?",
          estimatedMinutes: 8,
          content: `# What Is Cloud Computing?

Cloud computing means renting computing resources — servers, storage, databases, networking, software — from a provider over the internet, instead of buying and running the physical hardware yourself.

The U.S. National Institute of Standards and Technology (NIST) defines cloud computing around five essential characteristics. It's worth knowing these because they show up, worded slightly differently, in every major vendor's own definition:

- **On-demand self-service** — you can provision a server or a database in minutes through a web console, CLI, or API, with no human at the provider needing to approve it.
- **Broad network access** — resources are available over the network and reachable from laptops, phones, and other servers, not just from inside one building.
- **Resource pooling** — the provider's physical hardware is shared across many customers using virtualization, while keeping each customer's data and workloads isolated.
- **Rapid elasticity** — capacity can scale up or down quickly, often automatically, to match real demand.
- **Measured service** — usage is metered (CPU-hours, gigabytes stored, requests served), and you're billed for what you actually consumed.

## Why it matters

Before cloud computing, a company that wanted a website had to buy physical servers, install them in a data center (or build one), wire up networking, and hire staff to keep it all running. That took weeks or months, and the hardware had to be sized for the *busiest* day the business might ever have — meaning it sat mostly idle the rest of the time.

Cloud computing flips that around:

- **No hardware to buy or maintain** — the provider owns and maintains the physical machines, cooling, power, and networking.
- **Pay only for what you use** — a server can exist for ten minutes to run a batch job and then disappear, and you're billed for those ten minutes.
- **Scale up or down in minutes** — instead of guessing capacity a year in advance, you add resources when traffic grows and remove them when it doesn't.
- **Global reach** — you can put a copy of your application close to users in Singapore, Ireland, and Ohio without building three data centers.

Here's a simple example of interacting with a cloud provider's API to check on running resources — note that from the caller's point of view, there's no physical machine to think about, just an HTTPS endpoint:

\`\`\`bash
curl -H "Authorization: Bearer $API_TOKEN" \\
  https://api.cloudprovider.example.com/v1/instances
\`\`\`

The response is just JSON describing virtual servers somewhere in the provider's data centers — you never need to know (or care) which physical rack they're running on.

## Mental model

Think of cloud computing like an electric utility. A hundred years ago, factories that needed power had to build and run their own generators. Once electric utilities existed, factories stopped generating their own power — they just plugged in and paid for what they consumed, metered in kilowatt-hours. Cloud computing does the same thing for computing power, storage, and networking: you plug in and pay for compute-hours, gigabytes, and gigabytes transferred, instead of owning the "generator."
`,
        },
        {
          slug: "on-premises-vs-cloud",
          title: "On-Premises vs. Cloud Computing",
          estimatedMinutes: 9,
          content: `# On-Premises vs. Cloud Computing

"On-premises" (often shortened to "on-prem") means running your own servers on hardware that your organization owns and physically operates — typically in a company-owned data center or a rented rack in a colocation facility. Cloud computing means renting that same capability from a provider like AWS, Microsoft Azure, or Google Cloud.

## Comparing the two models

| | On-Premises | Cloud |
|---|---|---|
| Upfront cost | High (buy servers, racks, cooling, networking) | Little to none |
| Cost model | CapEx (capital expenditure) | OpEx (operating expenditure, pay-as-you-go) |
| Time to provision new capacity | Weeks to months (order, ship, rack, wire, configure) | Minutes |
| Who maintains hardware | Your own staff | The provider |
| Scaling for a traffic spike | Requires buying more hardware in advance | Add capacity on demand, remove it after |
| Physical security | Your responsibility | The provider's responsibility |
| Global footprint | Limited to where you build data centers | Instant access to data centers worldwide |

The CapEx vs. OpEx distinction is one of the most practically important differences. Buying a rack of servers is a capital expense — a large upfront payment for an asset you now own and must depreciate over years, whether or not you fully use it. Renting cloud capacity is an operating expense — a recurring cost tied directly to consumption, which is far easier for a finance team to forecast and adjust.

## It's rarely all-or-nothing

Very few organizations are purely "on-prem" or purely "cloud." Common patterns include:

- **Lift-and-shift** — moving existing on-prem applications to cloud virtual machines largely unchanged, to escape aging hardware and data center leases.
- **Hybrid cloud** — keeping some workloads on-prem (often for regulatory, latency, or legacy-hardware reasons) while running others in the cloud, connected by a private network link.
- **Cloud-native new development** — building brand-new applications directly on managed cloud services from day one, skipping on-prem entirely.

\`\`\`text
On-prem data center                  Cloud provider
+-------------------+                +----------------------+
| You own:          |                | Provider owns:       |
|  - Physical racks |                |  - Physical racks    |
|  - Cooling/power  |   <-- VPN -->  |  - Cooling/power     |
|  - Networking gear|                |  - Networking gear   |
| You manage:       |                | You manage:          |
|  - Everything     |                |  - Your VMs/apps only|
+-------------------+                +----------------------+
\`\`\`

## Common mistake

A common misconception is that "moving to the cloud" automatically makes an application cheaper or better designed. If you take a poorly optimized on-prem application and copy it, unchanged, onto cloud virtual machines that run 24/7, you can easily end up paying *more* than you did on-prem — you've simply swapped owning fixed hardware for renting equivalent capacity continuously, without gaining any of the elasticity or managed-service benefits that make the cloud cost-effective in the first place. Realizing cloud economics usually requires rethinking the architecture — using auto-scaling, managed databases, and serverless components — not just relocating servers.
`,
        },
        {
          slug: "characteristics-of-cloud-computing",
          title: "The Core Characteristics of Cloud Computing",
          estimatedMinutes: 8,
          content: `# The Core Characteristics of Cloud Computing

Every cloud platform, whatever vendor built it, shares a common set of traits. Understanding these traits — rather than memorizing one vendor's product names — is what lets you evaluate any cloud offering, including ones that don't exist yet.

## On-demand self-service

You provision what you need, when you need it, without waiting on a person. A developer can spin up a new database at 2 a.m. through a console or a single API call:

\`\`\`bash
cloudctl database create \\
  --engine postgres \\
  --size small \\
  --region us-east
\`\`\`

No procurement form, no ticket queue, no waiting for someone in IT to rack a server.

## Broad network access

Cloud resources are designed to be reached over standard internet protocols from a wide range of devices — laptops, phones, other cloud services, on-prem servers over a VPN. This is different from a traditional data center resource that might only be reachable from inside the corporate network.

## Resource pooling and multi-tenancy

Underneath, a cloud provider runs enormous numbers of physical servers. Your virtual machine is one of potentially many virtual machines — belonging to many different customers — running on the same physical hardware, isolated from each other by virtualization software (a hypervisor). This is called **multi-tenancy**. It's what lets providers achieve massive economies of scale: instead of every customer over-provisioning their own hardware for peak load, the provider pools demand across thousands of customers whose peaks rarely align, and runs the aggregate far more efficiently.

## Rapid elasticity

Capacity can grow or shrink automatically based on real demand, often within seconds or minutes, and often without a human triggering it. An e-commerce site can automatically add web servers during a flash sale and remove them once traffic subsides.

## Measured service

Everything is metered: CPU-seconds, gigabytes stored, requests handled, data transferred. Billing is transparent and usage-based, which is what makes precise, granular pay-as-you-go pricing possible in the first place — you can see exactly what drove last month's bill.

## Putting it together

\`\`\`text
Demand spikes  --> Self-service API call / auto-scaler
                      |
                      v
              Pooled physical capacity
                      |
                      v
        New virtual resources appear in minutes
                      |
                      v
           Usage metered, billed per second/GB
\`\`\`

## Real-world example

Imagine a tax-preparation website. Traffic is roughly flat most of the year, but spikes enormously in the two weeks before a filing deadline. An on-prem setup would need enough servers, purchased and idle for 50 weeks, to survive those two weeks. A cloud setup can use rapid elasticity to run a handful of servers most of the year and automatically add dozens more only during the deadline crunch — paying the measured, metered cost only for the capacity actually used, thanks to resource pooling across the provider's whole customer base.
`,
        },
        {
          slug: "public-private-hybrid-cloud",
          title: "Public, Private, and Hybrid Cloud",
          estimatedMinutes: 7,
          content: `# Public, Private, and Hybrid Cloud

"The cloud" isn't one single thing — it describes a deployment model, and there are several. Knowing the differences matters because they come with very different cost, control, and compliance trade-offs.

## Public cloud

Infrastructure is owned and operated by a third-party provider (AWS, Microsoft Azure, Google Cloud, and others) and shared across many customers over the public internet, with strong isolation between tenants. This is what most people mean by default when they say "the cloud."

- Lowest upfront cost, fastest to get started
- Provider handles all physical maintenance and global scale
- You have less control over the underlying physical infrastructure

## Private cloud

Infrastructure dedicated to a single organization — it may be physically on that organization's own premises, or hosted by a third party but not shared with other tenants. It's built using cloud-like technology (self-service provisioning, virtualization, automation) but without the multi-tenant resource pooling of public cloud.

- Used when an organization needs tight control over physical location, hardware, or network isolation — often for regulatory or security reasons
- Loses some of the cost efficiency of pooled, shared infrastructure
- Still typically automated and self-service internally, unlike traditional on-prem IT

## Hybrid cloud

A combination: some workloads run in a public cloud, others stay on private infrastructure or on-prem, and the two are connected — usually through a dedicated private network link or VPN — so they can work together as one system.

- Common for organizations migrating gradually, or that have data residency/compliance rules keeping some data on-prem
- Common pattern: keep a sensitive database on-prem, but run the public-facing web application in the public cloud, calling back to the on-prem database over a private connection

\`\`\`text
        Public Cloud                    Private / On-prem
   +-------------------+          +------------------------+
   |  Web application   |<------->|   Sensitive database    |
   |  Auto-scaling tier |  VPN /  |   Legacy mainframe app  |
   +-------------------+ private +------------------------+
                          link
\`\`\`

There's also **multi-cloud**: deliberately using more than one public cloud provider (for example, AWS for one workload and Google Cloud for another) to avoid depending entirely on a single vendor, or to use each provider's particular strengths.

## Common mistake

People often use "hybrid cloud" and "multi-cloud" interchangeably, but they answer different questions. Hybrid cloud is about *public vs. private* infrastructure working together. Multi-cloud is about using *more than one public cloud vendor*. An organization can be hybrid without being multi-cloud (on-prem + one public provider), multi-cloud without being hybrid (two public providers, nothing on-prem), or both at once.
`,
        },
      ],
    },
    {
      title: "Cloud Service Models",
      lessons: [
        {
          slug: "iaas-explained",
          title: "IaaS: Infrastructure as a Service",
          estimatedMinutes: 8,
          content: `# IaaS: Infrastructure as a Service

Infrastructure as a Service (IaaS) is the most "raw" cloud service model. The provider gives you virtualized computing infrastructure — servers, storage, and networking — and you install and manage everything above that: the operating system, runtimes, and application code.

## What the provider manages vs. what you manage

\`\`\`text
Your responsibility (IaaS)        Provider's responsibility
+------------------------+        +--------------------------+
| Application code       |        | Physical servers          |
| Runtime / dependencies |        | Physical networking       |
| Operating system       |        | Physical data centers     |
| OS patching            |        | Virtualization layer      |
| Firewall/network config|        | Power, cooling            |
+------------------------+        +--------------------------+
\`\`\`

You get a virtual machine (a "compute instance") much like you'd get a physical server, except it's provisioned in minutes instead of weeks, and you can resize or delete it just as quickly.

## Example: provisioning a virtual machine

\`\`\`bash
cloudctl vm create \\
  --name web-01 \\
  --image ubuntu-22.04 \\
  --size 2vcpu-4gb \\
  --region us-east-1
\`\`\`

After this, you SSH in, install a web server, configure firewall rules, and manage OS updates yourself — exactly as you would on a physical machine, just without ever touching hardware.

## Why choose IaaS

- Maximum flexibility and control — install any OS, any software stack, configure networking however you need
- Good fit for lifting-and-shifting existing applications that expect full control of a server
- Good fit when you need software or configurations that managed platforms don't support

The trade-off is operational burden: you're responsible for OS security patches, scaling logic, and configuration management. Real-world examples of IaaS offerings include Amazon EC2, Azure Virtual Machines, and Google Compute Engine.

## Mental model

IaaS is like renting an empty apartment. The landlord (provider) maintains the building — plumbing, electrical, structure, security of the building itself. But furnishing, cleaning, and everything happening inside your unit is entirely up to you.
`,
        },
        {
          slug: "paas-explained",
          title: "PaaS: Platform as a Service",
          estimatedMinutes: 8,
          content: `# PaaS: Platform as a Service

Platform as a Service (PaaS) sits one level up from IaaS. The provider manages the operating system, runtime, and underlying infrastructure — you just deploy your application code (or container) and the platform runs it, patches the OS beneath it, and often handles scaling automatically.

## What the provider manages vs. what you manage

\`\`\`text
Your responsibility (PaaS)        Provider's responsibility
+------------------------+        +--------------------------+
| Application code       |        | Operating system           |
| App configuration      |        | Runtime / language engine   |
|                         |        | Patching, scaling           |
|                         |        | Physical infrastructure     |
+------------------------+        +--------------------------+
\`\`\`

You never SSH into a server to run \`apt upgrade\`. You just push your code.

## Example: deploying an application to a platform service

\`\`\`bash
platformctl app deploy \\
  --name my-api \\
  --source ./my-api \\
  --runtime node20
\`\`\`

Behind the scenes, the platform builds a container image from your source, provisions the compute needed to run it, wires up networking and a public URL, and can automatically add more instances if traffic increases.

## Why choose PaaS

- Much less operational overhead — no OS patching, no manual scaling configuration
- Faster time from code to running application
- Built-in best practices for scaling, logging, and health checks

The trade-off is reduced control: you generally can't customize the OS, install arbitrary system-level software, or fine-tune low-level networking. You're also more tied to the specific platform's conventions and supported runtimes. Real-world examples include AWS Elastic Beanstalk, Azure App Service, Google App Engine, and Heroku.

## Real-world example

A three-person startup building a REST API doesn't want to spend engineering time patching Linux servers or writing auto-scaling rules from scratch. They push their application to a PaaS, which builds it, runs it behind a load balancer, and scales it automatically as signups grow — letting the small team spend their limited time on product features instead of server administration.
`,
        },
        {
          slug: "saas-explained",
          title: "SaaS: Software as a Service",
          estimatedMinutes: 7,
          content: `# SaaS: Software as a Service

Software as a Service (SaaS) is the most complete, most managed model. The provider runs the entire application — infrastructure, platform, and the software itself — and you simply use it, typically through a web browser or a lightweight client, usually for a subscription fee.

## What the provider manages vs. what you manage

\`\`\`text
Your responsibility (SaaS)        Provider's responsibility
+------------------------+        +--------------------------+
| Your data               |        | Application code           |
| User accounts/config    |        | Runtime & platform          |
|                         |        | Operating system            |
|                         |        | Physical infrastructure     |
+------------------------+        +--------------------------+
\`\`\`

Familiar examples: Gmail, Salesforce, Slack, Microsoft 365, Dropbox. You never provision a server, choose a runtime, or deploy code — you log in and use the product.

## Why it matters for this course

Even though SaaS looks "less technical" than IaaS or PaaS, it's still built *on top of* IaaS and PaaS. A SaaS provider like Slack still runs its own servers, containers, and databases — often on a public cloud IaaS/PaaS foundation — and abstracts all of that away from its end users. Understanding SaaS as the "top of the stack" helps clarify that IaaS, PaaS, and SaaS aren't competing options — they're layers, and each layer is usually built using the one below it.

\`\`\`text
   SaaS   <- what most end users interact with (e.g. Gmail)
    |
   PaaS   <- what the SaaS company's engineers might deploy on
    |
   IaaS   <- the raw virtual machines underneath it all
\`\`\`

## Choosing among the three

| Question | Likely fit |
|---|---|
| "We just need an off-the-shelf tool (email, CRM, chat)" | SaaS |
| "We're building custom software but don't want to manage servers" | PaaS |
| "We need full control over the OS, networking, or specialized software" | IaaS |

## Common mistake

A common mistake is assuming "SaaS = no responsibility at all." Even with SaaS, the customer is still responsible for things like user access management (who on your team has an account and what they can do), the data you put into the system, and configuring the application correctly (for example, sharing settings on a document). The provider manages the software and infrastructure; you still manage how your organization uses it. This distinction becomes formal in the next lesson's topic: the shared responsibility model.
`,
        },
        {
          slug: "choosing-the-right-service-model",
          title: "Choosing the Right Service Model",
          estimatedMinutes: 9,
          content: `# Choosing the Right Service Model

IaaS, PaaS, and SaaS aren't a ranking from "worse" to "better" — they're a trade-off between control and operational responsibility on one axis, versus convenience and speed on the other. Choosing well means matching the model to what your team actually needs to control.

## The control-vs-convenience spectrum

\`\`\`text
More control, more work            Less control, less work
IaaS -------------------- PaaS -------------------- SaaS
(you manage OS+)     (you manage code only)    (you manage nothing)
\`\`\`

Nothing stops a single organization from using all three at once for different needs — this is completely normal. A company might:

- Use **SaaS** (like a hosted email and CRM system) for internal business functions
- Build its core product on **PaaS** (deploying application code to a managed platform) to move fast without an ops team
- Drop down to **IaaS** for one component that needs specialized software the PaaS doesn't support (say, a custom video-transcoding pipeline that needs specific GPU drivers)

## A worked example

Imagine you're building an online bookstore.

- **Email and internal chat** → SaaS (Gmail, Slack) — no reason to build or host this yourself
- **The bookstore's web application and API** → PaaS — you want to focus engineering time on the shopping cart and checkout flow, not on patching servers
- **A custom recommendation engine that needs a specific, uncommon machine-learning library and GPU access** → IaaS — because the PaaS runtime doesn't support the exact software stack you need, you take a virtual machine and configure it precisely

## Decision checklist

Ask these questions when picking a model for a given workload:

1. Do we need to customize the OS or install unusual system software? → leans IaaS
2. Do we just need to run our own application code without managing servers? → leans PaaS
3. Is there an existing product that already does exactly what we need? → leans SaaS
4. How much operational staff time can we dedicate to patching and scaling? → less time available pushes you up the stack (toward PaaS/SaaS)
5. Do we need fine-grained control for compliance or performance reasons? → pushes you down the stack (toward IaaS)

## Mental model

Think of it like transportation. IaaS is renting a car — maximum flexibility, but you handle fueling, parking, and maintenance decisions. PaaS is a taxi or rideshare — you specify the destination and someone else drives and maintains the vehicle. SaaS is public transit — you just get on, already scheduled and running, with zero involvement in the vehicle itself. Each is the right choice for a different trip.
`,
        },
      ],
    },
    {
      title: "Global Infrastructure and Shared Responsibility",
      lessons: [
        {
          slug: "regions-and-availability-zones",
          title: "Regions and Availability Zones",
          estimatedMinutes: 9,
          content: `# Regions and Availability Zones

Cloud providers don't run one giant data center — they run many, spread across the world, organized into a structure that's fairly consistent across AWS, Azure, and Google Cloud even though the exact terminology differs slightly.

## Regions

A **region** is a distinct geographic area — for example "US East (Ohio)" or "Europe (Frankfurt)." Each region is fully independent: it has its own set of data centers, and resources in one region don't automatically exist in another. When you create a virtual machine or a database, you choose which region it lives in.

Why regions exist:

- **Latency** — placing your application physically closer to your users reduces the time data takes to travel back and forth.
- **Data residency / compliance** — some laws (for example, financial or healthcare regulations in certain countries) require certain data to stay within a specific country or geographic area.
- **Fault isolation** — a major failure in one region (a natural disaster, a large-scale outage) generally doesn't affect other regions.

## Availability zones

Within a region, most major providers offer multiple **availability zones (AZs)** — physically separate data centers (or clusters of data centers), each with independent power, cooling, and networking, but connected to each other by high-speed, low-latency links. A region typically has three or more availability zones.

\`\`\`text
Region: US-East
+----------------------------------------------------+
|  AZ-1              AZ-2              AZ-3          |
|  (data center A)   (data center B)   (data center C)|
|  independent       independent       independent    |
|  power/cooling     power/cooling     power/cooling  |
+----------------------------------------------------+
        <-- connected by fast, private network -->
\`\`\`

The point of availability zones is fault tolerance within a region. If you run your application's servers across two or three availability zones instead of just one, a power failure or hardware issue in a single data center doesn't take your whole application down — traffic simply continues to be served from the other zone(s).

## Edge locations, briefly

Beyond regions and AZs, providers also operate many more **edge locations** — smaller sites, in far more cities than regions exist, used to cache content physically close to end users (covered in more depth in the next lesson).

## Common mistake

A very common beginner mistake is deploying an application's servers all inside a single availability zone "because it was the default in the console." This defeats the purpose of AZs entirely — if that one data center has a problem, the whole application goes down, even though the provider offered zone redundancy for free (aside from running duplicate servers). A basic resilience rule of thumb: if a workload matters, spread it across at least two availability zones in its region.
`,
        },
        {
          slug: "edge-locations-and-cdns",
          title: "Edge Locations and Content Delivery",
          estimatedMinutes: 7,
          content: `# Edge Locations and Content Delivery

Regions and availability zones are where your compute and storage actually live. But your users could be anywhere in the world, and the speed of light imposes a hard floor on how fast data can travel a long distance. **Edge locations** exist to shrink that distance for content that doesn't need to come all the way from your application's region every time.

## What a CDN does

A **Content Delivery Network (CDN)** is a globally distributed set of edge locations that cache copies of content — images, videos, static website files, software downloads — physically close to end users. When a user in Tokyo requests a file that's cached at a nearby edge location, it's served from there directly, instead of traveling all the way to, say, a region in Virginia.

\`\`\`text
Without a CDN:
  User (Tokyo)  <----------------------------->  Origin server (Virginia)
                         high latency

With a CDN:
  User (Tokyo)  <--->  Edge location (Tokyo)  <--->  Origin server (Virginia)
                 low latency        (only on cache miss, rarely)
\`\`\`

The first request for a file might still have to travel to the origin server, but the CDN caches the response at the edge, so subsequent requests from nearby users are served locally and quickly — dramatically reducing load on the origin server as well as latency for users.

## Beyond static files

Modern CDNs do more than cache images. Many also offer:

- **TLS termination at the edge** — encrypting/decrypting HTTPS traffic close to the user
- **DDoS protection** — absorbing malicious traffic floods before they reach your actual application
- **Edge compute** — running small pieces of application logic at the edge location itself (for example, redirecting a request or checking an authentication token) without a round trip to the origin region at all

## Example: setting a cache duration

A typical CDN configuration tells edge locations how long to keep a cached copy before checking back with the origin:

\`\`\`yaml
path: /images/*
cache_ttl: 86400   # cache for 24 hours at the edge
\`\`\`

## Real-world example

A news website publishes a breaking story with a large header image. Within seconds, the story is linked from social media and gets a spike of traffic from readers all over the world. Without a CDN, every one of those readers' image requests would travel all the way back to the site's one origin server, potentially overwhelming it. With a CDN, the image is cached at edge locations near each reader after the very first request from that region, so the origin server sees a tiny fraction of the actual traffic.
`,
        },
        {
          slug: "shared-responsibility-model",
          title: "The Shared Responsibility Model",
          estimatedMinutes: 9,
          content: `# The Shared Responsibility Model

One of the most important — and most frequently misunderstood — concepts in cloud computing is the **shared responsibility model**: the cloud provider secures certain things, and the customer is responsible for securing others. Moving to the cloud does not mean security becomes "someone else's problem."

## The general split

\`\`\`text
Provider is responsible for:          Customer is responsible for:
security "OF" the cloud               security "IN" the cloud
+---------------------------+         +----------------------------+
| Physical data centers      |         | Data classification/encryption|
| Physical hardware          |         | Identity & access management |
| Global network infrastructure|       | OS patching (IaaS)           |
| Virtualization layer        |         | Firewall/network config      |
| Host OS (managed services)  |         | Application-level security   |
+---------------------------+         +----------------------------+
\`\`\`

A useful shorthand many providers use: the provider is responsible for the security **of** the cloud (the infrastructure itself); the customer is responsible for security **in** the cloud (how they configure and use it).

## The split shifts depending on the service model

This is the part people miss: the dividing line moves depending on whether you're using IaaS, PaaS, or SaaS.

- **IaaS** — the provider secures the physical infrastructure and hypervisor. You are responsible for the guest operating system, patching it, configuring firewalls, and everything in your application.
- **PaaS** — the provider additionally secures the operating system and runtime. You're responsible for your application code, its configuration, and access management.
- **SaaS** — the provider secures almost the entire stack, including the application itself. You're still responsible for how you configure the software (user permissions, sharing settings) and for the data you put into it.

\`\`\`text
                IaaS            PaaS            SaaS
Customer:  App, data,       App, data,      Data, user access,
           OS, network      access config   sharing settings
-------------------------------------------------------------
Provider:  Physical infra,  + OS, runtime,  + Application code
           virtualization   patching        itself
\`\`\`

## Example: a real security incident pattern

A huge share of real-world cloud data breaches are not caused by the provider's infrastructure being hacked — they're caused by customer misconfiguration on the customer's side of the line. A classic example: leaving a cloud storage bucket set to "public" when it should be private, exposing customer data to anyone on the internet. The provider correctly kept the physical infrastructure secure; the customer failed their half of the shared responsibility.

\`\`\`bash
# Checking whether a storage bucket is publicly accessible
# is a customer responsibility, not a provider one
cloudctl storage get-bucket-policy --bucket my-app-uploads
\`\`\`

## Common mistake

"We're in the cloud now, so security is the provider's job" is one of the most dangerous misconceptions in this entire field. The provider secures the building; you still have to lock your own front door. Every serious cloud certification (AWS, Azure, Google Cloud) treats the shared responsibility model as foundational knowledge for exactly this reason.
`,
        },
      ],
      quiz: {
        title: "Tier 1 Checkpoint: Cloud Computing Basics",
        questions: [
          {
            text: "Which NIST characteristic of cloud computing refers to a customer being able to provision resources like servers on their own, without requiring human interaction with the provider?",
            optionA: "Resource pooling",
            optionB: "On-demand self-service",
            optionC: "Measured service",
            optionD: "Rapid elasticity",
            correctOption: "B",
          },
          {
            text: "A company moves its existing on-premises application onto cloud virtual machines that run continuously, 24/7, without changing how the application scales. Why might this fail to reduce costs?",
            optionA: "Cloud virtual machines cannot run continuously",
            optionB: "The company is no longer using resource pooling",
            optionC: "It swaps owning fixed hardware for renting equivalent capacity continuously, without gaining elasticity benefits",
            optionD: "On-premises applications cannot be run on virtual machines",
            correctOption: "C",
          },
          {
            text: "What is the primary difference between a capital expenditure (CapEx) cost model and an operating expenditure (OpEx) cost model in the context of on-prem vs. cloud?",
            optionA: "CapEx is billed monthly and OpEx is billed annually",
            optionB: "CapEx is a large upfront investment in owned assets, while OpEx is an ongoing cost tied to consumption",
            optionC: "OpEx only applies to hardware purchases",
            optionD: "There is no meaningful difference between the two",
            correctOption: "B",
          },
          {
            text: "An organization keeps a sensitive database on its own premises but runs its public-facing web application in a public cloud, connecting the two over a private network link. What is this deployment model called?",
            optionA: "Multi-cloud",
            optionB: "Private cloud",
            optionC: "Hybrid cloud",
            optionD: "Public cloud",
            correctOption: "C",
          },
          {
            text: "Which best describes the difference between hybrid cloud and multi-cloud?",
            optionA: "They are two names for the exact same concept",
            optionB: "Hybrid cloud combines public and private/on-prem infrastructure; multi-cloud means using more than one public cloud vendor",
            optionC: "Multi-cloud always includes on-premises infrastructure, hybrid cloud never does",
            optionD: "Hybrid cloud is only used by small companies, multi-cloud only by large ones",
            correctOption: "B",
          },
          {
            text: "In the IaaS service model, which of the following is the CUSTOMER's responsibility rather than the provider's?",
            optionA: "Physical data center security",
            optionB: "The virtualization/hypervisor layer",
            optionC: "Patching the guest operating system",
            optionD: "Global network backbone infrastructure",
            correctOption: "C",
          },
          {
            text: "A startup wants to deploy custom application code without managing servers, OS patching, or scaling infrastructure themselves. Which service model best fits this need?",
            optionA: "IaaS",
            optionB: "PaaS",
            optionC: "SaaS",
            optionD: "On-premises hosting",
            correctOption: "B",
          },
          {
            text: "Why are SaaS, PaaS, and IaaS often described as \"layers\" rather than competing alternatives?",
            optionA: "Because SaaS products are frequently built on top of PaaS or IaaS provided by another company",
            optionB: "Because all three require the customer to manage the operating system",
            optionC: "Because they are billed using the exact same pricing model",
            optionD: "Because only one of the three actually involves a cloud provider",
            correctOption: "A",
          },
          {
            text: "What is the main purpose of spreading a workload's servers across multiple availability zones within a region?",
            optionA: "To reduce the monthly bill by using cheaper zones",
            optionB: "To satisfy data residency laws in different countries",
            optionC: "To tolerate the failure of a single data center without taking the whole application down",
            optionD: "To automatically translate the application into other languages",
            correctOption: "C",
          },
          {
            text: "According to the shared responsibility model, which statement is TRUE regardless of whether a customer uses IaaS, PaaS, or SaaS?",
            optionA: "The provider is always responsible for how the customer configures access and data within the service",
            optionB: "The customer retains some responsibility, such as for data and access configuration, no matter which service model is used",
            optionC: "The customer is always responsible for the physical security of the data center",
            optionD: "Security responsibility is identical across IaaS, PaaS, and SaaS with no variation",
            correctOption: "B",
          },
        ],
      },
    },
    {
      title: "Compute Fundamentals",
      lessons: [
        {
          slug: "virtual-machines-and-instances",
          title: "Virtual Machines and Instances",
          estimatedMinutes: 9,
          content: `# Virtual Machines and Instances

The most fundamental compute building block in the cloud is the **virtual machine (VM)**, often just called an "instance." Understanding how VMs work under the hood explains a lot about why cloud computing behaves the way it does.

## What a virtual machine actually is

A physical server has a fixed amount of CPU, memory, and disk. A **hypervisor** — special virtualization software running directly on that physical server — carves it up into multiple isolated virtual machines, each believing it has its own dedicated CPU, memory, and disk, even though several VMs (often belonging to different customers) are sharing the same underlying hardware.

\`\`\`text
Physical server
+----------------------------------------------------+
|                     Hypervisor                       |
|  +----------+   +----------+   +----------+          |
|  |  VM 1    |   |  VM 2    |   |  VM 3    |           |
|  | (you)    |   | (another |   | (another |           |
|  |          |   |  customer)|  |  customer)|          |
|  +----------+   +----------+   +----------+          |
+----------------------------------------------------+
\`\`\`

Each VM runs its own operating system, has its own virtual disk, and is completely isolated from the other VMs on the same physical machine — one customer's VM cannot see or access another customer's data or processes.

## Instance types / sizes

Providers offer VMs in predefined sizes (often called "instance types" or "instance sizes"), each with a fixed amount of vCPU, memory, and sometimes specialized hardware (like a GPU). Typical categories:

- **General purpose** — balanced CPU/memory, good default choice for web servers and small applications
- **Compute-optimized** — more CPU relative to memory, for CPU-bound workloads like batch processing
- **Memory-optimized** — more memory relative to CPU, for in-memory caches or large databases
- **GPU / accelerated** — includes graphics or machine-learning accelerator hardware

\`\`\`bash
cloudctl vm create \\
  --name api-server-01 \\
  --type general-purpose.medium \\   # e.g. 2 vCPU, 4 GB RAM
  --image ubuntu-22.04 \\
  --zone us-east-1a
\`\`\`

## Lifecycle and pricing

Because VMs are software-defined rather than physical, they can be created, stopped, resized, or destroyed in minutes. Common pricing models include:

- **On-demand** — pay per second or hour, no commitment, most expensive per unit but most flexible
- **Reserved / committed use** — commit to running an instance for a period (e.g., 1 or 3 years) for a significant discount
- **Spot / preemptible** — bid on unused provider capacity at steep discounts, with the risk the instance can be reclaimed by the provider with little notice — good for fault-tolerant batch jobs, bad for anything that must run continuously

## Common mistake

A common beginner mistake is picking the largest, most powerful instance size "just to be safe," and leaving it running continuously even when idle most of the time. Because VMs are billed by the second or hour they run, an oversized instance running 24/7 can cost far more than a right-sized instance that's paired with auto-scaling (covered later in this course) to add capacity only when actually needed.
`,
        },
        {
          slug: "containers-basics",
          title: "Containers Basics",
          estimatedMinutes: 10,
          content: `# Containers Basics

Virtual machines virtualize an entire computer, including its own OS kernel. **Containers** take a different, lighter-weight approach: they virtualize at the operating system level, packaging an application and its dependencies together while sharing the host machine's OS kernel.

## VM vs. container

\`\`\`text
Virtual Machines                     Containers
+------------------+                 +------------------+
| App A            |                 | App A  | App B    |
| Libraries        |                 | Libs   | Libs     |
| Guest OS (full)  |                 +------------------+
+------------------+                 | Container runtime |
| Guest OS (full)  |                 +------------------+
+------------------+                 | Host OS kernel     |
| Hypervisor        |                 +------------------+
+------------------+                 | Physical server    |
| Physical server    |                 +------------------+
+------------------+
\`\`\`

Because each VM includes a full guest operating system, VMs are relatively heavy (often gigabytes, and slow — seconds to minutes — to start). Containers share the host's kernel and only package the application plus its specific dependencies, so they're typically megabytes in size and start in a second or less.

## What a container actually packages

A container image bundles:

- The application code
- Language runtime and libraries it depends on
- Configuration files

...but NOT a full operating system kernel. This means a container built on one machine behaves consistently on any other machine running a compatible container runtime — solving the classic "it works on my machine" problem.

\`\`\`dockerfile
FROM node:20-slim
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
CMD ["node", "server.js"]
\`\`\`

This is a simple container image definition: start from a minimal Node.js base image, install dependencies, copy in the application, and define the command to run it. Building this produces a portable image that runs identically on a laptop, a test server, or a cloud provider's infrastructure.

## Why containers matter for the cloud

- **Density** — many containers can run on one VM, since they don't each need a full OS, improving resource utilization
- **Fast startup** — containers typically start in under a second, which is valuable for rapid auto-scaling
- **Portability** — the same container image runs the same way across environments
- **Consistency** — dependencies are baked into the image, eliminating "works here, not there" configuration drift

Containers are usually run and managed at scale by an **orchestrator** — software that decides which physical machines run which containers, restarts failed containers, and can scale the number of running containers up or down. The most widely used orchestrator is Kubernetes, though managed, simpler container services also exist from every major cloud provider.

## Common mistake

Containers are not a replacement for virtual machines in every case — they still need to run somewhere, and that "somewhere" is very often a VM (or a provider's managed container-hosting service, which itself runs on VMs under the hood). A common misunderstanding is thinking containers eliminate the need for compute infrastructure entirely; really, they change the unit of deployment and change how efficiently that infrastructure gets used, not whether infrastructure exists.
`,
        },
        {
          slug: "serverless-computing",
          title: "Serverless Computing",
          estimatedMinutes: 8,
          content: `# Serverless Computing

"Serverless" is a somewhat misleading name — there are absolutely still servers involved. What "serverless" actually means is that the *customer* never provisions, sizes, or manages any server at all; the provider handles all of that invisibly, and the customer's code runs only in response to events, for exactly as long as it takes to execute.

## The core idea: functions as a service

The most common serverless pattern is **Functions as a Service (FaaS)**: you upload a small piece of code (a "function"), and the platform runs it automatically whenever a triggering event occurs — an HTTP request, a new file uploaded to storage, a message arriving on a queue, a scheduled time.

\`\`\`javascript
// A serverless function triggered by an HTTP request
exports.handler = async (event) => {
  const name = event.queryStringParameters?.name ?? "world";
  return {
    statusCode: 200,
    body: JSON.stringify({ message: \`Hello, \${name}!\` }),
  };
};
\`\`\`

You never declare an instance size, never keep a server running between requests, and never manage an OS. The platform allocates compute just long enough to run your function for this one event, then reclaims it.

## Serverless billing

Serverless functions are billed by actual execution time (often rounded to the nearest millisecond) and memory allocated during that execution — not by any idle time. If your function isn't invoked at all in a given hour, you pay nothing for that hour. Compare this to a VM, which you pay for whether or not it's handling any requests at that moment.

\`\`\`text
VM:         [ running -- billed -- whether busy or idle ------------- ]
Serverless: [idle, $0][ event ][billed only while executing][idle, $0]
\`\`\`

## Trade-offs

Serverless isn't free of downsides:

- **Cold starts** — if a function hasn't run recently, the platform may need a moment to initialize an execution environment before running your code, adding latency to that first request
- **Execution time limits** — most FaaS platforms cap how long a single invocation may run (often minutes), making them poor fits for long-running processes
- **Less control** — you can't customize the underlying OS or install arbitrary system packages the way you could on a VM

Serverless also extends beyond simple functions — many providers offer serverless containers (run a container without managing the VM it sits on) and serverless databases (a database that automatically scales capacity, and sometimes cost, to near zero when idle).

## Real-world example

An image-processing pipeline that resizes user-uploaded photos is a classic serverless use case: uploads happen unpredictably, processing each one takes a few seconds, and there's no benefit to keeping a server running 24/7 waiting for the next upload. A serverless function triggered on "new file uploaded to storage" handles exactly that spike of work, then disappears — with billing that reflects the sporadic, bursty nature of the workload rather than continuous uptime.
`,
        },
        {
          slug: "choosing-a-compute-option",
          title: "Choosing a Compute Option",
          estimatedMinutes: 8,
          content: `# Choosing a Compute Option

You've now seen three major compute building blocks — virtual machines, containers, and serverless functions. In practice, a single real-world system very often uses more than one of these for different components. Choosing well means matching the option to the workload's actual shape.

## Comparing the three

| | Virtual Machines | Containers | Serverless (FaaS) |
|---|---|---|---|
| Startup time | Seconds to minutes | Under a second | Milliseconds to a few seconds (cold start) |
| Billing granularity | Per second/hour, while running | Per second, while running | Per invocation/execution time |
| Control over OS | Full | Shared host kernel, some isolation | None |
| Best for | Full control, legacy software, custom OS needs | Portable, consistent, dense deployment of many services | Event-driven, bursty, intermittent workloads |
| Idle cost | Pay even when idle | Pay while container is running | Zero cost when not invoked |

## A decision framework

Ask, for a given piece of a system:

1. **Is it triggered by discrete, unpredictable events** (a file upload, an API call, a scheduled job) **and does each execution finish quickly?** → serverless is often the best fit
2. **Does it need to run continuously and consistently, with a predictable resource footprint, possibly alongside many similar services?** → containers are often the best fit, especially if you already use an orchestrator
3. **Does it require a specific OS, kernel-level access, unusual system software, or very long-running processes?** → a virtual machine is often the right (or only) fit

## A worked example: an online store

- **Checkout API** → containers, since it needs to run continuously, handle steady traffic, and scale predictably alongside other services
- **Resizing a product photo after a merchant uploads it** → serverless, since this is a short, bursty, event-triggered task
- **A legacy inventory system that only runs on an older, specific Linux distribution with custom drivers** → a virtual machine, since it needs OS-level control the other two options don't offer

\`\`\`text
   Event-driven, short-lived  --------------------->  Serverless
   Continuous, many similar services  -------------->  Containers
   Full OS control / legacy / specialized hardware -->  Virtual Machines
\`\`\`

## Mental model

Think of VMs, containers, and serverless as different sizes of vehicle for different jobs: a VM is like owning a truck — total control, but you're responsible for fuel, maintenance, and parking it even when you're not driving. A container is like a rental car — standardized, quick to pick up, and you only pay for the days you actually use it. Serverless is like a taxi you hail for one specific trip — you pay only for that ride, with zero responsibility for the vehicle before or after.
`,
        },
      ],
    },
    {
      title: "Container Orchestration and Kubernetes Fundamentals",
      lessons: [
        {
          slug: "why-container-orchestration",
          title: "Why Container Orchestration?",
          estimatedMinutes: 8,
          content: `# Why Container Orchestration?

The previous module introduced containers as a lightweight, portable way to package an application. That's fine for one container on one machine — but real applications rarely run as a single container. A typical production system might run dozens or hundreds of container instances, spread across many physical machines, constantly starting, stopping, and needing to find each other. Managing that by hand doesn't scale, which is exactly the problem **container orchestration** solves.

## What breaks without an orchestrator

Imagine trying to run 50 containers, across 10 servers, entirely by hand:

- **Placement** — which of the 10 servers has enough free CPU and memory for the next container? You'd have to track that yourself.
- **Failure recovery** — if a server crashes and takes 5 containers down with it, who notices, and who restarts those 5 containers somewhere else?
- **Scaling** — if traffic doubles, which containers do you add, and where do you put them?
- **Service discovery** — if a container needs to talk to "the payments service," and that service's containers keep moving between servers and getting new IP addresses, how does the caller find the current address?
- **Rolling updates** — how do you replace all 50 containers with a new version without taking the whole application offline at once?

None of these problems are unique to containers — they existed with VMs too — but containers make them more acute, because containers are meant to be created, destroyed, and rescheduled far more often and far faster than VMs ever were.

## What an orchestrator actually does

A **container orchestrator** is software that manages a cluster of machines and decides, continuously and automatically, where containers run, and takes action to keep the real state of the cluster matching a **desired state** you declare.

\`\`\`yaml
# You declare what you want ("desired state")
desired_state:
  application: payments-api
  replicas: 4          # I want 4 copies running, always
  image: payments-api:v2.3
\`\`\`

The orchestrator continuously compares that desired state against reality. If a server hosting one of the 4 replicas crashes, the orchestrator notices only 3 are running, and automatically starts a new one on a healthy server — with no human paged and no manual intervention. This continuous "notice the difference, take action to fix it" behavior is called a **reconciliation loop**, and it's the core mechanical idea behind every modern orchestrator.

\`\`\`text
                 +-------------------------------+
                 |   Reconciliation loop           |
                 |                                   |
Desired state -->|  compare  -->  fix differences  |--> Actual state
(4 replicas)     |                                   |   (in the cluster)
                 +-------------------------------+
                        ^                    |
                        +--------------------+
                     runs continuously, forever
\`\`\`

## The most widely used orchestrator: Kubernetes

**Kubernetes** (often abbreviated "K8s") is, by a wide margin, the most widely adopted container orchestrator, and has become something close to a standard interface for running containers at scale — supported by every major cloud provider and usable on-prem as well. The next lesson covers its core building blocks in more depth. Simpler, more opinionated container-hosting services (which hide most orchestration mechanics from you entirely) also exist from every major provider, and are often a better starting point for smaller workloads — covered later in this module.

## Real-world example

An online retailer runs its checkout, catalog, and recommendation services as containers, with dozens of replicas of each spread across many machines to handle Black Friday-level traffic. Without an orchestrator, engineers would need to manually track which machine runs which container and manually restart anything that crashed — during the busiest, highest-stakes traffic of the year. With an orchestrator, a failed container is detected and replaced automatically within seconds, engineers declare "run 40 replicas of checkout" and the system figures out placement, and a new version can be rolled out gradually without taking checkout offline.

## Common mistake

Assuming orchestration is only a "large company" concern. It's true that a single small application with one or two containers doesn't need the operational complexity of running a full orchestrator — but the underlying problems (placement, failure recovery, scaling, service discovery) show up the moment you have more than a handful of containers, regardless of company size. The right response to "we're not Google-scale" isn't necessarily "skip orchestration entirely" — it's often "use a managed, simplified orchestration service that hides most of the complexity," which the last lesson in this module covers.
`,
        },
        {
          slug: "kubernetes-core-concepts",
          title: "Kubernetes Core Concepts",
          estimatedMinutes: 10,
          content: `# Kubernetes Core Concepts

Kubernetes has its own vocabulary, and a handful of core objects show up in almost every Kubernetes conversation. You don't need to memorize a full Kubernetes reference to understand cloud computing fundamentals — but you do need to recognize these terms and roughly what each one is for.

## Clusters, nodes, and the control plane

A **cluster** is the whole Kubernetes environment: a set of machines working together. Each machine in the cluster is called a **node**. Nodes come in two roles:

- **Control plane nodes** — run Kubernetes' own management components: they store the cluster's desired state, watch for differences from actual state, and make scheduling decisions. This is where the reconciliation loop from the previous lesson actually lives.
- **Worker nodes** — actually run your application's containers.

\`\`\`text
Cluster
+----------------------------------------------------------+
|  Control plane (manages the cluster, makes decisions)      |
|                                                              |
|  Worker node 1        Worker node 2        Worker node 3    |
|  [containers...]      [containers...]      [containers...]  |
+----------------------------------------------------------+
\`\`\`

## Pods: the smallest deployable unit

Kubernetes doesn't schedule a bare container directly — its smallest deployable unit is a **pod**, which wraps one or more tightly coupled containers that always run together on the same node and share networking. Most pods contain exactly one container; a pod with multiple containers is reserved for cases where a second, helper container needs to run tightly alongside the main one (for example, a small process that ships logs off the main container).

## Deployments: declaring how many, and which version

A **deployment** describes how many replicas of a pod should be running, and which container image version they should run. This is the "desired state" object from the previous lesson, made concrete:

\`\`\`yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payments-api
spec:
  replicas: 4
  selector:
    matchLabels:
      app: payments-api
  template:
    metadata:
      labels:
        app: payments-api
    spec:
      containers:
        - name: payments-api
          image: payments-api:v2.3
          ports:
            - containerPort: 8080
\`\`\`

Apply this once (\`kubectl apply -f deployment.yaml\`), and Kubernetes takes over from there: if a pod crashes, a new one is created to replace it; if you change \`replicas: 4\` to \`replicas: 10\`, Kubernetes creates 6 more; if you change the image tag, Kubernetes gradually replaces old pods with new ones.

## Services: stable networking for a moving target

Pods are disposable — they get created and destroyed constantly, and each one gets its own internal IP address that changes every time. That's a problem if another part of your application needs to reliably reach "the payments API," since the actual pod IPs behind that name keep changing. A **service** solves this by giving a stable name and address that automatically routes to whichever healthy pods currently match a given label — regardless of how many times the underlying pods have been replaced.

\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: payments-api
spec:
  selector:
    app: payments-api   # routes to any pod with this label
  ports:
    - port: 80
      targetPort: 8080
\`\`\`

\`\`\`text
Other services call: "payments-api"  (stable name, never changes)
                            |
                            v
                    Kubernetes Service
                     /       |       \\
                    v        v        v
               [pod A]   [pod B]   [pod C]   <- IPs change constantly,
                                                 callers never notice
\`\`\`

## Putting it together

\`\`\`text
Deployment  -->  creates and maintains  -->  Pods (running containers)
                                                    ^
Service     -->  provides a stable address for -->-+
\`\`\`

## Real-world example

A team deploys their API as a Kubernetes deployment with 6 replicas. During a rolling update to a new version, Kubernetes starts new pods running the new image, waits for each to pass a health check, then terminates an old pod — a few at a time — until all 6 are running the new version, with the service's stable address ensuring callers never notice individual pods being replaced underneath them.

## Common mistake

Referring to "a Kubernetes container" is a common but telling mix-up — Kubernetes schedules pods, not bare containers, and conflating the two makes concepts like shared networking within a pod (two containers in the same pod share the same IP address and can reach each other over \`localhost\`) hard to reason about correctly. Keeping the hierarchy straight — cluster contains nodes, nodes run pods, pods wrap containers — makes everything else about Kubernetes easier to follow.
`,
        },
        {
          slug: "managed-kubernetes-services",
          title: "Managed Kubernetes and When to Use It",
          estimatedMinutes: 8,
          content: `# Managed Kubernetes and When to Use It

Running Kubernetes' control plane yourself is a genuinely difficult operational job — it involves keeping a highly-available, consistent cluster datastore running, patching Kubernetes itself, and securing the control plane from attack. Most organizations that use Kubernetes today don't run the control plane themselves at all; they use a **managed Kubernetes service**.

## What "managed" takes off your plate

\`\`\`text
Self-managed control plane        Managed Kubernetes service
+---------------------------+     +---------------------------+
| You run and patch the      |     | Provider runs and patches   |
| control plane yourself      |     | the control plane            |
| You ensure the control      |     | Provider guarantees control  |
| plane's own high availability|    | plane availability            |
| You secure the control      |     | Provider secures the         |
| plane's datastore/API        |     | control plane infrastructure |
+---------------------------+     +---------------------------+
\`\`\`

With a managed Kubernetes service, you still manage your own worker nodes (or, in some fully managed modes, the provider handles those too) and you still define your own deployments and services — but you're no longer responsible for keeping the cluster's brain alive and secure. Real-world examples include Amazon EKS, Azure Kubernetes Service (AKS), and Google Kubernetes Engine (GKE).

\`\`\`bash
cloudctl kubernetes create-cluster \\
  --name prod-cluster \\
  --version 1.30 \\
  --node-pool general-purpose.medium:3
\`\`\`

## When full Kubernetes is the right call

- You're running many distinct services (microservices) that need independent scaling, scheduling, and networking
- You need portability across multiple cloud providers, or between cloud and on-prem, using one consistent orchestration API
- Your team already has (or is willing to build) the operational expertise to manage workloads on Kubernetes

## When it's probably overkill

Kubernetes brings real operational complexity — YAML manifests, networking concepts, RBAC configuration, upgrade planning — even in its managed form. For simpler needs, every major provider also offers **simplified container-hosting services** that skip almost all of that: you point at a container image, specify how many instances and how much CPU/memory, and the platform runs it — without you ever writing a Kubernetes manifest or thinking about pods, nodes, or deployments directly. Examples include AWS Fargate (with ECS), Azure Container Apps, and Google Cloud Run.

\`\`\`text
Need: run 2-3 services, straightforward scaling needs
  --> Simplified container service (e.g., Cloud Run, Container Apps)

Need: dozens of interdependent microservices, complex scheduling,
multi-cloud portability
  --> Managed Kubernetes (e.g., EKS, AKS, GKE)
\`\`\`

## A decision framework

1. **How many independently deployed services do you have?** A handful → simplified container service is probably enough. Dozens or more, with complex interdependencies → Kubernetes starts paying for its complexity.
2. **Do you need portability across clouds or to on-prem?** If yes, Kubernetes' consistent API across environments is a genuine advantage that simplified, provider-specific container services don't offer.
3. **Does your team have (or want to build) Kubernetes operational expertise?** Even managed Kubernetes still requires understanding manifests, networking, and upgrade cycles — that's a real, ongoing cost.

## Real-world example

A five-person startup with a single API service and a single background worker chooses a simplified container service — they deploy container images directly, let the platform handle scaling and health checks, and never touch a Kubernetes manifest, because the operational overhead of a full cluster isn't worth it for two services. A 200-engineer company running 60 interdependent microservices, needing consistent tooling across three regions and a desire to remain portable if they ever need to move providers, adopts managed Kubernetes instead — the complexity is justified by the scale and portability requirements.

## Common mistake

Adopting Kubernetes because it's the "industry standard" without a workload that actually needs its capabilities. Kubernetes solves real problems at real scale, but for a small number of services, it often adds more operational burden (learning YAML manifests, networking concepts, upgrade management) than it removes. Matching the tool to the actual scale and complexity of your workload — rather than defaulting to whatever is most talked about — is the same lesson from the compute-options comparison earlier in this course, applied one level up.
`,
        },
      ],
    },
    {
      title: "Storage in the Cloud",
      lessons: [
        {
          slug: "object-storage",
          title: "Object Storage",
          estimatedMinutes: 8,
          content: `# Object Storage

**Object storage** stores data as discrete, self-contained units called objects — each with the actual data, a unique key (essentially a name/path), and metadata — inside flat containers usually called "buckets." It's the most common way to store unstructured data (images, videos, backups, log files, static website assets) in the cloud.

## How it's structured

Unlike a traditional file system with nested folders and directories, object storage is fundamentally flat: every object lives in a bucket and is addressed by its unique key. Many providers simulate folder-like paths using \`/\` characters in the key (e.g., \`images/2026/product-01.jpg\`), but underneath there's no real directory tree — just objects with key names that happen to contain slashes.

\`\`\`bash
# Uploading a file to object storage
cloudctl storage put \\
  --bucket my-app-uploads \\
  --key images/2026/product-01.jpg \\
  --file ./product-01.jpg

# Retrieving it back over plain HTTPS
curl https://my-app-uploads.storage.example.com/images/2026/product-01.jpg
\`\`\`

Objects are typically accessed over HTTP/HTTPS using simple GET/PUT/DELETE style operations, which is part of why object storage is so easy to use directly from web applications.

## Key properties

- **Virtually unlimited scale** — buckets can hold effectively unlimited numbers of objects and total bytes
- **High durability** — providers typically replicate every object across multiple devices and often multiple availability zones automatically, giving extremely high durability guarantees (often stated as 99.999999999% — "eleven nines" — annual durability)
- **Built-in metadata and versioning** — object storage often supports storing custom metadata per object, and can keep multiple versions of an object as it's overwritten
- **Storage tiers/classes** — providers usually offer cheaper tiers for infrequently accessed data (e.g., "cold" or "archive" storage) that trade retrieval speed and cost for a much lower storage price

## What it's good for

- Website and application static assets (images, videos, CSS/JS files)
- Backups and archives
- Data lakes for analytics
- Storing files uploaded by users

## What it's NOT good for

Object storage generally cannot be mounted as a traditional file system that an operating system reads and writes directly with normal file operations, and it's not built for the kind of rapid, small, random read/write updates a database or an active application file needs — that's what block storage (next lesson) is for.

## Real-world example

A photo-sharing application stores every uploaded photo as an object in a bucket, keyed by something like \`users/1042/photos/93820.jpg\`. The application's database stores only the *key* (essentially the file path) alongside metadata like the caption and upload date — the actual image bytes live in cheap, durable, effectively infinite object storage, while the database stays small and fast because it never has to store large binary files itself.
`,
        },
        {
          slug: "block-storage",
          title: "Block Storage",
          estimatedMinutes: 8,
          content: `# Block Storage

**Block storage** divides storage into fixed-size chunks called blocks, each independently addressable, and presents them to a virtual machine as if they were a raw physical disk. It's the storage type behind a VM's "hard drive," and it's what databases and operating systems expect to read and write.

## How it works

When you attach block storage to a virtual machine, the VM's operating system sees it as a disk device (like \`/dev/sdb\` on Linux), and can format it with a normal file system (ext4, NTFS, etc.), then read and write to it exactly like a physical hard drive or SSD.

\`\`\`bash
# Attaching a block storage volume to a running VM
cloudctl volume attach \\
  --volume-id vol-0abc123 \\
  --instance-id web-01 \\
  --device /dev/sdb

# Then, inside the VM, formatting and mounting it like any disk
mkfs.ext4 /dev/sdb
mount /dev/sdb /data
\`\`\`

## Key properties

- **Low latency, high IOPS (input/output operations per second)** — designed for fast, frequent, small reads and writes, which is exactly what databases and file systems need
- **Attached to one instance at a time (usually)** — a block volume is typically mounted to a single VM, similar to how a physical hard drive is normally installed in one computer at a time
- **Persists independently of the VM's lifecycle** — a block volume can typically be detached from one VM and reattached to another, and data survives even if the original VM is deleted (this depends on volume type — some "ephemeral" local storage is tied to the VM's lifetime and is lost when it stops)
- **Snapshots** — most providers let you take point-in-time snapshots of a volume for backup, which can be used to create new volumes later

## What it's good for

- The root disk of a virtual machine (where the OS itself lives)
- Database storage, where the database engine needs low-latency, consistent read/write access
- Any workload with unpredictable, small, frequent I/O patterns

## Object storage vs. block storage

\`\`\`text
Object Storage                       Block Storage
+---------------------------+        +---------------------------+
| Accessed via HTTP API      |        | Accessed as a raw disk      |
| Flat key-value structure   |        | Formatted with a file system|
| Virtually unlimited scale   |        | Fixed size, resizable        |
| Great for large, infrequently|      | Great for frequent, small,   |
| changed files               |        | random reads/writes          |
+---------------------------+        +---------------------------+
\`\`\`

## Common mistake

A common mistake is trying to use object storage as if it were a live database disk (for example, having many processes try to read-modify-write small portions of a large object very frequently), or conversely, trying to store millions of small files directly as block storage volumes when object storage would be far cheaper and simpler. Matching the storage type to the access pattern — frequent small read/writes versus large, infrequently modified files — is the key decision.
`,
        },
        {
          slug: "file-storage",
          title: "File Storage",
          estimatedMinutes: 7,
          content: `# File Storage

**File storage** provides a traditional, hierarchical file system — directories containing files and other directories — that can be mounted and accessed *simultaneously* by multiple servers over a network, using standard file system protocols like NFS (Network File System) or SMB.

## How it's different from block and object storage

Block storage is normally attached to one VM at a time, like a disk installed in a single computer. Object storage is accessed through an HTTP API and has no real folder hierarchy. File storage gives you the familiar folder/file structure of a normal file system, and — critically — lets multiple machines mount and use the *same* file system concurrently.

\`\`\`bash
# Mounting a shared network file system from multiple servers
mount -t nfs fileserver.example.com:/shared /mnt/shared

# Any server that mounts /shared sees the same files
ls /mnt/shared
\`\`\`

## Key properties

- **Shared access** — many VMs or containers can read and write the same files concurrently, which neither typical block storage nor object storage supports natively
- **Familiar hierarchy** — directories and files, exactly like a local file system, so existing applications that expect a normal file system often work with little or no modification
- **Network-attached** — accessed over the network using standard protocols (NFS, SMB), rather than appearing as a locally attached disk

## What it's good for

- Content management systems or applications where multiple application servers need to read/write the same set of files (e.g., shared user uploads across a fleet of web servers)
- Legacy applications that expect a traditional shared file system and can't easily be rewritten to use an object storage API
- Home directories in shared computing environments, or shared configuration files across a cluster of machines

## Comparing all three storage types

\`\`\`text
              Object              Block                File
Access:       HTTP API            Raw disk (one VM)     Network FS (many VMs)
Structure:    Flat key/value      Formatted filesystem   Hierarchical, shared
Best for:     Large unstructured  DB/OS disks, low       Shared file access
              files, backups      latency I/O            across many servers
\`\`\`

## Real-world example

A media company runs a fleet of video-encoding servers that all need to read from and write to the same shared pool of in-progress project files while collaborating on a render. Each server mounts the same file storage share over the network, so any server can pick up where another left off on a shared file — something that would be awkward with block storage (tied to one VM) and inefficient with object storage (no native concurrent-write shared file semantics).
`,
        },
        {
          slug: "choosing-the-right-storage-type",
          title: "Choosing the Right Storage Type",
          estimatedMinutes: 8,
          content: `# Choosing the Right Storage Type

You now know the three foundational cloud storage types. In real systems, it's normal — even expected — to use all three at once, each for the part of the system it fits best.

## Quick decision guide

Ask these questions about the data you need to store:

1. **Is it a large file (image, video, backup, log) that's written once and read many times, accessed over HTTP?** → object storage
2. **Does it need to be the low-latency disk backing a virtual machine or a database engine?** → block storage
3. **Do multiple servers need to read and write the exact same file(s) at the same time, in a normal folder structure?** → file storage

\`\`\`text
              +------------------+
Large files,  |  Object Storage   |  <- accessed via HTTPS API
backups, logs +------------------+

DB / VM disk, +------------------+
low latency   |  Block Storage    |  <- attached to one VM as a raw disk
              +------------------+

Shared, multi- +------------------+
server access  |  File Storage     |  <- mounted over the network by many VMs
               +------------------+
\`\`\`

## A worked example: a video streaming platform

- **The uploaded raw video files and the final encoded output files** → object storage — large, written once, read many times, naturally served over HTTPS to end users or a CDN
- **The database that stores video metadata (title, description, view counts)** → runs on block storage, since the database engine needs fast, low-latency reads/writes on its own dedicated disk
- **A shared workspace where several encoding worker servers need to read and write intermediate files from the same in-progress job** → file storage, since multiple servers need concurrent access to the same file hierarchy

## Cost dimension

Storage cost isn't just about "which type" — within each type, providers usually offer multiple tiers:

- Object storage often has "hot" (frequent access, higher cost per GB, no retrieval fee), "cool/infrequent access" (lower storage cost, retrieval fee), and "archive/cold" (very low storage cost, slow and sometimes costly retrieval) tiers.
- Block storage often has different performance tiers (e.g., SSD-backed vs. HDD-backed, or different guaranteed IOPS levels) at different price points.

Choosing the cheapest tier that still meets your access-pattern and latency needs is a meaningful, ongoing cost optimization lever — one you'll revisit in the cost management module later in this course.

## Common mistake

Defaulting everything to the most expensive, highest-performance tier "to be safe" is a common and expensive habit. A backup that's restored once a year has no business sitting in the most expensive, lowest-latency storage tier — moving it to a cold/archive tier can cut its storage cost dramatically with no real downside, since retrieval speed rarely matters for something accessed so infrequently.
`,
        },
      ],
    },
    {
      title: "Networking and Managed Databases",
      lessons: [
        {
          slug: "virtual-networks-and-subnets",
          title: "Virtual Networks and Subnets",
          estimatedMinutes: 10,
          content: `# Virtual Networks and Subnets

Every cloud resource lives inside a network, and understanding the basic building blocks of cloud networking — virtual networks, subnets, and the rules that control traffic between them — is essential to understanding how anything in the cloud actually communicates, and how it stays secure.

## Virtual networks

A **virtual network** (called a VPC — Virtual Private Cloud — on AWS and Google Cloud, or a VNet on Azure) is a logically isolated section of the provider's network that you control. It's your own private slice of IP address space, isolated from every other customer's network, even though it's running on the same shared physical infrastructure.

\`\`\`text
Your Virtual Network (10.0.0.0/16)
+--------------------------------------------------+
|  Subnet A (10.0.1.0/24)     Subnet B (10.0.2.0/24) |
|  [web server] [web server]  [database] [database]  |
+--------------------------------------------------+
\`\`\`

When you create a virtual network, you assign it a range of private IP addresses (using CIDR notation, e.g., \`10.0.0.0/16\`, which provides about 65,000 addresses). Every resource you place inside that network — VMs, containers, managed databases — gets a private IP address from that range.

## Subnets

A **subnet** is a smaller subdivision of the virtual network's IP range, usually tied to a specific availability zone. Splitting a virtual network into subnets lets you group resources logically and apply different rules to each group. A very common pattern:

- **Public subnet** — resources here can have a public IP address and be reached directly from the internet (e.g., a web server or a load balancer)
- **Private subnet** — resources here have no direct route to the public internet; they can only be reached from inside the virtual network (e.g., a database that should never be directly exposed)

\`\`\`bash
cloudctl network create --name app-network --cidr 10.0.0.0/16
cloudctl subnet create --network app-network --name public-subnet --cidr 10.0.1.0/24 --public
cloudctl subnet create --network app-network --name private-subnet --cidr 10.0.2.0/24
\`\`\`

## Controlling traffic

Two common mechanisms control what traffic is allowed in and out:

- **Security groups / network security groups** — stateful, instance-level firewall rules (e.g., "allow inbound HTTPS traffic on port 443 from anywhere, deny everything else")
- **Route tables** — define where traffic from a subnet is sent (e.g., traffic to the internet goes through an internet gateway; traffic to another subnet stays inside the virtual network)

## Real-world example

A typical three-tier web application places its load balancer and web servers in a public subnet (reachable from the internet), and its database in a private subnet with no route to the public internet at all. Even if an attacker compromised the web server, the database itself is unreachable directly from the outside — network topology becomes a genuine, structural security control, not just an application-level one.

## Common mistake

Placing a database directly in a public subnet with a public IP address "to make it easier to connect to from home" is a widespread and dangerous shortcut. It removes an entire layer of defense that costs nothing to keep in place. The correct pattern is almost always a private subnet for data stores, reached only through the application tier or through a secured bastion/jump host when direct administrative access is genuinely needed.
`,
        },
        {
          slug: "load-balancers-and-dns",
          title: "Load Balancers and DNS Basics",
          estimatedMinutes: 9,
          content: `# Load Balancers and DNS Basics

Two of the most common building blocks for making an application reachable, resilient, and scalable are **load balancers**, which distribute incoming traffic across multiple servers, and **DNS**, which translates human-friendly domain names into the IP addresses computers actually use to connect.

## Load balancers

A **load balancer** sits in front of a group of servers and distributes incoming requests across them, instead of every request going to a single fixed server.

\`\`\`text
                     +---------------+
Internet requests -->|  Load Balancer |
                     +---------------+
                       /      |      \\
                      v       v       v
                 [server 1] [server 2] [server 3]
\`\`\`

Why this matters:

- **Scalability** — you can add or remove servers behind the load balancer as demand changes, without changing anything the client connects to
- **Fault tolerance** — if one server fails a health check, the load balancer stops sending it traffic and routes only to the healthy servers, so a single server failure doesn't take down the whole application
- **Single point of contact** — clients only need to know one address (the load balancer's), not the address of every individual server behind it

Load balancers use various strategies to decide which server gets the next request — round robin (cycle through servers in order), least connections (send to whichever server currently has the fewest active connections), and others.

Load balancers also typically perform **health checks** — periodically pinging each backend server to confirm it's still responding correctly, and automatically removing unhealthy servers from rotation until they recover.

\`\`\`bash
cloudctl loadbalancer create \\
  --name web-lb \\
  --targets web-01,web-02,web-03 \\
  --health-check-path /health \\
  --health-check-interval 10s
\`\`\`

## DNS basics

**DNS (Domain Name System)** translates human-readable domain names (\`example.com\`) into IP addresses (\`203.0.113.10\`) that computers use to actually route network traffic. Without DNS, you'd have to remember and type raw IP addresses for every website and service you use.

A simplified DNS lookup flow:

\`\`\`text
Browser requests "www.example.com"
         |
         v
DNS resolver looks up the domain's DNS records
         |
         v
Finds an "A record": www.example.com -> 203.0.113.10
         |
         v
Browser connects directly to 203.0.113.10
\`\`\`

Common DNS record types you'll encounter:

- **A record** — maps a domain name directly to an IPv4 address
- **CNAME record** — maps a domain name to *another* domain name (an alias), useful for pointing a custom domain at a cloud provider's load balancer or CDN, whose IP address may change
- **MX record** — specifies which mail servers handle email for the domain

## Putting them together

\`\`\`text
User types "shop.example.com"
      |
      v
   DNS lookup  --->  resolves to the load balancer's address
      |
      v
Load balancer  --->  distributes the request to a healthy web server
\`\`\`

## Common mistake

A common misunderstanding is treating a load balancer as purely a traffic-splitting tool. Its health-check-driven failover behavior is often the more important benefit in practice — a load balancer that quietly stops routing to a crashed server is what keeps an application available during a partial failure, which is at least as valuable as spreading load evenly across healthy servers.
`,
        },
        {
          slug: "managed-databases",
          title: "Managed Databases",
          estimatedMinutes: 9,
          content: `# Managed Databases

Instead of installing and administering a database engine yourself on a virtual machine, most cloud providers offer **managed database services**: you get a fully functioning database (PostgreSQL, MySQL, MongoDB, and many others), but the provider handles the operational burden of running it.

## What "managed" actually takes off your plate

\`\`\`text
Self-managed database (on a VM)     Managed database service
+---------------------------+        +---------------------------+
| You install the engine     |        | Engine pre-installed,      |
| You patch the OS/engine    |        | patched automatically       |
| You configure backups      |        | Automated backups            |
| You set up replication      |        | Built-in replication/failover|
| You monitor disk/CPU        |        | Built-in monitoring/alerts   |
| You handle failover manually|        | Automatic failover           |
+---------------------------+        +---------------------------+
\`\`\`

You still design your schema, write your queries, and choose an appropriate instance size — the operational plumbing around keeping the database engine itself running, patched, and backed up is handled by the provider.

## Key managed database features

- **Automated backups** — regular, automatic snapshots, often with the ability to restore to any point in time within a retention window
- **Read replicas** — the provider can maintain read-only copies of the database that stay in sync with the primary, letting you offload read-heavy traffic away from the primary database and improve read throughput
- **Automatic failover** — if the primary database instance fails, the provider can automatically promote a standby replica to take over, minimizing downtime
- **Managed patching** — security patches for the database engine are applied automatically (often during a maintenance window you can choose)

\`\`\`bash
cloudctl database create \\
  --engine postgres \\
  --version 16 \\
  --size db.medium \\
  --multi-az \\
  --backup-retention-days 7
\`\`\`

The \`--multi-az\` flag above is a common pattern: it tells the provider to keep a synchronized standby copy of the database in a different availability zone, ready to take over automatically if the primary zone has a problem.

## Relational vs. non-relational, briefly

Managed database services generally fall into two broad families:

- **Relational (SQL) databases** — structured tables with fixed schemas and relationships between them, queried with SQL (e.g., managed PostgreSQL, MySQL) — a strong default for most applications with structured, related data
- **Non-relational (NoSQL) databases** — more flexible, schema-less or loosely-schemed data models (key-value, document, wide-column, graph), often chosen for very high scale, flexible/rapidly-changing data shapes, or specific access patterns that don't fit neatly into tables

Neither is universally "better" — the right choice depends on your data's structure and how you need to query it.

## Real-world example

A growing e-commerce application starts on a single managed database instance. As traffic grows, the team adds a read replica to handle the flood of product-page read queries, keeping the primary database free to focus on writes (orders, inventory updates). If the primary instance's underlying hardware fails, the provider automatically promotes a standby replica in another availability zone, and the application reconnects with only a brief interruption — no 2 a.m. page to a human database administrator required.

## Common mistake

Assuming a managed database service eliminates the need to think about scaling or schema design entirely. Managed services remove *operational* burden (patching, backups, failover) — they don't automatically fix a poorly designed schema, a missing index, or an undersized instance. You still need to monitor query performance and choose an appropriately sized instance for your workload.
`,
        },
      ],
    },
    {
      title: "Infrastructure as Code",
      lessons: [
        {
          slug: "what-is-infrastructure-as-code",
          title: "What Is Infrastructure as Code?",
          estimatedMinutes: 9,
          content: `# What Is Infrastructure as Code?

Throughout this course, examples have shown infrastructure being created with one-off CLI commands — create this VM, create that bucket, create this network. That works for learning one concept at a time, but it breaks down fast in the real world: how do you recreate an entire environment exactly, reliably, six months from now? How do you know what infrastructure actually exists, and why? **Infrastructure as Code (IaC)** answers both questions by describing infrastructure in files, instead of clicking through a console or running ad-hoc commands.

## Declarative vs. imperative

There are two broad approaches to IaC:

- **Imperative** — a script of step-by-step commands describing *how* to reach the desired result ("create a VM, then create a network, then attach the VM to the network"). You're responsible for the exact sequence, and for handling cases where something already exists.
- **Declarative** — a description of *what* the end state should look like, leaving the "how" to the tool. You state "there should be one VM named web-01, attached to network X," and the tool figures out what needs to be created, changed, or left alone to make that true.

\`\`\`text
Imperative:                          Declarative:
1. Create network "app-net"          "There should exist:
2. Create subnet "app-subnet"          - a network named app-net
3. Create VM "web-01"                  - a subnet named app-subnet
4. Attach web-01 to app-subnet          - a VM named web-01, in app-subnet"
(you specify the exact steps)        (the tool figures out the steps)
\`\`\`

Most modern IaC tools are declarative, because declarative definitions are easier to reason about, easier to diff (compare what changed between two versions), and safer to re-run — running the same declarative definition twice produces the same result, rather than accidentally creating a second VM.

## Why IaC matters

- **Repeatability** — spin up an identical copy of an environment (for a new region, a staging environment, or disaster recovery) by running the same code, instead of manually repeating dozens of console clicks and hoping nothing was missed.
- **Version control** — infrastructure definitions live in a code repository just like application code, so every change has a history, an author, and a reviewable diff (\`git diff\` shows exactly what infrastructure change is being proposed).
- **Consistency and drift prevention** — "drift" is when the real infrastructure quietly diverges from what's documented or intended, usually because someone made a manual change directly in the console. IaC tools can detect drift by comparing actual infrastructure against the code, and reapplying the code brings it back in line.
- **Peer review** — infrastructure changes can go through the same pull-request review process as application code changes, catching mistakes before they're applied to real, running infrastructure.

## Example: a declarative definition

\`\`\`hcl
resource "cloud_vm" "web_server" {
  name  = "web-01"
  image = "ubuntu-22.04"
  size  = "general-purpose.medium"
  zone  = "us-east-1a"
}
\`\`\`

This single file fully describes the intended VM. Running the IaC tool against it will create the VM if it doesn't exist, leave it alone if it already matches, or update it if something in the file changed (say, a new \`size\`) — all without you writing the individual create/update commands yourself.

## Real-world example

A company's production environment was originally built by clicking through a cloud console over several months, with no record of exactly what was configured or why. When a critical database needs to be recreated in a new region after a regional outage, nobody is fully certain of every setting that needs to be replicated — network rules, IAM permissions, storage configuration — because none of it was ever written down as code. A team that instead defines its infrastructure in code can recreate the exact same environment, correctly, in a new region within minutes, simply by pointing the same IaC definitions at the new region.

## Common mistake

Treating IaC as "just automation scripts" and continuing to make manual changes directly in the cloud console "just this once, to fix it quickly." Every manual change made outside the code creates drift — the code no longer accurately describes reality — and the next time someone applies the code, it may unexpectedly try to undo the manual fix. Once infrastructure is managed as code, changes should flow through the code, not around it, even for small or urgent fixes.
`,
        },
        {
          slug: "iac-tools-terraform-and-cloudformation",
          title: "IaC Tools: Terraform and CloudFormation",
          estimatedMinutes: 9,
          content: `# IaC Tools: Terraform and CloudFormation

The previous lesson introduced the concept of Infrastructure as Code. This lesson looks at the actual tools people use to do it, at a conceptual level — you don't need to be able to write production-ready templates to understand cloud fundamentals, but you should recognize these tools by name and understand what makes them different from each other.

## Provider-native tools

Every major cloud provider ships its own native IaC tool that understands that provider's services deeply: AWS CloudFormation, Azure Resource Manager (ARM) templates / Bicep, and Google Cloud Deployment Manager. These tools are typically written in JSON or YAML (or a provider-specific shorthand language, like Bicep) and are tightly integrated with their own provider's console and APIs.

\`\`\`yaml
# A simplified CloudFormation-style template
Resources:
  WebServer:
    Type: "Cloud::Compute::Instance"
    Properties:
      ImageId: "ubuntu-22.04"
      InstanceType: "general-purpose.medium"
      AvailabilityZone: "us-east-1a"
\`\`\`

## Multi-cloud tools

**Terraform** is the most widely used third-party, multi-cloud IaC tool. Instead of a provider-specific language, it uses its own configuration language (HCL — HashiCorp Configuration Language) with "providers" — plugins that let the same tool and workflow manage resources across AWS, Azure, Google Cloud, and many other systems (including some that aren't cloud infrastructure at all, like DNS registrars or monitoring platforms).

\`\`\`hcl
provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-0abc12345"
  instance_type = "t3.medium"
}
\`\`\`

The main practical trade-off: native tools (CloudFormation, ARM) are usually the first to support brand-new features of their own provider, since the provider builds them together. Multi-cloud tools like Terraform trade a small amount of day-one feature support for the ability to manage infrastructure across multiple providers using one consistent workflow and language — valuable for organizations that are multi-cloud, or that simply prefer not to learn a different tool for every provider.

## The core workflow: plan, then apply

Regardless of which tool is used, the typical IaC workflow follows the same shape:

\`\`\`text
1. Write/update the declarative definition (the code)
2. Run a "plan" (or "preview") step
     --> shows exactly what will be created, changed, or destroyed,
         WITHOUT actually making any changes yet
3. Review the plan (ideally, as part of a pull request)
4. Run "apply"
     --> makes the real changes to match the code
\`\`\`

\`\`\`bash
terraform plan    # shows: "1 to add, 1 to change, 0 to destroy"
terraform apply   # actually creates/changes/destroys those resources
\`\`\`

The "plan" step before applying is one of the most valuable safety mechanisms in all of IaC — it lets a human review exactly what's about to happen to real infrastructure before it happens, catching mistakes (like an unintended resource deletion) before they occur rather than after.

## Real-world example

A platform team manages infrastructure across both AWS and Azure — some workloads run in each, for redundancy and to avoid full dependence on a single vendor. Rather than maintaining two entirely separate sets of infrastructure tooling and expertise (CloudFormation for AWS, ARM templates for Azure), they standardize on Terraform, using its AWS and Azure providers, so their engineers only need to learn one configuration language and one workflow, regardless of which cloud a given resource lives in.

## Common mistake

Running \`apply\` (or the equivalent) directly, without reviewing the "plan" output first, especially on production infrastructure. Because IaC tools can create, modify, *and destroy* resources to match the code, an unreviewed typo or an unintended change to a shared configuration file can silently delete something critical. Treating the plan step as a mandatory checkpoint — the same way a pull request review is mandatory for application code — is standard practice for any serious use of IaC.
`,
        },
        {
          slug: "iac-state-and-idempotency",
          title: "IaC State and Idempotency",
          estimatedMinutes: 8,
          content: `# IaC State and Idempotency

Two ideas explain most of the behavior — and most of the common pitfalls — of real-world IaC tools: **state** and **idempotency**. Understanding both is what separates "I can write a config file" from "I understand why IaC behaves the way it does."

## What is idempotency?

An operation is **idempotent** if running it multiple times produces the same result as running it once. This is a core design goal of declarative IaC: applying the same infrastructure definition five times in a row should leave you with exactly one VM named \`web-01\` — not five VMs, and not an error on the second run.

\`\`\`text
Non-idempotent (imperative "create" command):
  run once  --> 1 VM created
  run again --> ERROR (VM already exists) OR a second, duplicate VM

Idempotent (declarative IaC apply):
  run once  --> 1 VM created
  run again --> "no changes needed" (already matches desired state)
\`\`\`

Idempotency is what makes it safe to re-run IaC tooling as part of an automated pipeline, or after an interrupted run, without manually figuring out what already succeeded.

## What is state?

To know whether something needs to be created, changed, or left alone, an IaC tool needs to track what it has already created — this tracking record is called **state**. Terraform, for example, keeps a state file that maps each resource in your configuration to the real, corresponding resource in the cloud provider (including its actual ID, not just its name in your code).

\`\`\`text
Your code says:              State file says:               Real cloud says:
"a VM named web-01"    <-->  "web-01 = instance i-0abc123"  <--> instance i-0abc123 exists
\`\`\`

On every run, the tool compares your code against the state file, and the state file against reality, to figure out exactly what (if anything) needs to change.

## Why state management is a real operational concern

- **State must be stored somewhere durable and shared** — if two engineers each have their own local copy of the state file and both run \`apply\` at the same time, they can make conflicting changes or lose track of each other's changes entirely. Teams typically store state in a shared, locked remote location (like a versioned object storage bucket) specifically to avoid this.
- **State can drift from reality** — if someone manually deletes a resource in the console, the state file doesn't automatically know that; the next \`plan\` will typically detect the mismatch and offer to recreate it.
- **Losing the state file is a real operational risk** — without it, the tool no longer knows which real-world resources correspond to which lines of code, making safe updates much harder.

\`\`\`text
Two engineers, no shared/locked state:
Engineer A: apply  ---> modifies resource X
Engineer B: apply (same time) ---> also modifies resource X
                     --> conflicting, unpredictable result

Shared, locked remote state:
Engineer A: apply  ---> acquires lock, applies, releases lock
Engineer B: apply  ---> waits for lock, then applies safely afterward
\`\`\`

## Real-world example

A team stores its Terraform state in a versioned, access-controlled object storage bucket with locking enabled, rather than on an individual engineer's laptop. When two engineers happen to submit infrastructure changes around the same time, the locking mechanism ensures the second engineer's \`apply\` waits until the first one finishes, preventing the two changes from corrupting each other's view of what infrastructure actually exists.

## Common mistake

Manually editing or deleting cloud resources that are managed by IaC, "just to fix something quickly," without updating the code or state to match. This creates drift between the code, the state file, and reality — and the next automated \`apply\` may try to "fix" the manual change by reverting it, undo work a teammate did through the console, or fail with a confusing error because the state file no longer matches what it expects to find. Once a resource is under IaC management, changes to it should go through the same code-and-apply workflow every time.
`,
        },
      ],
    },
    {
      title: "Messaging, APIs, and Event-Driven Architecture",
      lessons: [
        {
          slug: "why-decouple-with-messaging",
          title: "Why Decouple Services with Messaging?",
          estimatedMinutes: 8,
          content: `# Why Decouple Services with Messaging?

So far in this course, most examples have assumed one service calls another directly and waits for an immediate response — a **synchronous** call. That pattern is simple and works well for many things, but it creates tight coupling between services, and tight coupling causes real problems as a system grows.

## The problem with purely synchronous calls

\`\`\`text
Order service --(synchronous call, waits)--> Inventory service
                                                      |
                                             if Inventory is slow or down,
                                             Order service is stuck waiting
                                             (or fails outright)
\`\`\`

If Order service calls Inventory service directly and waits for a response:

- If Inventory service is temporarily slow, Order service is slow too — the slowness propagates directly upstream.
- If Inventory service is briefly unavailable, Order service's request likely fails entirely, even though the order itself might still be perfectly valid and could be processed a few seconds later.
- Order service now needs to know exactly how to reach Inventory service, and the two teams that own each service become more tightly linked — a change to one can more easily break the other.

## Asynchronous messaging as the alternative

**Asynchronous messaging** breaks the direct call apart: instead of Order service calling Inventory service directly, Order service places a message describing what happened (or what needs to happen) onto a **message broker**, and Inventory service picks up and processes that message whenever it's ready.

\`\`\`text
Order service --> [message broker] --> Inventory service
     (doesn't wait for                 (processes when ready,
      Inventory to respond)             at its own pace)
\`\`\`

## What this buys you

- **Resilience to temporary failures** — if Inventory service is briefly down, the message simply waits in the broker until Inventory service comes back, instead of the request failing outright.
- **Load smoothing** — a sudden burst of orders doesn't require Inventory service to instantly scale to match; messages queue up and get processed at a sustainable rate.
- **Looser coupling** — Order service doesn't need to know anything about how Inventory service works internally, or even that it exists by that name — it just needs to know the shape of the message to send.
- **Independent scaling and deployment** — each service can be scaled, updated, and even temporarily taken offline for maintenance independently, since they're no longer directly, synchronously dependent on each other being available at the exact same moment.

## The trade-off

Asynchronous messaging isn't free of cost. It introduces:

- **Eventual consistency** — there's a delay between "Order service placed the message" and "Inventory service actually processed it," meaning the two services' data can be briefly out of sync.
- **More operational complexity** — you now have a message broker to run (or a managed one to configure), and debugging a flow that spans an asynchronous hop is often harder than tracing a single synchronous call.

## Real-world example

An e-commerce checkout flow places an order and needs to notify inventory, send a confirmation email, and trigger a shipping label — none of which need to happen before the customer sees "order confirmed." Rather than making the checkout request wait on all three of those steps synchronously (and fail entirely if any one of them is briefly slow), the checkout service publishes a single "order placed" message to a broker, and each downstream service consumes it independently, at its own pace — the customer gets an instant confirmation, and the rest of the work happens reliably, just slightly after the fact.

## Common mistake

Assuming every interaction between services should be asynchronous "for resilience." Some interactions genuinely need an immediate answer — checking whether a payment was authorized before telling the customer their order succeeded, for instance — and forcing those into an asynchronous flow adds complexity and delay without a real benefit. Asynchronous messaging is the right tool specifically when the caller doesn't need an immediate result to proceed, not a universal default for every service-to-service interaction.
`,
        },
        {
          slug: "queues-topics-and-pub-sub",
          title: "Queues, Topics, and Pub/Sub",
          estimatedMinutes: 9,
          content: `# Queues, Topics, and Pub/Sub

Asynchronous messaging comes in a few distinct shapes, and picking the right one depends on a simple question: does exactly one consumer need to process each message, or does every interested party need to know about it?

## Queues: one message, one consumer

A **queue** holds messages until a consumer is ready to process them, and each message is typically delivered to and processed by exactly one consumer, even if multiple consumers are listening on the same queue (in that case, the queue distributes messages across them, but each individual message still only goes to one).

\`\`\`text
Producer --> [ Queue: msg1, msg2, msg3 ] --> Consumer pool
                                              (each message processed
                                               by exactly one consumer)
\`\`\`

\`\`\`bash
cloudctl queue send \\
  --queue order-processing \\
  --message '{"orderId": "1042", "action": "process"}'
\`\`\`

Queues are a natural fit for **work distribution** — a pool of workers pulling tasks off a shared queue, where you want each task done exactly once, and want to easily add more workers to drain the queue faster under load.

## Topics and pub/sub: one message, many subscribers

A **publish/subscribe (pub/sub)** system works differently: a producer publishes a message to a **topic**, and every subscriber to that topic receives its own copy of the message. This is a natural fit for **fan-out** — one event that multiple, independent parts of a system all need to react to.

\`\`\`text
                              +--> Subscriber A (e.g., send email)
Producer --> [ Topic ] ------+--> Subscriber B (e.g., update inventory)
                              +--> Subscriber C (e.g., update analytics)
      (every subscriber gets its own copy of the same message)
\`\`\`

\`\`\`bash
cloudctl topic publish \\
  --topic order-placed \\
  --message '{"orderId": "1042", "total": 59.99}'
\`\`\`

## Queues vs. topics, side by side

\`\`\`text
                  Queue                          Topic (pub/sub)
Delivery:         Each message to ONE consumer    Each message to EVERY subscriber
Best for:         Distributing work across a      Notifying multiple independent
                  pool of workers                  systems about one event
Typical use:      Task/job processing              Fan-out notifications
\`\`\`

It's common to combine the two: a topic fans a message out to several queues, one per subscribing service, so each service processes its own copy at its own pace using its own worker pool — getting fan-out and reliable, ordered work distribution at the same time.

\`\`\`text
                                +--> [Queue: email-service]    --> Email workers
Producer --> [ Topic ] --------+--> [Queue: inventory-service]--> Inventory workers
                                +--> [Queue: analytics-service]--> Analytics workers
\`\`\`

## Real-world example

A ride-sharing app publishes a single "trip completed" event to a topic. One subscribing queue feeds a billing service that calculates the fare; another subscribing queue feeds a driver-payout service; a third feeds an analytics pipeline. Each of the three downstream systems processes the same underlying event completely independently, at its own pace, using its own pool of workers — and none of them need to know the others exist.

## Common mistake

Using a topic (pub/sub) when the actual requirement is "this task should be done exactly once by exactly one worker," or using a plain queue when the actual requirement is "every one of these five systems needs to independently react to this event." Picking the wrong shape either causes a task to be duplicated across multiple unrelated systems that shouldn't all be doing it, or causes an event that several systems needed to react to be consumed and effectively "used up" by whichever one system happened to grab it first.
`,
        },
        {
          slug: "api-gateways-and-service-integration",
          title: "API Gateways and Service Integration",
          estimatedMinutes: 8,
          content: `# API Gateways and Service Integration

As a cloud application grows into many independent services — some talking synchronously, some via queues and topics — you need a consistent, secure front door for the services that are meant to be called directly, especially over HTTP. That's the role of an **API gateway**.

## What an API gateway does

An **API gateway** sits in front of one or more backend services and handles the cross-cutting concerns that would otherwise need to be duplicated inside every single service:

\`\`\`text
                          +------------------+
Client requests -------->|   API Gateway     |
                          +------------------+
                           /       |        \\
                          v        v         v
                  [Service A] [Service B] [Service C]
\`\`\`

- **Routing** — directing \`/orders/*\` requests to the orders service, \`/users/*\` to the users service, and so on, similar to the path-based routing you saw with Layer 7 load balancers, but typically with richer API-specific features layered on top
- **Authentication and authorization** — verifying an API key or access token once, at the gateway, rather than every backend service reimplementing that check
- **Rate limiting** — capping how many requests a given client can make in a given time window, protecting backend services from being overwhelmed by a single caller (deliberately abusive or just badly written)
- **Request/response transformation** — adapting request or response formats between what a client sends and what a backend service expects, without requiring changes to either
- **Throttling and quotas** — enforcing usage tiers (e.g., a free tier capped at 1,000 requests/day, a paid tier at 100,000/day)

\`\`\`yaml
route: /orders/*
target_service: orders-service
auth_required: true
rate_limit: 100 requests / minute / client
\`\`\`

## Why centralize this instead of building it into each service

Without a gateway, every backend service would need to implement its own authentication checking, rate limiting, and request logging — duplicated logic, inconsistently implemented, and a larger surface area for security mistakes. Centralizing these concerns at the gateway means they're implemented once, correctly, and consistently enforced for every request that enters the system, regardless of which backend service ultimately handles it.

## API gateways and serverless

API gateways pair especially naturally with serverless functions (covered earlier in this course): a gateway can route an incoming HTTP request directly to a specific function, with the gateway handling authentication and rate limiting, and the function handling only the actual business logic — no server, and often no traditional backend service, in between at all.

\`\`\`text
Client --> API Gateway (auth, rate limiting, routing) --> Serverless function
\`\`\`

## Real-world example

A company exposes a public API to external developers, with a free tier and a paid tier. The API gateway in front of their backend services checks each request's API key, looks up which tier that key belongs to, enforces the appropriate rate limit (1,000 requests/day for free, unlimited for paid), and only forwards requests that pass those checks to the actual backend services — which never need to know anything about API keys, tiers, or rate limits at all; they just handle already-authenticated, already-throttled requests.

## Common mistake

Treating an API gateway as *only* a router, and reimplementing authentication or rate limiting separately, inconsistently, inside individual backend services anyway. The value of a gateway comes largely from centralizing these cross-cutting concerns in one place — if half the services still do their own auth checks and half rely on the gateway, you end up with the worst of both: the operational overhead of a gateway, without the consistency benefit it's supposed to provide.
`,
        },
        {
          slug: "event-driven-architecture-patterns",
          title: "Event-Driven Architecture Patterns",
          estimatedMinutes: 9,
          content: `# Event-Driven Architecture Patterns

Queues, topics, and API gateways are building blocks. **Event-driven architecture** is the broader design approach that uses those building blocks: instead of services calling each other directly to command specific actions, services announce that something happened (an **event**), and other services react to that event independently.

## Events vs. commands

It helps to distinguish two different things a message can represent:

- **Command** — "do this specific thing" (e.g., "charge this customer $50"). Commands are typically directed at exactly one intended recipient, and imply a specific expected action.
- **Event** — "this already happened" (e.g., "order #1042 was placed"). Events are simply facts, broadcast to whoever is interested, with no assumption about who's listening or what they'll do about it.

\`\`\`text
Command: "ChargeCustomer($50)"       --> directed at one service, expects a specific action
Event:   "OrderPlaced(orderId=1042)" --> broadcast fact, any number of services may react
\`\`\`

Event-driven architecture leans heavily on the second style: services publish facts about what happened in their own domain, and other services subscribe to the facts they care about, deciding independently what (if anything) to do in response.

## Choreography vs. orchestration

There are two broad ways to coordinate a multi-step process built from events:

- **Choreography** — no central coordinator; each service reacts to events from other services and emits its own events in turn, and the overall process emerges from these decentralized reactions. No single service knows the entire end-to-end flow.
- **Orchestration** — a central coordinator (an orchestrator) explicitly directs each step of the process, calling or messaging each service in a defined sequence and tracking overall progress.

\`\`\`text
Choreography:                          Orchestration:
Order --> event --> Inventory          Orchestrator --> tells Order: proceed
Inventory --> event --> Shipping       Orchestrator --> tells Inventory: reserve stock
Shipping --> event --> Notification    Orchestrator --> tells Shipping: schedule delivery
(no single service sees the            (one place has the full picture
 whole flow)                            of the process)
\`\`\`

Choreography scales well and keeps services decoupled, but can make it hard to answer "what's the overall status of order #1042 right now?" since no single place holds that answer. Orchestration makes the overall flow and its current status easy to see in one place, at the cost of introducing a central coordinator that every step now depends on.

## Serverless and events

Event-driven architecture and serverless functions (covered earlier in this course) fit together naturally: a function can be configured to trigger directly off an event — a message arriving on a topic, a new object appearing in storage, a scheduled time — without any server sitting idle waiting for that event to occur.

\`\`\`text
Event source (new file uploaded) --> triggers --> Serverless function (process it)
\`\`\`

## Real-world example

An order-fulfillment system uses choreography: when the order service publishes an "OrderPlaced" event, the inventory service independently reacts by reserving stock and publishing "StockReserved"; the shipping service reacts to "StockReserved" by scheduling a delivery and publishing "DeliveryScheduled"; the notification service reacts to any of these events by emailing the customer relevant updates. No single service directs the whole process — it emerges from each service reacting to the facts published by the others, which makes it easy to add a brand-new service (say, a fraud-detection system reacting to "OrderPlaced") without changing any of the existing services at all.

## Common mistake

Choosing pure choreography for a process where understanding and troubleshooting the overall status is critical (say, a multi-step financial settlement process), and later struggling to answer "where exactly did this specific transaction get stuck?" because no service holds the full picture. For complex, multi-step business processes where visibility and error-handling across the whole flow matter a lot, orchestration — even though it reintroduces some central coupling — is often the more pragmatic choice; choreography shines more for simpler, independent reactions where that centralized visibility matters less.
`,
        },
      ],
    },
    {
      title: "Monitoring, Logging, and Observability",
      lessons: [
        {
          slug: "metrics-logs-and-traces",
          title: "Metrics, Logs, and Traces",
          estimatedMinutes: 9,
          content: `# Metrics, Logs, and Traces

Every concept so far in this course has been about building and running cloud infrastructure. This lesson is about a different but equally essential question: once it's running, how do you actually know what it's doing, and when something is wrong? **Observability** is the general term for a system's ability to answer that question, and it's usually described in terms of three complementary types of data.

## Metrics

A **metric** is a numeric measurement recorded over time — CPU utilization, requests per second, average response latency, queue depth. Metrics are cheap to store and query at scale, and are the natural fit for dashboards, trend analysis, and automated alerting (including the auto-scaling triggers you saw earlier in this course, which are themselves driven by metrics).

\`\`\`text
Time:        10:00   10:01   10:02   10:03   10:04
CPU %:        42      45      68      91      95    <- a metric over time
\`\`\`

## Logs

A **log** is a timestamped, discrete record of a specific event — a line of text (or structured data) describing something that happened: "user 1042 logged in," "payment failed: insufficient funds," "request to /api/orders returned 500." Logs are far richer in detail than metrics but far more expensive to store and search at scale, since every single event generates its own record.

\`\`\`text
2026-07-14T09:12:03Z ERROR payment-service: charge failed for order 1042 (reason: card_declined)
2026-07-14T09:12:04Z INFO  order-service: order 1042 marked as payment_failed
\`\`\`

**Structured logging** — writing logs as consistent, machine-parseable data (typically JSON) rather than freeform text — makes it dramatically easier to search, filter, and aggregate logs at scale, since a log-analysis tool can reliably extract fields like \`orderId\` or \`errorCode\` instead of trying to parse arbitrary sentences.

\`\`\`json
{"timestamp": "2026-07-14T09:12:03Z", "level": "error", "service": "payment-service", "orderId": "1042", "reason": "card_declined"}
\`\`\`

## Traces

A **trace** follows a single request as it travels across multiple services, recording how long each step took and in what order. In a system built from many small services (the kind this course has been building toward, with containers, orchestration, and event-driven messaging), a single user action might touch five or ten different services — a trace is what lets you see the entire path a specific request took, and exactly which one of those services was slow.

\`\`\`text
Trace for one checkout request:
  API Gateway         [0ms -----> 5ms]
    Order service     [5ms -----------------> 120ms]
      Inventory check [10ms --> 40ms]
      Payment charge  [45ms ------------------------> 115ms]   <- the slow step
    Response          [120ms -> 125ms]
\`\`\`

Without tracing, a slow checkout request in a system built from ten services would require checking each service's logs individually, one at a time, to find the bottleneck. A trace shows the entire path and each step's timing in one connected view.

## The three pillars, together

\`\`\`text
Metric:  "Average checkout latency just jumped to 800ms"     <- alerts you something's wrong
Trace:   "This specific slow request spent 400ms in payment" <- shows WHERE in the flow
Log:     "Payment service: card processor timeout at 09:12"  <- shows WHY it happened
\`\`\`

Metrics tell you *that* something is wrong and roughly *where* in aggregate; traces show you the path a specific request took and which step was slow; logs give you the detailed, specific reason why. Real observability setups use all three together, rather than relying on just one.

## Real-world example

An on-call engineer gets alerted because a latency metric crossed its threshold. They pull up a trace for one of the slow requests and see that a specific downstream payment service call is taking 400ms instead of its usual 50ms. They then check that payment service's logs around the same timestamp and find repeated "card processor timeout" errors — pointing them directly at a third-party payment processor issue, rather than a bug in their own code, within minutes instead of hours of manual log-digging.

## Common mistake

Logging everything at maximum verbosity in production "to be safe," without structure or a clear retention plan. This makes logs expensive to store, slow to search, and genuinely harder to find the signal in — paradoxically making it harder to diagnose a real incident, not easier. Deciding deliberately what to log, structuring it consistently, and setting a sensible retention period (covered in the next lesson) is far more valuable than logging indiscriminately.
`,
        },
        {
          slug: "setting-up-alerts-and-dashboards",
          title: "Setting Up Alerts and Dashboards",
          estimatedMinutes: 8,
          content: `# Setting Up Alerts and Dashboards

Collecting metrics, logs, and traces is only useful if someone (or something) actually notices when they indicate a problem. **Alerts** and **dashboards** are how raw observability data turns into action.

## Dashboards: for humans watching

A **dashboard** is a visual, usually real-time, summary of a system's key metrics — request rate, error rate, latency, CPU/memory usage — typically arranged so a human can glance at it and quickly assess overall health.

\`\`\`text
+----------------------------------------------------+
|  Requests/sec: 1,240      Error rate: 0.3%           |
|  p50 latency: 45ms        p99 latency: 310ms          |
|  CPU (avg): 62%           Active instances: 8          |
+----------------------------------------------------+
\`\`\`

Good dashboards focus on a small number of the metrics that actually indicate whether the system is healthy from a user's perspective (often called "golden signals": latency, traffic, errors, and saturation), rather than trying to display every metric available.

## Alerts: for humans (or automation) being notified

An **alert** is a rule that automatically notifies someone (or triggers automation) when a metric crosses a defined threshold, without anyone needing to be actively watching a dashboard at that exact moment.

\`\`\`yaml
alert:
  name: high-error-rate
  metric: error_rate
  condition: "> 5%"
  duration: 5m          # sustained for 5 minutes, not just a single blip
  notify: on-call-team
\`\`\`

The \`duration\` field above is important: alerting the instant a metric crosses a threshold even once, however briefly, produces a huge number of alerts for perfectly normal, momentary fluctuations. Requiring the condition to be sustained for a period smooths out noise and avoids "crying wolf."

## Alert fatigue is a real, serious problem

If alerts fire too often, for issues that turn out not to matter, on-call engineers start to ignore or mute them — meaning that when a genuinely serious alert does fire, it may be dismissed along with all the noise. This is called **alert fatigue**, and it's one of the most common ways observability investments fail to deliver real value in practice.

\`\`\`text
Too many low-value alerts --> engineers start ignoring alerts
                                         |
                                         v
                        A genuinely critical alert gets missed too
\`\`\`

Combating alert fatigue generally means:

- Alerting on symptoms that actually affect users (elevated error rate, high latency) rather than every possible underlying cause
- Tuning thresholds and durations so alerts fire only for sustained, meaningful deviations
- Regularly reviewing and removing alerts that consistently turn out to be false alarms

## Real-world example

A team initially sets an alert to fire any time CPU utilization on any single instance exceeds 80%, even for a few seconds — and within a week, the on-call engineer is receiving dozens of alerts a day, most self-resolving within a minute as normal, brief traffic spikes come and go. After the team switches to alerting only on user-facing symptoms (elevated error rate and p99 latency, sustained for at least 5 minutes) instead of a raw infrastructure metric, alert volume drops dramatically, and the alerts that do fire are far more likely to represent something engineers actually need to act on.

## Common mistake

Building an impressive-looking dashboard with dozens of metrics, but setting up no alerts at all — which means an incident is only noticed when a human happens to be looking at the dashboard, or (more often) when a customer reports it first. Dashboards support investigation once you already suspect something is wrong; alerts are what actually tell you something is wrong in the first place, and a mature observability setup needs both, not just one.
`,
        },
        {
          slug: "centralized-logging-at-scale",
          title: "Centralized Logging at Scale",
          estimatedMinutes: 8,
          content: `# Centralized Logging at Scale

Earlier in this course, containers and orchestration made it normal to run many short-lived, disposable instances of a service, and event-driven architecture made it normal for a single user action to touch many independent services. Both trends create the same challenge for logging: if every instance and every service only keeps its own local logs, finding what happened during an incident means hunting across dozens of ephemeral, hard-to-reach places — several of which may no longer even exist by the time you look.

## Why local logs don't scale

\`\`\`text
Without centralized logging:
  [instance 1: local logs]  [instance 2: local logs]  [instance 3: local logs, now destroyed]
        (you'd have to SSH into                              (gone forever —
         each one individually,                                that instance
         and this one is gone)                                 no longer exists)
\`\`\`

Because containers and auto-scaled instances are routinely created and destroyed, any logs stored only on the instance itself are lost the moment that instance is terminated — exactly when you might need them most, during an incident that caused instances to be replaced.

## Centralized log aggregation

The standard solution is **log aggregation**: every instance and service ships its logs off to a centralized logging system as they're generated, rather than only storing them locally.

\`\`\`text
[instance 1] --\\
[instance 2] ---+--> Log shipping agent --> Centralized log store --> Search/query interface
[instance 3] --/
\`\`\`

Once logs are centralized, an engineer can search across every service and every instance — including ones that have long since been destroyed — from one place, typically filtering by fields like \`orderId\`, \`service\`, or \`errorCode\` if the logs are structured (as covered in the earlier lesson on metrics, logs, and traces).

\`\`\`bash
# Searching centralized, structured logs across every service at once
logquery search --filter 'orderId="1042"' --since 1h
\`\`\`

## Retention and cost

Centralized logging systems typically let you configure a **retention period** — how long logs are kept before being automatically deleted or moved to cheaper, colder storage (echoing the storage-tiering concept from earlier in this course). Keeping every log forever, at the fastest, most searchable tier, gets expensive fast; most organizations keep recent logs in a fast, expensive, fully-searchable tier for days or weeks (when they're most likely to be needed for active troubleshooting), and either delete or archive older logs to a much cheaper tier for longer-term compliance needs.

\`\`\`text
Recent logs (0-14 days):    fast, expensive, fully searchable tier
Older logs (14-90 days):    cheaper, slower-to-search tier
Very old logs (90+ days):   archived/cold storage, or deleted, per policy
\`\`\`

## Real-world example

During an incident, an engineer needs to trace what happened to a specific failed order across the API gateway, order service, payment service, and three auto-scaled worker instances that have since been terminated and replaced. Because every one of those components ships its logs to a centralized logging system as they happen, the engineer runs one search filtered to that order's ID and sees the complete sequence of events across every service involved — including the three worker instances that no longer even exist — instead of trying to individually track down and inspect servers that are already gone.

## Common mistake

Setting up centralized logging but leaving the default retention period at "forever" without a deliberate decision. Log volume grows continuously as a system scales, and unmanaged, indefinite retention at the most expensive storage tier is a surprisingly common source of runaway cloud costs — one that's easy to prevent with a deliberate, tiered retention policy set early, rather than discovered painfully later on a monthly bill.
`,
        },
      ],
      quiz: {
        title: "Tier 2 Checkpoint: Compute, Storage, and Networking",
        questions: [
          {
            text: "What is the main benefit of running multiple virtual machines on a single physical server via a hypervisor?",
            optionA: "It eliminates the need for an operating system inside each VM",
            optionB: "It allows the physical hardware's capacity to be shared and pooled across multiple isolated workloads",
            optionC: "It removes the need for network access between VMs",
            optionD: "It guarantees each VM unlimited CPU and memory",
            correctOption: "B",
          },
          {
            text: "Why do containers typically start faster than virtual machines?",
            optionA: "Containers use a completely different CPU architecture",
            optionB: "Containers do not need to boot a full guest operating system, since they share the host's kernel",
            optionC: "Containers are always run on more powerful hardware",
            optionD: "Containers do not require a container runtime",
            correctOption: "B",
          },
          {
            text: "Which workload is the best fit for a serverless (Functions as a Service) approach?",
            optionA: "A database engine that must run continuously with dedicated disk access",
            optionB: "A legacy application requiring a specific, older operating system",
            optionC: "Resizing an image shortly after it is uploaded, triggered by the upload event",
            optionD: "A long-running batch job that takes several hours to complete",
            correctOption: "C",
          },
          {
            text: "Which storage type is best suited for serving large numbers of user-uploaded images to a website over HTTPS?",
            optionA: "Block storage",
            optionB: "Object storage",
            optionC: "File storage mounted via NFS",
            optionD: "A raw disk device attached to one VM",
            correctOption: "B",
          },
          {
            text: "A database engine needs low-latency, frequent, small random reads and writes to its own dedicated disk. Which storage type fits this need?",
            optionA: "Object storage",
            optionB: "Block storage",
            optionC: "A CDN edge cache",
            optionD: "File storage shared across many servers",
            correctOption: "B",
          },
          {
            text: "In a Kubernetes cluster, what is the main purpose of a Service, as distinct from a Deployment?",
            optionA: "A Service defines how many replicas of a pod should run and which container image to use",
            optionB: "A Service provides a stable network address that routes to healthy pods, even as the underlying pods are replaced",
            optionC: "A Service replaces the need for a control plane",
            optionD: "A Service is only used for storage, never for networking",
            correctOption: "B",
          },
          {
            text: "What is the main advantage of a declarative Infrastructure as Code tool over running one-off imperative commands to create infrastructure?",
            optionA: "Declarative tools are always faster to execute",
            optionB: "Declarative tools can only be used with a single cloud provider",
            optionC: "Re-applying the same declarative definition is idempotent, producing the same end state rather than duplicating resources",
            optionD: "Declarative tools do not require any form of version control",
            correctOption: "C",
          },
          {
            text: "A team wants a single event ('order placed') to be independently processed by three separate downstream services, each at its own pace. Which messaging pattern best fits this need?",
            optionA: "A queue where only one consumer processes each message",
            optionB: "A synchronous call that waits for all three services to respond",
            optionC: "A topic (pub/sub) that fans the event out to all three subscribers",
            optionD: "Vertical scaling of the order service",
            correctOption: "C",
          },
          {
            text: "In an observability setup, what is the primary purpose of a distributed trace, as distinct from a metric or a log?",
            optionA: "It shows the numeric trend of a single value, like CPU usage, over time",
            optionB: "It follows a single request across multiple services, showing how long each step took and in what order",
            optionC: "It permanently stores every log line generated by every service",
            optionD: "It replaces the need for any alerting",
            correctOption: "B",
          },
          {
            text: "Why is a sustained-duration condition (e.g., 'error rate > 5% for 5 minutes') generally preferred over alerting the instant a threshold is crossed even once?",
            optionA: "It makes the alerting system cheaper to run",
            optionB: "It prevents alerts from firing at all during real incidents",
            optionC: "It reduces false alarms from brief, normal fluctuations, helping avoid alert fatigue",
            optionD: "It is required by every cloud provider's terms of service",
            correctOption: "C",
          },
        ],
      },
    },
    {
      title: "Scaling and Elasticity",
      lessons: [
        {
          slug: "vertical-vs-horizontal-scaling",
          title: "Vertical vs. Horizontal Scaling",
          estimatedMinutes: 8,
          content: `# Vertical vs. Horizontal Scaling

When an application needs more capacity — because it's slow, or because it's about to run out of resources — there are two fundamentally different ways to give it more: make the existing machine bigger, or add more machines. These are called vertical and horizontal scaling.

## Vertical scaling (scaling up)

**Vertical scaling** means increasing the resources (CPU, memory, disk) of a single existing server or instance — moving from a small instance size to a larger one.

\`\`\`text
Before:  [ 2 vCPU, 4 GB RAM ]
After:   [ 8 vCPU, 32 GB RAM ]   <- same single server, more resources
\`\`\`

\`\`\`bash
cloudctl vm resize --name db-primary --new-size 8vcpu-32gb
\`\`\`

- Simple conceptually — no application changes needed, no need to distribute state across machines
- Has a hard ceiling — there's a maximum instance size any provider offers, and you eventually hit it
- Usually requires a brief restart/downtime while the resize takes effect
- Common for databases, especially ones that are hard to split across multiple machines

## Horizontal scaling (scaling out)

**Horizontal scaling** means adding more instances of the same size, and spreading load across all of them (typically behind a load balancer), rather than making any single instance bigger.

\`\`\`text
Before:  [ server 1 ]
After:   [ server 1 ]  [ server 2 ]  [ server 3 ]
\`\`\`

\`\`\`bash
cloudctl instances scale --group web-tier --count 3
\`\`\`

- Effectively unlimited ceiling — you can generally keep adding instances as demand grows
- No single point of failure — losing one instance out of many is a much smaller impact than losing your only (vertically-scaled) instance
- Requires the application to be designed to run as multiple, independent copies (often called being "stateless" — not storing session data only in one instance's local memory)
- Well suited to web/API tiers behind a load balancer

## Comparing the two

\`\`\`text
                Vertical (scale up)        Horizontal (scale out)
Ceiling:        Limited by max instance     Effectively unlimited
                size available
Complexity:     Low — no app changes        Higher — app must handle
                needed                       running as multiple copies
Fault tolerance: Single instance = single    Losing one instance out of
                point of failure             many is far less impactful
Typical use:    Databases, legacy apps       Web/API tiers, stateless services
\`\`\`

## Real-world example

A web application's API tier scales horizontally — as traffic grows, more identical API server instances are added behind a load balancer, and each handles a share of requests independently. Meanwhile, the application's primary relational database (which is much harder to split across multiple writable copies) scales vertically instead — moving to larger and larger instance sizes as data volume and query load grow, until eventually more advanced techniques like sharding (splitting the database itself across multiple machines) become necessary.

## Common mistake

Assuming you can always scale horizontally by simply "adding more servers," regardless of the application's design. If an application stores session state only in a single server's local memory (rather than in a shared, external store like a managed database or cache), adding more servers behind a load balancer breaks things — a user's session might exist on server 1 but their next request gets routed to server 2, which has no idea who they are. Horizontal scaling generally requires designing the application to be stateless, or to externalize state, from the start.
`,
        },
        {
          slug: "auto-scaling-in-practice",
          title: "Auto-Scaling in Practice",
          estimatedMinutes: 9,
          content: `# Auto-Scaling in Practice

**Auto-scaling** automates horizontal scaling: instead of a human deciding when to add or remove instances, the platform monitors defined metrics and adjusts capacity automatically, based on rules you configure in advance.

## The basic building blocks

An auto-scaling setup typically has three pieces:

1. **A launch template/configuration** — describes what a new instance should look like (which image, which instance size, which startup script)
2. **A scaling group** — the set of instances being managed together, with a minimum, maximum, and desired instance count
3. **Scaling policies** — rules that say when to add or remove instances, usually tied to a metric

\`\`\`yaml
scaling_group:
  min_size: 2
  max_size: 10
  desired_capacity: 2

scaling_policy:
  metric: average_cpu_utilization
  target: 60%          # try to keep average CPU around 60%
  scale_out_cooldown: 60s
  scale_in_cooldown: 300s
\`\`\`

In this example, the group never drops below 2 instances (for baseline redundancy) or exceeds 10 (a cost/safety ceiling), and it automatically adds or removes instances to try to keep average CPU utilization near 60%.

## Common triggers for scaling

- **CPU or memory utilization** — the most common signal; scale out when average CPU crosses a threshold
- **Request count / queue depth** — scale based on how many requests are queued waiting to be processed, which can react faster than CPU metrics for I/O-bound workloads
- **Scheduled scaling** — pre-emptively add capacity ahead of a known, predictable spike (e.g., scale up every weekday morning before business hours begin, rather than reacting after the fact)

## Why cooldown periods matter

Notice the \`scale_out_cooldown\` and \`scale_in_cooldown\` values above. Without a cooldown, an auto-scaler can "thrash" — rapidly adding and removing instances in response to normal, brief fluctuations in load, which wastes money on constant instance churn and can even destabilize the application. A cooldown period forces the scaler to wait a bit after each scaling action before taking another one, smoothing out its response to noisy metrics.

## Scaling out is usually faster than scaling in

Most auto-scaling configurations scale out (add capacity) more aggressively/quickly than they scale in (remove capacity) — reflected above by a short 60-second scale-out cooldown versus a longer 300-second scale-in cooldown. This asymmetry is deliberate: the cost of being briefly overprovisioned is usually low, but the cost of being underprovisioned (users experiencing slowness or errors) is usually much higher, so it's typically safer to add capacity quickly and remove it more cautiously.

## Real-world example

A ticket-sales website expects a predictable surge the moment tickets for a popular event go on sale. Rather than relying purely on reactive auto-scaling (which might take a minute or two to notice rising CPU and spin up new instances — a minute or two during which users could see errors), the team configures scheduled scaling to pre-emptively add extra instances five minutes before the announced on-sale time, then lets reactive CPU-based auto-scaling continue to fine-tune capacity afterward as real demand plays out.

## Common mistake

Setting a scaling group's minimum size to 1 for a production workload. Even if that one instance can normally handle all the traffic, a minimum of 1 means there's no redundancy — if that single instance fails or is being replaced, there is a window with zero capacity. A minimum of at least 2 instances (spread across separate availability zones) is a common baseline for production workloads that need to stay available during routine instance replacement or a single zone's failure.
`,
        },
        {
          slug: "load-balancing-patterns",
          title: "Load Balancing Patterns",
          estimatedMinutes: 8,
          content: `# Load Balancing Patterns

You've already met load balancers as the traffic-splitting layer in front of a group of servers. This lesson goes one level deeper into the different layers at which load balancing can happen, and the patterns that combine load balancing with scaling to build resilient systems.

## Layer 4 vs. Layer 7 load balancing

Load balancers commonly operate at one of two layers of the networking stack:

- **Layer 4 (transport layer)** — makes routing decisions based on IP address and port only, without inspecting the actual content of the traffic. Very fast, protocol-agnostic, but "dumber" — it can't route based on, say, the URL path of an HTTP request.
- **Layer 7 (application layer)** — understands the actual protocol (typically HTTP/HTTPS), and can make routing decisions based on things like the URL path, HTTP headers, or cookies.

\`\`\`text
Layer 7 example: path-based routing
  /api/*     -->  API server pool
  /images/*  -->  Image server pool
  /*         -->  Default web server pool
\`\`\`

This means a single Layer 7 load balancer can route different parts of one website to entirely different backend server pools, based purely on the URL — useful for splitting a monolithic application into more independently-scalable services over time.

## Combining load balancers with auto-scaling groups

In practice, a load balancer and an auto-scaling group are almost always used together: the auto-scaler adds or removes instances based on demand, and it automatically registers new instances with the load balancer (and deregisters ones being removed), so the load balancer's view of "healthy backends" always stays in sync with the current scaling group membership.

\`\`\`text
   Auto-scaling group
   +-------------------------------+
   | [instance] [instance] [instance] --new instance added-->
   +-------------------------------+
              |         |         |
              v         v         v
          registered automatically with:
              Load Balancer
                    |
                    v
              incoming traffic
\`\`\`

## Multi-region load balancing

For applications that run in more than one region, a **global** (or DNS-based) load balancer can route users to the nearest or healthiest region — for example, sending European users to a Frankfurt region and US users to a Virginia region, and automatically redirecting traffic away from a region if it becomes unhealthy.

\`\`\`text
                 Global load balancer / DNS routing
                        /              \\
                       v                v
            Region: Europe        Region: US-East
         (regional load balancer) (regional load balancer)
                 |                        |
           [instances...]           [instances...]
\`\`\`

## Real-world example

A global SaaS product uses a two-tier load balancing setup: a global, latency-based DNS routing layer sends each user to their nearest healthy region, and within that region, a Layer 7 load balancer routes \`/api/*\` requests to a pool of API servers and everything else to a pool of servers serving the web front-end — with an auto-scaling group behind each pool independently adding or removing capacity as that specific part of the traffic changes.

## Common mistake

Assuming a single load balancer instance is itself infinitely resilient. In reality, cloud load balancers are typically managed services that are already redundant across multiple availability zones behind the scenes — but if you're ever evaluating a self-managed load balancer (one you install and run yourself on a VM), that load balancer itself becomes a single point of failure unless you deliberately run more than one, which is exactly the kind of operational burden managed load balancer services exist to remove.
`,
        },
      ],
    },
    {
      title: "CI/CD and DevOps Practices",
      lessons: [
        {
          slug: "continuous-integration-basics",
          title: "Continuous Integration Basics",
          estimatedMinutes: 8,
          content: `# Continuous Integration Basics

Everything covered so far in this course explains how cloud infrastructure runs. This module turns to a different but closely related question: how does application code actually get from a developer's laptop into that running infrastructure, safely and repeatedly? The first half of the answer is **continuous integration (CI)**.

## What CI actually means

**Continuous integration** is the practice of automatically building and testing every code change as soon as it's proposed — typically the moment a developer pushes code or opens a pull request — rather than waiting and integrating everyone's changes in one large, risky batch.

\`\`\`text
Without CI:                              With CI:
Developers work in isolation for         Every push automatically triggers:
weeks, then merge everything at            1. Build the code
once --> "integration hell," many          2. Run automated tests
conflicting changes discovered at          3. Report pass/fail within minutes
the same time
\`\`\`

## A typical CI pipeline

\`\`\`yaml
# A simplified CI pipeline definition
on: pull_request
jobs:
  build_and_test:
    steps:
      - checkout_code
      - run: npm install
      - run: npm run build
      - run: npm test
\`\`\`

Every time a developer proposes a change, this pipeline runs automatically, and the result (pass or fail) is visible directly on the pull request — catching a broken build or a failing test within minutes, before it's merged into the shared codebase at all.

## Why this matters at cloud scale

CI matters more, not less, as a system grows into many independent services (as this course has been building toward, with containers, orchestration, and event-driven architecture). With many small services, many developers are changing many parts of a system simultaneously — automated, immediate feedback on every single change is what keeps that manageable, instead of discovering conflicts and breakages only when someone tries to deploy weeks of accumulated changes at once.

## Key CI practices

- **Fast feedback** — a CI pipeline that takes an hour to report back is far less useful than one that reports back in a few minutes; slow pipelines get ignored or worked around
- **Trunk-based development** — many teams practice merging small, frequent changes into a shared main branch (rather than long-lived, divergent feature branches), specifically because it keeps each individual CI run small, fast, and low-risk
- **Automated tests as a gate** — a pull request with failing tests is blocked from merging, making "all tests pass" a hard requirement rather than a suggestion

## Real-world example

A team of 15 engineers, each working on different parts of a large application, pushes small changes to a shared repository dozens of times a day. Every single push automatically triggers a build and test run; a broken change is caught and reported within minutes, directly on that developer's pull request, before it can affect anyone else's work — instead of being discovered days later when someone else's unrelated change unexpectedly stops working.

## Common mistake

Treating CI as "just running tests" and skipping it for "small" changes, "just this once." The value of CI comes specifically from applying it to *every* change, without exception — the moment some changes skip the pipeline, you lose the guarantee that the main branch always builds and passes tests, which is the entire point of having CI in the first place.
`,
        },
        {
          slug: "continuous-delivery-and-deployment",
          title: "Continuous Delivery and Deployment Strategies",
          estimatedMinutes: 9,
          content: `# Continuous Delivery and Deployment Strategies

Continuous integration gets code built and tested automatically. **Continuous delivery (CD)** and **continuous deployment** extend that automation to actually getting code running in production — and how you roll out a new version matters just as much as how you build and test it.

## Continuous delivery vs. continuous deployment

These two terms are related but distinct:

- **Continuous delivery** — every change that passes CI is automatically packaged and made ready to deploy at any time, but an explicit action (often a human clicking "deploy") triggers the actual release to production.
- **Continuous deployment** — every change that passes CI is automatically deployed to production with no human approval step at all.

\`\`\`text
Continuous delivery:  CI passes --> ready to deploy --> human clicks "deploy" --> live
Continuous deployment: CI passes --> automatically deployed --> live
\`\`\`

Continuous deployment requires a very high level of confidence in automated testing (since nothing else stands between a change and production), and isn't the right fit for every kind of system — many organizations deliberately choose continuous delivery specifically to keep a human decision point before customer-facing production changes.

## Deployment strategies: how the new version actually replaces the old

However a release is triggered, there's still a choice about *how* the new version rolls out to running infrastructure. A few common patterns:

- **Rolling deployment** — replace instances of the old version with the new version gradually, a few at a time, so the application stays available throughout (this is exactly what the Kubernetes deployment example from earlier in this course does by default).
- **Blue-green deployment** — run a complete second copy of the environment ("green") alongside the current one ("blue"), fully test the green environment, then switch all traffic over at once (often just by repointing a load balancer or DNS record). If something's wrong, switching back to blue is immediate.
- **Canary deployment** — release the new version to a small percentage of real traffic first (say, 5%), monitor its metrics and error rates closely, and only gradually increase that percentage to 100% if everything looks healthy.

\`\`\`text
Rolling:     [old][old][old] --> [new][old][old] --> [new][new][old] --> [new][new][new]

Blue-green:  Blue (live, 100% traffic)     Green (new version, tested, idle)
                    |                                    |
                    +-------- traffic switched at once --+
                          Green (now live, 100% traffic)

Canary:      95% traffic --> [old version]
              5% traffic --> [new version]   <- watch closely, then increase gradually
\`\`\`

## Choosing a strategy

\`\`\`text
Rolling:      Simple, minimal extra infrastructure cost, but a bad deploy
              still reaches 100% of traffic eventually unless paused
Blue-green:   Instant rollback, but doubles infrastructure cost while both
              environments exist
Canary:       Limits a bad deploy's blast radius to a small fraction of
              traffic, but is the most operationally complex to set up
\`\`\`

## Real-world example

A payments company uses a canary deployment for changes to its core transaction-processing service: a new version first receives just 2% of real traffic while error rates and latency are monitored closely for 15 minutes; if metrics stay healthy, traffic is gradually increased to 25%, then 100%. If anything looks wrong at any stage, traffic is immediately shifted back to the previous version, and at most 2-25% of transactions were ever affected — a direct, deliberate trade of deployment speed for a tightly limited blast radius on a system where mistakes are expensive.

## Common mistake

Assuming any of these strategies eliminates the need for good automated tests and monitoring. Rolling, blue-green, and canary deployments all limit the *impact* of a bad release, but none of them prevent a bad release from happening in the first place, or automatically tell you that it happened — that still depends on the CI testing from the previous lesson and the observability practices (metrics, alerts) from the previous module. Deployment strategy and observability are complementary, not substitutes for each other.
`,
        },
        {
          slug: "pipeline-as-code-and-devops-culture",
          title: "Pipeline as Code and DevOps Culture",
          estimatedMinutes: 8,
          content: `# Pipeline as Code and DevOps Culture

The final piece connects everything in this module back to a broader idea: **DevOps** is as much a cultural and organizational shift as it is a specific set of tools, and CI/CD pipelines are usually defined the same way infrastructure is — as code.

## Pipelines as code

Just as Infrastructure as Code replaced manually clicking through a console, modern CI/CD systems define the entire build-test-deploy pipeline in a version-controlled file that lives alongside the application code itself, rather than being configured by hand in a separate tool's UI.

\`\`\`yaml
# A pipeline defined as code, stored in the same repository as the app
name: build-test-deploy
on: [push]
jobs:
  build:
    steps:
      - run: npm install
      - run: npm run build
  test:
    needs: build
    steps:
      - run: npm test
  deploy:
    needs: test
    if: branch == 'main'
    steps:
      - run: deploy-to-production.sh
\`\`\`

This has the same benefits as Infrastructure as Code: the pipeline's history is versioned and reviewable, changes to how software is built and released go through the same pull-request review as any other code change, and the exact same pipeline definition can be reused consistently across environments.

## Immutable artifacts

A closely related practice: build one deployable artifact (a container image, in most modern pipelines) exactly once per change, and promote that *exact same* artifact through each environment — testing, staging, production — rather than rebuilding the code separately for each environment.

\`\`\`text
Build once:  code --> build --> artifact v2.3.1
                                     |
                     +---------------+---------------+
                     v               v               v
                  Testing         Staging         Production
             (same artifact,  (same artifact,  (same artifact,
              not rebuilt)     not rebuilt)     not rebuilt)
\`\`\`

This matters because rebuilding separately for each environment introduces the risk that something subtly differs between what was tested and what actually reaches production (a different dependency version resolved, a different build-time configuration) — testing the *exact* artifact that will run in production is a stronger guarantee than testing something merely similar to it.

## DevOps as culture, not just tooling

The term "DevOps" describes breaking down the traditional separation between development teams (who write code) and operations teams (who ran infrastructure), so that the people building a service also share responsibility for running it reliably in production. CI/CD pipelines, Infrastructure as Code, and the observability practices from the previous module are the tools that make this possible — but the underlying cultural shift is what actually makes it work: teams that build a service being directly accountable for (and having direct visibility into) how it behaves in production, rather than "throwing it over the wall" to a separate team once it's built.

\`\`\`text
Traditional split:                    DevOps approach:
Dev team: writes code,                One team: writes code, defines its
  hands off to Ops                      own pipeline and infrastructure,
Ops team: deploys and                  and is on-call for its own service
  operates it, separately
\`\`\`

## Real-world example

A team that previously handed finished code to a separate operations team — waiting days for a manual deployment, and having no visibility once it was live — moves to owning their service end-to-end: they define their own pipeline as code, their own infrastructure as code, and carry their own on-call pager for the alerts covered in the previous module. Deployments that used to take days of coordination between two teams now happen automatically, several times a day, with the same people who wrote the code directly seeing (and fixing) exactly how it behaves once it's running.

## Common mistake

Adopting CI/CD tooling without the underlying cultural shift — automating deployments, but still keeping the team that writes the code fully separate from, and unaccountable for, how it behaves in production. The tooling from this module removes mechanical friction from building and releasing software; it doesn't by itself create the shared ownership and accountability that make an organization's software delivery genuinely faster and more reliable over time.
`,
        },
      ],
    },
    {
      title: "Reliability and Security Fundamentals",
      lessons: [
        {
          slug: "high-availability-and-fault-tolerance",
          title: "High Availability and Fault Tolerance",
          estimatedMinutes: 9,
          content: `# High Availability and Fault Tolerance

**High availability (HA)** means designing a system so it keeps working, with minimal interruption, even when individual components fail. It's a design goal, not a single feature — it's achieved by combining several of the concepts you've already learned: multiple availability zones, load balancing, auto-scaling, and database replication.

## Measuring availability: the "nines"

Availability is often expressed as a percentage of uptime over a year, commonly described in terms of "nines":

\`\`\`text
99%       ("two nines")   ~ 3.65 days of downtime per year
99.9%     ("three nines") ~ 8.76 hours of downtime per year
99.99%    ("four nines")  ~ 52.6 minutes of downtime per year
99.999%   ("five nines")  ~ 5.26 minutes of downtime per year
\`\`\`

Each additional "nine" is significantly more expensive and architecturally demanding to achieve — going from three nines to four nines might mean the difference between accepting occasional single-digit-minutes outages and needing fully automated failover with no human in the loop.

## Redundancy: eliminating single points of failure

A **single point of failure (SPOF)** is any one component whose failure takes down the whole system. High availability design is largely about systematically finding and eliminating SPOFs by adding redundancy:

\`\`\`text
Low availability                    High availability
+-----------------+                 +----------------------------+
| 1 web server     |                 | 2+ web servers, 2+ AZs,      |
| 1 database       |    --------->   | behind a load balancer        |
| 1 availability   |                 | 1 primary DB + standby replica|
| zone             |                 | in a different AZ             |
+-----------------+                 +----------------------------+
\`\`\`

## Fault tolerance vs. high availability

These terms are related but distinct:

- **High availability** — the system stays *up and reachable* through failures, possibly with a brief interruption during failover
- **Fault tolerance** — the system continues operating with *no interruption at all*, even during a failure — a stronger (and more expensive) guarantee than HA typically provides

Most real-world systems aim for high availability rather than full fault tolerance, because true zero-interruption fault tolerance is dramatically more expensive to build and often unnecessary for the business requirement at hand.

## A practical HA checklist

- Run at least two instances of anything critical, in at least two different availability zones
- Put a load balancer with health checks in front of any horizontally-scaled tier
- Use a managed database with a standby replica in a different availability zone, with automatic failover enabled
- Avoid manual, human-triggered failover steps wherever possible — a human paged at 3 a.m. is a slower failover mechanism than automation

## Real-world example

An online banking application runs its web tier across three availability zones with auto-scaling and a load balancer, and its database with a synchronous standby replica in a second availability zone with automatic failover. If one entire availability zone experiences a power outage, the load balancer stops routing to the now-unreachable web servers in that zone, and if the primary database happened to be in that zone, the standby in another zone is automatically promoted — users may notice a brief slowdown during failover, but the application as a whole stays available.

## Common mistake

Confusing "we use a cloud provider" with "we are highly available." Simply running on cloud infrastructure does not make an application highly available by default — a single VM in a single availability zone, even one hosted by a top-tier cloud provider, is still a single point of failure. High availability has to be deliberately designed into the architecture; it's not an automatic property of being "in the cloud."
`,
        },
        {
          slug: "disaster-recovery-basics",
          title: "Disaster Recovery Basics",
          estimatedMinutes: 9,
          content: `# Disaster Recovery Basics

High availability handles routine failures — a failed disk, a crashed server, one bad availability zone. **Disaster recovery (DR)** deals with much larger-scale, rarer events — an entire region becoming unavailable, catastrophic data corruption, or a large-scale security incident — and how an organization recovers from them.

## The two key metrics: RPO and RTO

Disaster recovery planning centers on two measurements, and getting familiar with these two terms and their difference is essential:

- **RPO (Recovery Point Objective)** — how much data you can afford to lose, measured in time. An RPO of 1 hour means that after a disaster, you should never lose more than the last hour's worth of data (implying you need backups or replication at least that frequent).
- **RTO (Recovery Time Objective)** — how long you can afford to be down before service is restored. An RTO of 4 hours means the business can tolerate up to 4 hours of downtime before the impact becomes unacceptable.

\`\`\`text
Timeline:  ---backup---backup---backup---[DISASTER]----[recovery complete]
                                    <---RPO--->    <-------RTO------->
                              (data lost           (time to restore
                               since last backup)    service)
\`\`\`

Different systems justify different RPO/RTO targets — a marketing blog might tolerate an RPO of a day and an RTO of several hours, while a payments system might require an RPO of seconds and an RTO of minutes. Lower RPO/RTO targets cost more to achieve, so these numbers should be set deliberately based on real business impact, not maximized by default.

## Common DR strategies, from cheapest to most expensive

- **Backup and restore** — regularly back up data (and infrastructure configuration); in a disaster, provision new infrastructure and restore from backup. Cheapest, but usually the highest RTO (could be hours or days) since infrastructure has to be rebuilt from scratch.
- **Pilot light** — keep a minimal version of the core infrastructure (e.g., a small database replica) running in a second region at all times, ready to be scaled up quickly if the primary region fails. Faster recovery than backup-and-restore, moderate ongoing cost.
- **Warm standby** — run a scaled-down but fully functional copy of the environment in a second region continuously; scale it up to full capacity during a disaster. Faster still, higher ongoing cost.
- **Multi-site active/active** — run full production capacity in two (or more) regions simultaneously, actively serving traffic from both, with a global load balancer routing between them. Fastest possible recovery (often seconds), highest ongoing cost since you're paying for full duplicate capacity all the time.

\`\`\`text
Cost/complexity  ----------------------------------------->
Backup&Restore | Pilot Light | Warm Standby | Multi-site Active/Active
Recovery speed  ----------------------------------------->
Slowest (hrs/days)                                Fastest (seconds)
\`\`\`

## Disaster recovery is not the same as high availability

A common point of confusion: multiple availability zones within one region protect against a data-center-level failure, but they generally do NOT protect against a regional-scale disaster (a natural disaster affecting an entire geographic area, or certain widescale outages). True disaster recovery typically requires a second, geographically distant region.

## Real-world example

A retail company's core order-processing system uses a warm standby DR strategy: a scaled-down copy of the entire application and database runs continuously in a second, distant region, kept roughly in sync via ongoing data replication. If the primary region becomes unavailable, the team (or an automated process) redirects traffic to the standby region and scales it up to full capacity — recovering in well under an hour, at the ongoing cost of running that smaller standby environment continuously.

## Common mistake

Treating "we take backups" as equivalent to "we have a disaster recovery plan." Backups alone address data loss, but a real DR plan also needs a tested process for actually standing up new infrastructure, restoring data into it, and redirecting traffic — and that process should be tested periodically, not assumed to work the first time it's actually needed during a real disaster.
`,
        },
        {
          slug: "iam-fundamentals",
          title: "IAM Fundamentals",
          estimatedMinutes: 9,
          content: `# IAM Fundamentals

**Identity and Access Management (IAM)** is how a cloud platform controls who (or what) can do what to which resources. It's one of the most important security fundamentals in all of cloud computing, because a huge share of real-world cloud security incidents trace back to overly broad or misconfigured access, not to the provider's infrastructure being breached.

## The core building blocks

- **Identity** — a representation of a person or a system that needs to act on cloud resources. This includes human users, but also *non-human* identities: an application or service that needs to call another cloud service (for example, a web server that needs to read from a storage bucket) is typically also given its own identity, distinct from any human's.
- **Permissions/policies** — explicit statements of what actions an identity is allowed (or explicitly denied) to take on which specific resources.
- **Roles** — a named, reusable bundle of permissions that can be attached to an identity, rather than assigning individual permissions one at a time to every user.

\`\`\`json
{
  "effect": "Allow",
  "actions": ["storage:GetObject", "storage:PutObject"],
  "resource": "bucket/my-app-uploads/*"
}
\`\`\`

This example policy allows reading and writing objects, but only inside one specific bucket — not full administrative access to the whole storage service, and not access to any other bucket.

## The principle of least privilege

The single most important IAM concept is the **principle of least privilege**: every identity should be granted only the specific permissions it actually needs to do its job — nothing more. This limits the damage if that identity's credentials are ever compromised, or if a bug in the application accidentally performs an unintended action.

\`\`\`text
Overly broad (bad):        Least privilege (good):
"Allow *:* on *"            "Allow storage:GetObject
(full admin access           on bucket/my-app-uploads/* only"
to everything)
\`\`\`

## Role-based access control (RBAC)

Rather than assigning permissions to each individual user one by one, most organizations use **role-based access control**: define roles like "read-only viewer," "developer," or "database administrator," each bundling an appropriate set of permissions, and assign users to the role(s) that match their job function. When someone changes teams or leaves, you change or remove their role assignment rather than untangling a custom, one-off set of permissions.

## Multi-factor authentication (MFA)

Beyond permissions, IAM systems also control *authentication* — verifying that a user really is who they claim to be. **Multi-factor authentication (MFA)** requires a second proof of identity beyond just a password (a code from an authenticator app, a hardware security key, a biometric check), making it far harder for an attacker who has stolen or guessed a password alone to gain access. MFA is considered a baseline security practice, especially for any account with administrative privileges.

## Real-world example

A data-processing application needs to read files from one storage bucket and write results to another. Rather than giving the application's identity broad administrative access "to keep things simple," the team creates a role granting only read access to the input bucket and only write access to the output bucket. Months later, a bug in the application is discovered that could have allowed unintended actions — but because the application's identity never had permission to do anything beyond those two narrow actions, the actual blast radius of the bug was tightly limited by the least-privilege configuration already in place.

## Common mistake

Granting broad, "just in case" permissions (like full administrative access) to save time during initial setup, intending to "tighten it up later." In practice, this tightening rarely happens, and overly broad permissions sit unused and unnoticed until they become the exact pathway an attacker or a bug exploits. Starting with narrow permissions and adding more only as specifically needed is far safer than starting broad and hoping to narrow it down later.
`,
        },
        {
          slug: "encryption-at-rest-and-in-transit",
          title: "Encryption at Rest and In Transit",
          estimatedMinutes: 8,
          content: `# Encryption at Rest and In Transit

Encryption protects data by making it unreadable without the correct decryption key. In cloud computing, it's standard practice to think about encryption in two distinct states: data that's stored somewhere (**at rest**), and data that's moving across a network (**in transit**).

## Encryption at rest

**Encryption at rest** protects data while it's sitting in storage — on a disk, in a database, in an object storage bucket. If someone gained unauthorized physical or logical access to the underlying storage media, encrypted data would appear as meaningless ciphertext without the decryption key.

\`\`\`bash
cloudctl storage create-bucket \\
  --name customer-records \\
  --encryption enabled \\
  --kms-key my-encryption-key
\`\`\`

Most cloud providers offer encryption at rest as a default, or a one-line configuration option, for object storage, block storage, and managed databases. The encryption/decryption itself typically happens transparently — your application reads and writes data normally, and the storage layer handles encrypting it before writing to physical media and decrypting it when reading back out.

## Encryption in transit

**Encryption in transit** protects data while it's moving across a network — between a user's browser and a web server, or between two internal services. This is what HTTPS (HTTP over TLS) provides for web traffic: without it, data sent over a network could potentially be intercepted and read by anyone able to observe that network traffic (a coffee shop Wi-Fi network, a compromised router along the path, and so on).

\`\`\`text
Without TLS:  Browser ---(plain text)---> Server   <- readable if intercepted
With TLS:     Browser ---(encrypted)-----> Server   <- unreadable if intercepted
\`\`\`

Encryption in transit isn't limited to the connection between an end user and a public-facing application — it's also good practice for internal traffic between services inside your own cloud network, since an attacker who gains a foothold inside your network shouldn't automatically be able to read all internal traffic in plain text either.

## Key management

Encryption is only as strong as the protection of the encryption keys themselves. Cloud providers offer **key management services** that let you create, rotate, and control access to the encryption keys used to protect your data — separate from the data itself. Controlling who can access a key is just as important as controlling who can access the encrypted data, since anyone with both the encrypted data and the key can read it.

\`\`\`text
Encrypted data (in storage) + Encryption key (in key management service)
        |                              |
        +------------- both needed ----+
                       |
                       v
                Readable plaintext
\`\`\`

## Real-world example

A healthcare application stores patient records in a managed database with encryption at rest enabled by default, and all traffic between the application's web servers and users' browsers is served exclusively over HTTPS (encryption in transit). If a storage disk were ever physically removed and stolen, or if network traffic were intercepted at any point, the data would be unreadable without the corresponding encryption keys — which are themselves access-controlled through the platform's key management service, following the same least-privilege IAM principles from the previous lesson.

## Common mistake

Assuming that enabling encryption at rest alone is "enough" security. Encryption at rest protects against someone gaining access to the raw underlying storage media — it does nothing to stop someone who has legitimate (or compromised) application-level access from reading data through the normal application interface. Encryption is one important layer of a broader security posture that also includes IAM, network controls, and monitoring — not a substitute for any of them.
`,
        },
      ],
    },
    {
      title: "Cloud Migration Strategies",
      lessons: [
        {
          slug: "the-six-rs-of-migration",
          title: "The Six R's of Cloud Migration",
          estimatedMinutes: 9,
          content: `# The Six R's of Cloud Migration

Very few organizations build every system cloud-native from a blank slate — most cloud journeys involve migrating existing, already-running applications from on-premises infrastructure (or from one cloud to another). Not every application should be migrated the same way, and cloud providers commonly describe the options using a framework of six strategies, often called the "six R's."

## The six strategies

- **Rehost ("lift and shift")** — move an application to cloud infrastructure with minimal changes, typically just moving a VM's disk image onto a cloud VM of similar size. Fastest and lowest-risk migration path, but captures the least benefit — as this course noted early on, a lifted-and-shifted application running 24/7 on fixed-size VMs doesn't automatically gain elasticity or cost benefits.
- **Replatform ("lift, tinker, and shift")** — move to the cloud with small, targeted optimizations, without changing the application's core architecture — for example, moving a self-managed database to a managed database service, while leaving the application code itself unchanged.
- **Repurchase** — replace an existing application entirely with a SaaS product that does the same job (for example, replacing a self-hosted email server with a hosted email SaaS product) rather than migrating the old system at all.
- **Refactor / re-architect** — substantially redesign the application to take advantage of cloud-native capabilities — breaking a monolith into microservices, adopting auto-scaling and managed services throughout. Highest effort and risk, but captures the most long-term benefit.
- **Retire** — discover, during the migration assessment, that an application is no longer actually needed, and simply decommission it instead of migrating it at all.
- **Retain** — deliberately choose to keep certain applications on-premises for now (often due to compliance, latency, or hardware dependencies), migrating everything else — a very common outcome given the hybrid cloud patterns covered earlier in this course.

\`\`\`text
Effort/risk to migrate  -------------------------------------------->
Retire | Retain | Rehost | Repurchase | Replatform | Refactor
Cloud-native benefit gained  ------------------------------------->
Lowest                                                        Highest
\`\`\`

## Choosing a strategy per application, not per organization

A critical point: an organization migrating dozens or hundreds of applications virtually always applies *different* R's to different applications, based on each application's specific value, complexity, and urgency — not one single strategy across the board.

\`\`\`text
Legacy internal tool used by 3 people      --> Retire
Self-hosted email server                   --> Repurchase (move to SaaS)
Stable but complex application with a      --> Rehost now (fast), consider
tight deadline to exit an old data center      Refactor later once time allows
Core, high-value application worth         --> Refactor directly, to capture
long-term investment                            the full cloud-native benefit
\`\`\`

## Real-world example

A company closing its own data center within six months has 40 applications to move. It retires 8 unused or redundant ones outright, repurchases SaaS replacements for 5 commodity tools (like internal wikis and email), rehosts 20 stable-but-lower-priority applications as-is to hit the deadline safely, replatforms 5 applications by moving their databases to managed services with minimal other changes, and commits to refactoring its 2 highest-value, most business-critical applications into cloud-native architectures over the following year, since those justify the larger investment.

## Common mistake

Treating "migrate to the cloud" as a single, uniform project with one strategy applied to everything. Different applications have wildly different value, complexity, and urgency — forcing all of them through the same strategy (most commonly, rehosting everything without ever revisiting it) leaves most of the cloud's actual benefits (elasticity, managed services, cost optimization) permanently uncaptured for applications that would have justified the extra migration effort.
`,
        },
        {
          slug: "planning-a-cloud-migration",
          title: "Planning a Cloud Migration",
          estimatedMinutes: 8,
          content: `# Planning a Cloud Migration

Choosing a migration strategy per application (the previous lesson) is only useful within a broader, deliberate migration plan. Rushing straight into moving workloads without first understanding what you actually have is one of the most common causes of migrations running over budget, over time, or leaving critical gaps.

## A typical migration phases

\`\`\`text
1. Assess     --> Inventory existing applications, dependencies, and data
2. Plan       --> Choose a strategy (one of the six R's) per application,
                   sequence the work, and set success criteria
3. Migrate    --> Actually move/rebuild applications, in planned phases
4. Optimize   --> After moving, right-size, apply the cost and reliability
                   practices from earlier in this course
\`\`\`

## The assessment phase matters most

Migrations run into trouble most often because the assessment phase was rushed or skipped. Assessment should answer:

- **What applications exist, and what do they depend on?** Applications rarely stand alone — an application that looks simple to migrate might depend on a database, a file share, and an authentication system that also need to move (or be replaced) at the same time.
- **What data do these applications hold, and are there compliance or data-residency requirements** (echoing the regions lesson from earlier in this course) that constrain where that data can legally live?
- **Which applications are actually still used?** It's common to discover applications nobody remembers the purpose of — prime candidates for the "retire" strategy from the previous lesson.

## Migration sequencing

Rarely does an organization migrate everything at once. A common, lower-risk sequencing approach:

\`\`\`text
1. Migrate low-risk, low-complexity applications first
     --> builds team experience and confidence with real (not just
         theoretical) cloud migration work
2. Migrate applications with fewer dependencies before
   highly interconnected ones
     --> reduces the chance of unexpected cross-application breakage
3. Save the most complex, highest-value, or most tightly coupled
   applications for later
     --> by then, the team has real migration experience and can
         apply lessons learned from earlier phases
\`\`\`

## Common migration pitfalls

- **Underestimating dependencies** — discovering, mid-migration, that a "simple" application actually depends on an on-prem system that wasn't in scope
- **Ignoring data gravity** — data is often expensive and slow to move (large databases, huge file shares); the cost and time of moving the data itself is sometimes bigger than moving the application logic
- **No rollback plan** — migrating without a tested way to revert to the original system if something goes wrong during cutover
- **Treating migration as "done" at cutover** — skipping the optimize phase, leaving newly migrated workloads running inefficiently (oversized instances, no auto-scaling, no cost tagging) exactly as this course's cost-management lessons warn against

## Real-world example

Before migrating anything, a healthcare organization runs a thorough assessment and discovers that an application it planned to rehost quickly actually shares a database with two other applications nobody had scoped for migration in that phase — and that the underlying data is subject to a regulation requiring it to remain within a specific country's borders. Because this was caught during assessment rather than mid-migration, the team adjusts its plan to migrate all three dependent applications together, into a region that satisfies the data-residency requirement, avoiding a much more expensive and disruptive discovery partway through the actual cutover.

## Common mistake

Starting to migrate before finishing a real assessment, because assessment work feels like it's "not real progress" compared to actually moving something. In practice, time spent thoroughly mapping dependencies, data requirements, and actual usage before migrating is what prevents the far more expensive problem of a migration stalling or failing midway through because of a dependency nobody had accounted for.
`,
        },
      ],
    },
    {
      title: "Governance, Compliance, and the Well-Architected Framework",
      lessons: [
        {
          slug: "cloud-governance-fundamentals",
          title: "Cloud Governance Fundamentals",
          estimatedMinutes: 8,
          content: `# Cloud Governance Fundamentals

As an organization's cloud footprint grows beyond a handful of resources managed by one small team, a new problem appears: how do you make sure hundreds or thousands of resources, created by many different teams, stay consistent with organizational rules — without personally reviewing every single one? **Cloud governance** is the set of practices and tools for enforcing organization-wide rules automatically, at scale.

## Organizing accounts and resources hierarchically

Most cloud providers let you organize resources into a hierarchy, rather than one flat pool — commonly something like: an overall organization, containing multiple accounts or subscriptions (often one per team, project, or environment), each containing individual resources.

\`\`\`text
Organization
+------------------------------------------------------+
|  Account: Production      Account: Staging      Account: Sandbox |
|  (strict controls)        (moderate controls)   (loose controls) |
+------------------------------------------------------+
\`\`\`

This hierarchy lets an organization apply different rules to different parts of itself — production accounts might enforce strict rules (mandatory encryption, no public storage buckets), while a sandbox account used for experimentation applies much lighter rules, without either group interfering with the other.

## Policies: automatically enforced rules

A **policy** is a rule that's automatically checked (and sometimes automatically enforced or blocked) across some or all of an organization's resources, rather than relying on every engineer remembering and following a written guideline manually.

\`\`\`yaml
policy:
  name: require-encryption-at-rest
  applies_to: all storage buckets in Production account
  effect: deny creation if encryption is not enabled
\`\`\`

A policy like this one makes it *structurally impossible* to create an unencrypted storage bucket in the production account — rather than depending on every engineer remembering the encryption-at-rest guidance from earlier in this course every single time.

## Governance and tagging, together

The resource tagging practice from the cost-management lessons earlier in this course is itself a governance concern at scale: a policy can require that every resource include specific tags (like \`team\` and \`environment\`) before it's even allowed to be created, ensuring the cost-attribution and accountability benefits of tagging aren't left to individual discipline.

\`\`\`yaml
policy:
  name: require-cost-tags
  applies_to: all resources
  effect: deny creation if "team" or "environment" tag is missing
\`\`\`

## Real-world example

A large company with over 200 engineers across a dozen teams previously relied on a written internal wiki page telling engineers to "always enable encryption and always tag resources with team and environment" — compliance was inconsistent, because it depended entirely on individuals remembering and following documentation. After adopting organization-wide policies that automatically block the creation of unencrypted storage or untagged resources, both encryption coverage and tagging completeness reach effectively 100%, because the rules are now enforced structurally rather than requested politely.

## Common mistake

Relying on documentation and training alone to enforce important organizational rules at any meaningful scale. Written guidelines are useful for explaining *why* a rule exists, but they don't scale to hundreds of engineers and thousands of resources the way an automatically enforced policy does — the difference between "please remember to do this" and "the system will not let you create this resource unless you do."
`,
        },
        {
          slug: "compliance-and-regulatory-frameworks",
          title: "Compliance and Regulatory Frameworks",
          estimatedMinutes: 8,
          content: `# Compliance and Regulatory Frameworks

Governance (the previous lesson) is largely about an organization enforcing its *own* rules. **Compliance** is closely related but distinct: it's about meeting requirements set by external laws, regulations, or industry standards — and cloud providers play a specific, bounded role in helping customers achieve it.

## Common compliance frameworks you'll encounter

- **GDPR (General Data Protection Regulation)** — an EU regulation governing how personal data of EU residents is collected, stored, and processed, including strict rules about where that data may be stored and transferred
- **HIPAA (Health Insurance Portability and Accountability Act)** — a US regulation governing the privacy and security of health information
- **PCI DSS (Payment Card Industry Data Security Standard)** — a standard governing how payment card data must be handled and secured
- **SOC 2** — an auditing standard focused on how a service organization manages data security, availability, and confidentiality

You don't need to memorize the specifics of each — what matters is recognizing that different industries and regions impose different, legally binding requirements on how data must be handled, and that "moving to the cloud" doesn't make any of these requirements go away.

## The shared responsibility model, applied to compliance

This connects directly back to the shared responsibility model from earlier in this course: cloud providers typically obtain independent certifications showing that their *own* infrastructure (data centers, physical security, the underlying platform) meets various compliance standards — but using a compliant provider does not automatically make *your application* compliant.

\`\`\`text
Provider's responsibility:              Customer's responsibility:
"Our data centers and platform          "We configured our application,
 are independently certified             data handling, and access controls
 compliant with HIPAA/PCI DSS/etc."      correctly, on top of that platform"
\`\`\`

For example, a provider being certified compliant with a payment-card standard doesn't mean an application built on that provider automatically handles cardholder data correctly — the application still has to be built and configured to meet the specific requirements (encryption, access logging, data retention limits) that standard demands.

## Data residency, revisited

The regions lesson from earlier in this course mentioned data residency in passing; compliance is usually the actual reason those requirements exist. A regulation might require that certain categories of data (health records, financial records, personal data of citizens of a specific country) never leave that country's borders — which directly constrains which regions an application handling that data is allowed to use, and sometimes even which specific storage or database services are approved for that data.

## Real-world example

A healthcare startup builds its patient-records application on a cloud provider that holds HIPAA-eligible certifications for its infrastructure. That certification alone doesn't make the startup's application HIPAA-compliant — the startup still has to configure encryption at rest and in transit correctly, apply least-privilege IAM policies to anyone who can access patient data, enable detailed access logging, and sign a specific data-handling agreement with the provider covering health information, before the *application* (not just the underlying infrastructure) can be considered compliant.

## Common mistake

Assuming "our cloud provider is HIPAA/PCI/SOC 2 compliant" is equivalent to "our application is compliant." This is one of the most common and consequential compliance misunderstandings, and it's a direct extension of the shared responsibility model from earlier in this course: the provider's compliance certifications cover their side of the line (the infrastructure), not your side (how you configure and use it).
`,
        },
        {
          slug: "the-well-architected-framework",
          title: "The Well-Architected Framework",
          estimatedMinutes: 9,
          content: `# The Well-Architected Framework

Throughout this course, you've learned dozens of individual concepts — availability zones, auto-scaling, IAM, encryption, cost tagging, and many more. Every major cloud provider organizes advice like this into a **Well-Architected Framework**: a small set of named pillars used to evaluate whether a given architecture is actually well designed, rather than just "working."

## The six pillars

- **Operational excellence** — can you run and monitor the system effectively, and improve your processes over time? (This maps directly to the CI/CD and observability practices covered earlier in this course.)
- **Security** — is access tightly controlled, is data protected, and are you prepared to detect and respond to incidents? (Shared responsibility, IAM, encryption.)
- **Reliability** — does the system recover from failure and meet its availability goals? (Availability zones, load balancing, disaster recovery.)
- **Performance efficiency** — are you using the right resources, sized correctly, for the workload? (Choosing the right compute and storage options for the access pattern.)
- **Cost optimization** — are you avoiding waste, and paying for only what you need? (Right-sizing, storage tiering, commitment discounts.)
- **Sustainability** — are you minimizing the environmental impact of the resources you consume — for example, by avoiding over-provisioned, idle capacity, and considering the energy efficiency of your architectural choices?

\`\`\`text
        Operational   Security   Reliability   Performance   Cost      Sustainability
        Excellence                              Efficiency    Optimization
           |             |            |              |          |            |
           +-------------+------------+--------------+----------+------------+
                                       |
                          A "well-architected" system
\`\`\`

## Why frame it as pillars rather than one big checklist

The pillars matter because they're frequently in tension with each other, and the framework's real value is making you consciously choose trade-offs rather than optimizing one pillar blindly at the expense of the others.

\`\`\`text
Example tensions:
Reliability (run in 3 regions, always)  vs.  Cost optimization (that's expensive)
Performance (largest instance available) vs. Cost optimization (right-sizing)
Security (strict, slow approval process)  vs. Operational excellence (fast changes)
\`\`\`

There's rarely a single "correct" answer across all six pillars simultaneously — a payments system will justifiably weight reliability and security far more heavily than cost optimization; an internal analytics dashboard used by ten employees might justifiably prioritize cost optimization far more heavily than five-nines reliability.

## Using the framework in practice

Providers typically offer a structured set of review questions per pillar (e.g., under Reliability: "How do you back up data?", "How do you withstand component failures?") that teams can walk through periodically for a given architecture, identifying specific gaps rather than relying on a vague sense that things are "probably fine."

\`\`\`text
Review question (Reliability pillar): "How do you withstand
  component failures?"
Gap found: "Our database has no standby replica in another
  availability zone."
Action: add a multi-AZ standby, as covered earlier in this course.
\`\`\`

## Real-world example

A team reviewing their checkout service against the framework realizes their architecture scores well on performance efficiency and cost optimization (right-sized instances, appropriate storage tiers) but poorly on reliability (a single-AZ database with no standby) and security (an overly broad IAM role left over from initial development). The review doesn't just say "this is bad" — it gives the team a structured, pillar-by-pillar way to prioritize which specific gaps to close first, based on which pillar matters most for a customer-facing checkout flow.

## Real-world example, continued: the capstone connection

Notice that every pillar maps directly onto a specific module you've already completed in this course — that's not a coincidence. The Well-Architected Framework isn't a new set of concepts to learn; it's a lens for organizing everything you've already learned into six named categories, so you can evaluate any architecture — including the one built in this course's capstone lesson — systematically rather than just intuitively.

## Common mistake

Optimizing heavily for just one pillar (most commonly cost, or performance) while never explicitly considering the others. A system can be extremely cheap and still be dangerously unreliable, or extremely fast and still be riddled with security gaps. The framework's actual purpose is forcing an explicit, deliberate trade-off across all six pillars for your specific application's needs — not maximizing any single one in isolation.
`,
        },
      ],
    },
    {
      title: "Cost Management and Capstone Design",
      lessons: [
        {
          slug: "understanding-cloud-pricing-models",
          title: "Understanding Cloud Pricing Models",
          estimatedMinutes: 8,
          content: `# Understanding Cloud Pricing Models

Cloud pricing looks simple at first glance ("pay for what you use") but in practice involves several distinct pricing dimensions and commitment models. Understanding these is essential to reading a cloud bill and to designing systems that don't accidentally cost far more than expected.

## The core pricing dimensions

Almost every cloud bill is made up of some combination of:

- **Compute time** — charged per second, minute, or hour a VM, container, or serverless function runs
- **Storage** — charged per gigabyte stored per month, often varying by storage tier/class
- **Data transfer ("egress")** — charged per gigabyte of data leaving the provider's network (data coming *in* is often free; data going *out*, especially to the public internet, is usually the metered direction)
- **Requests/operations** — some services (especially serverless and managed databases) charge per API call, per request, or per read/write operation, in addition to or instead of pure time-based charges

\`\`\`text
Typical monthly bill breakdown:
  Compute (VMs/containers/functions) .... $X
  Storage (object + block + database) ... $Y
  Data transfer out to the internet ..... $Z
  ------------------------------------------
  Total ................................. $X+Y+Z
\`\`\`

## Commitment-based discounts

Providers typically offer significant discounts in exchange for committing to usage in advance:

- **On-demand** — no commitment, pay the standard rate, maximum flexibility
- **Reserved / committed use** — commit to a certain amount of usage over a period (e.g., 1 or 3 years) in exchange for a substantial discount (often 30-60%+) versus on-demand rates
- **Spot / preemptible** — bid on the provider's spare, unused capacity at steep discounts (sometimes 70-90% off on-demand), with the trade-off that the provider can reclaim that capacity with little warning — appropriate only for fault-tolerant, interruptible workloads

\`\`\`text
Discount vs. flexibility trade-off:
On-demand -------- Reserved/Committed -------- Spot
(most flexible,     (moderate discount,          (biggest discount,
 most expensive)     requires forecasting)         can be reclaimed)
\`\`\`

## Free tiers

Most providers offer a **free tier** — a limited amount of usage per month that's free, intended for learning, experimentation, and very small workloads. Free tiers are a useful, genuinely no-cost way to practice the concepts in this course hands-on, but it's important to understand their limits (they're usually capped at a specific, modest amount of usage per service, per month) to avoid an unexpected bill once you exceed them.

## Real-world example

A company running a steady, predictable baseline of web servers commits to a 1-year reserved pricing plan for that baseline capacity (locking in a discount, since they know they'll need at least that much capacity all year), while using on-demand pricing for additional servers that only get added during unpredictable traffic spikes, and spot pricing for a nightly batch-processing job that can tolerate being interrupted and simply retried later if its instances happen to get reclaimed.

## Common mistake

Assuming "reserved" or "committed" pricing is always better because it's cheaper per unit. A reserved commitment is only a good deal if you actually use that committed capacity — committing to more capacity than you end up needing can cost more than simply paying on-demand rates for your actual, lower usage. Reserved pricing works best for well-understood, stable baseline workloads, not for capacity you're still guessing about.
`,
        },
        {
          slug: "cost-management-and-optimization-tools",
          title: "Cost Management and Optimization Tools",
          estimatedMinutes: 8,
          content: `# Cost Management and Optimization Tools

Understanding pricing models is the first step; actually managing and optimizing cost on an ongoing basis requires visibility tools and disciplined habits. Every major cloud provider offers a similar set of cost-management capabilities, built around a few common ideas.

## Cost visibility tools

- **Pricing calculators** — let you estimate the cost of a proposed architecture before you build it, by specifying instance types, storage amounts, and expected traffic
- **Cost/billing dashboards** — show actual historical spend, broken down by service, region, and time period, so you can see where money is actually going rather than guessing
- **Budgets and alerts** — let you set a spending threshold and get notified (or in some cases, automatically restrict further spending) when actual or forecasted cost approaches or exceeds that threshold

\`\`\`bash
cloudctl budget create \\
  --name monthly-cap \\
  --amount 2000 \\
  --alert-threshold 80%   # notify when spend reaches 80% of budget
\`\`\`

## Resource tagging

**Tags** (or labels) are key-value pairs attached to cloud resources — for example \`team: payments\`, \`environment: production\`, \`project: mobile-app\`. Tags don't change how a resource functions, but they make cost broken down and attributed accurately: instead of one lump total, you can see exactly how much the payments team's production resources cost versus the mobile app project's staging resources.

\`\`\`bash
cloudctl vm create --name api-01 --tag team=payments --tag environment=production
\`\`\`

Without consistent tagging, cost attribution across a large organization with many teams and projects becomes essentially guesswork.

## Common cost-optimization techniques

- **Right-sizing** — regularly reviewing whether running instances are actually using the CPU/memory they're provisioned with, and downsizing over-provisioned ones (a recurring theme from earlier lessons: it's easy to over-provision "just in case" and never revisit it)
- **Turning off unused resources** — development/test environments that only need to run during business hours can be scheduled to shut down overnight and on weekends, since paying for idle non-production capacity 24/7 is pure waste
- **Storage tiering** — moving infrequently accessed data to cheaper storage tiers, as covered in the storage lessons earlier in this course
- **Commitment discounts for stable baselines** — applying reserved/committed pricing to the portion of usage that's predictable and steady, while leaving genuinely variable usage on-demand

## Real-world example

A mid-sized company notices its monthly cloud bill has crept up 40% over six months. Using its billing dashboard broken down by tags, it discovers that a large share of the increase comes from development and staging environments — tagged \`environment: development\` and \`environment: staging\` — that were never shut down outside business hours and had been sized far larger than actually needed. Right-sizing those environments and scheduling them to stop overnight and on weekends recovers a substantial portion of the increase, without touching production at all.

## Common mistake

Treating cost management as a one-time setup task rather than an ongoing practice. Usage patterns, traffic, and team needs change constantly — an instance that was correctly sized six months ago may be significantly over- or under-provisioned today. Effective cost management means periodically revisiting tagging, budgets, and right-sizing, not configuring them once and assuming they'll remain optimal indefinitely.
`,
        },
        {
          slug: "capstone-designing-a-simple-cloud-architecture",
          title: "Capstone: Designing a Simple Cloud Architecture",
          estimatedMinutes: 12,
          content: `# Capstone: Designing a Simple Cloud Architecture

This final lesson brings together everything from the course into a single worked example: designing a simple, reasonably resilient, reasonably cost-aware architecture for a real application, and walking through the reasoning behind each decision.

## The scenario

You're designing the cloud architecture for a moderately trafficked web application: a public-facing site with a web/API tier, a relational database, and user-uploaded images, expected to have variable but not extreme traffic, with a normal (not five-nines) availability requirement.

## Step 1: Choose service models

- **Web/API tier** → PaaS or containers on managed compute, rather than raw IaaS — the team wants to focus on application features, not OS patching
- **Database** → a managed database service, not a self-hosted database on a VM — to get automated backups, patching, and failover without a dedicated database administrator
- **Uploaded images** → object storage, not block or file storage — large, infrequently modified files served over HTTP is exactly the object storage use case

## Step 2: Lay out the network

\`\`\`text
Virtual Network
+---------------------------------------------------------+
| Public subnet (AZ-1)        Public subnet (AZ-2)          |
|  [web/API instance]          [web/API instance]           |
|                                                             |
| Private subnet (AZ-1)       Private subnet (AZ-2)          |
|  [database primary]          [database standby replica]   |
+---------------------------------------------------------+
\`\`\`

The web/API tier sits in public subnets across two availability zones (so it's reachable from the internet and survives a single-zone failure). The database sits in private subnets across two availability zones — reachable only from the web/API tier, never directly from the internet — with a standby replica ready for automatic failover.

## Step 3: Add compute elasticity

Put the web/API instances in an auto-scaling group behind a load balancer, with a minimum of 2 instances (for baseline redundancy across the two availability zones) and a policy that scales out based on average CPU utilization or request count, with an appropriately longer cooldown on scaling in than scaling out.

\`\`\`text
Internet --> Load Balancer --> Auto-scaling group (min 2, across 2 AZs)
                                       |
                                       v
                              Managed database (primary + standby)
                                       |
                                       v
                              Object storage bucket (user images)
\`\`\`

## Step 4: Layer in security

- IAM roles for the web/API instances granting only the specific permissions needed (e.g., read/write to the one images bucket, connect to the one database) — not broad administrative access
- Encryption at rest enabled on the database and the object storage bucket
- HTTPS (encryption in transit) enforced between users and the load balancer, and between the web/API tier and the database
- Security groups restricting the database's private subnet to only accept traffic from the web/API tier's security group, nothing else

## Step 5: Plan for disaster recovery and cost

- Automated daily database backups with a retention window matching the business's acceptable RPO
- Object storage versioning enabled, so an accidentally deleted or overwritten image can be recovered
- Reserved/committed pricing applied to the two baseline web/API instances that will always be running, with on-demand pricing for any additional instances the auto-scaler adds during traffic spikes
- Tags applied consistently (\`environment: production\`, \`team: platform\`) so cost can be tracked and attributed accurately
- A budget alert configured to notify the team if monthly spend trends significantly above the expected baseline

## The complete picture

\`\`\`text
                         Internet
                            |
                      Load Balancer
                      (2+ AZs, HTTPS)
                            |
              Auto-scaling group (web/API, min 2, 2 AZs)
               |  IAM role: read/write images bucket,      |
               |  connect to database only                |
                    |                        |
                    v                        v
        Managed database (2 AZs)     Object storage bucket
        primary + standby,           (user-uploaded images,
        encryption at rest,          encryption at rest,
        automated backups            versioning enabled)
\`\`\`

## Why this matters

Notice that nothing in this design is exotic — every decision is a direct application of a single, specific concept from earlier in this course: service model choice, availability zones, auto-scaling, load balancing, managed databases, object storage, private subnets, IAM least privilege, encryption, disaster recovery planning, and cost tagging. Real-world cloud architecture, even at a fairly senior level, is very often exactly this: methodically applying a set of well-understood fundamentals to the specific shape of a given application, rather than inventing something novel each time.

## Mental model

Think of this capstone the way an architect thinks about a building: no single fundamental (a foundation, load-bearing walls, plumbing, electrical) is unique to any one building, but the way they're combined and sized for a specific site and purpose is what makes the design fit. Cloud architecture works the same way — the fundamentals from this course are your foundation, walls, and plumbing; how you combine them for your specific application is the actual design work.
`,
        },
      ],
      quiz: {
        title: "Tier 3 Checkpoint: Scaling, Reliability, Security, and Cost",
        questions: [
          {
            text: "A team scales their database by moving it to a larger instance size with more CPU and memory, rather than adding more database instances. What is this an example of?",
            optionA: "Horizontal scaling",
            optionB: "Vertical scaling",
            optionC: "Auto-scaling",
            optionD: "Load balancing",
            correctOption: "B",
          },
          {
            text: "Why does horizontal scaling generally require an application to be designed as 'stateless,' or to externalize its state?",
            optionA: "Because horizontal scaling always requires a larger single instance",
            optionB: "Because a user's requests may be routed to different instances that don't share local in-memory state",
            optionC: "Because stateless applications cannot use a load balancer",
            optionD: "Because horizontal scaling is only possible for databases",
            correctOption: "B",
          },
          {
            text: "In an auto-scaling configuration, why is the cooldown period for scaling in (removing instances) commonly set longer than the cooldown for scaling out (adding instances)?",
            optionA: "Removing instances is technically slower than adding them",
            optionB: "Being briefly overprovisioned is usually less costly than being underprovisioned and risking poor performance",
            optionC: "Scaling in requires manual approval by default",
            optionD: "There is no reason; the values are typically identical",
            correctOption: "B",
          },
          {
            text: "What capability does a Layer 7 load balancer have that a Layer 4 load balancer does not?",
            optionA: "The ability to distribute traffic across multiple servers",
            optionB: "The ability to perform health checks",
            optionC: "The ability to route requests based on HTTP-level details like URL path or headers",
            optionD: "The ability to encrypt traffic",
            correctOption: "C",
          },
          {
            text: "What is the key difference between high availability and full fault tolerance?",
            optionA: "High availability keeps a system reachable through failures, possibly with brief interruption, while fault tolerance aims for no interruption at all",
            optionB: "They are the same concept with different names",
            optionC: "Fault tolerance only applies to databases",
            optionD: "High availability requires a second geographic region, fault tolerance does not",
            correctOption: "A",
          },
          {
            text: "What does RTO (Recovery Time Objective) measure in a disaster recovery plan?",
            optionA: "How much data can be lost, measured in time",
            optionB: "How long the system can be down before service is restored",
            optionC: "How many availability zones a region has",
            optionD: "How much the disaster recovery plan costs per month",
            correctOption: "B",
          },
          {
            text: "Why does the principle of least privilege recommend granting an application's identity only the specific permissions it needs, rather than broad administrative access?",
            optionA: "Broad access is always technically impossible to configure",
            optionB: "It limits the potential damage if that identity's credentials are compromised or a bug causes unintended actions",
            optionC: "Least privilege is required only for human users, not applications",
            optionD: "It makes the application run faster",
            correctOption: "B",
          },
          {
            text: "What is the main difference between encryption at rest and encryption in transit?",
            optionA: "Encryption at rest protects data while stored; encryption in transit protects data while moving across a network",
            optionB: "Encryption in transit is only relevant for object storage",
            optionC: "Encryption at rest is applied only to data leaving the network",
            optionD: "There is no meaningful difference between the two",
            correctOption: "A",
          },
          {
            text: "A company commits to reserved/committed pricing for far more compute capacity than it ends up actually using. What is the likely cost outcome?",
            optionA: "It automatically saves more money than any other pricing model, regardless of usage",
            optionB: "It could end up costing more than simply paying on-demand rates for the actual, lower usage",
            optionC: "Reserved pricing has no relationship to actual usage",
            optionD: "The unused committed capacity is automatically refunded in full",
            correctOption: "B",
          },
          {
            text: "In the capstone architecture example, why is the database placed in a private subnet rather than a public one?",
            optionA: "Private subnets are required for encryption at rest to function",
            optionB: "So the database has no direct route to the internet and can only be reached from the web/API tier",
            optionC: "Public subnets do not support automated backups",
            optionD: "Private subnets are always cheaper than public subnets",
            correctOption: "B",
          },
        ],
      },
    },
  ],
};

export default content;
