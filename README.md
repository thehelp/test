# thehelp-test

Gives you standard testing tools for both the client and the server in one package, including client-side test coverage under requirejs via blanket and come custom modificiations.

## Features

+ Include a number of core testing libraries: `mocha`, `sinon`, and `chai` available on the client and on the server
+ dist/thehelp-test-harness.js to make it easy to test on the client side, whether in the browser, under raw PhantomJS, or via the `grunt-mocha` task
+ `WinstonTestHelper` and `GeneralTestHelper` to customize logging behavior during tests, as well as verify that calls were made as expected
+ `Headless` and `HeadlessMocha` classes to make it easy to call directly into PhantomJS

## Jump in!

### Install

Include the project in your dependencies:

    "thehelp-test": "git+ssh://git@infra:thehelp-test#v1.0.0"

### Usage

To write tests very quickly, just pull in the project and start using it!

    var test = require('thehelp-test');
    var core = test.core;
    var expect = core.expect;
    var sinon = test.sinon;
    var WinstonTestHelper = test.WinstonTestHelper;

    core.processError('method', err); // throws err if its truthy
    var stub = sinon.stub();

    var winston = new WinstonTestHelper({showLogs: false});
    winston.info('blah');
    expect(winston.info).to.have.propety(callCount, 1);

This same code also works on the client, assuming that you've set things up properly. youll need to set up requirejs paths for several depenencies:

+ thehelp-test
+ thehelp-test-coverage if you'd like to measure test coverage
+ grunt-mocha-bridge if you'd like to run tests with the `grunt-mocha` task

And you'll also need to set a few variabless:

+ `window.tests` is an array of test files to be pulled in via requirejs.
+ `window.mochaCss` is a path to the mocha css file, which makes its HTML test output look nice
+ `window.waitToRun` can be set to prevent the tests from running after successful load
+ `window.coverage`, if set to true, turns on `blanket`-based code coverage (it instruments your code as it's loaded via requirejs)

## History

### 2.0.5 (2014-03-27)

* Ugh. That last update missed `sinon` because its bower package has no ready-to-use sinon.js; needs to be udated manually. But not directly from the website - that version has extra weirdness.

### 2.0.4 (2014-03-27)

* Actually copying new versions of bower deps to lib/vendor now, new 'setup' grunt task
* use `chai.config` instead of `chai.Assertion` for configuration, to get rid of deprecation warnings

### 2.0.3

* Patch versions: chai (npm + bower), phantom, requirejs (bower only)
* Minor versions: mocha (npm + bower), sinon (bower only)
* Dev dependencies: grunt, thehelp-project
* New source map files

### 2.0.2

* Minor versions: chai, mocha, sinon, thehelp-project
* Patch version updates: grunt
* Fixing too-long lines

### 2.0.1

* Updating to latest version of `mocha`
* Fixing improper method wireup in `WinstonTestHelper`
* All 'generic' dependencies (`lodash`, `amdefine`, `winston`) now specified either as 1.x or 0.1.x to allow full flexibility to top-level project

### 2.0.0

* Rename 'dist/harness.js' to 'dist/thehelp-test-harness.js'
* Remove `jquery` dependency
* Fixing `mocha_reporter` inclusing in `dist/thehelp-test`

### 1.0.2

* Fix to harness.js to ensure that blanket code coverage works
* Fix loop through methods in `WinstonTestHelper`

### 1.0.1

* Pulling 'dist/grunt-mocha-bridge.js' from node_modules dir under 'thehelp-project'

### 1.0.0

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
