# ltsview

[![Build Status](https://travis-ci.org/sasaplus1/ltsview.svg)](https://travis-ci.org/sasaplus1/ltsview)
[![Dependency Status](https://gemnasium.com/sasaplus1/ltsview.svg)](https://gemnasium.com/sasaplus1/ltsview)
[![NPM version](https://badge.fury.io/js/ltsview.svg)](http://badge.fury.io/js/ltsview)

[LTSV](http://ltsv.org/) viewer, inspired by [ltsview](http://metacpan.org/module/Text::LTSV/)

## Installation

```sh
$ npm install -g ltsview
```

## Usage

```sh
$ cat access.log | ltsview
```

or

```sh
$ ltsview access.log
```

## Options

### -k, --keys

filter keys.

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

ignore keys.

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

### -h, --help

show usage.

### -V, --version

show version.

## License

The MIT license. Please see LICENSE file.
