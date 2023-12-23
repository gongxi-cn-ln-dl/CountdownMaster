const { app, BrowserWindow, screen } = require('electron');
const path = require('node:path');

// Constant for window frame thickness
const THICK_FRAME = false;

// Function to create the main window
function createWindow() {
    // Get the width and height of the primary display's work area
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // Create a new BrowserWindow instance
    const mainWindow = new BrowserWindow({
        width: width,
        height: height,
        x: 0,
        y: 0,
        frame: false, // Disable window frame
        title: 'countdownmaster',
        titleBarStyle: 'hidden',
        skipTaskbar: true,
        transparent: true, // Make the window transparent
        thickFrame: THICK_FRAME, // Use the specified frame thickness
        movable: false,
        closable: false,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js'), // Load a script before the page loads
            nodeIntegration: true,
            hardwareAcceleration: true,
        },
        focusable: false, // Make the window not focusable
    });

    // Event handler for when the window is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Set the window to ignore mouse events
    mainWindow.setIgnoreMouseEvents(true);

    // Set the window to not always be on top
    mainWindow.setAlwaysOnTop(false, "status");

    // Load the HTML file into the window
    mainWindow.loadFile('index.html');
}

// Event handler for when all windows are closed
app.on('window-all-closed', () => {
    // On macOS, it is common for applications to stay open until explicitly quit by the user
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Event handler for when the application is activated
app.on('activate', () => {
    // On macOS, re-create a window even after all windows have been closed
    if (mainWindow === null) {
        mainWindow = createWindow();
    }
});

// Event handler for when Electron is ready
app.on('ready', () => {
    // Create the main window when Electron is ready
    mainWindow = createWindow();
});
