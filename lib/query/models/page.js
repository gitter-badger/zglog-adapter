var _ = require('type-util');
module.exports = function(page){
    return _.isInt(page) ? (page - 1) * 12 + 1 : 1;
};