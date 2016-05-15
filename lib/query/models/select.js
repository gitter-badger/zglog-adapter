var _ = require('ztypeutils');
module.exports.native = function() { return ['request', 'response', 'request_body','response_body', 'type','level', 'http_client_ip', 'headers']; }
module.exports.custom = function(model){
   var custom = [];
   for(i in model) custom.push(_.isArray(model) ? model[i] : model[i] == true ? i : null);
   return _.compact(custom);
};