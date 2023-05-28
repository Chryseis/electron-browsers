const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('bridge', {
  addTab(url) {
    ipcRenderer.send('add-tab', url);
  },
  removeTab(tabKey) {
    ipcRenderer.send('remove-tab', tabKey);
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
  },
  onTabListChange(cb) {
    ipcRenderer.on('tab-list-change', cb);
  },
  setTopView() {
    ipcRenderer.send('set-top-view');
  },
  resetTopView() {
    ipcRenderer.send('reset-top-view');
  }
});
