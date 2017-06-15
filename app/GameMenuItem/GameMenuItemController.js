'use strict';

const BaseController = require('../BaseController');

GameMenuItemController.prototype = new BaseController();

function GameMenuItemController(node, model) {
	var self = this;

	this.bindEvents = bindEvents;
	this.load = load;

	function bindEvents() {

	}

	function load() {
		var listItem = self.render(model, __filename);
		self.attach(node, listItem);
	}
}

module.exports = GameMenuItemController;
