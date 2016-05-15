var model = require('./models');
var _ = require('ztypeutils');
module.exports = function(crit){ 	return model.where(crit); };