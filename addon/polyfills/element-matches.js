/**
 * A polyfill for Element.matches based off of the implementation given on MDN:
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
 * @private
 * @param {HTMLElement} element
 * @param {String} selector
 * @return {Boolean}
 */
function _elementMatchesPolyfill(element, selector) {
  var matches = (element.document || element.ownerDocument).querySelectorAll(selector);
  var i = 0;

  while (matches[i] && matches[i] !== element) {
    i++;
  }

  return matches[i] ? true : false;
}


/**
 * A wrapper for Element.matches. Defers to browser implementation if it exists,
 * otherwise, it uses a polyfill.
 * @public
 * @param {HTMLElement} element
 * @param {String} selector
 * @return {Boolean}
 */
export default function elementMatches(element, selector) {
  if (Element.prototype.matches) {
    return element.matches(selector);
  } else {
    return _elementMatchesPolyfill(element, selector);
  }
}
