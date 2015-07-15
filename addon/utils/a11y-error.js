import Ember from 'ember';

/**
 * Constructor for an accessibility error message.
 * @param {String} message
 * @param {HTMLElement} element
 * @return {Void}
 */
function A11yError(message, element) {
  this.message = message;
  this.element = element;
}

A11yError.prototype = Object.create(Error.prototype);

A11yError.prototype.constructor = A11yError;

A11yError.prototype.toString = function() {
  return `ACCESSIBILITY ERROR: ${this.message}`;
};

/**
 * "Throws" an accessibility error. It will log an error to the console if in
 * development mode and throw a hard error if in testing (to cause a failure).
 * @public
 * @param {String} message
 * @param {HTMLElement} element
 * @return {Void}
 */
A11yError.throw = function(message, element) {
  let error = new A11yError(message, element);

  if (Ember.testing) {
    throw error;
  } else {
    Ember.Logger.error(error);
  }
};

export default A11yError;
