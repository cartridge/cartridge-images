# Cartridge Images [![Build Status](https://travis-ci.org/cartridge/cartridge-images.svg?branch=master)](https://travis-ci.org/cartridge/cartridge-images)

> Image optimisation expansion pack for cartridge

To use this module, you will need [cartridge-cli](https://github.com/cartridge/cartridge-cli) installed and have a cartridge project setup.

```sh
npm install cartridge-images --save-dev
```

This module adds the following to a project:

* Image Optimisation using [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
* SVG Optimisation using [gulp-svgmin](https://github.com/ben-eb/gulp-svgmin)

## Maintainers

| Name          | Github Profile                  |
| ------------- |---------------------------------|
| Tristan Ashley  | [tawashley](https://github.com/tawashley) |

## Config

Once installed, the config file `task.images.js` is created and stored in the `_config` directory in the root of your cartridge project. Config for images and svgs can be set individually.

## Usage

This module provides the following gulp tasks

* `gulp images` - Task that runs all of the tasks mentioned below.
* `gulp images:minify` - Bitmap image minification. This minifies any .png / .jpg files in the images directory. Images are only optmised if the `--prod` flag is provided otherwise this task is ignored.
* `gulp images:svgmin` - Vector image minification. This minifies all .svg files in the `svgs` folder in the images directory.

* * *

## Development
### Commit message standards [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
Try and adhere as closely as possible to the [Angular commit messages guidelines](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines).

[Commitizen](https://github.com/commitizen/cz-cli) is a command line tool which can help with this:
```sh
npm install -g commitizen
```
Now, simply use `git cz` instead of `git commit` when committing.
