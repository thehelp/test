
'use strict';

var test = require('../../../src/server/index');
var expect = test.expect;

describe('server/thehelp-test', function() {

  it('should have four keys', function() {
    expect(Object.keys(test)).to.have.length(4);
  });

});
