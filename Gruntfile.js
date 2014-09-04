// # Gruntfile
// Automation for the project.

'use strict';

var GruntConfig = require('thehelp-project').GruntConfig;
require('thehelp-client-project').mixin(GruntConfig);

var internals = {};

module.exports = function(grunt) {
  var config = new GruntConfig(grunt);

  config.standardSetup();

  internals.setupDist(config, grunt);
  internals.setupClientTest(config, grunt);

  var tasks = config.defaultTasks;
  grunt.registerTask('default', tasks.concat(['dist', 'client-test']));
};

internals.setupDist = function(config, grunt) {
  var options = require('./src/client/thehelp-test/config');
  config.registerOptimizeLibrary({
    source: 'thehelp-test',
    targetPath: 'dist',
    empty: ['winston', 'util'],
    config: options
  });
  config.registerOptimizeLibrary({
    source: 'thehelp-test-coverage',
    targetPath: 'dist',
    empty: ['thehelp-test', 'winston', 'util', 'mocha'],
    config: options
  });

  config.registerCopy({
    files: {
      'dist/mocha.css': 'bower_components/mocha/mocha.css',
      'dist/thehelp-test-harness.js': 'src/client/thehelp-test/harness.js',
      'dist/grunt-mocha-bridge.js':
        'node_modules/thehelp-client-project/node_modules/grunt-mocha/phantomjs/bridge.js'
    }
  });

  // Turns out that r.js optimization has a problem when it puts a number of files into
  // one final file. If it finds an anonymous `define()` (no name specified as the first
  // parameter) it will put the name of the method it used to load that file in that
  // anonymous define. In this case, the combined `blanket` file has its dependency
  // `esprima` at the top, which uses UMD-syntax to define itself. Because it was all
  // loaded as `blanket`, that's what r.js puts there. This results in no define for
  // `blanket` at all.
  grunt.task.registerTask('fix-coverage', 'Removes r.js-generated bugs', function() {
    grunt.file.delete('dist/thehelp-test-coverage.min.js');

    var path = 'dist/thehelp-test-coverage.js';
    var contents = grunt.file.read(path);
    contents = contents.replace(
      'define(\'blanket\',[\'exports\'], factory);',
      'define(\'esprima\',[\'exports\'], factory);'
    );

    contents = contents.replace(
      '})();\n\n// bridge',
      '})();\ndefine(\'blanket\', function() { return window.blanket; })\n// Bridge'
    );

    grunt.file.write(path, contents);
  });

  grunt.registerTask('dist', ['requirejs', 'copy:default', 'fix-coverage']);
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

