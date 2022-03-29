const {app, BrowserWindow, Tray, Menu} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
require('@electron/remote/main').initialize(); // used for IPC


app.on('ready', applicationStart);


function applicationStart(){

    // Window Init
    const mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        title: 'CloudScholar',
        icon: __dirname+'/cs_icon.png',
        webPreferences:{
            devTools: true,
            enableRemoteModule: true
        }
    });

    //mainWindow.setAppDetails({appId: 'CloudScholar'});
    mainWindow.setMenu(null);
    mainWindow.loadURL(isDev ? 'http://localhost:3000' :`file://${path.join(__dirname, '../build/index.html')}`);
    

    // Hide window instead of closing.
    mainWindow.on('close', function (event) {
      if(!app.isQuiting){
          event.preventDefault();
          mainWindow.hide();
      }
    
      return false;
    });


    // Icon tray init
    const trayIcon = new Tray(__dirname+'/cs_icon.png');
    trayIcon.setToolTip('CloudScholar');

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
    trayIcon.setContextMenu(trayContextMenu);

}


app.setAppUserModelId("CloudScholar");




