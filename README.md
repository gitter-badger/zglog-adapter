# zglog-adapter
[![Version][version-svg]][package-url]&nbsp;[![Build Status][travis-svg]][travis-url]</br>[![ISSUES][issues-url]][issues-url]&nbsp;[![FORKS][forks-url]][forks-url]&nbsp;[![STARS][stars-url]][stars-url]&nbsp;[![Downloads][downloads-image]][downloads-url]</br>[![License][license-image]][license-url]

[version-svg]: https://img.shields.io/npm/v/zglog-adapter.svg?style=flat-square
[package-url]: https://npmjs.org/package/zglog-adapter
[travis-svg]: https://img.shields.io/travis/Emallates/zglog-adapter/master.svg?style=flat-square
[travis-url]: https://api.travis-ci.org/Emallates/zglog-adapter.svg?branch=master
[issues-url]:https://img.shields.io/github/issues/Emallates/zglog-adapter.svg?style=flat-square
[forks-url]:https://img.shields.io/github/forks/Emallates/zglog-adapter.svg?style=flat-square
[stars-url]:https://img.shields.io/github/stars/Emallates/zglog-adapter.svg?style=flat-square
[downloads-image]: https://img.shields.io/npm/dm/zglog-adapter.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=zglog-adapter
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/Emallates/zglog-adapter/master/LICENSE


zglog-adapter is just for experminetal purposes for [enoa-client](https://github.com/Emallates/enoa-client), you can log the http request, response and get the saved logged messages.

> **Note**
>
> `zglog-adapter` is build for [enoa-client](https://github.com/Emallates/enoa-client) just for experimental purposes.
>
>

## Table of Contents
[Prerequisites](#prerequisites)</br>
[Installation](#installation)</br>
[Configuration](#configuration)</br>
[Overview](#overview)</br>
[Issues or Suggestions](#issues-or-suggestions)</br>
[License](#license)


## Prerequisites
Clients should be registered with the regarding service

## Installation

Install stable version from NPM:
```
npm install zglog-adapter --save
```


## Configuration

zglog-adapter can be used with enoa-client, for more information on how to use enoa-client in your App view the [enoa-client](https://github.com/Emallates/enoa-client).


### zglog-adapter configuration

####Example

```javascript
var config = {
 collections:{
   zglog:{
	host:'192.168.0.1', 
	adapter:require('zglog-adapter'), 
	timeout:false, 
	port:9000,
	appId:'app_id',
	apiKey:'app_key'
   }
 }
};
var client = require('enoa-client')(config);
//client is initialized now
```
> **Note**
>
> method chaining and functions like messages, history etc. will be implemnted soon
>
>

### zglog-adapter log

####Example

```javascript
//express
express_app.use(client.log());
//normal use
client.log(//parameters)
```
### zglog-adapter find

####Example

```javascript
client.find({select:['client_ip','headers'], where:{userid:'254'}, time:{from:'2014-04-04T0.00Z', to:'2014-04-04T0.00Z'}}, callback);
```
### zglog-adapter select

####Example
returns selected fields
```javascript
//Note: Chaining will be implemented soon 
// e.g. client.select().where().time.range()
client.select(['client_ip','headers'], callback);
```
### zglog-adapter where

####Example
returns values based on the specific condition or value existance
```javascript
//Note: Chaining will be implemented soon 
// e.g. client.select().where().time.range()
client.where(['userid','pid'], callback)
// where useid and pid exists together
client.where([{'userid':12},{'pid':954}], callback)
client.where([{and:[{'userid':12},{'pid':954}]}], callback)
client.where([{or:[{'userid':12},{'pid':954}]}], callback)
```

### zglog-adapter time

####Example
returns values based on the specified time range
```javascript
client.time({from:'', to:''}, callback)
```

### zglog-adapter get messages

####Example

```javascript
//callback is a function with (err, data)
client.messages(optinal_query, callback);
//or
client.fields_return(fields, callback);
```


## Overview

#### Features
<ul>
<li><b>log Messages</b></li>
<li><b>get Messages</b></li>
<li><b>get Terms</b></li>
<li><b>get stats</b></li>
<li><b>get history</b></li>
</ul>


#### Methods
<ul>
 <li>register</li>
 <li>log</li>
 <li>find</li>
 <li>fields_return</li>
 <li>isSpecific_return</li>
 <li>intime_return</li>
 <li>history</li>
</ul>
> **Note**
>
> advance functions will be included after a while, this will give you the overview  for >[enoa-client](https://github.com/Emallates/enoa-client) adapters and the functions related to the specific service.
>  
>

## Issues or Suggestions
As zglog-adapter is just an experimantal adapter for [enoa-client](https://github.com/Emallates/enoa-client), anybody who can build or contribute is welcome.


## License

**[MIT](./LICENSE)**
