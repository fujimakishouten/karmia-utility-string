/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Variables
const util = require('util'),
    rewritePattern = require('regexpu-core'),
    others = new RegExp(rewritePattern('\\p{C}', 'ui', {unicodePropertyEscape: true}), 'g');


/**
 * KarmiaUtilityString
 *
 * @class
 */
class KarmiaUtilityString {
    /**
     * Constructor
     *
     * @constructs KarmiaUtilityString
     */
    constructor() {
        const self = this;

        self.isString = KarmiaUtilityString.isString;
        self.strip = KarmiaUtilityString.strip;
        self.lstrip = KarmiaUtilityString.lstrip;
        self.rstrip = KarmiaUtilityString.rstrip;
        self.trim = KarmiaUtilityString.trim;
        self.ltrim = KarmiaUtilityString.ltrim;
        self.rtrim = KarmiaUtilityString.rtrim;
        self.normalize = KarmiaUtilityString.normalize;
        self.unquote = KarmiaUtilityString.unquote;
        self.zfill = KarmiaUtilityString.zfill;
        self.camelCase = KarmiaUtilityString.camelCase;
        self.snakeCase = KarmiaUtilityString.snakeCase;
        self.kebabCase = KarmiaUtilityString.kebabCase;
        self.parse = KarmiaUtilityString.parse;
        self.toBoolean = KarmiaUtilityString.toBoolean;
    }

    /**
     * Check is string
     *
     * @param   {*} value
     * @returns {boolean}
     */
    static isString(value) {
        return (Object.prototype.toString.call(value) === '[object String]');
    }

    /**
     * Strip string
     *
     * @param   {string} string
     * @param   {string} mask_characters
     * @returns {string}
     */
    static strip(string, mask_characters) {
        mask_characters = mask_characters || ' \t\n\r\0\x0B';

        return string.replace(new RegExp(util.format('^[%s]+|[%s]+$', mask_characters, mask_characters), 'g'), '');
    }

    /**
     * Strip left string
     *
     * @param   {string} string
     * @param   {string} mask_characters
     * @returns {string}
     */
    static lstrip(string, mask_characters) {
        mask_characters = mask_characters || ' \t\n\r\0\x0B';

        return string.replace(new RegExp(util.format('^[%s]+', mask_characters), 'g'), '');
    }

    /**
     * Strip right string
     *
     * @param   {string} string
     * @param   {string} mask_characters
     * @returns {string}
     */
    static rstrip(string, mask_characters) {
        mask_characters = mask_characters || ' \t\n\r\0\x0B';

        return string.replace(new RegExp(util.format('[%s]+?$', mask_characters), 'g'), '');
    }

    /**
     * Alias to strip
     *
     * @param string
     * @param mask_characters
     * @returns {string}
     */
    static trim(string, mask_characters) {
        return KarmiaUtilityString.strip(string, mask_characters);
    }

    /**
     * Alias to lstrip
     *
     * @param string
     * @param mask_characters
     * @returns {string}
     */
    static ltrim(string, mask_characters) {
        return KarmiaUtilityString.lstrip(string, mask_characters);
    }

    /**
     * Alias to rstrip
     *
     * @param string
     * @param mask_characters
     * @returns {string}
     */
    static rtrim(string, mask_characters) {
        return KarmiaUtilityString.rstrip(string, mask_characters);
    }

    /**
     * Normalize string
     *
     * @param   {string} string
     * @param   {string} form
     * @returns {string}
     */
    static normalize(string, form) {
        const lines = string.split(/\r\n|\r|\n/).map(function (line) {
                return line.replace(others, '');
            });

        return KarmiaUtilityString.strip(lines.join('\n').normalize(form || 'NFKC'));
    }

    /**
     * Unquote string
     *
     * @param   {string} string
     * @returns {string}
     */
    static unquote(string) {
        const first = string.charAt(0),
            last = string.charAt(string.length - 1);
        if (('"' === first && '"' === last) || ("'" === first && "'" === last)) {
            return string.substring(1, string.length - 1);
        }

        return string;
    }

    /**
     * pads string on the left with zeros
     *
     * @param   {string} number
     * @param   {number} width
     * @param   {string} encoding
     * @returns {string}
     */
    static zfill(number, width, encoding) {
        if (width < 1) {
            return number.toString(encoding);
        }

        return ('0'.repeat(width) + number.toString(encoding)).slice(width * -1);
    }

    /**
     * Convert from kebab-case/snake_case to camelCase
     *
     * @param   {string} words
     * @param   {boolean} capitalize
     * @returns {string}
     */
    static camelCase(words, capitalize) {
        const result = words.split(/[-_]/).map(function (word) {
            return word.charAt(0).toUpperCase() + word.substring(1);
        }).join('');

        if (capitalize) {
            return result.charAt(0).toUpperCase() + result.substring(1);
        }

        return result.charAt(0).toLowerCase() + result.substring(1);
    }

    /**
     * Convert from camelCase/kebab-case to snake_case
     *
     * @param   {string} words
     * @returns {string}
     */
    static snakeCase(words) {
        const result = words.charAt(0).toLowerCase() + words.substring(1).replace(/-/g, '_');

        return result.replace(/[A-Z]/g, '_$&').toLowerCase();
    }

    /**
     * Convert from camelCase/snake_case to kebab-case
     *
     * @param   {string} words
     * @returns {string}
     */
    static kebabCase(words) {
        const result = words.charAt(0).toLowerCase() + words.substring(1).split('_').join('-');

        return result.replace(/[A-Z]/g, '-$&').toLowerCase();
    }

    /**
     * Parse "key1=value1, key2=value2" formatted string
     *
     * @param   {string} string
     * @param   {string|regexp} delimiter
     * @param   {string|regexp} separator
     * @param   {string} encoding
     * @returns {Object}
     */
    static parse(string, delimiter, separator, encoding) {
        string = KarmiaUtilityString.isString(string) ? string : string.toString(encoding);
        if (!string) {
            return {};
        }

        delimiter = delimiter || /(,|,? )/;
        separator = separator || '=';

        return string.split(delimiter).reduce(function (result, value) {
            const data = value.split(separator, 2),
                key = KarmiaUtilityString.unquote(KarmiaUtilityString.strip(data[0]));
            result[key] = (data[1]) ? KarmiaUtilityString.unquote(KarmiaUtilityString.trim(data[1])) : key;

            return result;
        }, {});
    }

    /**
     * Change from 'true', 'on', '1' to true and others to false
     *
     * @param   {string} string
     * @returns {boolean}
     */
    static toBoolean(string) {
        if (KarmiaUtilityString.isString(string)) {
            return /^(true|1|on)$/i.test(string);
        }

        return Boolean(string);
    }
}


// Export module
module.exports = function (options) {
    return new KarmiaUtilityString(options || {});
};



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
