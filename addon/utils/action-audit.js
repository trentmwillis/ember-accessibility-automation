import A11yError from './a11y-error';
import highlightElement from './highlight-element';
import elementMatches from '../polyfills/element-matches';

// Selector for all focusable elements
const FOCUS_SELECTOR = [
  'input:not([type=hidden]):not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'button:not([disabled])',
  'a[href]',
  'area[href]',
  'iframe',
  '[tabindex]:not([tabindex="-1"])'
].join(',');


/**
 * Checks all element's within the context's "element" property to ensure they
 * are focusable if they have an action bound. If an action is not focusable, it
 * is highlighted and an error is logged/thrown.
 * @return {Void}
 */
export default function actionAudit() {
  let actionElements = this.element.querySelectorAll('[data-ember-action]');

  for (let i = 0, l = actionElements.length; i < l; i++) {
    let el = actionElements[i];
    if (!elementMatches(el, FOCUS_SELECTOR)) {
      let hasInnerHTML = !!el.innerHTML;
      let elementTag = hasInnerHTML ? el.outerHTML.substr(0, el.outerHTML.indexOf(el.innerHTML)) : el.outerHTML;

      // If we're auditing a component, use its method instead of the util
      if (this.highlightIssue) {
        this.highlightIssue(el, 'Non-focusable action', 'action-audit-issue');
      } else {
        highlightElement(el, 'Non-focusable action', 'action-audit-issue');
      }

      A11yError.throw(`The element ${elementTag} has an action bound to it, but is not focusable.`, el);
    }
  }
}
