declare module KarmiaUtility {
    export class KarmiaUtilityString {
        isString(value: string): boolean;
        strip(string: string, mask_characters: string): string;
        lstrip(string: string, mask_characters: string): string;
        rstrip(string: string, mask_characters: string): string;
        trim(string: string, mask_characters: string): string;
        ltrim(string: string, mask_characters: string): string;
        rtrip(string: string, mask_characters: string): string;
        normalize(string: string, form: string): string;
        unquote(string: string): string;
        zfill(number: string, width: number, encoding: string): string;
        camelCase(words: string, capitalize: boolean): string;
        snakeCase(words: string): string;
        kebabCase(words: string): string;
        parse(string: string, delimiter: RegExp|string, separator: RegExp|string, encoding: string): Object;
        toBoolean(string: string): boolean;
    }
}
