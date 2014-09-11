# thehelp-test

One install gets you standard testing tools for both the client and the server, including client-side test coverage under [`requirejs`](http://requirejs.org/) via [`blanket`](http://blanketjs.org/).

## Features

* Includes core testing libraries: [`mocha`](http://visionmedia.github.io/mocha/), [`sinon`](http://sinonjs.org/), and [`chai`](http://chaijs.com/) available on the client and on the server
* dist/thehelp-test-harness.js to make it easy to test on the client side, whether in the browser or via [`grunt-mocha`](https://github.com/kmiyashiro/grunt-mocha)
* `WinstonTestHelper` to verify that calls were made as expected and/or prevent logs from hitting console

## Supported browsers

[![Sauce Test Status](https://saucelabs.com/browser-matrix/thehelp-test.svg)](https://saucelabs.com)

Sadly, `chai`, the assertion library used in this project, [doesn't support IE8 (okay, maybe a little)](https://github.com/chaijs/chai/issues/124).

## Setup

Include the project in your dependencies:

```
npm install thehelp-test --save-dev
```

## Usage (node.js)

To write tests very quickly, just pull in the project and start using it!

Here's some node.js code using it:

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

## Usage (client-side)

This same code also works on the client, assuming that you've set things up properly. you'll need to set up `requirejs` paths for several dependencies. Your client-side test setup file 'setup.js' can look like this:

```javascript
'use strict';

requirejs.config({
  baseUrl: '/',
  paths: {
    'thehelp-test': 'node_modules/thehelp-test/dist/thehelp-test',

    // if you'd like to measure test coverage
    'thehelp-test-coverage': 'node_modules/thehelp-test/dist/thehelp-test-coverage',

    // if you'd like to run tests from the command line grunt-mocha
    'grunt-mocha-bridge': 'node_modules/thehelp-test/dist/thehelp-test-coverage'
  }
});

require([window.entrypoint], function() {});
```

And the HTML file hosting your tests can look like this:

```html
<script>
  window.entrypoint = '../../node_modules/thehelp-test/dist/thehelp-test-harness';

  window.thehelp = {
    test: {
      files: [
        'test/unit/client/test_index',
        'test/unit/both/test_something',
      ],
      mochaCss: '../../dist/mocha.css'
    }
  };
</script>

<script data-main='setup.js' src="../../bower_components/requirejs/require.js"></script>
```

The test file files themselves are easy:

```javascript
// basic boilerplate so this file runs client and server
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['thehelp-test', '../../../src/both/something'], function(test, something) {
  'use strict';

  var expect = test.expect;

  describe('something', function() {
    it('covered should return 20', function() {
      expect(something.covered()).to.equal(20);
    });
  });
});
```

For all the details and a working example, take a look at the integration tests under 'test/integration' in this project.

## Advanced Config

You've got a few more options than just `files` and `mochaCss` on the client side. Here are the complete set of options:

```
window.thehelp = {
  test: {
    // these two are required:
    files: ['the', 'test', 'file', 'paths', 'for', 'requirejs'],
    mochaCss: 'path to mocha.css',

    // optional blanket options, defaults are:
    blanket: {
      filter: '/src/',
      antifilter: '["/bower_components/", "node_modules", "/test/","/lib/"]'
    },

    // optional, defaults to true, for code coverage in browser
    coverage: false

    // optional, defaults to false, auto-starting tests on load
    waitToRun: true
  }
}
```

Lastly, you can set the environment variable `THEHELP_TEST_LEVEL` to customize the winston logging level for your tests. It defaults to 'info.'

## Detailed Docs

Detailed docs be found at this project's GitHub Pages, thanks to `groc` and `thehelp-project`: [http://thehelp.github.io/test/](http://thehelp.github.io/test/). A good place to start is [`thehelp-test-harnest`](http://thehelp.github.io/test/src/client/thehelp-test/harness.html).

## Contributing changes

The end-to-end tests under 'test/integration' will be your friend. :0) It will help you ensure that the client-side part of this library is working properly. Use `grunt connect:keepalive` to test it in your browser.

Please cover as many browsers as you can, or use `grunt cross-browser` with your [Sauce Credentials in env.json](https://github.com/thehelp/client-project). When you have some changes ready, please submit a pull request with:

* Justification - why is this change worthwhile? Link to issues, use code samples, etc.
* Documentation changes for your code updates. Be sure to check the groc-generated HTML with `grunt doc`
* A description of how you tested the change. Don't forget about the very-useful `npm link` command :0)

I may ask you to use a `git rebase` to ensure that your commits are not interleaved with commits already in the history. And of course, make sure `grunt` completes successfully. :0)

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
