/* jshint node: true */
'use strict';

var path = require('path');
var fs = require('fs');
var Funnel = require('broccoli-funnel');
var VersionChecker = require('ember-cli-version-checker');
var mergeTrees = require('broccoli-merge-trees');

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
  },

  /**
   * Exclude files during a production build or if the version of Ember being
   * used is less than 1.13. The version limit is due to the
   * instance-initializer leveraging the `didRender` hook.
   * @override
   */
  treeForApp: function(tree) {
    var checker = new VersionChecker(this);
    var isProductionBuild = process.env.EMBER_ENV === 'production';
    var isOldEmber = checker.for('ember', 'bower').lt('1.13.0');

    if (isProductionBuild || isOldEmber) {
      tree = new Funnel(tree, {
        exclude: [ /instance-initializers/ ]
      });
    }

    return tree;
  },

  /**
   * Exclude files during a production build. Not excluded from versions, since
   * it doesn't need 1.13 specific features.
   * @override
   */
  treeForAddon: function(tree) {
    var checker = new VersionChecker(this);
    var isProductionBuild = process.env.EMBER_ENV === 'production';

    if (isProductionBuild) {
      tree = new Funnel(tree, {
        exclude: [ /utils/, /polyfills/ ]
      });
    }

    return this._super.treeForAddon.call(this, tree);
  }
};
