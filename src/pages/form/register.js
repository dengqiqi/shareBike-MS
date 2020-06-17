import React, { useState } from 'react'
import {
  Card,
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Upload,
  Rate,
} from 'antd';
import { QuestionCircleOutlined, UploadOutlined } from '@ant-design/icons';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
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

const FormItem = Form.Item;
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const normFile = e => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const FormRegister = () => {
  const [form] = Form.useForm();

  const onFinish = values => {
    console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <FormItem name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </FormItem>
  );

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website
  }))

  return (
    <div style={{width: '100%'}}>
      <Card>
        <Form
          {...formItemLayout}
          form={form}
          name='register'
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
            age: 18
          }}
          scrollToFirstError
          layout='horizontal'
        >
          <FormItem
            name='nickname'
            label={
              <span>
                Nickname&nbsp;
                <Tooltip  title="What do you want others to call you?">
                  <QuestionCircleOutlined />
                </Tooltip>
              </span>
            }
          >
            <Input />
          </FormItem>

          <FormItem
            name='password'
            label='Password'
            rules={[
              {
                required: true,
                message: 'Please input our password!'
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </FormItem>

          <FormItem
            name='confirm'
            label='Confirm Password'
            dependencies={'password'}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!'
              },
              ({getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue('password') ===value) {
                    return Promise.resolve();
                  }

                  return Promise.reject('The two passwords that you entered do not match!');
                }
              })
            ]}
          >
            <Input.Password />
          </FormItem>

          <FormItem
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
          </FormItem>

          <Form.Item
            name="residence"
            label="Habitual Residence"
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!',
              },
            ]}
          >
            <Cascader options={residences} />
          </Form.Item>

          <FormItem
            name='sex' 
            label='性别'
          >
            <Radio.Group>
              <Radio value="1">男</Radio>
              <Radio value="2">女</Radio>
            </Radio.Group>
          </FormItem>

          <Form.Item
            name='age'
            label="Age"
          >
            <InputNumber min={1} max={120} />
          </Form.Item>

          <FormItem 
            name="isMarried" 
            label="是否已婚" 
            valuePropName="checked"
          >
            <Switch />
          </FormItem>

          <FormItem
            name="avatar"
            label="Upload Avatar"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <UploadOutlined /> Click to upload
              </Button>
            </Upload>
          </FormItem>

          <FormItem
            wrapperCol={{
              span: 24,
              offset: 8,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
}

export default  FormRegister;