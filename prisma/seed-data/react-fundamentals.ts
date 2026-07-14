import type { CourseContentSeed } from "./types";

const content: CourseContentSeed = {
  courseSlug: "react-fundamentals",
  courseTitle: "React Fundamentals",
  courseDescription:
    "A complete, hands-on path from your first component to hooks, routing, and performance optimization — everything you need to build real, interactive React applications with confidence.",
  modules: [
    {
      title: "Getting Started with React",
      lessons: [
        {
          slug: "what-is-react",
          title: "What Is React and Why Use It?",
          estimatedMinutes: 6,
          content: `# What Is React and Why Use It?

**React** is a JavaScript library for building user interfaces. It was created at Facebook and released in 2013, and it has since become the most widely used tool for building interactive web front ends. React itself doesn't do routing, state management, or talking to servers out of the box — it does one thing, and does it well: it turns your data into UI, and keeps that UI in sync as the data changes.

## The problem React solves

Before libraries like React, developers updated web pages by directly manipulating the DOM: find an element, change its text, add a class, remove a node. This works for small pages, but it gets messy fast — as an app grows, you end up with code scattered everywhere that all touches the same elements, and it becomes hard to know what state the page is actually in.

React flips the approach. Instead of writing step-by-step instructions for *how* to update the page, you describe *what* the UI should look like for any given state of your data. When the data changes, React figures out the most efficient way to update the real page to match.

\`\`\`jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`

This function describes what the UI should look like given a \`name\`. You never write \`document.querySelector\` or \`.innerText = ...\` — you just describe the result, and React handles the DOM updates for you.

## Declarative vs. imperative

- **Imperative** (the old way): "Find this element. Change its text. Add this class. Remove that node."
- **Declarative** (the React way): "Given this data, here's what the UI should look like."

Declarative code is usually easier to read and reason about, because you don't have to mentally replay a sequence of mutations to understand the current state of the page — the UI is just a function of the data.

## Components: the core building block

React apps are built out of **components** — independent, reusable pieces of UI, each responsible for rendering a piece of the page. A component is just a JavaScript function that returns what should appear on screen. You'll write your first one in the next lesson.

## Mental model

Think of a React component like a small machine: data goes in (through *props* and *state*, which you'll meet soon), and UI comes out. Whenever the input data changes, the machine runs again and produces updated UI — you never have to manually patch the old output yourself.

Common mistake: assuming React automatically means "faster" or "better" for every project. React is a tool suited to building interactive, data-driven UIs. For a static page with no interactivity, plain HTML/CSS may genuinely be the simpler, better choice. React earns its complexity when your UI needs to respond to changing data over time.`,
        },
        {
          slug: "setting-up-a-react-project",
          title: "Setting Up Your First React Project",
          estimatedMinutes: 7,
          content: `# Setting Up Your First React Project

Before you write any components, you need a project set up to actually run React code in a browser. Today, the standard way to start a new React project is with a **build tool** — something that bundles your JavaScript, transforms JSX into plain JavaScript, and serves your app with fast reloads while you develop.

## Using Vite

[Vite](https://vitejs.dev) is the current standard choice for starting a new React project quickly. From your terminal:

\`\`\`bash
npm create vite@latest my-react-app -- --template react
cd my-react-app
npm install
npm run dev
\`\`\`

This scaffolds a minimal React project and starts a local dev server (usually at \`http://localhost:5173\`) that automatically refreshes the browser as you edit files.

## What's inside a fresh project

\`\`\`text
my-react-app/
├── index.html        ← the single HTML page your app mounts into
├── package.json       ← dependencies and scripts
├── src/
│   ├── main.jsx        ← entry point: mounts <App /> into the page
│   └── App.jsx          ← your first component
└── vite.config.js
\`\`\`

The entry point wires everything together:

\`\`\`jsx
// src/main.jsx
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

const root = createRoot(document.getElementById("root"));
root.render(<App />);
\`\`\`

\`createRoot\` tells React *where* in the real DOM to take over (an element with \`id="root"\` in \`index.html\`), and \`root.render(<App />)\` tells it *what* to render there. From this point forward, React owns everything inside that root element.

## Why a build step at all?

Browsers don't understand JSX (the \`<h1>Hello</h1>\`-in-JavaScript syntax you'll learn next) or some modern JavaScript features directly. Vite runs a compiler in the background that transforms your source files into plain JavaScript the browser can execute, and bundles everything into as few files as possible for production.

## Try it yourself

Scaffold a project with the command above, open \`src/App.jsx\`, change the text inside the returned JSX, save the file, and watch the browser update instantly without a manual refresh — that instant feedback loop is one of the biggest quality-of-life wins of modern React tooling.

## Common mistake

Editing \`index.html\` expecting to see your UI changes there. In a React app, almost all the actual markup lives inside your components (\`App.jsx\` and beyond) — \`index.html\` just contains the empty \`<div id="root"></div>\` that React mounts into.`,
        },
        {
          slug: "jsx-syntax",
          title: "JSX: Writing UI with JavaScript",
          estimatedMinutes: 8,
          content: `# JSX: Writing UI with JavaScript

**JSX** is a syntax extension for JavaScript that lets you write HTML-like markup directly inside your JavaScript code. It's how you describe what a React component should render.

\`\`\`jsx
const element = <h1 className="title">Hello, world!</h1>;
\`\`\`

This looks like HTML, but it's not a string and it's not HTML — it's JavaScript. Behind the scenes, a compiler (like the one built into Vite) transforms this into regular function calls:

\`\`\`js
const element = React.createElement("h1", { className: "title" }, "Hello, world!");
\`\`\`

You'll almost never write \`createElement\` yourself, but knowing it's there explains why JSX has a few rules that differ from HTML.

## Embedding JavaScript expressions

Anything inside curly braces \`{ }\` is evaluated as a plain JavaScript expression:

\`\`\`jsx
const name = "Ada";
const element = <h1>Hello, {name.toUpperCase()}!</h1>;
\`\`\`

You can put any *expression* in there — a variable, a function call, a ternary, arithmetic — but not statements like \`if\` or \`for\`. You'll learn the JSX-friendly ways to do conditional and repeated rendering in a later lesson.

## Rules JSX enforces

- **One root element.** A component must return a single element (you can wrap multiple elements in a \`<>...</>\` fragment if you don't want an extra \`<div>\`).
- **\`className\` instead of \`class\`.** Since \`class\` is a reserved word in JavaScript, JSX uses \`className\` for the HTML \`class\` attribute.
- **camelCase attributes.** Event handlers and most attributes use camelCase: \`onClick\`, \`onChange\`, \`tabIndex\`.
- **Self-closing tags.** Every tag must be closed: \`<img />\`, \`<br />\`, not \`<img>\`.

\`\`\`jsx
function Card() {
  return (
    <>
      <h2 className="card-title">Welcome</h2>
      <img src="/avatar.png" alt="User avatar" />
    </>
  );
}
\`\`\`

## Mental model

Think of JSX as syntactic sugar that lets you write "HTML that can contain live JavaScript values." Every \`{ }\` is a small window back into JavaScript, letting your markup stay in sync with your data without string concatenation or template hacks.

## Common mistake

Trying to put a JavaScript statement inside \`{ }\`, like \`{ if (loggedIn) { ... } }\`. JSX curly braces only accept *expressions* — things that produce a value. An \`if\` statement doesn't produce a value, so it can't go there directly. Use a ternary (\`condition ? a : b\`) or move the logic above the \`return\` instead.`,
        },
        {
          slug: "the-virtual-dom",
          title: "The Virtual DOM and How React Renders",
          estimatedMinutes: 7,
          content: `# The Virtual DOM and How React Renders

You've seen that React components return JSX describing what the UI should look like. But how does React turn that description into actual, visible pixels on the page — and how does it do that efficiently every time your data changes?

## The real DOM is slow to churn

The browser's DOM (Document Object Model) is the tree of objects representing your page. Directly mutating the DOM a lot — adding nodes, removing nodes, changing attributes — is relatively expensive, especially when done repeatedly and imprecisely.

## The virtual DOM

React keeps a lightweight, in-memory description of the UI called the **virtual DOM** — plain JavaScript objects representing what the tree of elements *should* look like. When your component's data changes:

1. React re-runs your component function(s) to get a new virtual DOM tree.
2. React **diffs** the new tree against the previous one, figuring out exactly what changed.
3. React applies only those minimal changes to the real DOM — this step is called **reconciliation**.

\`\`\`jsx
function Clock({ time }) {
  return <p>Current time: {time}</p>;
}
\`\`\`

Every time \`time\` changes, React re-runs \`Clock\`, gets a new virtual representation of \`<p>Current time: ...</p>\`, compares it to the previous one, and updates only the text node that actually changed — it doesn't recreate the \`<p>\` element or touch any of its siblings.

## Rendering vs. committing

React's work happens in two conceptual phases:

- **Render phase** — React calls your component functions to figure out what the UI *should* look like. This is pure calculation; nothing is drawn yet.
- **Commit phase** — React takes the calculated differences and actually applies them to the real DOM, so the browser can paint the update on screen.

## Why this matters for you as a developer

You almost never need to think about the virtual DOM directly — it's an internal implementation detail. What matters is the mental model it enables: **you describe the UI for the current data, and React takes care of turning that into efficient, minimal DOM updates.** This is what makes the declarative style from the first lesson practical at scale — you're not responsible for computing the diff yourself.

## Mental model

Imagine handing a designer a fresh sketch of what a room should look like every time something changes, instead of shouting individual instructions ("move the lamp two inches left"). The designer (React) compares the new sketch to the last one and moves only what's different — you just keep handing over up-to-date sketches.

## Common mistake

Thinking React re-renders means the entire DOM gets torn down and rebuilt on every change. In reality, React's diffing means most of the real DOM stays completely untouched — only the parts that actually changed get updated, which is exactly why React can be fast even in large, frequently-updating UIs.`,
        },
      ],
    },
    {
      title: "Components and Props",
      lessons: [
        {
          slug: "function-components",
          title: "Your First Component",
          estimatedMinutes: 7,
          content: `# Your First Component

A React **component** is just a JavaScript function that returns JSX. That's the whole definition. Components are how you break a UI into independent, reusable, nameable pieces.

\`\`\`jsx
function Welcome() {
  return <h1>Welcome to React!</h1>;
}
\`\`\`

Two rules make a plain function into a component React recognizes:

- Its name must start with a **capital letter** (\`Welcome\`, not \`welcome\`) — this is how JSX tells apart a custom component (\`<Welcome />\`) from a built-in HTML tag (\`<h1>\`).
- It must **return JSX** (or \`null\`, or an array/fragment of JSX) describing what should render.

## Using a component

Once defined, you use a component the same way you'd use an HTML tag:

\`\`\`jsx
function App() {
  return (
    <div>
      <Welcome />
      <Welcome />
      <Welcome />
    </div>
  );
}
\`\`\`

Each \`<Welcome />\` here creates a separate, independent instance of that component. This is the essence of reusability: write the UI logic once, render it as many times as you need.

## One file, one component (by convention)

Most React codebases put one main component per file, matching the filename to the component name (\`Welcome.jsx\` exports \`Welcome\`). This isn't enforced by React itself, but it keeps large codebases navigable.

\`\`\`jsx
// Welcome.jsx
export default function Welcome() {
  return <h1>Welcome to React!</h1>;
}

// App.jsx
import Welcome from "./Welcome.jsx";

export default function App() {
  return <Welcome />;
}
\`\`\`

## Mental model

Think of components like custom HTML tags you invent yourself. The browser ships with \`<button>\`, \`<img>\`, and \`<input>\` built in — React lets you build your own vocabulary of tags (\`<Welcome />\`, \`<UserCard />\`, \`<CommentList />\`) out of the built-in ones, then compose your whole app from that vocabulary.

## Common mistake

Naming a component starting with a lowercase letter, like \`function welcome() { ... }\`. React's JSX compiler uses the capitalization convention to decide whether \`<welcome />\` refers to your component or an (invalid) HTML tag called \`welcome\` — a lowercase name will silently fail to render as your component.`,
        },
        {
          slug: "props-basics",
          title: "Passing Data with Props",
          estimatedMinutes: 8,
          content: `# Passing Data with Props

A component that always renders exactly the same thing isn't very useful. **Props** (short for "properties") let a parent component pass data into a child component, the same way HTML attributes configure a built-in tag like \`<img src="..." alt="..." />\`.

\`\`\`jsx
function Greeting(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Greeting name="Ada" />
      <Greeting name="Grace" />
    </div>
  );
}
\`\`\`

Here, \`props\` is a single object React builds automatically from the attributes you write on the JSX tag: \`<Greeting name="Ada" />\` results in \`props\` being \`{ name: "Ada" }\` inside \`Greeting\`.

## Destructuring props

Since \`props\` is just an object, it's very common to destructure it directly in the function signature for readability:

\`\`\`jsx
function Greeting({ name, isAdmin }) {
  return (
    <h1>
      Hello, {name}{isAdmin ? " (admin)" : ""}!
    </h1>
  );
}
\`\`\`

## Props can be any JavaScript value

Props aren't limited to strings — you can pass numbers, booleans, arrays, objects, and even functions:

\`\`\`jsx
function ProductCard({ product, onAddToCart }) {
  return (
    <div className="card">
      <h3>{product.name}</h3>
      <p>\${product.price.toFixed(2)}</p>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
}
\`\`\`

\`onAddToCart\` here is a function passed down as a prop — the child calls it, but the parent decides what actually happens. This pattern of passing callback functions down is how children communicate back up to parents.

## Props are read-only

A component must never modify its own props. Props flow **one direction**: from parent to child. If a child needs to change something and have that change reflected in the UI, it does so through state (covered in an upcoming lesson) or by calling a function the parent passed down.

## Mental model

Think of props like arguments to a function. \`<Greeting name="Ada" />\` is conceptually just like calling \`Greeting({ name: "Ada" })\` — the component is a function, and props are how you parameterize its output.

## Common mistake

Trying to reassign a prop inside the component, like \`props.name = "Someone else"\`. Props are owned by the parent; mutating them doesn't do what you'd expect and breaks React's data-flow model. If you need a value that changes over time, that's a sign you need local state, not a mutated prop.`,
        },
        {
          slug: "composition-and-children",
          title: "Composing Components and the children Prop",
          estimatedMinutes: 8,
          content: `# Composing Components and the children Prop

Most real UIs aren't one flat list of components — they're trees, where components contain other components. This lesson covers how to **compose** components together, and the special \`children\` prop that makes wrapping components possible.

## Nesting components

Just like HTML elements can contain other elements, your components can render other components inside them:

\`\`\`jsx
function Avatar({ src, alt }) {
  return <img className="avatar" src={src} alt={alt} />;
}

function UserCard({ user }) {
  return (
    <div className="user-card">
      <Avatar src={user.avatarUrl} alt={user.name} />
      <h3>{user.name}</h3>
      <p>{user.bio}</p>
    </div>
  );
}
\`\`\`

\`UserCard\` composes \`Avatar\` together with plain HTML elements. This is the primary way React apps scale: small, focused components combine into bigger ones, which combine into pages.

## The \`children\` prop

Sometimes you want a component to wrap *arbitrary* content, without knowing in advance what that content will be — think of a \`Card\`, \`Modal\`, or \`Panel\` component. React gives every component an implicit \`children\` prop containing whatever was written between its opening and closing JSX tags.

\`\`\`jsx
function Card({ children }) {
  return <div className="card">{children}</div>;
}

function App() {
  return (
    <Card>
      <h2>Account Settings</h2>
      <p>Manage your preferences below.</p>
    </Card>
  );
}
\`\`\`

Whatever you put between \`<Card>\` and \`</Card>\` becomes \`props.children\` inside \`Card\` — in this case, the \`<h2>\` and \`<p>\`. \`Card\` doesn't need to know anything about its contents; it just decides *where* they get rendered (here, inside a styled \`<div>\`).

## Why composition beats configuration

You could imagine a \`Card\` that instead took a \`title\` and \`bodyText\` prop for every possible piece of content it might show — but that gets unwieldy fast as requirements grow. Composition (nesting arbitrary children) is more flexible: \`Card\` stays simple, and callers control exactly what appears inside.

\`\`\`jsx
<Card>
  <UserCard user={user} />
  <button>Edit Profile</button>
</Card>
\`\`\`

## Mental model

Think of \`children\` like the "slot" in a picture frame — the frame (\`Card\`) provides the border and styling, but doesn't care what picture (content) you put inside it. This mirrors how HTML itself works: a \`<div>\` doesn't know or care what's inside it either.

## Common mistake

Forgetting to render \`{children}\` inside a wrapper component. If \`Card\` returns \`<div className="card"></div>\` without \`{children}\`, anything nested inside \`<Card>...</Card>\` in JSX is silently dropped — React still passes it as \`props.children\`, but nothing displays it unless the component explicitly renders it.`,
        },
      ],
    },
    {
      title: "Styling React Applications",
      lessons: [
        {
          slug: "css-files-classnames-and-inline-styles",
          title: "Styling Components: CSS Files, className, and Inline Styles",
          estimatedMinutes: 7,
          content: `# Styling Components: CSS Files, className, and Inline Styles

React itself has no opinion about how you write CSS — it doesn't ship a styling system. Any approach that produces a \`className\` string or a style object works. This lesson covers the two simplest, most common approaches you'll reach for constantly: a plain CSS file, and inline style objects.

## Plain CSS files

The most common starting point is a regular \`.css\` file, imported directly into the component that uses it:

\`\`\`jsx
// Button.css
.button {
  padding: 8px 16px;
  border-radius: 6px;
  background: #2563eb;
  color: white;
}

// Button.jsx
import "./Button.css";

function Button({ children }) {
  return <button className="button">{children}</button>;
}
\`\`\`

Vite (and most modern build tools) understands \`import "./Button.css"\` and bundles that stylesheet into the final page automatically — no extra configuration needed. This CSS is **global**: any element anywhere in the app with \`className="button"\` gets these styles, which is simple but can lead to naming collisions as an app grows (covered in the next lesson).

## Inline styles with the style prop

For styles that are computed dynamically from props or state, JSX supports a \`style\` prop that takes a JavaScript object instead of a CSS string:

\`\`\`jsx
function ProgressBar({ percent }) {
  return (
    <div style={{ width: "100%", background: "#e5e7eb" }}>
      <div style={{ width: \`\${percent}%\`, background: "#16a34a", height: 8 }} />
    </div>
  );
}
\`\`\`

Two rules to notice: properties use **camelCase** (\`backgroundColor\`, not \`background-color\`), and numeric values default to pixels for most properties (\`height: 8\` becomes \`8px\`) — except for a handful of unitless CSS properties like \`opacity\` or \`flex\`.

## Conditional className

Combining static and conditional classes is common enough that it's worth knowing the plain-JavaScript pattern before reaching for a library:

\`\`\`jsx
function Alert({ type, message }) {
  return (
    <p className={\`alert \${type === "error" ? "alert-error" : "alert-info"}\`}>
      {message}
    </p>
  );
}
\`\`\`

For more than two or three conditional classes, a tiny utility like \`clsx\` or \`classnames\` keeps this readable: \`clsx("alert", { "alert-error": type === "error" })\`.

## Mental model

Think of \`className\` and \`style\` as just two more props — \`className\` points at rules that live in a separate CSS file (or stylesheet), while \`style\` is for one-off, dynamically computed values that don't make sense as a named, reusable CSS class.

## Common mistake

Writing \`style="color: red;"\` as a plain string, copying HTML habits. JSX's \`style\` prop must be a JavaScript object (\`style={{ color: "red" }}\`) — the outer \`{ }\` enters JS-expression mode, and the inner \`{ }\` is the actual object literal.`,
        },
        {
          slug: "css-modules",
          title: "Scoping Styles with CSS Modules",
          estimatedMinutes: 7,
          content: `# Scoping Styles with CSS Modules

Plain, global CSS files work fine for small projects, but every class name shares one global namespace — two components that both define \`.card\` will silently clash, with whichever stylesheet loads last winning. **CSS Modules** solve this by scoping class names to the specific component that imports them.

## How it works

Any file named with the \`.module.css\` suffix (a convention Vite and most modern tooling recognize automatically) is treated as a CSS Module instead of global CSS:

\`\`\`css
/* Card.module.css */
.card {
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-weight: 600;
}
\`\`\`

\`\`\`jsx
// Card.jsx
import styles from "./Card.module.css";

function Card({ title, children }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      {children}
    </div>
  );
}
\`\`\`

Instead of a plain string, \`import styles from "./Card.module.css"\` gives you an **object** whose keys match your class names (\`styles.card\`, \`styles.title\`). At build time, the tool rewrites each class name into something unique — typically something like \`Card_card__a1b2c\` — so it can never collide with a same-named class in a different module.

## Why this matters as an app grows

\`\`\`jsx
// ProductCard.module.css also defines .title — no conflict at all,
// because each module's class names are independently hashed to be unique.
import styles from "./ProductCard.module.css";
\`\`\`

Two entirely unrelated components can both use the intuitive name \`.title\` in their own module file, with zero risk of one silently overriding the other's styles — something that's a constant, hard-to-debug hazard with plain global CSS in a large codebase.

## Combining static and dynamic module classes

\`\`\`jsx
import styles from "./Alert.module.css";

function Alert({ type, message }) {
  return (
    <p className={\`\${styles.alert} \${type === "error" ? styles.error : styles.info}\`}>
      {message}
    </p>
  );
}
\`\`\`

## Mental model

Think of a CSS Module as a private stylesheet that belongs to exactly one component file — the build tool automatically gives every class name a unique "last name" behind the scenes, so you can freely reuse simple, readable class names like \`.title\` or \`.card\` across many components without ever worrying about collisions.

## Common mistake

Naming a file \`Card.css\` when you meant to use CSS Modules, then importing it with \`import styles from "./Card.css"\`. Without the \`.module.css\` suffix, most tooling treats the file as **global** CSS — the import will silently give you \`undefined\` for every class name, since there's no module object being generated at all.`,
        },
        {
          slug: "css-in-js-and-utility-css",
          title: "CSS-in-JS and Utility-First CSS (Tailwind)",
          estimatedMinutes: 7,
          content: `# CSS-in-JS and Utility-First CSS (Tailwind)

CSS files and CSS Modules aren't the only ways React developers style components. Two other approaches are extremely common across real-world codebases: **CSS-in-JS** libraries, and **utility-first** CSS frameworks like Tailwind. Knowing what each looks like — and their tradeoffs — matters, because you'll encounter all of these approaches across different jobs and codebases.

## CSS-in-JS: styles colocated in JavaScript

Libraries like \`styled-components\` let you define a styled element as a JavaScript value, with its CSS written directly alongside it:

\`\`\`jsx
import styled from "styled-components";

const Button = styled.button\`
  padding: 8px 16px;
  border-radius: 6px;
  background: \${(props) => (props.variant === "danger" ? "#dc2626" : "#2563eb")};
  color: white;
\`;

function DeleteButton() {
  return <Button variant="danger">Delete</Button>;
}
\`\`\`

The style is **colocated** with the component that uses it (no separate CSS file to jump to), and it's automatically scoped — \`styled-components\` generates a unique class name behind the scenes, the same way CSS Modules do. It also lets styles read directly from props (\`variant="danger"\`), something plain CSS can't do on its own.

## Utility-first CSS: Tailwind

Tailwind takes the opposite approach: instead of writing custom CSS at all, you compose a look from many small, single-purpose utility classes directly in your JSX:

\`\`\`jsx
function Button({ variant, children }) {
  const base = "px-4 py-2 rounded-md text-white font-medium";
  const color = variant === "danger" ? "bg-red-600" : "bg-blue-600";
  return <button className={\`\${base} \${color}\`}>{children}</button>;
}
\`\`\`

\`px-4\` (horizontal padding), \`rounded-md\` (border radius), \`bg-red-600\` (a specific shade of red) — each class does one small thing, and you never leave the JSX file to write CSS. Tailwind ships with a build step that scans your source files and generates only the CSS for utility classes you actually used, keeping the final stylesheet small despite the framework offering thousands of possible utilities.

## Comparing the approaches

- **Plain CSS / CSS Modules** — familiar, zero runtime cost, but styles live in a separate file from the component's markup.
- **CSS-in-JS** (styled-components and similar) — styles colocated with components and can react to props directly, at the cost of some runtime overhead and an extra library dependency.
- **Utility-first (Tailwind)** — extremely fast to write once you know the utility names, no context-switching between files, but className strings can get long, and it takes some ramp-up to learn the utility vocabulary.

There is no single "correct" choice — real teams and real production codebases use all of these successfully. What matters most is picking one primary approach per project and staying consistent, rather than mixing several without a clear convention.

## Mental model

Think of these as different trade routes to the same destination (styled elements on screen): CSS Modules keep style and markup in separate but tightly-linked files; CSS-in-JS merges them into one file; Tailwind skips writing custom CSS almost entirely in favor of composing pre-built utility classes.

## Common mistake

Adopting two or three different styling approaches within the same small project (say, some components in CSS Modules, others in styled-components, others in raw global CSS) without a clear reason. This makes it much harder for anyone (including future you) to predict where a given component's styles actually come from — pick one primary approach and stay consistent.`,
        },
      ],
    },
    {
      title: "Rendering Lists, Conditionals, Events & State Basics",
      lessons: [
        {
          slug: "conditional-rendering",
          title: "Conditional Rendering",
          estimatedMinutes: 7,
          content: `# Conditional Rendering

Real UIs need to show different things depending on data: an empty state vs. a filled list, a login button vs. a user menu, an error message vs. the normal content. Since JSX curly braces only accept expressions (not \`if\` statements), React apps use a handful of well-established expression-based patterns for this.

## Ternary expressions

The most common pattern for an either/or choice:

\`\`\`jsx
function LoginButton({ isLoggedIn }) {
  return (
    <button>{isLoggedIn ? "Log Out" : "Log In"}</button>
  );
}
\`\`\`

This also works for entire elements, not just text:

\`\`\`jsx
function Status({ isOnline }) {
  return isOnline ? <span className="dot green" /> : <span className="dot gray" />;
}
\`\`\`

## The \`&&\` operator for "render or nothing"

When you only want to show something *if* a condition is true (and render nothing otherwise), the \`&&\` operator is a common shorthand:

\`\`\`jsx
function Inbox({ unreadCount }) {
  return (
    <div>
      <h2>Inbox</h2>
      {unreadCount > 0 && <span className="badge">{unreadCount} unread</span>}
    </div>
  );
}
\`\`\`

If \`unreadCount > 0\` is false, the expression short-circuits to \`false\`, and React renders nothing for a value of \`false\` (or \`null\`/\`undefined\`).

## Returning early from a component

For more complex branching, it's often clearer to \`return\` different JSX from different points in the function body, before the "main" return:

\`\`\`jsx
function UserProfile({ user }) {
  if (!user) {
    return <p>No user found.</p>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

## Mental model

Conditional rendering isn't a special React feature — it's just JavaScript. Since a component's JSX is the *return value* of a function, anything you'd normally use to compute a value conditionally (ternaries, \`&&\`, early returns, even a plain \`if\`/\`else\` above the \`return\`) works exactly the same way here.

## Common mistake

Using \`{count && <Badge count={count} />}\` when \`count\` can be \`0\`. Since \`0\` is falsy but not \`null\`/\`undefined\`/\`false\`, React actually renders the literal text "0" on the page instead of nothing. Guard explicitly instead: \`{count > 0 && <Badge count={count} />}\`.`,
        },
        {
          slug: "rendering-lists-and-keys",
          title: "Rendering Lists and the key Prop",
          estimatedMinutes: 8,
          content: `# Rendering Lists and the key Prop

Showing a list of items — search results, comments, products — is one of the most common UI patterns. In React, you render lists with plain JavaScript array methods, most commonly \`.map()\`.

\`\`\`jsx
const fruits = ["Apple", "Banana", "Cherry"];

function FruitList() {
  return (
    <ul>
      {fruits.map((fruit) => (
        <li key={fruit}>{fruit}</li>
      ))}
    </ul>
  );
}
\`\`\`

\`.map()\` transforms the array of strings into an array of \`<li>\` elements, and JSX knows how to render an array of elements directly.

## Why every item needs a \`key\`

You'll notice the \`key\` prop on each \`<li>\`. React uses \`key\` to track which array item corresponds to which rendered element across re-renders — this is essential for React's diffing (from the virtual DOM lesson) to correctly figure out which items were added, removed, or reordered, instead of re-rendering the entire list from scratch.

\`\`\`jsx
function CommentList({ comments }) {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.text}</li>
      ))}
    </ul>
  );
}
\`\`\`

## Choosing a good key

- **Best**: a stable, unique ID from your data (\`comment.id\`, \`user.id\`) — something that stays the same across re-renders even if the list is reordered or filtered.
- **Acceptable in a pinch**: the array index (\`(item, index) => <li key={index}>\`) — but only if the list never reorders, never has items inserted/removed from the middle, and isn't filtered.
- **Never**: a random value generated on every render (like \`Math.random()\`) — this defeats the purpose entirely, since the key would be different every time and React could never match items across renders.

## What goes wrong with index-as-key on a dynamic list

\`\`\`jsx
// Risky if items can be reordered, added, or removed from the middle:
{items.map((item, index) => (
  <input key={index} defaultValue={item.text} />
))}
\`\`\`

If you delete the *first* item, every remaining item shifts up by one index. React sees "same key, different props" for each position, so it may reuse the wrong DOM node — visible as stale input values snapping to the wrong row.

## Mental model

Think of \`key\` as each list item's fingerprint. It has nothing to do with what's displayed on screen — React never renders the key itself. It exists purely so React can recognize "this is the same logical item as before" versus "this is a brand-new item," across renders.

## Common mistake

Omitting \`key\` entirely. React will still render the list, but it logs a console warning and falls back to less reliable, position-based matching — exactly the bug-prone behavior described above.`,
        },
        {
          slug: "handling-events",
          title: "Handling Events in React",
          estimatedMinutes: 7,
          content: `# Handling Events in React

Interactive UIs need to respond to user actions — clicks, typing, form submissions. React lets you attach event handlers directly in JSX, using camelCase props like \`onClick\` and \`onChange\`.

\`\`\`jsx
function AlertButton() {
  function handleClick() {
    alert("Button was clicked!");
  }

  return <button onClick={handleClick}>Click me</button>;
}
\`\`\`

## Passing a function, not calling one

This is the single most important rule for event handlers: pass the *function itself*, not the result of calling it.

\`\`\`jsx
// Correct: React calls handleClick when the button is clicked
<button onClick={handleClick}>Click me</button>

// Wrong: handleClick() runs immediately during render, not on click
<button onClick={handleClick()}>Click me</button>
\`\`\`

If you need to pass an argument to your handler, wrap it in an inline arrow function so the call only happens on click:

\`\`\`jsx
function TodoItem({ id, text, onDelete }) {
  return (
    <li>
      {text}
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
}
\`\`\`

## Common events you'll use constantly

- \`onClick\` — mouse clicks on any element
- \`onChange\` — a form input's value changes (typing, selecting)
- \`onSubmit\` — a \`<form>\` is submitted
- \`onMouseEnter\` / \`onMouseLeave\` — hover in/out
- \`onKeyDown\` — a key is pressed while an element is focused

## The event object

Handlers receive a React **synthetic event** object — a cross-browser wrapper around the native browser event, with the same familiar properties and methods:

\`\`\`jsx
function SearchInput() {
  function handleChange(event) {
    console.log("Current value:", event.target.value);
  }

  return <input type="text" onChange={handleChange} />;
}
\`\`\`

## Preventing default behavior

Forms and links have default browser behaviors (page reload on submit, navigation on click) that you'll frequently want to override:

\`\`\`jsx
function SearchForm() {
  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted without a page reload");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" />
      <button type="submit">Search</button>
    </form>
  );
}
\`\`\`

## Mental model

React event handlers work almost exactly like the DOM event handlers you may already know, with one convenience layer on top: consistent, camelCase naming and a normalized event object that behaves the same across browsers.

## Common mistake

Writing \`onClick={handleClick(id)}\` intending to pass \`id\` to the handler. This *calls* \`handleClick\` immediately during render (using its return value — often \`undefined\` — as the actual click handler), instead of waiting for a click. Wrap it in an arrow function: \`onClick={() => handleClick(id)}\`.`,
        },
        {
          slug: "the-usestate-hook",
          title: "The useState Hook",
          estimatedMinutes: 9,
          content: `# The useState Hook

Everything so far — props, conditional rendering, events — lets a component display data and react to input, but a component also needs to **remember** things across renders: whether a menu is open, what a user has typed, how many times a button was clicked. That's what **state** is for, and \`useState\` is how you add it to a function component.

\`\`\`jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

## How it works

- \`useState(0)\` creates a piece of state starting at \`0\`.
- It returns a pair (as an array): the current value (\`count\`) and a function to update it (\`setCount\`). The \`const [count, setCount] = ...\` syntax is array destructuring — you can name these two things whatever makes sense for your component.
- Calling \`setCount(newValue)\` tells React "this component's state changed" and schedules a **re-render** — React re-runs the component function, and this time \`useState(0)\` returns the *updated* value instead of the initial one.

## State is isolated per component instance

Each call to a component creates its own independent state. Rendering \`<Counter />\` three times creates three separate counters, each with its own \`count\`:

\`\`\`jsx
function App() {
  return (
    <div>
      <Counter />
      <Counter />
      <Counter />
    </div>
  );
}
\`\`\`

Clicking one counter's button does not affect the others — each has its own private memory.

## State can hold any value

\`\`\`jsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <input
      value={email}
      onChange={(event) => setEmail(event.target.value)}
      disabled={isSubmitting}
    />
  );
}
\`\`\`

Strings, numbers, booleans, arrays, and objects are all valid state values — you'll work with each of these as your components grow more complex.

## A mental model

Think of state as a labeled box React keeps for your component between renders. Regular variables inside a function are reset every time the function runs; a state variable is different — React remembers its value for you across every re-render, and only updates it (triggering a new render) when you explicitly call the setter.

## Common mistake

Never mutate state directly (\`count++\` or \`count = count + 1\`) — always go through the setter function (\`setCount(count + 1)\`), so React knows a re-render is needed. Directly reassigning the variable changes nothing that React is watching, so the UI silently fails to update even though the value technically changed in memory.`,
        },
      ],
      quiz: {
        title: "Tier 1 Checkpoint: React Basics",
        questions: [
          {
            text: "What best describes React's core approach to building UIs?",
            optionA: "You write step-by-step DOM manipulation instructions for every UI change",
            optionB: "You describe what the UI should look like for a given set of data, and React updates the DOM to match",
            optionC: "You write UI exclusively in HTML files with no JavaScript",
            optionD: "You must manually call document.createElement for every element",
            correctOption: "B",
          },
          {
            text: "In a fresh Vite + React project, what does `root.render(<App />)` in main.jsx do?",
            optionA: "It defines the App component's props",
            optionB: "It mounts the App component into the DOM element React was given control of",
            optionC: "It compiles JSX into HTML files",
            optionD: "It starts the development server",
            correctOption: "B",
          },
          {
            text: "Which of these is valid JSX?",
            optionA: "<div class=\"box\"><p>Hi</div>",
            optionB: "<div className=\"box\"><p>Hi</p></div>",
            optionC: "<div className=box><p>Hi</p></div>",
            optionD: "<div className=\"box\">{if (true) { <p>Hi</p> }}</div>",
            correctOption: "B",
          },
          {
            text: "What does React's virtual DOM primarily enable?",
            optionA: "Storing user data in the browser's local storage",
            optionB: "Skipping the render phase entirely for static components",
            optionC: "Efficiently computing the minimal set of real DOM changes needed after data changes",
            optionD: "Running React code without a browser",
            correctOption: "C",
          },
          {
            text: "Why must a custom component's name start with a capital letter, like `UserCard`?",
            optionA: "It's purely a style convention with no functional effect",
            optionB: "JSX uses capitalization to distinguish a custom component from a built-in HTML tag",
            optionC: "Lowercase component names cause a build error every time",
            optionD: "It determines the component's default CSS class",
            correctOption: "B",
          },
          {
            text: "In `<Greeting name=\"Ada\" />`, how does the `Greeting` component access the value \"Ada\"?",
            optionA: "Through a global variable called name",
            optionB: "Through its props object, e.g. props.name or a destructured { name }",
            optionC: "Through React.state.name",
            optionD: "It must be imported separately",
            correctOption: "B",
          },
          {
            text: "What does the `children` prop represent in a component like `function Card({ children })`?",
            optionA: "An array of the component's own state variables",
            optionB: "Whatever JSX was nested between the component's opening and closing tags when it was used",
            optionC: "A list of every prop passed to the component",
            optionD: "The component's CSS child selectors",
            correctOption: "B",
          },
          {
            text: "When rendering a list with `.map()`, what is the main purpose of the `key` prop on each item?",
            optionA: "It sets the CSS z-index of the element",
            optionB: "It lets React correctly match items across re-renders, especially when the list is reordered or filtered",
            optionC: "It is required only for accessibility, with no effect on rendering",
            optionD: "It determines the alphabetical sort order of the list",
            correctOption: "B",
          },
          {
            text: "Which event handler is written correctly to run only when the button is clicked (not immediately during render)?",
            optionA: "<button onClick={handleClick()}>Save</button>",
            optionB: "<button onClick={handleClick}>Save</button>",
            optionC: "<button onClick=\"handleClick\">Save</button>",
            optionD: "<button click={handleClick}>Save</button>",
            correctOption: "B",
          },
          {
            text: "Calling `setCount(count + 1)` from a `useState` setter does which of the following?",
            optionA: "Immediately mutates the count variable in place without a re-render",
            optionB: "Schedules a re-render of the component, after which useState returns the updated value",
            optionC: "Only updates a value shown in browser dev tools, not the UI",
            optionD: "Throws an error unless called inside useEffect",
            correctOption: "B",
          },
        ],
      },
    },
    {
      title: "Managing and Updating State",
      lessons: [
        {
          slug: "updating-state-correctly",
          title: "Updating State Correctly (Immutability & Batching)",
          estimatedMinutes: 9,
          content: `# Updating State Correctly (Immutability & Batching)

Once your components hold more than a single number or string in state, a few important rules start to matter a lot: state must be treated as **immutable**, and multiple state updates in the same event handler are **batched** together.

## Never mutate state directly

When state is an object or array, it's tempting to modify it in place. Don't — always create a new object or array instead.

\`\`\`jsx
// Wrong: mutates the existing object, React never notices the change
function BadExample() {
  const [user, setUser] = useState({ name: "Ada", age: 30 });

  function haveBirthday() {
    user.age = user.age + 1; // mutation!
    setUser(user); // same object reference — React sees "no change"
  }
}

// Correct: creates a brand-new object
function GoodExample() {
  const [user, setUser] = useState({ name: "Ada", age: 30 });

  function haveBirthday() {
    setUser({ ...user, age: user.age + 1 });
  }
}
\`\`\`

React decides whether to re-render partly by comparing the previous state reference to the new one. If you mutate the existing object and pass the *same reference* back to \`setUser\`, React may not detect any change at all — the spread syntax (\`{ ...user, age: ... }\`) creates a distinct new object, so React can tell something changed.

## The same rule applies to arrays

\`\`\`jsx
function TodoList() {
  const [todos, setTodos] = useState(["Buy milk", "Walk dog"]);

  function addTodo(text) {
    setTodos([...todos, text]); // new array, not todos.push(text)
  }

  function removeTodo(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }
}
\`\`\`

\`.push()\`, \`.splice()\`, and direct index assignment (\`todos[0] = "x"\`) all mutate the existing array. Prefer \`.map()\`, \`.filter()\`, and spread syntax, which return new arrays instead.

## Functional updates

When a new state value depends on the previous one, pass a function to the setter instead of a value directly:

\`\`\`jsx
function Counter() {
  const [count, setCount] = useState(0);

  function handleTripleClick() {
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  }

  // ...
}
\`\`\`

Using \`setCount((prev) => prev + 1)\` three times correctly increments by 3. If you instead wrote \`setCount(count + 1)\` three times, all three calls would use the *same* stale \`count\` value captured from this render, and the count would only increase by 1 — because React batches these updates and \`count\` doesn't change until the next render.

## Mental model

Treat every state value as a snapshot, frozen for the duration of one render. You never edit a snapshot — you hand React a brand new one via the setter, and React swaps it in for the next render. This is why functional updates matter: \`(prev) => ...\` looks at the *actual* latest value at update time, rather than relying on a variable that was already captured when the render started.

## Common mistake

Calling \`setSomething(value)\` multiple times in a row expecting each call to build on the last one synchronously. React batches state updates within an event handler and applies them together — reach for the functional updater form (\`setSomething((prev) => ...)\`) whenever a new value depends on the previous one.`,
        },
        {
          slug: "lifting-state-up",
          title: "Lifting State Up",
          estimatedMinutes: 8,
          content: `# Lifting State Up

Sometimes two sibling components need to share and stay in sync with the same piece of state — for example, a search box and a results list, or a temperature input in two different units. Since props only flow one direction (parent to child), the fix is to move the shared state up to their closest common parent. This pattern is called **lifting state up**.

## The problem

Imagine two components that each keep their own independent state for the same conceptual value:

\`\`\`jsx
function CelsiusInput() {
  const [celsius, setCelsius] = useState("");
  return <input value={celsius} onChange={(e) => setCelsius(e.target.value)} />;
}

function FahrenheitInput() {
  const [fahrenheit, setFahrenheit] = useState("");
  return <input value={fahrenheit} onChange={(e) => setFahrenheit(e.target.value)} />;
}
\`\`\`

These two inputs have no way to know about each other — typing in one never updates the other, even though they represent the same underlying temperature.

## The fix: move state to the shared parent

\`\`\`jsx
function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");

  const fahrenheit = celsius === "" ? "" : (Number(celsius) * 9) / 5 + 32;

  return (
    <div>
      <CelsiusInput value={celsius} onChange={setCelsius} />
      <FahrenheitDisplay value={fahrenheit} />
    </div>
  );
}

function CelsiusInput({ value, onChange }) {
  return <input value={value} onChange={(e) => onChange(e.target.value)} />;
}

function FahrenheitDisplay({ value }) {
  return <p>{value}°F</p>;
}
\`\`\`

Now \`TemperatureConverter\` is the single source of truth. \`CelsiusInput\` and \`FahrenheitDisplay\` become simple, "controlled" components — they receive their value as a prop and report changes back up through a callback prop, but hold no state of their own.

## How to recognize when you need this

Ask: "do two components need to reflect the same underlying data, or react to each other's changes?" If so, that data shouldn't live in either component individually — find their closest common parent and put the state there, passing it back down as props (and passing update functions down alongside it).

## Mental model

Think of state living at the *lowest common ancestor* that needs to know about it. Push state down when only one component cares about it; lift it up the moment a sibling also needs to read or react to it.

## Common mistake

Duplicating the same piece of state in two sibling components and trying to keep them in sync with \`useEffect\` (a technique for a later lesson). This usually indicates the state is in the wrong place — lifting it to the shared parent removes the synchronization problem entirely, because there's only ever one copy of the truth.`,
        },
        {
          slug: "forms-and-controlled-inputs",
          title: "Forms and Controlled Inputs",
          estimatedMinutes: 9,
          content: `# Forms and Controlled Inputs

Forms are one of the most common places state shows up in real applications. React's standard approach is the **controlled component** pattern: form elements whose value is driven entirely by React state, rather than by the DOM's own internal state.

## An uncontrolled input (the default HTML behavior)

Left alone, an \`<input>\` manages its own value internally in the DOM, and React has no idea what the user typed unless it asks.

## A controlled input

\`\`\`jsx
function NameForm() {
  const [name, setName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Submitted name:", name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

Here, \`value={name}\` means the input's displayed value *always* reflects React state — the input can never show anything React doesn't know about. \`onChange\` fires on every keystroke, updating state, which triggers a re-render, which redraws the input with the new value. This loop happens so fast it feels instantaneous to the user, but it means React state is always the single source of truth for what's on screen.

## Handling multiple fields

For forms with several fields, a common pattern is one state object with a single change handler keyed by input name:

\`\`\`jsx
function SignupForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form>
      <input name="email" value={formData.email} onChange={handleChange} />
      <input name="password" type="password" value={formData.password} onChange={handleChange} />
    </form>
  );
}
\`\`\`

The \`[name]: value\` syntax is a computed property key — it lets one handler update whichever field fired the change event, using the input's \`name\` attribute to know which key to update.

## Other form elements

Checkboxes use \`checked\` instead of \`value\`, and read from \`event.target.checked\`:

\`\`\`jsx
function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);
  return (
    <input
      type="checkbox"
      checked={subscribed}
      onChange={(event) => setSubscribed(event.target.checked)}
    />
  );
}
\`\`\`

## Mental model

A controlled input is a two-way binding built from two one-way flows: state flows down into the input's \`value\`, and user input flows back up through \`onChange\`. Nothing "just happens" inside the DOM that React doesn't know about — every keystroke is a state update the input re-renders in response to.

## Common mistake

Setting \`value\` on an input without an \`onChange\` handler. React will treat this as a **read-only** input and log a console warning — since \`value\` is fixed by state and nothing ever updates that state, the user won't be able to type anything into the field at all.`,
        },
      ],
    },
    {
      title: "Side Effects and the Component Lifecycle",
      lessons: [
        {
          slug: "the-useeffect-hook",
          title: "The useEffect Hook",
          estimatedMinutes: 9,
          content: `# The useEffect Hook

Rendering a component should be a pure calculation: given the same props and state, it should describe the same UI, with no side effects. But real apps need to do things *outside* of rendering — fetch data, subscribe to an event, manually update the page title, start a timer. These are called **side effects**, and \`useEffect\` is the hook for running them at the right time.

\`\`\`jsx
import { useEffect, useState } from "react";

function PageTitleUpdater({ count }) {
  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return <button onClick={() => {}}>Click</button>;
}
\`\`\`

## When effects run

By default, the function you pass to \`useEffect\` runs **after** React has committed the render to the screen — meaning the DOM is already updated by the time your effect code runs. This is different from the render phase itself, which must stay pure.

## The dependency array

Most of the time, you don't want an effect running after *every single render* — you want it to run only when specific values change. That's what the second argument, the **dependency array**, controls:

\`\`\`jsx
useEffect(() => {
  document.title = \`You clicked \${count} times\`;
}, [count]); // only re-run when count changes
\`\`\`

- **No second argument** — the effect runs after every render.
- **Empty array \`[]\`** — the effect runs exactly once, right after the first render (commonly used for one-time setup like fetching initial data).
- **Array with values \`[count, userId]\`** — the effect re-runs whenever any listed value changes between renders.

\`\`\`jsx
function Greeting({ userId }) {
  useEffect(() => {
    console.log(\`Loading data for user \${userId}\`);
  }, [userId]); // re-runs only when userId changes, not on unrelated re-renders

  return <p>Hello!</p>;
}
\`\`\`

## Why effects are separate from the render itself

Keeping side effects out of the render phase means React can call your component function as many times as it needs (for calculating what to show) without accidentally re-triggering effects like network requests or subscriptions on every single calculation. \`useEffect\` explicitly opts into running *after* the screen has updated, which is the correct timing for most side effects.

## Mental model

Think of rendering as "what should the screen look like right now," and effects as "now that the screen matches that, go do this extra thing to the outside world (a timer, a subscription, the document title, a network request)." Keeping these conceptually separate is what makes components predictable to reason about.

## Common mistake

Omitting the dependency array entirely when you only meant for an effect to run once. Without \`[]\`, the effect runs after *every* render — if that effect updates state, and that state change causes a re-render, you can end up in an accidental infinite loop of renders and effect calls.`,
        },
        {
          slug: "effect-dependencies-and-cleanup",
          title: "Effect Dependencies and Cleanup",
          estimatedMinutes: 9,
          content: `# Effect Dependencies and Cleanup

Some side effects need to be "undone" when a component stops needing them — an active subscription, a running timer, an event listener attached to \`window\`. \`useEffect\` supports this through a **cleanup function**.

## Returning a cleanup function

If the function you pass to \`useEffect\` returns another function, React treats that as cleanup — and runs it before the effect runs again, and once more when the component is removed from the page (unmounted).

\`\`\`jsx
import { useEffect, useState } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(intervalId); // cleanup
  }, []);

  return <p>Seconds elapsed: {seconds}</p>;
}
\`\`\`

Without the \`clearInterval\` cleanup, every time \`Timer\` mounted (and, without the empty dependency array, every re-render), a new interval would start — and old ones would keep running in the background, silently piling up and causing memory leaks or unexpected extra state updates.

## Cleaning up subscriptions and event listeners

\`\`\`jsx
function WindowWidthTracker() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <p>Window width: {width}px</p>;
}
\`\`\`

The cleanup function removes exactly the listener that was added, so components can mount and unmount repeatedly (for example, when navigating between pages) without leaking listeners that point at stale, removed components.

## Why dependencies must be listed honestly

A common temptation is to leave a value out of the dependency array to avoid an effect re-running "too often." This causes the effect to keep using a stale, captured value from an old render instead of the current one — a subtle and hard-to-debug class of bug. If your effect uses a prop or state value, it belongs in the dependency array; if that causes the effect to run more than you'd like, that's usually a sign the effect (or the component structure) needs to be restructured, not that the dependency should be hidden.

## Mental model

Think of each run of an effect as a self-contained "session": it sets something up, and its cleanup function is that same session's matching teardown. Every time the dependencies change, React closes the old session (running cleanup) before opening a new one (running the effect again) — and the very last cleanup runs when the component leaves the screen for good.

## Common mistake

Starting something (a timer, a listener, a subscription) inside \`useEffect\` without returning a cleanup function to stop it. This is one of the most common sources of memory leaks and "why did this fire twice" bugs in real React apps — if an effect starts something ongoing, it almost always needs a matching cleanup.`,
        },
        {
          slug: "fetching-data-with-useeffect",
          title: "Fetching Data with useEffect",
          estimatedMinutes: 10,
          content: `# Fetching Data with useEffect

Loading data from a server is a side effect — it happens outside the pure rendering calculation, so it belongs inside \`useEffect\`. This lesson covers the standard pattern for fetching data when a component mounts (or when a relevant prop changes).

## The basic pattern

\`\`\`jsx
import { useState, useEffect } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(\`/api/users/\${userId}\`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load user");
        return response.json();
      })
      .then((data) => setUser(data))
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, [userId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h2>{user.name}</h2>;
}
\`\`\`

Three pieces of state work together here: the data itself, a loading flag, and an error slot — this trio is the standard shape for any component that fetches data, because a fetch can be pending, succeed, or fail, and the UI needs to represent all three.

## Avoiding a race condition

If \`userId\` can change quickly (for example, clicking between user profiles fast), an earlier, slower request can resolve *after* a newer one and overwrite fresh data with stale data. The fix is to track whether the effect is still "current" using its cleanup function:

\`\`\`jsx
useEffect(() => {
  let isCurrent = true;

  fetch(\`/api/users/\${userId}\`)
    .then((response) => response.json())
    .then((data) => {
      if (isCurrent) setUser(data);
    });

  return () => {
    isCurrent = false;
  };
}, [userId]);
\`\`\`

When \`userId\` changes again before the previous fetch resolves, React runs the cleanup for the old effect (setting \`isCurrent\` to \`false\` for that closure), so the outdated response is silently ignored when it eventually arrives.

## Why fetching belongs in an effect, not directly in the component body

Calling \`fetch(...)\` directly in the component's function body would fire a brand-new network request on *every single render* — including re-renders triggered by unrelated state changes. Wrapping it in \`useEffect\` with the right dependency array ensures the request only fires when the data you're fetching actually needs to change.

## Mental model

Think of data fetching as: render immediately with "I don't have the data yet" (loading state), kick off the request as a side effect, and then update state (triggering a new render) once the response comes back. The component is always rendering *something* — it's just modeling every possible stage of the request as its own piece of state.

## Common mistake

Forgetting the loading and error states, and assuming \`user\` will simply "be there" by the time it's rendered. Since fetching is asynchronous, the very first render of \`UserProfile\` happens *before* any data has arrived — code that assumes \`user.name\` exists immediately will throw, because \`user\` starts out \`null\`.`,
        },
        {
          slug: "the-useref-hook",
          title: "The useRef Hook and Direct DOM Access",
          estimatedMinutes: 8,
          content: `# The useRef Hook and Direct DOM Access

Not every value a component needs to remember should trigger a re-render when it changes — and sometimes you need direct access to an actual DOM element (to focus an input, measure its size, or play a video). \`useRef\` covers both of these needs.

## Accessing a DOM element

\`\`\`jsx
import { useRef } from "react";

function SearchBox() {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus the input</button>
    </div>
  );
}
\`\`\`

Passing \`ref={inputRef}\` to a JSX element tells React: "once this element exists in the real DOM, store a reference to it in \`inputRef.current\`." From then on, \`inputRef.current\` *is* the actual DOM node — you can call any native DOM method on it (\`.focus()\`, \`.scrollIntoView()\`, \`.play()\`).

## Storing a mutable value that survives re-renders (without causing one)

\`useRef\` also works as a general-purpose "box" for a value that needs to persist across renders, but that shouldn't cause a re-render when it changes — unlike \`useState\`.

\`\`\`jsx
function StopwatchLogger() {
  const renderCount = useRef(0);

  renderCount.current = renderCount.current + 1;

  return <p>This component has rendered {renderCount.current} times</p>;
}
\`\`\`

Updating \`renderCount.current\` doesn't schedule a re-render the way \`setState\` would — it just quietly updates the stored value. This makes refs the right tool for things like storing a timer ID (to \`clearInterval\` it later), tracking a previous prop value, or holding a value that changes too often to justify a re-render each time.

## useRef vs. useState: which one to reach for

- Use **useState** when the value affects what's rendered on screen — React needs to re-render for the UI to reflect the new value.
- Use **useRef** when you need to remember a value or access a DOM node, but changing it should have no direct effect on what's rendered.

\`\`\`jsx
function VideoPlayer() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlay() {
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <div>
      <video ref={videoRef} src="/demo.mp4" />
      <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
}
\`\`\`

Here, \`isPlaying\` is state (it affects the button's label, so it needs to trigger a re-render), while \`videoRef\` is a ref (it just gives direct, imperative access to the \`<video>\` element itself).

## Mental model

Think of a ref as a sticky note pinned to your component that React will never look at when deciding whether to re-render. It's a stable, mutable container that survives across renders — perfect for "escape hatches" into the imperative world of DOM APIs and mutable values, separate from the declarative state that drives your UI.

## Common mistake

Using a ref for a value that actually should drive what's rendered, like storing form input text in \`useRef\` instead of \`useState\`. Since updating a ref doesn't cause a re-render, the UI would never visibly reflect the new value — refs are for values React doesn't need to react to.`,
        },
      ],
    },
    {
      title: "Preserving State, Portals & Forwarding Refs",
      lessons: [
        {
          slug: "preserving-and-resetting-state",
          title: "Preserving and Resetting State with the key Prop",
          estimatedMinutes: 8,
          content: `# Preserving and Resetting State with the key Prop

Here's a fact about React that trips up a lot of people the first time they hit it: state isn't tied to a component's *props* — it's tied to a component's **position in the tree**. As long as the same component type renders in the same spot on every render, React preserves its state, even if the props it receives change completely.

## The surprising default

\`\`\`jsx
function ChatPanel({ contact }) {
  const [draft, setDraft] = useState("");

  return (
    <div>
      <h3>Chat with {contact.name}</h3>
      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} />
    </div>
  );
}

function App() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  return (
    <div>
      <ContactList onSelect={setSelectedContact} />
      <ChatPanel contact={selectedContact} />
    </div>
  );
}
\`\`\`

Switching \`selectedContact\` re-renders \`ChatPanel\` with new \`contact\` props — but \`draft\` is **not** reset. Since \`ChatPanel\` renders at the exact same position in the tree every time, React treats it as "the same component instance," and keeps its \`useState\` value intact. If you had half-typed a message to Alice, switching to Bob's chat would show *Alice's* half-typed draft still sitting in the textarea, now attached to Bob's conversation — clearly not what a user expects.

## Forcing a reset with key

The \`key\` prop you've already used for list items works here too — it's really a general-purpose "identity" tag React uses everywhere, not just in lists. Giving a component a \`key\` that changes tells React "this is conceptually a different instance," and it discards the old one's state entirely instead of reusing it:

\`\`\`jsx
function App() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  return (
    <div>
      <ContactList onSelect={setSelectedContact} />
      <ChatPanel key={selectedContact.id} contact={selectedContact} />
    </div>
  );
}
\`\`\`

Now, every time \`selectedContact.id\` changes, React sees a different \`key\` at that position and throws away the old \`ChatPanel\` instance (and its \`draft\` state) completely, mounting a brand-new one with fresh state — exactly the reset behavior you want when switching between independent conversations.

## The reverse case: deliberately preserving state

The same mechanism explains why two sibling elements of *different* types at the same position never share state, and why conditionally swapping between two instances of the *same* component type at the same position (like toggling between two \`<Counter />\` renders based on a boolean) actually preserves state across the toggle, unless a \`key\` says otherwise.

## Mental model

Think of \`key\` as an explicit identity card for a component instance. Without one, React quietly assumes "same type, same spot, same instance" and reuses state; with one, you're telling React exactly when two renders represent genuinely different instances that shouldn't share any memory.

## Common mistake

Expecting a component's internal state to automatically reset just because one of its props changed. React has no idea a "new" logical instance is intended unless you tell it via \`key\` — from React's point of view, a prop change and a fresh instance look identical unless the key says otherwise.`,
        },
        {
          slug: "portals-for-modals-and-overlays",
          title: "Rendering Outside the Tree with Portals",
          estimatedMinutes: 8,
          content: `# Rendering Outside the Tree with Portals

Modals, tooltips, and dropdown menus share a common, annoying CSS problem: they need to visually sit *above* everything else on the page, but if they're rendered deep inside a component with \`overflow: hidden\` or a constrained \`z-index\` stacking context, they can get clipped or hidden no matter how high you set their own \`z-index\`. **Portals** solve this by rendering a component's output into a completely different part of the real DOM, while keeping it logically part of the same React tree.

## Creating a portal

\`\`\`jsx
import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose}>×</button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
\`\`\`

\`\`\`html
<!-- index.html -->
<body>
  <div id="root"></div>
  <div id="modal-root"></div>
</body>
\`\`\`

\`createPortal(children, domNode)\` takes JSX and a real DOM node, and tells React to render that JSX into \`domNode\` instead of wherever \`Modal\` happens to sit in the component tree. \`#modal-root\` lives as a sibling of \`#root\` at the very top of the page, completely outside any parent's \`overflow\` or stacking-context constraints that \`Modal\` might otherwise be nested inside.

## What stays the same despite the DOM jump

This is the key insight: a portal changes **where** something appears in the real DOM, but changes nothing about its place in the **React tree**. Props still flow into it normally, context providers still reach it, and — perhaps most surprisingly — DOM events still **bubble up through the React component tree**, not the real DOM position:

\`\`\`jsx
function App() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div onClick={() => console.log("App div clicked")}>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <button onClick={() => console.log("Inside modal clicked")}>Confirm</button>
        </Modal>
      )}
    </div>
  );
}
\`\`\`

Clicking the button inside the portal-rendered modal still logs *both* messages — React bubbles the click event up through the component tree (\`Modal\` → \`App\`), even though in the real DOM, \`#modal-root\` isn't actually a descendant of that \`<div>\` at all.

## Mental model

Think of a portal like a pneumatic tube in an old department store: the payment slip (JSX output) physically travels to a different location (a different part of the real DOM), but it's still logically part of the same transaction (the React tree) — approvals, context, and event handling all still flow through the original chain of command.

## Common mistake

Forgetting to add the target DOM node (like \`<div id="modal-root">\`) to \`index.html\` before calling \`createPortal\`. Since \`document.getElementById(...)\` returns \`null\` if the node doesn't exist yet, \`createPortal\` will throw — the portal target must exist in the real DOM before any component tries to render into it.`,
        },
        {
          slug: "forwardref-and-useimperativehandle",
          title: "Exposing DOM Nodes with forwardRef and useImperativeHandle",
          estimatedMinutes: 8,
          content: `# Exposing DOM Nodes with forwardRef and useImperativeHandle

You've used \`ref\` on plain HTML elements like \`<input ref={inputRef} />\` to get direct DOM access. But what happens when you want a ref on a *custom* component you built yourself — say, a reusable \`<TextField ref={fieldRef} />\`? By default, function components don't accept \`ref\` like a regular prop, because React reserves it for its own internal bookkeeping.

## The problem

\`\`\`jsx
function TextField({ label }) {
  return (
    <label>
      {label}
      <input />
    </label>
  );
}

function SearchPage() {
  const fieldRef = useRef(null);
  // fieldRef.current is null — TextField doesn't know what to do with a ref
  return <TextField ref={fieldRef} label="Search" />;
}
\`\`\`

## Forwarding the ref down to the real DOM node

\`forwardRef\` wraps a component so it can accept a \`ref\` and manually pass it along to whichever inner DOM element should actually receive it:

\`\`\`jsx
import { forwardRef } from "react";

const TextField = forwardRef(function TextField({ label }, ref) {
  return (
    <label>
      {label}
      <input ref={ref} />
    </label>
  );
});

function SearchPage() {
  const fieldRef = useRef(null);

  function focusField() {
    fieldRef.current.focus(); // now works — fieldRef.current is the real <input>
  }

  return <TextField ref={fieldRef} label="Search" />;
}
\`\`\`

*(In React 19 and later, function components can accept \`ref\` as a plain second parameter without \`forwardRef\` at all — but you'll still see \`forwardRef\` constantly in existing codebases and library code, so it's worth recognizing.)*

## Exposing a custom API instead of the raw node

Sometimes you don't want the parent to have full, unrestricted access to the DOM node — just a couple of specific actions. \`useImperativeHandle\` lets a component customize exactly what a ref exposes:

\`\`\`jsx
import { forwardRef, useImperativeHandle, useRef } from "react";

const TextField = forwardRef(function TextField({ label }, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
    clear: () => { inputRef.current.value = ""; },
  }));

  return (
    <label>
      {label}
      <input ref={inputRef} />
    </label>
  );
});
\`\`\`

Now \`fieldRef.current\` only has \`.focus()\` and \`.clear()\` — not the entire raw \`<input>\` DOM API — which keeps the component's internals more encapsulated and its public surface intentional.

## When to reach for these

Both tools are genuine escape hatches, meant for the same handful of imperative use cases refs are generally for: focusing an input, scrolling an element into view, triggering a CSS animation, or integrating a non-React library that needs a real DOM node. They're not a way to pass data down — props and state remain the right tool for anything that should affect what's rendered.

## Mental model

Think of \`forwardRef\` as punching a small, deliberate hole through a component's boundary so a parent can reach the DOM node inside; \`useImperativeHandle\` is choosing to cover that hole with a narrow, custom-shaped adapter (\`.focus()\`, \`.clear()\`) instead of leaving it wide open to the entire raw DOM element.

## Common mistake

Reaching for \`forwardRef\` and \`useImperativeHandle\` to solve problems that plain props and state would solve more simply — for example, exposing an imperative \`setValue()\` method instead of just accepting a \`value\` prop and an \`onChange\` callback. Save these tools for genuinely imperative needs (focus, scroll, animation, third-party DOM integration), not as a general communication channel between components.`,
        },
      ],
    },
    {
      title: "Context, Composition & the Re-render Model",
      lessons: [
        {
          slug: "usecontext-and-prop-drilling",
          title: "useContext and Avoiding Prop Drilling",
          estimatedMinutes: 9,
          content: `# useContext and Avoiding Prop Drilling

Props flow one direction, from parent to child — which works well until a deeply nested component needs a value that lives many levels up, and every component in between has to accept and forward it purely to pass it along. This is called **prop drilling**, and \`useContext\` is React's built-in solution.

## The problem: prop drilling

\`\`\`jsx
function App() {
  const theme = "dark";
  return <Page theme={theme} />;
}

function Page({ theme }) {
  return <Sidebar theme={theme} />; // Page doesn't use theme itself
}

function Sidebar({ theme }) {
  return <UserMenu theme={theme} />; // neither does Sidebar
}

function UserMenu({ theme }) {
  return <button className={theme}>Menu</button>; // only this needs it
}
\`\`\`

\`Page\` and \`Sidebar\` don't care about \`theme\` at all — they only accept and forward it because \`UserMenu\`, several levels down, needs it. In a large app, this makes refactoring painful and clutters components with props they never actually use.

## Creating and providing context

\`\`\`jsx
import { createContext, useContext } from "react";

const ThemeContext = createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Page />
    </ThemeContext.Provider>
  );
}

function Page() {
  return <Sidebar />;
}

function Sidebar() {
  return <UserMenu />;
}

function UserMenu() {
  const theme = useContext(ThemeContext);
  return <button className={theme}>Menu</button>;
}
\`\`\`

\`createContext\` defines a channel that any descendant can tap into. \`<ThemeContext.Provider value="dark">\` makes \`"dark"\` available to every component nested inside it, no matter how deep. \`UserMenu\` reads it directly with \`useContext(ThemeContext)\` — \`Page\` and \`Sidebar\` never need to know \`theme\` exists.

## Combining context with state

Context is often paired with \`useState\` (or \`useReducer\`, covered later) to share both a value *and* a way to update it:

\`\`\`jsx
const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Page />
    </ThemeContext.Provider>
  );
}

function ThemeToggleButton() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Current theme: {theme}
    </button>
  );
}
\`\`\`

## When (and when not) to reach for context

Context is a great fit for genuinely "global" values: the current theme, the logged-in user, the active locale/language. It's not a general replacement for passing props — if only one or two components need a value, plain props are simpler and easier to trace. Reach for context once passing something down has become a real drilling problem across many layers.

## Mental model

Think of context like a radio broadcast: the \`Provider\` is the transmitter, broadcasting a value to everything inside it, and any component can tune in with \`useContext\` without needing a direct wired connection (props) from the broadcaster.

## Common mistake

Wrapping *everything* in context "just in case," even values only used by one or two nearby components. Overusing context makes it harder to trace where a value actually comes from and can cause broader re-renders than plain props would — reserve it for values that are truly shared widely across the tree.`,
        },
        {
          slug: "component-composition-patterns",
          title: "Component Composition Patterns",
          estimatedMinutes: 8,
          content: `# Component Composition Patterns

As apps grow, you'll run into situations where deeply nested components need to be customized by their callers in flexible ways. React favors solving these problems through **composition** — passing components as props or children — rather than building ever-more-configurable single components.

## The "container" pattern with children

You've already seen this with the \`Card\` component earlier — a wrapper component that renders whatever \`children\` it's given:

\`\`\`jsx
function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Modal onClose={() => setShowModal(false)}>
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this item?</p>
    </Modal>
  );
}
\`\`\`

\`Modal\` handles the overlay, positioning, and close button — but has no idea what content it wraps. This keeps \`Modal\` reusable for confirmation dialogs, forms, image previews, or anything else a caller wants to put inside it.

## Passing components as props (slots)

Sometimes a component needs more than one customizable region. You can pass whole components (not just children) as regular props:

\`\`\`jsx
function Layout({ header, sidebar, children }) {
  return (
    <div className="layout">
      <header>{header}</header>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}

function App() {
  return (
    <Layout
      header={<NavBar />}
      sidebar={<FilterPanel />}
    >
      <ProductGrid />
    </Layout>
  );
}
\`\`\`

\`Layout\` defines the overall structure, while \`App\` decides exactly what fills each region — without \`Layout\` needing to import or know anything about \`NavBar\`, \`FilterPanel\`, or \`ProductGrid\`.

## Composition over configuration

A tempting but brittle alternative is to give a single component more and more boolean props to control its behavior (\`<Card showHeader showFooter compact bordered rounded>\`). This tends to spiral as requirements grow. Composition — building bigger components out of smaller, focused ones passed in as children or props — usually scales better, because each piece stays simple and the *caller* decides how to combine them.

## Mental model

Think of composition like LEGO bricks versus a single overly-configurable action figure. A pile of small, focused pieces (components) can be assembled in many combinations; one giant component with fifty boolean props is a single, rigid mold that's hard to bend to a new requirement without adding yet another prop.

## Common mistake

Reaching for prop-drilling of many unrelated boolean/config props to control a component's internal rendering, instead of just letting the caller pass in the actual JSX for the parts that vary. If a component's prop list is ballooning to control layout or content choices, that's usually a sign it should accept \`children\` or slot props instead.`,
        },
        {
          slug: "the-rerender-mental-model",
          title: "Understanding Re-renders in React",
          estimatedMinutes: 9,
          content: `# Understanding Re-renders in React

You've now used state, props, effects, and context — all of which can trigger a component to re-render. Building an accurate mental model of *when* and *why* React re-renders is essential before tackling performance optimization in the next tier.

## What triggers a render

A component re-renders when:

1. **Its own state changes** (a \`useState\` or \`useReducer\` setter is called).
2. **Its parent re-renders** — by default, when a parent component re-renders, React re-renders all of its children too, even if their props didn't change.
3. **A context value it reads via \`useContext\` changes.**

\`\`\`jsx
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child /> {/* re-renders every time Parent does, even with no props */}
    </div>
  );
}

function Child() {
  console.log("Child rendered");
  return <p>I'm a child component</p>;
}
\`\`\`

Clicking the button re-renders \`Parent\` (because its state changed) *and* \`Child\` — even though \`Child\` receives no props and displays nothing related to \`count\`. This is expected default behavior, not a bug.

## Render vs. commit vs. "the DOM actually changing"

It helps to keep three different things distinct:

- **A component function running again** ("rendering") — this is just JavaScript executing, recalculating what the JSX *should* look like.
- **React committing changes to the real DOM** — this only touches the specific DOM nodes that actually changed, thanks to the diffing you learned about earlier.
- **The user visibly seeing something different** — this only happens if the *output* JSX actually differs from before; if a child re-renders but produces identical JSX, React skips updating the real DOM for it entirely.

So \`Child\` re-rendering above means its function ran again and produced a new (but identical-looking) description of the UI — React still avoids touching the actual DOM for it, because nothing in its output actually changed.

## Why this matters before you learn optimization tools

The next tier introduces \`React.memo\`, \`useMemo\`, and \`useCallback\` — all tools for *reducing unnecessary re-renders or expensive recalculations*. They only make sense once you understand what's "unnecessary" in the first place: a re-render itself is cheap and completely normal; it only becomes a performance problem when a component does something expensive on every render (a costly calculation, or re-rendering a very large list) and that work isn't actually needed most of the time.

## Mental model

Picture a re-render as React asking a component "given your current inputs, what should you look like?" — a cheap question to ask, and asked far more often than the DOM actually changes as a result. Treat frequent re-renders as normal background noise, and only reach for optimization once you've actually observed a specific, measurable slowdown.

## Common mistake

Assuming every re-render is expensive and reaching for memoization everywhere "just in case." Rendering itself — just calling component functions — is usually very fast. Premature optimization adds complexity (and sometimes even slows things down) without a real, measured problem to justify it.`,
        },
      ],
    },
    {
      title: "Modern Data Fetching with TanStack Query",
      lessons: [
        {
          slug: "limits-of-manual-fetching",
          title: "Where Manual useEffect Fetching Breaks Down",
          estimatedMinutes: 7,
          content: `# Where Manual useEffect Fetching Breaks Down

The \`useEffect\` data-fetching pattern from an earlier lesson works, and it's important to understand it — but as an app grows past a handful of components, its rough edges start to show. This lesson is about *why*, which motivates reaching for a dedicated data-fetching library rather than hand-rolling the same pattern everywhere.

## Problem 1: no caching between visits

\`\`\`jsx
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(\`/api/products/\${productId}\`).then((r) => r.json()).then(setProduct);
  }, [productId]);

  // ...
}
\`\`\`

Navigate away from this page and back, and it fetches from scratch every single time — even if the data hasn't changed and was already sitting in memory moments ago. There's no built-in concept of "I already have this, and it's still fresh."

## Problem 2: duplicate requests

If two separate components on the same page both need the same product (say, a header preview and the main detail view), each independently runs its own \`useEffect\` and fires its own \`fetch\` — two network requests for identical data, with no coordination between them.

## Problem 3: repeating the same loading/error/race-condition boilerplate everywhere

Every component that fetches data ends up re-implementing the same three-piece \`data\`/\`isLoading\`/\`error\` state, the same \`isCurrent\` race-condition guard from the earlier lesson, and often the same retry-on-failure logic — by hand, over and over, slightly differently each time.

## Problem 4: no answer for "is this data still fresh?"

Real apps often want data to automatically refetch in the background — when the user refocuses the browser tab, when they reconnect to the internet, or after a set amount of time — to keep the UI from silently going stale. Building all of that by hand on top of \`useEffect\` is a substantial amount of infrastructure for something that should be a solved problem.

## The motivation for a dedicated library

Libraries like **TanStack Query** (formerly React Query) and **SWR** exist specifically to solve caching, deduplication, background refetching, and loading/error state management for server data — as a well-tested, shared solution instead of a bespoke one rebuilt in every component. The next two lessons introduce TanStack Query, the most widely adopted of these in the current React ecosystem.

## Mental model

Think of manual \`useEffect\` fetching as writing your own small database cache from scratch, one component at a time. It works, but every component reinvents the same wheel slightly differently. A dedicated data-fetching library is that wheel, built once, well-tested, and shared.

## Common mistake

Concluding that \`useEffect\`-based fetching was "wrong" all along. It isn't — it's the right *foundation* to understand first, since it's exactly what a library like TanStack Query is built on top of internally. Understanding the manual pattern is what makes the library's behavior (caching, refetching, request deduplication) make sense rather than feel like magic.`,
        },
        {
          slug: "tanstack-query-basics",
          title: "Fetching and Caching with TanStack Query",
          estimatedMinutes: 9,
          content: `# Fetching and Caching with TanStack Query

**TanStack Query** wraps the entire loading/error/caching dance from manual \`useEffect\` fetching into a single hook: \`useQuery\`. This lesson covers the basic setup and the core hook.

## Setup

\`\`\`bash
npm install @tanstack/react-query
\`\`\`

\`\`\`jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProductPage productId="42" />
    </QueryClientProvider>
  );
}
\`\`\`

The \`QueryClient\` holds the actual cache in memory; wrapping your app in \`QueryClientProvider\` (a context provider, just like the ones you've already built) makes that cache available to every \`useQuery\` call anywhere in the tree.

## useQuery replaces the manual pattern

\`\`\`jsx
import { useQuery } from "@tanstack/react-query";

function ProductPage({ productId }) {
  const { data: product, isLoading, error } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => fetch(\`/api/products/\${productId}\`).then((res) => res.json()),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Could not load product.</p>;
  return <h1>{product.name}</h1>;
}
\`\`\`

Compare this to the manual version from earlier: no \`useState\` triple, no \`useEffect\`, no manual race-condition guard — \`useQuery\` gives you \`data\`, \`isLoading\`, and \`error\` directly, and handles the fetch lifecycle internally.

## What the queryKey buys you

\`queryKey: ["product", productId]\` is how TanStack Query identifies *which* piece of cached data this call refers to. Two components calling \`useQuery\` with the identical key automatically **share** the same cached result and the same in-flight request — solving the duplicate-request problem from the previous lesson without any coordination code of your own.

\`\`\`jsx
// Both of these share one cached result and one network request, not two:
function ProductHeaderPreview({ productId }) {
  const { data } = useQuery({ queryKey: ["product", productId], queryFn: fetchProduct });
  return <span>{data?.name}</span>;
}

function ProductDetail({ productId }) {
  const { data } = useQuery({ queryKey: ["product", productId], queryFn: fetchProduct });
  return <h1>{data?.name}</h1>;
}
\`\`\`

## Background refetching for free

By default, TanStack Query refetches "stale" data automatically when the browser window regains focus or the network reconnects — keeping the UI fresh without you writing any of that logic. You can tune how long data is considered fresh with the \`staleTime\` option, trading off freshness against fewer network requests.

## Mental model

Think of \`useQuery\` as asking a shared, smart cache "do you already have this, is it still fresh, and if not, please go get it" — rather than each component independently deciding to fetch and independently tracking its own loading state.

## Common mistake

Passing a \`queryKey\` that doesn't actually capture everything the query depends on — for example, \`["product"]\` without \`productId\`. Two different products would then incorrectly share one cache entry, and switching products might briefly show the *previous* product's stale data before anyone notices something's wrong.`,
        },
        {
          slug: "mutations-and-invalidation",
          title: "Mutations and Cache Invalidation",
          estimatedMinutes: 8,
          content: `# Mutations and Cache Invalidation

\`useQuery\` handles reading data (GET requests). Writing data — creating, updating, or deleting something on the server — is a different kind of operation with different needs: it happens on demand (triggered by a user action, not automatically on mount), and afterward, any cached data it affects needs to be told it's now out of date. TanStack Query's \`useMutation\` and \`queryClient.invalidateQueries\` cover both halves of this.

## useMutation for a write operation

\`\`\`jsx
import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddTodoForm() {
  const queryClient = useQueryClient();
  const [text, setText] = useState("");

  const addTodo = useMutation({
    mutationFn: (newTodo) =>
      fetch("/api/todos", {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    addTodo.mutate({ text });
    setText("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="submit" disabled={addTodo.isPending}>
        {addTodo.isPending ? "Adding..." : "Add Todo"}
      </button>
    </form>
  );
}
\`\`\`

Unlike \`useQuery\`, which runs automatically, \`useMutation\` gives you a \`.mutate(...)\` function you call explicitly — in response to a form submission, a button click, or any other user-triggered action.

## Why invalidation matters

\`\`\`jsx
function TodoList() {
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then((res) => res.json()),
  });

  return <ul>{todos?.map((t) => <li key={t.id}>{t.text}</li>)}</ul>;
}
\`\`\`

\`TodoList\` and \`AddTodoForm\` might be two completely separate components, with no direct relationship to each other. After a successful \`addTodo.mutate(...)\`, the cached \`["todos"]\` list is now stale — it doesn't include the newly created todo. \`queryClient.invalidateQueries({ queryKey: ["todos"] })\` tells the cache "anything using this key is out of date," which triggers \`TodoList\`'s \`useQuery\` to automatically refetch — without \`AddTodoForm\` needing any direct reference to \`TodoList\` at all.

## Tracking mutation state

\`useMutation\` exposes \`isPending\`, \`isError\`, and \`isSuccess\` flags, the same shape of state you'd otherwise track by hand — used above to disable the submit button and show a loading label while the request is in flight.

## Mental model

Think of \`invalidateQueries\` as ringing a bell that says "anyone holding data under this key, it might be stale now — go check again." Components don't need to know about each other directly; they just agree on a shared key, and the cache handles keeping everyone in sync.

## Common mistake

Manually updating local component state after a successful mutation instead of invalidating the related query. This can work for one component, but silently leaves every *other* component relying on the same cached data out of sync — invalidation (or an explicit cache update via \`setQueryData\`) keeps every consumer of that data consistent, not just the one that triggered the mutation.`,
        },
      ],
    },
    {
      title: "Advanced Forms and Validation",
      lessons: [
        {
          slug: "validating-forms-by-hand",
          title: "Validating Forms by Hand",
          estimatedMinutes: 7,
          content: `# Validating Forms by Hand

You've already built controlled forms with \`useState\`. Real forms almost always need **validation** — checking that an email looks like an email, a password is long enough, a required field isn't empty — and showing helpful errors when something's wrong. This lesson covers doing that by hand, which is worth understanding before reaching for a library in the next lesson.

## Tracking errors alongside form data

\`\`\`jsx
function SignupForm() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  function validate(values) {
    const newErrors = {};
    if (!values.email.includes("@")) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (values.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }
    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log("Submitting:", values);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" value={values.email} onChange={handleChange} />
      {errors.email && <p className="error">{errors.email}</p>}

      <input name="password" type="password" value={values.password} onChange={handleChange} />
      {errors.password && <p className="error">{errors.password}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
\`\`\`

\`validate\` is a plain function that inspects the current values and returns an object describing what's wrong. On submit, it runs, and any resulting errors are stored in state, which conditionally renders an error message beside the relevant field.

## Validating on blur vs. on submit

Running \`validate\` on every keystroke can feel harsh (showing "invalid email" while the user has typed only "j"). A common middle ground is validating a field once the user leaves it (\`onBlur\`), and re-validating everything on submit:

\`\`\`jsx
function handleBlur(event) {
  const { name } = event.target;
  const fieldErrors = validate(values);
  setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] }));
}
\`\`\`

## Where hand-rolled validation gets painful

As a form grows past three or four fields — with cross-field rules (password and confirm-password must match), async checks (is this email already taken?), and consistent error-message formatting — the amount of bespoke state and wiring grows quickly. That's precisely the gap the next lesson's library fills.

## Mental model

Think of form validation as a pure function: given the current values, it returns the current errors. Keeping \`validate\` as a plain, dependency-free function (rather than scattering checks across multiple event handlers) keeps it testable and easy to reason about, independent of how or when it gets called.

## Common mistake

Validating only on submit and never clearing a field's error once the user fixes it. Without re-validating (or explicitly clearing that field's error) as the user edits, they can fix the problem and still see a stale error message sitting on screen, with no clear signal that it's now resolved.`,
        },
        {
          slug: "react-hook-form-basics",
          title: "React Hook Form: Uncontrolled-First Forms",
          estimatedMinutes: 8,
          content: `# React Hook Form: Uncontrolled-First Forms

**React Hook Form** is the most widely used form library in the React ecosystem. Its core idea is different from the fully-controlled pattern you've used so far: instead of a \`useState\` (and a re-render) for every single field on every keystroke, it lets the DOM manage each input's value internally (uncontrolled, using refs under the hood) and only pulls values out when it actually needs them — dramatically reducing re-renders on large forms.

## Basic setup

\`\`\`bash
npm install react-hook-form
\`\`\`

\`\`\`jsx
import { useForm } from "react-hook-form";

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  function onSubmit(data) {
    console.log("Submitting:", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", { required: "Email is required" })} />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input
        type="password"
        {...register("password", { minLength: { value: 8, message: "Must be at least 8 characters" } })}
      />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
\`\`\`

## What register actually does

\`{...register("email", { required: "..." })}\` spreads a \`name\`, a \`ref\`, and change/blur handlers onto the \`<input>\`. React Hook Form uses that \`ref\` to read the input's value directly from the DOM when needed, instead of keeping it in React state on every keystroke — this is the uncontrolled approach from way back in the forms lesson, but managed for you.

## handleSubmit does validation and collection for you

\`handleSubmit(onSubmit)\` wraps your submit handler: it first runs validation based on the rules passed to \`register\`, and only calls your \`onSubmit(data)\` with the collected form values if everything passes. If validation fails, \`errors\` is populated instead, and your \`onSubmit\` never runs.

## Why this matters at scale

\`\`\`jsx
// A form with 30 fields using plain useState re-renders the ENTIRE form
// on every keystroke in any single field. React Hook Form re-renders
// only what's necessary — often just the one field, or nothing at all,
// until submission.
\`\`\`

For small forms, the difference is invisible. For large, complex forms (multi-step checkouts, admin panels with dozens of fields), avoiding a full-form re-render on every keystroke is a real, measurable performance win — and the library removes a large amount of validation boilerplate regardless of form size.

## Mental model

Think of React Hook Form as putting the DOM back in charge of each input's day-to-day value (the uncontrolled approach), while React Hook Form quietly tracks refs to all of them, only pulling values together into one object at the moments you actually asked for — on submit, or when you explicitly \`watch()\` a field.

## Common mistake

Mixing \`register\`'s uncontrolled fields with a separate \`useState\` for the same field, trying to have both control the same input. Pick one model per field — either let React Hook Form own it via \`register\`, or use \`Controller\` (a documented escape hatch for genuinely controlled/custom inputs) — mixing them causes the input's value and React Hook Form's internal tracking to fall out of sync.`,
        },
        {
          slug: "schema-validation-with-zod",
          title: "Schema Validation with Zod",
          estimatedMinutes: 7,
          content: `# Schema Validation with Zod

Writing validation rules inline, field by field (as in the previous lesson), works but scatters your form's actual "shape" and rules across many small \`register(...)\` calls. **Zod** is a schema-validation library that lets you describe an entire form's shape and rules in one place — and, as you'll see in the TypeScript module, double as your TypeScript types with zero duplication.

## Defining a schema

\`\`\`js
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});
\`\`\`

\`z.object({...})\` describes the exact shape data should have; each field's validators (\`.email()\`, \`.min(8, ...)\`) carry their own error messages. \`.refine(...)\` handles cross-field rules — here, checking that two separate fields agree with each other, something that's awkward to express with per-field rules alone.

## Wiring a schema into React Hook Form

\`\`\`jsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(data) {
    console.log("Valid data:", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <p className="error">{errors.email.message}</p>}

      <input type="password" {...register("password")} />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <input type="password" {...register("confirmPassword")} />
      {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
}
\`\`\`

The \`resolver: zodResolver(signupSchema)\` option tells React Hook Form to run validation through the schema instead of (or alongside) individual \`register\` rules — \`register("email")\` no longer needs its own inline rules at all, since the schema is now the single source of truth.

## Why a schema is worth the extra step

- **One definition, one place** — the entire form's shape and rules live in a single, readable object, instead of scattered across every \`register(...)\` call.
- **Reusable beyond forms** — the same \`signupSchema\` can validate data coming from an API response, a URL parameter, or anywhere else untrusted data enters your app, not just this one form.
- **Feeds directly into TypeScript** — Zod can *derive* a TypeScript type from a schema (\`z.infer<typeof signupSchema>\`), so your types and your runtime validation can never silently drift apart.

## Mental model

Think of a schema as a single contract describing what "valid data" means for a particular shape of data — a form is just one of many places that contract gets enforced, alongside API responses, config files, or anything else you don't fully control the shape of.

## Common mistake

Duplicating validation logic — writing it once by hand in a component, and again separately in a Zod schema used elsewhere for the same data. Once a schema exists for a given shape of data, treat it as the single source of truth and reuse it everywhere that shape needs validating, rather than letting two versions of "what's valid" drift apart over time.`,
        },
      ],
    },
    {
      title: "TypeScript with React",
      lessons: [
        {
          slug: "why-typescript-with-react",
          title: "Why TypeScript for React",
          estimatedMinutes: 6,
          content: `# Why TypeScript for React

Every example so far has been plain JavaScript. **TypeScript** adds a layer of static types on top of JavaScript — checked before your code ever runs — and it's become the default choice for serious React codebases. This lesson covers why, and what actually changes.

## What TypeScript catches that JavaScript doesn't

\`\`\`jsx
// Plain JavaScript — this typo is only discovered at runtime, if you're lucky
function Greeting({ name }) {
  return <h1>Hello, {nmae}!</h1>; // typo: "nmae" — silently renders "undefined"
}
\`\`\`

\`\`\`tsx
// TypeScript — this typo is a compile-time error, caught before you ever run the app
function Greeting({ name }: { name: string }) {
  return <h1>Hello, {nmae}!</h1>; // Error: Cannot find name 'nmae'.
}
\`\`\`

More importantly, TypeScript catches **wrong usage from the caller's side** too — passing a number where a component expects a string, forgetting a required prop entirely, or calling a function with the wrong number of arguments — all flagged immediately in your editor, rather than discovered later as a runtime bug or, worse, in production.

## Setting up a TypeScript React project

\`\`\`bash
npm create vite@latest my-app -- --template react-ts
\`\`\`

This scaffolds the same project structure you've used throughout this course, with one difference: components live in \`.tsx\` files instead of \`.jsx\`, and TypeScript checks every file as you write it.

## What doesn't change

JSX itself, hooks, props, state, effects, context — every concept from this entire course works identically in TypeScript. TypeScript doesn't introduce new React concepts; it adds a description of the *shape* of the data flowing through the concepts you already know.

## The honest tradeoff

TypeScript has a real learning curve, and it does add some upfront ceremony — you have to describe types for props, state, and function signatures. In exchange, you get autocomplete that actually knows what's on an object, safer large-scale refactors (rename a prop, and every usage that needs updating lights up as an error), and bugs caught before your code ever runs, rather than by a user in production. For any codebase more than a few files or worked on by more than one person, this tradeoff overwhelmingly favors TypeScript — which is why it's now the default recommendation for new React projects in the official docs and in virtually every professional job.

## Mental model

Think of TypeScript as a very fast, very literal collaborator who reads every line of your code and immediately flags anything that doesn't match the shapes you've described — before you ever hit save and run the app, rather than after a user hits a bug.

## Common mistake

Treating TypeScript as "extra work with no payoff" because a small toy project never surfaces a type-related bug. The value compounds with codebase size, team size, and time — a solo three-file prototype may not need it, but almost every real, evolving, multi-person React codebase benefits substantially.`,
        },
        {
          slug: "typing-props-and-state",
          title: "Typing Props and State",
          estimatedMinutes: 8,
          content: `# Typing Props and State

The two most common things you'll type in any React component are its **props** and its **state**. This lesson covers the everyday patterns for both.

## Typing props with an interface or type

\`\`\`tsx
interface UserCardProps {
  name: string;
  age: number;
  isAdmin?: boolean; // the ? marks an optional prop
}

function UserCard({ name, age, isAdmin = false }: UserCardProps) {
  return (
    <div>
      <h3>{name} ({age}){isAdmin ? " — Admin" : ""}</h3>
    </div>
  );
}
\`\`\`

\`interface UserCardProps { ... }\` describes exactly what props this component accepts, including which are required and which are optional (\`isAdmin?\`). Forgetting a required prop, or passing the wrong type (\`age="30"\` instead of \`age={30}\`), is now a compile-time error at every call site — not something you discover by reading a runtime warning.

## Typing children

\`\`\`tsx
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}
\`\`\`

\`ReactNode\` is the type for "anything React can render" — strings, numbers, elements, arrays of elements, or nothing at all — making it the standard type for a \`children\` prop.

## Typing useState

For simple cases, TypeScript can usually **infer** the type from the initial value, with no extra annotation needed:

\`\`\`tsx
const [count, setCount] = useState(0);        // inferred as number
const [name, setName] = useState("");           // inferred as string
\`\`\`

The tricky case is when the initial value doesn't convey the full range of values a piece of state can hold — most commonly, state that starts as \`null\` before data arrives:

\`\`\`tsx
interface User {
  id: number;
  name: string;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  // TypeScript now knows user might be null, and enforces checking it:
  if (!user) return <p>Loading...</p>;
  return <h2>{user.name}</h2>; // safe: TypeScript knows user is a User here
}
\`\`\`

Without the explicit \`<User | null>\`, TypeScript would infer the type as just \`null\` (from the initial value alone), and \`setUser(fetchedUser)\` later would be a type error — the annotation tells TypeScript the *full range* of values this state will ever hold, not just its starting value.

## Mental model

Think of a props interface as a contract for a component's "inputs," the same way a function signature describes its parameters — and \`useState<T>\` as explicitly telling TypeScript the full range of a value's possible shapes over the component's lifetime, when the starting value alone doesn't reveal it.

## Common mistake

Writing \`useState(null)\` for data that will eventually hold an object, then being confused why \`setUser(fetchedUser)\` shows a type error later. TypeScript inferred the state's type as strictly \`null\` from the initial value — annotate explicitly (\`useState<User | null>(null)\`) whenever a piece of state's eventual shape is broader than what its initial value alone suggests.`,
        },
        {
          slug: "typing-events-and-refs",
          title: "Typing Events, Refs, and Children",
          estimatedMinutes: 8,
          content: `# Typing Events, Refs, and Children

Event handlers and refs are two more places TypeScript needs to know the exact shape of what it's working with — specifically, *which* DOM element or event you're dealing with, since different elements expose different properties.

## Typing an event handler

\`\`\`tsx
function SearchInput() {
  const [query, setQuery] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
  }

  return <input value={query} onChange={handleChange} />;
}
\`\`\`

\`React.ChangeEvent<HTMLInputElement>\` tells TypeScript exactly which kind of event this is (a change event) and which element fired it (an \`<input>\`) — which is how it knows \`event.target.value\` exists and is a \`string\`. A \`<select>\` or a \`<textarea>\` would use \`HTMLSelectElement\` or \`HTMLTextAreaElement\` instead, since each exposes a slightly different set of properties.

\`\`\`tsx
function ContactForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // ...
  }

  return <form onSubmit={handleSubmit}>{/* ... */}</form>;
}
\`\`\`

## Typing useRef

\`\`\`tsx
function SearchBox() {
  const inputRef = useRef<HTMLInputElement>(null);

  function focusInput() {
    inputRef.current?.focus(); // ?. because current starts out null
  }

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={focusInput}>Focus</button>
    </div>
  );
}
\`\`\`

\`useRef<HTMLInputElement>(null)\` tells TypeScript this ref will eventually point at an \`<input>\` element, but starts as \`null\` before the component mounts — which is exactly why \`inputRef.current?.focus()\` needs the optional-chaining \`?.\`: TypeScript is correctly reminding you that \`current\` might not be attached yet.

## Typing a ref used purely as a mutable value

\`\`\`tsx
function StopwatchLogger() {
  const renderCount = useRef<number>(0);
  renderCount.current += 1;
  // ...
}
\`\`\`

Here \`useRef<number>(0)\` is a plain mutable box (from the earlier \`useRef\` lesson), not a DOM ref — TypeScript infers \`number\` from the initial value \`0\` just fine on its own in this simple case, so the explicit \`<number>\` is optional but still a clear, readable choice.

## Mental model

Think of typing an event handler as answering two questions at once: "what kind of event is this?" and "which specific element produced it?" — both determine exactly which properties (\`.value\`, \`.checked\`, \`.files\`) TypeScript will let you safely access on \`event.target\`.

## Common mistake

Typing an event handler's parameter as the generic \`Event\` type instead of the specific React synthetic event type (like \`React.ChangeEvent<HTMLInputElement>\`). The generic \`Event\` type doesn't know about \`.target.value\` at all, forcing awkward workarounds — always reach for the specific React event type matching the actual element and event kind.`,
        },
        {
          slug: "typing-hooks-and-generics",
          title: "Typing Custom Hooks and Generic Components",
          estimatedMinutes: 8,
          content: `# Typing Custom Hooks and Generic Components

Some components and hooks are meant to work with *any* type of data — a generic \`List\` component, a reusable \`useFetch\` hook. TypeScript **generics** let you type these once, in a way that stays precise no matter what specific type they're used with.

## A generic custom hook

Recall the \`useFetch\` custom hook from an earlier lesson. Without generics, its return value would be typed as \`any\` — defeating the entire point of TypeScript for anything built on top of it:

\`\`\`tsx
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((json: T) => { if (isCurrent) setData(json); })
      .catch((err) => { if (isCurrent) setError(err.message); })
      .finally(() => { if (isCurrent) setIsLoading(false); });

    return () => { isCurrent = false; };
  }, [url]);

  return { data, isLoading, error };
}
\`\`\`

\`<T>\` is a **type parameter** — a placeholder for "whatever type the caller says this is." The hook's internals (\`useState<T | null>\`) stay generic, but each call site fills in the specific type:

\`\`\`tsx
interface User {
  id: number;
  name: string;
}

function UserProfile({ userId }: { userId: number }) {
  const { data: user, isLoading, error } = useFetch<User>(\`/api/users/\${userId}\`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h2>{user!.name}</h2>; // TypeScript knows user is User | null here
}
\`\`\`

\`useFetch<User>(...)\` tells TypeScript "for this call, \`T\` is \`User\`" — so \`data\` is correctly typed as \`User | null\`, with full autocomplete on \`user.name\`, rather than the useless \`any\`.

## A generic component

\`\`\`tsx
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((item, index) => <li key={index}>{renderItem(item)}</li>)}</ul>;
}

// Usage — T is inferred as string here:
<List items={["Apple", "Banana"]} renderItem={(fruit) => fruit.toUpperCase()} />

// Usage — T is inferred as User here:
<List items={users} renderItem={(user) => user.name} />
\`\`\`

\`List<T>\` works correctly and safely for an array of strings, an array of \`User\` objects, or any other type — TypeScript infers \`T\` separately at each usage site based on what \`items\` actually contains, and \`renderItem\` is checked against that same inferred type.

## Mental model

Think of a generic type parameter like \`<T>\` as a fill-in-the-blank in a reusable template: the hook or component's logic is written once, describing its shape abstractly ("some array of \`T\`, and a function that takes a \`T\`"), and each concrete usage fills in exactly what \`T\` should be for that particular call.

## Common mistake

Typing a reusable hook or component's data as \`any\` to "make the type error go away" instead of reaching for a generic. This silently throws away type safety for every single place that hook or component gets used — a generic parameter takes a little more effort to set up once, but keeps precise types flowing through every call site afterward.`,
        },
      ],
    },
    {
      title: "Accessibility in React Applications",
      lessons: [
        {
          slug: "semantic-html-and-aria",
          title: "Semantic HTML and ARIA in JSX",
          estimatedMinutes: 7,
          content: `# Semantic HTML and ARIA in JSX

Accessibility (often shortened to "a11y") means building UIs that work for everyone, including people using screen readers, keyboard-only navigation, or other assistive technology. Because JSX gives you the full power of any HTML tag, it's easy to reach for a generic \`<div>\` everywhere — but the tag you choose carries real meaning to assistive technology, not just to sighted mouse users.

## Prefer real elements over generic ones with handlers bolted on

\`\`\`jsx
// Works visually, but invisible to a screen reader as an interactive control,
// unreachable by Tab, and doesn't respond to Enter/Space by default:
function BadButton({ onClick, children }) {
  return <div className="button" onClick={onClick}>{children}</div>;
}

// A real <button> gets all of this for free, automatically:
function GoodButton({ onClick, children }) {
  return <button className="button" onClick={onClick}>{children}</button>;
}
\`\`\`

A native \`<button>\` is automatically keyboard-focusable, triggers \`onClick\` on both Enter and Space, and is announced as "button" by screen readers. A \`<div onClick={...}>\` gets none of that for free — you'd have to manually reimplement all of it (covered in the next lesson) just to match what \`<button>\` already does.

## Using semantic structural elements

\`\`\`jsx
function ArticlePage({ article }) {
  return (
    <article>
      <header>
        <h1>{article.title}</h1>
      </header>
      <nav aria-label="Table of contents">{/* ... */}</nav>
      <main>{article.body}</main>
      <footer>{article.author}</footer>
    </article>
  );
}
\`\`\`

\`<article>\`, \`<header>\`, \`<nav>\`, \`<main>\`, and \`<footer>\` describe the *role* each section plays, not just how it looks — screen reader users can jump directly between landmarks like "navigation" and "main content," the same way sighted users visually scan a page's layout.

## When there's no native element for the job

Sometimes you're building something (a custom dropdown, a tab interface) with no exact native HTML equivalent. ARIA attributes describe roles and states explicitly:

\`\`\`jsx
function Tabs({ tabs, activeIndex, onSelect }) {
  return (
    <div role="tablist">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={index === activeIndex}
          onClick={() => onSelect(index)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
\`\`\`

\`role="tablist"\`/\`role="tab"\` tell assistive technology what this custom widget *means*, and \`aria-selected\` communicates which tab is currently active — information a screen reader has no other way to infer from generic \`<div>\`s and \`<button>\`s alone.

## Mental model

Think of HTML tags and ARIA attributes as a second, parallel description of your UI — one read by assistive technology instead of eyes. The rule of thumb: reach for the correct native element first (it usually already has the right semantics built in), and use ARIA only to describe what genuinely has no native equivalent.

## Common mistake

Adding \`aria-*\` attributes to patch up a \`<div>\` that could have simply been a native, semantically correct element (\`<button>\`, \`<nav>\`, \`<a>\`) from the start. The official accessibility guidance is blunt about this: "No ARIA is better than bad ARIA" — native elements come with correct behavior built in for free, while manually re-implementing it via ARIA is easy to get subtly wrong.`,
        },
        {
          slug: "keyboard-and-focus-management",
          title: "Keyboard Navigation and Focus Management",
          estimatedMinutes: 8,
          content: `# Keyboard Navigation and Focus Management

Not every user operates your app with a mouse or a finger. Keyboard-only users tab between interactive elements and activate them with Enter or Space — and for custom, JavaScript-heavy widgets like modals, you're responsible for making sure focus behaves sensibly, since the browser has no idea one of your \`<div>\`s is meant to act like a dialog.

## Making a custom interactive element keyboard-accessible

If you must build a custom clickable element instead of a native \`<button>\` (rare, but it happens — say, wrapping a complex custom-styled card), you have to manually restore the behavior a real button gives you for free:

\`\`\`jsx
function ClickableCard({ onActivate, children }) {
  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onActivate();
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onActivate}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
}
\`\`\`

\`tabIndex={0}\` makes the \`<div>\` reachable via Tab (it isn't, by default); \`role="button"\` tells assistive technology what it represents; \`onKeyDown\` manually wires up Enter/Space, since a \`<div>\` doesn't do that automatically the way \`<button>\` does. This is considerably more code than just using \`<button>\` in the first place — which is exactly why the previous lesson's advice ("prefer real elements") matters.

## Managing focus for a modal

Recall the \`Modal\` component from the portals lesson. For it to be genuinely accessible, focus needs to move *into* the modal when it opens, and back to whatever triggered it when it closes:

\`\`\`jsx
function Modal({ children, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={(e) => { if (e.key === "Escape") onClose(); }}
    >
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
\`\`\`

\`tabIndex={-1}\` makes the container itself focusable via JavaScript (\`.focus()\`) without adding it to the normal Tab order; the effect moves focus there the moment the modal mounts, so a keyboard user isn't left with focus stuck on a button that's now hidden behind an overlay. \`role="dialog"\` and \`aria-modal="true"\` announce to screen readers that this is a modal dialog, and the interior content beneath it should be treated as temporarily unavailable.

## Returning focus on close

A commonly missed detail: when the modal closes, focus should return to whatever element originally opened it (often the button that triggered \`setShowModal(true)\`) — otherwise a keyboard user's focus can end up lost at the top of the page, forcing them to tab all the way back down to where they were.

## Mental model

Think of keyboard focus as an invisible cursor that must always be somewhere sensible. Every time your UI shows or hides something significant (a modal, a menu), ask: "where should this invisible cursor go next?" — the browser only handles this automatically for its own native, built-in interactive elements.

## Common mistake

Building a custom modal, dropdown, or menu with mouse interaction in mind only, never testing it with Tab, Enter, and Escape. A large share of real accessibility bugs in React apps come from exactly this gap — a component looks and works fine to a mouse user, but is unusable or disorienting for a keyboard-only user.`,
        },
        {
          slug: "accessible-forms-and-error-messaging",
          title: "Accessible Forms and Error Messaging",
          estimatedMinutes: 7,
          content: `# Accessible Forms and Error Messaging

Forms are one of the highest-stakes places for accessibility — a confusing or inaccessible form can block a user from completing a task entirely, not just make it visually harder. This lesson covers the essentials specific to forms, building on the controlled-input and validation lessons from earlier.

## Every input needs an associated label

\`\`\`jsx
// A placeholder is not a label — it disappears once typing starts,
// and many screen readers don't reliably announce it as the field's name.
function BadField() {
  return <input type="email" placeholder="Email" />;
}

// A real <label>, linked by htmlFor/id, is always announced correctly:
function GoodField() {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
    </div>
  );
}
\`\`\`

\`htmlFor="email"\` on the \`<label>\` paired with \`id="email"\` on the \`<input>\` creates a programmatic association — a screen reader announces "Email, edit text" when the input receives focus, and clicking the label text itself focuses the input, which also enlarges the effective click target for anyone with limited motor precision.

## Announcing validation errors

Recall the manual-validation form from earlier in this tier. To make its errors accessible, the input and its error message need to be explicitly linked, and the error needs to be flagged as invalid:

\`\`\`jsx
function EmailField({ value, onChange, error }) {
  return (
    <div>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        value={value}
        onChange={onChange}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? "email-error" : undefined}
      />
      {error && (
        <p id="email-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
\`\`\`

- \`aria-invalid="true"\` tells assistive technology this field currently fails validation.
- \`aria-describedby="email-error"\` links the input to its error message by \`id\`, so a screen reader reads the error immediately after announcing the field — not just visually nearby, but explicitly connected in the accessibility tree.
- \`role="alert"\` on the error message itself makes screen readers announce it as soon as it appears, even if focus hasn't moved there — important for errors that show up after a failed submit, when focus may still be elsewhere.

## Color alone is not enough

\`\`\`jsx
// Insufficient on its own — color-blind users, and anyone using a screen
// reader, get no signal at all:
<input style={{ borderColor: error ? "red" : "gray" }} />

// Pair color with an icon, text, or both:
<input aria-invalid={!!error} />
{error && <p role="alert">⚠ {error}</p>}
\`\`\`

A red border communicates "something's wrong" only to sighted users who can distinguish that specific color — pairing it with explicit text (and the \`aria-invalid\`/\`role="alert"\` wiring above) makes the same information available to everyone.

## Mental model

Think of an accessible form as one where every piece of information conveyed visually (this field is required, this field has an error, this is what the field is called) has a corresponding, explicit signal available to assistive technology — not just a visual cue that happens to be nearby on screen.

## Common mistake

Relying on a placeholder as a substitute for a real \`<label>\`, or relying on border color alone to signal a validation error. Both are common, easy-to-miss patterns that leave the form significantly harder — sometimes impossible — to use correctly for screen reader users, keyboard-only users, and users with certain forms of color blindness.`,
        },
      ],
      quiz: {
        title: "Tier 2 Checkpoint: Intermediate React",
        questions: [
          {
            text: "Why is `setTodos([...todos, newTodo])` preferred over `todos.push(newTodo); setTodos(todos)`?",
            optionA: "push() is slower at runtime than spreading an array",
            optionB: "Mutating the existing array can leave React unable to detect that state actually changed, since the reference stays the same",
            optionC: "React does not support arrays in state at all",
            optionD: "setTodos only accepts strings and numbers",
            correctOption: "B",
          },
          {
            text: "What is the primary purpose of a cleanup function returned from `useEffect`?",
            optionA: "To format the console output during development",
            optionB: "To undo whatever the effect set up (timers, subscriptions, listeners) before it runs again or the component unmounts",
            optionC: "To prevent the component from ever re-rendering",
            optionD: "To automatically retry a failed network request",
            correctOption: "B",
          },
          {
            text: "When should you reach for useRef instead of useState for a value?",
            optionA: "Whenever the value is a number instead of a string",
            optionB: "When the value needs to persist across renders but changing it should not cause a re-render",
            optionC: "Whenever the component has more than one state variable",
            optionD: "useRef and useState are always interchangeable",
            correctOption: "B",
          },
          {
            text: "What problem does React context (createContext + useContext) primarily solve?",
            optionA: "It replaces useState for all local component state",
            optionB: "It avoids having to pass a value through many layers of components that don't use it themselves (prop drilling)",
            optionC: "It automatically fetches data from an API",
            optionD: "It prevents any component from ever re-rendering",
            correctOption: "B",
          },
          {
            text: "A component's props change, but its useState values are unexpectedly preserved from before. What is the most direct way to force React to reset its state?",
            optionA: "Call the setter function manually inside a useEffect on every prop change",
            optionB: "Give the component a key prop that changes whenever it should be treated as a new instance",
            optionC: "Wrap the component in React.memo",
            optionD: "Move the state into useRef instead of useState",
            correctOption: "B",
          },
          {
            text: "What problem do React portals (createPortal) primarily solve?",
            optionA: "They make network requests faster",
            optionB: "They let a component's output render into a different part of the real DOM, while staying part of the same React tree for props, context, and event bubbling",
            optionC: "They automatically validate form inputs",
            optionD: "They remove the need for a key prop in lists",
            correctOption: "B",
          },
          {
            text: "What is a key benefit of using a queryKey like [\"product\", productId] with TanStack Query's useQuery?",
            optionA: "It makes the component re-render faster regardless of data",
            optionB: "Multiple components requesting the same key automatically share one cached result and one in-flight request",
            optionC: "It replaces the need for a QueryClientProvider",
            optionD: "It disables background refetching entirely",
            correctOption: "B",
          },
          {
            text: "What is the main advantage of React Hook Form's register-based approach over a fully controlled useState form for large forms?",
            optionA: "It removes the need for a submit button",
            optionB: "It avoids re-rendering the entire form on every keystroke by reading input values via refs instead of state",
            optionC: "It makes all fields optional automatically",
            optionD: "It disables the browser's native form validation entirely",
            correctOption: "B",
          },
          {
            text: "What is the main benefit of explicitly typing state as `useState<User | null>(null)` in TypeScript instead of just `useState(null)`?",
            optionA: "It makes the component render faster",
            optionB: "It tells TypeScript the full range of values the state will hold over time, not just its null starting value",
            optionC: "It is required for useState to compile at all",
            optionD: "It automatically fetches a User object from an API",
            correctOption: "B",
          },
          {
            text: "Why is a real <label htmlFor=\"email\"> paired with <input id=\"email\"> preferred over relying on a placeholder alone?",
            optionA: "Placeholders are not valid JSX attributes",
            optionB: "A linked label is reliably announced by screen readers and remains visible, unlike a placeholder that disappears once typing starts",
            optionC: "Labels make the input submit automatically on Enter",
            optionD: "There is no real difference between the two approaches",
            correctOption: "B",
          },
        ],
      },
    },
    {
      title: "Advanced State: useReducer & Custom Hooks",
      lessons: [
        {
          slug: "the-usereducer-hook",
          title: "The useReducer Hook",
          estimatedMinutes: 9,
          content: `# The useReducer Hook

\`useState\` works well for simple, independent values, but once a component has several related pieces of state that update together in complex ways, tracking every transition with individual \`setX\` calls gets hard to follow and easy to get wrong. \`useReducer\` centralizes state updates into a single function, making complex state logic easier to read, test, and reason about.

## The shape of a reducer

A **reducer** is a pure function: given the current state and an **action** describing what happened, it returns the new state.

\`\`\`jsx
function cartReducer(state, action) {
  switch (action.type) {
    case "added_item":
      return { ...state, items: [...state.items, action.item] };
    case "removed_item":
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case "cleared":
      return { ...state, items: [] };
    default:
      return state;
  }
}
\`\`\`

## Using useReducer in a component

\`\`\`jsx
import { useReducer } from "react";

function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  function handleAdd(item) {
    dispatch({ type: "added_item", item });
  }

  function handleRemove(id) {
    dispatch({ type: "removed_item", id });
  }

  return (
    <div>
      <p>{state.items.length} items in cart</p>
      <button onClick={() => handleAdd({ id: 1, name: "Book" })}>Add Book</button>
      <button onClick={() => dispatch({ type: "cleared" })}>Clear Cart</button>
    </div>
  );
}
\`\`\`

Instead of calling several different setters directly, the component **dispatches actions** describing *what happened* (\`"added_item"\`, \`"cleared"\`), and the reducer alone decides *how state should change* in response. This separation makes every possible state transition explicit and centralized in one function, instead of scattered across many event handlers.

## When to reach for useReducer over useState

- State involves **multiple sub-values that update together** in coordinated ways (like a cart's items, total, and discount all changing from one action).
- The **next state depends on complex logic**, not just a simple toggle or increment.
- You want state transitions to be easy to **test in isolation** — a reducer is a plain function you can call directly with sample actions, with no component rendering involved.

For a single counter or a single toggle, \`useState\` remains simpler and perfectly appropriate — \`useReducer\` earns its extra structure once state logic actually gets complex.

## Mental model

Think of a reducer like a tiny state machine's rulebook: every row says "if you're in this state and this action happens, move to this new state." The component's job shrinks to just describing *what happened* (dispatching actions); the reducer is the single place that knows *how the state should evolve* in response.

## Common mistake

Mutating \`state\` directly inside the reducer (\`state.items.push(action.item); return state;\`) instead of returning a new object. Just like with \`useState\`, React relies on reducers returning a new state value to detect changes — mutating and returning the same reference means React may not notice anything changed at all.`,
        },
        {
          slug: "reducer-plus-context",
          title: "Combining useReducer with Context",
          estimatedMinutes: 8,
          content: `# Combining useReducer with Context

\`useReducer\` centralizes *how* state changes; \`useContext\` solves *how far* state can be shared without prop drilling. Combined, they form a lightweight but powerful pattern for sharing complex, frequently-updated state across a whole section of your app — without reaching for an external state-management library.

## The pattern

\`\`\`jsx
import { createContext, useContext, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "added_item":
      return { ...state, items: [...state.items, action.item] };
    case "cleared":
      return { ...state, items: [] };
    default:
      return state;
  }
}

function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}
\`\`\`

\`CartProvider\` wraps the part of the app that needs cart access, and \`useCart\` is a small custom hook (more on those in the next lesson) that gives any nested component read/write access without threading props down manually.

## Using it from anywhere in the tree

\`\`\`jsx
function App() {
  return (
    <CartProvider>
      <ProductPage />
      <CartSummary />
    </CartProvider>
  );
}

function ProductPage() {
  const { dispatch } = useCart();
  return (
    <button onClick={() => dispatch({ type: "added_item", item: { id: 1, name: "Mug" } })}>
      Add to Cart
    </button>
  );
}

function CartSummary() {
  const { state } = useCart();
  return <p>{state.items.length} items in cart</p>;
}
\`\`\`

\`ProductPage\` and \`CartSummary\` are siblings, potentially far apart in the tree, but both read from and write to the same cart state — with no props passed between them at all.

## Why this scales better than scattered useState + prop drilling

As an app grows, passing individual state values and setter functions down through many layers of props becomes unwieldy fast. Centralizing related state in a reducer, and making it available through context, keeps the "what can change this state, and how" logic in one place (the reducer), while making the state itself reachable from anywhere inside the provider — a pattern that scales to fairly large features without needing a dedicated state-management library.

## Mental model

Think of \`CartProvider\` as a self-contained mini-application: it owns its state (via the reducer) and exposes a public API (\`state\` and \`dispatch\`, wrapped in \`useCart\`) for the rest of the app to interact with — similar in spirit to how a well-designed backend service exposes state and actions without letting outside code reach in and mutate its internals directly.

## Common mistake

Putting *all* application state into one giant global context "for convenience." Since any component reading a context re-renders whenever that context's value changes, one enormous shared context can cause far more components to re-render than necessary. Prefer several smaller, focused providers (cart, theme, auth) over one catch-all context.`,
        },
        {
          slug: "writing-custom-hooks",
          title: "Writing Your Own Custom Hooks",
          estimatedMinutes: 9,
          content: `# Writing Your Own Custom Hooks

You've now used several of React's built-in hooks — \`useState\`, \`useEffect\`, \`useRef\`, \`useContext\`, \`useReducer\`. A **custom hook** lets you extract your own reusable stateful logic into a plain function, so multiple components can share behavior without duplicating code.

## What actually makes something a custom hook

A custom hook is just a JavaScript function whose name starts with \`use\`, and that calls one or more other hooks internally. That's it — there's no special syntax beyond that naming convention, which tells React (and linting tools) to apply the Rules of Hooks to it (covered in the next lesson).

## Extracting a repeated pattern

Imagine several components each need to know the current window width:

\`\`\`jsx
function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
\`\`\`

Any component can now reuse this logic with a single line:

\`\`\`jsx
function ResponsiveBanner() {
  const width = useWindowWidth();
  return <p>{width < 640 ? "Mobile view" : "Desktop view"}</p>;
}

function Sidebar() {
  const width = useWindowWidth();
  return width > 1024 ? <FullSidebar /> : null;
}
\`\`\`

Both components get live-updating window width, without duplicating the \`useState\`/\`useEffect\`/event-listener logic — and without sharing any actual state between them, since each call to \`useWindowWidth()\` creates its own independent \`useState\`.

## A data-fetching custom hook

Custom hooks are especially useful for wrapping the loading/error/data pattern from the data-fetching lesson, so it isn't repeated in every component that loads data:

\`\`\`jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((json) => { if (isCurrent) setData(json); })
      .catch((err) => { if (isCurrent) setError(err.message); })
      .finally(() => { if (isCurrent) setIsLoading(false); });

    return () => { isCurrent = false; };
  }, [url]);

  return { data, isLoading, error };
}

function UserProfile({ userId }) {
  const { data: user, isLoading, error } = useFetch(\`/api/users/\${userId}\`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h2>{user.name}</h2>;
}
\`\`\`

## What custom hooks share, and what they don't

Custom hooks share **logic** (the code, the pattern of calling other hooks together), not **state**. Every component that calls \`useFetch(...)\` gets its own independent \`data\`/\`isLoading\`/\`error\` state — calling the same custom hook from two different components does not link them together in any way.

## Mental model

Think of a custom hook as a recipe, not a shared pantry. Two components following the same recipe (\`useWindowWidth()\`) each cook their own independent meal (their own state) — they just happen to use identical instructions.

## Common mistake

Assuming a custom hook shares state across every component that calls it, similar to how a shared context works. Custom hooks are about reusing *logic*; if you actually need shared, synchronized state across components, that calls for lifting state up or context — not a custom hook alone.`,
        },
        {
          slug: "rules-of-hooks",
          title: "The Rules of Hooks (and Why They Exist)",
          estimatedMinutes: 7,
          content: `# The Rules of Hooks (and Why They Exist)

Hooks look like ordinary function calls, but React relies on them being called in a very specific, consistent way. Breaking these rules causes bugs that are often confusing to debug, because they don't always show up immediately.

## Rule 1: Only call hooks at the top level

Never call a hook inside a loop, condition, or nested function.

\`\`\`jsx
// Wrong
function Profile({ showBio }) {
  if (showBio) {
    const [bio, setBio] = useState(""); // conditional hook call
  }
  // ...
}

// Correct
function Profile({ showBio }) {
  const [bio, setBio] = useState("");
  // use showBio to decide what to render with bio, not whether to call useState
}
\`\`\`

## Rule 2: Only call hooks from React functions

Call hooks only from React function components, or from custom hooks (functions starting with \`use\`) — never from regular JavaScript functions, class components, or outside of a component entirely.

## Why these rules exist: hook call order

React tracks each hook by the **order** it's called in during a render, not by name. Internally, React keeps something like a simple list: "the first \`useState\` call in this component is this value, the second is that value, the third \`useEffect\` is this one," and so on.

\`\`\`jsx
function Example() {
  const [name, setName] = useState("Ada");   // hook call #1
  const [age, setAge] = useState(30);          // hook call #2

  useEffect(() => {
    console.log(name, age);
  }, [name, age]);                              // hook call #3
}
\`\`\`

If a hook call were conditional — say, \`useState\` only ran when some condition was true — then on a render where the condition is false, hook call #2 would suddenly correspond to what used to be hook call #3's data. React would connect the wrong stored value to the wrong hook call, silently corrupting component state in ways that are hard to trace back to the actual cause.

## What this means in practice

- Put \`if\` statements *inside* the hook (in the logic that decides what the hook does), not *around* the hook call itself.
- If you need different behavior for different cases, express that with the hook's arguments or its return value, not by skipping the call.
- \`eslint-plugin-react-hooks\` (included by default in most modern React project templates) automatically flags rule violations — pay attention to its warnings.

\`\`\`jsx
// Wrong: hook called conditionally
function Search({ debounce }) {
  if (debounce) {
    useEffect(() => { /* ... */ }, []);
  }
}

// Correct: hook always called; the *effect's behavior* is conditional
function Search({ debounce }) {
  useEffect(() => {
    if (!debounce) return;
    // debounced logic here
  }, [debounce]);
}
\`\`\`

## Mental model

Think of hooks as numbered lockers assigned in a fixed order the first time a component renders. Every render must open the same lockers, in the same order, so React can hand back the right contents for each one. Skipping a locker on some renders (via a condition around the hook call) throws off every locker number that comes after it.

## Common mistake

Writing an early \`return\` *before* all of a component's hooks have been called. Since a returned component doesn't run any code after the \`return\`, any hooks below an early return would be skipped on that render — violating the top-level rule. Always call every hook before any conditional \`return\` in the component body.`,
        },
      ],
    },
    {
      title: "Performance Optimization",
      lessons: [
        {
          slug: "react-memo",
          title: "Memoizing Components with React.memo",
          estimatedMinutes: 8,
          content: `# Memoizing Components with React.memo

Recall from the re-render lesson: when a parent re-renders, its children re-render by default too — even if their props stayed exactly the same. Usually this is cheap and harmless. But if a particular child does something expensive on every render (rendering a huge list, running a heavy calculation), skipping unnecessary re-renders can matter. \`React.memo\` is the tool for that.

## Wrapping a component with memo

\`\`\`jsx
import { memo } from "react";

const ProductRow = memo(function ProductRow({ product }) {
  console.log("Rendering", product.name);
  return (
    <tr>
      <td>{product.name}</td>
      <td>\${product.price}</td>
    </tr>
  );
});
\`\`\`

\`memo\` wraps a component so that React skips re-rendering it if its **props haven't changed** since the last render (using a shallow comparison — checking whether each individual prop is the same value as before). If the parent re-renders but passes the exact same \`product\` reference, \`ProductRow\` will not re-render, and its expensive log/render work is skipped entirely.

## Where it helps

\`\`\`jsx
function ProductTable({ products }) {
  const [filterText, setFilterText] = useState("");

  return (
    <div>
      <input value={filterText} onChange={(e) => setFilterText(e.target.value)} />
      <table>
        <tbody>
          {products.map((p) => (
            <ProductRow key={p.id} product={p} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
\`\`\`

Without \`memo\`, typing in the filter input re-renders \`ProductTable\`, which re-renders *every single* \`ProductRow\` — even though \`products\` itself hasn't changed. With \`memo\` on \`ProductRow\`, and assuming \`products\` is the same array reference across that re-render, React can skip re-rendering rows entirely.

## The shallow comparison gotcha

\`memo\`'s default comparison checks each prop with \`===\`. Objects, arrays, and functions created fresh on every render (like an inline arrow function passed as a prop) are never \`===\` to the previous render's version, even if their contents look identical — which silently defeats \`memo\`.

\`\`\`jsx
// This new arrow function is a different reference every render,
// so a memoized child receiving it as a prop re-renders anyway:
<ProductRow product={product} onSelect={() => handleSelect(product.id)} />
\`\`\`

The next lesson, on \`useMemo\` and \`useCallback\`, covers how to keep object, array, and function props stable across renders so \`memo\` can actually do its job.

## Mental model

Think of \`memo\` as a bouncer at the door of a component: "did anything about your props actually change since last time? No? Then you don't need to come in and redo your work." It only helps when there's real, avoidable work being skipped — for a cheap component, the bouncer's own checking cost isn't worth it.

## Common mistake

Wrapping every component in \`memo\` "just in case," including cheap, simple ones. The shallow-comparison check itself has a small cost, and for components that render almost instantly anyway, \`memo\` adds complexity without a measurable benefit. Reach for it after you've identified an actual expensive re-render, not preemptively everywhere.`,
        },
        {
          slug: "usememo-and-usecallback",
          title: "useMemo and useCallback",
          estimatedMinutes: 9,
          content: `# useMemo and useCallback

\`useMemo\` and \`useCallback\` both exist to avoid recreating something on every render — a computed value, or a function — when it would otherwise be identical anyway. They're closely related, and often used to make \`React.memo\` actually effective.

## useMemo: memoizing a computed value

\`\`\`jsx
import { useMemo, useState } from "react";

function ProductList({ products, searchText }) {
  const filteredProducts = useMemo(() => {
    console.log("Filtering products...");
    return products.filter((p) =>
      p.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [products, searchText]);

  return (
    <ul>
      {filteredProducts.map((p) => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}
\`\`\`

\`useMemo(calculation, dependencies)\` re-runs \`calculation\` only when one of the listed dependencies changes between renders; otherwise, it returns the same cached result from before. If \`ProductList\` re-renders for an unrelated reason (say, a sibling's state changed) while \`products\` and \`searchText\` stayed the same, the expensive filter operation is skipped, and the previous result is reused.

## useCallback: memoizing a function

\`\`\`jsx
import { useCallback, useState } from "react";

function ProductTable({ products }) {
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = useCallback((id) => {
    setSelectedId(id);
  }, []);

  return (
    <table>
      <tbody>
        {products.map((p) => (
          <ProductRow key={p.id} product={p} onSelect={handleSelect} />
        ))}
      </tbody>
    </table>
  );
}
\`\`\`

Without \`useCallback\`, a new \`handleSelect\` function would be created on every render of \`ProductTable\` — meaning a memoized \`ProductRow\` receiving it as a prop would see a "changed" prop every time (different function reference) and re-render anyway, defeating \`memo\`. \`useCallback\` returns the *same* function reference across renders as long as its dependencies (here, none — an empty array) haven't changed.

## useMemo vs. useCallback

They solve the same underlying problem for two different kinds of values:

- \`useMemo(() => computeSomething(), [deps])\` — memoizes the **result** of calling a function.
- \`useCallback(fn, [deps])\` — memoizes the **function itself** (equivalent to \`useMemo(() => fn, [deps])\`).

\`\`\`jsx
// These are conceptually equivalent:
const handleSelect = useCallback((id) => setSelectedId(id), []);
const handleSelect2 = useMemo(() => (id) => setSelectedId(id), []);
\`\`\`

## When these tools actually matter

Both hooks have a small cost of their own (tracking dependencies, comparing them each render). They pay off in two situations: (1) the calculation itself is genuinely expensive (filtering/sorting large arrays, heavy math), or (2) the memoized value/function is passed as a prop to a \`memo\`-wrapped child, where a stable reference is required for the memoization to actually take effect.

## Mental model

Think of \`useMemo\`/\`useCallback\` as sticky notes that say "nothing relevant changed — hand back what I gave you last time instead of redoing the work." They're a targeted tool for specific, identified costs, not a default habit to apply to every value and function in a component.

## Common mistake

Wrapping every value in \`useMemo\` and every function in \`useCallback\` throughout a codebase, regardless of whether anything expensive is happening or any memoized child depends on referential stability. This adds cognitive overhead and a small runtime cost everywhere, for a benefit that usually only shows up in a handful of genuinely expensive spots.`,
        },
        {
          slug: "identifying-unnecessary-rerenders",
          title: "Identifying and Fixing Unnecessary Re-renders",
          estimatedMinutes: 8,
          content: `# Identifying and Fixing Unnecessary Re-renders

You now have three optimization tools — \`memo\`, \`useMemo\`, \`useCallback\` — but the most important skill is knowing *when* they're actually worth reaching for. Optimizing before you've measured a real problem tends to add complexity without benefit; this lesson covers a practical process for finding and fixing genuine performance issues.

## Step 1: confirm there's an actual, felt problem

Before optimizing, look for a concrete symptom: a form that feels laggy while typing, a list that stutters while scrolling, a visible delay between an interaction and the UI updating. If everything feels instant, there's nothing to fix yet — the tools from the last two lessons all carry a small cost of their own, so applying them without a real target is a net loss.

## Step 2: find what's actually re-rendering, and why

React DevTools (the official browser extension) includes a "Highlight updates when components render" option, and a Profiler tab that records exactly which components rendered during an interaction and how long each took. This turns a vague feeling ("it feels slow") into concrete data ("this 500-row table body re-renders on every keystroke in an unrelated search box").

\`\`\`jsx
function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <div>
      <input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <ExpensiveChart data={hugeStaticDataset} /> {/* re-renders on every keystroke, for no reason */}
    </div>
  );
}
\`\`\`

Here, \`ExpensiveChart\` doesn't depend on \`searchText\` at all, yet re-renders every time it changes — purely because it's a child of \`App\`, which re-renders on every keystroke.

## Step 3: apply the right fix for the actual cause

- **If a child re-renders needlessly with unchanged props** — wrap it in \`memo\`, and make sure any object/array/function props passed to it are memoized with \`useMemo\`/\`useCallback\` so their references stay stable.
- **If an expensive calculation re-runs every render** — wrap just that calculation in \`useMemo\`.
- **If the real issue is state living too high in the tree** — consider moving state closer to where it's actually used, so a change doesn't force a large, unrelated part of the tree to re-render at all. Sometimes restructuring components (rather than adding memoization) is the simpler, more effective fix.

\`\`\`jsx
const MemoizedChart = memo(ExpensiveChart);

function App() {
  const [searchText, setSearchText] = useState("");
  const chartData = useMemo(() => hugeStaticDataset, []);

  return (
    <div>
      <input value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      <MemoizedChart data={chartData} />
    </div>
  );
}
\`\`\`

## Structural fixes are often better than memoization

Sometimes the cleanest fix isn't adding \`memo\`/\`useMemo\` at all, but restructuring so state lives in a smaller, more local component — for example, moving \`searchText\`'s \`useState\` into its own small \`SearchBox\` component, so typing only re-renders that box, and never touches \`App\` (or \`ExpensiveChart\`) in the first place.

## Mental model

Treat performance work like debugging: measure first, form a hypothesis about the specific cause, apply the smallest targeted fix, then measure again to confirm it actually helped. Skipping straight to "add memo everywhere" is like guessing at a bug fix without ever reproducing the bug.

## Common mistake

Reaching for \`memo\`/\`useMemo\`/\`useCallback\` as the *first* response to a performance concern, before checking whether restructuring where state lives would solve the problem more simply — and before confirming, with the Profiler, that the suspected component is actually the bottleneck.`,
        },
      ],
    },
    {
      title: "Concurrent React Features",
      lessons: [
        {
          slug: "usetransition-responsive-uis",
          title: "Keeping UIs Responsive with useTransition",
          estimatedMinutes: 8,
          content: `# Keeping UIs Responsive with useTransition

\`memo\`, \`useMemo\`, and \`useCallback\` help you avoid unnecessary work. But sometimes a re-render is genuinely necessary and genuinely expensive — filtering ten thousand rows on every keystroke, for example — and no amount of memoization removes that cost entirely. \`useTransition\` takes a different approach: instead of avoiding the work, it tells React the work is **low priority**, so more urgent updates (like the keystroke itself) aren't blocked by it.

## The problem: an expensive update blocks urgent ones

\`\`\`jsx
function SearchPage({ allProducts }) {
  const [query, setQuery] = useState("");
  const results = allProducts.filter((p) => p.name.includes(query));

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ProductList products={results} /> {/* expensive with a huge list */}
    </div>
  );
}
\`\`\`

By default, React treats every state update as equally urgent — so typing a single character triggers a full, synchronous re-render of both the input *and* the expensive \`ProductList\`, before the browser can show the new character in the input at all. On a big enough list, this makes the input itself feel laggy, even though the input's own update is trivial.

## Marking an update as non-urgent

\`\`\`jsx
import { useState, useTransition } from "react";

function SearchPage({ allProducts }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(allProducts);
  const [isPending, startTransition] = useTransition();

  function handleChange(event) {
    const value = event.target.value;
    setQuery(value); // urgent: keep the input snappy

    startTransition(() => {
      setResults(allProducts.filter((p) => p.name.includes(value))); // low priority
    });
  }

  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <span>Updating results...</span>}
      <ProductList products={results} />
    </div>
  );
}
\`\`\`

\`setQuery\` (urgent — updating what's visibly typed) runs immediately, outside the transition. \`setResults\` (expensive — refiltering a huge list) is wrapped in \`startTransition\`, telling React it can be interrupted or delayed if something more urgent (like the next keystroke) comes in. \`isPending\` flips to \`true\` while the transition is still catching up, letting you show a subtle loading indicator instead of a frozen UI.

## What actually changes

Without \`useTransition\`, both updates are one atomic, blocking unit of work. With it, React can render the urgent \`query\` update right away, and squeeze in the expensive \`results\` update around it — potentially skipping intermediate results entirely if the user keeps typing quickly, always converging on the final, correct state once typing pauses.

## Mental model

Think of \`useTransition\` as telling React "this update is important, but not urgent — feel free to get to it after anything more time-sensitive." It doesn't make the underlying work any cheaper; it changes the *scheduling*, so expensive work no longer blocks the things a user is actively waiting to see (like their own keystrokes appearing).

## Common mistake

Reaching for \`useTransition\` before confirming (with the Profiler, from the earlier performance lesson) that an update is genuinely expensive enough to cause noticeable lag. For most updates, the extra complexity of tracking \`isPending\` and wrapping state setters isn't worth it — this tool earns its place specifically where a big, unavoidable computation is making urgent interactions feel sluggish.`,
        },
        {
          slug: "usedeferredvalue",
          title: "Deferring Expensive Updates with useDeferredValue",
          estimatedMinutes: 7,
          content: `# Deferring Expensive Updates with useDeferredValue

\`useDeferredValue\` solves a very similar problem to \`useTransition\`, but from a different angle: instead of wrapping the *state update that causes* expensive work, you wrap the *value itself* that an expensive part of the tree depends on — useful when you don't control the code that sets the state (say, a value coming from a prop or a parent) but you do control how an expensive child uses it.

## The pattern

\`\`\`jsx
import { useState, useDeferredValue } from "react";

function SearchPage({ allProducts }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const results = allProducts.filter((p) => p.name.includes(deferredQuery));

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ProductList products={results} />
    </div>
  );
}
\`\`\`

\`query\` updates immediately on every keystroke, keeping the input itself perfectly responsive. \`deferredQuery\` "lags behind" \`query\` under load — React updates it at a lower priority, letting urgent renders (like the input reflecting a new keystroke) go first. The expensive filter runs against \`deferredQuery\`, so it doesn't need to keep up with every single keystroke in real time.

## Showing that results are stale

\`\`\`jsx
function SearchPage({ allProducts }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const results = allProducts.filter((p) => p.name.includes(deferredQuery));

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.6 : 1 }}>
        <ProductList products={results} />
      </div>
    </div>
  );
}
\`\`\`

Comparing \`query\` (the very latest typed value) to \`deferredQuery\` (the value the expensive list is currently rendered against) tells you exactly when the visible results are momentarily behind what's been typed — a nice, cheap way to gently fade the list instead of leaving it looking frozen or, worse, silently wrong.

## useTransition vs. useDeferredValue

- **useTransition** — reach for it when *you* are the one calling the state setter, and you want to mark that specific update as low priority.
- **useDeferredValue** — reach for it when you're *receiving* a value (a prop, or state you don't control) and want a "lagged" version of it for an expensive part of your own rendering, without touching how that value gets set elsewhere.

Both are built on the same underlying concurrent-rendering mechanism in React; they're just two different entry points depending on whether you own the state update or only the value.

## Mental model

Think of \`useDeferredValue\` as asking for "the most recent value React had time to fully process," which briefly falls behind the absolute latest value during heavy load, and catches back up the moment things calm down — a deliberate, visible trade of a little bit of freshness for a lot of responsiveness elsewhere.

## Common mistake

Using \`useDeferredValue\` and expecting it to change the value being deferred (it doesn't reduce the size or cost of \`allProducts.filter(...)\` at all) — it only changes *when* React chooses to apply the resulting render, not how expensive the computation itself is. Genuinely reducing the computation's cost still calls for the earlier lesson's tools: \`useMemo\`, or restructuring the data itself.`,
        },
        {
          slug: "suspense-for-data-fetching-preview",
          title: "Suspense for Data Fetching (A Preview)",
          estimatedMinutes: 6,
          content: `# Suspense for Data Fetching (A Preview)

You've already used \`<Suspense fallback={...}>\` for code splitting, showing a fallback while a lazily-loaded component's *code* downloads. React's newer direction extends the same \`Suspense\` mechanism to **data** — letting a component "pause" rendering while its data loads, with the nearest \`Suspense\` boundary showing the fallback, unifying the loading story for code and data under one primitive.

## The idea, conceptually

\`\`\`jsx
function ProductPage({ productId }) {
  // Conceptually: this "suspends" (pauses rendering) if the data isn't ready yet,
  // rather than returning a loading state you check manually.
  const product = useProductSuspending(productId);

  return <h1>{product.name}</h1>; // no isLoading check needed here at all
}

function App() {
  return (
    <Suspense fallback={<p>Loading product...</p>}>
      <ProductPage productId="42" />
    </Suspense>
  );
}
\`\`\`

Instead of \`ProductPage\` returning \`<p>Loading...</p>\` itself while data is pending (the pattern you've used throughout this course), the *nearest wrapping* \`Suspense\` catches the "not ready yet" signal and shows its fallback — meaning several components deep in a tree can all suspend independently, while a single \`Suspense\` boundary further up coordinates one shared loading UI for all of them.

## Where this shows up today

- **TanStack Query** offers a \`useSuspenseQuery\` hook (an alternative to the \`useQuery\` from the earlier data-fetching module) that integrates directly with \`Suspense\`, removing the need to check \`isLoading\` in every component that uses it.
- **Meta-frameworks** like Next.js (covered in an upcoming module) build heavily on Suspense for server-rendered data fetching, since it lets a page's layout render immediately while individual pieces of data stream in.
- **Relay**, a GraphQL client, was one of the earliest adopters of this pattern.

## Why this is presented as a preview, not a full lesson

Suspense-for-data is one of the more actively evolving parts of the React ecosystem — exact APIs and best practices continue to shift across React and library versions faster than other, more settled parts of this course. The important takeaway at this stage isn't memorizing a specific API, but recognizing the *shape* of the idea: a component can suspend while waiting for something (code or data), and the nearest \`Suspense\` boundary handles showing a fallback — so when you encounter \`useSuspenseQuery\` or similar in the wild, the concept won't be unfamiliar.

## Mental model

Think of Suspense as a general-purpose "not ready yet" signal components can raise, independent of *what* they're waiting for (a lazy-loaded chunk of code, or a network response) — and a \`Suspense\` boundary as the nearest ancestor that catches that signal and decides what to show in the meantime.

## Common mistake

Assuming every data-fetching approach automatically works with \`Suspense\` out of the box. Plain \`fetch\` calls inside \`useEffect\` do **not** integrate with Suspense on their own — it requires a library or pattern specifically built to support it (like TanStack Query's \`useSuspenseQuery\`), not just wrapping existing \`useEffect\`-based components in a \`<Suspense>\` tag.`,
        },
      ],
    },
    {
      title: "Testing React Components",
      lessons: [
        {
          slug: "why-and-what-to-test",
          title: "Why and What to Test in a React App",
          estimatedMinutes: 7,
          content: `# Why and What to Test in a React App

Every lesson so far has been about building features. This module is about gaining confidence that those features keep working — both today, and after every future change. Automated tests are how real production React codebases get that confidence without manually re-clicking through the entire app before every release.

## The testing pyramid, applied to React

- **Unit tests** — testing small, isolated pieces of pure logic: a reducer function, a utility function, a custom hook's internal logic. Fast, precise, and cheap to write.
- **Component tests** — rendering a component (or a small tree of them) and interacting with it the way a user would: clicking buttons, typing into inputs, asserting on what's visible afterward. This module focuses mainly here.
- **End-to-end (e2e) tests** — driving a real, fully-running app in an actual browser, covering entire user flows (sign up, add to cart, check out) top to bottom. Tools like Playwright or Cypress live at this level. Slower and more expensive to write and run than the other two, so real projects tend to have far fewer of them, reserved for critical flows.

## Setting up

\`\`\`bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom jsdom
\`\`\`

**Vitest** is a fast test runner that integrates naturally with Vite projects; **React Testing Library (RTL)** is the standard library for rendering and interacting with components in tests.

## RTL's core philosophy: test behavior, not implementation

\`\`\`jsx
// Avoid: reaching into a component's internal state or implementation details
expect(wrapper.state("count")).toBe(1);

// Prefer: asserting on what a real user would actually see or do
expect(screen.getByText("Clicked 1 times")).toBeInTheDocument();
\`\`\`

RTL is deliberately built to make it awkward to test internal implementation details (state variable names, which hooks are used, component structure) and easy to test what a user actually experiences: visible text, accessible roles, and the results of clicks and typing. This matters because implementation details change constantly during refactors — tests written against them break for reasons that have nothing to do with the feature actually being broken, which erodes trust in the whole test suite over time.

## What's worth testing in a typical component

- **Rendering the right content** for given props — does a product card show the product's name and price?
- **Responding correctly to user interaction** — does clicking "Add to Cart" call the right function, or update the right piece of visible state?
- **Conditional rendering paths** — does a loading state show a spinner, and an error state show an error message?

Trivial rendering (a component that just displays static text with no logic) is rarely worth a dedicated test — the highest-value tests are ones that would actually catch a real regression if someone changed the component's behavior by mistake.

## Mental model

Think of a component test as a script that acts exactly like a real user interacting with your UI: find something on screen, click or type, then check that what's now on screen matches expectations — deliberately blind to *how* the component achieves that result internally.

## Common mistake

Writing tests that assert on internal implementation details (specific state variable values, specific internal function calls) rather than user-visible behavior. These tests break every time you refactor a component's internals, even when its actual behavior hasn't changed at all — the opposite of the confidence tests are supposed to provide.`,
        },
        {
          slug: "react-testing-library-basics",
          title: "Rendering and Querying with React Testing Library",
          estimatedMinutes: 8,
          content: `# Rendering and Querying with React Testing Library

This lesson covers the two things every component test does: rendering a component into a virtual DOM, and querying that DOM to assert on what's actually visible.

## A simple test

\`\`\`jsx
// Counter.jsx
function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} times
    </button>
  );
}
\`\`\`

\`\`\`jsx
// Counter.test.jsx
import { render, screen } from "@testing-library/react";
import Counter from "./Counter";

test("renders with an initial count of 0", () => {
  render(<Counter />);
  expect(screen.getByText("Clicked 0 times")).toBeInTheDocument();
});
\`\`\`

\`render(<Counter />)\` mounts the component into an in-memory, jsdom-simulated DOM — no real browser needed. \`screen\` is RTL's entry point for querying that DOM; \`getByText(...)\` finds an element containing that exact text, and throws a clear, readable error if nothing matches (making failures easy to diagnose).

## Preferred queries: by role, then by label, then by text

RTL provides several query types, and recommends a preference order that favors how real users (including assistive-technology users) actually find things:

\`\`\`jsx
screen.getByRole("button", { name: "Clicked 0 times" }); // preferred: matches accessible role + name
screen.getByLabelText("Email");                                          // good for form fields
screen.getByText("Welcome back");                                        // fine for plain, non-interactive text
screen.getByTestId("custom-widget");                                     // last resort, an escape hatch
\`\`\`

\`getByRole\` is preferred because it queries the same accessibility information a screen reader relies on — a test written this way doubles as a very small, incidental accessibility check, tying directly back to the accessibility module earlier in this course.

## getBy vs. queryBy vs. findBy

- \`getByText(...)\` — throws immediately if no match is found. Use when you expect the element to already be there.
- \`queryByText(...)\` — returns \`null\` instead of throwing. Use when you're asserting something is **absent**: \`expect(screen.queryByText("Error")).not.toBeInTheDocument()\`.
- \`findByText(...)\` — returns a Promise, and waits (retrying) for the element to appear. Use for anything that shows up asynchronously — covered further in the next lesson.

## Mental model

Think of \`screen\` as standing in for a real user looking at the rendered page: it can only "see" what's actually rendered to the DOM, using the same names, roles, and labels a person (or their screen reader) would use — not the internal variables or component names behind the scenes.

## Common mistake

Defaulting to \`getByTestId\` for everything, adding \`data-testid\` attributes purely for tests. This works, but it tests nothing about whether the UI is actually usable or accessible — reach for \`getByRole\`/\`getByLabelText\`/\`getByText\` first, and treat \`getByTestId\` as a last resort for elements with no meaningful role or visible text at all.`,
        },
        {
          slug: "simulating-user-interaction",
          title: "Simulating User Interaction and Testing Forms",
          estimatedMinutes: 8,
          content: `# Simulating User Interaction and Testing Forms

Rendering and querying (the previous lesson) only gets you halfway — most valuable tests also need to simulate what a user actually *does*: clicking, typing, submitting. RTL's companion library, \`@testing-library/user-event\`, drives these interactions in a way that closely mirrors real browser behavior.

## Clicking a button

\`\`\`jsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Counter from "./Counter";

test("increments the count when clicked", async () => {
  const user = userEvent.setup();
  render(<Counter />);

  await user.click(screen.getByRole("button", { name: /clicked 0 times/i }));

  expect(screen.getByText("Clicked 1 times")).toBeInTheDocument();
});
\`\`\`

\`userEvent.setup()\` creates a simulated user; \`user.click(...)\` dispatches the same sequence of low-level events (\`pointerdown\`, \`mousedown\`, \`click\`, and so on) a real click would — closer to reality than directly firing a single synthetic \`click\` event, and more likely to catch real bugs.

## Typing into a form

\`\`\`jsx
// SignupForm.jsx from the forms module, simplified
function SignupForm({ onSubmit }) {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(email);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Sign Up</button>
    </form>
  );
}
\`\`\`

\`\`\`jsx
test("calls onSubmit with the typed email", async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn(); // a mock function that records how it was called

  render(<SignupForm onSubmit={handleSubmit} />);

  await user.type(screen.getByLabelText("Email"), "ada@example.com");
  await user.click(screen.getByRole("button", { name: "Sign Up" }));

  expect(handleSubmit).toHaveBeenCalledWith("ada@example.com");
});
\`\`\`

\`user.type(...)\` simulates individual keystrokes into the input, firing the same \`onChange\` events the real component relies on — exercising the exact same controlled-input flow from the forms lessons, not a shortcut around it. \`vi.fn()\` creates a mock function whose calls (and arguments) can be asserted on afterward, standing in for the real \`onSubmit\` a parent component would normally pass down.

## Asserting on validation errors

\`\`\`jsx
test("shows an error for an invalid email", async () => {
  const user = userEvent.setup();
  render(<SignupForm onSubmit={() => {}} />);

  await user.type(screen.getByLabelText("Email"), "not-an-email");
  await user.click(screen.getByRole("button", { name: "Sign Up" }));

  expect(screen.getByText(/please enter a valid email/i)).toBeInTheDocument();
});
\`\`\`

This test never inspects the component's internal \`errors\` state directly — it types exactly what a user would type, clicks exactly what they'd click, and asserts on exactly what they'd see, matching the "test behavior, not implementation" philosophy from the first testing lesson.

## Mental model

Think of \`userEvent\` as a stand-in for an actual person sitting at a keyboard and mouse, interacting with your rendered component through the same events a browser would generate — which is exactly why it catches real bugs that firing a single synthetic event might miss.

## Common mistake

Using the lower-level \`fireEvent\` API (which dispatches one specific DOM event directly) as a default instead of \`userEvent\` (which simulates the full, realistic sequence of events for an interaction). \`userEvent\` is the currently recommended default for exactly this reason — it behaves far closer to what actually happens in a real browser.`,
        },
        {
          slug: "mocking-requests-and-hooks",
          title: "Mocking Network Requests and Testing Custom Hooks",
          estimatedMinutes: 8,
          content: `# Mocking Network Requests and Testing Custom Hooks

Two more common testing needs round out this module: components that fetch data (you don't want real tests hitting a real network), and custom hooks, which don't render anything themselves and need a slightly different testing approach.

## Mocking fetch for a data-fetching component

\`\`\`jsx
// UserProfile.jsx — using the useFetch custom hook from an earlier module
function UserProfile({ userId }) {
  const { data: user, isLoading, error } = useFetch(\`/api/users/\${userId}\`);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h2>{user.name}</h2>;
}
\`\`\`

\`\`\`jsx
test("shows the user's name once data loads", async () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ name: "Ada Lovelace" }),
    })
  );

  render(<UserProfile userId="1" />);

  expect(screen.getByText("Loading...")).toBeInTheDocument();
  expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
});
\`\`\`

Replacing \`global.fetch\` with a mock function means the test controls exactly what the "network" returns, with no real request ever leaving the test environment — fast, reliable, and repeatable regardless of any real backend's state. \`findByText\` (from the earlier lesson) is essential here: it retries until the text appears, accommodating the fact that the data arrives asynchronously, after at least one re-render.

*(For larger projects, a library like **MSW** — Mock Service Worker — intercepts network requests at a lower level, letting you define realistic mock API responses shared across many tests instead of mocking \`fetch\` individually in each one.)*

## Testing a custom hook directly with renderHook

A custom hook like \`useWindowWidth\` from an earlier module doesn't render any JSX itself — there's nothing for \`render()\` to mount. RTL's \`renderHook\` solves this by calling the hook inside a minimal, invisible test component behind the scenes:

\`\`\`jsx
import { renderHook, act } from "@testing-library/react";
import { useWindowWidth } from "./useWindowWidth";

test("updates when the window is resized", () => {
  const { result } = renderHook(() => useWindowWidth());

  expect(result.current).toBe(1024); // jsdom's default width

  act(() => {
    window.innerWidth = 500;
    window.dispatchEvent(new Event("resize"));
  });

  expect(result.current).toBe(500);
});
\`\`\`

\`result.current\` always reflects the hook's latest return value; \`act(...)\` wraps anything that triggers a state update (here, firing a resize event) to ensure React finishes processing it before the next assertion runs — without it, the test might check \`result.current\` before React has actually applied the update.

## Mental model

Think of mocking \`fetch\` as swapping out the real, unpredictable network for a stunt double that always says exactly the line you rehearsed — and \`renderHook\` as giving a custom hook (which has no visual output of its own) a minimal, invisible stage to run on so it can be exercised and observed in isolation.

## Common mistake

Letting tests make real network requests to a real (or even a staging) backend. This makes tests slow, flaky (failing due to network issues or backend state having nothing to do with the code under test), and dependent on an external system being up and in a particular state — mock the network boundary explicitly instead.`,
        },
      ],
    },
    {
      title: "State Management at Scale: Zustand and Redux Toolkit",
      lessons: [
        {
          slug: "when-context-stops-scaling",
          title: "When Context and useReducer Stop Scaling",
          estimatedMinutes: 7,
          content: `# When Context and useReducer Stop Scaling

The \`useReducer\` + \`useContext\` pattern from an earlier module is genuinely enough for a large share of real apps. But past a certain size — many independent pieces of shared state, many consumers reading different slices of it, a need for time-travel debugging — its limitations start to show. This lesson names those limitations, which motivates the two dedicated state-management libraries in the next two lessons.

## Limitation 1: every consumer re-renders on any change

\`\`\`jsx
const AppContext = createContext(null);

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
\`\`\`

Every component calling \`useContext(AppContext)\` re-renders whenever **any** part of \`state\` changes — even if it only ever reads \`state.theme\`, and the change was to a completely unrelated \`state.cart\`. Context has no built-in concept of "selecting" just the slice you care about; the entire provided value is one unit.

## Limitation 2: many small providers get unwieldy

The common workaround — splitting one giant context into several smaller, focused ones (cart, theme, auth) — helps, but a large app can end up with a dozen or more nested providers wrapping \`<App />\`, each with its own reducer and boilerplate, which becomes its own kind of complexity to manage.

## Limitation 3: no built-in dev tooling

Plain \`useReducer\` has no equivalent to "time-travel debugging" — stepping backward and forward through every state change an app has ever made, inspecting exactly what changed and why at each step. For very large, complex applications, this kind of tooling can meaningfully speed up debugging.

## What this motivates

Dedicated state-management libraries solve exactly these three problems: **selective subscriptions** (a component only re-renders when the specific slice it reads changes), **less boilerplate** for wiring up many independent pieces of shared state, and **dedicated developer tools**. The next two lessons cover the two most common choices in the current React ecosystem — Zustand (minimal, modern) and Redux Toolkit (structured, still extremely common in larger and older codebases).

## Mental model

Think of Context + \`useReducer\` as a solid, built-in toolkit that handles "medium-sized" shared state very well — the same way \`useState\` handles small, local state well. Dedicated libraries exist for the same reason a growing app eventually reaches for a database instead of an array of objects: not because the simpler tool was wrong, but because it stops scaling past a certain point.

## Common mistake

Reaching for Redux or Zustand on a small or medium app "because that's what real apps use," before ever hitting the actual limitations described above. Context and \`useReducer\` remain the right, simpler choice for a large share of real applications — bring in a dedicated library once you've concretely felt one of these specific pains, not preemptively.`,
        },
        {
          slug: "zustand-basics",
          title: "Zustand: Minimal Global State",
          estimatedMinutes: 8,
          content: `# Zustand: Minimal Global State

**Zustand** is a small, modern state-management library built around a simple idea: a plain function creates a store, and components subscribe to exactly the slice of it they need — directly solving the "every consumer re-renders on any change" problem from the previous lesson, with almost none of Redux's ceremony.

## Creating a store

\`\`\`js
import { create } from "zustand";

const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  clearCart: () => set({ items: [] }),
}));
\`\`\`

\`create((set) => ({...}))\` defines the store's entire shape in one place: its data (\`items\`) and the actions that update it (\`addItem\`, \`clearCart\`), all as one plain object. \`set\` works much like the \`setX\` functions from \`useState\` — it merges the returned object into the store's existing state.

## Using the store — no Provider required

\`\`\`jsx
function ProductPage({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  return <button onClick={() => addItem(product)}>Add to Cart</button>;
}

function CartBadge() {
  const itemCount = useCartStore((state) => state.items.length);
  return <span>{itemCount} items</span>;
}
\`\`\`

Notice there's no \`<CartProvider>\` wrapping the app anywhere — \`useCartStore\` is just a hook you import and call directly wherever it's needed, in contrast to the Context-based pattern from earlier.

## The key detail: selectors

\`useCartStore((state) => state.addItem)\` and \`useCartStore((state) => state.items.length)\` are **selectors** — each component subscribes only to the specific slice of the store it passes into that function. \`ProductPage\` only cares about \`addItem\` (a stable function reference that never changes), so it never re-renders when \`items\` itself changes. \`CartBadge\` only re-renders when \`items.length\` specifically changes — not on every unrelated update elsewhere in the store.

\`\`\`jsx
// Contrast with Context: reading the whole store's value, as you would
// with useContext, would re-render on every single change to any field —
// Zustand's selector pattern is what avoids that by design.
\`\`\`

This is the direct fix for Limitation 1 from the previous lesson: components read narrow, specific slices instead of one big shared object.

## Mental model

Think of a Zustand store as a small, standalone module of shared state — much like a plain JavaScript module with exported functions — except components can "watch" a specific piece of it and automatically re-render only when that specific piece changes, without any provider or wrapping component required.

## Common mistake

Selecting the entire store (\`const state = useCartStore()\`) instead of a narrow slice (\`useCartStore((state) => state.items)\`) out of convenience. This re-introduces the exact "re-render on any change" problem Zustand is meant to solve — always select just the specific fields or actions a given component actually needs.`,
        },
        {
          slug: "redux-toolkit-basics",
          title: "Redux Toolkit: Slices, Store, and DevTools",
          estimatedMinutes: 8,
          content: `# Redux Toolkit: Slices, Store, and DevTools

**Redux** predates most of the patterns covered in this course, and its ideas — a single, centralized store, updated only through pure reducer functions responding to dispatched actions — should feel familiar, since \`useReducer\` is directly inspired by it. **Redux Toolkit (RTK)** is the modern, officially recommended way to use Redux, dramatically cutting the boilerplate that gave classic Redux its reputation for verbosity.

## Defining a slice

\`\`\`js
import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload); // looks like mutation, but RTK handles it safely
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, clearCart } = cartSlice.actions;

const store = configureStore({
  reducer: { cart: cartSlice.reducer },
});
\`\`\`

A **slice** bundles a piece of state, its reducer logic, and its action creators into one \`createSlice(...)\` call — replacing what used to be several separate files of hand-written action types, action creators, and a switch-based reducer in classic Redux. Notice \`state.items.push(...)\` looks like the exact mutation you were warned against with \`useReducer\` — RTK uses a library called Immer internally that safely converts these mutation-looking calls into proper immutable updates behind the scenes.

## Connecting the store to React

\`\`\`jsx
import { Provider, useSelector, useDispatch } from "react-redux";
import { addItem } from "./cartSlice";

function App() {
  return (
    <Provider store={store}>
      <ProductPage />
    </Provider>
  );
}

function ProductPage({ product }) {
  const dispatch = useDispatch();
  return <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>;
}

function CartBadge() {
  const itemCount = useSelector((state) => state.cart.items.length);
  return <span>{itemCount} items</span>;
}
\`\`\`

\`<Provider store={store}>\` is Redux's own context-like wrapper; \`useSelector\` reads a specific slice of the store (with the same "only re-render when this slice changes" benefit Zustand's selectors provide), and \`useDispatch\` gives you the \`dispatch\` function to send actions — conceptually identical to the \`dispatch\` you've already used with plain \`useReducer\`, just operating on one shared, app-wide store instead of one component's local state.

## Redux DevTools

RTK's \`configureStore\` wires up the Redux DevTools browser extension automatically — giving you a full, inspectable log of every action ever dispatched, the resulting state after each one, and the ability to "time-travel" backward and forward through your app's entire state history. This is the concrete answer to Limitation 3 from two lessons ago, and remains one of Redux's most distinctive advantages over lighter alternatives.

## Zustand vs. Redux Toolkit

- **Zustand** — minimal setup, no Provider required, great default for most new projects that have outgrown Context.
- **Redux Toolkit** — more structure and ceremony, but extremely mature tooling, a huge ecosystem of middleware, and still the standard in many larger and older production codebases and teams.

## Mental model

Think of Redux Toolkit as Redux's core ideas (one central store, pure reducers, dispatched actions) with the tedious, error-prone boilerplate automated away — the underlying mental model is the same \`useReducer\` you already know, scaled up to a single store shared across an entire application, with dedicated tooling built around it.

## Common mistake

Introducing Redux (or any global store) for state that's only ever used by one small, self-contained part of the UI, like a single form's field values. Global state solutions are for state genuinely shared across many, otherwise-unrelated parts of an app — local \`useState\` remains the right, simpler choice for anything that doesn't need to be read or changed from far away.`,
        },
      ],
    },
    {
      title: "Beyond the SPA: Next.js and Server Rendering",
      lessons: [
        {
          slug: "why-server-rendering",
          title: "Why Server-Side Rendering and Meta-Frameworks",
          estimatedMinutes: 7,
          content: `# Why Server-Side Rendering and Meta-Frameworks

Every app in this course so far has been a **single-page application (SPA)**: one nearly-empty HTML file, with React building the entire UI client-side, in the browser, after JavaScript downloads and runs. This approach — the one \`createRoot\`/\`root.render\` from the very first lessons is built around — has real, structural downsides at a certain point, which this lesson names before introducing the standard fix.

## The cost of a purely client-rendered app

\`\`\`html
<!-- What the server actually sends, before any JavaScript runs -->
<div id="root"></div>
\`\`\`

A search engine crawler, or a user on a slow connection, initially receives close to nothing — a blank page — until the JavaScript bundle downloads, parses, executes, and finally renders the real content. For content-heavy sites (blogs, marketplaces, marketing pages) where fast initial load and search-engine visibility matter, this delay is a real, measurable problem, not just a theoretical one.

## Server-side rendering (SSR)

**SSR** renders your React components to HTML **on the server**, for each request, and sends that fully-formed HTML to the browser immediately — visible content appears right away, before any JavaScript has even finished downloading. React then **hydrates** that existing HTML in the browser, attaching event listeners and taking over, without needing to re-render everything from scratch.

## Static site generation (SSG)

A related approach, **SSG**, renders pages to HTML **at build time** instead of per-request — ideal for content that's the same for every visitor (a blog post, a marketing page) and doesn't need to be recalculated on every single request.

## Why a meta-framework, not just React alone

Plain React (the \`createRoot\` approach from this entire course) has no built-in concept of rendering on a server, generating pages at build time, or file-based routing. **Meta-frameworks** — built on top of React — provide all of this out of the box. **Next.js** is the dominant choice in the current ecosystem (Remix is a notable alternative with a similar goal). Rather than assembling SSR, routing, and bundling yourself, a meta-framework provides a well-tested, conventions-driven structure for building this kind of app.

## When you do (and don't) need one

A purely client-rendered SPA, exactly like the ones you've built throughout this course, remains a perfectly good choice for apps behind a login (internal dashboards, admin panels, authenticated tools) where search-engine visibility doesn't matter and the user already accepts a brief loading state. Meta-frameworks earn their added complexity for public-facing, content-heavy, or SEO-sensitive sites.

## Mental model

Think of a plain SPA as a restaurant that hands you a blank menu and cooks everything from scratch the moment you sit down; SSR is having the appetizer already plated and on the table when you arrive, while the kitchen (React, hydrating) catches up on the rest just behind it.

## Common mistake

Assuming every React project needs Next.js (or another meta-framework) by default. Many real, successful apps are, and should remain, plain client-rendered SPAs — reach for a meta-framework when its specific benefits (SSR/SSG, file-based routing, built-in bundling conventions) actually address a real requirement of the project, not as an automatic first choice.`,
        },
        {
          slug: "nextjs-file-based-routing",
          title: "File-Based Routing and Data Fetching in Next.js",
          estimatedMinutes: 8,
          content: `# File-Based Routing and Data Fetching in Next.js

**Next.js** is the most widely adopted React meta-framework. This lesson covers its two most distinctive features compared to everything covered so far in this course: routes defined by your folder structure instead of explicit \`<Route>\` elements, and data fetching that can happen directly on the server.

## File-based routing

\`\`\`text
app/
├── page.jsx              → renders at  /
├── about/
│   └── page.jsx           → renders at  /about
└── products/
    ├── page.jsx            → renders at  /products
    └── [productId]/
        └── page.jsx         → renders at  /products/:productId
\`\`\`

Compare this to React Router's explicit \`<Route path="/products/:productId" element={<ProductPage />} />\` from an earlier module: in Next.js, the **folder structure itself** defines the routes — a folder named \`[productId]\` (square brackets, matching the dynamic-segment syntax you already know from React Router) creates a dynamic route segment, with no separate routing configuration file to keep in sync with your folders.

## A page component

\`\`\`jsx
// app/products/[productId]/page.jsx
export default function ProductPage({ params }) {
  return <h1>Showing product {params.productId}</h1>;
}
\`\`\`

Next.js automatically supplies \`params.productId\` based on the folder's \`[productId]\` segment and the actual URL visited — conceptually the same information \`useParams()\` gave you with React Router, just delivered as a prop instead of a hook, because this component can run on the server.

## Fetching data directly in a server component

\`\`\`jsx
// app/products/[productId]/page.jsx
export default async function ProductPage({ params }) {
  const res = await fetch(\`https://api.example.com/products/\${params.productId}\`);
  const product = await res.json();

  return <h1>{product.name}</h1>;
}
\`\`\`

This looks unlike anything else in this course: the component itself is an \`async function\`, awaiting a \`fetch\` call directly in its body — something that's not valid in a plain client-rendered React component (recall the earlier lesson explaining exactly why fetching belongs in \`useEffect\`, not the component body, in that context). In Next.js, this component runs **on the server** for each request, where an \`async\` component awaiting data before rendering is a supported, first-class pattern — the resulting HTML, already containing the product's name, is what gets sent to the browser.

## Client-side interactivity still works the same way

Anything requiring \`useState\`, \`useEffect\`, or event handlers still needs to run in the browser — Next.js requires explicitly marking such a component with a \`"use client"\` directive at the top of the file, at which point every hook and pattern from this entire course applies exactly as you've learned it.

## Mental model

Think of Next.js's file-based routing as your file system doubling as a routing configuration — folder nesting mirrors URL nesting directly — while its data-fetching model lets components closer to the server fetch data before any HTML is even sent, rather than after the browser has already received an empty shell.

## Common mistake

Assuming every Next.js component can freely use \`fetch\` directly in its body the way the server component example does. That pattern is specific to **server components** — a component marked \`"use client"\` (or any plain React component outside a meta-framework) still needs to fetch data inside \`useEffect\`, exactly as taught earlier in this course.`,
        },
        {
          slug: "react-server-components-preview",
          title: "A Preview of React Server Components",
          estimatedMinutes: 6,
          content: `# A Preview of React Server Components

The previous lesson's \`async\` component that fetches data directly in its body is an example of a broader, newer React feature: **React Server Components (RSC)**. This closing lesson gives a conceptual preview — not deep mastery, but enough to recognize the idea and its tradeoffs when you encounter it.

## Two kinds of components, now

- **Server Components** — render only on the server. They can be \`async\`, read directly from a database or file system, and — critically — **ship zero JavaScript to the browser** for that component's own code, since the browser never needs to run it; it only ever receives the resulting HTML/description.
- **Client Components** — everything you've built throughout this entire course: components that run in the browser, can use \`useState\`/\`useEffect\`/event handlers, and do need their JavaScript shipped to the browser to work. In a framework like Next.js, these are explicitly marked with a \`"use client"\` directive at the top of the file.

\`\`\`jsx
// A Server Component: no "use client", can be async, never ships its own JS
export default async function ProductPage({ params }) {
  const product = await getProductFromDatabase(params.productId);
  return (
    <div>
      <h1>{product.name}</h1>
      <AddToCartButton productId={product.id} /> {/* a Client Component */}
    </div>
  );
}
\`\`\`

\`\`\`jsx
// A Client Component: needs interactivity, so it opts in explicitly
"use client";

function AddToCartButton({ productId }) {
  const [isAdding, setIsAdding] = useState(false);
  // ... useState, onClick, everything from this entire course applies here
}
\`\`\`

## Why this distinction exists

Every component in a purely client-rendered SPA ships its JavaScript to every visitor, whether or not that component ever actually needs interactivity — a lot of "just display this data" UI (product descriptions, article bodies, static layout) doesn't need any client-side JavaScript at all. Server Components let exactly that kind of non-interactive content skip the download entirely, while Client Components are still used precisely where real interactivity (state, effects, event handlers) is needed — the two compose together in a single tree, as shown above.

## Why this is a preview, not a full module

RSC is one of the most actively evolving areas of the React ecosystem, with conventions still settling across different meta-frameworks. Building deep expertise here is best done directly against a specific, current framework's documentation (Next.js's, most commonly) rather than in a framework-agnostic course — but recognizing the core distinction (server-only vs. client, and why it exists) means the idea won't be unfamiliar the first time you encounter it in a real codebase.

## Mental model

Think of Server Components as content that's "baked" once on the server and shipped as a finished product (no ongoing JavaScript needed on the client for that piece), while Client Components are "assembled on-site" in the browser, exactly like every component you built throughout the rest of this course — a real app is typically a deliberate mix of both.

## Try it yourself

If you'd like to go further after this course, scaffold a fresh Next.js app (\`npx create-next-app@latest\`), and try building one page as a plain server component (fetching and displaying static data, no \`"use client"\`) alongside one small interactive piece marked \`"use client"\` — seeing the boundary between the two in a real project cements this distinction far more effectively than reading about it alone.`,
        },
      ],
    },
    {
      title: "Routing, Error Handling & Capstone Project",
      lessons: [
        {
          slug: "react-router-basics",
          title: "Client-Side Routing with React Router",
          estimatedMinutes: 10,
          content: `# Client-Side Routing with React Router

So far, every example has been a single page. Real applications usually need multiple distinct views — a home page, a product page, a settings page — each reachable by its own URL, without a full page reload between them. **React Router** is the standard library for this in React apps that aren't using a server-rendering framework.

## Installing and setting up routes

\`\`\`bash
npm install react-router-dom
\`\`\`

\`\`\`jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import ProductPage from "./ProductPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:productId" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\`

- \`BrowserRouter\` sets up the browser history integration so the URL bar reflects the current view.
- \`Routes\` looks at the current URL and renders the single best-matching \`Route\`'s \`element\`.
- \`path="/products/:productId"\` defines a **dynamic segment** — any value in that position of the URL is captured and made available to the matched component.
- \`path="*"\` is a catch-all, matching anything that didn't match an earlier route — commonly used for a 404 "not found" page.

## Reading route parameters

\`\`\`jsx
import { useParams } from "react-router-dom";

function ProductPage() {
  const { productId } = useParams();
  return <h1>Showing product {productId}</h1>;
}
\`\`\`

Visiting \`/products/42\` renders \`ProductPage\`, and \`useParams()\` returns \`{ productId: "42" }\` inside it — this is how the component knows *which* product to show or fetch.

## Navigating without a full page reload

\`\`\`jsx
import { Link, useNavigate } from "react-router-dom";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div>
      <Link to={\`/products/\${product.id}\`}>{product.name}</Link>
      <button onClick={() => navigate("/cart")}>Buy now</button>
    </div>
  );
}
\`\`\`

\`Link\` renders an \`<a>\` tag but intercepts the click to update the URL and swap the rendered route *without* asking the browser for a fresh page — this is what makes navigation feel instant in a client-side-routed app. \`useNavigate()\` gives you the same behavior programmatically, useful for redirecting after an action (like a successful form submission).

## Mental model

Think of \`Routes\`/\`Route\` as a big \`switch\` statement over the current URL: "if the path looks like this, render that component." Instead of the browser requesting a whole new HTML page for every link click, React Router just swaps which component is rendered — all while keeping the rest of your app (like a persistent header or sidebar outside the \`Routes\`) mounted and untouched.

## Common mistake

Using a plain \`<a href="/products/42">\` instead of \`<Link to="/products/42">\`. A plain anchor tag triggers a full browser page reload, throwing away all of your app's in-memory state and defeating the entire point of client-side routing — always use \`Link\` (or \`navigate\`) for in-app navigation.`,
        },
        {
          slug: "error-boundaries",
          title: "Error Boundaries: Handling Crashes Gracefully",
          estimatedMinutes: 8,
          content: `# Error Boundaries: Handling Crashes Gracefully

By default, if any component throws an error while rendering, React unmounts the *entire* component tree, leaving a blank page — a jarring experience for a bug in one small, unrelated part of the UI. **Error boundaries** let you catch rendering errors in a subtree and show a fallback UI instead of a blank screen.

## What an error boundary looks like

Error boundaries currently must be written as class components — this is one of the few remaining places classes appear in a modern React codebase, since there is no hook equivalent yet.

\`\`\`jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p>Something went wrong. Please refresh the page.</p>;
    }
    return this.props.children;
  }
}
\`\`\`

## Using it to isolate risky sections

\`\`\`jsx
function App() {
  return (
    <div>
      <Header />
      <ErrorBoundary>
        <ProductRecommendations />
      </ErrorBoundary>
      <Footer />
    </div>
  );
}
\`\`\`

If \`ProductRecommendations\` throws during rendering — say, due to unexpected \`undefined\` data from an API — the error boundary catches it and shows its fallback UI *only* for that section. \`Header\` and \`Footer\` remain fully functional, instead of the whole page going blank.

## What error boundaries do and don't catch

Error boundaries catch errors thrown during **rendering**, in **lifecycle methods**, and in **constructors** of the component tree below them. They do **not** catch errors inside event handlers (use a regular \`try\`/\`catch\` there instead), asynchronous code (like inside a \`setTimeout\` or an unguarded \`.then()\`), or errors in the error boundary itself.

\`\`\`jsx
function DeleteButton() {
  function handleClick() {
    try {
      riskyDeleteOperation();
    } catch (error) {
      console.error("Delete failed:", error);
      // handle it directly here — an error boundary won't catch this
    }
  }
  return <button onClick={handleClick}>Delete</button>;
}
\`\`\`

## Mental model

Think of an error boundary like a circuit breaker in a house's electrical panel: if one circuit (component subtree) has a fault, the breaker trips and isolates just that section, instead of cutting power to the whole house. Placing boundaries strategically around independent, risk-prone sections (a third-party widget, a complex data visualization) keeps one bug from taking down the entire page.

## Common mistake

Wrapping the entire app in a single top-level error boundary and calling it done. While better than nothing, a single boundary means *any* rendering error anywhere blanks out the *entire* app with the same generic fallback. Placing boundaries around individual, independent sections gives users a much better experience — the rest of the page keeps working even if one part fails.`,
        },
        {
          slug: "suspense-and-lazy-loading",
          title: "Code Splitting with Suspense and lazy",
          estimatedMinutes: 8,
          content: `# Code Splitting with Suspense and lazy

By default, a bundler like Vite packages your entire app into one (or a few) JavaScript files, all downloaded before the app can run. As an app grows, that bundle grows too — including code for pages or features a given user may never visit. **Code splitting** lets you load parts of your app only when they're actually needed, and \`React.lazy\` combined with \`Suspense\` is the built-in way to do this at the component level.

## Lazily loading a component

\`\`\`jsx
import { lazy, Suspense } from "react";

const SettingsPage = lazy(() => import("./SettingsPage.jsx"));

function App() {
  return (
    <Suspense fallback={<p>Loading page...</p>}>
      <SettingsPage />
    </Suspense>
  );
}
\`\`\`

\`lazy(() => import("./SettingsPage.jsx"))\` tells your bundler to split \`SettingsPage\` (and everything it exclusively imports) into its own separate file, only fetched over the network the first time it's actually rendered — not as part of the app's initial load.

\`Suspense\` is what makes this usable: it lets you declare a \`fallback\` UI to show *while* a lazy component's code is still being downloaded. Once the download finishes, \`Suspense\` swaps in the real component automatically.

## Combining with routes

Code splitting pairs especially naturally with routing, since a user typically only needs the code for the page they're currently viewing:

\`\`\`jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./HomePage.jsx"));
const SettingsPage = lazy(() => import("./SettingsPage.jsx"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
\`\`\`

Now a visitor who only ever views the home page never downloads the JavaScript for the settings page at all — it's fetched on demand only if they navigate there.

## Why this matters as apps grow

A smaller initial bundle means the app becomes interactive sooner, especially on slower connections or devices. Code splitting doesn't reduce the *total* amount of code your app ships overall — it changes *when* each piece is downloaded, prioritizing what's needed immediately over what might be needed later.

## Mental model

Think of your app's code like chapters of a book. Without code splitting, you ship the reader the entire book before they can start reading page one. With \`lazy\` + \`Suspense\`, you hand over chapter one immediately, and fetch each later chapter only once the reader actually turns to it — with a brief "turning the page..." moment (the \`fallback\`) while it loads.

## Common mistake

Wrapping every single small component in \`lazy\`, including tiny ones that are needed immediately on first load. Code splitting has its own overhead (an extra network request per split point) — it pays off for genuinely large, infrequently-needed pieces (a whole settings page, a rarely-used modal, a heavy chart library), not for small components that are part of the essential first render.`,
        },
        {
          slug: "capstone-putting-it-together",
          title: "Capstone: Putting It All Together",
          estimatedMinutes: 12,
          content: `# Capstone: Putting It All Together

You've covered the full arc: components and props, state and events, effects and data fetching, context and reducers, custom hooks, performance tools, routing, error boundaries, and code splitting. This final lesson ties everything together into one cohesive architecture — the shape a real, small-to-medium production React app actually tends to take.

## A realistic app structure

\`\`\`text
src/
├── main.jsx                  # mounts <App />
├── App.jsx                    # routes + top-level providers
├── context/
│   └── CartContext.jsx          # useReducer + createContext, shared cart state
├── hooks/
│   ├── useFetch.js                # reusable data-fetching custom hook
│   └── useWindowWidth.js
├── pages/
│   ├── HomePage.jsx
│   ├── ProductPage.jsx
│   └── CartPage.jsx
└── components/
    ├── ProductCard.jsx
    ├── ErrorBoundary.jsx
    └── Layout.jsx
\`\`\`

## Wiring it together

\`\`\`jsx
// App.jsx
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import Layout from "./components/Layout.jsx";

const HomePage = lazy(() => import("./pages/HomePage.jsx"));
const ProductPage = lazy(() => import("./pages/ProductPage.jsx"));
const CartPage = lazy(() => import("./pages/CartPage.jsx"));

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <ErrorBoundary>
            <Suspense fallback={<p>Loading...</p>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products/:productId" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}
\`\`\`

Notice how each concept from earlier modules occupies exactly one clear layer: \`CartProvider\` (reducer + context) supplies global cart state; \`BrowserRouter\`/\`Routes\` handles navigation; \`ErrorBoundary\` isolates rendering crashes; \`Suspense\` + \`lazy\` keeps the initial bundle small; \`Layout\` composes the persistent chrome (header/nav) around whichever page is active.

## A page that pulls it all together

\`\`\`jsx
// pages/ProductPage.jsx
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch.js";
import { useCart } from "../context/CartContext.jsx";

export default function ProductPage() {
  const { productId } = useParams();                          // routing
  const { data: product, isLoading, error } = useFetch(\`/api/products/\${productId}\`); // custom hook + data fetching
  const { dispatch } = useCart();                               // reducer + context

  if (isLoading) return <p>Loading product...</p>;
  if (error) return <p>Could not load product.</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>\${product.price}</p>
      <button onClick={() => dispatch({ type: "added_item", item: product })}>
        Add to Cart
      </button>
    </div>
  );
}
\`\`\`

In a handful of lines, this single component demonstrates route params, a custom data-fetching hook, shared reducer-backed context state, conditional rendering for loading/error states, and an event handler — nearly every concept from this course, composed naturally rather than forced together.

## Where to go from here

From this foundation, the natural next steps are: adding a testing library (React Testing Library) to verify components behave correctly, adopting TypeScript for compile-time safety on props and state, and exploring a meta-framework like Next.js if your app needs server-side rendering or file-based routing. Every one of those builds directly on the mental models from this course — components, props, state, effects, and composition remain the foundation underneath all of it.

## Try it yourself

Take a small idea (a notes app, a movie watchlist, a habit tracker) and build it using this same shape: a reducer + context for the shared data, a custom \`useFetch\`-style hook if it talks to any API, React Router for at least two pages, and one error boundary around the riskiest part. Building one complete, if small, app end-to-end will cement these patterns far more than reading about them ever could.`,
        },
      ],
      quiz: {
        title: "Tier 3 Checkpoint: Advanced React",
        questions: [
          {
            text: "What is the main advantage of useReducer over several separate useState calls for a piece of state?",
            optionA: "useReducer is always faster to execute than useState",
            optionB: "It centralizes how complex, related state transitions happen in one function, described by dispatched actions",
            optionC: "useReducer removes the need for a dependency array in effects",
            optionD: "It automatically persists state to local storage",
            correctOption: "B",
          },
          {
            text: "In the reducer + context pattern, what problem does wrapping useReducer's state and dispatch in a context Provider solve?",
            optionA: "It makes the reducer function run faster",
            optionB: "It lets components anywhere in the wrapped subtree read and dispatch actions without prop drilling",
            optionC: "It is required for useReducer to work at all",
            optionD: "It automatically fetches data from an API on mount",
            correctOption: "B",
          },
          {
            text: "What does calling a custom hook like useWindowWidth() from two different components actually share between them?",
            optionA: "The exact same state value, kept in sync automatically",
            optionB: "Nothing but the reused logic/pattern — each call gets its own independent state",
            optionC: "A single shared DOM node",
            optionD: "The same useEffect cleanup function instance",
            correctOption: "B",
          },
          {
            text: "Why must hooks always be called in the same order on every render, never inside a condition or loop?",
            optionA: "It's purely a stylistic convention with no functional impact",
            optionB: "React matches each hook call to its stored data by call order, so a skipped call shifts every subsequent hook's data",
            optionC: "JavaScript itself forbids calling functions conditionally",
            optionD: "It only matters for useEffect, not useState",
            correctOption: "B",
          },
          {
            text: "What does wrapping a component in React.memo primarily do?",
            optionA: "It permanently prevents the component from ever re-rendering",
            optionB: "It skips re-rendering the component if its props are shallowly equal to the previous render's props",
            optionC: "It automatically fetches and caches API data for the component",
            optionD: "It converts the component into a class component internally",
            correctOption: "B",
          },
          {
            text: "Why can passing an inline arrow function as a prop silently defeat React.memo on a child component?",
            optionA: "Arrow functions are not allowed as props in React",
            optionB: "A new function is created on every render, so the memoized child sees a 'changed' prop (different reference) each time",
            optionC: "memo does not support function props at all",
            optionD: "Inline functions always throw a runtime error inside memoized components",
            correctOption: "B",
          },
          {
            text: "What is generally the recommended first step before reaching for memo, useMemo, or useCallback?",
            optionA: "Apply all three to every component immediately, as a preventive default",
            optionB: "Confirm there's an actual, measurable performance problem (e.g. via React DevTools Profiler) before optimizing",
            optionC: "Rewrite the component as a class component",
            optionD: "Disable the virtual DOM for that component",
            correctOption: "B",
          },
          {
            text: "In React Router, what is the key difference between a plain <a href=\"/products/1\"> and <Link to=\"/products/1\">?",
            optionA: "There is no difference; they behave identically",
            optionB: "Link triggers a full browser page reload, while <a> does not",
            optionC: "Link updates the URL and swaps the rendered route without a full page reload, while a plain <a> would reload the whole page",
            optionD: "Link only works for external URLs",
            correctOption: "C",
          },
          {
            text: "Which of the following errors WILL be caught by a React error boundary wrapping a component?",
            optionA: "An error thrown inside a button's onClick handler",
            optionB: "An error thrown while the wrapped component is rendering",
            optionC: "An error thrown inside a setTimeout callback",
            optionD: "A rejected promise inside an unrelated fetch call with no .catch",
            correctOption: "B",
          },
          {
            text: "What does wrapping a lazily-loaded component in <Suspense fallback={...}> achieve?",
            optionA: "It prevents the component's code from ever being downloaded",
            optionB: "It shows the fallback UI while the lazy component's code is being fetched, then renders the real component once ready",
            optionC: "It merges the lazy component's bundle into the main bundle immediately",
            optionD: "It disables error boundaries for that component",
            correctOption: "B",
          },
        ],
      },
    },
  ],
};

export default content;
