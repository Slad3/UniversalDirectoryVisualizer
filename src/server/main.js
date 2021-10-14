const { app, BrowserView, BrowserWindow, autoUpdater } = require('electron')
const { exit, chdir, cwd } = require('process')

const url = require("url");
const path = require("path");

function createWindow() {
	const win = new BrowserWindow({ width: 1280, height: 800 })

	__dirname = __dirname.substr(0, __dirname.length - "public".length) + "public"

	chdir('src/public');
	win.webContents.loadFile(__dirname + "/index.html")


	// For opening the debugger inside electron
	// view.webContents.openDevTools()
}

app.whenReady().then(() => {

	var python = require('child_process').spawn('java', ['-jar', 'src/server/backend.jar']);
	python.stdout.on('data', function (data) {
		var statement = data.toString('utf8')
		// console.log(statement);

		if (statement.includes("Backend Started")) {
			console.log("start")
			createWindow()
		}

		if (statement.includes("Stopped Jooby")) {
			console.log("Stopped")
			exit(1)
		}

	});
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

app.on('activate', () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow()
	}
})