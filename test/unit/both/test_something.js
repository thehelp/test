
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['thehelp-test', '../../../src/both/something'], function(test, something) {
  'use strict';

  var expect = test.expect;

  describe('both/something', function() {

    it('covered should return 20', function() {
      if (typeof console !== 'undefined') {
        console.log('something test');
      }
      expect(something.covered()).to.equal(20);
    });

  });

});
