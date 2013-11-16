
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
