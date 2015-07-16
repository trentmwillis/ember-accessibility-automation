# Ember Accessibility Automation

[![Build Status](https://travis-ci.org/trentmwillis/ember-accessibility-automation.svg?branch=master)](https://travis-ci.org/trentmwillis/ember-accessibility-automation)

This addon aims to provide an easy-to-use scaffolding for automating
accessibility in Ember. The interface of this addon strives to be Ember-specific
but accessibility framework agnostic. This means you can easily use it with your
auditing library of choice, such as
[Deque Labs'](https://github.com/dequelabs) [axe-core](https://github.com/dequelabs/axe-core) or
[Chrome's Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools).

## Testing

The integration with testing relies on [ember-automation](https://github.com/trentmwillis/ember-automation).
This allows easy to use hooks into the render-cycle of your application during
acceptance tests. This means that you can be assured that every state of your
application meets your auditing guidelines.

### Implementing An Audit

To implement an accessibility audit, simply define it as a function and register
it like so:

```javascript
function a11yAudit() {
  // check for accessibility violations
}

a11y.registerAudit(a11yAudit);
```

This sets the audit up to run after render during acceptance tests (or any time
you turn audits on) and allows you to break on them during any given cycle (see
below for more info).

### Controlling When Audits Run

By default, audits run during every render of your acceptance tests. However,
not all developments cycles are the same, so we give you easy hooks to control
when the audits run.

To turn audits on (e.g., during unit tests), simply use the following at any
point after the test module starts:

```javascript
a11y.turnAuditsOn();
```

To turn audits off (e.g., during excused acceptance tests), simply use:

```javascript
a11y.turnAuditsOff()
```

## Development

The integration with development also relies on ember-automation. If you want to
add additional audits to your development workflow, simply `addCallback`. See
the [full API here](https://github.com/trentmwillis/ember-automation#development-api).

### Highlighting Accessibility Issues: `highlightIssue`

The `highlightIssue` method provides a hook for highlighting elements in the DOM
that have accessibility issues associated with them.

The method accepts up to three arguments:

1. The element to highlight (either as an HTMLElement or a selector string),
2. An optional message to display inside the highlighted area,
3. A class to apply to the highlighted element (for additional styling or
selecting).

It also returns a reference to the highlight in case you need to manipulate it
in some fashion (e.g., getting it's position).

```javascript
component.highlightIssue('.bad-button', 'This button is in accessible', '.inaccessible-button');
```

## Default Audits

By default, Ember Accessibility Automation includes audits that are specific to
accessibility in Ember. See below for more information.

### Action Audit

The action audit helps ensure that all the functionality in your application is
accessible, even to keyboard users. Specifically, the audit checks DOM elements
for Ember Action bindings and checks if they are focusable. If not, an error is
thrown.

[See the implementation of this audit.](https://github.com/trentmwillis/ember-accessibility-automation/blob/master/addon/utils/action-audit.js)

## Accessibility (A11y) Errors

When implementing your own audits, it is often desirable to give feedback when
something is wrong. Enter the `A11yError` class.

The class is a simple extension of the normal `Error` class. It allows you to
pass in both a message and HTMLElement so that console logs can give descriptive
and identifiable information about any errors.

```javascript
let error = new A11yError('This action is unfocusable.', actionElement);
```

It also augments the `toString` method to prepend `ACCESSIBILITY ERROR` at the
beginning of error messages. This allows for easy filtering.

```javascript
throw new A11yError('This action is unfocusable.', actionElement);
// 'ACCESSIBILITY ERROR: This action is unfocusable.'
```

### Throwing Errors

The `A11yError` class also provides a static method for "throwing" new errors.
The difference between this method and using `throw new...` is that it is
environment aware. So if you are in development mode, it will log the error to
your console and bring your app to a halt. If you are in testing mode, however,
it throws a hard error to fail the test.

```javascript
A11yError.throw('This is an error', component.element);
```
