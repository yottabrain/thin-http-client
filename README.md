[![Build Status](https://travis-ci.org/yottabrain/thin-http-client.svg?branch=master)](https://travis-ci.org/yottabrain/thin-http-client) [![version](https://img.shields.io/npm/v/@yottabrain/thin-http-client.svg)](https://www.npmjs.com/package/@yottabrain/thin-http-client) [![Coverage Status](https://coveralls.io/repos/github/yottabrain/thin-http-client/badge.svg)](https://coveralls.io/github/yottabrain/thin-http-client)

# thin-http-client

- It is wrapper around the default node libraries http and https
- As name says it is a thin and it does not have any dependencies
- Can be used with async/await or promise

## Install

```
npm install @yottabrain/thin-http-client
```

## Usage

### Include HttpClient

``` javascript
const HttpClient = require('@yottabrain/thin-http-client');
```

### Invoke GET method

``` javascript
const ENDPOINT = "https://example.com/api/someapi";

let res = await new HttpClient().get(ENDPOINT);
```

### Invoke Post method

``` javascript
let body = {"key": "value"};
let res = await new HttpClient().post(ENDPOINT, body);
```

### Response 
``` javascript
# Check http status code is 200
console.log(res.success());

# Raw response body
console.log(res.raw());

# Response body as JSON
console.log(res.json());

#  Original response object provided by Node http/https module
console.log(res.response());
```

### Call API with Encoding and headers

``` javascript
let res = await new HttpClient().setEncoding('UTF-8').setHeaders({ "Authorization": token }).get(ENDPOINT);
```

### Set HTTP options

You can set the node module http/https options in constructor.
Refer this link for the list of options
https://nodejs.org/api/http.html#http_http_request_options_callback

``` javascript
let options = {
    auth: 'user1:pwd123'
}
let res = await new HttpClient(options).get(ENDPOINT);
```

### Using promise instead of await

``` javascript
new HttpClient().get(ENDPOINT).then(res => {
    
});
```

### Enable debug logs

``` javascript
await new HttpClient().debug(true).get(ENDPOINT);
```