// # winston_shim
// Kinda replicates winston on the client side.

// Dependencies and
// [strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode)
define(function() {
  'use strict';

  // Damn Internet Explorer. If the dev tools are not active, console.log isn't
  // anything, and will throw an error if you try to call it. This shims it out
  // with a no-op.
  if (typeof window !== 'undefined' && typeof window.console === 'undefined') {
    window.console = {
      log: function() {}
    };
  }

  var winston = {
    levels: {
      verbose: 1,
      info: 2,
      warn: 3,
      error: 4,
      none: 5
    },

    // `addLevel` puts a function on `winston` for the `level` specified. Each of those
    // functions logs if the current log level permits it. On Internet Explorer that's
    //  a no-op without the dev tools active)
    addLevel: function(level) {
      this[level] = function(text) {
        if (this.levels[level] >= this.levels[window.winstonLevel]) {
          var now = new Date();
          console.log(now.toISOString() + ' ' + level + ': ' + text);
        }
      };

    }
  };

  // If the page hasn't set a logging level, we set it to "warn."
  if (!window.winstonLevel) {
    window.winstonLevel = 'warn';
  }

  // Here we set up all five default logging methods.
  /*jshint forin: false */
  for (var level in winston.levels) {
    winston.addLevel(level);
  }

  return winston;
});