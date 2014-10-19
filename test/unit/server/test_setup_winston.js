
'use strict';

var setup = require('../../../src/server/setup_winston');

var winston;

try {
  winston = require('winston');
}
catch (e) {}

describe('setup_winston', function() {

  it('should not crash when run twice', function() {
    if (winston) {
      setup();
      setup();

      winston.info('default logger: info');

      var logger = winston.loggers.get('testSetup');
      logger.info('default collection: info');
    }
  });

});
