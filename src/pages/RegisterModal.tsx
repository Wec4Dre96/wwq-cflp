import React from "react";
import { Form, Select, Input, Button, Checkbox, Radio, message } from "antd";
import { StyledModal } from "../styledComponents";
import { registerUserInfo, USER_INFO } from '../common';

interface RegisterModalProps {
  modalVisible: any;
  setModalVisible: Function;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterModal = (props: RegisterModalProps) => {
  const { modalVisible, setModalVisible } = props;
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setModalVisible(false);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setModalVisible(false);
  };
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    // 注册后将信息放到store里，sessionstorage也做一个备份
    const res = await registerUserInfo({
      ...values,
      confirmPwd: values.pwd,
    });
    if (res.status === 200) {
      window.sessionStorage.setItem(USER_INFO, JSON.stringify(res.data));
      window.location.href = "/application";
    } else {
      message.warning('User is existed!');
    }
  };

  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle initialValue="86">
      <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  return (
    <StyledModal
      width={432}
      title="Register"
      visible={modalVisible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
      footer={null}
      maskClosable={false}
      keyboard={false}
      maskStyle={{ backgroundColor: "rgba(255, 255, 255, .8)" }}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Username is required!",
            },
            {
              min: 2,
              message: "Your username is too short!",
            },
          ]}
        >
          <Input placeholder="Username" type="text" />
        </Form.Item>

        <Form.Item
          name="pwd"
          rules={[
            {
              required: true,
              message: "Password is required!",
            },
            {
              min: 6,
              message: "Your password is too short!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="Password" type="text" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input placeholder="email" type="email" />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              len: 11,
              message: "Please enter your 11 digit phone number!",
            },
          ]}
        >
          <Input addonBefore={prefixSelector} placeholder="Phone Number" />
        </Form.Item>

        <Form.Item
          name="userType"
          label="user type"
          initialValue="client"
          rules={[{ required: true, message: "Please pick an User Type!" }]}
        >
          <Radio.Group>
            <Radio.Button value="client">client</Radio.Button>
            <Radio.Button value="company">company</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Should accept agreement")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="a">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </StyledModal>
  );
};

export default RegisterModal;
