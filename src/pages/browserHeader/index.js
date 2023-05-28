import { useEffect, useState } from 'react';
import Tabs from 'src/components/tab';

function BrowserHeader() {
  const [items, setItems] = useState([]);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    window.bridge.onEnterFullScreen(() => {
      setFullscreen(true);
    });

    window.bridge.onLeaveFullScreen(() => {
      setFullscreen(false);
    });

    window.bridge.onTabListChange((event, tabList) => {
      setItems(tabList);
    });
  }, []);

  const addTab = ({ url }) => {
    console.log(url);
    window.bridge.addTab(`https://${url}`);
  };

  const removeTab = (event, key) => {
    event.stopPropagation();

    window.bridge.removeTab(key);
  };

  const onChange = (event, key) => {
    event.stopPropagation();
    window.bridge.selectTab(key);
  };

  return (
    <Tabs
      fullscreen={fullscreen}
      items={items}
      add={addTab}
      remove={removeTab}
      onChange={onChange}
    />
  );
}

export default BrowserHeader;
