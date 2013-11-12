
define('thehelp-test', [
  '../core',
  '../both/general_test_helper',
  '../both/winston_test_helper',
  './mocha_reporter.js'
],
  function(
    core,
    GeneralTestHelper,
    WinstonTestHelper,
    mochaReporter
  ) {
  'use strict';

  return {
    core: core,
    GeneralTestHelper: GeneralTestHelper,
    WinstonTestHelper: WinstonTestHelper,
    mochaReporter: mochaReporter
  };
});
