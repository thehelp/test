  // # mochaReporter
// Used on the client side to save the results of a
// [Mocha](http://visionmedia.github.io/mocha/) test run to `window.results`, which can
// then be played back to Mocha showing test results from a (usually headless) browser on
// the command line.
define(function() {
  'use strict';

  // Mocha reporters essentally just subscribe to a set of events emitted
  // as tests run. So, we capture each of these events (sometimes saving
  // different types of information, as appropriate) and push them onto a
  // master `results` array. When we get the 'end' array we just make
  // that array available to others on the page.
  var reporter = function(runner) {
    var results = [];

    var push = function(name, object, error) {
      var item = {
        name: name,
        object: object,
        error: error
      };
      return results.push(item);
    };
    runner.on('start', function() {
      push('start');
    });

    // We filter parts of the object we get from Mocha here because the
    // objects in question have large, sometimes cyclical hierarchies.
    // We just capture what we need to display the results.
    var filterSuite = function(suite) {
      var result = {
        root: suite.root,
        title: suite.title
      };
      return result;
    };

    runner.on('suite', function(suite) {
      push('suite', filterSuite(suite));
    });

    runner.on('suite end', function(suite) {
      push('suite end', filterSuite(suite));
    });

    // Similar to `filterSuite`, we're just taking what we need from the test
    // data given to us.
    var filterTest = function(test) {
      var result = {
        title: test.title,
        fullTitle: test.fullTitle(),
        duration: test.duration
      };
      return result;
    };

    runner.on('test end', function(test) {
      push('test end', filterTest(test));
    });

    runner.on('pass', function(test) {
      push('pass', filterTest(test));
    });

    // This is our last filter function, were we only take what we need from
    // a given error.
    var filterError = function(error) {
      var result = {
        message: error.message,
        stack: error.stack || error.message,
        actual: error.actual,
        expected: error.expected
      };
      return result;
    };

    runner.on('fail', function(test, err) {
      push('fail', filterTest(test), filterError(err));
    });

    // This is were we make the results available to other consumers.
    runner.on('end', function() {
      push('end');
      window.results = results;
    });

    runner.on('pending', function(test) {
      push('pending', filterTest(test));
    });
  };

  return reporter;
});
