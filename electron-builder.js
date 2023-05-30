module.exports = {
  appId: 'com.electron.chryseis',
  productName: 'electron-element',
  compression: 'maximum',
  copyright: 'Copyright © 2023 chryseis',
  nsis: {
    oneClick: false
  },
  directories: {
    output: 'out',
    buildResources: 'assets'
  },
  files: ['public/**/*', 'build/**/*', 'node_modules/**/*', 'package.json'],
  extends: null,
  extraMetadata: {
    isProduction: Boolean(process.env.NODE_ENV === 'production')
  },
  win: {
    target: [
      {
        target: 'nsis',
        arch: ['x64', 'ia32']
      }
    ],
    publisherName: ['chryseis.cn'],
    // certificateFile: './assets/cert.pfx',
    // certificatePassword: '1234qwer',
    verifyUpdateCodeSignature: false
  },
  publish: {
    provider: 'generic',
    url: 'http://download.chryseis.cn'
  }
};
