const {app, BrowserWindow, Tray, Menu} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
require('@electron/remote/main').initialize(); // used for IPC


let mainWindow;
let trayIcon;

function createWindow(){
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 720,
        title: 'CloudScholar',
        icon: __dirname+'/cs_icon.png',
        webPreferences:{
            enableRemoteModule: true
        }
    });
    
    mainWindow.on('close', function (event) {
      if(!app.isQuiting){
          event.preventDefault();
          mainWindow.hide();
      }
    
      return false;
    });

    // Where window is loaded from.
    mainWindow.setMenu(null);
    mainWindow.loadURL(isDev ? 'http://localhost:3000' :`file://${path.join(__dirname, '../build/index.html')}`);



    var contextMenu = Menu.buildFromTemplate([
      { label: 'Show App', click:  function(){
          mainWindow.show();
      } },
      { label: 'Quit', click:  function(){
          app.isQuiting = true;
          app.quit();
      } }
    ]);
    
    
    
    trayIcon = new Tray(__dirname+'/cs_icon.png');
    trayIcon.setToolTip('CloudScholar');
    trayIcon.setContextMenu(contextMenu);
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});



