var _ = require('type-util');
module.exports.native = function() { return ['request', 'response', 'request_body','response_body', 'type','level', 'http_client_ip', 'headers']; }
module.exports.custom = function(model){
   var custom = [];
   if(_.isString(model) != true) for(i in model) custom.push(_.isArray(model) ? model[i] : model[i] == true ? i : null);
   if(_.isString(model) == true) custom.push(model);
   return _.compact(custom);
};