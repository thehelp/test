// # core
// Used to do basic chai/winston setup before tests run, and also to provide
// some core utility functions.

// [RequireJS](http://requirejs.org/) boilerplate, dependencies and
// [strict mode](http://mzl.la/1fRhnam)
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['winston', 'util', 'chai'], function(winston, util, chai) {

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

  // Here we show callstacks and try to make diffs show a little less often.
  chai.config.includeStack = true;
  chai.config.showDiff = false;
});
