
'use strict';

var test = require('thehelp-test');

var expect = test.core.expect;

describe('both/thehelp-test', function() {
  it('should have property core', function() {
    expect(test).to.have.property('core');
  });

  it('should have property GeneralTestHelper', function() {
    expect(test).to.have.property('GeneralTestHelper');
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
