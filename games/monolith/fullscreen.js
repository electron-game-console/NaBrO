(function() {
	'use strict';

	const webview = document.querySelector('webview');
	webview.addEventListener('dom-ready', function() {
		var cssAdjustments = `
			* {
				margin: 0;
				padding: 0;
			}

			canvas {
				display: block;
				height: 100vh;
				width: 100vw;
			}
		`;

		webview.insertCSS(cssAdjustments);
	});
})();
