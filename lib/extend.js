module.exports = function(client, opt){
	//Additional Functions
   var methods = {
      register : function(form, callback){ 
        var url = getUrl(client.host,client.rbase);
        var obj = {form: form, method:"POST"};
        client._request(url,obj, function(err, res, data){ return callback(err ? err : null, data ? data : false); });
	  },
	  log : function(options){
	  	return require('./log.js')(client, options); 
	  }, 
      getFacets: function(criteria, callback){
		return callback(null, [{"mobile":200, "apple":300, "computer":1122}]);
	  },
	  hook : function(criteria, callback){
	  	return callback(null, {hook:"Not Implemented", api_hooked:'http://cdn.example.com/alert'});
	  },
	  messages : function(criteria, callback){
	  	//message list
	  	return callback(null, {messages:"Not Implemented", info:'returns the logs essages related to the source which is using this client'});
	  },
	  terms : function(criteria, callback){
	  	//terms and classes of terms
	  	return callback(null, {terms:"Not Implemented", info:'returns the terms created through logs'});
	  },
	  select : function(criteria, callback){
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