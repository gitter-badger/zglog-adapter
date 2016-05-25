var model = require('./models');
var _ = require('type-util');
module.exports = function(crit){ return model.where(crit); };