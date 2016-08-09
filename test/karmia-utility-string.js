/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/*jslint node: true, nomen: true */
/*global describe, it */
'use strict';


// Variables
var util = require('util'),
    expect = require('expect.js'),
    karmia_utility_string = require('../lib'),
    kstring = new karmia_utility_string();


// Test
describe('karmia-utility-string', function () {
    describe('trim', function () {
        it('Should trim whitespace', function () {
            const string = 'Hello, world.';
            expect(kstring.trim(util.format('\t   %s   \r\n', string))).to.be(string);
        });

        it('Should trim specified character', function () {
            expect(kstring.trim('abc', 'bad')).to.be('c');
        });

        it('Should trim left string', function () {
            const string = 'Hello, world.';
            expect(kstring.ltrim(util.format('\t   %s   \r\n', string))).to.be(util.format('%s   \r\n', string));
        });

        it('Should trim right string', function () {
            const string = 'Hello, world.';
            expect(kstring.rtrim(util.format('\t   %s   \r\n', string))).to.be(util.format('\t   %s', string));
        });
    });

    describe('normalize', function () {
        it('Should normalize string', function () {
            const string = '\u202b１２３\r\nＡＢＣ\rｄｅｆ\nｱｲｳｴｵｶﾞ',
                result = '123\nABC\ndef\nアイウエオガ';

            expect(kstring.normalize(string, 'NFKC')).to.be(result);
        });
    });

    describe('unquote', function () {
        describe('Should unquote string', function () {
            it('Not quoted', function (done) {
                const string = 'Hello, world.';

                expect(kstring.unquote(util.format('%s', string))).to.be(string);

                done();
            });

            it('Single quote', function (done) {
                const string = 'Hello, world.';
                expect(kstring.unquote(util.format("'%s'", string))).to.be(string);

                done();
            });

            it('Double quote', function (done) {
                const string = 'Hello, world.';
                expect(kstring.unquote(util.format('"%s"', string))).to.be(string);

                done();
            });
        });

        describe('Should not unquote string', function () {
            it('Not quoted', function (done) {
                const string = '"Hello," world.';

                expect(kstring.unquote(util.format('%s', string))).to.be(string);

                done();
            });

            it('Mismatch', function (done) {
                const string = '"Hello, world.' + "'";

                expect(kstring.unquote(util.format('%s', string))).to.be(string);

                done();
            });
        });
    });

    describe('zfill', function () {
        it('Should padding left with zero', function (done) {
            const number = 1;

            expect(kstring.zfill(number, '0')).to.be('1');
            expect(kstring.zfill(number, '1')).to.be('1');
            expect(kstring.zfill(number, '2')).to.be('01');
            expect(kstring.zfill(number, '3')).to.be('001');
            expect(kstring.zfill(number, '4')).to.be('0001');
            expect(kstring.zfill(number, '5')).to.be('00001');

            done();
        });
    });

    describe('parse', function () {
        describe('Should parse string', function () {
            it('Set delimiter', function (done) {
                const string = 'key1=value1:key2=value2',
                    result = kstring.parse(string, ':');

                expect(result.key1).to.be('value1');
                expect(result.key2).to.be('value2');

                done();
            });

            it('Set separator', function (done) {
                const string = 'key1:value1 key2:value2',
                    result = kstring.parse(string, ' ', ':');

                expect(result.key1).to.be('value1');
                expect(result.key2).to.be('value2');

                done();
            });

            it('Parameter includes single quote', function (done) {
                const string = 'key1=value1, key2=value2, key3=value' + "'" + '3',
                    result = kstring.parse(string);

                expect(result.key1).to.be('value1');
                expect(result.key2).to.be('value2');
                expect(result.key3).to.be('value' + "'" + '3');

                done();
            });

            it('Parameter includes double quote', function (done) {
                const string = 'key1=value1, key2=value2, key3=value"3',
                    result = kstring.parse(string);

                expect(result.key1).to.be('value1');
                expect(result.key2).to.be('value2');
                expect(result.key3).to.be('value"3');

                done();
            });

            it('Empty string', function (done) {
                expect(kstring.parse('')).to.eql({});

                done();
            });

            it('Authorize header', function (done) {
                const format = 'Digest username="%s", realm="%s", nonce="%s", uri="%s", ' +
                        'algorithm=%s, response="%s", qop=%s, nc=%s, cnonce="%s"',
                    username = 'USER_NAME',
                    realm = 'REALM',
                    nonce = 'NONCE',
                    uri = '/',
                    algorithm = 'MD5',
                    response = 'RESPONSE',
                    qop = 'auth',
                    nc = '00000001',
                    cnonce = 'CNONCE',
                    string = util.format(format, username, realm, nonce, uri, algorithm, response, qop, nc, cnonce),
                    result = kstring.parse(string);

                expect(result.Digest).to.be('Digest');
                expect(result.username).to.be(username);
                expect(result.realm).to.be(realm);
                expect(result.nonce).to.be(nonce);
                expect(result.uri).to.be(uri);
                expect(result.algorithm).to.be(algorithm);
                expect(result.response).to.be(response);
                expect(result.qop).to.be(qop);
                expect(result.nc).to.be(nc);
                expect(result.cnonce).to.be(cnonce);

                done();
            });
        });
    });

    describe('toBoolean', function () {
        it('Should be true', function () {
            expect(kstring.toBoolean('true')).to.be(true);
            expect(kstring.toBoolean('True')).to.be(true);
            expect(kstring.toBoolean('TRUE')).to.be(true);
            expect(kstring.toBoolean('true1')).to.be(true);
            expect(kstring.toBoolean('false1')).to.be(true);
        });

        it('Should be false', function () {
            expect(kstring.toBoolean('false')).to.be(false);
            expect(kstring.toBoolean('False')).to.be(false);
            expect(kstring.toBoolean('FALSE')).to.be(false);
        });

        it('Should not be true', function () {
            expect(kstring.toBoolean(0)).to.be(false);
            expect(kstring.toBoolean('')).to.be(false);
            expect(kstring.toBoolean(false)).to.be(false);
        });

        it('Should not be false', function () {
            expect(kstring.toBoolean(1)).to.be(true);
            expect(kstring.toBoolean('0')).to.be(true);
            expect(kstring.toBoolean(true)).to.be(true);
        });
    });
});
