// ./public/electron.js
const path = require('path');

const { app, BrowserWindow, BrowserView } = require('electron');
const isDev = require('electron-is-dev');
const store = require('./store');

async function createWindow() {
  const win = new BrowserWindow({
    width: 1334,
    height: 768,
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 20, y: 20 },
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    }
  });

  await win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  win.on('enter-full-screen', () => {
    win.webContents.send('enter-full-screen');
  });

  win.on('leave-full-screen', () => {
    win.webContents.send('leave-full-screen');
  });

  win.webContents.ipc.on('window-move', (event, { offsetX, offsetY }) => {
    const currentPosition = win.getPosition();
    const [currentX, currentY] = currentPosition;
    win.setPosition(currentX + offsetX, currentY + offsetY);
  });

  win.webContents.ipc.on('add-tab', () => {});

  win.webContents.ipc.on('remove-tab', () => {});

  win.webContents.ipc.on('select-tab', () => {});

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', async () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
});
