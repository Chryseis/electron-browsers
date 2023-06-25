import './index.less';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ReloadOutlined
} from '@ant-design/icons';

function SearchBar() {
  const [url, setUrl] = useState('');

  const inputEl = useRef(null);

  const onChange = e => {
    setUrl(e.target.value);
  };

  const confirmUrl = e => {
    if (e.code === 'Enter') {
      window.bridge.urlChange(url);
    }
  };

  return (
    <div className='search-bar'>
      <div className='search-bar__operate'>
        <div className='search-bar__back'>
          <ArrowLeftOutlined />
        </div>
        <div className='search-bar__forward'>
          <ArrowRightOutlined />
        </div>
        <div className='search-bar__refresh'>
          <ReloadOutlined />
        </div>
      </div>
      <div className='search-bar__input'>
        <input
          ref={inputEl}
          type='text'
          value={url}
          onChange={onChange}
          onKeyDown={confirmUrl}
        />
      </div>
    </div>
  );
}

export default SearchBar;
