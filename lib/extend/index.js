/*find(native)
getMessage(extended) : messages
getTerms(extended) : terms
getTermsClasses(extended) : terms_classifier
createWidget(extended) : create_widgets
getWidgets(extended) : widgets
removeWidgets(extended) : remove_widgets
getHistory(extended) : hitsory
getStats(extended) : stats
getTermsClassesStats(extended) : terms_class_stats
logManual(extened) : log_manual
select(extended) : select
where(extened) : where
time_range(extended) time_range@
Technical Requirements
1. functions chaining.
2. extended to native map.
3. function to model map.
4. basic select query model implementation on find(native).
5. basic select query model implementation on individual functions (extended).
*/
var query = require('../query');
var _ = require('ztypeutils');
module.exports = function(client, opt){
	//Additional Functions
   var methods = {
      register : function(form, callback){ 
        var url = getUrl(client.host,client.rbase);
        var obj = {form: form, method:"POST"};
        client._request(url,obj, function(err, res, data){ return callback(err ? err : null, data ? data : false); });
	  },
	  log : function(options){	return require('./log.js')(client, options);  },
	  hook : function(criteria, callback){ return callback(null, {hook:"Not Implemented", api_hooked:'http://cdn.example.com/alert'}); },
	  messages : function(criteria, callback){
	  	return callback(null, {messages:"Not Implemented", info:'returns the logs essages related to the source which is using this client'});
	  },
	  terms : function(criteria, callback){
	  	return callback(null, {terms:"Not Implemented", info:'returns the terms created through logs'});
	  },
	  fields_return : function(model, callback){
	  	 var select = [];
         select = model == undefined ? query.select().native() : query.select().custom(model);
         return _.isFunction(callback) ? callback(null, {select:"Not Implemented", info:'returns the messages with selected terms', model:select}) : select;
	  },
	  isSpecific_return : function(criteria, callback){
	  	var where = query.where(criteria);	
	  	return _.isFunction(callback) ? callback(null, {where:"Not Implemented", info:'returns the messages with selected terms', model:where}) : where;
	  },
      intime_return : function(criteria, callback){
      	var tr = query.time(criteria);
	  	return _.isFunction(callback) ? callback(null, {where:"Not Implemented", info:'returns the messages with selected terms', model:tr}) : tr;
	  },
	  type : function(criteria, callback){
	  	return callback(null, {select:"Not Implemented", info:'returns the messages with selected terms'});
	  },
	  history : function(criteria, callback){
	  	return callback(null, {history:"Not Implemented", info:'returns the history related to the request source query can be modified on the top'});
	  }
   };	
   return methods;
};
function getUrl(host, endPoint){
	return host+endPoint;
}