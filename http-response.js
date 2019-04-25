module.exports = class HttpResponse {
  constructor(httpResponse, body) {
    this.httpResponse = httpResponse;
    this.body = body;
  }

  success() {
    return this.httpResponse.statusCode == 200;
  }

  raw() {
    return this.body;
  }

  json() {
    return JSON.parse(this.body);
  }

  response() {
    return this.httpResponse;
  }
};