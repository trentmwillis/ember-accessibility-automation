/* global a11y */
import Ember from 'ember';
import { module, test } from 'qunit';
import sinon from 'sinon';
import startApp from '../../helpers/start-app';
import A11yError from 'ember-accessibility-automation/utils/a11y-error';
import clickElement from '../../helpers/click-element';

let sandbox;

module('Unit | test-body-footer | action-audit', {
  beforeEach: function() {
    sandbox = sinon.sandbox.create();
  },

  afterEach: function() {
    sandbox.restore();
  }
});

/* actionAudit */

test('actionAudit is registered by default and runs on the ember testing container', function(assert) {
  let loggingSpy = sandbox.stub(A11yError, 'throw');

  a11y.turnAuditsOn();
  let application = startApp();

  visit('/failing-action');
  andThen(() => {
    assert.ok(loggingSpy.calledOnce, 'Action audit called to log an offending element');

    // Dismiss the error highlight
    clickElement(document.querySelector('.a11y-highlight-issue'));

    a11y.turnAuditsOff();
    Ember.run(application, 'destroy');
  });
});
