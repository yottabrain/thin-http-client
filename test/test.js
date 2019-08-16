/* eslint-env mocha */

const chai = require('chai')
const assert = require('assert')
const expect = require('chai').expect
const chaiAsPromised = require('chai-as-promised')
const nock = require('nock')
const { HttpClient } = require('../index')

chai.use(chaiAsPromised)

describe('HttpClient', function () {
  describe('#get()', function () {
    var res
    before(async function () {
      nock('https://example.com')
        .get('/api/test')
        .reply(200, {
          data: 'hi'
        })
      res = await new HttpClient().get('https://example.com/api/test')
    })
    it('should be success', function () {
      assert.strict.equal(res.success(), true)
    })
    it('res.json() should be return a JSON', function () {
      expect(res.json()).to.be.a('object')
    })
    it('res.raw() should return a String', function () {
      expect(res.raw()).to.be.a('string')
    })
    it('res.response() should return a Object', function () {
      expect(res.response()).to.be.a('object')
    })
    it('should return hi', function () {
      assert.strict.equal(res.json().data, 'hi')
    })
  })

  describe('#post()', function () {
    var res
    before(async function () {
      nock('https://example.com')
        .post('/api/test', 'key=value')
        .reply(200, {
          data: 'hi'
        })
      res = await new HttpClient().debug(true).post('https://example.com/api/test', {
        key: 'value'
      })
    })
    it('should be success', function () {
      assert.strict.equal(res.success(), true)
    })
    it('res.json() should be return a JSON', function () {
      expect(res.json()).to.be.a('object')
    })
    it('res.raw() should return a String', function () {
      expect(res.raw()).to.be.a('string')
    })
    it('res.response() should return a Object', function () {
      expect(res.response()).to.be.a('object')
    })
    it('should return hi', function () {
      assert.strict.equal(res.json().data, 'hi')
    })
  })
  describe('#post() with string', function () {
    before(function () {
      nock('https://example.com')
        .post('/api/test', 'string body')
        .reply(202, {
          data: 'hi'
        })
    })
    it('should be success', async () => {
      const res = await new HttpClient().debug(true).post('https://example.com/api/test', 'string body')
      assert.strict.equal(res.json().data, 'hi')
    })
  })
  describe('#setEncoding', function () {
    before(async function () {
      nock('http://example.com')
        .get('/api/test')
        .reply(200, {
          data: 'hi'
        })
    })
    it('should be success', async () => {
      const res = await new HttpClient().setEncoding('UTF-8').get('http://example.com/api/test')
      assert.strict.equal(res.success(), true)
    })
  })
  describe('#setHeader-and-emptyResponse', function () {
    before(async function () {
      nock('https://example.com')
        .get('/api/test')
        .reply(200)
    })
    it('should be success', async () => {
      const res = await new HttpClient().setHeaders({ Authorization: 'abc' }).get('https://example.com/api/test')
      console.log('RESPONSE', res.json())
      assert.strict.deepEqual(res.json(), {})
    })
  })
  describe('#ErrorHandling:withDebug', function () {
    before(async function () {
      nock('https://example.com')
        .get('/api/test')
        .replyWithError('something awful happened - as expected :-)')
    })
    it('should throw error', () => {
      const promise = new HttpClient().debug(true).get('https://example.com/api/test')
      expect(promise).to.eventually.be.rejectedWith(Error)
    })
  })
  describe('#ErrorHandling:WithoutDebug', function () {
    before(async function () {
      nock('https://example.com')
        .get('/api/test')
        .replyWithError(null)
    })
    it('should throw error', () => {
      const promise = new HttpClient().get('https://example.com/api/test')
      expect(promise).to.eventually.be.rejectedWith(Error)
    })
  })
})
