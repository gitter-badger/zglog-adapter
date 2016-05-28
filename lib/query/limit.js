var model = require('./models');
module.exports = function(limit){
	return model.limit(limit);
}