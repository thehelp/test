// # config
// This file supplies needed configuration to requirejs both
// during client-side testing scenarios and during optimization.

'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function() {

  var baseUrl = '.';
  if (typeof window !== 'undefined') {
    baseUrl = window.host || '/';
  }

  return {
    baseUrl: baseUrl,
    name: 'thehelp-test',
    paths: {
      chai: 'bower_components/chai/chai',
      sinon: 'lib/vendor/sinon',
      mocha: 'bower_components/mocha/mocha',

      blanket: 'node_modules/blanket/dist/qunit/blanket',
      'grunt-blanket-mocha': 'node_modules/grunt-blanket-mocha/support/grunt-reporter',

      winston: 'src/client/shims/winston_shim',
      util: 'src/client/shims/util_shim'
    },
    shim: {
      mocha: {
        exports: 'window.mocha'
      },
      blanket: {
        exports: 'window.blanket'
      }
    }
  };

});
