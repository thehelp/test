## 3.2.0 (2014-10-16)

* `winston` is no longer a dependency. we'll set it up for your tests if we can `require()` it
* `WinstonTestHelper` now allows you to pass in an object that looks like `winston` (with the right functions on it)
* Remove `lodash` as a dependency

## 3.1.0 (2014-09-10)

* New: Support for reporting mocha test results to [Sauce Labs](http://saucelabs.com)
* `chai` diffs are no longer suppressed
* Support IE9 in tests: `console.log` only if console is defined, dev.html/dist.html start with proper doctype to get IE9 into standards mode
* 'src/both/core' module removed from thehelp-test.js
* 'src/both/winston_test_helper' module moved to 'src/both/thehelp-test/winston_test_helper' to prevent collisions

## 3.0.2 (2014-09-05)

* Updated harness file didn't seem to make it into the npm package. Re-releasing.

## 3.0.1 (2014-09-05)

* Re-add `Function.prototype.bind` polyfill for phantomjs in test harness

## 3.0.0 (2014-09-04)

* Breaking: Remove `GeneralTestHelper`, `Headless`, `HeadlessMocha`, `mochaReporter`, and `core`
* Breaking: Client-side configuration now all under `window.thehelp.test`, `test`->`files`
* Breaking: `expect` can now be found on the top-level object instead of under `core`
* Fixed: extra 'load' window event no longer fired to get blanket to cover all files and start tests. Now we force blanket to start when all files are loaded.
* Fixed: repeatable process for building blanket file. Previously manual tweaks were required for lib/vendor/blanket.js and lib/vendor/blanket-require.js
* `phantom` and `mocha` server-side dependencies removed
* `mocha` (client-side) updated to 1.21.4
* New `bridge` file bundled into thehelp-test-coverage, path is `src/client/thehelp-test/bridge` to prevent module name collisions
* `winston` and `util` dependencies removed for the client-side
* travis-ci support
* Attempted update of `sinon`, but 1.10 introduces client-side requirejs problems. Updating will be very involved.
* Update dev dependencies

## 2.0.13 (2014-06-25)

* Restore dist/thehelp-test-coverage.js to npm package. :0(

## 2.0.12 (2014-06-25)

* Restore dist/thehelp-test.js to npm package
* Remove source maps from npm package
* Remove docs from npm package
* Remove docs and dist from repo

## 2.0.11 (2014-06-08)

* Minor version update: `mocha` (both client and server, but it seems that the mocha client file didn't actually change...)
* Properly remove 'thehelp-test-coverage.js' from the npm package
* Some documentation updates
* Update dev dependencies

## 2.0.10 (2014-05-27)

* Let's add the js back into the project, shall we?

## 2.0.9 (2014-05-27)

* Pare down what's in npm package

## 2.0.8 (2014-05-24)

* Minor version update: `mocha` (both client and server)
* Patch version update: `phantomjs`
* Update a few dev dependencies, style standardization

## 2.0.7 (2014-05-02)

* Minor version update: `phantomjs`
* Update dev dependency: `thehelp-project`

## 2.0.6 (2014-04-11)

* Patch version update: `sinon`
* Update dev dependencies `thehelp-project`, `blanket`

## 2.0.5 (2014-03-27)

* Ugh. That last update missed `sinon` because its bower package has no ready-to-use sinon.js; needs to be udated manually. But not directly from the website - that version has extra weirdness.

## 2.0.4 (2014-03-27)

* Actually copying new versions of bower deps to lib/vendor now, new 'setup' grunt task
* use `chai.config` instead of `chai.Assertion` for configuration, to get rid of deprecation warnings

## 2.0.3 (2014-03-21)

* Patch versions: chai (npm + bower), phantom, requirejs (bower only)
* Minor versions: mocha (npm + bower), sinon (bower only)
* Dev dependencies: grunt, thehelp-project
* New source map files

## 2.0.2 (2014-03-07)

* Minor versions: chai, mocha, sinon, thehelp-project
* Patch version updates: grunt
* Fixing too-long lines

## 2.0.1 (2013-12-08)

* Updating to latest version of `mocha`
* Fixing improper method wireup in `WinstonTestHelper`
* All 'generic' dependencies (`lodash`, `amdefine`, `winston`) now specified either as 1.x or 0.1.x to allow full flexibility to top-level project

## 2.0.0 (2013-11-19)

* Rename 'dist/harness.js' to 'dist/thehelp-test-harness.js'
* Remove `jquery` dependency
* Fixing `mocha_reporter` inclusing in `dist/thehelp-test`

## 1.0.2 (2013-11-18)

* Fix to harness.js to ensure that blanket code coverage works
* Fix loop through methods in `WinstonTestHelper`

## 1.0.1 (2013-11-18)

* Pulling 'dist/grunt-mocha-bridge.js' from node_modules dir under 'thehelp-project'

## 1.0.0 (2013-11-14)

* Initial release - sinon, mocha, chai all included. Client-side files under dist/
