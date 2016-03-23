/* jshint node: true */

'use strict';

function getTaskConfig(projectConfig) {
	var taskConfig = {
		responsiveImages: {
			src: [
				projectConfig.paths.src.responsive + '**/*',
			],
			config: {
				"image": [
					{
						"width":   1200,
						"height":  350,
						"quality": 40,
						"suffix":  "-large",
						"crop":    true
					}
				]
			}
		},
		images: [
			projectConfig.paths.src.images + '**/*',
		]
	};

	return taskConfig;
}

module.exports = getTaskConfig;
