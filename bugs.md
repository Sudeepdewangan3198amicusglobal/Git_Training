

# Bug 1 – Classic `var` Closure in Loop

### Category

JavaScript

### Problem

Using `var` inside a loop with `setTimeout()` causes every callback to use the same variable.

### Buggy Code

```javascript
for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
```

### Expected Output

```
0
1
2
```

### Actual Output

```
3
3
3
```

### Root Cause

`var` is function scoped, so every callback references the same variable.

### Fix

```javascript
for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
}
```

### Lesson Learned

Use `let` whenever loop variables are captured by asynchronous callbacks.

---

# Bug 2 – Incorrect `this` Binding

### Category

JavaScript

### Problem

Passing a class method directly as an event listener changes the value of `this`.

### Buggy Code

```javascript
button.addEventListener("click", this.addRow);
```

### Result

```
TypeError:
Cannot read properties of undefined
```

### Root Cause

Inside the event handler, `this` refers to the clicked button instead of the class instance.

### Fix 1

```javascript
button.addEventListener("click", this.addRow.bind(this));
```

### Fix 2

```javascript
addRow = () => {
   // code
}
```

### Lesson Learned

Arrow functions preserve lexical `this`. `bind()` permanently binds the correct object.

---

# Bug 3 – Forgot `JSON.parse()`

### Category

Local Storage

### Problem

Objects stored in localStorage return as strings.

### Buggy Code

```javascript
const data = localStorage.getItem("ams.attributes");

console.log(data[0].attributeName);
```

### Error

```
undefined
```

or

```
TypeError
```

### Root Cause

`localStorage.getItem()` always returns a string.

### Fix

```javascript
const data = JSON.parse(localStorage.getItem("ams.attributes"));
```

### Lesson Learned

Always serialize with `JSON.stringify()` and deserialize with `JSON.parse()`.

---

# Bug 4 – Array Mutation

### Category

JavaScript

### Problem

Changing an array inside a function unexpectedly changes the original array.

### Buggy Code

```javascript
function update(list) {
    list.push("New");
}

update(attributes);
```

### Result

The original array was modified.

### Root Cause

Arrays are passed by reference.

### Fix

```javascript
const copy = structuredClone(attributes);

copy.push("New");
```

### Alternative

```javascript
const copy = [...attributes];
```

> Spread performs only a shallow copy.

### Lesson Learned

Use `structuredClone()` when nested objects are present.

---

# Bug 5 – Event Listener Memory Leak

### Category

Events

### Problem

Opening and closing a modal repeatedly created duplicate listeners.

### Buggy Code

```javascript
document.addEventListener("keydown", closeModal);
```

Each modal opening added another listener.

### Result

Pressing Escape triggered the function multiple times.

### Fix

```javascript
const controller = new AbortController();

document.addEventListener(
    "keydown",
    closeModal,
    {
        signal: controller.signal
    }
);

controller.abort();
```

### Lesson Learned

AbortController removes every listener attached with the same signal.

---

# Bug 6 – Using `innerHTML` for Dynamic Content

### Category

DOM / Security

### Problem

Rendering user data using `innerHTML`.

### Buggy Code

```javascript
tbody.innerHTML += `
<tr>
<td>${attribute.attributeName}</td>
</tr>
`;
```

### Risk

A malicious user could inject HTML or JavaScript (XSS).

### Fix

```javascript
const td = document.createElement("td");
td.textContent = attribute.attributeName;
```

### Lesson Learned

Use `createElement()` and `textContent` for dynamic user input.

---

# Bug 7 – Debounce Not Working

### Category

Performance

### Problem

Every keypress executed a search immediately.

### Result

20 keystrokes created 20 search requests.

### Root Cause

Previous timeout was never cleared.

### Fix

```javascript
let timer;

function debounce(fn, delay) {

    clearTimeout(timer);

    timer = setTimeout(fn, delay);

}
```

### Lesson Learned

Debouncing improves responsiveness and prevents unnecessary work.

---

# Bug 8 – Stale Search Results

### Category

Async JavaScript

### Problem

Older searches sometimes appeared after newer searches.

### Cause

Previous requests completed after later ones.

### Fix

```javascript
controller.abort();
controller = new AbortController();
```

Ignore

```javascript
AbortError
```

inside the catch block.

### Lesson Learned

Debounce reduces requests, but AbortController prevents stale responses.

---

# Bug 9 – Fetch 404 Not Entering Catch

### Category

Fetch API

### Problem

Renamed

```
companies.json
```

to

```
companies.json.broken
```

### Observation

`catch()` never executed.

### Root Cause

`fetch()` resolves normally for HTTP 404 responses.

### Fix

```javascript
const response = await fetch(url);

if (!response.ok) {
    throw new Error("Failed to load");
}
```

### Lesson Learned

Always check `response.ok`.

---

# Bug 10 – Pagination Not Resetting

### Category

UI Logic

### Problem

After filtering, Page 4 remained selected.

### Result

The table appeared empty despite matching records.

### Fix

```javascript
state.page = 1;
render();
```

whenever filters change.

### Lesson Learned

Filtering should always reset pagination.

---

# Bug 11 – Dependent Dropdown Not Refreshing

### Category

Forms

### Problem

Changing Business Unit left old locations selected.

### Result

Invalid Business Unit and Location combinations.

### Fix

```javascript
locationSelect.value = "";

loadLocations(selectedBusinessUnit);
```

Disable the Location dropdown until a Business Unit is selected.

### Lesson Learned

Dependent dropdowns must always reset child selections.

---

# Bug 12 – Validation Summary Not Receiving Focus

### Category

Accessibility

### Problem

After clicking Submit, validation errors appeared but keyboard users stayed on the submit button.

### Impact

Users could not immediately identify the errors.

### Fix

```javascript
summary.focus();
```

after rendering the validation summary.

### Lesson Learned

Focus management improves accessibility and follows WCAG recommendations.

---

# Debugging Using Chrome DevTools (Task 18)

### Breakpoint Used

Breakpoint placed inside the `save()` function in **Sources** panel.

### Observations

1. **Step Over** executed one line at a time, making it easy to identify where data changed.
2. **Step Into** allowed inspection of helper functions like validation and storage methods.
3. The **Scope** panel displayed local variables, closure variables, and object values without adding multiple `console.log()` statements.
4. The **Call Stack** clearly showed the sequence:

   * Submit Button
   * Form Submit Handler
   * Validation
   * Save Function
   * Storage Module

### What I Learned

* Breakpoints reveal the exact execution flow without modifying the code.
* The Scope panel makes it easy to inspect variable values at every step.
* The Call Stack helps identify which function invoked the current one, making debugging much easier than relying only on `console.log()`.

---

# Screenshots to Attach

Add the following screenshots before submission:

* Console – Bug 1 (`var` closure)
* Console – Bug 2 (`this` binding)
* Console – Bug 3 (`JSON.parse`)
* Sources – Breakpoint in `save()`
* Sources – Call Stack
* Sources – Scope Panel
* Network – Failed `companies.json` request (404)
* Console – AbortError ignored correctly
