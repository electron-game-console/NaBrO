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
		window.addEventListener('load', self.loadGames);
	}

	function loadGames() {
		fs.readdir(path.join(__dirname, '/../../games'), function(err, files) {
			if(!err) {
				self.model.games = files;

				var gameList = self.render();
				self.append(gameList);
			} else {
				console.error(err);
			}
		});
	}
}

module.exports = GameMenuController;
