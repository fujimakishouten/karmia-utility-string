# karmia-utility-string
Karmia utility string module

## Usage
```JavaScript
const karmia_utility_string = require('karmia-utility-string'),
    kstring = new karmia_utility_string();
```

### trim
- string ```<string>```
- mask_character ```<string>``` Default: " \t\n\r\0\x0B"

```JavaScript
// Trim whitespaces
const string = '    Hello, world.    ';
kstring.trim(string);

// Trim specified characters
const string = '"Hello, world."';
kstring.trim(string, '"');
```

### ltrim
- string ```<string>```
- mask_character ```<string>``` Default: " \t\n\r\0\x0B"

```JavaScript
// Trim whitespaces
const string = '    Hello, world.';
kstring.trim(string);

// Trim specified characters
const string = '"Hello, world.';
kstring.trim(string, '"');
```

### rtrim
- string ```<string>```
- mask_character ```<string>``` Default: " \t\n\r\0\x0B"

```JavaScript
// Trim whitespaces
const string = 'Hello, world.    ';
kstring.trim(string);

// Trim specified characters
const string = 'Hello, world."';
kstring.trim(string, '"');
```

### normalize
- string ```<string>```
- form ```<string>``` Default: "NFKC"

```JavaScript
const string = '\u202b１２３\r\nＡＢＣ\rｄｅｆ\nｱｲｳｴｵｶﾞ';
kstring.normalize(string); // Return: '123\nABC\ndef\nアイウエオガ'
```

### unquote
- string  ```<string>```

```JavaScript
const string = '"Hello, world."';
kstring.unquote(string);
```

### zfill
- string ```<string>```
- width ```<number>```
- encoding ```<string>```

```JavaScript
const string = '1';
kstring.zfill(string, 3);
```

### camelCase
- string ```<string>```
- capitalize ```<boolean>``` Default: false

```JavaScript
const string = 'snake_case_string';
kstring.camelCase(string);
```

### snakeCase
- string ```<string>```

```JavaScript
const string = 'camelCaseString';
kstring.snakeCase(string);
```

### kebabCase
- string ```<string>```

```JavaScript
const string = 'camelCaseString';
kstring.kebabCase(string);
```

### parse
- string ```<string>```
- delimiter ```<string/regexp>``` Default: /,? /
- separator ```<string/regexp>``` Default: =

```JavaScript
const string = 'key1=value1, key2=value2';
kstring.parse(string, /,? /, '=');
```

### toBoolean
- string ```<string>```

```JavaScript
// Should be true
kstring.toBoolean('true');
kstring.toBoolean('True');
kstring.toBoolean('TRUE');
kstring.toBoolean('0');
kstring.toBoolean(1);
kstring.toBoolean(true);
kstring.toBoolean('false_1');

// Should be false
kstring.toBoolean('false');
kstring.toBoolean('False');
kstring.toBoolean('FALSE');
kstring.toBoolean('');
kstring.toBoolean(0);
kstring.toBoolean(false);
```
