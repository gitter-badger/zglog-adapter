var _ = require('type-util');
module.exports = function(crit){  
  console.log('criteria ---->', crit);
  var where = {'or':[], 'and':[]};
  if(_.isString(crit)) return { exists: crit}
  if(_.isObject(crit)){
     for(key in crit){
        var temp = {}; temp[key] = crit[key];
        where.and.push(temp);
     }
  }
  if(_.isArray(crit)){
    for(i in crit){ 
         if(_.isString(crit[i])) where.or.push(crit[i]);
         if(_.isObject(crit[i])) {
          for(key in crit[i]) {
            if(key.toLowerCase() == 'and') { 
              for(j in crit[i][key]){
                 where.and.push(crit[i][key][j]);
              }
            }
            if(key.toLowerCase() == 'or') {
              for(j in crit[i][key]){
                 where.or.push(crit[i][key][j]);
              }
            }
            if(key.toLowerCase() != 'or' && key.toLowerCase() != 'and'){
              where.or.push(crit[i]);
            }
          }
         }
         if(_.isArray(crit[i])){
          console.log('isArray',crit[i]);
         }
    }
  }
  return _.lengthOf(where) > 0 ? where : undefined;
};
