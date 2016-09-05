/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';



// Variables
const util = require('util'),
    _ = require('lodash'),
    rewritePattern = require('regexpu-core'),
    others = new RegExp(rewritePattern('\\p{C}', 'iu', {unicodePropertyEscape: true}), 'giu');


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
        self.trim = KarmiaUtilityString.trim;
        self.ltrim = KarmiaUtilityString.ltrim;
        self.rtrim = KarmiaUtilityString.rtrim;
        self.normalize = KarmiaUtilityString.normalize;
        self.unquote = KarmiaUtilityString.unquote;
        self.zfill = KarmiaUtilityString.zfill;
        self.parse = KarmiaUtilityString.parse;
        self.toBoolean = KarmiaUtilityString.toBoolean;
    }

    /**
     * Trim string
     *
     * @param   {string} string
     * @param   {string} mask_characters
     * @returns {string}
     */
    static trim(string, mask_characters) {
        mask_characters = mask_characters || ' \t\n\r\0\x0B';

        return string.replace(new RegExp(util.format('^[%s]+|[%s]+$', mask_characters, mask_characters), 'g'), '');
    }

    /**
     * Trim left string
     *
     * @param   {string} string
     * @param   {string} mask_characters
     * @returns {string}
     */
    static ltrim(string, mask_characters) {
        mask_characters = mask_characters || ' \t\n\r\0\x0B';

        return string.replace(new RegExp(util.format('^[%s]+', mask_characters), 'g'), '');
    }

    /**
     * Trim right string
     *
     * @param   {string} string
     * @param   {string} mask_characters
     * @returns {string}
     */
    static rtrim(string, mask_characters) {
        mask_characters = mask_characters || ' \t\n\r\0\x0B';

        return string.replace(new RegExp(util.format('[%s]+?$', mask_characters), 'g'), '');
    }

    /**
     * Normalize string
     *
     * @param   {string} string
     * @param   {string} form
     * @returns {string}
     */
    static normalize(string, form) {
        const self = this,
            lines = string.split(/\r\n|\r|\n/).map(function (line) {
                return line.replace(others, '');
            });

        return self.trim(lines.join('\n').normalize(form || 'NFKC'));
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
     * Parse "key1=value1, key2=value2" formatted string
     *
     * @param   {string} string
     * @param   {string|regexp} delimiter
     * @param   {string|regexp} separator
     * @param   {string} encoding
     * @returns {Object}
     */
    static parse(string, delimiter, separator, encoding) {
        string = _.isString(string) ? string : string.toString(encoding);
        if (!string) {
            return {};
        }

        const self = this;
        delimiter = delimiter || /(,|,? )/;
        separator = separator || '=';

        return string.split(delimiter).reduce(function (result, value) {
            const data = value.split(separator, 2),
                key = self.unquote(self.trim(data[0]));
            result[key] = (data[1]) ? self.unquote(self.trim(data[1])) : key;

            return result;
        }, {});
    }

    /**
     * Change from 'true' and 'false' string to boolean
     *
     * @param   {string} string
     * @returns {boolean}
     */
    static toBoolean(string) {
        if (_.isString(string) && /^(true|false)$/i.test(string)) {
            return JSON.parse(string.toLowerCase());
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
