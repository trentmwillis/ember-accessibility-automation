/* jshint node: true */
'use strict';

var path = require('path');
var fs = require('fs');

// The different types/area for which we have content for.
var ALLOWED_CONTENT_FOR = [
  'head-footer',
  'test-head-footer',
  'test-body-footer'
];

module.exports = {
  name: 'ember-accessibility-automation',

  /**
   * Adds content for the areas specified in the array above. It appends the
   * contents of the files with the same name to the content-for block.
   * @override
   */
  contentFor: function(type) {
    if (~ALLOWED_CONTENT_FOR.indexOf(type)) {
      return fs.readFileSync(path.join(__dirname, 'content-for', type + '.html'));
    }
  }
};
