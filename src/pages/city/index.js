import React from 'react'
import { 
  Card, Button, 
  Form, Select, Table
} from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'


const { Option } = Select;
const FormItem = Form.Item;

export default class City extends React.Component {
  state = {}
  params = {page: 1}
  // 默认请求我们的接口数据
  requestList = () => {
    let _this = this;
    axios.ajax({
      url: '/open_city',
      data: {
        params: {
          page: this.params.page
        }
      }
    }).then((res)=>{
      let list = res.result.item_list.map((item, index)=>{
        item.key = index
        return item; // is required
      })

      this.setState({
        list,
        pagination:Utils.pagination(res,(current)=>{
            _this.params.page = current;
            _this.requestList();
        })
      })
      console.log(this.state)
    })
  }

  // 开通城市
  handleOpenCity = () => {

  }

  componentDidMount() {
    this.requestList();
  }

  render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      }, {
        title: '城市名称',
        dataIndex: 'name'
      }, {
        title: '用车模式',
        dataIndex: 'model'
      }, {
        title: '营运模式',
        dataIndex: 'op_model'
      }, {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      }, {
        title: '城市管理员',
        dataIndex: 'city_admins',
        render(arr){
          return arr.map((item)=>{
            return item.user_name;
          }).join(',');
        }
      }, {
        title: '城市开通时间',
        dataIndex: 'open_time'
      }, {
        title: '操作时间',
        dataIndex: 'update_time'
      }, {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ];
    return (
      <div style={{width: '100%'}}>
        <Card>
          <FilterForm />
        </Card>

        <Card style={{marginTop: 10}}>
          <Button type='primary' onClick={this.handleOpenCity}>开通城市</Button>
        </Card>

        <div className='content-wrap'>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>
      </div>
    );
  }
}

class FilterForm extends React.Component {

  render() {
    return (
      <div>
        <Form layout='inline'>
          <FormItem label='城市'>
            <FormItem
              name="city"
              noStyle
              rules={[{ required: true, message: 'city is required' }]}
            >
              <Select placeholder='全部' style={{width: '100px'}}>
                <Option value=''>全部</Option>
                <Option value='1'>北京市</Option>
                <Option value='2'>上海市</Option>
                <Option value='3'>天津市</Option>
              </Select>
            </FormItem>
          </FormItem>

          <FormItem label='用车模式'>
            <FormItem
              name="model"
              noStyle
              rules={[{ required: true, message: 'model is required' }]}
            >
              <Select placeholder='全部' style={{width: '150px'}}>
                <Option value=''>全部</Option>
                <Option value='1'>指定停车点模式</Option>
                <Option value='2'>禁停区模式</Option>
              </Select>
            </FormItem>
          </FormItem>

          <FormItem label='营运模式'>
            <FormItem
              name="op_model"
              noStyle
              rules={[{ required: true, message: 'op_model is required' }]}
            >
              <Select placeholder='全部' style={{width: '100px'}}>
                <Option value=''>全部</Option>
                <Option value='1'>自营</Option>
                <Option value='2'>加盟</Option>
              </Select>
            </FormItem>
          </FormItem>

          <FormItem label='加盟商授权状态'>
            <FormItem
              name="auth_status"
              noStyle
              rules={[{ required: true, message: 'model is required' }]}
            >
              <Select placeholder='全部' style={{width: '100px'}}>
                <Option value=''>全部</Option>
                <Option value='1'>已授权</Option>
                <Option value='2'>未授权</Option>
              </Select>
            </FormItem>
          </FormItem>

          <FormItem>
            <Button 
              type='primary'
              style={{
                margin: '0 20px'
              }}
            >
              查询
            </Button>
            <Button>重置</Button>
          </FormItem>
        </Form>
      </div>
      );
  }
}
// FilterForm = Form.create({})(FilterForm);