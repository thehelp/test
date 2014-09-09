
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['thehelp-test'], function(test) {
  'use strict';

  var expect = test.expect;

  describe('both/thehelp-test', function() {
    it('should have property expect', function() {
      if (typeof console !== 'undefined') {
        console.log('expect test');
      }
      expect(test).to.have.property('expect');
    });

    it('should have property WinstonTestHelper', function() {
      expect(test).to.have.property('WinstonTestHelper');
    });

    it('should have property sinon', function() {
      expect(test).to.have.property('sinon');
    });

    it('should have property chai', function() {
      expect(test).to.have.property('chai');
    });

  });

});
