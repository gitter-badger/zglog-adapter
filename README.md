# zglog-adapter
[![Build Status](https://travis-ci.org/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/travis-ci/travis-web)


##DESCRIPTION
zglog-adapter is build to use in enoa-client for the purpose of logging the http request, response and get the logged messages, terms, or analytics related to terms.

## Installation

npm install zglog-adapter

## Usage
As this adapter is built to use for enoa-client include it in the client, after include it as a middleware for express framework e.g. app.use(client.log()).
if you want to log manually requests just call the function client.log(params) and pass request and response objects as parameters.

## License
MIT
