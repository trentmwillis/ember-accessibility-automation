/* global a11y */
import Ember from 'ember';
import { module, test } from 'qunit';
import sinon from 'sinon';
import startApp from '../../helpers/start-app';

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
  let loggingSpy = sandbox.spy(Ember.Logger, 'error');

  a11y.turnAuditsOn();
  let application = startApp();

  visit('/');
  andThen(() => {
    assert.ok(loggingSpy.calledOnce, 'Action audit called to log an offending element');

    a11y.turnAuditsOff();
    Ember.run(application, 'destroy');
  });
});
