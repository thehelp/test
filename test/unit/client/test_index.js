
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['thehelp-test'], function(test) {
  'use strict';

  var expect = test.expect;

  describe('client/thehelp-test', function() {

    it('should have five keys', function() {
      if (typeof console !== 'undefined') {
        console.log('five keys test');
      }
      expect(Object.keys(test)).to.have.length(5);
    });

  });

});
