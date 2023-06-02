const path = require('path');
const { ipcMain } = require('electron');
const store = require('../store');
const isDev = require('electron-is-dev');
const createBrowserView = require('../shared/createBrowserView');

const STORE_KEY = 'tabList';

class TabContent {
  constructor(win) {
    this.win = win;
    this.tabHeight = 50;
    this.searchBarHeight = 41;
    ipcMain.on('add-tab', (event, url) => this.addTab(url));
    ipcMain.on('remove-tab', (event, tabKey) => {
      this.removeTab(tabKey);
    });
    ipcMain.on('select-tab', (event, tabKey) => {
      this.selectTab(tabKey);
    });
  }

  async addTab() {
    const searchView = await this.#createSearchView();

    const contentView = await this.#createContentView();

    const title = '新标签页';

    const tabList = store.get(STORE_KEY) || [];
    tabList.push({
      key: contentView.webContents.id,
      sKey: searchView.webContents.id,
      label: title
    });
    store.set(
      STORE_KEY,
      tabList.map((o, i) => {
        return { ...o, active: i === tabList.length - 1 };
      })
    );
  }

  urlChange(tabKey, url) {}

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

  async #createSearchView() {
    const [width, height] = this.win.getSize();

    const view = createBrowserView({
      webPreferences: {
        nodeIntegration: true
      }
    });

    await view.webContents.loadURL(
      isDev
        ? 'http://localhost:3000/#/search-bar'
        : `file://${path.join(__dirname, '../build/index.html/#/search-bar')}`
    );

    this.win.addBrowserView(view);

    view.setBounds({
      x: 0,
      y: this.tabHeight,
      width,
      height: height - this.tabHeight
    });

    return view;
  }

  async #createContentView() {
    const [width, height] = this.win.getSize();

    const view = createBrowserView({
      webPreferences: {
        nodeIntegration: true,
        partition: `persist:partition_${+new Date()}`,
        preload: path.join(__dirname, 'preload.js')
      }
    });
    await view.webContents.loadURL(
      isDev
        ? 'http://localhost:3000/#/blank'
        : `file://${path.join(__dirname, '../build/index.html/#/blank')}`
    );
    this.win.addBrowserView(view);

    view.setBounds({
      x: 0,
      y: this.tabHeight + this.searchBarHeight,
      width,
      height: height - this.tabHeight - this.searchBarHeight
    });

    if (isDev) {
      view.webContents.openDevTools({ mode: 'bottom' });
    }

    return view;
  }
}

module.exports = TabContent;
