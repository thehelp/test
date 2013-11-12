// # Headless
// This class makes it easier to use [`phantomjs`](http://phantomjs.org/) (via the
// [`phantom`](https://github.com/sgentle/phantomjs-node) node module).

'use strict';

var phantom = require('phantom');

function Headless(options) {
  options = options || {};

  this.ph = options.phantom || phantom;

  this.delay = options.delay || 250;
  this.repeat = options.repeat || 20;
}

// `open` uses phantomjs to open up a web page and prepare it for
// manipulation.
Headless.prototype.open = function(url, cb) {
  var _this = this;

  this.createIf(function() {
    _this.phantomProcess.createPage(function(page) {
      page.open(url, function() {
        return cb(null, page);
      });
    });
  });
};

// `createIf` checks to see if a phantom process has already been created;
// if not, it will create it.
Headless.prototype.createIf = function(cb) {
  var _this = this;

  if (this.phantomProcess) {
    return cb();
  }

  this.ph.create(function(phantomProcess) {
    _this.phantomProcess = phantomProcess;
    return cb();
  });
};

// `shutdown` kills phantom process if it has been started.
Headless.prototype.shutdown = function() {
  if (this.phantomProcess) {
    this.phantomProcess.exit();
  }
};

// `pollForValue` helps you deal with the fact that PhantomJS doesn't notify
// you when things happen on the page. So we try until we get what we're looking for.
Headless.prototype.pollForValue = function(page, toEval, repeat, delay, cb) {
  var attempt = 0;

  if (!cb && !delay) {
    cb = repeat;
    repeat = this.repeat;
    delay = this.delay;
  }
  else if (!cb) {
    cb = delay;
    delay = this.delay;
  }

  var interval = setInterval(function() {
    page.evaluate(toEval, function(results) {
      if (results) {
        clearInterval(interval);
        return cb(null, results);
      }
      else {
        attempt += 1;
        if (repeat && attempt > repeat) {
          return cb(new Error('couldn\'t find any results!'));
        }
      }
    });
  }, delay);
};

module.exports = Headless;
