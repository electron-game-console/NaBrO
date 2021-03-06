'use strict';

const electron = require('electron');

const localShortcut = require('electron-localshortcut');

// Module to control application life.
// Module to create native browser window.
const {app, BrowserWindow} = electron;
const path = require('path');
const url = require('url');

app.commandLine.appendSwitch('ignore-gpu-blacklist');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', function() {
    // Unregister all shortcuts.
    localShortcut.unregisterAll();
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

function createWindow () {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize;

    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        fullscreen: true
    });

    localShortcut.register('Shift+Esc', function() {
      app.quit();
    });

	var devToolsKey = null;

	if(process.platform === 'linux') {
		devToolsKey = 'F12';
	} else {
		devToolsKey = 'Shift+F10';
	}

    localShortcut.register(devToolsKey, function() {
  		toggleDevTools();
  	});

	mainWindow.webContents.on('did-finish-load', function() {
		var currentUrl = mainWindow.webContents.getURL();

		console.log('Event: did-finish-load ' + currentUrl);

	});
//mainWindow.webContents.openDevTools();
    mainWindow.setMenu(null);

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));



    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

function toggleDevTools() {
	if(mainWindow.webContents.isDevToolsOpened()) {
		mainWindow.webContents.closeDevTools();
	} else {
		mainWindow.webContents.openDevTools();
	}
}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
