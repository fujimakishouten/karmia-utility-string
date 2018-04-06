/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
"use strict";



// Import modules
const rewritePattern = require("regexpu-core");


// Variables
const others = new RegExp(rewritePattern("\\p{C}", "iu", {unicodePropertyEscape: true}), "g");


/**
 * KarmiaUtilityString
 *
 * @class
 */
class KarmiaUtilityString {
    /**
     * Properties
     */
    public isString = KarmiaUtilityString.isString;
    public strip = KarmiaUtilityString.strip;
    public lstrip = KarmiaUtilityString.lstrip;
    public rstrip = KarmiaUtilityString.rstrip;
    public trim = KarmiaUtilityString.trim;
    public ltrim = KarmiaUtilityString.ltrim;
    public rtrim = KarmiaUtilityString.rtrim;
    public normalize = KarmiaUtilityString.normalize;
    public unquote = KarmiaUtilityString.unquote;
    public zfill = KarmiaUtilityString.zfill;
    public camelCase = KarmiaUtilityString.camelCase;
    public snakeCase = KarmiaUtilityString.snakeCase;
    public kebabCase = KarmiaUtilityString.kebabCase;
    public parse = KarmiaUtilityString.parse;
    public toBoolean = KarmiaUtilityString.toBoolean;

    /**
     * Check is string
     *
     * @param   {*} value
     * @returns {boolean}
     */
    static isString(value: any): boolean {
        return (Object.prototype.toString.call(value) === "[object String]");
    }

    /**
     * Strip string
     *
     * @param   {string} string
     * @param   {string} [mask_characters]
     * @returns {string}
     */
    static strip(string: string, mask_characters=" \t\n\r\0\x0B"): string {
        return KarmiaUtilityString.rstrip(KarmiaUtilityString.lstrip(string, mask_characters), mask_characters);
    }

    /**
     * Strip left string
     *
     * @param   {string} string
     * @param   {string} [mask_characters=" \t\n\r\0\x0B"]
     * @returns {string}
     */
    static lstrip(string: string, mask_characters=" \t\n\r\0\x0B"): string {
        return string.replace(new RegExp(`^[${mask_characters}]+`, "g"), "");
    }

    /**
     * Strip right string
     *
     * @param   {string} string
     * @param   {string} [mask_characters=" \t\n\r\0\x0B"]
     * @returns {string}
     */
    static rstrip(string: string, mask_characters=" \t\n\r\0\x0B"): string {
        return string.replace(new RegExp(`[${mask_characters}]+?$`, "g"), "");
    }

    /**
     * Alias to lstrip
     *
     * @param {string} string
     * @param {string} [mask_characters=" \t\n\r\0\x0B"]
     * @returns {string}
     */
    static ltrim(string: string, mask_characters=" \t\n\r\0\x0B"): string {
        return KarmiaUtilityString.lstrip(string, mask_characters);
    }

    /**
     * Alias to rstrip
     *
     * @param {string} string
     * @param {string} [mask_characters=" \t\n\r\0\x0B"]
     * @returns {string}
     */
    static rtrim(string: string, mask_characters=" \t\n\r\0\x0B"): string {
        return KarmiaUtilityString.rstrip(string, mask_characters);
    }

    /**
     * Alias to strip
     *
     * @param {string} string
     * @param {string} [mask_characters=" \t\n\r\0\x0B"]
     * @returns {string}
     */
    static trim(string: string, mask_characters=" \t\n\r\0\x0B"): string {
        return KarmiaUtilityString.strip(string, mask_characters);
    }

    /**
     * Normalize string
     *
     * @param   {string} string
     * @param   {string} [form="NFKC"]
     * @returns {string}
     */
    static normalize(string: string, form="NFKC"): string {
        const lines = string.split(/\r\n|\r|\n/).map(function (line) {
            return line.replace(others, "");
        });

        return KarmiaUtilityString.strip(lines.join("\n").normalize(form));
    }

    /**
     * Unquote string
     *
     * @param   {string} string
     * @returns {string}
     */
    static unquote(string: string): string {
        const first = string.charAt(0),
            last = string.charAt(string.length - 1);
        if (("'" === first && "'" === last) || ('"' === first && '"' === last)) {
            return string.substring(1, string.length - 1);
        }

        return string;
    }

    /**
     * pads string on the left with zeros
     *
     * @param   {number|string} number
     * @param   {number} width
     * @returns {string}
     */
    static zfill(number: number|string, width: number): string {
        if (width < 1) {
            return number.toString();
        }

        return ("0".repeat(width) + number.toString()).slice(width * -1);
    }

    /**
     * Convert from kebab-case/snake_case to camelCase
     *
     * @param   {string} words
     * @param   {boolean} [capitalize]
     * @returns {string}
     */
    static camelCase(words: string, capitalize?: boolean): string {
        const result = words.split(/[-_]/).map(function (word) {
            return word.charAt(0).toUpperCase() + word.substring(1);
        }).join("");

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
    static snakeCase(words: string): string {
        const result = words.charAt(0).toLowerCase() + words.substring(1).replace(/-/g, "_");

        return result.replace(/[A-Z]/g, "_$&").toLowerCase();
    }

    /**
     * Convert from camelCase/snake_case to kebab-case
     *
     * @param   {string} words
     * @returns {string}
     */
    static kebabCase(words: string): string {
        const result = words.charAt(0).toLowerCase() + words.substring(1).split("_").join("-");

        return result.replace(/[A-Z]/g, "-$&").toLowerCase();
    }

    /**
     * Parse "key1=value1, key2=value2" formatted string
     *
     * @param   {string} string
     * @param   {RegExp|string} [delimiter=/(,|,? )/]
     * @param   {RegExp|string} [separator="="]
     * @returns {Object}
     */
    static parse(string: string, delimiter?: RegExp|string, separator?: RegExp|string): {[index: string]: string} {
        string = KarmiaUtilityString.isString(string) ? string : string.toString();
        if (!string) {
            return {};
        }

        delimiter = delimiter || /(,|,? )/;
        separator = separator || "=";

        return string.split(delimiter).reduce(function (collection: {[index: string]: string}, value: string) {
            const data = value.split(separator, 2),
                key = KarmiaUtilityString.unquote(KarmiaUtilityString.strip(data[0]));
            collection[key] = (data[1]) ? KarmiaUtilityString.unquote(KarmiaUtilityString.trim(data[1])) : key;

            return collection;
        }, {});
    }

    /**
     * Change from "true", "on", "1" to true and others to false
     *
     * @param   {string} string
     * @returns {boolean}
     */
    static toBoolean(string: any): boolean {
        if (KarmiaUtilityString.isString(string)) {
            return /^(true|1|on)$/i.test(string);
        }

        return Boolean(string);
    }
}


// Export module
export = KarmiaUtilityString;



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
