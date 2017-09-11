'use strict';

const fs = require('fs');
const path = require('path');
const BaseController = require('../BaseController');

GameMenuController.prototype = new BaseController();

function GameMenuController(selector) {
	var self = this;
	self.proto = Object.getPrototypeOf(this);

	// Prototype properties
	self.proto.fileName = __filename;

	// Public methods
	this.bindEvents = bindEvents;
	this.loadGames = loadGames;
	this.focusMenu = focusMenu;

	this.getMenuEntriesPerRow = getMenuEntriesPerRow;
	this.getAllMenuEntries = getAllMenuEntries;
	this.getFocusedMenuEntry = getFocusedMenuEntry;
	this.focusNextMenuEntry = focusNextMenuEntry;
	this.focusPreviousMenuEntry = focusPreviousMenuEntry;
	this.focusAboveMenuEntry = focusAboveMenuEntry;
	this.focusBelowMenuEntry = focusBelowMenuEntry;

	// Public properties
	this.selector = selector;

	this.selectors = {
		menuEntries: '.game-menu-game-link',
		focusedMenuEntry: '.game-menu-game-link:focus'
	};

	function bindEvents() {
		window.addEventListener('load', function() {
			self.proto.node = document.querySelector(self.selector);
			self.loadGames();
		});

		window.addEventListener('keydown', function(e) {
			switch(e.keyCode) {
				case 37: // Left
					self.focusPreviousMenuEntry();
					break;
				case 38: // Up
					self.focusAboveMenuEntry();
					break;
				case 39: // Right
					self.focusNextMenuEntry();
					break;
				case 40: // Down
					self.focusBelowMenuEntry();
					break;
			}
		});
	}

	function loadGames() {
		var gameDirectory = path.join(__dirname, '/../../../games');

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
				self.focusMenu();
			} else {
				console.error(err);
			}
		});
	}

	function focusMenu() {
		var menuEntries = document.querySelectorAll(self.selectors.menuEntries);

		if(menuEntries.length > 0) {
			menuEntries[0].focus();
		}
	}

	function getMenuEntriesPerRow() {
		var menuEntries = document.querySelectorAll(self.selectors.menuEntries);
		var topPosition = null;
		var entriesPerRow = 0;

		menuEntries.forEach(function(entry, i) {
			var entryPosition = entry.offsetTop;

			if(i === 0) {
				topPosition = entryPosition;
			}

			if(topPosition === entryPosition) {
				entriesPerRow++;
			}
		});

		return entriesPerRow;
	}

	function getAllMenuEntries() {
		var menuEntries = document.querySelectorAll(self.selectors.menuEntries);

		return menuEntries;
	}

	function getFocusedMenuEntry() {
		var focusedEntry = document.querySelector(self.selectors.focusedMenuEntry);

		return focusedEntry;
	}

	function getFocusedIndex(focusedEntry, menuEntries) {
		var focusedIndex = 0;

		menuEntries.forEach(function(entry, i) {
			if(entry === focusedEntry) {
				focusedIndex = i;
			}
		});

		return focusedIndex;
	}

	function focusNextMenuEntry() {
		var focusedEntry = getFocusedMenuEntry();
		var menuEntries = getAllMenuEntries();

		if(!menuEntries.length || !focusedEntry) {
			return;
		}

		var i = getFocusedIndex(focusedEntry, menuEntries);

		if(i < menuEntries.length - 1) {
			menuEntries[i + 1].focus();
		}
	}

	function focusPreviousMenuEntry() {
		var focusedEntry = getFocusedMenuEntry();
		var menuEntries = getAllMenuEntries();

		if(!menuEntries.length || !focusedEntry) {
			return;
		}

		var i = getFocusedIndex(focusedEntry, menuEntries);

		if(i > 0) {
			menuEntries[i - 1].focus();
		}
	}

	function focusAboveMenuEntry() {
		var focusedEntry = getFocusedMenuEntry();
		var menuEntries = getAllMenuEntries();

		if(!menuEntries.length || !focusedEntry) {
			return;
		}

		var i = getFocusedIndex(focusedEntry, menuEntries);

		if(i - self.getMenuEntriesPerRow() >= 0) {
			menuEntries[i - self.getMenuEntriesPerRow()].focus();
		}
	}

	function focusBelowMenuEntry() {
		var focusedEntry = getFocusedMenuEntry();
		var menuEntries = getAllMenuEntries();

		if(!menuEntries.length || !focusedEntry) {
			return;
		}

		var i = getFocusedIndex(focusedEntry, menuEntries);

		if(i + self.getMenuEntriesPerRow() <= menuEntries.length - 1) {
			menuEntries[i + self.getMenuEntriesPerRow()].focus();
		}
	}
}

module.exports = GameMenuController;
