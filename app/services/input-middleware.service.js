/*jshint bitwise: false*/
(function () {
	'use strict';

	const fs = require('fs');
	const path = require('path');
	const electron = require('electron');

	var webview = document.querySelector('webview');

	if (webview !== null)
	{
		webview.addEventListener('dom-ready', () => {
			window.addEventListener('gamepadconnected', addGamepad);
			window.addEventListener('gamepaddisconnected', removeGamepad);
	  	});
	}
	else
	{
		webview = electron.remote.getCurrentWebContents();

		webview.addListener('dom-ready', () => {
			window.addEventListener('gamepadconnected', addGamepad);
			window.addEventListener('gamepaddisconnected', removeGamepad);
	  	});
	}

	var start;
	var gamepad;

	var manifestString = fs.readFileSync(path.join(__dirname, 'manifest.json'), {encoding: 'utf8'});
	var keybindings = JSON.parse(manifestString).keybindings;

	console.log(keybindings);

	var buttonPressState = [];
	var numButtons = 10;
	for (let i = 0; i < numButtons; i++) {
  		buttonPressState.push(false);
	}

	var axesPressState = [];
	var numAxes = 2;
	for (let i = 0; i < numAxes; i++) {
  		axesPressState.push([false, false]);
	}

	function addGamepad(e) {
		console.log('Gamepad ' + e.gamepad.index + ' connected.');
		gamepad = navigator.getGamepads()[e.gamepad.index];

		inputLoop();
	}

	function removeGamepad(e) {
		console.log(e);
		cancelAnimationFrame(start);
	}

	function handleButtons() {
		for (let i = 0; i < numButtons; i++) {
			if(gamepad.buttons[i].pressed ^ buttonPressState[i]) {
				var up = buttonPressState[i];
				console.log('Button ' + keybindings.buttons[i].button + (up ? ' Up' : ' Down'));
				buttonPressState[i] = !buttonPressState[i];

				if (keybindings.buttons[i].keyCode == null)
					continue;

				webview.sendInputEvent({
				  type: up ? 'keyUp' : 'keyDown',
				  keyCode: keybindings.buttons[i].keyCode
				});
			}
		}
	}

	function handleAxes() {
		for (let i = 0; i < numAxes; i++) {
			if(gamepad.axes[i] === -1 && !axesPressState[i][0]) {
				console.log('Axes ' + i + ' = -1');
				webview.sendInputEvent({
				  type: 'keyDown',
				  keyCode: keybindings.axes[i][0]
				});
				axesPressState[i][0] = true;
			} else if(gamepad.axes[i] !== -1 && axesPressState[i][0]) {
				console.log('Axes ' + i + ' != -1');
				axesPressState[i][0] = false;
				webview.sendInputEvent({
				  type: 'keyUp',
				  keyCode: keybindings.axes[i][0]
				});
			}

			if(gamepad.axes[i] === 1 && !axesPressState[i][1]) {
				console.log('Axes ' + i + ' = 1');
				webview.sendInputEvent({
				  type: 'keyDown',
				  keyCode: keybindings.axes[i][1]
				});
				axesPressState[i][1] = true;
			} else if(gamepad.axes[i] !== 1 && axesPressState[i][1]) {
				console.log('Axes ' + i + ' != 1');
				axesPressState[i][1] = false;
				webview.sendInputEvent({
				  type: 'keyUp',
				  keyCode: keybindings.axes[i][1]
				});
			}
		}
	}

	function checkGoBack() {
		if (gamepad.buttons[8].pressed && gamepad.buttons[9].pressed) {
			window.history.back();
		}
	}

	function inputLoop() {
		gamepad = navigator.getGamepads()[0];

		checkGoBack();
		handleButtons();
		handleAxes();

		start = requestAnimationFrame(inputLoop);
	}
})();
