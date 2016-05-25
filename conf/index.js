//This Module is just a part
var _ = require('data_parser');
module.exports = obj = {
	ERRORS : {
		//[err][relation][subject][object type][this]
		"CON":"[ECON_CONNECTION_REFUSED][FOR][REQUEST][QUERY]"
	},
	PUBLISHER : {
		EXC : ['genders','mobile_codes','countries','states','pword'],
		ENC : ['id','state','country']
	},
	ASYNCLCODE :{
		TP:600, LC:601
	},
	//for Run time configurations
	//CALLBACK CRITERIA ----> run time changeable
	CB_CRITERIA  :{
		l : {type:'boolean', valid: (v) => { return v === true || v === false ? v : true; }},
		f : {url:''},
		sms:{number: '', rule:''},
        email:{email:'',rule:''},
        //classify, define, metadata, clientinfo 
	},
	//EXECUTION CRITERIA ---> static untill now
	EXEC_CRITERIA :{
		CONFIGURED: ['def','d','m'],
	    ALLOWED_CRIT : ['def','d','m','c','e','loc','save']
	}/*,
	LOGGER:{INC:{URL:require("./base.json").logger.inc}, INI:{URL:require("./base.json").logger.init}, SEARCH:{URL:require("./base.json").output.search}, AMQP: {URL: require("./base.json").input.amqp}, base :{URL:"http://192.168.0.5:9000/client"}}*/,
SEARCH:{
		select:{
			total_count:{type:"boolean", imp:"select"},
			unique_count:{type:"boolean", imp:"select"},
			percentage:{type:"boolean", imp:"select"},
			stats:{type:"boolean", imp:"select"},
			median:{type:"boolean", imp:"select"},
			compare:{type:"boolean", imp:"select"},
			data:[''],//this field shows that data is being selected as a field, and will be processed on server
			_preprocessor : function(data, model){ 
				var ret;
				if(_.isString(data) && model[data] != undefined) ret = data;  
				if(_.isArray(data)){
					ret = [];
					for(i in data){
						if(model[data[i]] != undefined) ret.push(data[i]);
					}
				}
				return _.lengthOf(ret) > 0 ? ret : false;
			}
		},
		where:{
			predefined:{
				type:{
	    	        alert:"1",critical:"2",error:"3",warning:"4",note:"5",information:"6", dubug:"7"
	            },
			    code:{
			    	possitive:'200', exception:'500', negative:'400',
			    }
			},
			runtime:[''],//classes , and key:value pairs and will be processed on server
			_preprocessor : function(data, model){
                if(_.isObject(data)) {
                	if(data.type != undefined && model.predefined.type[data.type] == undefined) delete data.type; else data.type = model.predefined.type[data.type];
                	if(data.code != undefined && model.predefined.code[data.code] == undefined) delete data.code; else data.code = model.predefined.code[data.code]; 
                }
               return data;
			}
		},
		time_range:{
		    allowed:{from:'datetime',to:'datetime'},
		    time:['last day','last week','last month','last year','today','yesterday'],
		    _preprocessor : function(data, model){
		    	var v = 0;
		    	for(i in data){
		    	   if(i != 'key'){
                     if(model.allowed[i] == undefined || (_.lengthOf(data[i].split('T')) != 2) || (_.lengthOf(data[i].split('T')[0].split('-')) != 3) || (_.lengthOf(data[i].split('T')[1].split(':')) != 3)) delete data[i];
                     else v++;
                   }

		    	}
		    	if(data.key){
		    		for(i in model.time){
		    			if(data.key.toLowerCase() == model.time[i]){ v++; break; }
		    		}
		    	}
		    	console.log('v',v);
		    	return v > 0 ? data : undefined;

		    }
		},
		exists:{
			model:true
		},
		type:{stat:true, term:true, message: false}//{stat:require('base.json').type.stat,term:require('base.json').type.term,message:require('base.json').type.message}

	}
};
//Three types of configs on the logger.input
//1. run-time configs(client-side configs)
//2. offline-configs(server-side configs)
//3. Usage Configs(API, Class) ---> also offline configs