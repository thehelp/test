
'use strict';

requirejs.config({
  baseUrl: '/',
  paths: {
    'thehelp-test': 'dist/thehelp-test',
    'thehelp-test-coverage': 'dist/thehelp-test-coverage',
    'grunt-mocha-bridge': 'dist/grunt-mocha-bridge',

    jquery: 'lib/vendor/jquery',
    winston: 'src/client/shims/winston_shim',
    util: 'src/client/shims/util_shim'
  }
});

require([window.entrypoint], function() {});
