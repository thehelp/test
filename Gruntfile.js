// # Gruntfile
// Automation for the project.

'use strict';

var _ = require('lodash');
var GruntConfig = require('thehelp-project').GruntConfig;

var optimize = function(grunt, name, empty, standalone, options) {
  var requirejsMin = _.cloneDeep(options);
  requirejsMin.name = name;
  requirejsMin.out = 'dist/' + name + '.min.js';
  if (empty) {
    _.forEach(empty, function(module) {
      requirejsMin.paths[module] = 'empty:';
    });
  }
  grunt.config('requirejs.' + name + '-requirejs-min.options', requirejsMin);

  var requirejs = _.cloneDeep(requirejsMin);
  requirejs.optimize = 'none';
  requirejs.out = 'dist/' + name + '.js';
  grunt.config('requirejs.' + name + '-requirejs.options', requirejs);

  if (standalone) {
    var standaloneMin = _.cloneDeep(options);
    standaloneMin.name = name;
    standaloneMin.almond = true;
    standaloneMin.out = 'dist/standalone/' + name + '.min.js';
    grunt.config('requirejs.' + name + '-standalone-min.options', standaloneMin);

    var standalone = _.cloneDeep(standaloneMin);
    standalone.optimize = 'none';
    standalone.out = 'dist/standalone/' + name + '.js';
    grunt.config('requirejs.' + name + '-standalone.options', standalone);
  }
};

module.exports = function(grunt) {
  var config = new GruntConfig(grunt);

  config.standardSetup();

  grunt.loadNpmTasks('grunt-requirejs');
  var options = require('./src/client/config');
  optimize(grunt, 'thehelp-test', ['winston', 'util'], true, options);
  optimize(grunt, 'thehelp-test-coverage', ['winston', 'util', 'mocha'], false, options);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    mocha: {
      files: {
        'dist/mocha.css': ['lib/vendor/mocha.css']
      }
    },
    harness: {
      files: {
        'dist/harness.js': ['src/client/harness.js']
      }
    }

  });

  grunt.registerTask('dist', ['requirejs', 'copy']);
  grunt.registerTask('default', ['test', 'staticanalysis', 'doc', 'dist']);
};
