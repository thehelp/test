// # Gruntfile
// Automation for the project.

'use strict';

var _ = require('lodash');
var GruntConfig = require('thehelp-project').GruntConfig;

var optimize = function(grunt, options) {
  var requirejsMin = _.cloneDeep(options);
  requirejsMin.out = 'dist/requirejs/thehelp-test.min.js';
  requirejsMin.paths.winston = 'empty:';
  requirejsMin.paths.util = 'empty:';
  grunt.config('requirejs.requirejs-min.options', requirejsMin);

  var requirejs = _.cloneDeep(requirejsMin);
  requirejs.optimize = 'none';
  requirejs.out = 'dist/requirejs/thehelp-test.js';
  grunt.config('requirejs.requirejs.options', requirejs);
};

var optimizeStandalone = function(grunt, options) {
  var standaloneMin = _.cloneDeep(options);
  standaloneMin.almond = true;
  standaloneMin.out = 'dist/standalone/thehelp-test.min.js';
  grunt.config('requirejs.standalone-min.options', standaloneMin);

  var standalone = _.cloneDeep(standaloneMin);
  standalone.optimize = 'none';
  standalone.out = 'dist/standalone/thehelp-test.js';
  grunt.config('requirejs.standalone.options', standalone);
};

var optimizeCoverage = function(grunt, options) {
  var coverageMin = _.cloneDeep(options);
  coverageMin.out = 'dist/requirejs/thehelp-test-coverage.min.js';
  coverageMin.name = 'thehelp-test-coverage';
  coverageMin.paths.winston = 'empty:';
  coverageMin.paths.util = 'empty:';
  coverageMin.paths.mocha = 'empty:';
  grunt.config('requirejs.coverage-min.options', coverageMin);

  var coverage = _.cloneDeep(coverageMin);
  coverage.optimize = 'none';
  coverage.out = 'dist/requirejs/thehelp-test-coverage.js';
  grunt.config('requirejs.coverage.options', coverage);
};

module.exports = function(grunt) {
  var config = new GruntConfig(grunt);

  config.standardSetup();

  grunt.loadNpmTasks('grunt-requirejs');
  var options = require('./src/client/config');
  optimize(grunt, options);
  optimizeStandalone(grunt, options);
  optimizeCoverage(grunt, options);

  grunt.registerTask('dist', ['requirejs']);
  grunt.registerTask('default', ['test', 'staticanalysis', 'doc', 'dist']);
};
