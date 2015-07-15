import { module, test } from 'qunit';
import sinon from 'sinon';
import highlightElement from 'ember-accessibility-automation/utils/highlight-element';
import clickElement from '../../../helpers/click-element';

let sandbox;

module('Unit | Addon | Utils | highlight-element', {
  beforeEach() {
    sandbox = sinon.sandbox.create();
  },

  afterEach() {
    sandbox.restore();
  }
});

/* highlightElement */

test('highlightElement creates an element directly above the highlighted element that is removed on click', function(assert) {
  let element = document.createElement('div');
  element.innerHTML = '<p style="height: 40px; width: 30px;"></p>';
  document.getElementById('ember-testing').appendChild(element);

  let highlight = highlightElement(element);
  assert.deepEqual(highlight.getBoundingClientRect(), element.getBoundingClientRect());

  clickElement(highlight);

  element.parentElement.removeChild(element);
});

test('highlightElement creates an element with a custom message displayed', function(assert) {
  assert.expect(2);

  let element = document.createElement('div');
  element.innerHTML = '<p style="height: 40px; width: 30px;"></p>';
  document.getElementById('ember-testing').appendChild(element);

  let highlight = highlightElement(element, 'custom message');
  assert.deepEqual(highlight.getBoundingClientRect(), element.getBoundingClientRect());
  assert.equal(highlight.textContent, 'custom message');

  clickElement(highlight);

  element.parentElement.removeChild(element);
});

test('highlightElement applies additional classes to the original element', function(assert) {
  assert.expect(3);

  let element = document.createElement('div');
  element.innerHTML = '<p style="height: 40px; width: 30px;"></p>';
  document.getElementById('ember-testing').appendChild(element);

  let highlight = highlightElement(element, 'some message', 'custom-class');
  assert.deepEqual(highlight.getBoundingClientRect(), element.getBoundingClientRect());
  assert.ok(element.classList.contains('a11y-issue'));
  assert.ok(element.classList.contains('custom-class'));

  clickElement(highlight);

  element.parentElement.removeChild(element);
});
