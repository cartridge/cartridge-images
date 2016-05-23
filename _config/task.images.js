/* jshint node: true */

'use strict';

function getTaskConfig(projectConfig) {
	var taskConfig = {
		images: [
			projectConfig.paths.src.images + '**/*.{png,jpg}'
		],
		svgs: [
			projectConfig.paths.src.images + '**/*.svg'
		],
		watch: [
			projectConfig.paths.src.images + '**/*.{png,jpg}',
			projectConfig.paths.src.images + '**/*.svg'
		]
	};

	return taskConfig;
}

module.exports = getTaskConfig;
