// # GeneralTestHelper
// This class makes it easier to test code using [`general`](../both/general.html).

// [RequireJS](http://requirejs.org/) boilerplate, dependencies and
// [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode)
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['./core', 'util', 'winston', 'sinon'
],
  function(core, util, winston, sinon
  ) {
  'use strict';

  function GeneralTestHelper(options) {
    options = options || {};

    this.showLogs = options.showLogs;
    this.winston = options.winston || winston;

    this.reset();
  }

  // `checkError` allows you to choose to show logs on the console by setting
  // `showLogs = true`.
  GeneralTestHelper.prototype.checkError = function(message, err, cb) {
    if (err) {
      if (err && this.showLogs) {
        this.winston.error(util.inspect(err) + ' - ' + message);
      }
      if (cb) {
        cb(err);
      }
      return true;
    }
    return false;
  };

  // `reset` wraps `checkError` in a [`sinon.spy`](http://sinonjs.org/docs/#spies).
  GeneralTestHelper.prototype.reset = function() {
    this.checkError = sinon.spy(GeneralTestHelper.prototype.checkError);
  };

  return GeneralTestHelper;
});
