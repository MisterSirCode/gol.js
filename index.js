const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

const size = 512;
const barHeight = 24;

const createWindow = () => {
    const win = new BrowserWindow({
        width: size,
        height: size + barHeight,
        resizable: false,
        useContentSize: true,
        maximizable: false,
        fullscreenable: false,
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'view/preload.js')
        }
    });
    win.loadFile('./view/view.html');
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

ipcMain.on('windowControls:minimize', (ipcEvent) => {
    const window = findBrowserWindow(ipcEvent);
    window.minimize();
});

ipcMain.on('windowControls:close', (ipcEvent) => {
    const window = findBrowserWindow(ipcEvent);
    window.close();
});

function findBrowserWindow (ipcEvent) {
    return BrowserWindow.fromWebContents(ipcEvent.sender);
}