const { app, BrowserWindow, globalShortcut,  } = require('electron')
const config = require('./config')

let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadURL(config.url)
}

app.on('window-all-closed', () => {
  process.platform !== 'darwin' && app.quit()
})

app.on('activate', () => {
  !BrowserWindow.getAllWindows().length && createWindow()
})

function toggleDevTools () {
  win.webContents.toggleDevTools()
}

function createShortcuts () {
  globalShortcut.register('CmdOrCtrl+i', toggleDevTools)
}

app.whenReady()
  .then(createWindow)
  .then(createShortcuts)
