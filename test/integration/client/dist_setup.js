
'use strict';

requirejs.config({
  baseUrl: '/',
  paths: {
    'thehelp-test': 'dist/thehelp-test',
    'thehelp-test-coverage': 'dist/thehelp-test-coverage',
    'grunt-mocha-bridge': 'dist/grunt-mocha-bridge'
  }
});

require([window.entrypoint], function() {});
