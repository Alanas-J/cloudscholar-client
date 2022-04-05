const {app, BrowserWindow, Tray, Menu} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
require('@electron/remote/main').initialize(); // used for IPC

app.setAppUserModelId("CloudScholar");
app.on('ready', applicationStart);

let trayIcon; // Tray icon gets garbage collected if not stored.

function applicationStart(){

    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        title: 'CloudScholar',
        icon: __dirname+'/icon.png',
        webPreferences:{
            devTools: true,
            enableRemoteModule: true
        }
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL(isDev ? 'http://localhost:3000' :`file://${path.join(__dirname, '../build/index.html')}`);
    

    // Hide window instead of closing.
    mainWindow.on('close', (event) => {
      if(!app.isQuiting){
          event.preventDefault();
          mainWindow.hide();
      }
    
      return false;
    });

    
    // Icon tray options
    const trayContextMenu = Menu.buildFromTemplate([
            {   
                label: 'CloudScholar', enabled: false,
            },
            {
                type: 'separator'
            },
            { 
                label: 'Show App', click: () => { mainWindow.show()} 
            },
            { 
                label: 'Quit', click:  () => {
                    app.isQuiting = true;
                    app.quit();
                } 
            }]
         );

    // Icon tray init
    trayIcon = new Tray(__dirname+'/icon.png');
    trayIcon.setToolTip('CloudScholar');     
    trayIcon.setContextMenu(trayContextMenu);

}







