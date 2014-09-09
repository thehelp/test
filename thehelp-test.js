// # thehelp-test
// This file pulls in everything needed for testing on the client side.

define([
  'src/both/core',
  'src/both/thehelp-test/winston_test_helper',
  'sinon',
  'mocha',
  'chai'
], function(
  core,
  WinstonTestHelper,
  sinon,
  mocha,
  chai
) {

  'use strict';

  return {
    expect: chai.expect,
    WinstonTestHelper: WinstonTestHelper,
    sinon: sinon,
    mocha: mocha,
    chai: chai
  };
});
