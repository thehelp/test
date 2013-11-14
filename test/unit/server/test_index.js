
'use strict';

var test = require('thehelp-test');

var expect = test.core.expect;

describe('server/thehelp-test', function() {

  it('should have property Headless', function() {
    expect(test).to.have.property('Headless');
  });

  it('should have property HeadlessMocha', function() {
    expect(test).to.have.property('HeadlessMocha');
  });

});
