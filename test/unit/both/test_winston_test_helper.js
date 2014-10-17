
if (typeof define !== 'function') {
  var define = require('amdefine')(module);
}

define(['thehelp-test'], function(test) {
  'use strict';

  var sinon = test.sinon;
  var expect = test.expect;
  var WinstonTestHelper = test.WinstonTestHelper;

  describe('both/WinstonTestHelper', function() {
    var helper;

    before(function() {
      helper = new WinstonTestHelper({showLogs: true});
    });

    it('should have property verbose', function() {
      expect(helper).to.have.property('verbose');
      helper.verbose('verbose text');
      expect(helper).to.have.deep.property('verbose.callCount', 1);
    });

    it('should have property info', function() {
      expect(helper).to.have.property('info');
      helper.info('info text');
      expect(helper).to.have.deep.property('info.callCount', 1);
    });

    it('should have property warn', function() {
      expect(helper).to.have.property('warn');
      helper.warn('warn text');
      expect(helper).to.have.deep.property('warn.callCount', 1);
    });

    it('should have property error', function() {
      expect(helper).to.have.property('error');
      helper.error('error text');
      expect(helper).to.have.deep.property('error.callCount', 1);
    });
  });

  describe('both/WinstonTestHelper with winston', function() {
    var helper, winston;

    before(function() {
      winston = {
        verbose: sinon.stub(),
        info: sinon.stub(),
        warn: sinon.stub(),
        error: sinon.stub()
      };
      helper = new WinstonTestHelper({
        showLogs: true,
        winston: winston
      });
    });

    it('should have property verbose', function() {
      expect(helper).to.have.property('verbose');
      helper.verbose('verbose text');
      expect(helper).to.have.deep.property('verbose.callCount', 1);
      expect(winston).to.have.deep.property('verbose.callCount', 1);
    });

    it('should have property info', function() {
      expect(helper).to.have.property('info');
      helper.info('info text');
      expect(helper).to.have.deep.property('info.callCount', 1);
      expect(winston).to.have.deep.property('info.callCount', 1);
    });

    it('should have property warn', function() {
      expect(helper).to.have.property('warn');
      helper.warn('warn text');
      expect(helper).to.have.deep.property('warn.callCount', 1);
      expect(winston).to.have.deep.property('warn.callCount', 1);
    });

    it('should have property error', function() {
      expect(helper).to.have.property('error');
      helper.error('error text');
      expect(helper).to.have.deep.property('error.callCount', 1);
      expect(winston).to.have.deep.property('error.callCount', 1);
    });
  });

});
