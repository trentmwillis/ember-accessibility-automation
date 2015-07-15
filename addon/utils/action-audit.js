import Ember from 'ember';
import A11yError from './a11y-error';
import elementMatches from '../polyfills/element-matches';

const { Logger } = Ember;

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
 * is highlighted and an error is logged.
 * @return {Void}
 */
export default function actionAudit() {
  let actionElements = this.element.querySelectorAll('[data-ember-action]');

  for (let i = 0, l = actionElements.length; i < l; i++) {
    let el = actionElements[i];
    if (!elementMatches(el, FOCUS_SELECTOR)) {
      let hasInnerHTML = !!el.innerHTML;
      let elementTag = hasInnerHTML ? el.outerHTML.substr(0, el.outerHTML.indexOf(el.innerHTML)) : el.outerHTML;

      this.highlightIssue(el, 'Non-focusable action', 'action-audit-issue');

      Logger.error(new A11yError(`The element ${elementTag} has an action bound to it, but is not focusable.`, el));
    }
  }
}
