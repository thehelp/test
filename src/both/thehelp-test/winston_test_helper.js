// # WinstonTestHelper

// Making it easier to test code that logs with `winston`. Each
// of the logging methods is wired up with a [`sinon.spy`](http://sinonjs.org/docs/#spies)
// so you can tell if the method has been called, how it was called, etc.

if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['sinon'], function(sinon) {
  'use strict';

  /*
  The `constructor` takes two optional parameters:

  + `winston` - a `winston`-like object with functions at the four levels: `verbose`,
  `info`, `warn`, `error`. If not provided, we log to the console, or noop in the case of
  Internet Explorer without the dev tools open.
  + `showLogs` - if set to true, we'll log to winston or the console
  */
  function WinstonTestHelper(options) {
    options = options || {};

    this.winston = options.winston;
    this.showLogs = options.showLogs;

    this.reset();
  }

  // Public methods
  // ========

  // `reset` can be used at any time to reset the `sinon.spy` for each of the logging
  // methods.
  WinstonTestHelper.prototype.reset = function() {
    var _this = this;

    this._methods.forEach(function(method) {
      _this[method] = sinon.spy(function() {
        if (_this.showLogs) {
          var args = Array.prototype.slice.call(arguments, 0);
          args = [method].concat(args);
          _this._log.apply(_this, args);
        }
      });
    });
  };

  // Helper methods
  // ========

  WinstonTestHelper.prototype._methods = ['verbose', 'info', 'warn', 'error'];

  // `_log` either calls your provided `winston` object's function at `[method]` or
  // `console.log` (assuming that it's defined - thanks IE!)
  WinstonTestHelper.prototype._log = function(method) {
    var args = Array.prototype.slice.call(arguments, 1);

    if (this.winston) {
      this.winston[method].apply(this.winston, args);
      return;
    }

    if (typeof console !== 'undefined' && console.log) {
      var date = new Date();
      args = [date.toJSON()].concat(args);
      console.log.apply(console, args);
    }
  };

  return WinstonTestHelper;
});
