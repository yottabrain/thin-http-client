'use strict'

const https = require('https')
const http = require('http')
const querystring = require('querystring')
const url = require('url')
const { HttpResponse } = require('./http-response')

const DEFAULT_ENCODING = 'utf8'

module.exports.HttpClient = class HttpClient {
  constructor (options) {
    this.options = options || {}
    this.isDebug = false
  }

  debug (isDebug) {
    this.isDebug = isDebug
    return this
  }

  setEncoding (encoding) {
    this.encoding = encoding
    return this
  }

  setHeaders (headers) {
    this.options.headers = headers
    return this
  }

  async request (endpoint, options, postBody) {
    // Pass endpoint directly e.g. http.request(endpoint, options, cb) once nodejs upgraded to v10
    this.options = { ...url.parse(endpoint), ...this.options, ...options }
    if (this.isDebug) console.log('options:', this.options)

    return new Promise((resolve, reject) => {
      const HTTP = endpoint.startsWith('https') ? https : http

      const req = HTTP.request(this.options, res => {
        if (this.isDebug) console.log('statusCode: ', res.statusCode)

        if (res.statusCode !== 200) {
          // reject(new Error(res.statusCode + ' ' + res.statusMessage));
        }

        res.setEncoding(this.encoding || DEFAULT_ENCODING)

        let body = ''
        res.on('data', chunk => {
          body += chunk
        })

        res.on('end', () => {
          if (this.isDebug) console.log('Response:', body)
          resolve(new HttpResponse(res, body))
        })
      }).on('error', err => {
        if (this.isDebug) console.error(`Error in API`, err)
        reject(err)
      })

      if (options.method === 'POST') {
        if (typeof postBody !== 'string') {
          postBody = querystring.stringify(postBody)
        }
        req.write(postBody)
      }

      req.end()
    })
  }

  async get (endpoint) {
    return this.request(endpoint, {
      method: 'GET'
    })
  }

  async post (endpoint, postBody) {
    return this.request(
      endpoint,
      {
        method: 'POST'
      },
      postBody
    )
  }
}
