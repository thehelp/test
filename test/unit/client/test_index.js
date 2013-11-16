
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['thehelp-test'], function(test) {
  'use strict';

  var expect = test.core.expect;

  describe('both/thehelp-test', function() {

    it('should have property mochaReporter', function() {
      expect(test).to.have.property('mochaReporter');
    });

  });

});
