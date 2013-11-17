/*
# harness
This file can be used to very quickly set up a mocha-based browser testing
environment. Set `window.tests` to an array of your test files, and `window.mochaCSS`
to the location of your test-specific style sheet (mocha provides a reaonable one).

You'll need to ensure that `jquery`, `mocha`, `chai` have provided paths in
your requirejs config. And, because neither mocha nor sinon properly behave
in the requirejs world, this shim setup is needed:

    shim: {
      sinon: { exports: 'window.sinon' }
      , mocha: { exports: 'global.mocha' }
    }
*/

/*
You can set `window.coverage` to something truthy to turn on code coverage.
For this, you'll need to set up paths for `falafel`, `blanket`, and `blanket-require`.
Additional shim configuration is necessary as well:

    shim: {
      , blanket: {
        deps: ['falafel', 'mocha']
        , init: function(falafel) {
          var blanket = window.blanket;
          blanket.parseAndModify = falafel;
          blanket.options('existingRequireJS', 'true');
          blanket.options('filter', '/src/');
          blanket.options('antifilter', '["/test/","/lib/"]');
          return blanket;
        }
      }
      , 'blanket-require': ['blanket']
    }

NOTE: for now, if running under [PhantomJS](http://phantomjs.org/), we don't
load code coverage modules.
*/

var loadTests = function($, mocha) {
  // We throw exceptions if you don't configure things properly.
  if (typeof window.tests === 'undefined') {
    throw new Error('Tests are specified via the window.tests array');
  }
  if (typeof window.mochaCss === 'undefined') {
    throw new Error('You need to provide the path to the mocha css file');
  }

  // Finally, we load all the tests, then set `window.runTests` to a function
  // that will add the necessary mocha components to the page and run all the tests.
  require(window.tests, function() {
    window.runTests = function() {
      /*global Event */

      //blanket has some strange assumptions in beforeStartTestRunner;
      //kicking that bit of code off manually here. And of course
      //the old-school javascript engine in Phantom doesn't handle
      //Event well.

      if (window.coverage && navigator.userAgent.indexOf('Phantom') < 0) {
        window.dispatchEvent(new Event('load'));
      }
      if (!$('#mocha').length) {
        $('body').append('<div id="mocha"/>');
        $('head').append('<link rel="stylesheet" href="' + window.mochaCss + '">');
      }
      mocha.run();
      return true;
    };

    if (window.PHANTOMJS) {
      require(['grunt-mocha-bridge'], function() {
        mocha.run();
      });
    }
    else if (!window.waitToRun) {
      window.runTests();
    }
  });
};

var setupMocha = function(mocha, headlessReporter) {
  /*
  If we're headless, we use [`mocha_reporter`](mocha_reporter.html) to save
  all test output to `window.results`, which can be played back to Mocha,
  showing the test results on the command line.

  Because [PhantomJS doesn't support `function.bind`](https://groups.google.com/forum/#!msg/phantomjs/r0hPOmnCUpc/uxusqsl2LNoJ)
  (also this [GitHub issue](https://github.com/ariya/phantomjs/issues/10522)), we polyfill
  it if Phantom is the the user agent.
  */
  if (navigator.userAgent.indexOf('Phantom') >= 0) {
    mocha.setup({
      ui:'bdd',
      reporter: headlessReporter
    });

    Function.prototype.bind = Function.prototype.bind || function (target) {
      var _this = this;
      return function () {
        return _this.apply(target, arguments);
      };
    };
  }
  else {
    mocha.setup('bdd');
  }
};

define(['jquery', 'thehelp-test'], function($, test) {
  'use strict';

  setupMocha(test.mocha, test.mochaReporter);

  if (window.coverage && navigator.userAgent.indexOf('Phantom') < 0) {
    require(['thehelp-test-coverage'], function(coverage) {
      loadTests($, test.mocha);
    });
  }
  else {
    loadTests($, test.mocha);
  }

});
