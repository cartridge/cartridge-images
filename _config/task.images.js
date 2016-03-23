/* jshint node: true */

'use strict';

function getTaskConfig(projectConfig) {
	var taskConfig = {
		images: [
			projectConfig.paths.src.images + '**/*.{png,jpg}'
		],
		svgs: [
			projectConfig.paths.src.images + '**/*.{svg}'
		],
		responsiveImages: {
			src: [
				projectConfig.paths.src.images + 'responsive/**/*.{png,jpg}',
			],
			config: {
				"work/*": [
					{
						"width":   1020,
						"height":  1020,
						"quality": 60,
						"rename": {
							"suffix":  "-large"
						},
						"crop":    "center"
					},
					{
						"width":   1020,
						"height":  1020,
						"quality": 60,
						"rename": {
							"suffix":  "-medium"
						},
						"crop":    "center"
					}
				],
				"service/*": [
					{
						"width":   1020,
						"height":  1020,
						"quality": 60,
						"rename": {
							"suffix":  "-large"
						},
						"crop":    "center"
					},
					{
						"width":   1020,
						"height":  1020,
						"quality": 60,
						"rename": {
							"suffix":  "-medium"
						},
						"crop":    "center"
					}
				],
				"office/*": [
					{
						"width":   1680,
						"height":  1024,
						"quality": 60,
						"rename": {
							"suffix":  "-large"
						},
						"crop":    "center"
					},
					{
						"width":   960,
						"height":  1000,
						"quality": 60,
						"rename": {
							"suffix":  "-medium"
						},
						"crop":    "center"
					}
				]
			}
		}
	};

	return taskConfig;
}

module.exports = getTaskConfig;
