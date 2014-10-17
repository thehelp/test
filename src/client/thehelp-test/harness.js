/*
# harness
This file can be used to very quickly set up a mocha-based browser testing
environment, and is compatible with `grunt-mocha`. You'll just need to set the path
for three files in `requirejs`:

```
paths: {
  'thehelp-test': '<your path>',
  'thehelp-test-coverage': '<required for code coverage>',
  'grunt-mocha-bridge': '<required if using with grunt-mocha'
}
```
*/

define(['thehelp-test'], function(test) {
  /*jshint maxcomplexity: 9 */

  'use strict';

  // Because PhantomJS doesn't support function.bind we polyfill it
  // <https://groups.google.com/forum/#!msg/phantomjs/r0hPOmnCUpc/uxusqsl2LNoJ>
  // <https://github.com/ariya/phantomjs/issues/10522>
  Function.prototype.bind = Function.prototype.bind || function(target) {
    var _this = this;
    return function() {
      return _this.apply(target, arguments);
    };
  };

  // `setupMocha` prepares `mocha` for tests to be loaded. It must be run before
  // we run test-defining code. If we don't, `describe` and `it` will not yet be defined.
  test.mocha.setup('bdd');

  // Prepare and verify settings, put defaults in place.
  var thehelp = window.thehelp || {};
  var settings = thehelp.test || {};
  if (typeof settings.coverage === 'undefined') {
    settings.coverage = true;
  }
  if (typeof settings.blanket === 'undefined') {
    settings.blanket = {
      filter: '/src/',
      antifilter: '["/bower_components/", "node_modules", "/test/","/lib/"]'
    };
  }

  if (typeof settings.files === 'undefined') {
    throw new Error('Specify test files with an array at window.thehelp.test.files');
  }
  if (typeof settings.mochaCss === 'undefined') {
    throw new Error(
      'Provide the path to the mocha.css file window.thehelp.test.mochaCss'
    );
  }

  // `loadTests` actually pulls in your test files, then installs `window.runTests()`,
  // which adds the mocha div to your page and runs the tests.
  var loadTests = function loadTests(settings, mocha) {
    require(settings.files, function() {
      window.runTests = function() {
        if (!document.getElementById('mocha')) {
          //Doing this without jquery to reduce dependencies :0)
          var body = document.getElementsByTagName('body')[0];
          var div = document.createElement('div');
          div.setAttribute('id', 'mocha');
          body.appendChild(div);

          var head = document.getElementsByTagName('head')[0];
          var link = document.createElement('link');
          link.setAttribute('rel', 'stylesheet');
          link.setAttribute('href', settings.mochaCss);
          head.appendChild(link);
        }

        mocha.run();
        return true;
      };

      if (window.PHANTOMJS) {
        require(['grunt-mocha-bridge'], function() {
          mocha.run();
        });
      }
      else if (!settings.waitToRun) {
        window.runTests();
      }
    });
  };

  // Sets up code coverage if configured. No code coverage under phantomjs since we're not
  // using a grunt plugin that understands code coverage.
  if (settings.coverage && !window.PHANTOMJS) {
    require(['thehelp-test-coverage'], function(blanket) {

      if (settings.blanket) {
        //Doing this without lodash to reduce dependencies :0)
        var keys = Object.keys(settings.blanket);

        for (var i = 0, max = keys.length; i < max; i += 1) {
          var key = keys[i];
          blanket.options(key, settings.blanket[key]);
        }
      }

      loadTests(settings, test.mocha);
    });
  }
  else {
    loadTests(settings, test.mocha);
  }

});
