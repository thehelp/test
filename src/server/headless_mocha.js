/*
# HeadlessMocha
This class uses the [`Headless`](./headless.html) class
to run mocha tests inside a browser instance. It can also print
the retrieved results to the command line using [Mocha](http://visionmedia.github.io/mocha/)
itself.

For the simplest usage, just host your test files in the browser
with the [test harness](./harness.html) in this directory. Otherwise
you can customize the way it runs tests and pulls results with the
`runTests` and `getResults` functions, which are remoted by `dnode`
and run in the target web page.
*/

'use strict';

var events = require('events');
var util = require('util');

var _ = require('lodash');
var mocha = require('mocha');

var Headless = require('./headless');

function HeadlessMocha(options) {
  options = options || {};

  Headless.apply(this, [options]);

  this.mocha = options.mocha || mocha;
  this.reporterName = 'Spec';

  this.testsAvailable = function() { return window.runTests; };
  this.runTests = function() { return window.runTests(); };
  this.getResults = function() { return window.results; };
}

util.inherits(HeadlessMocha, Headless);

// `runTestsAt` takes a given URL and attempts to run mocha tests
// on that page. It waits `initialDelay` before attempting to kick
// off the tests, then tries 10 times to pull the results before giving
// up (waiting `delay` before each attempt).
HeadlessMocha.prototype.runTestsAt = function(url, cb) {
  var _this = this;

  this.open(url, function(err, page) {
    if (err) {
      return cb(err);
    }

    _this.pollForValue(page, _this.testsAvailable, function(err) {
      if (err) {
        return cb(err);
      }

      page.evaluate(_this.runTests, function(result) {
        if (!result) {
          return cb(new Error('Couldn\'t run tests.'));
        }

        _this.pollForValue(page, _this.getResults, cb);
      });
    });
  });
};

// `printResults` feeds results generated by [`mocha_reporter`](mocha_reporter.html)
// to Mocha, resulting in standard command-line output. Because we can't
// pull functions inside data structures out of the browser, we need to
// re-hydrate the data structure in a few places, hence some of the
// strange lines below.
HeadlessMocha.prototype.printResults = function(results) {
  var runner = new events.EventEmitter();
  runner.total = 0;

  /*jshint unused: false */
  var reporter = new mocha.reporters[this.reporterName](runner);

  _(results).forEach(function(result) {
    if (result.name === 'pass') {
      result.object.slow = function() { return 1; };
    }
    if (result.object && result.object.fullTitle) {
      var fullTitle = result.object.fullTitle;
      result.object.fullTitle = function () { return fullTitle; };
    }
    if (result.name === 'test end') {
      runner.total += 1;
    }

    runner.emit(result.name, result.object, result.error);
  });
};

module.exports = HeadlessMocha;
