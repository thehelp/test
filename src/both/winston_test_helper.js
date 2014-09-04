// # WinstonTestHelper
// Making it easier to test code that logs with `winston`. Each
// of the logging methods is wired up with a [`sinon.spy`](http://sinonjs.org/docs/#spies)
// so you can tell if the method has been called, how it was called, etc.
// Additinoally, you can set `showLogs = true` on construction
// to show the logs on the console.

// [RequireJS](http://requirejs.org/) boilerplate, dependencies and
// [strict mode](http://mzl.la/1fRhnam)
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['sinon'], function(sinon) {

  'use strict';

  function WinstonTestHelper(options) {
    options = options || {};

    this.showLogs = options.showLogs;
    this.log = function(text) {
      if (console.log) {
        var date = new Date();
        console.log(date.toJSON(), text);
      }
    };

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
          _this.log(text);
        }
      });
    });
  };

  return WinstonTestHelper;
});
