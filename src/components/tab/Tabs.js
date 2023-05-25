import './tabs.less';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';
import TabItem from './TabItem';

function Tabs(props) {
  return (
    <div className='tab-wrapper'>
      <div className='tab'>
        {props.items?.map(o => (
          <TabItem
            key={o.key}
            active={o.key === props.activeKey}
            onClick={() => props.onChange(o.key)}
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
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Tabs;
