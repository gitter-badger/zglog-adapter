module.exports.key = function(model){ return {keyword:model.key || model.keyword}; },
module.exports.range = function(model){ return {time_range:{from:model.time.from, to: model.time.to}}; }