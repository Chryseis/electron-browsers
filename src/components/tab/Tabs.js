import './tabs.less';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import useWindowMove from 'src/hooks/useWindowMove';
import TabItem from './TabItem';

function Tabs(props) {
  const tabRef = useWindowMove();

  return (
    <div className='tab-wrapper' ref={tabRef}>
      <div className={`tab ${props.fullscreen ? '' : 'min-screen'}`.trimEnd()}>
        {props.items?.map(o => (
          <TabItem
            key={o.key}
            active={o.key === props.activeKey}
            onClick={e => props.onChange(e, o.key)}
            onClose={e => props.remove(e, o.key)}
          >
            {o.children}
          </TabItem>
        ))}
      </div>
      <div className='tool-bar'>
        <div className='add-wrapper' onClick={props.add}>
          <PlusOutlined className='plus' />
        </div>
      </div>
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
