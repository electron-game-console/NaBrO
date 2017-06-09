(function () {
	'use strict';

	const webview = document.querySelector('webview');

	webview.addEventListener('dom-ready', () => {
		window.addEventListener('gamepadconnected', addGamepad);
		window.addEventListener('gamepaddisconnected', removeGamepad);
  	});

	var start;
	var gamepad;
	var key0Pressed = false;

	function addGamepad(e) {
		console.log('Gamepad ' + e.gamepad.index + ' connected.');
		gamepad = navigator.getGamepads()[e.gamepad.index];

		inputLoop();
	}

	function removeGamepad(e) {
		console.log(e);
		cancelRequestAnimationFrame(start);
	}

	function inputLoop() {
		gamepad = navigator.getGamepads()[0];

		if(gamepad.buttons[0].pressed) {
			console.log('Button 0 Pressed');
			webview.sendInputEvent({
			  type: 'keyDown',
			  keyCode: 'Up'
			});
			key0Pressed = true;
		} else if(key0Pressed) {
			console.log('Button 0 Released');
			key0Pressed = false;
			webview.sendInputEvent({
			  type: 'keyUp',
			  keyCode: 'Up'
			});
		}

		start = requestAnimationFrame(inputLoop);
	}
})();
