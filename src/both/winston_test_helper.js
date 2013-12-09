// # WinstonTestHelper
// Making it easier to test code that logs with `winston`. Each
// of the logging methods is wired up with a [`sinon.spy`](http://sinonjs.org/docs/#spies)
// so you can tell if the method has been called, how it was called, etc.
// Additinoally, you can set `showLogs = true` on construction
// to show the logs on the console.

// [RequireJS](http://requirejs.org/) boilerplate, dependencies and
// [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode)
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['./core', 'sinon', 'util', 'winston'
],
  function(core, sinon, util, winston
  ) {
  'use strict';

  function WinstonTestHelper(options) {
    options = options || {};

    this.showLogs = options.showLogs;
    this.winston = options.winston || winston;
    this.console = options.console || console;

    this.reset();
  }

  var methods = ['verbose', 'info', 'warn', 'error'];

  // `reset` can be used at any time to reset the `sinon.spy` for
  // each of the logging methods.
  WinstonTestHelper.prototype.reset = function() {
    var _this = this;

    methods.forEach(function(method) {
      _this[method] = sinon.spy(function(text) {
        if (_this.showLogs) {
          _this.winston[method](text);
        }
      });
    });
  };

  return WinstonTestHelper;
});
