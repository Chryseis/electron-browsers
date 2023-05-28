import { ConfigProvider } from 'antd';
import BrowserHeader from 'src/pages/browserHeader';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#69b1ff'
        }
      }}
    >
      <BrowserHeader />
    </ConfigProvider>
  );
}

export default App;
