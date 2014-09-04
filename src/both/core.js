// # core
// Used to do basic chai setup before tests run

// [RequireJS](http://requirejs.org/) boilerplate, dependencies and
// [strict mode](http://mzl.la/1fRhnam)
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['chai'], function(chai) {

  'use strict';

  // Here we show callstacks and try to make diffs show a little less often.
  chai.config.includeStack = true;
  chai.config.showDiff = false;
});
