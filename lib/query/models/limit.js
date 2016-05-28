var _ = require('type-util');
module.exports = function(limit){
    return _.isInt(limit) ? parseInt(limit) : 12;
};