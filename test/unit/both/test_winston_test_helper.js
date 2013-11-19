
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['thehelp-test'], function(test) {
  'use strict';

  var expect = test.core.expect;
  var WinstonTestHelper = test.WinstonTestHelper;

  describe('both/WinstonTestHelper', function() {
    var helper;

    before(function() {
      helper = new WinstonTestHelper();
    });

    it('should have property error', function() {
      expect(helper).to.have.property('error');
    });

    it('should have property info', function() {
      expect(helper).to.have.property('info');
    });

    it('should have property warn', function() {
      expect(helper).to.have.property('warn');
    });

    it('should have property debug', function() {
      expect(helper).to.have.property('debug');
    });

    it('should have property verbose', function() {
      expect(helper).to.have.property('verbose');
    });

  });

});
