# zglog-adapter
[version-svg]:(https://img.shields.io/npm/v/zglog-adapter.svg?style=flat-square)

##DESCRIPTION
zglog-adapter is build to use in enoa-client for the purpose of logging the http request, response and get the logged messages, terms, or analytics related to terms.

## Installation

npm install zglog-adapter

##FEATURES
1. LOG MESSAGES
2. GET LOGGED MESSAGES
3. GET CREATED TERMS
4. GET CREATED CLASSES
5. GET HISTORY


#####Note: in this version log function is availible

## Usage
As this adapter is built to use for enoa-client include it in the client, after include it as a middleware for express framework e.g. app.use(client.log()).
if you want to log manually requests just call the function client.log(params) and pass request and response objects as parameters.

## License
MIT
