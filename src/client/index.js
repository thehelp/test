
define('thehelp-test', [
  '../core',
  '../both/general_test_helper',
  '../both/winston_test_helper',
  './mocha_reporter.js',
  'sinon',
  'chai'
],
  function(
    core,
    chai,
    sinon,
    GeneralTestHelper,
    WinstonTestHelper,
    mochaReporter
  ) {
  'use strict';

  return {
    core: core,
    chai: chai,
    sinon: sinon,
    GeneralTestHelper: GeneralTestHelper,
    WinstonTestHelper: WinstonTestHelper,
    mochaReporter: mochaReporter
  };
});
