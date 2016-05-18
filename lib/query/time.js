var model = require('./models');
var _ = require('type-util');
module.exports = function(crit){
   if(_.isString(crit)) return model.time.key(crit);
   if(_.isObject(crit)) return model.time.range(crit);
};