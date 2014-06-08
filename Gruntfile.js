// # Gruntfile
// Automation for the project.

'use strict';

var GruntConfig = require('thehelp-project').GruntConfig;
require('thehelp-client-project').mixin(GruntConfig);

var internals = {};

module.exports = function(grunt) {
  var config = new GruntConfig(grunt);

  config.standardSetup();

  internals.setupSetup(config, grunt);
  internals.setupDist(config, grunt);
  internals.setupClientTest(config, grunt);

  grunt.registerTask('default',
    ['setup', 'test', 'staticanalysis', 'style', 'doc', 'dist', 'client-test']
  );
};

internals.setupSetup = function(config, grunt) {
  config.registerCopyFromBower();
  grunt.registerTask('setup', ['copy:from-bower']);
};

internals.setupDist = function(config, grunt) {
  var options = require('./src/client/config');
  config.registerOptimizeLibrary({
    name: 'thehelp-test',
    empty: ['winston', 'util'],
    config: options
  });
  config.registerOptimizeLibrary({
    name: 'thehelp-test-coverage',
    empty: ['thehelp-test', 'winston', 'util', 'mocha'],
    config: options
  });

  config.registerCopy({
    files: {
      'dist/mocha.css': 'lib/vendor/mocha.css',
      'dist/thehelp-test-harness.js': 'src/client/harness.js',
      'dist/grunt-mocha-bridge.js':
        'node_modules/thehelp-client-project/node_modules/grunt-mocha/phantomjs/bridge.js'
    }
  });

  grunt.registerTask('dist', ['requirejs', 'copy:default']);
};

internals.setupClientTest = function(config, grunt) {
  config.registerMocha({
    urls: [
      'http://localhost:3001/test/integration/dev.html',
      'http://localhost:3001/test/integration/dist.html'
    ]
  });
  grunt.registerTask('client-test', ['connect:test', 'mocha']);
};
