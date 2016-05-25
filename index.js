module.exports = adapter;
var ibase = '/input';
var obase = '/output';
var rbase = '/gtV1.0';
var request = require('request');
var _ = require('type-util');
var extend = require('./lib/extend'); 
var util = require('./lib/util');

/*-------------------------CONSTRUCTOR--------------------------*/
function adapter(context, opts){
	if(util.validate(opts)){
		this.context = context;
		this.configs = opts;
		this._request = request;
		this.host = util.getHosts(opts);
		this.port = opts.port || 80;
		this.ibase = ibase;
		this.obase = obase;
		this.rbase = rbase;
	}
};

/*-------------------------PUBLIC-PROTO--------------------------*/
adapter.prototype.create = function(obj, callback){ 
	obj.adopId = 'Zee';
	return this._request.get(obj, callback);
};

adapter.prototype.update = function(obj, callback){ 
	obj.adopId = 1122; return callback(null, obj); 
};
adapter.prototype.delete = function(obj, callback){ 
	obj.adopId = 1122; return callback(null, obj); 
};
adapter.prototype.extend = function(optional){
	var ext = new extend(this, optional);
	for(key in optional) ext[key] = (typeof optional[key] == 'function') ? optional[key] : undefined;
    ext.find = find;
    ext.exec = util.exec;
    return ext;  
};

/*-------------------------PRIVATE-PROTO--------------------------*/
function find(criteria, callback){
	var _self = this;
	var query = {};
	query = _self.select(criteria.select).where(criteria.where).time(criteria.time);
	criteria.query = query; 
	return _.isFunction(callback) ?  this.exec(callback) : this; 
}
function request(obj, callback){ request(util.parser(obj), callback); };




