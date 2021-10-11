const {app, BrowserView, BrowserWindow } = require('electron')
const { exit } = require('process')

function createWindow() {
	const win = new BrowserWindow({ width: 1280, height: 800 })

	const view = new BrowserView()
	win.setBrowserView(view)
	view.setBounds({ x: 0, y: 0, width: 1280, height: 720 })
	
	// view.webContents.loadURL('https://google.com/')
	view.webContents.loadFile('src/public/index.html')
}

app.whenReady().then(() => {
    var python = require('child_process').spawn('java', ['-jar', 'src/server/backend.jar']);
    python.stdout.on('data',function(data){
		var statement = data.toString('utf8')
	    console.log(statement);

		if(statement.includes("Backend Started")){
			console.log("start")
			createWindow()
		}

		if(statement.includes("Stopped Jooby")){
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