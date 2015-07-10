# Ember Accessibility Automation

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
