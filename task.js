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
var taskHelpers = require(path.resolve(process.cwd(), projectConfig.dirs.config, 'task.helpers.js'));

module.exports = function(gulp, projectConfig, tasks) {

	/* --------------------
	*	CONFIGURATION
	* ---------------------*/

	// Task Config
	var taskConfig = require(path.resolve(process.cwd(), projectConfig.dirs.config, 'task.images.js'))(projectConfig);

	// Add the clean path for the generated styles
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

	var svgminOptions = {plugins: svgOptions};

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
			.pipe(responsive(taskHelpers.getImageSizes(taskConfig.responsive.config)))
			.pipe(gulp.dest(projectConfig.paths.dest.images));
	});

	tasks.default.push('imagemin');
	tasks.default.push('svgmin');
	tasks.default.push('responsive-images');
}
