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
      blanket: 'node_modules/blanket/dist/qunit/blanket'
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
