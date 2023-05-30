const path = require('path');
const { BrowserView, ipcMain } = require('electron');
const store = require('../store');
const isDev = require('electron-is-dev');

const STORE_KEY = 'tabList';

class TabContent {
  constructor(win) {
    this.win = win;
    this.tabHeight = 50;
    ipcMain.on('add-tab', (event, url) => this.addTab(url));
    ipcMain.on('remove-tab', (event, tabKey) => {
      this.removeTab(tabKey);
    });
    ipcMain.on('select-tab', (event, tabKey) => {
      this.selectTab(tabKey);
    });
  }

  async addTab(url) {
    const [width, height] = this.win.getSize();
    const view = new BrowserView({
      webPreferences: {
        nodeIntegration: true,
        partition: `persist:partition_${+new Date()}`,
        preload: path.join(__dirname, 'preload.js')
      }
    });
    view.setAutoResize({ width: true, height: true });
    await view.webContents.loadURL(url);
    const viewId = view.webContents.id;
    const title = view.webContents.getTitle();
    this.win.addBrowserView(view);
    const tabList = store.get(STORE_KEY) || [];
    tabList.push({ key: viewId, label: title });
    store.set(
      STORE_KEY,
      tabList.map((o, i) => {
        return { ...o, active: i === tabList.length - 1 };
      })
    );
    view.setBounds({
      x: 0,
      y: this.tabHeight,
      width,
      height: height - this.tabHeight
    });

    if (isDev) {
      view.webContents.openDevTools({ mode: 'bottom' });
    }
  }

  removeTab(tabKey) {
    const restTabList = store.get(STORE_KEY).filter(o => o.key !== tabKey);

    const removeView = this.win
      .getBrowserViews()
      .find(view => view.webContents.id === tabKey);

    if (removeView) {
      this.win.removeBrowserView(removeView);
    }

    if (!restTabList.some(o => o.active)) {
      store.set(
        STORE_KEY,
        restTabList.map((o, i) => {
          return { ...o, active: i === restTabList.length - 1 };
        })
      );
    }

    store.set(STORE_KEY, restTabList);
  }

  selectTab(tabKey) {
    const view = this.win
      .getBrowserViews()
      .find(view => view.webContents.id === tabKey);

    const tabList = store.get(STORE_KEY).map(o => {
      return { ...o, active: o.key === tabKey };
    });

    this.win.setTopBrowserView(view);

    store.set(STORE_KEY, tabList);
  }
}

module.exports = TabContent;
