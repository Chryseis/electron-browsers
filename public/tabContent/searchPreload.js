const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('bridge', {
  urlChange(url) {
    ipcRenderer.send('url-change', url);
  }
});
