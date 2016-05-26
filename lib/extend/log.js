'use strict';
module.exports = log;

var debug = require('debug')
  , utils = require('./utils')
  , request = require('request')
  , onHeaders = require('on-headers')
  , onFinished = require('on-finished')
  , conf = require('../../conf')
  ;

function log(creds, options, request){
  var base = {input:creds.ibase};
  var opts = options || {};
  var immediate = opts.immediate;
  var sURL = creds.host;
  if(!sURL) throw new Error('Define server url first');
  var skip = opts.SKIP || false;
  var skipCode = opts.SKIP_CODE || false;
  return function logger(req, res, next){
    var pre_write = res.write,
        pre_end = res.end;
    var data = [];
    res.write = function (chunk) {
      data.push(chunk);
      pre_write.apply(res, arguments);
    };
   res.end = function (chunk) {
        if (chunk) data.push(chunk);
        res.body = getBody(res, data);
        pre_end.apply(res, arguments);
      req._startAt = undefined
      req._startTime = undefined
      req._remoteAddress = getip(req)
      // req._tags = getTags(req, options.TAGS)
      // response data
      res._startAt = undefined
      res._startTime = undefined
      // record request start
      recordStartTime.call(req)
      if(immediate) { logRequest(); }
      else {
        onFinished(res, logRequest);
        onHeaders(res, recordStartTime);
      }
      function logRequest(){
        if(skipCode){
          if(utils.compair(res.statusCode, skipCode))
          return next();
        }
        else if(skip /*&& skip[path]*/){
          if(utils.typeof(skip) == 'function' && skip(req, res)) return next();
          else{
            var path = (req.route) ? req.route.path : req.path;
            var sObj = skip[path];
            if(utils.typeof(sObj) == 'bool' && sObj) return next();
            if( utils.isObject(sObj)){
              var _rslt = [], opr = (sObj.OPR||'').toUpperCase() || 'OR';
              if( sObj.CODE ) _rslt.push( utils.compair(res.statusCode, sObj.CODE) );
              if( sObj.METHOD ){ _rslt.push( utils.compair(req.method, sObj.METHOD) );}          
              if(opr == 'OR' && utils.OR(_rslt, true)) return next();
              else if(utils.AND(_rslt, false)) return next();
            }          
          }
        }
        if(opts.debug){
          console.log('log: ', path, res.statusCode, req.params, req.query);
          return;
        }
        if(res.body != 404) _process({req:req, res:res, base: base}, creds, opts);
      }
      };

      next();
  }

}

function _process(obj, creds, options){
  var base = obj.base;
 // try{
   var mbody = {};
   mbody.msg = {
     response:obj.res.statusCode != 304 ? JSON.parse(obj.res.body) : undefined,
     request:{
       body:{
         body:obj.req.body, 
         query:obj.req.query,
         params:obj.req.params
       }
       , ipxf:xforwardip(obj.req)
       , headers: obj.req.headers
       , ip:obj.req._remoteAddress
       , timestamp:new Date().toISOString()
       , tags:getTags(obj.req, options.TAGS)
       , route:(obj.req.route) ? obj.req.route : {path:obj.req.path}
     }
   };
   mbody.token = creds.configs.apiKey;
   mbody.app_id = creds.configs.appId;
   // /*STUB*/ 
   // //165.139.149.169, 83.110.10.20, 66.248.160.0, 195.94.0.0, 31.31.176.0, 196.44.191.255, 196.46.192.0
   // mbody.msg.request.ipxf = '196.46.192.0'; 
   // /*STUB*/ 
   mbody.code = mbody.msg.mcode = parseInt(obj.res.statusCode);
   mbody = ext(obj, mbody);
   request({form:mbody, url:creds.host+base.input, timeout:creds.configs.timeout, method:"POST"}, function(err,res, data){  console.log(err ? err: data ? data : 'empty');  });
 // } catch(e) { throw e; }
}

function ext(obj, mObj){
   for(var v in obj){ if(conf.CB_CRITERIA[v] === obj[v]) mObj[v] = conf.CB_CRITERIA[v].valid(obj[v]);   }
   for(var index in conf.EXEC_CRITERIA.CONFIGURED){  mObj[conf.EXEC_CRITERIA.CONFIGURED[index]] = true; }
   return mObj;
};

/**
 * Record the start time.
 * @private
 */

function recordStartTime() {
  this._startAt = process.hrtime()
  this._startTime = new Date()
}

/**
 * Get request IP address.
 *
 * @private
 * @param {IncomingMessage} req
 * @return {string}
 */

function getip(req) {
  return req.ip
    || req._remoteAddress
    || (req.connection && req.connection.remoteAddress)
    || undefined;
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

function getBody(res, data){
  if(typeof data[0] == 'string') return data[0].split(' ')[0] != 'Cannot' ? Buffer.concat(data).toString('utf8') : 404;
  if(typeof data[0] != 'string') return Buffer.concat(data).toString('utf8');
}