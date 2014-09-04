# thehelp-test

Gives you standard testing tools for both the client and the server in one package, including client-side test coverage under [`requirejs`](http://requirejs.org/) via [`blanket`](http://blanketjs.org/) and some custom modificiations.

## Features

* Include a number of core testing libraries: `mocha`, `sinon`, and `chai` available on the client and on the server
* dist/thehelp-test-harness.js to make it easy to test on the client side, whether in the browser, under raw `phantomjs`, or via the `grunt-mocha` task
* `WinstonTestHelper` and `GeneralTestHelper` to customize logging behavior during tests, as well as verify that calls were made as expected
* `Headless` and `HeadlessMocha` classes to make it easy to call directly into `phantomjs`

## Setup

Include the project in your dependencies:

```
npm install thehelp-test --save-dev
```

### Usage

To write tests very quickly, just pull in the project and start using it!

```
var test = require('thehelp-test');
var expect = test.expect;
var sinon = test.sinon;
var WinstonTestHelper = test.WinstonTestHelper;

var stub = sinon.stub();
stub();
expect(stub).to.have.property('callCount', 1);

var winston = new WinstonTestHelper({showLogs: false});
winston.info('blah');
expect(winston).to.have.deep.property('info.callCount', 1);
```

This same code also works on the client, assuming that you've set things up properly. you'll need to set up `requirejs` paths for several dependencies:

* `thehelp-test`
* `thehelp-test-coverage` (if you'd like to measure test coverage)
* `grunt-mocha-bridge` (if you'd like to run tests from the command line with the `grunt-mocha` task)
* `winston` (consider using shims from [`thehelp-core`](https://github.com/thehelp/core))
* `util` (consider using shims from `thehelp-core`)

To configure it:

```javascript
window.thehelp = {
  test: {
    files: ['the', 'test', 'file', 'paths', 'for', 'requirejs'],
    mochaCss: 'path to mocha.css',
    blanket: { // optional blanket options, defaults are:
      filter: '/src/',
      antifilter: '["/bower_components/", "node_modules", "/test/","/lib/"]'
    },
    coverage: false, // optional, defaults to true, for code coverage in browser via blanket
    waitToRun: true, // optional, defaults to false, auto-starting tests on load
  }
}
```

## History

### 3.0.0 (2014-09-04)

* Breaking: Remove `GeneralTestHelper`, `Headless`, `HeadlessMocha`, `mochaReporter`, and `core`
* Breaking: Client-side configuration now all under `window.thehelp.test`, `test`->`files`
* Breaking: `expect` can now be found on the top-level object instead of under `core`
* Fixed: extra 'load' window event no longer fired to get blanket to cover all files and start tests. Now we force blanket to start when all files are loaded.
* Fixed: repeatable process for building blanket file. Previously manual tweaks were required for lib/vendor/blanket.js and lib/vendor/blanket-require.js
* `phantom` and `mocha` server-side dependencies removed
* `mocha` (client-side) updated to 1.21.4
* Attempted update of `sinon`, but 1.10 introduces client-side requirejs problems. Updating will be very involved.
* Update dev dependencies

### 2.0.13 (2014-06-25)

* Restore dist/thehelp-test-coverage.js to npm package. :0(

### 2.0.12 (2014-06-25)

* Restore dist/thehelp-test.js to npm package
* Remove source maps from npm package
* Remove docs from npm package
* Remove docs and dist from repo

### 2.0.11 (2014-06-08)

* Minor version update: `mocha` (both client and server, but it seems that the mocha client file didn't actually change...)
* Properly remove 'thehelp-test-coverage.js' from the npm package
* Some documentation updates
* Update dev dependencies

### 2.0.10 (2014-05-27)

* Let's add the js back into the project, shall we?

### 2.0.9 (2014-05-27)

* Pare down what's in npm package

### 2.0.8 (2014-05-24)

* Minor version update: `mocha` (both client and server)
* Patch version update: `phantomjs`
* Update a few dev dependencies, style standardization

### 2.0.7 (2014-05-02)

* Minor version update: `phantomjs`
* Update dev dependency: `thehelp-project`

### 2.0.6 (2014-04-11)

* Patch version update: `sinon`
* Update dev dependencies `thehelp-project`, `blanket`

### 2.0.5 (2014-03-27)

* Ugh. That last update missed `sinon` because its bower package has no ready-to-use sinon.js; needs to be udated manually. But not directly from the website - that version has extra weirdness.

### 2.0.4 (2014-03-27)

* Actually copying new versions of bower deps to lib/vendor now, new 'setup' grunt task
* use `chai.config` instead of `chai.Assertion` for configuration, to get rid of deprecation warnings

### 2.0.3 (2014-03-21)

* Patch versions: chai (npm + bower), phantom, requirejs (bower only)
* Minor versions: mocha (npm + bower), sinon (bower only)
* Dev dependencies: grunt, thehelp-project
* New source map files

### 2.0.2 (2014-03-07)

* Minor versions: chai, mocha, sinon, thehelp-project
* Patch version updates: grunt
* Fixing too-long lines

### 2.0.1 (2013-12-08)

* Updating to latest version of `mocha`
* Fixing improper method wireup in `WinstonTestHelper`
* All 'generic' dependencies (`lodash`, `amdefine`, `winston`) now specified either as 1.x or 0.1.x to allow full flexibility to top-level project

### 2.0.0 (2013-11-19)

* Rename 'dist/harness.js' to 'dist/thehelp-test-harness.js'
* Remove `jquery` dependency
* Fixing `mocha_reporter` inclusing in `dist/thehelp-test`

### 1.0.2 (2013-11-18)

* Fix to harness.js to ensure that blanket code coverage works
* Fix loop through methods in `WinstonTestHelper`

### 1.0.1 (2013-11-18)

* Pulling 'dist/grunt-mocha-bridge.js' from node_modules dir under 'thehelp-project'

### 1.0.0 (2013-11-14)

* Initial release - sinon, mocha, chai all included. Client-side files under dist/


## License

(The MIT License)

Copyright (c) 2013 Scott Nonnenberg &lt;scott@nonnenberg.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
