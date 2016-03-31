/* jshint node: true */

'use strict';

function getTaskConfig(projectConfig) {
	var taskConfig = {
		images: [
			projectConfig.paths.src.images + '**/*.{png,jpg}',
			'!' + projectConfig.paths.src.images + 'responsive/**/*.{png,jpg}'
		],
		svgs: [
			projectConfig.paths.src.images + '**/*.svg'
		],
		responsiveImages: {
			src: [
				projectConfig.paths.src.images + 'responsive/**/*.{png,jpg}',
			],
			config: {
				"responsive/*": [
					{
						"width":   800,
						"height":  800,
						"quality": 60,
						"rename": {
							"suffix":  "-large"
						},
						"crop":    "center"
					},
				]
			}
		},
		watch: [
			projectConfig.paths.src.images + '**/*.{png,jpg}',
			projectConfig.paths.src.images + '**/*.svg'
		]
	};

	return taskConfig;
}

module.exports = getTaskConfig;
