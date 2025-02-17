const { app, BrowserWindow } = require("electron");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1200, // Temporary size: release will be fullscreen
        height: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            devTools: true,
        },
    });

    mainWindow.loadFile("src/index.html");

    //mainWindow.removeMenu();
});
