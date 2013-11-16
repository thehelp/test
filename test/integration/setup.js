
'use strict';

requirejs.config({
  baseUrl: '/',
  paths: {
    'thehelp-test': 'dist/thehelp-test',
    'thehelp-test-coverage': 'dist/thehelp-test-coverage',
    jquery: 'lib/vendor/jquery',
    winston: 'src/client/shims/winston_shim',
    util: 'src/client/shims/util_shim',
    mocha: 'lib/vendor/mocha'
  }
});

require([window.entrypoint], function() {});
