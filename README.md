# Postcss Yeoman Generator [![Build Status](https://travis-ci.org/Remeic/generator-postcss.svg?branch=master)](https://travis-ci.org/Remeic/generator-postcss)

[![Greenkeeper badge](https://badges.greenkeeper.io/Remeic/generator-postcss.svg)](https://greenkeeper.io/)

> [Yeoman](http://yeoman.io) generator for Postcss projects

This generator makes for you production folder that contains Js, Html, Css and an awesome Gulp file ready to use for minify,beautify and live reload for browser.

## Installation

Pre-requisites: You'll need [node](https://nodejs.org/download/) which comes
with [npm](https://github.com/npm/npm#super-easy-install) or [yarn](https://yarnpkg.com/).

If you don't have [Yeoman](http://yeoman.io/) installed:

```bash
npm install -g yo
```

#### Install generator with npm or yarn

```bash
npm i generator-postcss-projects
```
```bash
yarn add generator-postcss-projects
```

### Usage
```bash
yo postcss-projects
```
Drink an italian coffee and wait

#### What gulp file include?

Minify Css
```bash
gulp minify-css
```
Minify Html
```bash
gulp minify-html
```
Beautify Css
```bash
gulp css
```
Watcher
```bash
gulp poster
```
Compile ( Include minify, beautify )
```bash
gulp
```
Serve ( Open live reload in your browser )
```bash
gulp serve
```

### Contributor

Thanks to [Salvatore B.](https://github.com/Owanesh) and [Andrea Stagi](https://github.com/astagi) to help me with troubleshooting.

## License

MIT © [Giulio Fagioli](https://github.com/Remeic)
