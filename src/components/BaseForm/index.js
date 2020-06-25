import React from 'react'
import {
  Input, Form, Button, Select, Checkbox, Radio, DatePicker
} from 'antd'
import { render } from 'less';
import Utils from './../../utils/utils'

const FormItem = Form.Item;

const BaseForm = (props) => {
  const [form] = Form.useForm();

  const handleFilterSubmit = () => {
    let fieldsValue =  form.getFieldsValue();

    props.filterSubmit(fieldsValue);
  };

  const initFormList = () => {
    const formList = props.formList;
    const formItemList = [];

    if (formList && formList.length > 0) {
      formList.map((item) => {
        let label = item.label;
        let field = item.field;
        let initValue = item.initialValue || '';
        let placeholder = item.placeholder;
        let width = item.width;

        if (item.type === '时间查询') {
          const begin_time = <FormItem label='订单时间' name={field} key={field} initialValue={initValue}>
            {
              <DatePicker showTime={true} format='YYYY-MM-DD HH:mm:ss' placeholder={placeholder} />
            }
          </FormItem>;
          formItemList.push(begin_time);

          const end_time = <FormItem label='~' colon={false} name={field} key={field}>
            {
              <DatePicker showTime={true} format='YYYY-MM-DD HH:mm:ss' placeholder={placeholder} />
            }
          </FormItem>;
          formItemList.push(end_time);
        } else if (item.type === 'INPUT') {
          const INPUT = <FormItem label={label} name={field} key={field} initialValue={initValue}>
            {
              <Input type='text' placeholder={placeholder} />
            }
          </FormItem>;
          formItemList.push(INPUT);
        } else if (item.type === 'SELECT') {
          const SELECT = <FormItem label={label} name={field} key={field}>
            {
              <Select placeholder={placeholder} style={{width}}  initialValue={initValue}>
                { Utils.getOptionList(item.list) }
              </Select>
            }
          </FormItem>;
          formItemList.push(SELECT);
        } else if (item.type === 'CHECKBOX') {
          const CHECKBOX = <FormItem label={label} name={field} key={field} initialValue={initValue}>
            {
              <Checkbox defaultChecked={true}>
                {label}
              </Checkbox>
            }
          </FormItem>;
          formItemList.push(CHECKBOX);
        }
      })
      return formItemList;
    }
  };

  const reset = () => {
    form.resetFields()
  }

  return (
    <Form layout='inline' form={form}>
      { initFormList() }
      <Button type='primary' style={{margin: '0 24px'}} onClick={handleFilterSubmit}>查询</Button>
      <Button onClick={reset}>重置</Button>
    </Form>
  );
};

export default BaseForm;