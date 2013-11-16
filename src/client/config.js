
'use strict';

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function() {

  return {
    name: 'thehelp-test',
    baseUrl: '.',
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
      sinon: { exports: 'window.sinon' },
      mocha: { exports: 'global.mocha' },
      blanket: {
        deps: ['falafel', 'mocha'],
        init: function(falafel) {
          var blanket = window.blanket;
          blanket.parseAndModify = falafel;
          blanket.options('filter', '/src/');
          blanket.options('antifilter', '["/test/","/lib/"]');
          // blanket.options('debug', true);
          return blanket;
        }
      },
      'blanket-require': ['blanket']
    }
  };

});
