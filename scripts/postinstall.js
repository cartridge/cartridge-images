'use strict';

var cartridgeUtil = require('cartridge-module-util');
var packageConfig = require('../package.json');
var path          = require('path');

var rcComplete            = false;
var projectConfigComplete = false;
var moduleConfigComplete  = false;

cartridgeUtil.ensureCartridgeExists();

function isComplete() {
	return rcComplete && projectConfigComplete && moduleConfigComplete;
}

function taskComplete(flag, err, message) {
	if(err) {
		console.error(err);
		console.error('Error: ' + message);
		process.exit(1);
	}

	console.log('Finished: ' + message);

	flag = true;

	if(isComplete()) {
		finish();
	}
}

function finish() {
	console.log('Finished post install of ' + packageConfig.name);
	process.exit(0);
}

function startAddToRc() {
	var moduleConfig = {
		name:    packageConfig.name,
		version: packageConfig.version,
		site:    packageConfig.homepage,
		task:    packageConfig.name + '/task.js'
	};

	console.log('Adding ' + packageConfig.name + ' to .cartridgerc');

	cartridgeUtil.addToRc(moduleConfig, function finishAddToRc(err) {
		taskComplete(
			rcComplete,
			err,
			'adding ' + packageConfig.name + ' to .cartridgerc'
		);
	});
}

function modifyProjectConfig(config) {
	if(!config.hasOwnProperty('paths')) {
		config.paths = {
			src:   {},
			dest: {}
		};
	}

	if(!config.paths.hasOwnProperty('src')) {
		config.paths.src = {};
	}

	if(!config.paths.hasOwnProperty('dest')) {
		config.paths.dest = {};
	}

	config.paths.src.images   = config.dirs.src  + '/images/';
	config.paths.dest.images = config.dirs.dest + '/images/';

	return config;
}

function startProjectConfig() {
	console.log('Modifying project config for ' + packageConfig.name);

	cartridgeUtil.modifyProjectConfig(modifyProjectConfig, function finishProjectConfig(err) {
		taskComplete(
			projectConfigComplete,
			err,
			'modifying project config'
		);
	});
}

function startModuleConfig() {
	console.log('Copying files needed by ' + packageConfig.name + ' to _config');

	cartridgeUtil.addModuleConfig(path.resolve('_config'), function finishModuleconfig(err){
		taskComplete(
			moduleConfigComplete,
			err,
			'adding ' + packageConfig.name + ' config files'
		);
	});
}

startAddToRc();
startProjectConfig();
startModuleConfig();
