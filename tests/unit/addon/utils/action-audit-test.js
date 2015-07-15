import Ember from 'ember';
import { module, test } from 'qunit';
import sinon from 'sinon';
import actionAudit from 'ember-accessibility-automation/utils/action-audit';

let sandbox;

module('Unit | Addon | Utils | action-audit', {
  beforeEach() {
    sandbox = sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
  }
});

/* actionAudit */

test('actionAudit throws an error on a failing element', function(assert) {
  assert.expect(2);

  let highlightIssue = sandbox.spy();
  let element = document.createElement('div');
  element.innerHTML = '<p data-ember-action="52"></p>';
  document.getElementById('ember-testing').appendChild(element);

  let context = { element, highlightIssue };

  assert.throws(() => actionAudit.call(context), /ACCESSIBILITY ERROR/);
  assert.ok(highlightIssue.calledOnce);

  element.parentElement.removeChild(element);
});

test('actionAudit throws an error on a failing element with prior passing elements', function(assert) {
  assert.expect(2);

  let highlightIssue = sandbox.spy();
  let element = document.createElement('div');
  element.innerHTML = '<button data-ember-action="42"></button><p data-ember-action="52"></p>';
  document.getElementById('ember-testing').appendChild(element);

  let context = { element, highlightIssue };

  assert.throws(() => actionAudit.call(context), /ACCESSIBILITY ERROR/);
  assert.ok(highlightIssue.calledOnce);

  element.parentElement.removeChild(element);
});

test('actionAudit returns true with all passing elements', function(assert) {
  assert.expect(2);

  let logger = sandbox.spy(Ember.Logger, 'error');
  let highlightIssue = sandbox.spy();
  let element = document.createElement('div');
  element.innerHTML = '<button data-ember-action="52"></button>';
  document.getElementById('ember-testing').appendChild(element);

  let context = { element, highlightIssue };

  actionAudit.call(context);

  assert.ok(highlightIssue.notCalled);
  assert.ok(logger.notCalled);

  element.parentElement.removeChild(element);
});
