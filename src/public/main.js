const {app, BrowserView, BrowserWindow } = require('electron')

function createWindow() {
	const win = new BrowserWindow({ width: 1280, height: 800 })

	const view = new BrowserView()
	win.setBrowserView(view)
	view.setBounds({ x: 0, y: 0, width: 1280, height: 720 })
	
	// view.webContents.loadURL('https://google.com/')
	view.webContents.loadFile('src/public/index.html')
	
}

app.whenReady().then(createWindow)

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