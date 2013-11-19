
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['thehelp-test'], function(test) {
  'use strict';

  var expect = test.core.expect;
  var GeneralTestHelper = test.GeneralTestHelper;

  describe('both/GeneralTestHelper', function() {
    var helper;

    before(function() {
      helper = new GeneralTestHelper();
    });

    it('should have property checkError', function() {
      expect(helper).to.have.property('checkError');
    });

    it('should have property reset', function() {
      expect(helper).to.have.property('reset');
    });

  });

});
