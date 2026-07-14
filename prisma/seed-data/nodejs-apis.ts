import type { CourseContentSeed } from "./types";

const content: CourseContentSeed = {
  courseSlug: "nodejs-apis",
  courseTitle: "Node.js APIs",
  courseDescription:
    "Go from zero to building solid, production-ready REST APIs with Node.js and Express — servers, databases, authentication, security, testing, and the architecture that holds it all together.",
  modules: [
    {
      title: "Node.js & HTTP Fundamentals",
      lessons: [
        {
          slug: "what-is-nodejs",
          title: "What Is Node.js?",
          estimatedMinutes: 7,
          content: `# What Is Node.js?

**Node.js** is a runtime that lets you execute JavaScript outside a web browser — most commonly, on a server. Before Node existed (it shipped in 2009), JavaScript only ran inside browsers. Node took Chrome's V8 JavaScript engine and wrapped it with APIs for the things a server needs: reading files, talking to the network, and handling many connections at once.

This is why Node.js is the engine behind so many APIs: it's the same language you already use in the browser, but now it can listen for HTTP requests, query a database, and write to disk.

## The key idea: non-blocking I/O

Most server languages handle one request per thread. If a request is waiting on a slow database query, that thread just sits there blocked. Node.js instead runs on a **single main thread** with an **event loop**: when you kick off something slow (reading a file, querying a database, calling another API), Node doesn't wait around — it registers a callback and moves on to handle other requests. When the slow operation finishes, the event loop runs your callback.

\`\`\`js
const fs = require("fs");

console.log("1. Starting read");

fs.readFile("data.txt", "utf8", (err, contents) => {
  console.log("3. File contents:", contents);
});

console.log("2. This runs before the file is done reading");
\`\`\`

Running this logs \`1\`, then \`2\`, and only later \`3\` — even though \`readFile\` was called before the second \`console.log\`. Node didn't block waiting for the disk; it kept executing and came back to the callback once the file was ready.

## Why this matters for APIs

An API server spends most of its time waiting: waiting on a database, waiting on another service, waiting on the network. Node's non-blocking model means a single Node process can juggle thousands of in-flight requests without spinning up thousands of threads — which is exactly the workload a REST API has.

## Mental model

Think of Node as a single, very fast waiter at a restaurant who never stands idle at one table. They take your order, drop it off at the kitchen (the slow part), and immediately go take the next table's order — coming back to yours the moment the kitchen has your food ready.

Next, before writing any Node code, we'll look at the protocol every API speaks: HTTP.`,
        },
        {
          slug: "how-the-web-works",
          title: "How the Web Works: HTTP Basics",
          estimatedMinutes: 9,
          content: `# How the Web Works: HTTP Basics

Every API you build will communicate using **HTTP** (HyperText Transfer Protocol) — a request/response protocol. A client (a browser, a mobile app, another server) sends a **request**; your server sends back a **response**. Understanding this exchange is the foundation everything else builds on.

## Anatomy of a request

\`\`\`
GET /api/courses/42 HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer eyJhbGciOi...
\`\`\`

- **Method** — what kind of action (\`GET\`, \`POST\`, \`PUT\`, \`PATCH\`, \`DELETE\`)
- **Path** — which resource (\`/api/courses/42\`)
- **Headers** — metadata about the request (content type, auth token, accepted formats)
- **Body** — optional data, usually JSON, sent with \`POST\`/\`PUT\`/\`PATCH\`

## Anatomy of a response

\`\`\`
HTTP/1.1 200 OK
Content-Type: application/json

{ "id": 42, "title": "Node.js APIs" }
\`\`\`

- **Status code** — a 3-digit number summarizing the outcome
- **Headers** — metadata about the response
- **Body** — the actual data returned

## The status code families

| Range | Meaning | Examples |
|---|---|---|
| 2xx | Success | \`200 OK\`, \`201 Created\`, \`204 No Content\` |
| 3xx | Redirection | \`301 Moved Permanently\` |
| 4xx | Client made a mistake | \`400 Bad Request\`, \`401 Unauthorized\`, \`404 Not Found\` |
| 5xx | Server made a mistake | \`500 Internal Server Error\` |

## The common HTTP methods, and what they mean by convention

- \`GET\` — read data, no side effects, safe to repeat
- \`POST\` — create a new resource, or trigger an action
- \`PUT\` — replace a resource entirely
- \`PATCH\` — partially update a resource
- \`DELETE\` — remove a resource

## Common mistake

Returning \`200 OK\` for everything — including errors — with the actual problem buried in the JSON body. Clients (and monitoring tools) rely on the status code first. A failed request should almost always come back with a 4xx or 5xx status, not a 200 with \`{ "error": true }\` hidden inside.

Once you're fluent in requests and responses, Express becomes a lot easier to reason about — it's just a structured way to write handlers for these exchanges.`,
        },
        {
          slug: "the-nodejs-http-module",
          title: "The Built-in http Module",
          estimatedMinutes: 8,
          content: `# The Built-in http Module

Before reaching for a framework, it's worth seeing what Node gives you out of the box. Node ships with a core \`http\` module capable of handling real HTTP traffic with zero dependencies.

\`\`\`js
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/api/status" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
\`\`\`

## What's happening here

- \`http.createServer\` takes a callback that runs once per incoming request, with a request object (\`req\`) and a response object (\`res\`)
- You inspect \`req.url\` and \`req.method\` yourself to decide what to do
- You must manually set headers with \`writeHead\` and end the response with \`res.end\`
- There's no built-in routing, no body parsing, no middleware — you'd write all of that by hand

## Why frameworks exist

Notice how much manual work this took for a single route: checking the path, checking the method, setting headers, serializing JSON. A real API has dozens of routes, needs to parse JSON bodies, handle errors consistently, and apply cross-cutting concerns like logging and authentication. Doing all of that with raw \`http\` is possible but repetitive and error-prone.

That's precisely the gap **Express** fills — it's a thin layer on top of the \`http\` module that gives you routing, middleware, and convenient request/response helpers, without hiding how HTTP fundamentally works underneath.

## Try it yourself

Extend the example above with a second route, \`GET /api/time\`, that responds with \`{ "now": <current ISO timestamp> }\`. You'll quickly feel why hand-rolling routing doesn't scale past a couple of endpoints.`,
        },
      ],
    },
    {
      title: "Asynchronous JavaScript for APIs",
      lessons: [
        {
          slug: "callbacks-promises-async-await",
          title: "Callbacks, Promises, and Async/Await",
          estimatedMinutes: 9,
          content: `# Callbacks, Promises, and Async/Await

Node.js is built around asynchronous operations — reading a file, querying a database, calling another API. Over the years, JavaScript has used three different styles to express "do this, then do that once it finishes." Every Express handler in this course uses the newest of the three, but understanding all three helps you read code written at any point in the last decade — including a lot of code you'll encounter in the wild.

## Callbacks: the original style

A callback is a function passed as an argument, to be called once an operation completes:

\`\`\`js
const fs = require("fs");

fs.readFile("data.txt", "utf8", (err, contents) => {
  if (err) {
    console.error("Failed to read file:", err);
    return;
  }
  console.log(contents);
});
\`\`\`

This works, but nesting several dependent async operations produces deeply indented, hard-to-follow code often nicknamed "callback hell":

\`\`\`js
getUser(id, (err, user) => {
  getOrders(user.id, (err, orders) => {
    getInvoice(orders[0].id, (err, invoice) => {
      // three levels deep, and error handling repeated at every level
    });
  });
});
\`\`\`

## Promises: a value that arrives later

A **Promise** represents a value that isn't available yet, but will be — either successfully (**resolved**) or with a failure (**rejected**).

\`\`\`js
function readFilePromise(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", (err, contents) => {
      if (err) reject(err);
      else resolve(contents);
    });
  });
}

readFilePromise("data.txt")
  .then((contents) => console.log(contents))
  .catch((err) => console.error(err));
\`\`\`

Promises can be **chained** with \`.then()\`, which flattens what used to be nested callbacks into a sequential list — a real improvement, but still its own syntax to learn.

## Async/await: promises with synchronous-looking syntax

\`async\`/\`await\` is syntax sugar over promises. An \`async\` function always returns a promise, and \`await\` pauses execution *within that function* until the awaited promise settles — without blocking the rest of the application, since only that one function's execution is paused.

\`\`\`js
async function loadFileContents(path) {
  try {
    const contents = await readFilePromise(path);
    console.log(contents);
  } catch (err) {
    console.error(err);
  }
}
\`\`\`

This is exactly the pattern every Express route handler in this course uses:

\`\`\`js
router.get("/:id", async (req, res, next) => {
  try {
    const course = await prisma.course.findUnique({ where: { id: Number(req.params.id) } });
    res.json(course);
  } catch (error) {
    next(error);
  }
});
\`\`\`

## Why this course uses async/await throughout

Async/await reads top-to-bottom like ordinary synchronous code, which makes multi-step logic (validate, then query, then respond) far easier to follow than nested callbacks or long promise chains — even though, under the hood, it's all still the same non-blocking event loop from the first lesson of this course.

## Mental model

Think of \`await\` as a bookmark, not a stop sign. It pauses *this specific function* at that line until the awaited value is ready, but Node's event loop is free to go handle other requests in the meantime. Nothing about \`await\` blocks the server as a whole.

## Try it yourself

Take the callback-based \`readFilePromise\` example above and rewrite it as a native \`Promise\`-returning function using \`fs.promises.readFile\` (Node's built-in promise-based file API) instead of manually wrapping the callback version.`,
        },
        {
          slug: "parallel-async-operations",
          title: "Running Operations in Parallel with Promise.all",
          estimatedMinutes: 8,
          content: `# Running Operations in Parallel with Promise.all

\`await\` runs one operation at a time. But plenty of real work doesn't depend on itself — fetching a course and fetching the current user don't need to happen one after another. Awaiting them sequentially when they could run in parallel is a common, easy-to-miss performance mistake.

## The sequential (slower) version

\`\`\`js
async function getDashboardData(userId, courseId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });      // waits ~50ms
  const course = await prisma.course.findUnique({ where: { id: courseId } }); // then waits another ~50ms
  return { user, course };
}
\`\`\`

Even though \`user\` and \`course\` don't depend on each other, this code waits for the first query to fully finish before even starting the second — roughly 100ms total.

## The parallel (faster) version with Promise.all

\`\`\`js
async function getDashboardData(userId, courseId) {
  const [user, course] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.course.findUnique({ where: { id: courseId } }),
  ]);
  return { user, course };
}
\`\`\`

\`Promise.all\` starts both queries at (roughly) the same time and waits for both to finish — roughly 50ms total instead of 100ms, since the two independent queries overlap.

## When NOT to use Promise.all

If one operation depends on the result of another, you can't parallelize them — you genuinely need the first one's result before starting the second:

\`\`\`js
// Cannot be parallelized: we need the user before we know which orders to fetch
const user = await prisma.user.findUnique({ where: { id: userId } });
const orders = await prisma.order.findMany({ where: { userId: user.id } });
\`\`\`

## Handling partial failure with Promise.allSettled

\`Promise.all\` rejects as soon as *any* one of its promises rejects, even if the others would have succeeded. When you want the results of everything that succeeded, regardless of individual failures, use \`Promise.allSettled\` instead:

\`\`\`js
const results = await Promise.allSettled([
  fetchFromServiceA(),
  fetchFromServiceB(),
]);

for (const result of results) {
  if (result.status === "fulfilled") {
    console.log("Got:", result.value);
  } else {
    console.error("Failed:", result.reason);
  }
}
\`\`\`

This is especially useful when calling several independent third-party APIs and you'd rather show partial results than fail the entire request because one dependency was slow or down.

## Common mistake

Writing a \`for\` loop with \`await\` inside it when the iterations don't depend on each other:

\`\`\`js
// Slow: each iteration waits for the previous one to fully finish
for (const id of courseIds) {
  const course = await prisma.course.findUnique({ where: { id } });
  results.push(course);
}

// Faster: all lookups run concurrently
const results = await Promise.all(
  courseIds.map((id) => prisma.course.findUnique({ where: { id } }))
);
\`\`\`

## Try it yourself

Find a spot in your own code (or the CRUD examples from earlier in this course) where you \`await\` two independent queries back-to-back, and rewrite it using \`Promise.all\`.`,
        },
        {
          slug: "common-async-pitfalls",
          title: "Common Async Pitfalls",
          estimatedMinutes: 8,
          content: `# Common Async Pitfalls

Async/await looks simple, but a handful of mistakes account for the vast majority of real-world async bugs — including some of the trickiest bugs to track down in a running API, since they often only surface under load.

## Forgetting to await a promise

\`\`\`js
// Bug: missing await — this doesn't wait for the delete to finish
export async function deleteCourse(req, res) {
  prisma.course.delete({ where: { id: Number(req.params.id) } }); // not awaited!
  res.status(204).end(); // runs before the delete actually completes
}
\`\`\`

The response is sent before the database operation is guaranteed to have finished. Usually it "happens to work" in testing (the delete finishes fast enough), which makes this bug especially dangerous — it can pass casual testing and only misbehave under real production load or a slow connection.

## Unhandled promise rejections

An \`async\` function that throws, and is never awaited or \`.catch()\`'d, produces an **unhandled promise rejection**. In recent versions of Node, this can crash the entire process by default:

\`\`\`js
async function sendWelcomeEmail(user) {
  await emailService.send(user.email, "Welcome!"); // if this rejects...
}

sendWelcomeEmail(newUser); // ...and nobody is awaiting or catching it, the process may crash
\`\`\`

Always await async calls you care about, or explicitly handle rejection if you intentionally fire-and-forget:

\`\`\`js
sendWelcomeEmail(newUser).catch((err) => {
  logger.error({ err }, "Failed to send welcome email");
});
\`\`\`

## Mixing async code with array methods that don't await

\`.forEach()\` does not wait for async callbacks — it fires them all and moves on immediately, regardless of \`await\` inside:

\`\`\`js
// Bug: forEach does not wait, this function returns before any course is created
async function createCourses(coursesData) {
  coursesData.forEach(async (data) => {
    await prisma.course.create({ data }); // fires, but createCourses doesn't wait for it
  });
}
\`\`\`

Use \`Promise.all\` with \`.map()\` instead, when the operations can run concurrently:

\`\`\`js
async function createCourses(coursesData) {
  await Promise.all(coursesData.map((data) => prisma.course.create({ data })));
}
\`\`\`

## Swallowing errors silently

\`\`\`js
// Bug: the catch block hides every failure instead of handling it
try {
  await prisma.course.create({ data });
} catch (error) {
  // empty — the error vanishes, and the caller has no idea anything went wrong
}
\`\`\`

An empty (or merely logging) \`catch\` block that doesn't \`next(error)\`, rethrow, or otherwise surface the failure leaves the caller assuming success when the operation actually failed. At minimum, log it; usually, you also want to forward it to your centralized error handler or the caller.

## Mental model

Every async pitfall in this lesson boils down to the same root cause: some part of the code assumed an asynchronous operation had already finished, when it hadn't (or assumed a failure had been handled, when it was actually discarded). Whenever you write \`async\` code, ask: "does every promise I create get awaited, chained, or deliberately handled — and does every error get surfaced somewhere?"

## Common mistake

Adding \`async\` to a function "just in case," out of habit, without any \`await\` inside it. It's harmless but a signal to a reader that asynchronous work is happening somewhere in the function, when it might not be — keep \`async\` reserved for functions that actually await something.`,
        },
      ],
    },
    {
      title: "Building Your First Express Server",
      lessons: [
        {
          slug: "setting-up-express",
          title: "Setting Up Express",
          estimatedMinutes: 8,
          content: `# Setting Up Express

**Express** is the most widely used web framework for Node.js. It handles the plumbing of receiving HTTP requests and sending responses, so you can focus on your application's logic instead of parsing raw sockets.

## Creating a project

\`\`\`bash
mkdir my-api && cd my-api
npm init -y
npm install express
\`\`\`

This creates a \`package.json\` (your project's manifest) and installs Express into \`node_modules\`.

## Your first server

\`\`\`js
import express from "express";

const app = express();

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
\`\`\`

Run it with \`node server.js\` (or \`node --watch server.js\` to auto-restart on changes), then visit \`http://localhost:3000/api/hello\` — you'll see the JSON response.

## Breaking it down

- \`express()\` creates an application instance — this is the object you configure and eventually hand to \`listen\`
- \`app.get(path, handler)\` registers a route for GET requests matching \`path\`
- The handler receives \`req\` (the incoming request) and \`res\` (the tool you use to respond)
- \`res.json(...)\` serializes your object to JSON and sets the \`Content-Type: application/json\` header for you
- \`app.listen(port, callback)\` starts the server and binds it to a port

## A note on ES modules

To use \`import\` syntax (as above) instead of \`require\`, add \`"type": "module"\` to your \`package.json\`. Both styles work — this course uses ES module syntax throughout since it's the modern default for new Node projects.

## Try it yourself

Add a second route, \`GET /api/status\`, that returns \`{ status: "ok" }\`. Restart the server and confirm both routes respond correctly before moving on.`,
        },
        {
          slug: "routing-basics",
          title: "Routing Basics",
          estimatedMinutes: 9,
          content: `# Routing Basics

**Routing** determines how your application responds to a client request for a specific path and HTTP method. Express gives you one method per HTTP verb: \`app.get\`, \`app.post\`, \`app.put\`, \`app.patch\`, \`app.delete\`.

## Route parameters

Paths can include named parameters, prefixed with \`:\`, which Express extracts into \`req.params\`:

\`\`\`js
app.get("/api/courses/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, title: \`Course #\${id}\` });
});
\`\`\`

A request to \`/api/courses/42\` sets \`req.params.id\` to \`"42"\` (always a string — remember to convert it if you need a number).

## Query strings

Query parameters (the part after \`?\`) show up in \`req.query\`:

\`\`\`js
// GET /api/courses?category=backend&limit=10
app.get("/api/courses", (req, res) => {
  const { category, limit } = req.query;
  res.json({ category, limit });
});
\`\`\`

Route params identify *which* resource; query params typically filter, sort, or paginate a *collection* of resources.

## Matching by method, not just path

The same path can behave completely differently depending on the method:

\`\`\`js
app.get("/api/courses/:id", getCourse);
app.put("/api/courses/:id", replaceCourse);
app.delete("/api/courses/:id", deleteCourse);
\`\`\`

Express matches routes top-to-bottom in the order they're defined, and stops at the first match — so route order matters, especially with overlapping patterns.

## Common mistake

Defining a specific route *after* a broader one that also matches. For example, \`/api/courses/:id\` defined before \`/api/courses/featured\` will treat \`"featured"\` as an \`:id\` value, and the \`featured\` route will never be reached. Put more specific routes first.

## Try it yourself

Add a route \`GET /api/courses/featured\` above your \`GET /api/courses/:id\` route, and verify that hitting \`/api/courses/featured\` no longer gets swallowed by the \`:id\` route.`,
        },
        {
          slug: "request-and-response-objects",
          title: "The Request and Response Objects",
          estimatedMinutes: 9,
          content: `# The Request and Response Objects

Every route handler in Express receives the same two objects: \`req\` and \`res\`. Getting comfortable with what each one offers is most of what you need to build any endpoint.

## The request object (\`req\`)

\`\`\`js
app.post("/api/courses/:id/reviews", (req, res) => {
  console.log(req.params);  // route params, e.g. { id: "42" }
  console.log(req.query);   // query string, e.g. { verified: "true" }
  console.log(req.body);    // parsed request body (needs express.json())
  console.log(req.headers); // all request headers
  console.log(req.method);  // "POST"
  console.log(req.path);    // "/api/courses/42/reviews"
});
\`\`\`

\`req.body\` is empty (\`undefined\`) unless you've told Express how to parse the incoming body — that's what the \`express.json()\` middleware is for, which we'll cover shortly.

## The response object (\`res\`)

\`\`\`js
app.get("/api/courses/:id", (req, res) => {
  const course = findCourse(req.params.id);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  res.status(200).json(course);
});
\`\`\`

- \`res.status(code)\` sets the status code and returns \`res\`, so you can chain \`.json(...)\` after it
- \`res.json(data)\` serializes \`data\` to JSON, sets the content type, and ends the response
- \`res.send(data)\` is more generic — it can send strings, buffers, or objects (it calls \`res.json\` internally for objects)
- \`res.end()\` ends the response with no body at all — useful for \`204 No Content\`

## A crucial rule: respond exactly once

Every request must generate exactly one response. Calling \`res.json()\` twice for the same request throws an error ("Cannot set headers after they are sent"). This is why you'll see an early \`return\` before error responses — it stops the function from falling through to a second response later in the handler.

\`\`\`js
app.get("/api/courses/:id", (req, res) => {
  const course = findCourse(req.params.id);
  if (!course) {
    return res.status(404).json({ error: "Not found" }); // stops here
  }
  res.json(course); // only reached if we didn't already return
});
\`\`\`

## Mental model

Think of \`req\` as a read-only snapshot of what the client sent, and \`res\` as a write-once channel back to the client. You can read from \`req\` as many times as you like, but you only get one shot at writing to \`res\`.`,
        },
        {
          slug: "serving-json-apis",
          title: "Serving JSON APIs Consistently",
          estimatedMinutes: 8,
          content: `# Serving JSON APIs Consistently

A REST API's usefulness depends on clients being able to predict its shape. Two conventions make the biggest difference: consistent status codes, and a consistent response envelope.

## Choosing the right status code

\`\`\`js
app.post("/api/courses", (req, res) => {
  const course = createCourse(req.body);
  res.status(201).json(course); // 201 Created, not 200
});

app.delete("/api/courses/:id", (req, res) => {
  deleteCourse(req.params.id);
  res.status(204).end(); // 204 No Content — nothing to return
});
\`\`\`

A quick reference for CRUD operations:

| Operation | Success status |
|---|---|
| \`GET\` (found) | \`200 OK\` |
| \`GET\` (collection) | \`200 OK\` (even if the list is empty) |
| \`POST\` (created) | \`201 Created\` |
| \`PUT\`/\`PATCH\` (updated) | \`200 OK\` |
| \`DELETE\` (removed) | \`204 No Content\` |
| Resource missing | \`404 Not Found\` |

## A consistent shape for errors

Clients shouldn't have to guess the error format on every endpoint. Pick one shape and stick to it everywhere:

\`\`\`js
// Good: every error looks the same
res.status(404).json({ error: { message: "Course not found" } });
res.status(400).json({ error: { message: "Title is required" } });
\`\`\`

Some teams add a machine-readable \`code\` alongside the human-readable \`message\`, which lets clients branch on behavior without parsing text:

\`\`\`json
{ "error": { "code": "COURSE_NOT_FOUND", "message": "Course not found" } }
\`\`\`

## Don't leak internals

Never send a raw stack trace or database error message back to a client — it can leak implementation details and is a poor experience besides. Log the full error on the server, and return a clean, minimal message to the client.

## Try it yourself

Go back through the routes you've written so far and check: does every success path use the correct status code from the table above? Does every error path use the same JSON shape? Consistency here pays off enormously once your API has dozens of endpoints.`,
        },
      ],
    },
    {
      title: "Middleware & Configuration",
      lessons: [
        {
          slug: "understanding-middleware",
          title: "Understanding Middleware",
          estimatedMinutes: 10,
          content: `# Understanding Middleware

**Middleware** is a function that runs *between* the incoming request and your final route handler. It's the single most important concept for writing clean Express apps — logging, authentication, body parsing, and error handling are all just middleware.

## The shape of a middleware function

\`\`\`js
function logger(req, res, next) {
  console.log(\`\${req.method} \${req.path}\`);
  next(); // pass control to the next middleware/handler
}

app.use(logger);
\`\`\`

Every middleware function receives \`(req, res, next)\`. It can:

1. Run code (inspect or modify \`req\`/\`res\`)
2. End the request itself by sending a response
3. Call \`next()\` to hand off to whatever comes next in the chain

## Order matters — a lot

Express runs middleware in the exact order you register it with \`app.use\` and route methods. Each one must call \`next()\` or the request hangs forever (the client just waits, since nothing ever sent a response).

\`\`\`js
app.use(logger);          // 1. runs first, for every request
app.use(express.json());  // 2. parses JSON bodies

app.get("/api/courses", (req, res) => {
  res.json(courses);       // 3. finally, the route handler
});
\`\`\`

## Scoping middleware to specific routes

You don't have to apply middleware globally. Pass it as an extra argument to a specific route:

\`\`\`js
function requireAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: { message: "Missing token" } });
  }
  next();
}

app.delete("/api/courses/:id", requireAuth, deleteCourseHandler);
\`\`\`

Here, \`requireAuth\` only runs for this one route, before \`deleteCourseHandler\`.

## Mental model

Picture middleware as an assembly line for a request. Each station can inspect the item, modify it, reject it outright, or wave it through to the next station. A route handler is simply the last station on the line — the one that actually produces the response.

## Common mistake

Forgetting to call \`next()\` inside a middleware that isn't supposed to end the request. The request will hang with no response and no error — a classic silent bug. If a middleware sends a response, it must **not** also call \`next()\` afterward (that causes the "headers already sent" error instead).`,
        },
        {
          slug: "built-in-and-third-party-middleware",
          title: "Built-in and Third-Party Middleware",
          estimatedMinutes: 9,
          content: `# Built-in and Third-Party Middleware

You rarely write every middleware yourself. Express ships a few essentials built in, and the ecosystem provides well-tested packages for almost everything else.

## express.json() — parsing request bodies

Without this, \`req.body\` is \`undefined\` for JSON requests. It reads the raw request stream, parses it as JSON, and attaches the result to \`req.body\`.

\`\`\`js
import express from "express";

const app = express();
app.use(express.json());

app.post("/api/courses", (req, res) => {
  console.log(req.body); // now populated
  res.status(201).json(req.body);
});
\`\`\`

## express.static() — serving files

Serves a folder of static assets (images, a built frontend, uploaded files) directly:

\`\`\`js
app.use(express.static("public"));
// a request for /logo.png now serves ./public/logo.png
\`\`\`

## morgan — HTTP request logging

\`\`\`bash
npm install morgan
\`\`\`

\`\`\`js
import morgan from "morgan";

app.use(morgan("dev")); // logs "GET /api/courses 200 12ms" etc.
\`\`\`

## cors — Cross-Origin Resource Sharing

Browsers block JavaScript from calling an API on a different origin (domain/port) than the page itself, unless the server explicitly allows it via CORS headers. The \`cors\` package handles this for you:

\`\`\`bash
npm install cors
\`\`\`

\`\`\`js
import cors from "cors";

app.use(cors({ origin: "https://myfrontend.com" }));
\`\`\`

Without this, a frontend hosted on a different origin will see requests blocked by the browser with a CORS error, even though your server responded fine — this trips up nearly every beginner the first time they connect a separate frontend to their API.

## Try it yourself

Add \`morgan("dev")\` to a small Express app and make a few requests with different methods and paths. Watching the log line for each request is one of the fastest ways to build intuition for how Express handles traffic.`,
        },
        {
          slug: "environment-variables-and-config",
          title: "Environment Variables & Config",
          estimatedMinutes: 9,
          content: `# Environment Variables & Config

Real applications need different settings in different places: a local database URL during development, a different one in production; a test API key vs. a live one. Hardcoding these values means editing code every time you deploy — and worse, it means secrets end up committed to your repository.

## Reading environment variables

Node exposes environment variables through \`process.env\`:

\`\`\`js
const port = process.env.PORT || 3000;
const databaseUrl = process.env.DATABASE_URL;

app.listen(port, () => {
  console.log(\`Listening on port \${port}\`);
});
\`\`\`

## Loading a .env file with dotenv

In development, it's convenient to keep variables in a local \`.env\` file rather than exporting them in your shell every time:

\`\`\`bash
npm install dotenv
\`\`\`

\`\`\`
# .env
PORT=3000
DATABASE_URL=postgresql://localhost:5432/mydb
JWT_SECRET=super-secret-value-change-me
\`\`\`

\`\`\`js
import "dotenv/config"; // loads .env into process.env, must run before you read it

const port = process.env.PORT;
\`\`\`

## Never commit secrets

Add \`.env\` to \`.gitignore\` immediately. Instead, commit a \`.env.example\` with the variable *names* but not real values, so teammates know what to set up:

\`\`\`
# .env.example
PORT=3000
DATABASE_URL=
JWT_SECRET=
\`\`\`

In production, you typically don't ship a \`.env\` file at all — your hosting platform (Render, Fly, AWS, etc.) injects environment variables directly into the process.

## Failing fast on missing config

A server that silently starts with \`undefined\` secrets is a server that fails mysteriously later. It's good practice to validate required config at startup:

\`\`\`js
if (!process.env.JWT_SECRET) {
  throw new Error("Missing required env var: JWT_SECRET");
}
\`\`\`

## Common mistake

Committing a real \`.env\` file with live credentials to version control. If this ever happens, the fix isn't just deleting the file in a new commit — the secret is still in git history and must be rotated (regenerated) immediately.`,
        },
        {
          slug: "project-structure-basics",
          title: "Basic Project Structure",
          estimatedMinutes: 8,
          content: `# Basic Project Structure

A single \`server.js\` file works fine for a demo, but it quickly becomes unmanageable once you have a dozen routes, validation, and database logic. Splitting things up early makes growth painless later.

## A simple, common layout

\`\`\`
my-api/
├── src/
│   ├── routes/
│   │   └── courses.routes.js
│   ├── controllers/
│   │   └── courses.controller.js
│   ├── middleware/
│   │   └── requireAuth.js
│   └── app.js
├── .env
├── .env.example
├── package.json
└── server.js
\`\`\`

## Separating routes from logic

\`\`\`js
// src/routes/courses.routes.js
import { Router } from "express";
import { listCourses, getCourse } from "../controllers/courses.controller.js";

const router = Router();

router.get("/", listCourses);
router.get("/:id", getCourse);

export default router;
\`\`\`

\`\`\`js
// src/controllers/courses.controller.js
export function listCourses(req, res) {
  res.json(courses);
}

export function getCourse(req, res) {
  const course = courses.find((c) => c.id === req.params.id);
  if (!course) return res.status(404).json({ error: { message: "Not found" } });
  res.json(course);
}
\`\`\`

\`\`\`js
// src/app.js
import express from "express";
import coursesRouter from "./routes/courses.routes.js";

const app = express();
app.use(express.json());
app.use("/api/courses", coursesRouter);

export default app;
\`\`\`

\`\`\`js
// server.js
import "dotenv/config";
import app from "./src/app.js";

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(\`Listening on \${port}\`));
\`\`\`

## Why bother with Router()

Express's \`Router\` lets you group related routes into their own file, then mount that whole group under a path prefix with \`app.use("/api/courses", coursesRouter)\`. Each route inside only needs to know its path *relative to* that prefix — \`router.get("/:id", ...)\` becomes \`/api/courses/:id\` once mounted.

## Mental model

Think of \`app.js\` as the switchboard: it wires middleware and route groups together but contains no business logic itself. Routers describe *which* paths exist; controllers describe *what happens* when they're hit. This separation is what makes a codebase navigable once it has 50+ endpoints instead of 5.`,
        },
      ],
      quiz: {
        title: "Tier 1 Checkpoint: Node.js & Express Basics",
        questions: [
          {
            text: "What makes Node.js well-suited for handling many simultaneous API requests?",
            optionA: "It creates a new operating system thread for every incoming request",
            optionB: "Its non-blocking, event-loop-based I/O lets a single thread handle many in-flight operations",
            optionC: "It compiles JavaScript to machine code before running it",
            optionD: "It automatically caches every response in memory",
            correctOption: "B",
          },
          {
            text: "In an HTTP response, which status code family indicates the client made an invalid request (e.g. missing required data)?",
            optionA: "1xx",
            optionB: "2xx",
            optionC: "4xx",
            optionD: "5xx",
            correctOption: "C",
          },
          {
            text: "Which HTTP method is conventionally used to partially update an existing resource?",
            optionA: "GET",
            optionB: "POST",
            optionC: "PATCH",
            optionD: "DELETE",
            correctOption: "C",
          },
          {
            text: "In an Express route defined as `app.get(\"/api/courses/:id\", handler)`, how do you access the value of `id` inside `handler`?",
            optionA: "req.query.id",
            optionB: "req.params.id",
            optionC: "req.body.id",
            optionD: "req.id",
            correctOption: "B",
          },
          {
            text: "Why does `req.body` come back as `undefined` in a plain Express app that hasn't added any middleware?",
            optionA: "Express only supports GET requests by default",
            optionB: "There is no `express.json()` (or similar) middleware parsing the request body yet",
            optionC: "The client did not set an Authorization header",
            optionD: "req.body only exists for DELETE requests",
            correctOption: "B",
          },
          {
            text: "What is the effect of a middleware function that never calls `next()` and never sends a response?",
            optionA: "Express automatically calls next() after a timeout",
            optionB: "The request hangs indefinitely with no response sent to the client",
            optionC: "Express throws a compile-time error before the server starts",
            optionD: "The next middleware runs anyway, skipping the missing call",
            correctOption: "B",
          },
          {
            text: "Why is a route like `/api/courses/featured` typically defined *before* `/api/courses/:id` in the same router?",
            optionA: "Express requires routes to be listed alphabetically",
            optionB: "Otherwise `:id` would match \"featured\" as a parameter value and swallow the more specific route",
            optionC: "Route order has no effect on matching in Express",
            optionD: "PATCH routes must always precede GET routes",
            correctOption: "B",
          },
          {
            text: "What is the main purpose of a `.env` file combined with the `dotenv` package?",
            optionA: "To store environment-specific configuration and secrets outside of source code",
            optionB: "To automatically minify JavaScript before deployment",
            optionC: "To replace the need for a package.json file",
            optionD: "To define Express routes declaratively",
            correctOption: "A",
          },
          {
            text: "Which status code should a successful `POST /api/courses` request that creates a new resource return?",
            optionA: "200 OK",
            optionB: "201 Created",
            optionC: "204 No Content",
            optionD: "302 Found",
            correctOption: "B",
          },
          {
            text: "What problem does splitting an Express app into routes, controllers, and middleware files (instead of one big server.js) primarily solve?",
            optionA: "It makes the app run faster at runtime",
            optionB: "It is required for Express to parse JSON bodies",
            optionC: "It keeps the codebase organized and navigable as the number of endpoints grows",
            optionD: "It automatically adds authentication to every route",
            correctOption: "C",
          },
        ],
      },
    },
    {
      title: "Connecting to a Database with Prisma",
      lessons: [
        {
          slug: "relational-databases-101",
          title: "Relational Databases 101",
          estimatedMinutes: 9,
          content: `# Relational Databases 101

An API without persistence forgets everything the moment it restarts. To build anything real, you need a database — and the most common choice for REST APIs is a **relational database** like PostgreSQL, MySQL, or SQLite.

## Tables, rows, and columns

A relational database organizes data into **tables**. Each table has a fixed set of **columns** (fields), and each **row** is one record.

\`\`\`
courses
┌────┬──────────────────┬──────────┐
│ id │ title            │ price    │
├────┼──────────────────┼──────────┤
│ 1  │ Node.js APIs     │ 0        │
│ 2  │ React Fundamentals │ 29.00  │
└────┴──────────────────┴──────────┘
\`\`\`

## Relationships

Tables relate to each other through **foreign keys** — a column that references the primary key (usually \`id\`) of another table:

\`\`\`
enrollments
┌────┬─────────┬───────────┐
│ id │ user_id │ course_id │
├────┼─────────┼───────────┤
│ 1  │ 7       │ 1         │
└────┴─────────┴───────────┘
\`\`\`

This row says "user 7 is enrolled in course 1." This is how relational databases represent one-to-many relationships (one user, many enrollments) and many-to-many relationships (many users enrolled in many courses, via a join table like \`enrollments\`).

## SQL, briefly

You interact with a relational database using **SQL** (Structured Query Language):

\`\`\`sql
SELECT * FROM courses WHERE price = 0;

INSERT INTO courses (title, price) VALUES ('New Course', 19.99);

UPDATE courses SET price = 24.99 WHERE id = 2;

DELETE FROM courses WHERE id = 5;
\`\`\`

These four operations map directly to the CRUD operations (Create, Read, Update, Delete) your API endpoints will perform.

## Why not just use a plain JSON file?

A JSON file works for a toy project, but breaks down fast in production: no safe way to handle two requests writing at once, no efficient way to search or filter without loading the whole file into memory, and no built-in way to enforce relationships or data types. Relational databases solve exactly these problems, which is why they're the default choice for most APIs.

## Coming up

Writing raw SQL by hand in every route works, but gets repetitive and easy to get subtly wrong. Next, we'll introduce **Prisma**, a tool that lets you work with your database using plain JavaScript/TypeScript instead.`,
        },
        {
          slug: "introducing-prisma",
          title: "Introducing Prisma",
          estimatedMinutes: 10,
          content: `# Introducing Prisma

**Prisma** is an ORM (Object-Relational Mapper) for Node.js and TypeScript. It lets you define your database structure in a schema file, then query it using regular JavaScript function calls instead of writing raw SQL strings.

## Installing and initializing

\`\`\`bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
\`\`\`

This creates a \`prisma/schema.prisma\` file and a \`.env\` with a \`DATABASE_URL\` placeholder.

## Defining a model

\`\`\`prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Course {
  id        Int      @id @default(autoincrement())
  title     String
  price     Float    @default(0)
  createdAt DateTime @default(now())
}
\`\`\`

Each \`model\` becomes a table. Each field becomes a column, with a type and optional attributes like \`@id\` (primary key) or \`@default(...)\`.

## Migrations: turning your schema into real tables

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

This command compares your schema to the actual database, generates a SQL migration file to reconcile any differences, and applies it. Every schema change from now on gets its own migration — a versioned, reviewable history of how your database structure evolved.

## The generated client

\`\`\`bash
npx prisma generate
\`\`\`

This reads your schema and generates a fully-typed client tailored to your exact models:

\`\`\`js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const allCourses = await prisma.course.findMany();
\`\`\`

Because the client is generated from your schema, your editor autocompletes field names, and a typo like \`prisma.courze\` fails immediately instead of at 2am in production.

## Mental model

Think of \`schema.prisma\` as the single source of truth for your database's shape. Migrations are the mechanism that keeps the real database in sync with that source of truth over time, and the generated client is your type-safe doorway into querying it from code.`,
        },
        {
          slug: "connecting-a-database",
          title: "Connecting a Database",
          estimatedMinutes: 10,
          content: `# Connecting a Database

Most real APIs need to persist data — users, orders, posts — somewhere durable. That's where a database comes in.

## A typical flow

1. A request hits your route (e.g. \`POST /api/courses\`)
2. Your handler validates the incoming data
3. You use a database client or ORM (like Prisma) to store it
4. You respond with the saved record

\`\`\`js
app.post("/api/courses", async (req, res) => {
  const course = await prisma.course.create({ data: req.body });
  res.status(201).json(course);
});
\`\`\`

## Why an ORM helps

Writing raw SQL by hand for every query gets repetitive and error-prone. An ORM like Prisma gives you a type-safe way to read and write data, and handles the SQL for you.

## Sharing a single Prisma client

Creating a new \`PrismaClient\` per request quickly exhausts your database's connection limit. Instead, create one instance and reuse it everywhere:

\`\`\`js
// src/lib/prisma.js
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
\`\`\`

\`\`\`js
// src/controllers/courses.controller.js
import { prisma } from "../lib/prisma.js";

export async function createCourse(req, res) {
  const course = await prisma.course.create({ data: req.body });
  res.status(201).json(course);
}
\`\`\`

## Handling the request lifecycle around a database call

Database calls are asynchronous and can fail (a bad connection, a constraint violation). Always \`await\` them inside a \`try/catch\`, or use an async error-handling pattern (covered in the next module) so a failed query doesn't crash your server:

\`\`\`js
export async function getCourse(req, res) {
  try {
    const course = await prisma.course.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!course) {
      return res.status(404).json({ error: { message: "Course not found" } });
    }
    res.json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: { message: "Something went wrong" } });
  }
}
\`\`\`

## Common mistake

Passing \`req.body\` straight into \`prisma.course.create({ data: req.body })\` without validating it first (as the first example does, for simplicity). In practice, a client could send extra fields, missing required fields, or the wrong types. The next module covers validating incoming data properly before it ever reaches your database layer.

You've now seen the full loop — request in, data persisted, response out — that powers virtually every backend API.`,
        },
      ],
    },
    {
      title: "Modeling Relationships & Transactions with Prisma",
      lessons: [
        {
          slug: "one-to-many-relationships-in-prisma",
          title: "One-to-Many Relationships in Prisma",
          estimatedMinutes: 9,
          content: `# One-to-Many Relationships in Prisma

Real applications are rarely a single, isolated table. A course has many lessons; a user has many enrollments. Prisma lets you declare these relationships directly in your schema, and query across them without writing manual JOINs.

## Declaring a one-to-many relationship

\`\`\`prisma
model Course {
  id      Int      @id @default(autoincrement())
  title   String
  lessons Lesson[] // one course has many lessons
}

model Lesson {
  id       Int    @id @default(autoincrement())
  title    String
  course   Course @relation(fields: [courseId], references: [id])
  courseId Int
}
\`\`\`

\`Lesson.courseId\` is the foreign key column, pointing back at \`Course.id\`. \`Course.lessons\` isn't a real column in the database — it's a convenience Prisma computes for you, letting you navigate from a course to its lessons in code.

## Creating related records together

\`\`\`js
const course = await prisma.course.create({
  data: {
    title: "Node.js APIs",
    lessons: {
      create: [{ title: "What Is Node.js?" }, { title: "How the Web Works" }],
    },
  },
});
\`\`\`

This creates the course and both lessons in a single call, with Prisma wiring up the foreign keys for you.

## Fetching related records with include

By default, querying a course does **not** bring back its lessons — you opt in with \`include\`:

\`\`\`js
const course = await prisma.course.findUnique({
  where: { id: 1 },
  include: { lessons: true },
});
// course.lessons is now an array of Lesson objects
\`\`\`

## Selecting only the fields you need

\`include\` brings back every field of the related model. When you only need a couple of fields, \`select\` is more efficient, since it avoids pulling data over the wire that you'll never use:

\`\`\`js
const course = await prisma.course.findUnique({
  where: { id: 1 },
  select: {
    title: true,
    lessons: { select: { title: true } },
  },
});
\`\`\`

## Mental model

Think of the schema's \`Lesson[]\` and \`@relation\` as two sides of the same relationship, described from each model's point of view: "a course *has* lessons" and "a lesson *belongs to* a course" are the same fact, just phrased from opposite ends. Prisma needs both sides declared so it knows how to join the underlying tables when you ask for related data.

## Try it yourself

Add a \`reviews\` relationship to the \`Course\` model from earlier in this course — a course has many reviews, and each review belongs to one course — then write a query that fetches a single course along with all of its reviews.`,
        },
        {
          slug: "many-to-many-relationships-in-prisma",
          title: "Many-to-Many Relationships & Join Tables",
          estimatedMinutes: 10,
          content: `# Many-to-Many Relationships & Join Tables

A one-to-many relationship (one course, many lessons) has a clear owner. A **many-to-many** relationship doesn't — many students can enroll in many courses, and neither side "belongs" to the other. Modeling this requires a bit more thought.

## The implicit join table

For simple cases, Prisma can manage the underlying join table for you automatically:

\`\`\`prisma
model Student {
  id      Int      @id @default(autoincrement())
  name    String
  courses Course[] // implicit many-to-many
}

model Course {
  id       Int       @id @default(autoincrement())
  title    String
  students Student[] // implicit many-to-many
}
\`\`\`

Behind the scenes, Prisma creates a hidden join table connecting the two, and you never have to touch it directly:

\`\`\`js
await prisma.student.update({
  where: { id: 1 },
  data: {
    courses: { connect: { id: 5 } }, // enroll student 1 in course 5
  },
});
\`\`\`

## The explicit join table (when you need extra data)

The implicit approach breaks down the moment the *relationship itself* needs its own data — for example, remembering *when* a student enrolled, or their *progress* in the course. That requires an explicit join model, exactly like the enrollments table from the "Relational Databases 101" lesson earlier in this course:

\`\`\`prisma
model Student {
  id          Int          @id @default(autoincrement())
  name        String
  enrollments Enrollment[]
}

model Course {
  id          Int          @id @default(autoincrement())
  title       String
  enrollments Enrollment[]
}

model Enrollment {
  id         Int      @id @default(autoincrement())
  student    Student  @relation(fields: [studentId], references: [id])
  studentId  Int
  course     Course   @relation(fields: [courseId], references: [id])
  courseId   Int
  enrolledAt DateTime @default(now())
  progress   Int      @default(0)

  @@unique([studentId, courseId]) // a student can only enroll in a course once
}
\`\`\`

\`\`\`js
await prisma.enrollment.create({
  data: { studentId: 1, courseId: 5, progress: 0 },
});
\`\`\`

## Choosing between the two

Reach for the implicit join table when the relationship truly carries no extra information of its own (e.g. a simple "tags on a post" relationship). Reach for an explicit join model — like \`Enrollment\` — the moment you need to store *anything* about the relationship itself, or query it directly (e.g. "find all enrollments completed this month").

## Common mistake

Starting with an implicit many-to-many relationship, then later needing to add a field like \`enrolledAt\` to it, and being unable to. If there's any realistic chance the relationship will need its own data later, it's usually safer to start with an explicit join model — migrating from implicit to explicit after the fact requires a real (if mechanical) migration.

## Try it yourself

Using the \`@@unique([studentId, courseId])\` constraint above, try creating two \`Enrollment\` records with the same \`studentId\` and \`courseId\` — confirm Prisma rejects the second one, enforcing "one enrollment per student per course" at the database level rather than relying on application code to check first.`,
        },
        {
          slug: "prisma-transactions-and-n-plus-one",
          title: "Transactions and Avoiding the N+1 Problem",
          estimatedMinutes: 10,
          content: `# Transactions and Avoiding the N+1 Problem

Two of the most common ways a data-driven API silently misbehaves under real traffic: partial writes when an operation fails halfway through, and accidentally issuing far more database queries than intended. Both have well-established fixes.

## The problem transactions solve

Imagine enrolling a student and simultaneously incrementing a course's enrollment count:

\`\`\`js
// Dangerous: if the second call fails, the first has already committed
await prisma.enrollment.create({ data: { studentId, courseId } });
await prisma.course.update({
  where: { id: courseId },
  data: { enrollmentCount: { increment: 1 } },
});
\`\`\`

If the server crashes, or the second call throws, you're left with an enrollment that was never counted — your data is now inconsistent, and nothing rolled back automatically.

## Wrapping operations in a transaction

A **transaction** groups multiple operations so that either *all* of them succeed together, or *none* of them are applied at all:

\`\`\`js
await prisma.$transaction([
  prisma.enrollment.create({ data: { studentId, courseId } }),
  prisma.course.update({
    where: { id: courseId },
    data: { enrollmentCount: { increment: 1 } },
  }),
]);
\`\`\`

If either operation fails, Prisma rolls back the other — the database never ends up in a half-finished state.

## Interactive transactions

When later steps depend on the result of earlier ones, use the callback form instead of an array:

\`\`\`js
await prisma.$transaction(async (tx) => {
  const enrollment = await tx.enrollment.create({ data: { studentId, courseId } });
  if (enrollment.progress > 100) {
    throw new Error("Invalid progress value"); // throwing here rolls back the whole transaction
  }
  await tx.course.update({
    where: { id: courseId },
    data: { enrollmentCount: { increment: 1 } },
  });
});
\`\`\`

Every call inside the callback uses \`tx\` (the transaction client) instead of \`prisma\` directly, and throwing anywhere inside automatically rolls back everything done so far in that transaction.

## The N+1 problem

This is a performance trap that has nothing to do with correctness, and everything to do with efficiency:

\`\`\`js
// 1 query to get all courses, then N more queries — one per course — to get each one's lessons
const courses = await prisma.course.findMany();
for (const course of courses) {
  course.lessons = await prisma.lesson.findMany({ where: { courseId: course.id } });
}
\`\`\`

With 100 courses, this fires 101 total queries where a single well-formed query would do — a huge, easy-to-miss cost that compounds as your data grows.

## Fixing it with include

\`\`\`js
// 1 query total, with lessons joined in
const courses = await prisma.course.findMany({
  include: { lessons: true },
});
\`\`\`

Prisma translates this into an efficient join (or a small, fixed number of queries) instead of one query per row — the fix is almost always to reach for \`include\`/\`select\` instead of looping and querying inside the loop.

## Mental model

Transactions protect **correctness** ("did every related write succeed together"); watching for N+1 protects **performance** ("am I making one smart query or accidentally making hundreds"). Both matter more as your data and traffic grow — a bug that's invisible with 10 test rows can become a serious outage with 10 million real ones.

## Try it yourself

Take the "N+1" example above and rewrite it with \`include\`. Then imagine (or measure, if you have a database handy) the query count difference between 10 courses and 10,000 courses under each approach.`,
        },
      ],
    },
    {
      title: "CRUD APIs and Validation",
      lessons: [
        {
          slug: "designing-restful-routes",
          title: "Designing RESTful Routes",
          estimatedMinutes: 8,
          content: `# Designing RESTful Routes

**REST** (Representational State Transfer) is a set of conventions for designing predictable, resource-oriented APIs. Following them means anyone familiar with REST can guess how your API works before reading a single line of documentation.

## Resources are nouns, not verbs

A common beginner mistake is to design routes around actions:

\`\`\`
❌ GET /api/getAllCourses
❌ POST /api/createNewCourse
❌ POST /api/deleteCourse/42
\`\`\`

REST instead treats each URL as a **resource** (a noun), and uses the HTTP method to express the action:

\`\`\`
✅ GET    /api/courses        → list courses
✅ POST   /api/courses        → create a course
✅ GET    /api/courses/:id    → get one course
✅ PUT    /api/courses/:id    → replace a course
✅ PATCH  /api/courses/:id    → partially update a course
✅ DELETE /api/courses/:id    → delete a course
\`\`\`

## Nesting for relationships

When a resource belongs to another, nest the path:

\`\`\`
GET  /api/courses/:courseId/reviews       → reviews for one course
POST /api/courses/:courseId/reviews       → add a review to a course
\`\`\`

Avoid nesting more than two levels deep — \`/api/courses/:id/modules/:id/lessons/:id/comments\` becomes hard to work with. Consider giving deeply-nested resources their own top-level route once you're a few levels in (e.g. \`/api/comments/:id\`).

## Plural nouns, consistently

Prefer \`/api/courses\` over \`/api/course\` — the plural form reads naturally for both the collection endpoint (\`GET /api/courses\`) and an individual item (\`GET /api/courses/42\`, "item 42 from the courses collection").

## Common mistake

Mixing verbs into some routes but not others (\`/api/courses\` alongside \`/api/archiveCourse/:id\`). Pick the resource-oriented convention and apply it everywhere — an action like "archive" is usually better modeled as \`PATCH /api/courses/:id\` with \`{ "status": "archived" }\` in the body, or as a dedicated sub-resource like \`POST /api/courses/:id/archive\` if it truly isn't a simple field update.

## Try it yourself

Sketch out RESTful routes for a "student enrolls in a course, and can leave one review per course" feature, before reading the next lesson — then compare your design against how the CRUD lesson implements it.`,
        },
        {
          slug: "building-crud-endpoints",
          title: "Building CRUD Endpoints",
          estimatedMinutes: 11,
          content: `# Building CRUD Endpoints

Let's put routing, Express, and Prisma together into a complete, working set of CRUD endpoints for a single resource.

## The full set

\`\`\`js
// src/routes/courses.routes.js
import { Router } from "express";
import {
  listCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courses.controller.js";

const router = Router();

router.get("/", listCourses);
router.get("/:id", getCourse);
router.post("/", createCourse);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);

export default router;
\`\`\`

\`\`\`js
// src/controllers/courses.controller.js
import { prisma } from "../lib/prisma.js";

export async function listCourses(req, res) {
  const courses = await prisma.course.findMany();
  res.json(courses);
}

export async function getCourse(req, res) {
  const course = await prisma.course.findUnique({
    where: { id: Number(req.params.id) },
  });
  if (!course) return res.status(404).json({ error: { message: "Not found" } });
  res.json(course);
}

export async function createCourse(req, res) {
  const course = await prisma.course.create({ data: req.body });
  res.status(201).json(course);
}

export async function updateCourse(req, res) {
  const course = await prisma.course.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(course);
}

export async function deleteCourse(req, res) {
  await prisma.course.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
}
\`\`\`

## PUT vs. PATCH in practice

Strictly, \`PUT\` should replace the *entire* resource (any field you omit should be reset), while \`PATCH\` should merge in only the fields you send. Many real-world APIs are lenient about this distinction and treat both as a partial update — but it's worth deciding deliberately and documenting your choice rather than leaving clients to guess.

## Handling "not found" for updates and deletes too

The example above will throw if you try to update or delete an \`id\` that doesn't exist — Prisma raises an error rather than silently doing nothing. In the next lesson on error handling, you'll see how to catch that specific error and turn it into a clean \`404\` instead of a \`500\`.

## Try it yourself

Using a REST client (curl, Postman, or Thunder Client), exercise every one of these five endpoints against a running server: create a course, fetch it, update it, list all courses, then delete it — confirming the status code at each step matches the table from the "Serving JSON APIs Consistently" lesson.`,
        },
        {
          slug: "validating-request-data",
          title: "Validating Request Data",
          estimatedMinutes: 10,
          content: `# Validating Request Data

Never trust data from a client. Whether it's a bug in the frontend, a stale mobile app, or someone poking your API directly, incoming data can always be missing, the wrong type, or malicious. **Validation** is the gate that catches this before it reaches your business logic or database.

## Validating by hand (and why it doesn't scale)

\`\`\`js
app.post("/api/courses", (req, res) => {
  const { title, price } = req.body;
  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: { message: "title is required" } });
  }
  if (typeof price !== "number" || price < 0) {
    return res.status(400).json({ error: { message: "price must be a non-negative number" } });
  }
  // ... proceed
});
\`\`\`

This works, but for a resource with ten fields, it turns into a wall of repetitive \`if\` statements — and it's easy to forget a check.

## Using a schema library: Zod

\`\`\`bash
npm install zod
\`\`\`

\`\`\`js
import { z } from "zod";

const createCourseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().min(0, "Price cannot be negative"),
  category: z.enum(["frontend", "backend", "data"]).optional(),
});

export function createCourse(req, res) {
  const result = createCourseSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      error: { message: "Invalid input", details: result.error.flatten() },
    });
  }

  const course = await prisma.course.create({ data: result.data });
  res.status(201).json(course);
}
\`\`\`

\`safeParse\` never throws — it returns an object with either \`success: true\` and clean, typed \`data\`, or \`success: false\` and a structured \`error\` describing exactly what failed.

## Validation as middleware

Repeating this pattern in every controller gets old fast. A common approach is a small middleware factory:

\`\`\`js
function validate(schema) {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: { message: "Invalid input", details: result.error.flatten() },
      });
    }
    req.body = result.data; // replace with the parsed, validated data
    next();
  };
}

router.post("/", validate(createCourseSchema), createCourse);
\`\`\`

Now \`createCourse\` can trust that \`req.body\` is already valid by the time it runs.

## Common mistake

Validating only on the frontend and assuming the API is safe as a result. Frontend validation is a UX nicety; it's trivial to bypass by calling the API directly. Server-side validation is the only validation that actually protects your data.`,
        },
        {
          slug: "pagination-filtering-sorting",
          title: "Pagination, Filtering & Sorting",
          estimatedMinutes: 9,
          content: `# Pagination, Filtering & Sorting

A \`GET /api/courses\` that returns every row in the table works fine with 20 rows. With 200,000 rows, it will exhaust memory, take forever to serialize, and overwhelm the client. Real list endpoints need pagination — and usually filtering and sorting too.

## Offset-based pagination

The simplest approach: skip a number of rows, then take a limited number more.

\`\`\`js
export async function listCourses(req, res) {
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = Math.min(50, Number(req.query.pageSize) || 20);

  const [courses, total] = await Promise.all([
    prisma.course.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.course.count(),
  ]);

  res.json({
    data: courses,
    meta: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
}
\`\`\`

\`GET /api/courses?page=2&pageSize=10\` now returns the second page of 10 results, along with metadata the client can use to render "Page 2 of 8."

## Filtering with query parameters

\`\`\`js
// GET /api/courses?category=backend&maxPrice=30
export async function listCourses(req, res) {
  const { category, maxPrice } = req.query;

  const courses = await prisma.course.findMany({
    where: {
      ...(category && { category: String(category) }),
      ...(maxPrice && { price: { lte: Number(maxPrice) } }),
    },
  });

  res.json(courses);
}
\`\`\`

Only apply a filter if the corresponding query parameter was actually provided — otherwise every request without \`?category=...\` would incorrectly filter to nothing.

## Sorting

\`\`\`js
// GET /api/courses?sortBy=price&order=desc
const sortBy = ["title", "price", "createdAt"].includes(req.query.sortBy)
  ? req.query.sortBy
  : "createdAt";
const order = req.query.order === "desc" ? "desc" : "asc";

const courses = await prisma.course.findMany({
  orderBy: { [sortBy]: order },
});
\`\`\`

Notice the allow-list (\`["title", "price", "createdAt"]\`) — never pass a raw query string straight into \`orderBy\` without checking it against known-safe column names first.

## Why offset pagination isn't always enough

Offset pagination (\`skip\`/\`take\`) gets slower on very large tables, because the database still has to scan and discard all the skipped rows. High-traffic APIs often switch to **cursor-based pagination** instead (e.g. "give me the 20 items after the one with id 8123"), which uses an indexed column to jump straight to the right spot. For most applications, offset pagination is simpler and perfectly adequate — reach for cursors only once you've measured a real performance problem.`,
        },
      ],
    },
    {
      title: "File Uploads & Serving Files",
      lessons: [
        {
          slug: "handling-file-uploads-with-multer",
          title: "Handling File Uploads with Multer",
          estimatedMinutes: 9,
          content: `# Handling File Uploads with Multer

So far, every request body in this course has been JSON. But plenty of real APIs need to accept files too — a profile picture, a course thumbnail, a PDF attachment. Files arrive differently than JSON, and Express needs an extra piece of middleware to handle them.

## Why express.json() doesn't work for files

File uploads are typically sent as \`multipart/form-data\`, a different request encoding than JSON — \`express.json()\` only understands JSON bodies and will leave \`req.body\` empty (or throw) for a multipart request. You need dedicated middleware for parsing multipart uploads: **Multer**.

## Installing and configuring Multer

\`\`\`bash
npm install multer
\`\`\`

\`\`\`js
import multer from "multer";

const upload = multer({
  dest: "uploads/", // where files are temporarily stored on disk
  limits: { fileSize: 5 * 1024 * 1024 }, // reject anything over 5MB
});
\`\`\`

## Accepting a single file upload

\`\`\`js
router.post("/api/courses/:id/thumbnail", upload.single("thumbnail"), (req, res) => {
  console.log(req.file); // { originalname, mimetype, size, path, ... }
  console.log(req.body); // any other form fields sent alongside the file
  res.status(201).json({ filename: req.file.filename });
});
\`\`\`

\`upload.single("thumbnail")\` tells Multer to expect exactly one file, sent under the form field name \`"thumbnail"\`. It populates \`req.file\` with metadata about the uploaded file, and (crucially) still populates \`req.body\` with any other non-file fields sent in the same form.

## Accepting multiple files

\`\`\`js
router.post("/api/courses/:id/attachments", upload.array("attachments", 5), (req, res) => {
  console.log(req.files); // an array of up to 5 files
  res.status(201).json({ count: req.files.length });
});
\`\`\`

## Testing an upload endpoint

With curl:

\`\`\`bash
curl -F "thumbnail=@./cover.jpg" http://localhost:3000/api/courses/1/thumbnail
\`\`\`

The \`-F\` flag tells curl to send the request as \`multipart/form-data\`, matching what Multer expects.

## Mental model

Multer sits in the same spot in the request pipeline as \`express.json()\` — both are middleware that read the raw request body and populate something useful on \`req\` before your handler runs. The difference is purely in *what kind* of body they know how to parse: one JSON, the other multipart form data (which can mix files and regular fields in a single request).

## Try it yourself

Add an upload endpoint for a single course thumbnail, limited to 2MB and only image files (hint: Multer's \`fileFilter\` option receives the same \`req\` and file metadata, and can reject a file by calling its callback with an error). Try uploading a file over the limit and confirm you get a clear error rather than a server crash.`,
        },
        {
          slug: "storing-and-serving-files-safely",
          title: "Storing and Serving Uploaded Files Safely",
          estimatedMinutes: 9,
          content: `# Storing and Serving Uploaded Files Safely

Accepting a file is only the first step. Where you store it, what you name it, and how you validate it all matter — get these wrong and file uploads become one of the easiest ways to compromise an API.

## Never trust the original filename

\`\`\`js
// Dangerous: using the client-supplied filename directly
const savedPath = \`uploads/\${req.file.originalname}\`;
\`\`\`

A client-supplied filename can contain path traversal sequences (\`../../etc/passwd\`), collide with another user's file, or contain characters your filesystem doesn't like. Generate your own filename instead, and keep the original only as metadata:

\`\`\`js
import { randomUUID } from "crypto";
import path from "path";

const ext = path.extname(req.file.originalname); // e.g. ".jpg"
const safeFilename = \`\${randomUUID()}\${ext}\`;
\`\`\`

## Validating file type, not just extension

A file's extension is just a name — nothing stops a client from renaming \`virus.exe\` to \`photo.jpg\`. Validate the file's actual content type where it matters:

\`\`\`js
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

function fileFilter(req, file, cb) {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Only JPEG, PNG, and WebP images are allowed"));
  }
  cb(null, true);
}

const upload = multer({ dest: "uploads/", fileFilter });
\`\`\`

For anything security-sensitive, pair this with a library that inspects the file's actual byte signature rather than trusting the \`mimetype\` the client reports (which, like the filename, is client-supplied and can be spoofed).

## Local disk vs. cloud storage

Storing uploads on local disk (as the earlier examples do) works for development and small deployments, but breaks down once you have more than one server instance — a file uploaded to server A isn't visible from server B. Production APIs typically upload directly to an object storage service instead (Amazon S3, Cloudflare R2, or similar), and store only the resulting URL in the database:

\`\`\`prisma
model Course {
  id           Int    @id @default(autoincrement())
  title        String
  thumbnailUrl String? // points at cloud storage, not a local path
}
\`\`\`

## Serving files back out

If you do serve local files directly, use \`express.static\` (from Tier 1) rather than a custom route, and never serve a directory the upload path itself lives in without validating what's in it:

\`\`\`js
app.use("/uploads", express.static("uploads"));
\`\`\`

## Common mistake

Storing uploaded files inside your application's source code directory without excluding them from version control — committing user-uploaded content into git bloats the repository and can leak files that were never meant to be public. Keep uploads in a dedicated directory covered by \`.gitignore\`, or better, in cloud storage from day one.

## Try it yourself

Extend the thumbnail upload endpoint from the previous lesson to generate a random filename with \`randomUUID()\`, and add a \`fileFilter\` restricting uploads to image MIME types only.`,
        },
      ],
    },
    {
      title: "Documenting APIs with OpenAPI & Swagger",
      lessons: [
        {
          slug: "writing-an-openapi-specification",
          title: "Writing an OpenAPI Specification",
          estimatedMinutes: 9,
          content: `# Writing an OpenAPI Specification

Every endpoint you've built so far only you (and whoever reads your code) truly understands. **OpenAPI** (formerly known as Swagger) is a standard format for describing a REST API's routes, parameters, request bodies, and responses — in a way both humans and tools can read.

## Why bother documenting formally

A README with prose descriptions goes stale fast, and can't be checked automatically. An OpenAPI spec is structured (usually YAML or JSON), which unlocks tooling: interactive documentation pages, auto-generated client libraries in other languages, and automated contract testing that flags when your API's actual behavior drifts from what's documented.

## The shape of an OpenAPI document

\`\`\`yaml
openapi: 3.0.3
info:
  title: Course Platform API
  version: 1.0.0
paths:
  /api/courses/{id}:
    get:
      summary: Get a single course by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        "200":
          description: The requested course
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/Course"
        "404":
          description: Course not found
components:
  schemas:
    Course:
      type: object
      properties:
        id:
          type: integer
        title:
          type: string
        price:
          type: number
      required: [id, title]
\`\`\`

Each path maps to the HTTP methods available on it, each method describes its parameters and possible responses, and reusable shapes (like \`Course\`) live once under \`components/schemas\` and get referenced (\`$ref\`) wherever needed — rather than repeated on every endpoint.

## Generating a spec from code

Hand-writing YAML for every endpoint duplicates work you already did when writing your Zod validation schemas (from Tier 2). Libraries like \`@asteasolutions/zod-to-openapi\` let you derive OpenAPI schemas directly from the same Zod schemas that validate your requests, so the two never drift apart:

\`\`\`js
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

const CourseSchema = z
  .object({
    id: z.number().openapi({ example: 1 }),
    title: z.string().openapi({ example: "Node.js APIs" }),
    price: z.number().openapi({ example: 0 }),
  })
  .openapi("Course");
\`\`\`

## Mental model

Think of an OpenAPI spec as a contract between your API and everyone who calls it: it says exactly what a client can send and exactly what they should expect back, in a machine-readable form. Code and prose comments describe intent; a spec describes an enforceable, checkable shape.

## Try it yourself

Write a short OpenAPI snippet (just the \`paths\` section) describing \`GET /api/courses\` — the list endpoint from Tier 2 — including its \`page\`, \`pageSize\`, and \`category\` query parameters and its \`200\` response shape.`,
        },
        {
          slug: "serving-docs-with-swagger-ui",
          title: "Serving Interactive Docs with Swagger UI",
          estimatedMinutes: 8,
          content: `# Serving Interactive Docs with Swagger UI

A written spec is useful on its own, but **Swagger UI** turns it into an interactive page where anyone — a teammate, a frontend developer, an external partner — can browse every endpoint and try real requests directly from the browser, without opening Postman.

## Installing and mounting Swagger UI

\`\`\`bash
npm install swagger-ui-express yaml
\`\`\`

\`\`\`js
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import YAML from "yaml";

const openApiDocument = YAML.parse(fs.readFileSync("./openapi.yaml", "utf8"));

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
\`\`\`

Visiting \`/api/docs\` now shows a full interactive page: every route, its parameters, example request/response bodies, and a "Try it out" button that fires a real request against your running server.

## Keeping docs and code in sync

Documentation that drifts from reality is worse than no documentation — it actively misleads whoever reads it. A few practices keep them aligned:

- Generate the spec from the same validation schemas that enforce your API's actual behavior (as in the previous lesson), rather than maintaining two separate descriptions of the same shape
- Add a CI check (covered later in this course) that fails the build if the spec references a field or route that no longer exists
- Treat updating the spec as part of the definition of "done" for any endpoint change — the same way you'd expect a test update

## Documenting authentication

Protected routes need their auth requirement documented too, so consumers know to attach a token:

\`\`\`yaml
components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
paths:
  /api/courses/{id}:
    delete:
      security:
        - bearerAuth: []
      responses:
        "204":
          description: Deleted
        "401":
          description: Missing or invalid token
        "403":
          description: Insufficient permissions
\`\`\`

Swagger UI reads this and adds an "Authorize" button, letting whoever is testing the docs paste in a token once and have it attached to every subsequent "Try it out" request.

## Mental model

Good API documentation is a product in its own right — the interface other developers (including future you) use to understand what your API does, without reading its source code. Swagger UI is simply the most common way to make an OpenAPI spec approachable instead of a wall of YAML only tooling can parse.

## Try it yourself

Add \`swagger-ui-express\` to a small Express app, point it at a minimal hand-written OpenAPI YAML file describing one endpoint, and confirm the "Try it out" button in the browser actually reaches your running server.`,
        },
      ],
    },
    {
      title: "Error Handling & Basic Auth",
      lessons: [
        {
          slug: "error-handling-patterns",
          title: "Error Handling Patterns",
          estimatedMinutes: 10,
          content: `# Error Handling Patterns

Things go wrong: a database is unreachable, a record doesn't exist, a third-party API times out. How your API handles failure is just as important as how it handles success — a good API fails predictably and safely.

## Express's special error-handling middleware

Express recognizes error-handling middleware by its **four** arguments (\`err, req, res, next\`, in that order). You register it last, after all your routes:

\`\`\`js
app.use("/api/courses", coursesRouter);

// error handler — must have exactly 4 params
app.use((err, req, res, next) => {
  console.error(err);
  const status = err.status || 500;
  res.status(status).json({ error: { message: err.message || "Internal Server Error" } });
});
\`\`\`

Any error passed to \`next(err)\` (instead of calling \`next()\` with no argument) skips every remaining regular middleware and jumps straight to this handler.

## Custom error classes

Plain \`Error\` objects don't carry a status code. A small custom class fixes that and makes intent explicit at the call site:

\`\`\`js
// src/lib/ApiError.js
export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}
\`\`\`

\`\`\`js
import { ApiError } from "../lib/ApiError.js";

export async function getCourse(req, res, next) {
  const course = await prisma.course.findUnique({ where: { id: Number(req.params.id) } });
  if (!course) {
    return next(new ApiError(404, "Course not found"));
  }
  res.json(course);
}
\`\`\`

## A 404 handler for unmatched routes

Separately from the error handler above, add a catch-all for paths that don't match any route at all:

\`\`\`js
app.use((req, res) => {
  res.status(404).json({ error: { message: "Route not found" } });
});
\`\`\`

This goes right before the error-handling middleware, after all real routes.

## Mental model

Think of \`next(err)\` as an escape hatch that lets any route or middleware bail out of the normal flow and teleport straight to a single, centralized place that decides how to respond. This means individual routes don't need to duplicate "format the error response" logic — they just describe *what* went wrong, and the error handler decides *how* to present it.`,
        },
        {
          slug: "async-error-handling-in-express",
          title: "Async Error Handling in Express",
          estimatedMinutes: 9,
          content: `# Async Error Handling in Express

There's a subtle trap in Express: if an \`async\` route handler throws (for example, an \`await\`ed Prisma call rejects), Express does **not** automatically catch it and forward it to your error middleware in versions before Express 5. The request just hangs, or the process crashes depending on your setup.

## The problem

\`\`\`js
// Dangerous in Express 4: an unhandled rejection, not passed to the error handler
app.get("/api/courses/:id", async (req, res) => {
  const course = await prisma.course.findUniqueOrThrow({
    where: { id: Number(req.params.id) },
  });
  res.json(course);
});
\`\`\`

If \`findUniqueOrThrow\` rejects, this becomes an unhandled promise rejection. Depending on your Node configuration, that can crash the entire process — taking down every other in-flight request too.

## Fix 1: try/catch in every handler

\`\`\`js
app.get("/api/courses/:id", async (req, res, next) => {
  try {
    const course = await prisma.course.findUniqueOrThrow({
      where: { id: Number(req.params.id) },
    });
    res.json(course);
  } catch (error) {
    next(error); // forward to the centralized error handler
  }
});
\`\`\`

This works, but writing it in every single handler is repetitive.

## Fix 2: a reusable asyncHandler wrapper

\`\`\`js
// src/lib/asyncHandler.js
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}
\`\`\`

\`\`\`js
import { asyncHandler } from "../lib/asyncHandler.js";

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const course = await prisma.course.findUniqueOrThrow({
      where: { id: Number(req.params.id) },
    });
    res.json(course);
  })
);
\`\`\`

Now any rejection inside the wrapped function is automatically routed to \`next(error)\`, without a \`try/catch\` in every controller.

## A note on Express 5

Express 5 (released as the new default in recent Express versions) fixes this natively — async handlers that reject automatically forward the error to your error middleware, no wrapper required. Still, understanding *why* this was historically a footgun is important, since a huge amount of production code still runs on Express 4 patterns, and the underlying lesson (unhandled promise rejections are dangerous) applies well beyond Express.

## Common mistake

Wrapping only *some* handlers in \`asyncHandler\` and forgetting others. A single unwrapped \`async\` route on Express 4 is enough to reintroduce the crash risk — apply the wrapper (or try/catch) consistently across every async route.`,
        },
        {
          slug: "hashing-passwords",
          title: "Hashing Passwords",
          estimatedMinutes: 9,
          content: `# Hashing Passwords

If your API ever stores user passwords, storing them as plain text is one of the most serious mistakes you can make. If your database is ever leaked or breached, every user's password leaks with it — and because people reuse passwords, the damage spreads to their accounts on other sites too.

## Hashing, not encryption

Passwords should be **hashed**, not encrypted. Encryption is reversible (given the key); hashing is designed to be a one-way street — there's no key that turns a hash back into the original password. When a user logs in, you hash the password they typed and compare it to the stored hash; you never decrypt anything.

## Using bcrypt

\`\`\`bash
npm install bcryptjs
\`\`\`

\`\`\`js
import bcrypt from "bcryptjs";

// When a user signs up:
const passwordHash = await bcrypt.hash(plainTextPassword, 10);
await prisma.user.create({
  data: { email, passwordHash },
});
\`\`\`

The \`10\` is the **salt rounds** — it controls how computationally expensive the hash is to compute. Higher is slower (and more resistant to brute-force attacks), but also slower for legitimate logins. 10–12 is a common, reasonable default in 2026.

## Verifying a login

\`\`\`js
export async function login(req, res) {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: { message: "Invalid credentials" } });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: { message: "Invalid credentials" } });
  }

  // credentials are valid — issue a session or token next
}
\`\`\`

Notice both failure cases ("no such user" and "wrong password") return the exact same generic message and status. This is deliberate: if you said "no account with that email" specifically, you'd let an attacker discover which emails have accounts on your site just by trying logins — a real privacy leak known as user enumeration.

## Why not roll your own hashing?

Never write your own password hashing algorithm. Battle-tested libraries like bcrypt build in salting (protection against precomputed "rainbow table" attacks) and deliberate slowness by design — details that are easy to get wrong and dangerous when you do.

## Common mistake

Logging the plaintext password anywhere — including in request logging middleware, error messages, or analytics — even temporarily during debugging. Treat passwords as radioactive: hash them immediately and never let the plaintext linger anywhere else.`,
        },
        {
          slug: "sessions-vs-tokens",
          title: "Sessions vs. Tokens",
          estimatedMinutes: 9,
          content: `# Sessions vs. Tokens

Once you've verified a user's password, you need a way to recognize them on *subsequent* requests, since HTTP itself has no memory between requests. There are two dominant approaches: **sessions** and **tokens**.

## Session-based authentication (stateful)

1. On login, the server creates a session record (often in a database or in-memory store like Redis) and generates a random session ID
2. The session ID is sent to the browser as a cookie
3. On every future request, the browser automatically sends that cookie back
4. The server looks up the session ID in its store to identify the user

\`\`\`js
// Conceptual — using a library like express-session
app.post("/login", async (req, res) => {
  const user = await verifyCredentials(req.body);
  req.session.userId = user.id; // server remembers this session
  res.json({ message: "Logged in" });
});
\`\`\`

Sessions are **stateful**: the server must store session data somewhere and look it up on every request. Logging a user out is simple — just delete their session record.

## Token-based authentication (stateless)

1. On login, the server generates a signed token (commonly a JWT — covered in depth in Tier 3) containing the user's identity
2. The token is sent to the client, which stores it and attaches it to future requests (typically in an \`Authorization: Bearer <token>\` header)
3. The server verifies the token's signature on each request — no database lookup required to know *who* is asking

\`\`\`
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

Tokens are **stateless**: the server doesn't need to remember anything between requests, since all the necessary information is encoded (and cryptographically signed) inside the token itself.

## Trade-offs

| | Sessions | Tokens (e.g. JWT) |
|---|---|---|
| Server storage required | Yes | No (by default) |
| Easy to revoke instantly | Yes (delete the record) | Harder — valid until expiry unless you add a blocklist |
| Works well across multiple services/APIs | Requires a shared session store | Naturally, since the token is self-contained |
| Common client | Browser (cookies) | Browsers, mobile apps, other servers |

## Which should you pick?

Traditional server-rendered web apps with a single backend often reach for sessions — simple, and revocation is trivial. APIs consumed by mobile apps, single-page apps, or other services usually reach for tokens, since there's no shared cookie jar across different clients and services. Many production systems use a hybrid: short-lived access tokens plus a server-side record for refresh tokens, getting revocability without paying the full cost of a lookup on every single request.

The next tier goes deep on implementing JWTs specifically — signing, verifying, refreshing, and revoking them safely.`,
        },
      ],
      quiz: {
        title: "Tier 2 Checkpoint: Databases, CRUD & Auth Basics",
        questions: [
          {
            text: "In a relational database, what mechanism is typically used to represent that one row in a table relates to a row in another table?",
            optionA: "A foreign key column referencing the other table's primary key",
            optionB: "Storing both rows' data in the same column",
            optionC: "Naming both tables identically",
            optionD: "Relational databases cannot represent relationships between tables",
            correctOption: "A",
          },
          {
            text: "What is the main purpose of running `npx prisma migrate dev`?",
            optionA: "It starts the Express server",
            optionB: "It generates and applies a SQL migration so the real database matches your schema.prisma",
            optionC: "It hashes passwords stored in the database",
            optionD: "It deletes all existing data from the database",
            correctOption: "B",
          },
          {
            text: "Why should a Node.js app typically create a single shared PrismaClient instance instead of a new one per request?",
            optionA: "PrismaClient can only be imported once per file",
            optionB: "Creating one per request quickly exhausts the database's connection limit",
            optionC: "Prisma does not support being called more than once",
            optionD: "It is required in order to use async/await",
            correctOption: "B",
          },
          {
            text: "According to REST conventions covered in this tier, which route correctly represents \"create a new course\"?",
            optionA: "GET /api/createCourse",
            optionB: "POST /api/courses",
            optionC: "PUT /api/courses/new",
            optionD: "POST /api/course/create",
            correctOption: "B",
          },
          {
            text: "What is the main advantage of validating request bodies with a schema library like Zod, compared to hand-written if-statements?",
            optionA: "It removes the need for a database entirely",
            optionB: "It automatically hashes any password fields",
            optionC: "It centralizes and simplifies validation logic as the number of fields grows, with structured error output",
            optionD: "It replaces the need for HTTP status codes",
            correctOption: "C",
          },
          {
            text: "Why must an allow-list of column names be checked before using a client-supplied `sortBy` value in a Prisma `orderBy` clause?",
            optionA: "Prisma does not support sorting at all",
            optionB: "To avoid passing an arbitrary, unchecked value from the client directly into a database query parameter",
            optionC: "orderBy only works with numeric fields",
            optionD: "It is required to enable pagination",
            correctOption: "B",
          },
          {
            text: "In Express, how does a piece of middleware signal that an error occurred and hand off to the centralized error handler?",
            optionA: "By calling res.send(500)",
            optionB: "By calling next(err) instead of next()",
            optionC: "By throwing inside a synchronous middleware only",
            optionD: "By setting req.error = true",
            correctOption: "B",
          },
          {
            text: "Why is an `asyncHandler` wrapper (or a try/catch in every handler) important for async Express route handlers, especially on Express 4?",
            optionA: "Async functions cannot use req.params otherwise",
            optionB: "Without it, a rejected promise inside the handler is not automatically forwarded to the error-handling middleware",
            optionC: "It is required for TypeScript support",
            optionD: "It automatically validates the request body",
            correctOption: "B",
          },
          {
            text: "When storing user passwords, what should be saved in the database?",
            optionA: "The plaintext password, so it can be emailed back if forgotten",
            optionB: "A reversible encryption of the password",
            optionC: "A one-way hash of the password, generated with a library like bcrypt",
            optionD: "The password encoded in Base64",
            correctOption: "C",
          },
          {
            text: "What is a key practical difference between session-based and token-based (e.g. JWT) authentication?",
            optionA: "Sessions require no server-side storage, while tokens always do",
            optionB: "Sessions are stateful and require server-side storage to look up, while tokens are typically stateless and self-contained",
            optionC: "Tokens can only be used by browsers, never by mobile apps",
            optionD: "There is no meaningful difference between the two approaches",
            correctOption: "B",
          },
        ],
      },
    },
    {
      title: "JWT Authentication & Authorization",
      lessons: [
        {
          slug: "implementing-jwt-auth",
          title: "Implementing JWT Authentication",
          estimatedMinutes: 11,
          content: `# Implementing JWT Authentication

A **JWT** (JSON Web Token) is a compact, signed string that encodes claims about a user — most commonly their user ID — in a way the server can verify wasn't tampered with, without needing a database lookup.

## The structure of a JWT

A JWT has three parts, separated by dots: \`header.payload.signature\`. The header and payload are just Base64-encoded JSON; the signature is what makes the token trustworthy — it's computed from the header, payload, and a secret key only your server knows.

\`\`\`
eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjcsImlhdCI6MTcwMDAwMDAwMH0.4Z8k...
└────── header ──────┘└──────── payload ─────────┘└─ signature ─┘
\`\`\`

Anyone can *decode* the payload (it's just Base64, not encrypted) — never put secrets like passwords inside it. What makes a JWT trustworthy is that only your server can *produce a valid signature*, so tampering with the payload invalidates it.

## Signing a token on login

\`\`\`bash
npm install jsonwebtoken
\`\`\`

\`\`\`js
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  const validPassword = user && (await bcrypt.compare(password, user.passwordHash));
  if (!validPassword) {
    return res.status(401).json({ error: { message: "Invalid credentials" } });
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  res.json({ token });
}
\`\`\`

## Verifying the token on protected routes

\`\`\`js
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer <token>"
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: { message: "Missing token" } });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.userId, role: payload.role };
    next();
  } catch (error) {
    return res.status(401).json({ error: { message: "Invalid or expired token" } });
  }
}
\`\`\`

\`\`\`js
router.get("/api/me", requireAuth, (req, res) => {
  res.json({ userId: req.user.id });
});
\`\`\`

\`jwt.verify\` throws if the signature doesn't match (the token was tampered with or signed with a different secret) or if it has expired — both cases we catch and turn into a clean \`401\`.

## Why expiration matters

A token with no expiration is valid forever once issued — if it ever leaks, an attacker has permanent access. Short expiration windows (5–15 minutes is standard for access tokens) limit the damage from a leaked token, at the cost of needing a way to get new tokens without forcing the user to log in again every 15 minutes — which is exactly what refresh tokens solve, next.

## Common mistake

Storing the JWT secret directly in source code instead of an environment variable, or using a short, guessable secret like \`"secret123"\`. Use a long, random value generated specifically for this purpose, and keep it out of version control entirely.`,
        },
        {
          slug: "refresh-tokens-and-token-lifecycle",
          title: "Refresh Tokens & Token Lifecycle",
          estimatedMinutes: 10,
          content: `# Refresh Tokens & Token Lifecycle

Short-lived access tokens are safer, but forcing users to re-enter their password every 15 minutes is a terrible experience. **Refresh tokens** solve this: a longer-lived, more carefully guarded token whose only job is getting a fresh access token.

## The two-token pattern

- **Access token** — short-lived (5–15 min), sent with every API request, proves "who is this and are they still authorized right now"
- **Refresh token** — longer-lived (days to weeks), used *only* to request a new access token, and stored more carefully (e.g. an httpOnly cookie rather than in JavaScript-accessible storage)

\`\`\`js
export async function login(req, res) {
  // ...after verifying credentials
  const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
  const refreshToken = jwt.sign({ userId: user.id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id },
  });

  res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
  res.json({ accessToken });
}
\`\`\`

## Exchanging a refresh token for a new access token

\`\`\`js
export async function refresh(req, res) {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: { message: "Missing refresh token" } });

  const stored = await prisma.refreshToken.findUnique({ where: { token } });
  if (!stored) {
    return res.status(401).json({ error: { message: "Refresh token revoked or invalid" } });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = jwt.sign({ userId: payload.userId }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });
    res.json({ accessToken });
  } catch {
    return res.status(401).json({ error: { message: "Refresh token expired" } });
  }
}
\`\`\`

Notice this checks the database (\`prisma.refreshToken.findUnique\`) *in addition to* verifying the signature — this is what makes revocation possible.

## Revocation: the thing pure JWTs can't do alone

A signed JWT is valid until it expires — there's no way to "delete" it once issued, unlike a session record. Storing refresh tokens in a database (as above) gives you back that control: to log a user out everywhere, delete their stored refresh tokens. Any refresh attempt with a deleted token fails, even though the token's signature is still technically valid.

\`\`\`js
export async function logout(req, res) {
  await prisma.refreshToken.deleteMany({ where: { userId: req.user.id } });
  res.clearCookie("refreshToken");
  res.status(204).end();
}
\`\`\`

## Mental model

Think of the access token as a temporary visitor badge that expires at the end of the day, and the refresh token as the ID card you show at the front desk to get a new badge each morning — the front desk (your database) can always confiscate your ID card and refuse to issue any more badges, even if today's badge hasn't expired yet.`,
        },
        {
          slug: "role-based-authorization",
          title: "Role-Based Authorization",
          estimatedMinutes: 9,
          content: `# Role-Based Authorization

**Authentication** answers "who are you?" **Authorization** answers "are you allowed to do this?" — a logged-in user is still not allowed to do everything.

## Attaching a role to the user

Assuming your JWT payload includes a \`role\` (as shown in the previous lesson), \`requireAuth\` already populates \`req.user.role\` on every request.

## A middleware for role checks

\`\`\`js
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: { message: "Forbidden" } });
    }
    next();
  };
}
\`\`\`

\`\`\`js
router.delete(
  "/api/courses/:id",
  requireAuth,
  requireRole("admin"),
  deleteCourse
);
\`\`\`

Note the distinction: a missing or invalid token is \`401 Unauthorized\` ("we don't know who you are"); a valid, known user who simply lacks permission is \`403 Forbidden\` ("we know who you are, and the answer is no").

## Beyond roles: resource ownership

Role checks work well for broad permissions ("only admins can delete any course"), but many authorization rules depend on *which specific resource* is involved — "a user can edit their own profile, but not someone else's."

\`\`\`js
export async function updateProfile(req, res) {
  const profile = await prisma.profile.findUnique({ where: { id: Number(req.params.id) } });

  if (!profile) {
    return res.status(404).json({ error: { message: "Not found" } });
  }
  if (profile.userId !== req.user.id) {
    return res.status(403).json({ error: { message: "You can only edit your own profile" } });
  }

  const updated = await prisma.profile.update({
    where: { id: profile.id },
    data: req.body,
  });
  res.json(updated);
}
\`\`\`

This check can't live in a generic reusable middleware the same way \`requireRole\` can, since it depends on loading the specific resource first — it typically lives directly in the controller.

## A layered mental model

Think of authorization as a series of gates, each answering a narrower question:

1. \`requireAuth\` — is there a valid, unexpired token at all?
2. \`requireRole(...)\` — does this user's role permit this *category* of action?
3. An ownership check — does this user own (or otherwise have rights to) *this specific* resource?

Most real endpoints only need a subset of these three, but understanding all three prevents the common bug of checking role and forgetting ownership (or vice versa) — leaving a hole where, say, any logged-in "student" role can edit *any* student's profile instead of just their own.`,
        },
      ],
    },
    {
      title: "Securing and Hardening APIs",
      lessons: [
        {
          slug: "security-headers-with-helmet",
          title: "Security Headers with Helmet",
          estimatedMinutes: 8,
          content: `# Security Headers with Helmet

HTTP response headers can instruct browsers to enforce extra security rules on your behalf. **Helmet** is a small Express middleware that sets a sensible set of these headers with almost no configuration.

## Installing and using Helmet

\`\`\`bash
npm install helmet
\`\`\`

\`\`\`js
import helmet from "helmet";

app.use(helmet());
\`\`\`

Adding this one line sets around a dozen headers, including:

- \`X-Content-Type-Options: nosniff\` — stops browsers from guessing ("sniffing") a different content type than what you declared, which has historically enabled certain XSS attacks
- \`Strict-Transport-Security\` — tells browsers to only ever connect over HTTPS for this domain, even if a link points to \`http://\`
- \`X-Frame-Options\` / frame-ancestors — restricts whether your site can be embedded in an \`<iframe>\` elsewhere, mitigating "clickjacking"
- A restrictive default \`Content-Security-Policy\` — limits what sources scripts, styles, and other resources can be loaded from

## Revisiting CORS with a security lens

CORS (introduced in Tier 1) is also a security boundary, not just a convenience. Avoid the tempting shortcut of \`origin: "*"\` for any API that handles authenticated requests:

\`\`\`js
// Risky for anything beyond a fully public, unauthenticated API
app.use(cors({ origin: "*" }));

// Better: an explicit allow-list
const allowedOrigins = ["https://myapp.com", "https://staging.myapp.com"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
\`\`\`

\`credentials: true\` is required if you want cookies (like the refresh token cookie from the previous module) to be sent cross-origin — and it cannot be combined with a wildcard \`origin: "*"\`, by design.

## Mental model

Think of these headers as instructions you hand to every browser that talks to your API: "don't guess my content types," "never downgrade to plain HTTP," "don't let anyone else's page frame mine," "only these origins may call me with credentials." None of this replaces validating input or authenticating requests — it's a second, independent layer that closes off entire categories of browser-based attacks.

## Try it yourself

Add \`helmet()\` to an existing Express app, then inspect the response headers of a request (in your browser's Network tab, or with \`curl -I\`) before and after — you should see several new headers appear.`,
        },
        {
          slug: "rate-limiting-and-abuse-prevention",
          title: "Rate Limiting & Abuse Prevention",
          estimatedMinutes: 9,
          content: `# Rate Limiting & Abuse Prevention

Without limits, a single client (malicious or just buggy) can hammer your API with thousands of requests per second — degrading service for everyone else, or brute-forcing a login endpoint by guessing passwords rapidly. **Rate limiting** caps how many requests a client can make in a given time window.

## Adding express-rate-limit

\`\`\`bash
npm install express-rate-limit
\`\`\`

\`\`\`js
import rateLimit from "express-rate-limit";

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true, // return rate limit info in RateLimit-* headers
  legacyHeaders: false,
  message: { error: { message: "Too many requests, please try again later" } },
});

app.use("/api", apiLimiter);
\`\`\`

Requests over the limit automatically receive a \`429 Too Many Requests\` response.

## Tighter limits on sensitive routes

Login and signup endpoints deserve much stricter limits than general API traffic, since they're the target of automated password-guessing (brute-force) attacks:

\`\`\`js
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // only 10 attempts per 15 minutes per IP
  message: { error: { message: "Too many login attempts, please try again later" } },
});

router.post("/login", authLimiter, login);
router.post("/signup", authLimiter, signup);
\`\`\`

## Beyond IP-based limits

Basic rate limiting keys off IP address, which is a reasonable default but imperfect — many legitimate users can share one IP (behind a corporate NAT, for instance), while an attacker can rotate across many IPs. More advanced setups key limits off an authenticated user ID or API key once a request is authenticated, and some layer in a proxy/CDN's own rate limiting (e.g. Cloudflare) in front of the application entirely.

## Why this matters even for "trusted" internal APIs

It's tempting to skip rate limiting on APIs you assume only your own frontend calls. But a JWT is only worth as much as it costs an attacker to obtain one — and a leaked token, a compromised dependency, or a bug in your own frontend making runaway retries can all generate abusive traffic from a source that already passed authentication. Rate limiting is a defense-in-depth measure, not a replacement for authentication.

## Common mistake

Setting the same rate limit for every route. A read-only \`GET /api/courses\` can usually tolerate far more traffic than a \`POST /login\` — tune limits per route based on sensitivity and cost, not a single blanket number.`,
        },
        {
          slug: "input-sanitization-and-common-vulnerabilities",
          title: "Input Sanitization & Common Vulnerabilities",
          estimatedMinutes: 10,
          content: `# Input Sanitization & Common Vulnerabilities

Validation (Tier 2) checks that data has the right *shape*. Sanitization and vulnerability-awareness go a step further: making sure data can't be used to manipulate your system in unintended ways.

## SQL injection (and why Prisma mostly protects you)

SQL injection happens when untrusted input is concatenated directly into a query string:

\`\`\`js
// Never do this — vulnerable to SQL injection
const query = \`SELECT * FROM users WHERE email = '\${email}'\`;
\`\`\`

If \`email\` were \`' OR '1'='1\`, the query's meaning changes entirely. Prisma protects you from this by default, because its query methods (\`findMany\`, \`where\`, etc.) use parameterized queries under the hood — your data is always sent separately from the query structure, never spliced into a string. The risk reappears only if you drop down to \`prisma.$queryRawUnsafe\` with unsanitized input, which is why that method's name literally says "unsafe."

## Mass assignment

This is a subtler risk you've actually already seen a hint of in this course: passing \`req.body\` straight into a database write.

\`\`\`js
// Dangerous: what if req.body also contains { "role": "admin" }?
await prisma.user.update({ where: { id: req.user.id }, data: req.body });
\`\`\`

If your \`User\` model has a \`role\` field and a client includes \`"role": "admin"\` in their profile update request, this code would silently grant them admin access. The fix is to explicitly pick only the fields you intend to allow, ideally as part of your validation schema:

\`\`\`js
const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  bio: z.string().max(500).optional(),
  // role is deliberately NOT included — it can never be set this way
});
\`\`\`

## XSS in an API context

Cross-Site Scripting is usually framed as a frontend problem, but APIs play a role too: if your API stores a value containing \`<script>...</script>\` and a frontend later renders it without escaping, that script executes in another user's browser. As an API author, you can't control every consumer's rendering code, but you can avoid making the problem worse — for instance, stripping or escaping HTML from fields that were never meant to contain markup (like a "display name").

## NoSQL injection

If you use a NoSQL database like MongoDB, a similarly-shaped risk exists: a client sending \`{ "password": { "$ne": null } }\` instead of a string, if your query logic isn't careful, can manipulate the query's operators rather than just its values. Schema validation (Tier 2) that enforces expected *types*, not just presence, closes most of this off — rejecting an object where a string was expected.

## The unifying principle

Every vulnerability in this lesson traces back to the same root cause introduced back in Tier 1: **trusting input that came from outside your system**. Validate types and shapes, use parameterized queries (or an ORM that does it for you), and explicitly allow-list which fields can be written — never assume a client will only send what your UI intended them to.`,
        },
        {
          slug: "logging-and-observability",
          title: "Logging & Observability Basics",
          estimatedMinutes: 9,
          content: `# Logging & Observability Basics

Once an API is running in production, \`console.log\` debugging on your laptop is no longer an option — you need visibility into what's happening on a server you can't watch directly. **Observability** is the practice of instrumenting your system so you can understand its behavior after the fact.

## Structured logging

Plain text logs are fine for local development, but hard to search and filter at scale. A **structured logger** outputs each log entry as JSON, so it can be queried by field:

\`\`\`bash
npm install pino
\`\`\`

\`\`\`js
import pino from "pino";

const logger = pino();

logger.info({ userId: 7, action: "course_created", courseId: 42 }, "Course created");
// {"level":30,"time":..., "userId":7,"action":"course_created","courseId":42,"msg":"Course created"}
\`\`\`

This lets a log aggregation tool answer questions like "show me every \`course_created\` event for userId 7" instantly, instead of grepping through unstructured text.

## Request logging middleware

\`\`\`js
import pinoHttp from "pino-http";

app.use(pinoHttp({ logger }));
\`\`\`

This automatically logs every request/response pair, including the method, path, status code, and response time — the production equivalent of \`morgan\`.

## Correlating requests with an ID

In a system with multiple services, a single user action can trigger several downstream requests. Attaching a unique **request ID** to each incoming request (and passing it along to anything it calls) lets you trace one user's action across every log line it touched:

\`\`\`js
import { randomUUID } from "crypto";

app.use((req, res, next) => {
  req.id = req.headers["x-request-id"] || randomUUID();
  res.setHeader("X-Request-Id", req.id);
  next();
});
\`\`\`

## Health check endpoints

A minimal but essential piece of observability: a route that lets infrastructure (load balancers, orchestration systems) ask "are you alive and able to serve traffic?"

\`\`\`js
app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw\`SELECT 1\`; // confirms the database connection works too
    res.status(200).json({ status: "ok" });
  } catch {
    res.status(503).json({ status: "unavailable" });
  }
});
\`\`\`

## What to log, and what never to log

Log enough to diagnose problems: request paths, status codes, timing, and relevant IDs (user ID, resource ID). Never log secrets — passwords, tokens, full credit card numbers — even at debug level, since logs often live longer and are read by more people than the code that produced them.

## Mental model

If metrics tell you *that* something is wrong (error rate spiked at 2pm), logs tell you *why* — the specific requests, inputs, and errors involved. Treat logging as a feature you build deliberately, not an afterthought you bolt on once something breaks.`,
        },
      ],
    },
    {
      title: "Caching Strategies & Redis",
      lessons: [
        {
          slug: "http-caching-headers",
          title: "HTTP Caching Headers",
          estimatedMinutes: 8,
          content: `# HTTP Caching Headers

Not every request needs to hit your database. A course listing that changes once a day doesn't need to be recomputed on every single request — **caching** lets you serve a stored answer instead, dramatically reducing load and latency. The simplest form of caching requires no extra infrastructure at all: HTTP headers that tell clients and intermediaries (browsers, CDNs) when they can reuse a previous response.

## Cache-Control

\`\`\`js
app.get("/api/courses", async (req, res) => {
  const courses = await prisma.course.findMany();
  res.set("Cache-Control", "public, max-age=60"); // safe to reuse for 60 seconds
  res.json(courses);
});
\`\`\`

\`max-age=60\` tells any caching layer (the browser, a CDN) that this response can be reused for 60 seconds without asking your server again. \`public\` allows shared caches (like a CDN) to store it, not just the requesting browser; use \`private\` for responses that are specific to one user (like \`/api/me\`) and shouldn't be cached by shared infrastructure.

## ETag: cache validation

\`max-age\` alone means a client might serve stale data for up to 60 seconds even after a real change. An **ETag** is a fingerprint of the response body that lets a client ask "has this changed since I last saw ETag X?" without re-downloading the whole thing if the answer is no:

\`\`\`js
import { createHash } from "crypto";

app.get("/api/courses/:id", async (req, res) => {
  const course = await prisma.course.findUnique({ where: { id: Number(req.params.id) } });
  const etag = createHash("sha1").update(JSON.stringify(course)).digest("hex");

  if (req.headers["if-none-match"] === etag) {
    return res.status(304).end(); // 304 Not Modified — client's cached copy is still valid
  }

  res.set("ETag", etag);
  res.json(course);
});
\`\`\`

A \`304 Not Modified\` response has no body at all — the client already has the right data, so you've saved the cost of resending it, while still confirming freshness on every request.

## Which endpoints should be cacheable

Caching is safe for data that's read far more often than it changes, and where being briefly stale is acceptable — a public course catalog is a great candidate. It's usually wrong for anything user-specific, security-sensitive, or that must always reflect the very latest state (an account balance, a real-time notification count).

## Common mistake

Adding \`Cache-Control: public, max-age=3600\` to an authenticated, per-user endpoint like \`/api/me\`. A shared cache (or even the browser, on a shared computer) could then serve one user's data to another. Always mark user-specific responses \`private\`, or don't cache them at all.

## Try it yourself

Add an ETag to the \`GET /api/courses/:id\` endpoint from earlier in this course, and verify with curl (\`curl -I\` to see headers, then a second request with \`-H "If-None-Match: <etag>"\`) that the second request returns \`304 Not Modified\`.`,
        },
        {
          slug: "caching-with-redis",
          title: "Application-Level Caching with Redis",
          estimatedMinutes: 9,
          content: `# Application-Level Caching with Redis

HTTP caching headers help clients and CDNs avoid re-requesting data. But your own server still has to compute the response the *first* time — and often, that means an expensive database query running again and again for the same popular request. **Redis**, an in-memory data store, is the standard tool for caching that computation on the server side.

## Why an in-memory store

A database query might take tens of milliseconds; reading the same value from Redis typically takes under a millisecond, because it's served straight from memory rather than read from disk and processed by a full query engine. For data that's read far more often than it's written — a popular course's details, a leaderboard, a homepage listing — this difference adds up enormously under real traffic.

## The cache-aside pattern

The most common caching strategy: check the cache first; on a miss, compute the real answer and store it in the cache for next time.

\`\`\`bash
npm install ioredis
\`\`\`

\`\`\`js
import Redis from "ioredis";

const redis = new Redis(process.env.REDIS_URL);

export async function getCourse(req, res) {
  const cacheKey = \`course:\${req.params.id}\`;

  const cached = await redis.get(cacheKey);
  if (cached) {
    return res.json(JSON.parse(cached)); // cache hit — no database query at all
  }

  const course = await prisma.course.findUnique({ where: { id: Number(req.params.id) } });
  if (!course) return res.status(404).json({ error: { message: "Not found" } });

  await redis.set(cacheKey, JSON.stringify(course), "EX", 300); // cache for 5 minutes
  res.json(course);
}
\`\`\`

\`"EX", 300\` sets a **TTL** (time-to-live) of 300 seconds — after that, Redis automatically discards the entry, and the next request falls back to the database and re-populates the cache.

## The hard part: invalidation

There's a well-known saying that cache invalidation is one of the genuinely hard problems in computer science — and the reason is straightforward: your cached copy and the real data can drift apart the moment the real data changes.

\`\`\`js
export async function updateCourse(req, res) {
  const course = await prisma.course.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });

  await redis.del(\`course:\${course.id}\`); // invalidate the now-stale cache entry
  res.json(course);
}
\`\`\`

Whenever you write data that might be cached, explicitly delete (or update) the corresponding cache entry in the same operation — otherwise clients can keep seeing outdated data until the TTL happens to expire.

## Choosing a TTL

A short TTL (seconds) keeps staleness windows small but gives up more of the performance benefit, since the cache expires and refills constantly. A long TTL (hours) maximizes the performance win but risks serving noticeably stale data if you forget to invalidate somewhere. There's no universal right answer — it depends on how tolerant your data is of being briefly out of date.

## Mental model

Think of Redis as a fast, temporary notepad sitting in front of your "real" database (the permanent filing cabinet). Reading from the notepad is nearly free; reading from the filing cabinet is slower but authoritative. The discipline that makes this work is making sure that whenever the filing cabinet changes, you also update (or tear a page out of) the notepad — otherwise the notepad quietly becomes wrong.

## Try it yourself

Add cache-aside caching to the \`GET /api/courses/:id\` endpoint, with a 60-second TTL, and make sure the corresponding \`updateCourse\` and \`deleteCourse\` handlers both invalidate that cache key.`,
        },
      ],
    },
    {
      title: "Background Jobs & Message Queues",
      lessons: [
        {
          slug: "why-background-jobs",
          title: "Why Background Jobs Exist",
          estimatedMinutes: 8,
          content: `# Why Background Jobs Exist

Every request/response cycle covered so far in this course happens synchronously: the client waits while your handler runs, then gets a response. That works fine for a database query taking a few milliseconds. It breaks down the moment a request needs to do something slow — sending an email, generating a PDF, resizing an uploaded image, calling a flaky third-party API.

## The problem with doing slow work inline

\`\`\`js
export async function signup(req, res) {
  const user = await prisma.user.create({ data: req.body });
  await emailService.sendWelcomeEmail(user.email); // what if this takes 4 seconds? or fails?
  res.status(201).json(user);
}
\`\`\`

If the email provider is slow, the client waits unnecessarily long for a response that has nothing to do with sending an email. Worse, if it fails, do you fail the whole signup? The user was already created — that's confusing at best, and at worst you've now built a system where a flaky email provider can bring down account creation entirely.

## The fix: push slow work into the background

Instead of doing the slow work inline, you enqueue a description of *what needs to happen*, respond to the client immediately, and let a separate process handle it:

\`\`\`js
export async function signup(req, res) {
  const user = await prisma.user.create({ data: req.body });
  await emailQueue.add("welcome-email", { userId: user.id }); // fast — just writes a job
  res.status(201).json(user); // client doesn't wait on the email at all
}
\`\`\`

The client gets their response in milliseconds. Somewhere else — a separate **worker** process — a job runs moments later that actually sends the email, independent of the original request's lifecycle.

## What belongs in a background job

Good candidates share a pattern: they're slow, they don't need to finish before you can respond, and the caller doesn't need the result synchronously.

- Sending emails or push notifications
- Generating reports, PDFs, or thumbnails
- Calling third-party APIs that don't need to block the response
- Any bulk operation (e.g. re-indexing search, recalculating stats for thousands of rows)

Bad candidates: anything the client's response actually depends on. If a request needs the result immediately to decide what to show the user, it isn't a good fit for "process this eventually."

## Why not just fire-and-forget with an unawaited promise

\`\`\`js
// Tempting, but fragile
export async function signup(req, res) {
  const user = await prisma.user.create({ data: req.body });
  emailService.sendWelcomeEmail(user.email); // not awaited — "fire and forget"
  res.status(201).json(user);
}
\`\`\`

This looks similar, but has none of the guarantees a real queue gives you: if the process crashes right after this line, the email is simply never sent, with no record it was ever supposed to happen and no automatic retry. A real job queue persists the job (usually in Redis or a database) before confirming, so it survives a crash and can be retried on failure.

## Mental model

A background job queue is a durable to-do list sitting between "the moment something needs to happen" and "the moment it actually happens." The web request's only job is to write a clear to-do item down reliably; a separate worker's only job is to work through that list, retrying failures, independent of any particular request's timeline.

## Try it yourself

Look back at the signup handler from earlier in this course and identify one piece of work inside it that a user shouldn't have to wait on synchronously — that's a candidate for the queue you'll build in the next lesson.`,
        },
        {
          slug: "building-a-queue-with-bullmq",
          title: "Building a Job Queue with BullMQ",
          estimatedMinutes: 10,
          content: `# Building a Job Queue with BullMQ

**BullMQ** is the most widely used job queue library in the Node.js ecosystem, built on top of Redis. It gives you durable job storage, automatic retries, and a clean API for both enqueuing work and processing it.

## Installing and creating a queue

\`\`\`bash
npm install bullmq
\`\`\`

\`\`\`js
// src/queues/email.queue.js
import { Queue } from "bullmq";

export const emailQueue = new Queue("email", {
  connection: { host: "localhost", port: 6379 },
});
\`\`\`

## Adding a job

\`\`\`js
export async function signup(req, res) {
  const user = await prisma.user.create({ data: req.body });

  await emailQueue.add(
    "welcome-email",
    { userId: user.id },
    { attempts: 3, backoff: { type: "exponential", delay: 1000 } }
  );

  res.status(201).json(user);
}
\`\`\`

\`attempts: 3\` tells BullMQ to retry the job up to three times if it throws, with \`backoff\` controlling how long to wait between retries — here, exponentially increasing delays, so a temporarily-down email provider gets progressively more breathing room before the next attempt.

## Processing jobs with a worker

The actual work happens in a separate **worker** — typically a different running process from your API server, so a slow or crashing job never affects request handling:

\`\`\`js
// worker.js — run separately, e.g. \`node worker.js\`
import { Worker } from "bullmq";
import { prisma } from "./src/lib/prisma.js";
import { sendWelcomeEmail } from "./src/lib/email.js";

const worker = new Worker(
  "email",
  async (job) => {
    const user = await prisma.user.findUnique({ where: { id: job.data.userId } });
    await sendWelcomeEmail(user.email);
  },
  { connection: { host: "localhost", port: 6379 } }
);

worker.on("failed", (job, err) => {
  console.error("Job", job.id, "failed after all retries:", err);
});
\`\`\`

## Why a separate process

Running the worker in the same process as your API server is possible, but defeats much of the purpose — a burst of slow jobs would still compete with your API server for the same CPU and memory. In production, the API server and worker(s) are typically deployed and scaled independently: if emails start backing up, you scale up worker instances without touching the API server at all.

## Job status and monitoring

BullMQ tracks every job's state (waiting, active, completed, failed) in Redis, and tools like Bull Board give you a web dashboard to inspect the queue — how many jobs are pending, which ones failed and why, and the ability to manually retry a stuck job.

## Mental model

Think of the queue (Redis) as a mailbox, the API server as whoever drops letters into it, and the worker as the person who actually opens and processes each letter — on their own schedule, potentially much later, and completely decoupled from whoever dropped the letter in. If the person processing letters goes on vacation (a worker crashes), the mailbox still holds every unprocessed letter safely until a new worker picks up where things left off.

## Common mistake

Forgetting to run the worker at all in a given environment (easy to do if it's a separate process from the API server) — jobs pile up in the queue, silently never processed, with no error at all on the API side since enqueuing a job succeeds instantly regardless of whether anything is around to work through it.

## Try it yourself

Using the signup handler from earlier in this course, replace the inline \`sendWelcomeEmail\` call with \`emailQueue.add(...)\`, and write a minimal worker file that processes it.`,
        },
      ],
    },
    {
      title: "Real-Time APIs with WebSockets",
      lessons: [
        {
          slug: "websockets-vs-http-request-response",
          title: "WebSockets vs. HTTP Request/Response",
          estimatedMinutes: 8,
          content: `# WebSockets vs. HTTP Request/Response

Every endpoint built so far in this course follows the same shape: the client asks a question (a request), the server answers (a response), and the connection is done. That model can't express "tell me the moment something happens" — a new chat message, a live notification, a course's enrollment count ticking up in real time. For that, you need a fundamentally different kind of connection.

## The limits of request/response for real-time features

The naive workaround is **polling** — the client repeatedly asks "anything new?" every few seconds:

\`\`\`js
// Client-side: asking again and again, even when nothing has changed
setInterval(async () => {
  const res = await fetch("/api/notifications/unread");
  updateUI(await res.json());
}, 3000);
\`\`\`

This works, but wastes requests when nothing has changed, and introduces up to a few seconds of lag before the client notices something new — neither of which is acceptable for a live chat or collaborative feature.

## What a WebSocket actually is

A **WebSocket** is a long-lived, two-way connection between client and server, established with a single HTTP handshake and then kept open. Unlike HTTP, either side can send a message to the other *at any time*, without the other side having asked first.

\`\`\`
HTTP:       client -- request --> server
            client <-- response -- server
            (connection closes)

WebSocket:  client <== open connection ==> server
            (either side can send, at any time, until closed)
\`\`\`

## When to reach for WebSockets

- Chat and messaging features
- Live notifications or activity feeds
- Collaborative editing (multiple users seeing each other's changes instantly)
- Live dashboards (a course's enrollment count updating as it happens)

## When plain REST is still the better choice

Most of an API's surface — fetching a course, creating an enrollment, updating a profile — is a genuine question-then-answer interaction with no ongoing relationship after the response. Forcing that through a WebSocket adds real complexity (managing connection state, reconnection logic, no built-in caching or standard status codes) for no benefit. Real production systems very often use both: REST for standard CRUD, WebSockets layered in specifically for the handful of features that are genuinely real-time.

## Mental model

Think of HTTP request/response as sending a letter and waiting for a reply — one exchange, then done. A WebSocket is more like a phone call: once connected, either person can speak at any moment, and the line stays open until someone hangs up. Reach for a phone call only for the conversations that actually need it.

## Try it yourself

Look at the feature list for a product you use daily (a chat app, a food delivery tracker, a live sports score app) and identify which parts are almost certainly built on WebSockets (or a similar real-time transport) versus which parts are almost certainly regular request/response REST calls underneath.`,
        },
        {
          slug: "building-realtime-features-with-socketio",
          title: "Building Real-Time Features with Socket.IO",
          estimatedMinutes: 10,
          content: `# Building Real-Time Features with Socket.IO

Raw WebSockets (the \`ws\` library, or the browser's built-in \`WebSocket\` API) are usable directly, but handle reconnection, fallback transports, and message routing all by hand. **Socket.IO** is the most widely used library for real-time features in Node.js, layering a friendlier API — and some resilience — on top.

## Setting up a Socket.IO server

\`\`\`bash
npm install socket.io
\`\`\`

\`\`\`js
import { createServer } from "http";
import { Server } from "socket.io";
import app from "./src/app.js";

const httpServer = createServer(app); // Socket.IO needs the raw HTTP server, not just the Express app
const io = new Server(httpServer, {
  cors: { origin: "https://myapp.com" },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

httpServer.listen(3000);
\`\`\`

Notice Express itself is unchanged — Socket.IO attaches to the same underlying HTTP server, so your existing REST routes keep working exactly as before, side by side with the new real-time layer.

## Sending and receiving events

Socket.IO communicates through named **events**, in both directions:

\`\`\`js
// Server: listen for an event from a specific client
io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    // Broadcast it to everyone else connected
    socket.broadcast.emit("new-message", {
      text: data.text,
      userId: socket.data.userId,
    });
  });
});
\`\`\`

\`\`\`js
// Client (browser)
import { io } from "socket.io-client";

const socket = io("https://myapp.com");

socket.emit("send-message", { text: "Hello!" });

socket.on("new-message", (message) => {
  console.log("New message:", message);
});
\`\`\`

## Rooms: scoping broadcasts

Broadcasting to *every* connected client is rarely what you want — a course's live discussion shouldn't reach users viewing a different course. **Rooms** let you group connections and target messages precisely:

\`\`\`js
io.on("connection", (socket) => {
  socket.on("join-course", (courseId) => {
    socket.join("course:" + courseId);
  });

  socket.on("send-message", ({ courseId, text }) => {
    io.to("course:" + courseId).emit("new-message", { text });
  });
});
\`\`\`

Only clients who've joined that course's room receive the message — everyone else's connection is unaffected.

## Authenticating socket connections

A WebSocket connection needs its own authentication step, since it isn't a normal HTTP request carrying an Authorization header on every message:

\`\`\`js
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    socket.data.userId = payload.userId;
    next();
  } catch {
    next(new Error("Authentication failed"));
  }
});
\`\`\`

This middleware runs once, when the connection is first established — after that, \`socket.data.userId\` is available for the lifetime of that connection, without needing to re-verify a token on every single event.

## Mental model

An HTTP route handler runs once per request and then is done. A Socket.IO connection handler runs once per *connection*, and stays alive listening for events for as long as that connection is open — closer in shape to a long-running conversation than a single transaction.

## Try it yourself

Sketch (in comments or pseudocode, no need to fully build it) a room-based feature for live enrollment counts: when a student enrolls via the normal REST \`POST /api/courses/:id/enroll\` endpoint from earlier in this course, emit an event to everyone in that course's room with the updated count.`,
        },
      ],
    },
    {
      title: "GraphQL as an Alternative to REST",
      lessons: [
        {
          slug: "graphql-fundamentals",
          title: "GraphQL Fundamentals",
          estimatedMinutes: 9,
          content: `# GraphQL Fundamentals

Every API in this course has been REST: a fixed set of endpoints, each returning a fixed shape of data. **GraphQL** is a different approach — instead of many endpoints, there's a single endpoint, and the client describes exactly what data it wants in the request itself.

## The problem GraphQL solves: over-fetching and under-fetching

Consider a screen that needs a course's title and its instructor's name. With REST, that's often two round trips (or a bespoke endpoint built just for this one screen):

\`\`\`
GET /api/courses/42        -> { id, title, price, description, category, ... }  (way more than needed)
GET /api/instructors/7     -> { id, name, bio, avatarUrl, ... }                  (a second round trip)
\`\`\`

Fetching more fields than you need is **over-fetching**; needing multiple requests to assemble one screen's data is **under-fetching**. Both get worse as an app's screens multiply, since each new screen either reuses an ill-fitting endpoint or needs a new bespoke one built for it.

## A GraphQL query

GraphQL replaces this with one request, shaped exactly like the data the client actually needs:

\`\`\`graphql
query {
  course(id: 42) {
    title
    instructor {
      name
    }
  }
}
\`\`\`

\`\`\`json
{
  "data": {
    "course": {
      "title": "Node.js APIs",
      "instructor": { "name": "Jordan Lee" }
    }
  }
}
\`\`\`

One request, and the response contains exactly the fields asked for — nothing more, nothing the client has to discard.

## Schemas: the contract

Every GraphQL API is described by a **schema** — a strongly-typed definition of every type and the queries/mutations available:

\`\`\`graphql
type Course {
  id: ID!
  title: String!
  price: Float!
  instructor: Instructor!
}

type Instructor {
  id: ID!
  name: String!
}

type Query {
  course(id: ID!): Course
  courses: [Course!]!
}
\`\`\`

The \`!\` marks a field as non-nullable — the schema itself is a contract clients can rely on and tooling can validate against, not unlike the OpenAPI specs from earlier in this course, but native to GraphQL rather than layered on top of REST.

## Queries vs. mutations

Reading data uses a \`query\`; changing data uses a \`mutation\` — the GraphQL equivalent of REST's GET versus POST/PUT/PATCH/DELETE:

\`\`\`graphql
mutation {
  createCourse(title: "GraphQL Basics", price: 0) {
    id
    title
  }
}
\`\`\`

## Trade-offs versus REST

GraphQL isn't strictly "better" — it trades one set of problems for another. You gain flexible, precise queries and a single strongly-typed schema; you give up REST's simple, cacheable-by-URL model (a single \`/graphql\` endpoint makes HTTP-level caching, like the Cache-Control/ETag techniques from earlier in this course, much harder to apply directly) and take on new complexity around query depth limits, since a client could in principle request deeply nested data that's expensive for the server to resolve.

## Mental model

REST hands the client a fixed menu of endpoints, each returning a fixed dish. GraphQL hands the client the full pantry (the schema) and lets them describe the exact meal they want in one order — more flexible, but the kitchen needs to be built to handle arbitrary combinations rather than a known, fixed set of dishes.

## Try it yourself

Sketch a GraphQL query (no need to run it) that fetches a course's title along with the titles of all its lessons — the same relationship modeled with Prisma's \`include\` earlier in this course, expressed instead as a client-driven GraphQL query.`,
        },
        {
          slug: "building-a-graphql-api",
          title: "Building a Basic GraphQL API",
          estimatedMinutes: 10,
          content: `# Building a Basic GraphQL API

Let's turn the schema from the previous lesson into a working endpoint, using **Apollo Server** — one of the most widely used GraphQL server libraries for Node.js — mounted directly onto an existing Express app.

## Installing and setting up

\`\`\`bash
npm install @apollo/server graphql
\`\`\`

\`\`\`js
// src/graphql/schema.js
export const typeDefs = \`#graphql
  type Course {
    id: ID!
    title: String!
    price: Float!
  }

  type Query {
    courses: [Course!]!
    course(id: ID!): Course
  }

  type Mutation {
    createCourse(title: String!, price: Float!): Course!
  }
\`;
\`\`\`

## Resolvers: connecting the schema to real data

A **resolver** is a function that knows how to fetch the actual data for one field in the schema — this is where Prisma finally shows up, exactly as it has throughout this course:

\`\`\`js
// src/graphql/resolvers.js
import { prisma } from "../lib/prisma.js";

export const resolvers = {
  Query: {
    courses: () => prisma.course.findMany(),
    course: (_parent, { id }) => prisma.course.findUnique({ where: { id: Number(id) } }),
  },
  Mutation: {
    createCourse: (_parent, { title, price }) =>
      prisma.course.create({ data: { title, price } }),
  },
};
\`\`\`

Each key under \`Query\` and \`Mutation\` matches a field name from the schema, and receives the arguments the client passed in (\`id\`, \`title\`, \`price\`) as its second parameter.

## Mounting Apollo Server on Express

\`\`\`js
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import { typeDefs } from "./graphql/schema.js";
import { resolvers } from "./graphql/resolvers.js";

const app = express();

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

app.use("/graphql", express.json(), expressMiddleware(apolloServer));

// existing REST routes continue to work unchanged, side by side
app.use("/api/courses", coursesRouter);
\`\`\`

A single GraphQL endpoint (\`/graphql\`) now sits alongside every REST route this course has built — GraphQL and REST are not mutually exclusive, and plenty of real systems run both, migrating gradually rather than all at once.

## Resolving nested fields

To answer the "course with its instructor's name" query from the previous lesson, add a resolver for the *relationship*, not just the top-level query:

\`\`\`js
export const resolvers = {
  Query: {
    course: (_parent, { id }) => prisma.course.findUnique({ where: { id: Number(id) } }),
  },
  Course: {
    instructor: (course) =>
      prisma.instructor.findUnique({ where: { id: course.instructorId } }),
  },
};
\`\`\`

GraphQL calls the \`Course.instructor\` resolver automatically, only when a client's query actually asks for \`instructor\` — a field nobody requested is never resolved, which is the mechanism that avoids over-fetching under the hood.

## Common mistake

Writing a resolver that triggers a fresh database query per nested field, per item in a list — the GraphQL equivalent of the N+1 problem from earlier in this course, and just as easy to introduce by accident. Tools like \`DataLoader\` batch and cache these lookups within a single request, the same way Prisma's \`include\` avoids N+1 in a plain REST context.

## Try it yourself

Extend the schema and resolvers above with a \`deleteCourse(id: ID!): Boolean!\` mutation, backed by \`prisma.course.delete\`, and test it by sending a \`mutation { deleteCourse(id: "1") }\` request to \`/graphql\`.`,
        },
      ],
    },
    {
      title: "Containerizing & Automating Deployment",
      lessons: [
        {
          slug: "containerizing-with-docker",
          title: "Containerizing Your API with Docker",
          estimatedMinutes: 10,
          content: `# Containerizing Your API with Docker

"It works on my machine" is a real, common failure mode: your API runs fine locally, but breaks in production because of a different Node version, a missing system dependency, or subtly different configuration. **Docker** solves this by packaging your application together with everything it needs to run, into a single, portable unit called a **container**.

## Writing a Dockerfile

A \`Dockerfile\` is a recipe describing how to build your application's container image, step by step:

\`\`\`dockerfile
# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

RUN npx prisma generate

EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

- \`FROM node:20-alpine\` starts from a small, official Node.js base image
- \`COPY package*.json ./\` followed by \`RUN npm ci\` installs dependencies *before* copying the rest of the code — Docker caches this step, so re-building after a code-only change doesn't reinstall every dependency from scratch
- \`CMD\` defines what runs when a container starts

## Building and running the image

\`\`\`bash
docker build -t my-api .
docker run -p 3000:3000 --env-file .env my-api
\`\`\`

\`docker build\` produces a self-contained image; \`docker run\` starts a container from it, mapping port 3000 inside the container to port 3000 on your machine, and injecting environment variables from \`.env\`.

## Multi-stage builds

For a leaner production image, separate the "build" environment (which needs dev dependencies, compilers, etc.) from the "runtime" environment (which needs only the compiled output and production dependencies):

\`\`\`dockerfile
# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: runtime
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
CMD ["node", "dist/server.js"]
\`\`\`

The final image contains only what's needed to *run* the app, not the tools that were needed to *build* it — smaller images mean faster deploys and a smaller attack surface.

## Orchestrating with docker-compose

Real APIs rarely run alone — this course's API needs Postgres, and (from the caching and queue lessons) Redis too. \`docker-compose\` describes a whole group of containers and how they connect:

\`\`\`yaml
# docker-compose.yml
services:
  api:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/mydb
      REDIS_URL: redis://cache:6379
    depends_on: [db, cache]
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: postgres
  cache:
    image: redis:7
\`\`\`

\`docker compose up\` starts all three services together, on a shared network where each can reach the others by service name (\`db\`, \`cache\`) instead of \`localhost\`.

## Mental model

Think of a Docker image as a frozen, exact snapshot of "everything needed to run this app" — the Node version, system libraries, your code, and your dependencies — shippable as a single artifact that behaves identically on your laptop, a teammate's machine, and a production server.

## Try it yourself

Write a \`Dockerfile\` for a simple Express app (your own, or the examples from earlier in this course), build it with \`docker build\`, and run it locally with \`docker run -p 3000:3000\` — confirm the containerized version responds identically to running it directly with \`node server.js\`.`,
        },
        {
          slug: "ci-cd-basics-for-apis",
          title: "CI/CD Basics for APIs",
          estimatedMinutes: 9,
          content: `# CI/CD Basics for APIs

You've built tests (Tier 3), a Dockerfile (previous lesson), and a real API. **CI/CD** (Continuous Integration / Continuous Deployment) is the practice of automating what happens next: running your tests on every change, and deploying automatically once they pass — instead of a person manually running tests and pushing code by hand.

## Continuous Integration: running tests automatically

The core idea of CI is simple: every time code is pushed, an automated pipeline checks it out, installs dependencies, and runs your test suite — catching regressions before they ever reach another developer or production.

\`\`\`yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        ports: ["5432:5432"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: postgresql://postgres:postgres@localhost:5432/postgres
      - run: npm test
\`\`\`

This GitHub Actions workflow runs on every push and pull request: it spins up a real Postgres database as a service, installs dependencies, applies migrations, and runs the exact Supertest suite built in Tier 3 — automatically, without anyone running it locally first.

## Continuous Deployment: shipping automatically

Once CI passes, CD takes over — automatically deploying the new code, typically only from your main branch:

\`\`\`yaml
# added to the same workflow, or a separate one
  deploy:
    needs: test # only runs if the test job succeeds
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - run: echo "Deploy step -- e.g. trigger your hosting platform's deploy hook"
\`\`\`

\`needs: test\` is the crucial line — it guarantees deployment only happens if the test job passed, turning "did we remember to test before deploying" from a habit into something the system enforces for you.

## Why this matters even for a small project

It's tempting to think CI/CD is only worth setting up once a team is large. In practice, the payoff shows up immediately: a pipeline that runs your tests on every push catches a broken change within minutes, whether you're a solo developer or a team of fifty — and it means "did I break anything?" is answered automatically, rather than depending on someone remembering to run \`npm test\` before pushing.

## A typical full pipeline

Putting this course's tools together, a realistic pipeline: push code, then CI installs dependencies and runs the Supertest suite against a real database service, then on success it builds the Docker image from the previous lesson, pushes that image to a registry, and triggers the hosting platform to deploy the new image. Each step only runs if the previous one succeeded, so a broken test or a failed build stops the pipeline before anything reaches production.

## Mental model

CI/CD turns "please remember to test and deploy carefully" — a fragile human habit — into a pipeline the system enforces every single time, automatically. The tests and Dockerfile you already built earlier in this course are exactly what CI/CD automates; this lesson isn't a new skill so much as wiring up the ones you already have.

## Try it yourself

Write a minimal GitHub Actions workflow (even without a real repository to run it in) that checks out code, installs dependencies with \`npm ci\`, and runs \`npm test\` on every push to \`main\` — the smallest possible useful CI pipeline.`,
        },
      ],
    },
    {
      title: "Testing & Production-Ready Structure",
      lessons: [
        {
          slug: "testing-apis-with-supertest",
          title: "Testing APIs with Supertest",
          estimatedMinutes: 11,
          content: `# Testing APIs with Supertest

Manually poking endpoints with curl or Postman works while you're building a feature, but it doesn't scale — and it does nothing to stop a future change from silently breaking something that used to work. Automated tests do.

## Setting up

\`\`\`bash
npm install --save-dev vitest supertest
\`\`\`

Supertest lets you make real HTTP-like requests against your Express \`app\` object directly, without actually binding to a network port.

## A basic route test

\`\`\`js
// tests/courses.test.js
import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("GET /api/courses", () => {
  it("returns a list of courses with status 200", async () => {
    const response = await request(app).get("/api/courses");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe("POST /api/courses", () => {
  it("creates a course and returns 201", async () => {
    const response = await request(app)
      .post("/api/courses")
      .send({ title: "Testing 101", price: 0 });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Testing 101");
  });

  it("rejects a request missing a required field with 400", async () => {
    const response = await request(app).post("/api/courses").send({ price: 0 });

    expect(response.status).toBe(400);
  });
});
\`\`\`

Notice the test structure mirrors what you'd check manually: send a request, assert on the status code, assert on the shape of the body. The difference is these run automatically, in seconds, every time you change code.

## Testing against a real (but isolated) database

Mocking the database entirely can hide real bugs (like a Prisma query that's subtly wrong). A common approach is to run tests against a real, separate test database — often reset between test runs or wrapped in a transaction that's rolled back afterward — so tests reflect real query behavior without polluting development data.

\`\`\`js
// .env.test
DATABASE_URL=postgresql://localhost:5432/mydb_test
\`\`\`

## Testing authenticated routes

\`\`\`js
it("rejects deleting a course without a token", async () => {
  const response = await request(app).delete("/api/courses/1");
  expect(response.status).toBe(401);
});

it("allows an admin to delete a course", async () => {
  const token = signTestToken({ userId: 1, role: "admin" });
  const response = await request(app)
    .delete("/api/courses/1")
    .set("Authorization", \`Bearer \${token}\`);
  expect(response.status).toBe(204);
});
\`\`\`

## Mental model

Think of a test suite as a second, tireless QA engineer who re-checks every endpoint you've ever built, every single time you make a change — catching regressions before your users (or a code reviewer) ever have to.

## Try it yourself

Pick one endpoint you built earlier in this course and write two tests for it: one confirming the success path, and one confirming it correctly rejects invalid input.`,
        },
        {
          slug: "structuring-a-production-api",
          title: "Structuring a Production API",
          estimatedMinutes: 12,
          content: `# Structuring a Production API

You've now touched every piece of a real API — routing, middleware, a database, validation, auth, security, and tests. This capstone lesson pulls it together into the shape a production codebase actually takes.

## Layered architecture

Rather than putting database calls directly inside controllers (as this course did for simplicity), production codebases typically separate concerns into layers:

\`\`\`
src/
├── routes/        → defines URLs and HTTP methods, wires up middleware
├── controllers/    → translates HTTP req/res into calls on the service layer
├── services/       → business logic ("what does creating a course *mean*")
├── repositories/    → the only layer that talks to Prisma/the database directly
├── middleware/     → auth, validation, rate limiting, error handling
├── lib/            → shared utilities (asyncHandler, ApiError, logger, prisma client)
└── app.js          → wires everything together
\`\`\`

\`\`\`js
// controllers/courses.controller.js
export const createCourse = asyncHandler(async (req, res) => {
  const course = await coursesService.create(req.body);
  res.status(201).json(course);
});
\`\`\`

\`\`\`js
// services/courses.service.js
export async function create(data) {
  if (data.price < 0) throw new ApiError(400, "Price cannot be negative");
  return coursesRepository.create(data);
}
\`\`\`

\`\`\`js
// repositories/courses.repository.js
export function create(data) {
  return prisma.course.create({ data });
}
\`\`\`

## Why bother with this many layers?

- **Testability** — you can test business logic (the service layer) without spinning up HTTP at all, and swap the repository for a fake in tests
- **Swappability** — if you ever migrate away from Prisma, only the repository layer changes; controllers and services are untouched
- **Clarity** — a controller's job is obvious at a glance ("handle HTTP"), rather than a 200-line function mixing validation, business rules, and raw queries

For a small project, this can be overkill — a flatter structure (routes + controllers, database calls inline) is a completely reasonable choice, and this course used exactly that for most of its examples. Reach for the layered version once a codebase and team grow large enough that the separation pays for itself.

## API versioning

APIs evolve, but you can't force every client to upgrade the instant you change something. Versioning gives you room to change an API without breaking existing consumers.

\`\`\`js
app.use("/api/v1/courses", coursesV1Router);
app.use("/api/v2/courses", coursesV2Router);
\`\`\`

The most common approach is a version prefix in the URL path (\`/api/v1/...\`), since it's simple, visible, and cache-friendly. Some APIs instead version via a request header (\`Accept: application/vnd.myapi.v2+json\`), which keeps URLs stable but is less discoverable. Whichever you choose, the underlying discipline matters more than the mechanism: never make a breaking change to a version that's already in use by clients you don't control.

## The full request journey, end to end

By now you can trace a request through every layer this course covered: it arrives at Express, passes through security middleware (Helmet, CORS, rate limiting), gets logged, is authenticated (JWT) and authorized (role/ownership checks), is validated against a schema, flows through a controller into a service into a repository that queries the database via Prisma, and an error at any step is caught and formatted consistently by centralized error-handling middleware.

## Mental model

A production API isn't one clever trick — it's the disciplined, consistent application of everything in this course, layer by layer, endpoint by endpoint. The frameworks and libraries change over the years; the underlying shape (validate input, authenticate, authorize, persist, respond predictably, handle failure gracefully) does not.`,
        },
        {
          slug: "deploying-and-next-steps",
          title: "Deploying and Next Steps",
          estimatedMinutes: 9,
          content: `# Deploying and Next Steps

You've built the pieces. This final lesson covers what changes when your API leaves your laptop and runs somewhere real, plus where to go from here.

## Configuration differences in production

\`\`\`js
const port = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET must be set in production");
}
\`\`\`

Production hosts (Render, Railway, Fly.io, AWS, etc.) set environment variables through their own dashboards or config files, rather than a \`.env\` file — the same \`process.env\` reads work everywhere, but *how* the values get there changes.

## Running with a process manager

If you deploy to a raw server (rather than a managed platform that handles this for you), a crashed Node process needs something to restart it automatically:

\`\`\`bash
npm install -g pm2
pm2 start server.js --name my-api
\`\`\`

Managed platforms (most modern hosts) handle this restart behavior for you as part of the platform — worth checking before adding your own process manager on top.

## Database considerations in production

- Run \`npx prisma migrate deploy\` (not \`migrate dev\`) in production — it applies existing migrations without prompting or generating new ones
- Use a real, managed database (not SQLite on a single disk) once you have more than one server instance, so all instances see the same data
- Never point your production app at a database you also use for manual testing

## Graceful shutdown

When a hosting platform redeploys your app, it typically sends a termination signal before killing the process. Handling it lets in-flight requests finish instead of being cut off mid-response:

\`\`\`js
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  server.close(() => process.exit(0));
});
\`\`\`

## Where to go from here

This course covered the core of building a production-ready REST API with Node.js and Express — routing, databases, validation, authentication, security, caching, background jobs, real-time features, GraphQL, containers, and CI/CD. The ecosystem still keeps going from here. Natural next steps once you're comfortable with everything in this course:

- **gRPC and other RPC-style APIs** — a high-performance, strongly-typed alternative to REST/GraphQL, common in service-to-service communication
- **Event-driven architecture and message brokers** (Kafka, RabbitMQ) — for large, distributed systems where services communicate through events rather than direct calls
- **Kubernetes** — for orchestrating many containers across many machines, once a single Docker host (from the containerization module) isn't enough
- **Advanced observability** (OpenTelemetry, distributed tracing, APM tools) — for understanding request behavior across many services, beyond the structured logging covered in this course
- **Serverless functions** (AWS Lambda, Vercel Functions, Cloudflare Workers) — an alternative deployment model to the always-on server this course assumed throughout

## Closing mental model

Every advanced topic above is still answering the same handful of questions this course started with: what request came in, is it valid, is the caller allowed to do this, how do we persist or retrieve the data, and what do we send back. Once those fundamentals are solid, everything else is a variation on a theme.`,
        },
      ],
      quiz: {
        title: "Tier 3 Checkpoint: Auth, Security, Testing & Architecture",
        questions: [
          {
            text: "Why is it safe to Base64-decode and read the payload of a JWT, yet still trust that the token hasn't been tampered with?",
            optionA: "The payload is encrypted so nobody but the server can read it",
            optionB: "The signature, computed with a secret only the server knows, would no longer match if the payload were altered",
            optionC: "JWTs cannot be decoded without the secret key",
            optionD: "Browsers automatically verify JWTs before sending them",
            correctOption: "B",
          },
          {
            text: "What is the main reason production systems use short-lived access tokens paired with longer-lived refresh tokens, rather than one long-lived token?",
            optionA: "It reduces the damage if a token leaks, while avoiding forcing users to log in again constantly",
            optionB: "Short tokens are required by the JWT specification",
            optionC: "It removes the need for a JWT_SECRET",
            optionD: "It eliminates the need for HTTPS",
            correctOption: "A",
          },
          {
            text: "A logged-in user with a valid token tries to delete a course but lacks the required admin role. What status code should the API return?",
            optionA: "401 Unauthorized",
            optionB: "403 Forbidden",
            optionC: "404 Not Found",
            optionD: "400 Bad Request",
            correctOption: "B",
          },
          {
            text: "Why can't a generic `requireRole` middleware alone enforce \"a user can only edit their own profile\"?",
            optionA: "Role-based middleware cannot run before a route handler",
            optionB: "That rule depends on which specific resource is being accessed, which requires loading the resource first to compare ownership",
            optionC: "Express does not support more than one middleware per route",
            optionD: "Ownership checks are not a form of authorization",
            correctOption: "B",
          },
          {
            text: "What does adding `helmet()` to an Express app primarily accomplish?",
            optionA: "It validates incoming request bodies against a schema",
            optionB: "It sets a range of HTTP response headers that reduce the risk of several browser-based attacks",
            optionC: "It hashes passwords before storing them",
            optionD: "It rate-limits incoming requests",
            correctOption: "B",
          },
          {
            text: "Why do login and signup routes typically get a stricter rate limit than general read-only API routes?",
            optionA: "Login routes are more expensive to run computationally in every case",
            optionB: "They are common targets for automated brute-force password guessing, so lower limits reduce that risk",
            optionC: "Express requires stricter limits on POST requests",
            optionD: "Rate limiting only works on authentication endpoints",
            correctOption: "B",
          },
          {
            text: "What is \"mass assignment\" in the context of an API, as covered in this tier?",
            optionA: "Sending too many requests to an endpoint in a short window",
            optionB: "Passing an entire request body straight into a database write, letting a client set fields it shouldn't be able to (like a role field)",
            optionC: "Assigning the same JWT secret to multiple environments",
            optionD: "Creating too many database records in a single request",
            correctOption: "B",
          },
          {
            text: "Why does Prisma largely protect against classic SQL injection, compared to hand-written SQL string concatenation?",
            optionA: "Prisma refuses to connect to SQL databases",
            optionB: "Prisma's query methods use parameterized queries, keeping data separate from query structure, rather than splicing input into a raw string",
            optionC: "Prisma automatically rate-limits all queries",
            optionD: "Prisma encrypts all data before storing it",
            correctOption: "B",
          },
          {
            text: "In the layered architecture described in the capstone lesson (routes/controllers/services/repositories), which layer should be the only one directly calling Prisma?",
            optionA: "Controllers",
            optionB: "Middleware",
            optionC: "Repositories",
            optionD: "Routes",
            correctOption: "C",
          },
          {
            text: "What is a key benefit of writing automated tests with a tool like Supertest, compared to only manually testing endpoints with curl or Postman?",
            optionA: "Automated tests eliminate the need for input validation entirely",
            optionB: "Tests run automatically and repeatedly, catching regressions whenever code changes, without manual re-checking",
            optionC: "Supertest replaces the need for a database in production",
            optionD: "Manual testing is not possible once JWT authentication is added",
            correctOption: "B",
          },
        ],
      },
    },
  ],
};

export default content;
