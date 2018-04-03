declare class KarmiaUtilityString {
    constructor();
    isString(value: any): boolean;
    strip(string: string, mask_characters?: string): string;
    lstrip(string: string, mask_characters?: string): string;
    rstrip(string: string, mask_characters?: string): string;
    trim(string: string, mask_characters?: string): string;
    ltrim(string: string, mask_characters?: string): string;
    rtrim(string: string, mask_characters?: string): string;
    normalize(string: string, form?: string): string;
    unquote(string: string): string;
    zfill(number: string, width: number, encoding?: string): string;
    camelCase(words: string, capitalize?: boolean): string;
    snakeCase(words: string): string;
    kebabCase(words: string): string;
    parse(string: string, delimiter?: RegExp|string, separator?: RegExp|string, encoding?: string): object;
    toBoolean(string: string): boolean;
}

export = KarmiaUtilityString;
