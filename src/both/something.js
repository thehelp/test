// # something
// This file is used entirely for testing code coverage.
// It needs to be under src/ to be instrumented by blanket.

// [RequireJS](http://requirejs.org/) boilerplate, dependencies and
// [strict mode](http://mzl.la/1fRhnam)
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(function() {
  'use strict';

  return {
    covered: function() {
      var y = 17;
      y += 3;
      console.log('y: ' + y);
      return y;
    },

    notCovered: function() {
      var x = 4;
      x += 1;
      console.log('x: ' + x);
      return x;
    }
  };
});
