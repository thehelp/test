
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
      helper = new WinstonTestHelper({showLogs: true});
    });

    it('should have property error', function() {
      expect(helper).to.have.property('error');
      helper.error('error text');
    });

    it('should have property info', function() {
      expect(helper).to.have.property('info');
      helper.info('info text');
    });

    it('should have property warn', function() {
      expect(helper).to.have.property('warn');
      helper.warn('warn text');
    });

    it('should have property verbose', function() {
      expect(helper).to.have.property('verbose');
      helper.verbose('verbose text');
    });

  });

});
