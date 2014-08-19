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
      chai: 'lib/vendor/chai',
      sinon: 'lib/vendor/sinon',
      mocha: 'lib/vendor/mocha',

      blanket: 'lib/vendor/blanket',
      'blanket-require': 'lib/vendor/blanket-require',
      falafel: 'lib/vendor/falafel',

      winston: 'src/client/shims/winston_shim',
      util: 'src/client/shims/util_shim'
    },
    shim: {
      mocha: {exports: 'window.mocha'},

      // This is what holds all the blanket-based code coverage stuff together.
      // First, `falafel` is node module I browserified to work in the browser. Then
      // I modified blanket itself to allow `falafel` to be injected via
      // `blanket.parseAndModify`. Then I set some default filters on blanket, only
      // instrumenting things under 'src/` and never things under 'test/' and '/lib'.
      blanket: {
        deps: ['falafel', 'mocha'],
        init: function(falafel) {
          var blanket = window.blanket;
          blanket.parseAndModify = falafel;
          blanket.options('filter', '/src/');
          blanket.options('antifilter', '["/test/","/lib/"]');
          return blanket;
        }
      },
      'blanket-require': ['blanket']
    }
  };

});
