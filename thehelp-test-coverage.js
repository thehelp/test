// # thehelp-test-coverage
// This is the file that pulls in all the right components
// to enable code coverage for a requirejs-based mocha test run.

define([
  'blanket',
  'src/client/bridge'
], function(
  blanket
) {

  'use strict';

  return {
    blanket: blanket
  };
});
