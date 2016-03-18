'use strict';
/* ============================================================ *\
	 STYLES / SCSS
\* ============================================================ */

 var path = require('path');

// Gulp dependencies
var gulp       = require('gulp');
var gulpif     = require('gulp-if')
var rename     = require('gulp-rename');

// Task dependencies

var imagemin 		= 		require('gulp-imagemin');
var pngquant 		= 		require('imagemin-pngquant');
var svgmin 			= 		require('gulp-svgmin');
var responsive 	= 		require('gulp-responsive-images');

module.exports = function(gulp, projectConfig, tasks) {

	/* --------------------
	*	HELPERS
	* ---------------------*/

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

	/* --------------------
	*	CONFIGURATION
	* ---------------------*/

	// Task Config
	var taskConfig = require(path.resolve(process.cwd(), projectConfig.dirs.config, 'task.images.js'))(projectConfig);

	// Add the clean path for the generated images
	projectConfig.cleanPaths.push(projectConfig.paths.dest.images);

	var imageminOptions = {
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	};

	var svgPlugins = [
		{
			removeDimensions: true
		}, {
			removeTitle: true
		}
	];

	var svgminOptions = {};

	/* --------------------
	*	MODULE TASKS
	* ---------------------*/

	gulp.task('imagemin', function () {
		return gulp.src(taskConfig.images)
			.pipe(gulpif(projectConfig.prod, imagemin(imageminOptions))) //Production only
			.pipe(gulp.dest(projectConfig.paths.dest.images));
	});

	gulp.task('svgmin', function () {
		return gulp.src(projectConfig.paths.src.images + '**/*.svg')
			.pipe(svgmin(svgminOptions))
			.pipe(gulp.dest(projectConfig.paths.dest.images));
	});

	gulp.task('responsive-images', function () {
		return gulp.src(taskConfig.responsiveImages.src)
			.pipe(responsive(getImageSizes(taskConfig.responsiveImages.config)))
			.pipe(gulp.dest(projectConfig.paths.dest.images));
	});

	gulp.task('images', ['imagmin', 'responsive-images', 'svgmin',]);

	tasks.default.push('images');
	tasks.default.push('imagemin');
	tasks.default.push('svgmin');
	tasks.default.push('responsive-images');
}
