
require('../both/core'); // we just load it to run the sources
var chai = require('chai');

module.exports = {
  expect: chai.expect,
  chai: chai,
  sinon: require('sinon'),
  WinstonTestHelper: require('../both/winston_test_helper')
};
