var model = require('./models');
module.exports = function(){
   return {
      native: function(){ return model.select.native; },
      custom: function(keys){ return model.select.custom(keys); }
   };
};