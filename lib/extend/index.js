var query = require('../query');
var _ = require('type-util');
module.exports = _extend = function(client, opt) { 
  this.client = client;
  this.opt = opt;
};

//form required object send back the formed object execute according to that.
_extend.prototype.register = function(){
   this._request_obj = {form: form, method:"POST", url:getUrl(this.client.host,this.client.rbase)};
   return this; 
};

_extend.prototype.log = function(){ 
   
   return require('./log.js')(this.client, this.options, this.adapter.context._sendRequest); 
};

_extend.prototype.tlog = function(obj) {
   if(valid(obj)){
   var base = this.client.ibase;
   var mbody = {};
   mbody.msg = {
     response:{
        local : obj.response.statusCode != 304 ? JSON.parse(obj.response.body) : undefined
     },
     request:{
       body:{
         body:obj.request.body, 
         query:obj.request.query,
         params:obj.request.params
       }
       , ipxf:xforwardip(obj.request)
       , headers: obj.request.headers
       , ip:obj.request._remoteAddress
       , timestamp:new Date().toISOString()
       , tags: obj.options != undefined ? getTags(obj.request, obj.options.TAGS) : undefined
       , route:(obj.request.route) ? obj.request.route : {path:obj.request.path}
     }
   };
   if(obj.tpr) for(var key in obj.tpr){  mbody.msg.response[key] = obj.tpr[key];  }
   mbody.token = this.adapter.configs.apiKey;
   mbody.app_id = this.adapter.configs.appId;  
   mbody.code = mbody.msg.mcode = parseInt(obj.response.statusCode);
   mbody = ext(obj, mbody);
   this.client.context._sendRequest({form:mbody, url:this.adapter.host+base.input, timeout:this.adapter.configs.timeout, method:"POST"}, function(err,res, data){  console.log(err ? err: data ? data : 'empty');  });
 } else throw Error('invalid input');
};

_extend.prototype.select = function(model, opt) {
  var callback = opt;
  this._select = _.isEmpty(model) ? query.select().native() : query.select().custom(model);
  if(typeof opt != 'function') return this;
  this.exec(callback);
};

_extend.prototype.where = function(criteria, opt) {
  var callback = opt;
  this._where = query.where(criteria);  
  if(typeof opt != 'function') return this;
  this.exec(callback);
};

_extend.prototype.time = function(criteria, opt) {
  var callback = opt;
  this._time = query.time(criteria);
  if(typeof opt != 'function') return this;
  this.exec(callback);
};

_extend.prototype.range = function(criteria, opt) {
  var callback = opt;
  this._range = query.range(criteria);
  if(typeof opt != 'function') return this;
  this.exec(callback);
};

_extend.prototype.page = function(_page, opt) {
  var callback = opt;
  this._skip = query.page(_page);
  if(typeof opt != 'function') return this;
  this.exec(callback);
};

_extend.prototype.limit = function(_limit, opt) { 
  var callback = opt;
  this._limit = query.limit(_limit);
  if(typeof opt != 'function') return this;
  this.exec(callback);
};

_extend.prototype.hook = function(criteria) { 
  this.hook = "NotImplemented yet";
  return this;
};

_extend.prototype.messages = function(criteria) {
  this.messages = "NotImplemented yet";
  return this;
};

_extend.prototype.terms = function(criteria) {
  this.terms = "NotImplemented yet";  
  return this;
};

_extend.prototype.type = function(_type, opt) {
  var callback = opt;
  this._rtype = query.type(_type);
  if(typeof opt != 'function') return this;
  this.exec(callback);
};

_extend.prototype.history = function(criteria) {
  this.history = "NotImplemented yet";    
  return this;
};
_extend.prototype.connector = function() {
  console.log(this);
  // this._url =      
  return this;
};


_extend.prototype.save = function() {
  console.log(
    'saving ' + this._select + ', the ' +
    this._where + ' ' + this._time + ' query...'
  );

  // save to database here...

  return this;
};



function getUrl(host, endPoint){
  return host+endPoint;
}
function xforwardip(req){
    var ipAddress;
    var forwardedIpsStr = req.header('x-forwarded-for'); 
    if (forwardedIpsStr) {
      var forwardedIps = forwardedIpsStr.split(',');
      ipAddress = forwardedIps[0];
    }
    if (!ipAddress) {
      ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
}
function getTags(req, tags){
  tags = tags || {};
  return { splitter : tags.SPLITTER || '>',tags: tags[req.route.path || req.path] } || {};
}
function ext(obj, mObj){
   var conf = require('../../conf');
   for(var v in obj){ if(conf.CB_CRITERIA[v] === obj[v]) mObj[v] = conf.CB_CRITERIA[v].valid(obj[v]);   }
   for(var index in conf.EXEC_CRITERIA.CONFIGURED){  mObj[conf.EXEC_CRITERIA.CONFIGURED[index]] = true; }
   return mObj;
};
function valid(obj){
  return obj.request && obj.response && obj.tpr;
}