module.exports = adapter;
var ibase = '/input';
var obase = '/output';
var rbase = '/gtV1.0';
var request = require('request');
function isArr(arr){ return Array.isArray(arr); }
function adapter(context, opts){
	if(validate(opts)){
		this.context = context;
		this.configs = opts;
		this._request = request;
		this.host = getHosts(opts);
		this.port = opts.port || 80;
		this.ibase = ibase;
		this.obase = obase;
		this.rbase = rbase;
		// this.context._request = function(obj, callback){ console.log('adapter function override'); return callback(); }
	}	
};

function validate(creds){
	if(!creds.host && !creds.ip) throw new Error("host or ip undefined");
	if(!creds.appId) throw new Error("appId IS REQUIRED");
	if(!creds.apiKey) throw new Error("apiKey IS REQUIRED");
	return true;	
}
function getHosts(creds){
	if(creds.maxHost){
		var hosts = [];
		for(var i =0; i< creds.maxHost; i++ ) hosts.push((creds.protocol || "http") +"://"+(creds.host||creds.ip||'cdn.zglog.com')+(creds.port? (":"+creds.port) : ""));
		return hosts;
    }
    return (creds.protocol || "http") +"://"+(creds.host||creds.ip||'cdn.zglog.com')+(creds.port? (":"+creds.port) : "");
}



adapter.prototype.create = function(obj, callback){ 
	obj.adopId = 'Zee';
	return this._request.get(obj, callback);
};

adapter.prototype.find = function(criteria, callback){ 
	//next_task ---> test log and then search function(for first commit log will be included)
	obj.adopId = 1122; return callback(null, obj); 
};
adapter.prototype.update = function(obj, callback){ obj.adopId = 1122; return callback(null, obj); };
adapter.prototype.delete = function(obj, callback){ obj.adopId = 1122; return callback(null, obj); };


adapter.prototype.extend = function(optional){
	var extend = require('./lib/extend.js')(this, optional);
	for(key in optional) 
		if(typeof optional[key] == 'function') 
			extend[key] = optional[key];
    return extend;  
};



function request(obj, callback){
	request(parser(obj), callback);
};
function parser(obj){
  var finalRequest = {};
  finalRequest.url = obj.params ? obj.url+obj.params : obj.url;
  for(key in obj.opts){ finalRequest[key] = obj.opts[key];   }
  finalRequest.method = obj.method;	
  finalRequest.qs = obj.qs;
  return bodyParser(finalRequest, obj);	
}
function bodyParser(finalRequest, obj){
  if(obj.method == "PUT" || obj.method == "POST") {
  	if(obj.formData) finalRequest.formData = obj.formData;
  	if(obj.multipart) finalRequest.multipart = obj.multipart;
  	if(obj.form) finalRequest.form = obj.form;
  	if(obj.body) finalRequest.body = obj.body;
  }
  return finalRequest;
}