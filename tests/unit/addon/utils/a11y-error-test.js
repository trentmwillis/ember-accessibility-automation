/* global sinon */
import Ember from 'ember';
import { module, test } from 'qunit';
import A11yError from 'ember-accessibility-automation/utils/a11y-error';

module('Unit | Addon | Utils | a11y-error');

/* A11yError.constructor */

test('A11yError accepts a "message" and "element" in the constructor', function(assert) {
  assert.expect(2);

  let element = document.createElement('p');
  let error = new A11yError('some message', element);

  assert.equal(error.message, 'some message');
  assert.equal(error.element, element);
});

/* A11yError.prototype.toString */

test('toString returns the error\'s message prepended by "ACCESSIBILITY ERROR"', function(assert) {
  let error = new A11yError('some message');
  assert.equal(error.toString(), 'ACCESSIBILITY ERROR: some message');
});

/* A11yError.throw */

test('throw throws an error when in testing mode', function(assert) {
  assert.throws(() => { throw new A11yError('test'); }, /ACCESSIBILITY ERROR: test/);
});

test('throw logs an error when in non-testing mode', function(assert) {
  let loggerSpy =  sinon.spy(Ember.Logger, 'error');
  Ember.testing = false;

  A11yError.throw('some message', {});
  assert.ok(loggerSpy.calledOnce);

  Ember.testing = true;
  loggerSpy.restore();
});
