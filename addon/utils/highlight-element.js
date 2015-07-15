const ISSUE_OVERLAY_CLASS = 'a11y-highlight-issue';
const ISSUE_CLASS = 'a11y-issue';

/**
 * Creates an element that acts a "highlight" for a given element (essentially
 * just an overlay).
 * @private
 * @param {HTMLElement} element
 * @return {HTMLElement}
 */
function _createHighlightElement(element) {
  let highlight = document.createElement('div');

  let box = element.getBoundingClientRect();

  highlight.classList.add(ISSUE_OVERLAY_CLASS);

  let style = highlight.style;
  style.top = `${box.top}px`;
  style.left = `${box.left}px`;
  style.height = `${box.height}px`;
  style.width = `${box.width}px`;

  return highlight;
}

/**
 * Adds a message to the highlight overlay.
 * TODO: Show message only on hover?
 * @private
 * @param {String} message
 * @return {Void}
 */
function _addMessageToHighlight(highlight, message) {
  if (!message) {
    return;
  }

  highlight.textContent = message;
}

/**
 * Adds additional class names to an element, primarily to ensure that all
 * elements with accessibility issues are identified.
 * @private
 * @param {HTMLElement} element
 * @param {String} className
 * @return {Void}
 */
function _addClassNameToElement(element, className) {
  element.classList.add(ISSUE_CLASS);

  if (className) {
    element.classList.add(className);
  }
}

/**
 * Appends the highlight to the DOM and adds a click handler to remove it when
 * no longer needed.
 * @private
 * @param {HTMLElement} highlight
 * @return {Void}
 */
function _addHighlightToDOM(highlight) {
  document.body.appendChild(highlight);

  /**
   * Callback function that removes the highlight from the DOM and removes it's
   * associated event handler.
   */
  function _onClick() {
    highlight.parentElement.removeChild(highlight);
    highlight.removeEventListener('click', _onClick);
  }

  highlight.addEventListener('click', _onClick);
}

/**
 * Creates an overlay that highlights a specified element. It optionally allows
 * a message to be displayed and a class name to be appended to the highlighted
 * element.
 * @public
 * @param {HTMLElement} element
 * @param {String} message
 * @param {String} className
 * @return {Void}
 */
export default function highlightElement(element, message, className) {
  let highlight = _createHighlightElement(element);
  _addMessageToHighlight(highlight, message);
  _addClassNameToElement(element, className);
  _addHighlightToDOM(highlight, element);
}
