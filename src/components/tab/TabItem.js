import './tabItem.less';
import { CloseOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function TabItem(props) {
  return (
    <div
      className={`tab-item ${props.active ? 'active' : ''}`.trimEnd()}
      onMouseDown={props.onClick}
    >
      <div className='tab-item__content'>
        <div className='tab-item__title'>{props.children}</div>
        <div className='tab-item__close' onClick={props.onClose}>
          <CloseOutlined />
        </div>
      </div>
      <div className='tab-item__split-line'></div>
      <div className='tab-item__last-split-line'></div>
    </div>
  );
}

TabItem.propsTypes = {
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TabItem;
