'use strict';

const path = require('path');
const pug = require('pug');

function BaseController() {
	var self = this;

	this.path = path;
	this.pug = pug;

	this.bindEvents = function() { };
	this.render = render;
	this.attach = attach;
	this.removeChildren = removeChildren;


	function render(model, fileName) {
		var templatePath = getTemplatePath(fileName);

		var node = self.pug.renderFile(templatePath, model);

		return node;
	}

	function attach(node, dom) {
		node.innerHTML = dom;
	}

	function removeChildren(node) {
		while(node.firstChild) {
			node.removeChild(node.firstChild);
		}
	}

	function getTemplatePath(fileName) {
		return fileName.replace('Controller.js', '.pug');
	}
}

module.exports = BaseController;
