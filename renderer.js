// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
	loadGames: loadGames
};

function loadGames() {
	fs.readdir(path.join(__dirname, 'games'), function(err, files) {
		if(!err) {
			parseManifests(files);
		} else {
			console.error(err);
		}
	});
}

function parseManifests(files) {
	files.forEach(function(file) {
		appendToDOM(file);
	});
}

function appendToDOM(file) {
	console.log(file);
}
