// sauce-reporter
// ========
// A module to ensure that mocha test results are available to
// [Sauce Labs'](https://saucelabs.com) test runner.
// Inspired by the
// [example](https://github.com/axemclion/grunt-saucelabs#test-result-details-with-mocha)
// code provided by `grunt-saucelabs`

define(['mocha'], function(mocha) {

  'use strict';

  var Parent = mocha._reporter;

  var failedTests = [];
  var flattenTitles = function flattenTitles(test) {
    var titles = [];
    while (test.parent.title) {
      titles.push(test.parent.title);
      test = test.parent;
    }
    return titles.reverse();
  };

  var logFailureForSauce = function logFailureForSauce(test, err) {
    // widening the net for IE9 and Safari 5
    var message = err.message || err.description || '';

    failedTests.push({
      result: false,
      name: test.title,
      message: message,
      stack: err.stack || message,
      titles: flattenTitles(test)
    });
  };

  function SauceReporter(runner) {
    runner.on('end', function() {
      window.mochaResults = runner.stats || {};
      window.mochaResults.reports = failedTests;
    });

    runner.on('fail', logFailureForSauce);

    Parent.apply(this, arguments);
  }

  //to avoid crashes in mocha on display of results
  SauceReporter.prototype.suiteURL = function(suite) {
    return '?grep=' + encodeURIComponent(suite.fullTitle());
  };

  SauceReporter.prototype.testURL = function(test) {
    return '?grep=' + encodeURIComponent(test.fullTitle());
  };

  mocha.reporter(SauceReporter);

});
