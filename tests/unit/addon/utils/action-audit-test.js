import { module, test } from 'qunit';
import actionAudit from 'ember-accessibility-automation/utils/action-audit';

module('Unit | Addon | Utils | a11y-error');

/* actionAudit */

test('actionAudit throws an error on a failing element', function(assert) {
  let element = document.createElement('div');
  element.innerHTML = '<p data-ember-action="52"></p>';
  document.getElementById('ember-testing').appendChild(element);

  let context = { element };

  assert.throws(() => actionAudit.call(context), /The element <p data-ember-action="52"><\/p> has an action bound to it, but is not focusable./);

  element.parentElement.removeChild(element);
});

test('actionAudit throws an error on a failing element with prior passing elements', function(assert) {
  let element = document.createElement('div');
  element.innerHTML = '<button data-ember-action="42"></button><p data-ember-action="52"></p>';
  document.getElementById('ember-testing').appendChild(element);

  let context = { element };

  assert.throws(() => actionAudit.call(context), /The element <p data-ember-action="52"><\/p> has an action bound to it, but is not focusable./);

  element.parentElement.removeChild(element);
});

test('actionAudit returns true with all passing elements', function(assert) {
  let element = document.createElement('div');
  element.innerHTML = '<button data-ember-action="52"></button>';
  document.getElementById('ember-testing').appendChild(element);

  let context = { element };

  assert.ok(actionAudit.call(context));

  element.parentElement.removeChild(element);
});
