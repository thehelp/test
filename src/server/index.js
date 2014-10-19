
var chai = require('chai');

try {
  var setup = require('./setup_winston');
  setup();
}
catch (e) {}

module.exports = {
  expect: chai.expect,
  chai: chai,
  sinon: require('sinon'),
  WinstonTestHelper: require('../both/thehelp-test/winston_test_helper')
};
