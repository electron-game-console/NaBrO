'use strict';

const path = require('path');
const pug = require('pug');

function BaseController() {
	var self = this;

	this.path = path;
	this.pug = pug;

	this.render = render;
	this.attach = attach;

	function render(model, fileName) {
		var templatePath = getTemplatePath(fileName);

		var node = self.pug.renderFile(templatePath, model);

		return node;
	}

	function attach(node, dom) {
		// Clear the node of children
		while(node.firstChild) {
			node.removeChild(node.firstChild);
		}

		node.innerHTML = dom;
	}

	function getTemplatePath(fileName) {
		return fileName.replace('Controller.js', '.pug');
	}
}

module.exports = BaseController;
