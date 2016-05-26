var query = require('../query');
var _ = require('type-util');
// module.exports = function(client, opt){
//  //Additional Functions
//    var methods = {
//       register : function(form, callback){ 
//         var url = getUrl(client.host,client.rbase);
//         var obj = {form: form, method:"POST"};
//         client._request(url,obj, function(err, res, data){ return callback(err ? err : null, data ? data : false); });
//    },
//    log : function(options){  return require('./log.js')(client, options);  },
//    hook_lower : function(criteria/*, callback*/){ return callback(null, {hook:"Not Implemented", api_hooked:'http://cdn.example.com/alert'}); },
//    messages : function(criteria/*, callback*/){
//      return this;
//      // return callback(null, {messages:"Not Implemented", info:'returns the logs essages related to the source which is using this client'});
//    },
//    terms_lower : function(criteria/*, callback*/){
//      // return callback(null, {terms:"Not Implemented", info:'returns the terms created through logs'});
//      return this;
//    },
//    select_lower : function(model/*, callback*/){
//       // fields_return
//       var select = [];
//          select = model == undefined ? query.select().native() : query.select().custom(model);
//          return this;
//          // return _.isFunction(callback) ? callback(null, {select:"Not Implemented", info:'returns the messages with selected terms', model:select}) : select;
//    },
//    where_lower : function(criteria/*, callback*/){
//      // isSpecific_return
//      var where = query.where(criteria);  
//      return this;
//      // return _.isFunction(callback) ? callback(null, {where:"Not Implemented", info:'returns the messages with selected terms', model:where}) : where;
//    },
//       time_lower : function(criteria/*, callback*/){
//        // intime_return
//        var tr = query.time(criteria);
//        return this;
//      // return _.isFunction(callback) ? callback(null, {where:"Not Implemented", info:'returns the messages with selected terms', model:tr}) : tr;
//    },
//    type_lower : function(criteria/*, callback*/){
//      return this;
//      // return callback(null, {select:"Not Implemented", info:'returns the messages with selected terms'});
//    },
//    history_lower : function(criteria/*, callback*/){
//      return this;
//      // return callback(null, {history:"Not Implemented", info:'returns the history related to the request source query can be modified on the top'});
//    }
//    };  
//    return methods;
// };
// module.exports = methods = function(client, opt){
//  this.client = client;
//  this.opt = opt;
// };
// methods.prototype.register = function(form, callback){
//  var _self = this;
//  var url = getUrl(client.host,client.rbase);
//     var obj = {form: form, method:"POST"};
//     _self.client._request(url,obj, function(err, res, data){ return callback(err ? err : null, data ? data : false); });
// };
// methods.prototype.log = function(options){ return require('./log.js')(client, options);  },
// methods.prototype.hook = function(criteria, callback){ return callback(null, {hook:"Not Implemented", api_hooked:'http://cdn.example.com/alert'}); },
// methods.prototype.messages = function(criteria, callback){
//     return callback(null, {messages:"Not Implemented", info:'returns the logs essages related to the source which is using this client'});
// };
// methods.prototype.terms = function(criteria, callback){
//  return callback(null, {terms:"Not Implemented", info:'returns the terms created through logs'});
// };
// methods.prototype.select = function(model, callback){
//    // fields_return
//    var select = [];
//     select = model == undefined ? query.select().native() : query.select().custom(model);
//     return _.isFunction(callback) ? callback(null, {select:"Not Implemented", info:'returns the messages with selected terms', model:select}) : select;
// };
// methods.prototype.where = function(criteria, callback){
//  // isSpecific_return
//  var where = query.where(criteria);  
//  return _.isFunction(callback) ? callback(null, {where:"Not Implemented", info:'returns the messages with selected terms', model:where}) : where;
// };
// methods.prototype.time = function(criteria, callback){
//  // intime_return
//  var tr = query.time(criteria);
//  return _.isFunction(callback) ? callback(null, {where:"Not Implemented", info:'returns the messages with selected terms', model:tr}) : tr;
// };
// methods.prototype.type = function(criteria, callback){
//  return callback(null, {select:"Not Implemented", info:'returns the messages with selected terms'});
// };
// methods.prototype.history = function(criteria, callback){
//  return callback(null, {history:"Not Implemented", info:'returns the history related to the request source query can be modified on the top'});
// };
// methods.prototype.construct = function(){ return this; };

// module.exports = Kitten = function(a, b) {
//   this.name = 'Garfield';
//   this.color = 'brown';
//   this.gender = 'male';
// };

// Kitten.prototype.setName = function(name) {
//   this.name = name;
//   return this;
// };

// Kitten.prototype.setColor = function(color) {
//   this.color = color;
//   return this;
// };

// Kitten.prototype.setGender = function(gender) {
//   this.gender = gender;
//   return this;
// };

// Kitten.prototype.save = function() {
//   console.log(
//     'saving ' + this.name + ', the ' +
//     this.color + ' ' + this.gender + ' kitten...'
//   );

//   // save to database here...

//   return this;
// };

// this._select = '';
//   this._where = '';
//   this._time = '';
//   this._req_obj = '';
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
  this._select = model == undefined ? query.select().native() : query.select().custom(model);
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

_extend.prototype.type = function(criteria) {
  this.type = "NotImplemented yet";   
  return this;
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