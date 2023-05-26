const { contextBridge, ipcRenderer } = require('electron');
const store = require('./store');

contextBridge.exposeInMainWorld('bridge', {
  tabList: store.get('tabList'),
  addTab(tabInfo, tabList) {
    ipcRenderer.send('add-tab', tabInfo);
    store.set('tabList', tabList);
  },
  removeTab(tabKey, tabList) {
    ipcRenderer.send('remove-tab', tabKey);
    store.set('tabList', tabList);
  },
  selectTab(tabKey) {
    ipcRenderer.send('select-tab', tabKey);
  },
  moveWindow({ offsetX, offsetY }) {
    ipcRenderer.send('window-move', { offsetX, offsetY });
  },
  onEnterFullScreen(cb) {
    ipcRenderer.on('enter-full-screen', cb);
  },
  onLeaveFullScreen(cb) {
    ipcRenderer.on('leave-full-screen', cb);
  }
});
