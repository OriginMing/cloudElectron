const {BrowserWindow,app}  = require('electron')
const isDve = require('electron-is-dev')
const path = require('path')
let win;//保持变量的引用
app.on('ready',()=>{
     win = new BrowserWindow({
        width: 1024,
        height: 600,
        webPreferences:{
            preload: path.join(__dirname,'preload.js'),
            nodeIntegration:true,
            contextIsolation:false,
        }
    })
    require('@electron/remote/main').initialize()
    require('@electron/remote/main').enable(win.webContents)
    const urlLocation = isDve?"http://localhost:3000":"url"
    win.loadURL(urlLocation)
})

