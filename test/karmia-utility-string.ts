/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Import modules;
import KarmiaUtilityString = require("../");
const util = require("util");
const expect = require("expect.js");


// Test
describe('karmia-utility-string', function () {
    describe('isString', function () {
        describe('Should return true', function () {
            it('String literal', function () {
                const string = 'Hello, world.';
                expect(KarmiaUtilityString.isString(string)).to.be(true);
            });

            it('String object', function () {
                const string = new String('Hello, world.');
                expect(KarmiaUtilityString.isString(string)).to.be(true);
            });
        });

        describe('Should return false', function () {
            it('Number literal', function () {
                const number = 1;
                expect(KarmiaUtilityString.isString(number)).to.be(false);
            });

            it('Number object', function () {
                const number = new Number(1);
                expect(KarmiaUtilityString.isString(number)).to.be(false);
            });

            it('Object', function () {
                const object = {};
                expect(KarmiaUtilityString.isString(object)).to.be(false);
            });
        });
    });

    describe('strip', function () {
        it('Should strip whitespace', function () {
            const string = 'Hello, world.';
            expect(KarmiaUtilityString.strip(util.format('\t   %s   \r\n', string))).to.be(string);
        });

        it('Should strip specified character', function () {
            expect(KarmiaUtilityString.strip('abc', 'bad')).to.be('c');
        });

        it('Should strip left string', function () {
            const string = 'Hello, world.';
            expect(KarmiaUtilityString.lstrip(util.format('\t   %s   \r\n', string))).to.be(util.format('%s   \r\n', string));
        });

        it('Should strip right string', function () {
            const string = 'Hello, world.';
            expect(KarmiaUtilityString.rstrip(util.format('\t   %s   \r\n', string))).to.be(util.format('\t   %s', string));
        });
    });

    describe('trim', function () {
        it('Should trim whitespace', function () {
            const string = 'Hello, world.';
            expect(KarmiaUtilityString.trim(util.format('\t   %s   \r\n', string))).to.be(string);
        });

        it('Should trim specified character', function () {
            expect(KarmiaUtilityString.trim('abc', 'bad')).to.be('c');
        });

        it('Should trim left string', function () {
            const string = 'Hello, world.';
            expect(KarmiaUtilityString.ltrim(util.format('\t   %s   \r\n', string))).to.be(util.format('%s   \r\n', string));
        });

        it('Should trim right string', function () {
            const string = 'Hello, world.';
            expect(KarmiaUtilityString.rtrim(util.format('\t   %s   \r\n', string))).to.be(util.format('\t   %s', string));
        });
    });

    describe('normalize', function () {
        it('Should normalize string', function () {
            const string = '\u202b１２３\r\nＡＢＣ\rｄｅｆ\nｱｲｳｴｵｶﾞ',
                result = '123\nABC\ndef\nアイウエオガ';
            expect(KarmiaUtilityString.normalize(string, 'NFKC')).to.be(result);
        });
    });

    describe('unquote', function () {
        describe('Should unquote string', function () {
            it('Not quoted', function () {
                const string = 'Hello, world.';
                expect(KarmiaUtilityString.unquote(util.format('%s', string))).to.be(string);
            });

            it('Single quote', function () {
                const string = 'Hello, world.';
                expect(KarmiaUtilityString.unquote(util.format("'%s'", string))).to.be(string);
            });

            it('Double quote', function () {
                const string = 'Hello, world.';
                expect(KarmiaUtilityString.unquote(util.format('"%s"', string))).to.be(string);
            });
        });

        describe('Should not unquote string', function () {
            it('Not quoted', function () {
                const string = '"Hello," world.';
                expect(KarmiaUtilityString.unquote(util.format('%s', string))).to.be(string);
            });

            it('Mismatch', function () {
                const string = '"Hello, world.' + "'";
                expect(KarmiaUtilityString.unquote(util.format('%s', string))).to.be(string);
            });
        });
    });

    describe('zfill', function () {
        it('Should padding left with zero', function () {
            const number = 1;
            expect(KarmiaUtilityString.zfill(number, 0)).to.be('1');
            expect(KarmiaUtilityString.zfill(number, 1)).to.be('1');
            expect(KarmiaUtilityString.zfill(number, 2)).to.be('01');
            expect(KarmiaUtilityString.zfill(number, 3)).to.be('001');
            expect(KarmiaUtilityString.zfill(number, 4)).to.be('0001');
            expect(KarmiaUtilityString.zfill(number, 5)).to.be('00001');
        });
    });

    describe('camelCase', function () {
        it('Should convert from snake_case', function () {
            const from = 'snake_case_to_camel_case',
                to = 'snakeCaseToCamelCase';

            expect(KarmiaUtilityString.camelCase(from)).to.be(to.charAt(0).toLowerCase() + to.substring(1));
            expect(KarmiaUtilityString.camelCase(from, true)).to.be(to.charAt(0).toUpperCase() + to.substring(1));
        });

        it('Should convert from kebab-case', function () {
            const from = 'kebab-case-to-camel-case',
                to = 'kebabCaseToCamelCase';
            expect(KarmiaUtilityString.camelCase(from)).to.be(to.charAt(0).toLowerCase() + to.substring(1));
            expect(KarmiaUtilityString.camelCase(from, true)).to.be(to.charAt(0).toUpperCase() + to.substring(1));
        });
    });

    describe('snakeCase', function () {
        it('Should convert from camelCase', function () {
            const from = 'camelCaseToSnakeCase',
                to = 'camel_case_to_snake_case';
            expect(KarmiaUtilityString.snakeCase(from)).to.be(to);
        });

        it('Should convert from kebab-case', function () {
            const from = 'kebab-case-to-snake-case',
                to = 'kebab_case_to_snake_case';
            expect(KarmiaUtilityString.snakeCase(from)).to.be(to);
        });
    });

    describe('kebabCase', function () {
        it('Should convert from camelCase', function () {
            const from = 'camelCaseToKebabCase',
                to = 'camel-case-to-kebab-case';
            expect(KarmiaUtilityString.kebabCase(from)).to.be(to);
        });

        it('Should convert from snake_case', function () {
            const from = 'snake_case_to_kebab_case',
                to = 'snake-case-to-kebab-case';
            expect(KarmiaUtilityString.kebabCase(from)).to.be(to);
        });
    });

    describe('parse', function () {
        describe('Should parse string', function () {
            it('Set delimiter', function () {
                const string = 'key1=value1:key2=value2',
                    result = KarmiaUtilityString.parse(string, ':');
                expect(result.key1).to.be('value1');
                expect(result.key2).to.be('value2');
            });

            it('Set separator', function () {
                const string = 'key1:value1 key2:value2',
                    result = KarmiaUtilityString.parse(string, ' ', ':');

                expect(result.key1).to.be('value1');
                expect(result.key2).to.be('value2');
            });

            it('Parameter includes single quote', function () {
                const string = 'key1=value1, key2=value2, key3=value' + "'" + '3',
                    result = KarmiaUtilityString.parse(string);

                expect(result.key1).to.be('value1');
                expect(result.key2).to.be('value2');
                expect(result.key3).to.be('value' + "'" + '3');
            });

            it('Parameter includes double quote', function () {
                const string = 'key1=value1, key2=value2, key3=value"3',
                    result = KarmiaUtilityString.parse(string);

                expect(result.key1).to.be('value1');
                expect(result.key2).to.be('value2');
                expect(result.key3).to.be('value"3');
            });

            it('Empty string', function () {
                expect(KarmiaUtilityString.parse('')).to.eql({});
            });

            it('Authorize header', function () {
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
                    result = KarmiaUtilityString.parse(string);
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
            });
        });
    });

    describe('toBoolean', function () {
        it('Should be true', function () {
            expect(KarmiaUtilityString.toBoolean('true')).to.be(true);
            expect(KarmiaUtilityString.toBoolean('True')).to.be(true);
            expect(KarmiaUtilityString.toBoolean('TRUE')).to.be(true);
            expect(KarmiaUtilityString.toBoolean('true1')).to.be(false);
            expect(KarmiaUtilityString.toBoolean('false1')).to.be(false);
        });

        it('Should be false', function () {
            expect(KarmiaUtilityString.toBoolean('false')).to.be(false);
            expect(KarmiaUtilityString.toBoolean('False')).to.be(false);
            expect(KarmiaUtilityString.toBoolean('FALSE')).to.be(false);
        });

        it('Should not be true', function () {
            expect(KarmiaUtilityString.toBoolean(0)).to.be(false);
            expect(KarmiaUtilityString.toBoolean('')).to.be(false);
            expect(KarmiaUtilityString.toBoolean(false)).to.be(false);
        });

        it('Should not be false', function () {
            expect(KarmiaUtilityString.toBoolean(1)).to.be(true);
            expect(KarmiaUtilityString.toBoolean('0')).to.be(false);
            expect(KarmiaUtilityString.toBoolean(true)).to.be(true);
        });
    });
});
