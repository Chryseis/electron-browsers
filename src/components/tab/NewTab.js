import { Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';

const NewTab = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title='Create a new Tab'
      okText='Create'
      cancelText='Cancel'
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
            onCancel();
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout='vertical'
        name='form_in_modal'
        initialValues={{
          modifier: 'public'
        }}
      >
        <Form.Item name='url'>
          <Input addonBefore='https://' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewTab.propsTypes = {
  open: PropTypes.bool.isRequired,
  onCreate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired
};

export default NewTab;
