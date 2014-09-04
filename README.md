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
