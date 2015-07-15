/* global sinon */
import Ember from 'ember';
import actionAudit from 'ember-accessibility-automation/utils/action-audit';
import A11yComponent from 'dummy/instance-initializers/a11y-component';
import AutoRunComponent from 'dummy/instance-initializers/auto-run-component';
import { module, test } from 'qunit';
import hbs from 'htmlbars-inline-precompile';
import clickElement from '../../../helpers/click-element';

let application;
let sandbox;

module('Unit | App | Instance Initializers | a11y-component', {
  beforeEach() {
    Ember.run(() => {
      application = Ember.Application.create({
        rootElement: '#ember-testing'
      });
      application.deferReadiness();
    });

    sandbox = sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
  }
});

/* Basic Behavior */

test('initializer should not re-open Ember.Component more than once', function(assert) {
  // Depending on if the initializer has already ran, we will either expect the
  // reopen method to be called once or not at all.
  let assertMethod = Ember.Component.prototype._setupA11yAudits ? 'notCalled' : 'calledOnce';
  let reopenSpy = sandbox.spy(Ember.Component, 'reopen');

  A11yComponent.initialize(application);
  A11yComponent.initialize(application);

  assert.ok(reopenSpy[assertMethod]);
});

test('action-audit is registered by default', function(assert) {
  AutoRunComponent.initialize(application);
  A11yComponent.initialize(application);

  let component = Ember.Component.create({});

  assert.notEqual(component.get('automatedCallbacks').indexOf(actionAudit), -1);

  Ember.run(() => component.destroy());
});

/* Ember.Component.prototype.highlightIssue */

test('highlightIssue accepts a selector to look up in the element\'s scope and pass in to highlightElement', function(assert) {
  AutoRunComponent.initialize(application);
  A11yComponent.initialize(application);

  let component = Ember.Component.create({
    layout: hbs`<p class="test"></p>`
  });
  Ember.run(() => component.appendTo('#ember-testing'));

  let highlight = component.highlightIssue('.test');
  assert.equal(document.querySelectorAll('.a11y-highlight-issue').length, 1);

  clickElement(highlight);

  Ember.run(() => component.destroy());
});

test('highlightIssue accepts an HTMLElement to pass in to highlightElement', function(assert) {
  AutoRunComponent.initialize(application);
  A11yComponent.initialize(application);

  let component = Ember.Component.create({
    layout: hbs`<p class="test"></p>`
  });
  Ember.run(() => component.appendTo('#ember-testing'));

  let highlight = component.highlightIssue(component.element.querySelector('.test'));
  assert.equal(document.querySelectorAll('.a11y-highlight-issue').length, 1);

  clickElement(highlight);

  Ember.run(() => component.destroy());
});
