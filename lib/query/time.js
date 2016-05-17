var model = require('./models');
var _ = require('type-util');
module.exports = function(crit){
   if(_.isString(crit.time)) return model.time.key(crit);
   if(_.isObject(crit.time)) return model.time.range(crit);
};