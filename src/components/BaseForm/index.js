import React from 'react'
import {
  Input, Form, Button, Select, Checkbox, Radio
} from 'antd'
import { render } from 'less';
import Utils from './../../utils/utils'

const FormItem = Form.Item;
const { Option } = Select;

export default class BaseForm extends React.Component {

  handleFilterSubmit = () => {
    let fieldsValue =  this.props.form.getFieldsValue();

    this.props.filterSubmit(fieldsValue);
  }

  initFormList = () => {
    const formList = this.props.formList;
    const formItemList = [];

    if (formList && formList.length > 0) {
      formList.map((item) => {
        let label = item.label;
        let field = item.field;
        let initValue = item.initialValue || '';
        let placeholder = item.placeholder;
        let width = item.width;

        if (item.type === 'INPUT') {
          const INPUT = <FormItem label={label} name={field} key={field} initialValue={initValue}>
            {
              <Input type='text' placeholder={placeholder} />
            }
          </FormItem>;
          formItemList.push(INPUT);
        } else if (item.type === 'SELECT') {
          const SELECT = <FormItem label={label} name={field} key={field} initialValue={initValue}>
            {
              <Select placeholder={placeholder} style={{width}}>
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
  }

  render() {
    return (
      <Form layout='inline'>
        { this.initFormList() }
        <Button type='primary' style={{margin: '0 24px'}} onClick={this.handleFilterSubmit}>查询</Button>
        <Button onClick={this.reset}>重置</Button>
      </Form>
    );
  }
}