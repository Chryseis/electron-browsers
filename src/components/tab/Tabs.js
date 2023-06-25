import './tabs.less';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import useWindowMove from 'src/hooks/useWindowMove';
import TabItem from './TabItem';
import NewTab from './NewTab';

function Tabs(props) {
  const tabRef = useWindowMove();

  const [open, setOpen] = useState(false);

  const newTab = () => {
    window.bridge.setTopView();
    setOpen(true);
  };

  const onCancel = () => {
    window.bridge.resetTopView();
    setOpen(false);
  };

  return (
    <div className='tab-wrapper' ref={tabRef}>
      <div className={`tab ${props.fullscreen ? '' : 'min-screen'}`.trimEnd()}>
        {props.items?.map(o => (
          <TabItem
            key={o.key}
            active={o.active}
            onClick={e => props.onChange(e, o.key)}
            onClose={e => props.remove(e, o.key)}
          >
            {o.label}
          </TabItem>
        ))}
      </div>
      <div className='tool-bar'>
        <div className='add-wrapper' onClick={props.add}>
          <PlusOutlined className='plus' />
        </div>
      </div>
      <NewTab open={open} onCancel={onCancel} onCreate={props.add}></NewTab>
    </div>
  );
}

Tabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  fullscreen: PropTypes.bool.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Tabs;
