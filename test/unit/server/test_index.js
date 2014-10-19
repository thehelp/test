
'use strict';

var test = require('../../../src/server');
var expect = test.expect;
var winston;

try {
  winston = require('winston');
}
catch (e) {}

describe('index', function() {

  it('should have four keys', function() {
    expect(Object.keys(test)).to.have.length(4);

    if (winston) {
      winston.verbose('default logger: verbose should have styling');
      winston.info('default logger: info should have styling');
      winston.warn('default logger: warn should have styling');
      winston.error('default logger: error should have styling');

      var logger = winston.loggers.get('test');
      logger.verbose('default collection: verbose should have styling');
      logger.info('default collection: info should have styling');
      logger.warn('default collection: warn should have styling');
      logger.error('default collection: error should have styling');
    }
  });

});
