
var chai = require('chai');

// Set up the console transport to the output we're looking for.
var winston = require('winston');
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  colorize: true,
  level: process.env.THEHELP_TEST_LEVEL || 'info',
  timestamp: true
});

module.exports = {
  expect: chai.expect,
  chai: chai,
  sinon: require('sinon'),
  WinstonTestHelper: require('../both/thehelp-test/winston_test_helper')
};
