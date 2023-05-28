const path = require('path');
const { BrowserView, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const store = require('../store');

const STORE_KEY = 'tabList';

class TabHeader {
  constructor(win) {
    this.win = win;
    store.clear();
  }

  async createTabHeader() {
    const [width, height] = this.win.getSize();
    const view = new BrowserView({
      webPreferences: {
        nodeIntegration: true,
        partition: `persist:partition_${+new Date()}`,
        preload: path.join(__dirname, 'preload.js')
      }
    });

    view.setAutoResize({ width: true, height: true });
    await view.webContents.loadURL(
      isDev
        ? 'http://localhost:3000'
        : `file://${path.join(__dirname, '../build/index.html')}`
    );

    this.win.addBrowserView(view);
    view.setBounds({
      x: 0,
      y: 0,
      width,
      height
    });

    this.win.on('enter-full-screen', () => {
      view.webContents.send('enter-full-screen');
    });

    this.win.on('leave-full-screen', () => {
      view.webContents.send('leave-full-screen');
    });

    view.webContents.ipc.on('set-top-view', event => {
      this.win.setTopBrowserView(view);
    });

    view.webContents.ipc.on('reset-top-view', event => {
      const tab = store.get(STORE_KEY)?.find(o => o.active);
      const view = this.win
        .getBrowserViews()
        .find(view => view.webContents.id === tab?.key);

      if (view) {
        this.win.setTopBrowserView(view);
      }
    });

    view.webContents.ipc.on('window-move', (event, { offsetX, offsetY }) => {
      const currentPosition = this.win.getPosition();
      const [currentX, currentY] = currentPosition;
      this.win.setPosition(currentX + offsetX, currentY + offsetY);
    });

    store.onDidChange(STORE_KEY, newValue => {
      view.webContents.send('tab-list-change', newValue);
    });

    if (isDev) {
      view.webContents.openDevTools({ mode: 'detach' });
    }

    return view;
  }
}

module.exports = TabHeader;
