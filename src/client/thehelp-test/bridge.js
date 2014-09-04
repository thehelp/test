// bridge
// ========
// A bridge between `mocha` and `blanket`. We register a reporter that sends `mocha` test
// information to `blanket`, then override `mocha`'s `run()` method, first ensuring that
// all source files have been loaded and instrumented by `blanket`.

define(['mocha', 'blanket'], function(mocha, blanket) {

  'use strict';

  var Parent = mocha._reporter;

  function BlanketReporter(runner) {
    runner.on('start', function() {
      blanket.setupCoverage();
    });

    runner.on('end', function() {
      blanket.onTestsDone();
    });

    runner.on('suite', function() {
      blanket.onModuleStart();
    });

    runner.on('test', function() {
      blanket.onTestStart();
    });

    runner.on('test end', function(test) {
      blanket.onTestDone(test.parent.tests.length, test.state === 'passed');
    });

    Parent.apply(this, arguments);
  }

  //to avoid crashes in mocha on display of results
  BlanketReporter.prototype.suiteURL = function(suite) {
    return '?grep=' + encodeURIComponent(suite.fullTitle());
  };

  BlanketReporter.prototype.testURL = function(test) {
    return '?grep=' + encodeURIComponent(test.fullTitle());
  };

  mocha.reporter(BlanketReporter);

  var old = mocha.run;
  mocha.run = function(cb) {
    blanket._loadSourceFiles(function() {
      old(cb);
    });
  };

});
