# zglog-adapter
[![Version][version-svg]][package-url] [![Build Status][travis-svg]][travis-url] [![License][license-image]][license-url]  [![Downloads][downloads-image]][downloads-url][![ISSUES][issues-open]][issues-open][![FORKS][forks-url]][forks-url][![FORKS][stars-url]][stars-url]

[version-svg]: https://img.shields.io/npm/v/zglog-adapter.svg?style=flat-square
[package-url]: https://npmjs.org/package/zglog-adapter
[travis-svg]: https://img.shields.io/travis/Emallates/zglog-adapter/master.svg?style=flat-square
[travis-url]: https://api.travis-ci.org/Emallates/zglog-adapter.svg?branch=master
[license-image]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE.txt
[downloads-image]: https://img.shields.io/npm/dm/zglog-adapter.svg?style=flat-square
[downloads-url]: http://npm-stat.com/charts.html?package=zglog-adapter
[issues-open]:https://img.shields.io/github/issues/Emallates/zglog-adapter.svg
[forks-url]:https://img.shields.io/github/forks/Emallates/zglog-adapter.svg
[stars-url]:https://img.shields.io/github/stars/Emallates/zglog-adapter.svg

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
var adapter = require('zglog-adapter');
var config = {
	host:'127.0.0.1', 
	adapter:zgAdapter, 
	timeout:false, 
	port:9000,
	appId:'example_id',
	apiKey:'example_key'
};
```


## Overview

#### Features
LOG MESSAGES</br>
GET LOGGED MESSAGES</br>
GET CREATED TERMS</br>
GET CREATED CLASSES</br>
GET HISTORY</br>

#### Methods
 <b>register</b></br>
 <b>log</b></br>
 <b>find</b></br>

> **Note**
>
> advance functions will be included after a while, this will give you the overview  for >[enoa-client](https://github.com/Emallates/enoa-client) adapters and the functions related to the specific service.
>  
>

## Issues or Suggestions
As zglog-adapter is just an experimantal adapter for [enoa-client](https://github.com/Emallates/enoa-client), anybody who can build or contribute is welcome.


## License

**[MIT](./LICENSE)**
