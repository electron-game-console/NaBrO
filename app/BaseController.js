'use strict';

const path = require('path');
const pug = require('pug');

function BaseController() {
	var self = this;

	this.path = path;
	this.pug = pug;

	this.templatePath = null;
	this.fileName = null;

	this.model = {};

	this.node = null;
	this.parent = null;
	this.children = [];

	this.bindEvents = function() { };
	this.render = render;
	this.append = append;
	this.removeChildren = removeChildren;


	function render() {
		self.removeChildren();

		self.children.forEach(function(child) {
			self.append(child.render());
		});

		self.templatePath = getTemplatePath(self.fileName);

		var view = self.pug.renderFile(self.templatePath, self.model);

		return document.createRange().createContextualFragment(view).firstChild;
	}

	function append(childDom) {
		self.node.appendChild(childDom);
	}

	function removeChildren() {
		console.log(self.node);

		if(!self.node) {
			return;
		}

		while(self.node.firstChild) {
			self.node.removeChild(self.node.firstChild);
		}
	}

	function getTemplatePath(fileName) {
		return fileName.replace('Controller.js', '.pug');
	}
}

module.exports = BaseController;
