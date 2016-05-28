var _ = require('type-util');
module.exports = function(criteria){
   var FROM = criteria.from, TO = criteria.to, KEY = criteria.key;
   criteria = {};
   if(_.isDate(FROM) && _.isDate(TO)) { 
   	  criteria.time = {};
   	  criteria.time.from = FROM;
   	  criteria.time.to = TO;
   } 
   if(KEY != undefined){
   	  if((_.isInt(FROM) || _.isFloat(FROM)) && (_.isInt(TO) || _.isFloat(TO))){
   	  	criteria[KEY] = [];
   	  	criteria[KEY].push(FROM);
   	  	criteria[KEY].push(TO);
   	  }
   }
   return criteria;
};