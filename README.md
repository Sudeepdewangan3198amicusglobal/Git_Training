## .gitignore

A `.gitignore` file tells Git which files and folders should not be tracked or committed to the repository.

For this project, `.gitignore` excludes IDE files, build outputs, dependencies, operating-system files, temporary files, and local environment configuration.

### What happens if you forget `.gitignore` on the first commit?

If `.gitignore` is missing during the first commit, files such as `node_modules`, IDE configuration files, build outputs, and OS-generated files may be added to Git and become tracked.

Adding `.gitignore` later does not automatically remove files that Git is already tracking.

### How do you fix it retroactively?

First, create the `.gitignore` file and add the files/folders that should be ignored.

Then remove the already-tracked files from Git's index without deleting them from the local computer:

```bash
git rm -r --cached node_modules
git rm -r --cached dist
git rm -r --cached .vscode
```

For all files that are now covered by `.gitignore`, you can use:

```bash
git rm -r --cached .
git add .
git commit -m "Add gitignore and remove ignored files"
```

The `--cached` option removes the files from Git tracking but keeps them on the local machine.

After the commit, Git will ignore those files according to `.gitignore`.


# README

## Study Notes / Interview Questions & Answers

### Contents
- [HTML & Accessibility](#html-accessibility)
- [JavaScript Modules](#javascript-modules)
- [Web Storage & localStorage](#web-storage-localstorage)
- [DOM, innerHTML & XSS](#dom,-innerhtml-xss)
- [Debounce & URL State](#debounce-url-state)
- [Event Delegation](#event-delegation)
- [Pagination](#pagination)
- [Timers & Toast Notifications](#timers-toast-notifications)
- [Dependent Dropdowns](#dependent-dropdowns)
- [Form Validation & Accessibility](#form-validation-accessibility)
- [Angular Reactive Forms](#angular-reactive-forms)
- [Promises](#promises)
- [Debounce, Stale Responses & AbortController](#debounce,-stale-responses-abortcontroller)
- [fetch() vs Axios](#fetch()-vs-axios)
- [Theme Management](#theme-management)

The notes below are organized by topic for easier revision.
## Study Notes / Interview Questions & Answers

## HTML & Accessibility

## 1. Why does the order of <meta charset> matter?

The <meta charset="UTF-8"> tag should appear within the **first 1024 bytes** of the HTML document. Browsers start reading the page immediately, so placing it at the top ensures the correct character encoding is used from the beginning and prevents broken or incorrect characters.

---

## 2. What does <meta name="theme-color"> do?

The <meta name="theme-color"> tag changes the browser's theme color on supported mobile browsers (such as the address bar and toolbar), making the browser UI match your website.

**Example**

```html
<meta name="theme-color" content="#0d6efd">

---

## 3. When does a <section> become a landmark?

A <section> becomes an accessible landmark **only if it has an accessible name**.

Provide the name using either:

- aria-labelledby (recommended)
- aria-label

Without an accessible name, most screen readers do not expose the section as a landmark.

---

## 4. Why use a Skip Link?

A skip link allows keyboard and screen reader users to skip repetitive navigation and jump directly to the main content.

**Benefits**

- Fewer Tab key presses
- Faster navigation
- Better accessibility (WCAG compliant)

---

## 5. Why is Delete a <form method="post"> instead of an <a>?

Deleting data changes server data, so it should use **POST**, not **GET**.

Using a GET link for deletion can cause accidental deletions due to:

- Browser prefetching
- Search engine crawlers
- Shared or cached URLs

A POST form also supports **CSRF protection**, making destructive actions more secure.

---

## 6. Why use novalidate?

The novalidate attribute disables the browser's default validation pop-ups while keeping HTML validation rules (required, pattern, minlength, etc.).

This allows JavaScript to display custom, accessible validation messages and a consistent error summary.

---

## 7. Three Layers of Validation

### HTML Validation

- Performed by the browser
- Uses attributes like required, pattern, minlength, and maxlength
- Can be bypassed using DevTools, novalidate, or custom requests

### JavaScript Validation

- Provides custom validation and a better user experience
- Can be bypassed by disabling JavaScript or sending requests with tools like Postman or curl

### Server Validation (Required)

- Always validates data on the server
- Cannot trust client-side validation alone
- Protects against invalid, malicious, or manipulated data
- **Required in every production application**

---

## 8. Why use <time datetime="..."> instead of `<span>`?

The <time> element provides both:

- A human-readable date
- A machine-readable timestamp through the `datetime` attribute

This helps:

- Screen readers
- Search engines
- Scrapers
- Calendar applications

A <span> only displays text and has no semantic meaning for dates or times.

## JavaScript Modules

### JavaScript

1. What are the trade-offs of using ES Modules in this project?
Code is modular, reusable, and easier to maintain.
Modules run in strict mode automatically.
Scripts are deferred by default.
Supports top-level await.
Cannot be run directly using file:// due to browser CORS restrictions; requires a local web server.
2. What does "deferred by default" mean for DOMContentLoaded?

ES module scripts are downloaded while the HTML is being parsed but execute only after the HTML has been fully parsed. Therefore, the DOM is usually ready before the module runs, and DOMContentLoaded is fired after all deferred module scripts have executed.

3. Why does file:// break <script type="module">?

Browsers enforce the Same-Origin Policy for ES modules. When a page is opened using file://, it has no valid HTTP origin, so module imports and fetch() requests are blocked by CORS, causing the module to fail to load.

4. What does VS Code Live Server give you?

VS Code Live Server starts a local HTTP server (e.g., http://localhost:5500) that:

Provides a valid web origin.
Prevents CORS issues with ES modules.
Allows import and fetch() to work correctly.
Automatically reloads the browser when files are saved.
Simulates a real web server environment.

## Web Storage & localStorage

1. Why namespace localStorage keys?

Namespacing localStorage keys prevents naming conflicts between different applications on the same origin. It also makes the stored data easier to organize, identify, and maintain.

2. What happens when two apps on the same origin both use "theme"?

Both applications share the same localStorage, so using the same key ("theme") causes one application to overwrite the other's value, leading to unexpected behavior.

3. Why must storage reads be wrapped in try/catch?

Storage reads should be wrapped in try/catch because:

Private/Incognito mode may throw storage or quota errors.
Stored JSON may be corrupted or invalid.
JSON.parse() throws an exception when parsing malformed JSON.

Using try/catch prevents the application from crashing and allows it to return a safe default value.

## DOM, innerHTML & XSS

1. When is innerHTML acceptable?

innerHTML is acceptable when inserting trusted, static HTML content that is fully controlled by the developer and does not contain user input.

2. When is innerHTML dangerous?

innerHTML is dangerous when inserting untrusted or user-provided content because it can execute malicious scripts or HTML.

3. Explain XSS in one sentence.

Cross-Site Scripting (XSS) is a security vulnerability where an attacker injects malicious JavaScript into a web page that executes in another user's browser.

4. Why is DocumentFragment faster than appending nodes one by one?

DocumentFragment builds all DOM elements in memory first and inserts them into the document in a single operation, reducing repeated reflows, repaints, and layout calculations, which improves rendering performance.

## Debounce & URL State

1. How do setTimeout() and a closure variable implement debounce?

A closure variable stores the timeout ID between function calls. Each new call clears the previous timeout using clearTimeout(), then starts a new setTimeout(). As a result, the callback executes only after the user stops triggering the event for the specified delay.

2. What bug is avoided by mirroring the filter state in the URL?

Mirroring the filter state in the URL prevents filters from being lost after a page refresh, bookmark, or when sharing the page, ensuring the same filtered results are restored automatically.

## Event Delegation

1. What is event delegation?

Event delegation is a technique where a single event listener is attached to a parent element to handle events from its child elements using event bubbling.

2. Give two reasons why event delegation is better than one listener per element.
It improves performance by reducing the number of event listeners and memory usage.
It automatically works for dynamically added child elements without needing to attach new event listeners.
3. When does event delegation fail?

Event delegation fails for events that do not bubble, such as focus, blur, mouseenter, and mouseleave.

4. What should be used instead of focus and blur?

Use focusin and focusout because they bubble and can be handled through event delegation.

## Pagination

Q1. Why does a real app paginate on the SERVER?

Answer: Server-side pagination sends only the required records for the current page, reducing network traffic, memory usage, and improving performance for large datasets.

Q2. What breaks at 100k rows client-side?

Answer: Loading 100,000 rows on the client causes slow page loads, high memory consumption, sluggish filtering/sorting, UI lag, and poor browser performance.

Q3. What's the contract between client pagination and a future server endpoint?

Answer: The client sends pagination parameters (such as page, pageSize, sort, and filters) to the server, and the server returns only the requested page of data along with metadata like totalRecords and totalPages.

## Timers & Toast Notifications

1. What is the difference between setTimeout() and setInterval()?
Answer: setTimeout() executes a function once after a specified delay, while setInterval() executes a function repeatedly at fixed time intervals until it is stopped.

2. When does clearTimeout() matter?
Answer: clearTimeout() is used to cancel a scheduled setTimeout() before it executes. It prevents unwanted or outdated actions from running.

3. Why does a global single-toast singleton have a bug?
Answer: A single global toast can cause newer toast messages to overwrite older ones, making notifications disappear too early or display incorrectly. This becomes a problem when multiple toast messages are triggered in quick succession.

4. How does a Map of timer IDs fix this problem?
Answer: A Map stores a separate timer ID for each toast, allowing each notification to manage its own timeout independently. This prevents timers from interfering with each other and ensures every toast is displayed and dismissed correctly.

## Dependent Dropdowns

1. How does the dependent-dropdown pattern translate to a real backend?
Answer: In a real backend, you can either eager-load all locations at once or fetch locations only when the user selects a Business Unit.

2. What is eager-loading?
Answer: Eager-loading retrieves all required data (such as all locations) in a single request when the page loads. This provides faster dropdown updates because no additional network requests are needed.

3. What are the advantages of eager-loading?
Answer: It reduces the number of server requests, provides instant dropdown updates, and works well when the dataset is small.

4. What are the disadvantages of eager-loading?
Answer: It increases the initial page load time and downloads unnecessary data if many locations are never used.

5. What is fetching per Business Unit change?
Answer: The application sends a request to the server each time the user selects a Business Unit and retrieves only the locations for that unit.

6. What are the advantages of fetching per BU change?
Answer: It reduces the initial payload size, downloads only the required data, and scales better for large datasets.

7. What are the disadvantages of fetching per BU change?
Answer: It requires additional network requests, may introduce loading delays, and depends on a reliable internet connection.

8. Which approach is better?
Answer: Eager-loading is best for small datasets, while fetching per Business Unit change is preferred for large datasets because it improves scalability and reduces unnecessary data transfer.

## Form Validation & Accessibility

1. Why is uniqueness validation impossible in HTML alone?

Answer: HTML validation can only validate the current field's format and constraints. It cannot compare the entered value with existing records to determine whether it is unique.

2. Why is the "belongs to Business Unit" check necessary even though the dropdown restricts it?

Answer: Users can modify form values using browser DevTools or send custom HTTP requests. Validation must verify that the selected Customer Location actually belongs to the selected Business Unit to prevent invalid or tampered data.

3. Why is focus management on submit failure a WCAG concern?

Answer: After validation fails, moving keyboard focus to the error summary ensures keyboard and screen-reader users are immediately informed of the errors. This improves accessibility by making validation feedback easy to discover and navigate, helping meet WCAG requirements.

## Angular Reactive Forms

What does Angular Reactive Forms give you for free?

Answer: Angular Reactive Forms automatically tracks control states (touched, dirty, pristine, valid, invalid), runs validation, manages form state, displays errors, and provides observables for reacting to value and status changes.

What does Angular Reactive Forms NOT give you?

Answer: It does not automatically implement business-specific rules such as database uniqueness checks, API validation, custom error messages, server communication, or application-specific validation logic—you must implement those yourself.

## Promises

Promise.all vs Promise.allSettled

Answer: Promise.all() is fail-fast—it rejects immediately if any promise fails. Promise.allSettled() waits for every promise to finish and returns the status (fulfilled or rejected) of each one. For this task, Promise.all() is the better choice because all four JSON files are required; if any one fails, the application cannot initialize correctly, so failing immediately is appropriate.

What does Promise.any solve that the others don't?

Answer: Promise.any() resolves as soon as the first promise succeeds, ignoring any failures unless all promises fail. It is useful when multiple sources can provide the same data and only one successful result is needed.

## Debounce, Stale Responses & AbortController

1. Why is debounce alone not enough?

Answer: Debounce reduces the number of requests, but it cannot prevent the stale-response-wins problem. If an earlier request finishes after a newer one, it can overwrite the latest results with outdated data.

2. How does AbortController fix this?

Answer: AbortController cancels the previous pending request before starting a new one. This ensures that only the most recent request can complete and update the UI, preventing stale data from being displayed.

3. When else would you use AbortController in vanilla JavaScript?

Answer: AbortController is commonly used to cancel fetch() requests, automatically remove event listeners by passing a signal to addEventListener(), and cancel operations involving ReadableStream or other abortable asynchronous tasks.

## fetch() vs Axios

fetch() is designed to resolve successfully for 4xx and 5xx HTTP responses because the request itself reached the server and a valid HTTP response was received. It only rejects the promise for network-level failures, such as no internet connection, DNS lookup failures, or the request being aborted. Axios differs because it automatically rejects the promise for HTTP error status codes (typically any response outside the 2xx range), allowing them to be handled directly in the catch block without manually checking response.ok.

## Theme Management

1. Why prefer the user's explicit choice over the OS preference once they've chosen?

Answer: A user's explicit theme choice reflects their personal preference and should take priority over the operating system's default setting. Respecting that choice provides a consistent user experience and prevents unexpected theme changes.

2. What's the equivalent in CSS-only theming?

Answer: The CSS-only equivalent is using the @media (prefers-color-scheme: dark) media query, which automatically applies light or dark styles based on the user's operating system preference.

3. Why does the JavaScript toggle beat CSS-only theming for this case?

Answer: A JavaScript toggle allows users to manually override the system preference and saves that choice in localStorage, ensuring it persists across sessions. CSS-only theming cannot remember a user's explicit preference or provide a manual override on its own.
