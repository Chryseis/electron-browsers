import { ConfigProvider } from 'antd';
import Container from './router';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#69b1ff'
        }
      }}
    >
      <Container />
    </ConfigProvider>
  );
}

export default App;
