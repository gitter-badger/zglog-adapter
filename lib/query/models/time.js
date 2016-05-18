module.exports.key = function(model){ return {keyword:model}; },
module.exports.range = function(model){ return {from:model.from, to: model.to}; }