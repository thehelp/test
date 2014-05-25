// # Gruntfile
// Automation for the project.

'use strict';

var GruntConfig = require('thehelp-project').GruntConfig;

module.exports = function(grunt) {
  var config = new GruntConfig(grunt);

  config.standardSetup();

  // ## dist
  var options = require('./src/client/config');

  config.registerOptimize({
    name: 'thehelp-test',
    empty: ['winston', 'util'],
    config: options
  });
  config.registerOptimize({
    name: 'thehelp-test-coverage',
    empty: ['thehelp-test', 'winston', 'util', 'mocha'],
    config: options
  });

  config.registerCopy({
    'dist/mocha.css': 'lib/vendor/mocha.css',
    'dist/thehelp-test-harness.js': 'src/client/harness.js',
    'dist/grunt-mocha-bridge.js':
      'node_modules/thehelp-project/node_modules/grunt-mocha/phantomjs/bridge.js'
  });

  grunt.registerTask('dist', ['requirejs', 'copy']);

  // ## setup
  config.registerInstall();
  config.registerCopyFromBower();
  grunt.registerTask('setup', ['shell:npm-install', 'shell:bower-install',
    'copy:from-bower']);

  // ## client-test
  config.registerMocha([
    'http://localhost:3001/test/integration/dev.html',
    'http://localhost:3001/test/integration/dist.html'
  ]);

  grunt.registerTask('client-test', ['connect:test', 'mocha']);

  // ## default
  grunt.registerTask(
    'default',
    ['test', 'staticanalysis', 'style', 'doc', 'dist', 'client-test']
  );
};
