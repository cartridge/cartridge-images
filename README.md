# Cartridge Images [![Build Status](https://travis-ci.org/cartridge/cartridge-images.svg?branch=master)](https://travis-ci.org/cartridge/cartridge-images)

> Image optimisation expansion pack for cartridge

To use this module, you will need [cartridge-cli](https://github.com/cartridge/cartridge-cli) installed and have a cartridge project setup.

```shell
npm install cartridge-images --save-dev
```

This module adds the following to a project:

* Image Optimisation using [gulp-imagemin](https://github.com/sindresorhus/gulp-imagemin)
* SVG Optimisation using [gulp-svgmin](https://github.com/ben-eb/gulp-svgmin)
* Responsive Images using [gulp-responsive](https://github.com/mahnunchik/gulp-responsive)

##Config

Once installed, the config file `task.images.js` is created and stored in the `_config` directory in the root of your cartridge project. Config for images, svgs and responsive images can be set individually.

Examples setup for responsive images can be found in the [gulp-responsive](https://github.com/mahnunchik/gulp-responsive) repo. `responsiveImages.config` from the config file is passed to the gulp-responsive task.