// # winston

// If `winston` installed, set up the console transport to the output we're looking for.

'use strict';

module.exports = function() {
  var winston = require('winston');

  var addToDefaultLogger = function(transport) {
    winston.remove(winston.transports.Console);
    winston.add(transport, null, true);
  };

  var addToDefaultCollection = function(transport) {
    var defaultOptions = winston.loggers.options;
    defaultOptions.transports = defaultOptions.transports || [];

    for (var i = 0, max = defaultOptions.transports.length; i < max; i += 1) {
      var defaultTransport = defaultOptions.transports[i];
      if (defaultTransport.constructor === winston.transports.Console) {
        defaultOptions.transports = defaultOptions.transports.slice(0, i).concat(
          defaultOptions.transports.slice(i + 1));
        break;
      }
    }

    defaultOptions.transports.push(transport);
  };

  var transport = new winston.transports.Console({
    colorize: true,
    level: process.env.THEHELP_TEST_LEVEL || 'info',
    timestamp: true
  });

  addToDefaultLogger(transport);
  addToDefaultCollection(transport);
};
