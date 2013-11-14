
define([
  'src/both/core',
  'src/both/general_test_helper',
  'src/both/winston_test_helper',
  'src/client/mocha_reporter.js',
  'sinon',
  'mocha',
  'chai'
],
  function(
    core,
    GeneralTestHelper,
    WinstonTestHelper,
    mochaReporter,
    sinon,
    mocha,
    chai
  ) {
  'use strict';

  return {
    core: core,
    GeneralTestHelper: GeneralTestHelper,
    WinstonTestHelper: WinstonTestHelper,
    mochaReporter: mochaReporter,
    sinon: sinon,
    mocha: mocha,
    chai: chai
  };
});
