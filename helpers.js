'use strict';
/* ============================================================ *\
	HELPERS FOR MAIN TASK FILE
\* ============================================================ */

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
			'rename':  {
				'suffix': sizes[i].rename.suffix + '-2x'
			},
			'crop':    (typeof sizes[i].crop === 'boolean' ? sizes[i].crop : false)
	    });

	    retinaSizes.push(sizes[i]);
  	}

	return retinaSizes;
}

helpersApi.getImageSizes = fucntion(baseData) {
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