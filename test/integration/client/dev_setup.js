
'use strict';

define(['../../../src/client/config'], function(config) {

  config.paths['grunt-mocha-bridge'] =
    'node_modules/thehelp-project/node_modules/grunt-mocha/phantomjs/bridge';

  requirejs.config(config);

  require([window.entrypoint], function() {});

});
