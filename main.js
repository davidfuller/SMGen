const {app, BrowserWindow, ipcMain} =  require('electron');
const path = require('path')

let win = null;

const createWindow = () => {
    win = new BrowserWindow({
      width: 1200,
      height: 1300,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: true,
        contextIsolation: false
      }
    })
  
    win.loadFile('index.html')
  }
  app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  })

  ipcMain.on("sendMessage", (event, data) => {
    const myMessage = data;
    win.webContents.send("receiveMessage", myMessage);
  });

