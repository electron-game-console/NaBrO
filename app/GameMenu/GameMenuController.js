'use strict';

const fs = require('fs');
const path = require('path');
const BaseController = require('../BaseController');

GameMenuController.prototype = new BaseController();

function GameMenuController(elementId) {
	var self = this;

	this.loadGames = loadGames;

	function loadGames() {
		fs.readdir(path.join(__dirname, '/../../games'), function(err, files) {
			if(!err) {
				var domNode = self.render( { games: files }, __filename);
				self.attach(document.getElementById(elementId), domNode);
			} else {
				console.error(err);
			}
		});
	}
}

module.exports = GameMenuController;
