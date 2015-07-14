/**
 * Constructor for an accessibility error message.
 * @param {String} message
 * @return {Void}
 */
function A11yError(message) {
  this.message = message;
}

A11yError.prototype = Object.create(Error.prototype);

A11yError.prototype.constructor = A11yError;

A11yError.prototype.toString = function() {
  return `ACCESSIBILITY ERROR: ${this.message}`;
};

export default A11yError;
