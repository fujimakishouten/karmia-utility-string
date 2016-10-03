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

### camel_case
- string ```<string>```
- capitalize ```<boolean>``` Default: false

```JavaScript
const string = 'snake_case_string';
kstring.camel_case(string);
```

### snake_case
- string ```<string>```

```JavaScript
const string = 'camelCaseString';
kstring.snake_case(string);
```

### kebab_case
- string ```<string>```

```JavaScript
const string = 'camelCaseString';
kstring.kebab_case(string);
```

### parse
- string ```<string>```
- delimiter ```<string/regexp>``` Default: /,? /
- separator ```<string/regexp>``` Default: =

```JavaScript
const string = 'key1=value1, key2=value2';
kstring.parse(string, /,? /, '=');
```

### to_boolean
- string ```<string>```

```JavaScript
// Should be true
kstring.to_boolean('true');
kstring.to_boolean('True');
kstring.to_boolean('TRUE');
kstring.to_boolean('0');
kstring.to_boolean(1);
kstring.to_boolean(true);
kstring.to_boolean('false_1');

// Should be false
kstring.to_boolean('false');
kstring.to_boolean('False');
kstring.to_boolean('FALSE');
kstring.to_boolean('');
kstring.to_boolean(0);
kstring.to_boolean(false);
```
