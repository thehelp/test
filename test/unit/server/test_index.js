
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['thehelp-test'], function(test) {
  'use strict';

  var expect = test.core.expect;

  describe('server/thehelp-test', function() {

    it('should have property Headless', function() {
      expect(test).to.have.property('Headless');
    });

    it('should have property HeadlessMocha', function() {
      expect(test).to.have.property('HeadlessMocha');
    });

  });

});
