// # thehelp-test-coverage
// This is the file that pulls in all the right components
// to enable code coverage for a requirejs-based mocha test run.

define([
  'thehelp-test',
  'falafel',
  'blanket',
  'blanket-require'
],
  function(
    test,
    falafel,
    blanket,
    blanketRequire
  ) {
  'use strict';

  return {
    falafel: falafel,
    blanket: blanket,
    blanketRequire: blanketRequire
  };
});
