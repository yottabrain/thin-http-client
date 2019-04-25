# Install

```
npm install @yottabrain\thin-http-client
```

# Usage

```
const httpClient = require('thin-http-client');

const ENDPOINT = "https://example.com/api/someapi";

# Call API : GET
let res = await new HttpClient().get(ENDPOINT);

# Call API : POST
let body = {"key": "value"};
let res = await new HttpClient().post(ENDPOINT, body);

# Original response object provided by Node http/https module
console.log(res.response());

# Is http status code is 200
console.log(res.success());

# Raw response body
console.log(res.raw());

# Response body as JSON
console.log(res.json());

# Call API with Encoding and headers

let res = await new HttpClient().setEncoding('UTF-8').setHeaders({ "Authorization": token }).get(ENDPOINT);

# Provide node http/https options in constructor
# Refer this link for the list of options
# https://nodejs.org/api/http.html#http_http_request_options_callback

let options = {
    auth: 'user1:pwd123'
}
let res = await new HttpClient(options).get(ENDPOINT);

```