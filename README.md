# ltsview

[LTSV](http://ltsv.org/) viewer (inspired by [ltsview](http://metacpan.org/module/Text::LTSV/))

## Installation

```sh
$ npm install -g ltsview
```

## Usage

```sh
$ cat access.log | ltsview
```

```sh
$ ltsview -f access.log
```

## Options

### -f, --file

read from file.

### -k, --keys

show keys.

```sh
$ printf 'l1:v1\tl2:v2\nl3:v3' | ltsview
---
l1: v1
l2: v2
---
l3: v3
$ printf 'l1:v1\tl2:v2\nl3:v3' | ltsview -k l1,l3
---
l1: v1
---
l3: v3
```

### -i, --ignore-keys

hide keys.

```sh
$ printf 'l1:v1\tl2:v2\nl3:v3' | ltsview
---
l1: v1
l2: v2
---
l3: v3
$ printf 'l1:v1\tl2:v2\nl3:v3' | ltsview -i l1,l2
---
l3: v3
```

### --no-color

no coloring output.

### -s, --strict

strict parse.

### -h, --help

show usage.

### -V, --version

show version.

## License

The MIT License. Please see LICENSE file.
