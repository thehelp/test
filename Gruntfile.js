// # Gruntfile
// Automation for the project.

'use strict';

var _ = require('lodash');
var GruntConfig = require('thehelp-project').GruntConfig;

var optimize = function(options, grunt, name, empty, standalone) {
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
  optimize(options, grunt, 'thehelp-test', ['winston', 'util']);
  optimize(options, grunt, 'thehelp-test-coverage', ['thehelp-test', 'winston', 'util', 'mocha']);

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.config('copy', {
    dist: {
      files: {
        'dist/mocha.css': ['lib/vendor/mocha.css'],
        'dist/harness.js': ['src/client/harness.js'],
        'dist/grunt-mocha-bridge.js': ['node_modules/grunt-mocha/phantomjs/bridge.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.config('connect', {
    test: {
      options: {
        base: '.',
        port: 3001,
      }
    },
    keepalive: {
      options: {
        base: '.',
        port: 3000,
        keepalive: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha');
  grunt.config('mocha', {
    requirejs: {
      options: {
        urls: [
          'http://localhost:3001/test/integration/requirejs.html'
        ],
        run: false,
        reporter: 'Spec'
      }
    }
  });

  grunt.registerTask('client-test', ['connect:test', 'mocha']);

  grunt.registerTask('dist', ['requirejs', 'copy']);
  grunt.registerTask('default', ['test', 'staticanalysis', 'doc', 'dist']);
};
