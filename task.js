'use strict';

/* ============================================================ *\
	 IMAGES
\* ============================================================ */

// Gulp dependencies
var path = require('path');
var gulpif     = require('gulp-if')
var rename     = require('gulp-rename');

// Module dependencies
var imagemin 		= 		require('gulp-imagemin');
var pngquant 		= 		require('imagemin-pngquant');
var svgmin 			= 		require('gulp-svgmin');

module.exports = function(gulp, projectConfig, tasks) {

	/* --------------------
	*	CONFIGURATION
	* ---------------------*/

	var TASK_NAME = 'images';
	var WATCH_TASK_NAME = 'watch:' + TASK_NAME

	// Task Config
	var taskConfig = require(path.resolve(process.cwd(), projectConfig.dirs.config, 'task.' + TASK_NAME + '.js'))(projectConfig);

	var imageminOptions = {
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use: [pngquant()]
	};

	var svgPlugins = [{
			removeDimensions: true
		}, {
			removeTitle: true
		}
	];

	var svgminOptions = {};

	/* --------------------
	*	MODULE TASKS
	* ---------------------*/

	gulp.task(TASK_NAME + ':minify', function () {
		return gulp.src(taskConfig.images)
			.pipe(gulpif(projectConfig.isProd, imagemin(imageminOptions))) //Production only
			.pipe(gulp.dest(projectConfig.paths.dest.images));
	});

	gulp.task(TASK_NAME + ':svgmin', function () {
		return gulp.src(taskConfig.svgs)
			.pipe(svgmin(svgminOptions))
			.pipe(gulp.dest(projectConfig.paths.dest.images));
	});

	gulp.task(TASK_NAME, [TASK_NAME + ':minify', TASK_NAME + ':svgmin']);

	/* --------------------
	*	WATCH TASKS
	* ---------------------*/

	gulp.task(WATCH_TASK_NAME, function () {
		gulp.watch(
			taskConfig.watch,
			[TASK_NAME]
		);
	});

	/* ----------------------------
	*	CARTRIDGE TASK MANAGEMENT
	* -----------------------------*/

	// Add the clean path for the generated images
	projectConfig.cleanPaths.push(projectConfig.paths.dest[TASK_NAME]);
	// Add the task to the default list
	tasks.default.push(TASK_NAME);
	// Add the task to the watch list
	tasks.watch.push(WATCH_TASK_NAME);
}
