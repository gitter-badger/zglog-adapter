var request = require('request');
var conf = require('../conf');
var color = require('colors');
/**
 * Description : validator
 * @return treu | false
 */ 
var validate = function(creds){
  if(!creds.host && !creds.ip || (!creds.appId || !creds.apiKey)) throw new Error("Invalid Credatials or Credatials missing".red);
  return true;  
};
/**
 * Description : validator
 * @return treu | false
 */
var getHosts = function(creds){
  if(creds.maxHost){
    var hosts = [];
    for(var i =0; i< creds.maxHost; i++ ) hosts.push((creds.protocol || "http") +"://"+(creds.host||creds.ip||'cdn.zglog.com')+(creds.port? (":"+creds.port) : ""));
    return hosts;
    }
    return (creds.protocol || "http") +"://"+(creds.host||creds.ip||'cdn.zglog.com')+(creds.port? (":"+creds.port) : "");
};
var bodyParser = function(finalRequest, obj){
  if(obj.method == "PUT" || obj.method == "POST") {
    if(obj.formData) finalRequest.formData = obj.formData;
    if(obj.multipart) finalRequest.multipart = obj.multipart;
    if(obj.form) finalRequest.form = obj.form;
    if(obj.body) finalRequest.body = obj.body;
  }
  return finalRequest;
}
var parser = function(obj){
  var finalRequest = {};
  finalRequest.url = obj.params ? obj.url+obj.params : obj.url;
  for(key in obj.opts){ finalRequest[key] = obj.opts[key];   }
  finalRequest.method = obj.method; 
  finalRequest.qs = obj.qs;
  return bodyParser(finalRequest, obj); 
};
var Error = function(type, data){ return conf.ERRORS[type].bold.red+"[".red.bold+JSON.stringify(data).bold.green+"]".bold.red; };
var exec = function(callback){
  var _self = this;
  var qOBJ = {method:"GET",select: _self._select, where: _self._where, time:_self._time, page: _self._page || 1, limit:_self._limit || 12, url:_self.adapter.host+_self.adapter.obase};
  query(_self.adapter.context._sendRequest, qOBJ, callback);
};
function query(_sendRequest, query, callback){
  console.log(_prepost(query));
  _sendRequest(_prepost(query),
  function(err, res, data){
     var r = new RegExp('Cannot');
     if(err){ callback(util.Error("CON", err), false); return; }
     if(r.test(data)){ callback(Error("CON", data), false); return; }
     if(data) callback(null, data); 
  }); 
};
 function _prepost(query){
  query.form = {select: query.select, where: query.where, time: query.time, page:query.page, limit: query.limit};
    delete query.select; delete query.where; delete query.time; delete query.page; delete query.limit;
    return query;
 }
// function _request(obj, callback){ request(parser(obj), callback); };
module.exports = {
  validate: validate,
  getHosts: getHosts,
  bodyParser: bodyParser,
  parser: parser,
  Error: Error,
  exec: exec
}