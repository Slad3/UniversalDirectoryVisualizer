const { app, BrowserView, BrowserWindow, autoUpdater, dialog } = require('electron')
const { exit, chdir, cwd } = require('process')

const url = require("url");
const path = require("path");

function createWindow() {
	const win = new BrowserWindow({ width: 1280, height: 800 })

	__dirname = __dirname.substr(0, __dirname.length - "public".length) + "public"

	chdir('src/public');
	win.webContents.loadFile(__dirname + "/index.html")


	// For opening the debugger inside electron
	win.webContents.openDevTools()
}

app.whenReady().then(() => {

	var javaProcess = require('child_process').spawn('java', ['-jar', 'src/server/backend.jar']);
	javaProcess.stdout.on('data', function (data) {
		var statement = data.toString('utf8');
		console.log(statement);

		if (statement.includes("Backend Started")) {
			console.log("start");
			createWindow()
			// dialog.showOpenDialog({ properties: ['openFolder', 'multiSelections'] })
			// .then(data => {
			// 	console.log(data)
			// })
		}

		if (statement.includes("Stopped Jooby")) {
			console.log("Stopped")
			exit(1)
		}

	});
})

async function checkJava(){
}

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