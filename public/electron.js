// ./public/electron.js
const path = require('path');

const { app, BrowserWindow } = require('electron');
const TabHeader = require('./tabHeader');
const TabContent = require('./tabContent');

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

  const tabHeader = new TabHeader(win);

  await tabHeader.createTabHeader();

  const tabContent = new TabContent(win);
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
