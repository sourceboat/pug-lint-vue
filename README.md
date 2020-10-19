:warning: **Deprecated:** This project is not actively maintained anymore. Use it at your own risk. Here are some helpful ressources:

- [vuejs/eslint-plugin-vue]() will most likely  not support Pug (see [vuejs/eslint-plugin-vue#640](https://github.com/vuejs/eslint-plugin-vue/issues/640#issuecomment-437631774)).
- [`prettier/plugin-pug`](https://github.com/prettier/plugin-pug) is a Prettier plugin to add Pug support for Prettier (with support for Vue Single File Components).
- [`leo-buneev/pug-to-html](`https://github.com/leo-buneev/pug-to-html) converts your Pug code to HTML code (with support for Vue Single File Components).

# pug-lint-vue

[![npm](https://img.shields.io/npm/v/pug-lint-vue.svg?style=flat-square)](https://www.npmjs.com/package/pug-lint-vue)
[![npm downloads](https://img.shields.io/npm/dt/pug-lint-vue.svg?style=flat-square)](https://www.npmjs.com/package/pug-lint-vue)
[![Build Status](https://img.shields.io/travis/sourceboat/pug-lint-vue.svg?style=flat-square)](https://travis-ci.org/sourceboat/pug-lint-vue)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

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

## Development

Build the docker container via:

```
$ docker build . -t pug-lint-vue
```

Use docker compose to work on the files:

```
$ docker-compose up
$ docker-compose exec app bash
```
