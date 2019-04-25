const assert = require('assert');
const expect = require('chai').expect;
const nock = require('nock');
const HttpClient = require('../index');

describe('HttpClient', function () {
    describe('#get()', function () {
        var res;
        before(async function () {
            nock('https://example.com')
                .get('/api/test')
                .reply(200, {
                    'data': 'hi'
                });
            res = await new HttpClient().get('https://example.com/api/test');
        })
        it('should be success', function () {
            assert.equal(res.success(), true);
        });
        it('res.json() should be return a JSON', function () {
            expect(res.json()).to.be.a('object');
        });
        it('res.raw() should return a String', function () {
            expect(res.raw()).to.be.a('string');
        });
        it('should return hi', function () {
            assert.equal(res.json().data, 'hi');
        });
    });


    describe('#post()', function () {
        var res;
        before(async function () {
            nock('https://example.com')
                .post("/api/test", "key=value")
                .reply(200, {
                    'data': 'hi'
                });
            res = await new HttpClient().post('https://example.com/api/test', {
                "key": "value"
            });
        })
        it('should be success', function () {
            assert.equal(res.success(), true);
        });
        it('res.json() should be return a JSON', function () {
            expect(res.json()).to.be.a('object');
        });
        it('res.raw() should return a String', function () {
            expect(res.raw()).to.be.a('string');
        });
        it('should return hi', function () {
            assert.equal(res.json().data, 'hi');
        });
    });
});