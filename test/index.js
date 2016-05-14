var should = require("should"),
adapter = require('../index.js'),
tests = require('./case.js');
describe("zglog-adapter unit tests",function(){
  it("zglog-adapter Should be created",function(){
	   adapter = new adapter(tests.context,tests.opts);
	   adapter.should.have.property('context' && 'configs' && 'host' && 'port' && 'log' && 'extend');
  });
});

