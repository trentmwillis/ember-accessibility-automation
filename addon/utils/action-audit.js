import A11yError from './a11y-error';

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
 * are focusable if they have an action bound.
 * @throws {A11yError}
 * @return {Void}
 */
export default function actionAudit() {
  let actionElements = this.element.querySelectorAll('[data-ember-action]');

  for (let i = 0, l = actionElements.length; i < l; i++) {
    let el = actionElements[i];
    if (!el.matches(FOCUS_SELECTOR)) {
      let hasInnerHTML = !!el.innerHTML;
      let elementTag = hasInnerHTML ? el.outerHTML.substr(0, el.outerHTML.indexOf(el.innerHTML)) : el.outerHTML;
      throw new A11yError(`The element ${elementTag} has an action bound to it, but is not focusable.`);
    }
  }

  return true;
}
