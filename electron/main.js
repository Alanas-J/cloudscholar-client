const {app, BrowserWindow, Tray, Menu} = require('electron');
const path = require('path');
const mainInstance = app.requestSingleInstanceLock();
let trayIcon;
let mainWindow;

if (!mainInstance) {
    app.quit()

} else {
    app.on('second-instance', (event, commandLine, workingDirectory) => {

      if (mainWindow) {
        if(!mainWindow.isVisible())
            mainWindow.show();

        if (mainWindow.isMinimized())
            mainWindow.restore();
        
        mainWindow.focus();

      }
    });
      
    app.setAppUserModelId("CloudScholar");
    app.on('ready', applicationStart);
}


function applicationStart(){

    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        show: false,
        title: 'CloudScholar',
        icon: __dirname+'/icon.png',
        webPreferences:{
            devTools: true,
            enableRemoteModule: true
        }
    });

    mainWindow.setMenu(null);
    mainWindow.loadURL(!app.isPackaged? 'http://localhost:3000' :`file://${path.join(__dirname, '../build/index.html')}`);
    
    mainWindow.on('close', (event) => {
      if(!app.isQuiting){
          event.preventDefault();
          mainWindow.hide();
      }
    
      return false;
    });
    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.show();
    });

    const trayContextMenu = Menu.buildFromTemplate([
            {   
                label: 'CloudScholar', enabled: false,
            },
            {
                type: 'separator'
            },
            { 
                label: 'Show App', click: () => {mainWindow.show()} 
            },
            { 
                label: 'Quit', click:  () => {
                    app.isQuiting = true;
                    app.quit();
                } 
            }]
         );

    trayIcon = new Tray(__dirname+'/icon.png');
    trayIcon.setToolTip('CloudScholar');     
    trayIcon.setContextMenu(trayContextMenu);
}

