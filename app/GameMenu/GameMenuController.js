'use strict';

const fs = require('fs');
const path = require('path');
const BaseController = require('../BaseController');

GameMenuController.prototype = new BaseController();

function GameMenuController(node) {
	var self = this;
	var proto = Object.getPrototypeOf(this);

	proto.fileName = __filename;
	proto.node = node;

	this.bindEvents = bindEvents;
	this.loadGames = loadGames;

	function bindEvents() {
		window.addEventListener('load', function() {
			self.loadGames();
		});
	}

	function loadGames() {
		var gameDirectory = path.join(__dirname, '/../../games');

		fs.readdir(gameDirectory, function(err, dirs) {
			if(!err) {
				self.model.games = [];

				dirs.forEach(function(dir) {
					var manifest = JSON.parse(fs.readFileSync(path.join(gameDirectory, dir, 'manifest.json'), 'utf8'));

					self.model.games.push({
						title: manifest.title,
						link: dir,
						imagePath: path.join(gameDirectory, dir, 'logo.png')
					});
				});

				var gameList = self.render();
				self.append(gameList);
			} else {
				console.error(err);
			}
		});
	}
}

module.exports = GameMenuController;
