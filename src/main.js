const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}
const isMac = process.platform === "darwin";
const isDev = process.env.NODE_ENV !== "development";

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        title: "Image Resizer",
        width: isDev ? 1000 : 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // Open devtools if in dev env
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    // and load the index.html of the app.
    mainWindow.loadFile(path.join(__dirname, "./renderer/index.html"));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// App is ready
app.whenReady().then(() => {
    createWindow();

    // Implement menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on("activate", () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Menu Template
const menu = [
    {
        label: "File",
        submenu: [{ label: "Quit", click: () => app.quit(), accelerator: "CmdOrCtrl+W" }],
    },
];

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (!isMac) {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
