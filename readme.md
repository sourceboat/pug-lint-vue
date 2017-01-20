# pug-lint-vue

[![npm](https://img.shields.io/npm/v/pug-lint-vue.svg?style=flat-square)](https://www.npmjs.com/package/pug-lint-vue)
[![npm downloads](https://img.shields.io/npm/dt/pug-lint-vue.svg?style=flat-square)](https://www.npmjs.com/package/pug-lint-vue)

Command line tool to lint [Pug](https://github.com/pugjs/pug) templates in [Vue single file components](https://vuejs.org/v2/guide/single-file-components.html). It uses [pug-lint](https://github.com/pugjs/pug-lint) under the hood.

## Installation

```
$ npm install pug-lint-vue
```

## Usage

```
$ pug-lint-vue [options] <file ...>
```

### Options

* `-h, --help`: output usage information
* `-V, --version`: output the version number
* `-c, --config <path>`: configuration file path (see [pug-lint](https://github.com/pugjs/pug-lint#configuration-file) for more information)


## Example

The following example scans the `assets` directory for `.vue` files and outputs lint errors in `<template>` tags with the attribute `lang="pug"` set. 

```
$ pug-lint-vue assets
```
