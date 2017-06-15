'use strict';

const fs = require('fs');
const path = require('path');
const BaseController = require('../BaseController');

GameMenuController.prototype = new BaseController();

function GameMenuController(node, model) {
	var self = this;

	this.bindEvents = bindEvents;
	this.loadGames = loadGames;

	function bindEvents() {
		window.addEventListener('load', loadGames);
	}

	function loadGames() {
		fs.readdir(path.join(__dirname, '/../../games'), function(err, files) {
			if(!err) {
				model = { games: files };
				var gameList = self.render(model, __filename);
				self.removeChildren(gameList);
				self.attach(node, gameList);
			} else {
				console.error(err);
			}
		});
	}
}

module.exports = GameMenuController;
