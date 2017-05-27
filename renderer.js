// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

'use strict';

const fs = require('fs');
const path = require('path');
const pug = require('pug');

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

function parseManifests(dirContents) {
	appendToDOM(dirContents);
}

function appendToDOM(games) {
	var gameMenu = document.getElementById('game-menu');

	var menu = pug.renderFile(path.join(__dirname, 'templates/_game-menu.pug'), {
		games: games
	});

	console.log(menu);

	while(gameMenu.firstChild) {
		gameMenu.removeChild(gameMenu.firstChild);
	}

	gameMenu.innerHTML = menu;
}
