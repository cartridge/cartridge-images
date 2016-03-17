var helpersApi = {};

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

helpersApi.getImageSizes(baseData) {
	var i;
	var keys = Object.keys(baseData);
	var len  = keys.length;
	var retinaData = {};

	for(i = 0; i < len; i++) {
		retinaData[keys[i]] = getRetinaVersion(baseData[keys[i]]);
	}

	return retinaData;
}

module.exports = helpersApi;