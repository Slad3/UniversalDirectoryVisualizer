const { app, BrowserView, BrowserWindow, autoUpdater, dialog, ipcMain, ipcRenderer, contextBridge } = require('electron')
const { exit, chdir, cwd } = require('process')

const child_process = require('child_process')
const spawn = child_process.spawn


var javaProcess;

function createWindow() {
	const win = new BrowserWindow({
		width: 1280, height: 800})

	__dirname = __dirname.substr(0, __dirname.length - "public".length) + "public"

	chdir('src/public');
	win.webContents.loadFile(__dirname + "/index.html")


	// For opening the debugger inside electron
	win.webContents.openDevTools()
}

app.whenReady().then(() => {

	destroyCurrentServer()
	javaProcess = spawn('java', ['-jar', 'src/server/backend.jar']);
	console.log(javaProcess.pid)
	javaProcess.stdout.on('data', function (data) {
		var statement = data.toString('utf8');

		if (statement.includes("already in use")) {
			console.log(statement)
			console.log("Address already in use")
			destroyCurrentServer()
			exit(1)
		}

		if (statement.includes("Backend Started")) {
			console.log("start");

			require('@electron/remote/main').initialize()
			createWindow()

			const express = require('express')
			const server = express()
			const port = 39393

			const asyncHandler = require('express-async-handler')
			server.get('/', asyncHandler(async (req, res, next) => {
				let data = await fileExplorerPopUp();

				if (data.canceled) {
					res.json({ "Error": "cancelled" })
				}
				
				return res.json({"filePath": data['filePaths'][0]})

			}))
			server.listen(port, () => {
				// console.log(`Example app listening at http://localhost:${port}`)
			})


		}

		if (statement.includes("Stopped Jooby")) {
			console.log("Stopped")
			destroyCurrentServer()
			exit(1)
		}

	});

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})

	app.on('window-all-closed', async () => {

		javaProcess.stdout.destroy()
		javaProcess.stdin.destroy()
		javaProcess.stderr.destroy()

		javaProcess.kill();

		await destroyCurrentServer()

		if (process.platform !== 'darwin') {
			app.quit()
		}
	})

})

async function destroyCurrentServer() {
	const axios = require('axios');

	let pid = (await axios.get("http://localhost:18989/getProcessId")).data.pid

	console.log(pid)
	process.kill(pid)

}

async function fileExplorerPopUp() {
	return dialog.showOpenDialog({ properties: ['openDirectory', 'multiSelections'] })
}

// contextBridge.exposeInMainWorld(
// 	'electron',   //This will be exposed as window.electron in your remote app
// 	{
// 	  doThing: () => ipcRenderer.send('do-a-thing')
// 	}
//   )

// ipcMain.handle('some-name', async (event, someArgument) => {
// 	return await dialog.showOpenDialog({ properties: ['openFolder', 'multiSelections'] })
//   })

// ipcMain.on('customChannel', (event, args) => {
// 	console.log('event: ', event);
// 	console.log('args: ', args);
// });
