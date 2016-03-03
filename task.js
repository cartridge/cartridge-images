'use strict';
/* ============================================================ *\
	 STYLES / SCSS
\* ============================================================ */

// Gulp dependencies
var gulp       = require('gulp');
var gulpif     = require('gulp-if')
var rename     = require('gulp-rename');

// Task dependencies

var imagemin 		= 		require('gulp-imagemin');
var pngquant 		= 		require('imagemin-pngquant');
var svgmin 			= 		require('gulp-svgmin');
var responsive 	= 		require('gulp-responsive-images');

module.exports = function(config, cartridgeSettings, creds) {

	// Imagemin

	var images = require(config.paths.config + 'images')(config);
	var imageminOptions = {
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	};

	gulp.task('imagemin', function () {
		return gulp.src(images)
			.pipe(gulpif(config.prod, imagemin(imageminOptions))) //Production only
			.pipe(gulp.dest(config.paths.dest.images));
	});

	// svgmin

	var svgPlugins = [
		{
			removeDimensions: true
		}, {
			removeTitle: true
		}
	];

	var svgminOptions = {plugins: svgOptions};

	gulp.task('svgmin', function () {
		return gulp.src(config.paths.src.images + '**/*.svg')
			.pipe(svgmin(svgminOptions))
			.pipe(gulp.dest(config.paths.dest.images));
	});

	// Image resizes

	var imageSizes = require(config.paths.config + 'resp-images');
	var responsiveImages = require(config.paths.config + 'responsive-images')(config);
	imageSizes = getImageSizes(imageSizes);

	function getRetinaVersion(sizes) {
		var i;
		var len = sizes.length;
		var retinaSizes = [];

		for(i = 0; i < len; i++) {
			// create the retina version
			retinaSizes.push({
				'width':   sizes[i].width * 2,
				'height':  sizes[i].height * 2,
				'quality': sizes[i].quality,
				'suffix':  sizes[i].suffix + '-2x',
				'crop':    (typeof sizes[i].crop === 'boolean' ? sizes[i].crop : false)
			});

			// Update the base version
			sizes[i].suffix += '-1x';
			retinaSizes.push(sizes[i]);
		}

		return retinaSizes;
	}

	function getImageSizes(baseData) {
		var i;
		var keys = Object.keys(baseData);
		var len  = keys.length;
		var retinaData = {};

		for(i = 0; i < len; i++) {
			retinaData[keys[i]] = getRetinaVersion(baseData[keys[i]]);
		}

		return retinaData;
	}

	gulp.task('responsive-images', function () {

		return gulp.src(responsiveImages)
			.pipe(responsive(imageSizes))
			.pipe(gulp.dest(config.paths.dest.images));
	});

	gulp.task('watch:sass', function () {
		gulp.watch(
			[config.paths.src.styles + '**/*.scss', config.paths.src.components + '**/*.scss', config.paths.src.partials + '**/*.scss'],
			['sass', 'sass:legacy:ie8']
		);
	});
	cartridgeSettings.tasks.watch.push('watch:sass');

}
