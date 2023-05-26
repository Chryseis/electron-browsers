import { useEffect, useState } from 'react';
import Tabs from './components/tab';

const initialItems = [
  {
    label: 'Tab 1',
    children: 'Content of Tab 1',
    key: '1'
  },
  {
    label: 'Tab 2',
    children: 'Content of Tab 2',
    key: '2'
  },
  {
    label: 'Tab 3',
    children: 'Content of Tab 3',
    key: '3'
  },
  {
    label: 'Tab 4',
    children: 'Content of Tab 4',
    key: '4'
  },
  {
    label: 'Tab 5',
    children: 'Content of Tab 5',
    key: '5'
  }
];

function App() {
  const [activeKey, setActiveKey] = useState('1');
  const [items, setItems] = useState(initialItems);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    window.bridge.onEnterFullScreen(() => {
      setFullscreen(true);
    });

    window.bridge.onLeaveFullScreen(() => {
      setFullscreen(false);
    });
  }, []);

  const addTab = () => {
    const newKey = (Number(items[items.length - 1]?.key || 0) + 1).toString();
    setItems([
      ...items,
      {
        label: `Tab ${newKey}`,
        children: `Content of Tab ${newKey}`,
        key: newKey
      }
    ]);

    setActiveKey(newKey);
  };

  const removeTab = (event, key) => {
    event.stopPropagation();

    const newItems = items.filter(o => o.key !== key);
    setItems(newItems);

    if (activeKey === key) {
      setActiveKey(newItems?.[newItems.length - 1]?.key);
    }
  };

  const onChange = (event, key) => {
    event.stopPropagation();
    setActiveKey(key);
  };

  return (
    <Tabs
      fullscreen={fullscreen}
      items={items}
      add={addTab}
      remove={removeTab}
      activeKey={activeKey}
      onChange={onChange}
    />
  );
}

export default App;
