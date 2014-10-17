
'use strict';

var test = require('../../../src/server/index');
var expect = test.expect;
var winston = require('winston');

describe('server/thehelp-test', function() {

  it('should have four keys', function() {
    expect(Object.keys(test)).to.have.length(4);
    winston.verbose('verbose should have styling');
    winston.info('info should have styling');
    winston.warn('warn should have styling');
    winston.error('error should have styling');
  });

});
