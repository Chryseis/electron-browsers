const { BrowserView } = require('electron');

function createBrowserView(options) {
  const view = new BrowserView(options);

  view.setAutoResize({ width: true, height: true });

  return view;
}

module.exports = createBrowserView;
