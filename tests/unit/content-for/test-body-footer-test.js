/* global a11y */
import Ember from 'ember';
import { module, test } from 'qunit';
import sinon from 'sinon';
import startApp from '../../helpers/start-app';

let sandbox;

module('Unit | test-body-footer', {
  beforeEach: function() {
    sandbox = sinon.sandbox.create();
  },

  afterEach: function() {
    sandbox.restore();
  }
});

/* a11y.registerAudit */

test('registerAudit registers an audit function to be run after rendering', function(assert) {
  let audit = sandbox.spy();

  a11y.registerAudit(audit);

  // To test that it was registered, we turn automation on and start up the app
  a11y.turnAuditsOn();
  let application = startApp();

  visit('/');
  andThen(() => {
    assert.ok(audit.calledOnce, 'audit was called on app render');

    a11y.turnAuditsOff();
    Ember.run(application, 'destroy');
  });
});

test('registerAudit registers multiple audit functions to be run after rendering', function(assert) {
  assert.expect(2);

  let audit1 = sandbox.spy();
  let audit2 = sandbox.spy();

  a11y.registerAudit(audit1);
  a11y.registerAudit(audit2);

  // To test that it was registered, we turn automation on and start up the app
  a11y.turnAuditsOn();
  let application = startApp();

  visit('/');
  andThen(() => {
    assert.ok(audit1.calledOnce, 'first audit was called on app render');
    assert.ok(audit2.calledOnce, 'second audit was called on app render');

    a11y.turnAuditsOff();
    Ember.run(application, 'destroy');
  });
});

test('registerAudit throws an error if audit is not a function', function(assert) {
  assert.throws(() => a11y.registerAudit('error'), /Error: audits must be of type function, not of type string/);
});

/* a11y.turnAuditsOn */

test('turnAuditsOn adjusts the display of the testing container and allows audits to run', function(assert) {
  assert.expect(4);

  let audit = sandbox.spy();

  a11y.registerAudit(audit);
  a11y.turnAuditsOn();

  let application = startApp();

  visit('/');
  andThen(() => {
    assert.ok(document.body.classList.contains('a11y-enabled'), 'body has correct modifying class');
    assert.ok(audit.calledOnce, 'audit was called on app render');
  });

  visit('/sub-route');
  andThen(() => {
    assert.ok(document.body.classList.contains('a11y-enabled'), 'body still has correct modifying class');
    assert.ok(audit.calledTwice, 'audit was called on app re-render');

    a11y.turnAuditsOff();
    Ember.run(application, 'destroy');
  });
});

/* a11y.turnAuditsOff */

test('turnAuditsOff resets the display of the testing container and disables audits from running', function(assert) {
  assert.expect(4);

  let audit = sandbox.spy();

  a11y.registerAudit(audit);
  a11y.turnAuditsOn();

  let application = startApp();

  visit('/');
  andThen(() => {
    assert.ok(document.body.classList.contains('a11y-enabled'), 'body has correct modifying class while on');
    assert.ok(audit.calledOnce, 'audit was called on app render');

    a11y.turnAuditsOff();
  });

  visit('/sub-route');
  andThen(() => {
    assert.notOk(document.body.classList.contains('a11y-enabled'), 'body does not have modifying class while off');
    assert.ok(audit.calledOnce, 'audit was not called on render after turning off');

    Ember.run(application, 'destroy');
  });
});
