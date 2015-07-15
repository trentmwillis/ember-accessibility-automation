import actionAudit from 'ember-accessibility-automation/utils/action-audit';

/**
 * Variable to ensure that the initializer is only ran once. Though in this
 * particular case, running more than once shouldn't cause side-effects.
 * @type {Boolean}
 */
let hasRan = false;

export function initialize(application) {
  if (hasRan) { return; }

  Ember.Component.reopen({
    /**
     * Highlights an issue in the component on a specified element (via either
     * the element directly or a selector). It can also accept a message and
     * class name to apply to the highlighted element.
     * @param {HTMLElement|String} el
     * @param {String} [message]
     * @param {String} [className]
     */
    highlightIssue(el, message, className) {
      let element = typeof el === 'string' ? this.element.querySelector(el) : el;
      let box = element.getClientBoundingRect();

      let highlight = document.createElement('div');

      if (message) {

      }

      element.classList.add('a11y-issue');
      if (className) {
        element.classList.add(className);
      }
    },

    /**
     * Registers the auditing functions as callbacks to be auto-run.
     * @private
     * @return {Void}
     */
    _setupA11yAudits: Ember.on('init', function() {
      this.addCallback(actionAudit);
    })
  });

  hasRan = true;
}

export default {
  name: 'axe-component',
  initialize
};
