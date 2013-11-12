// # core
// Used to do basic chai/winston setup before tests run, and also to provide
// some core utility functions.

// [RequireJS](http://requirejs.org/) boilerplate, dependencies and
// [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode)
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['winston', 'util', 'chai'],
  function(winston, util, chai) {
  'use strict';

  // We check if we're on the server by looking for `winston.remove`. Then
  // we set up the console transport to the output we're looking for.
  if (winston.remove) {
    winston.remove(winston.transports.Console);
    winston.add(winston.transports.Console, {
      colorize: true,
      level: 'info',
      timestamp: true
    });
  }

  // Here we set up global `should` syntax, show callstacks and try to make
  // diffs show a little less often. (I really don't want to see them all the time!)
  chai.Assertion.includeStack = true;
  chai.Assertion.showDiff = false;

  return {
    should: chai.should(),
    expect: chai.expect,

    // `processError` tries to make it a little easier to kill your test
    // if a callback returns an error.
    processError: function(method, err) {
      if (err) {
        throw new Error(method + ' returned an error: \'' + util.inspect(err) + '\'');
      }
    },

    // `processVar` ensures that a given variable is truthy - it throws an
    // error if not. Also, if `showLogs` is true (which it is by default)
    // you'll see the value of that variable in the log.
    showLogs: true,
    processVar: function(name, variable) {
      if (variable) {
        if (this.showLogs) {
          winston.info(name + ' had the value ' + util.inspect(variable));
        }
      }
      else {
        throw new Error(name + ' was not set');
      }
    }
  };
});
