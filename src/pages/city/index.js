import React from 'react'
import { 
  Card, Button, 
  Form, Select, Table, message
} from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'
import Modal from 'antd/lib/modal/Modal';


const { Option } = Select;
const FormItem = Form.Item;

export default class City extends React.Component {
  state = {
    list : [],
    isShowOpenCity: false
  }
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
    this.setState({
      isShowOpenCity: true
    })
  }

  // 城市开通提交
  handleSubmit = () => {
    let cityInfo = this.refs.openCityForm.formRef.current.getFieldsValue();
    axios.ajax({
      url: '/city/open',
      data: {
        params: cityInfo
      }
    }).then((res) => {
      if (res.code == '0') {
        message.success('开通成功');
        this.setState({
          isShowOpenCity: false
        })
        this.requestList();
      }
    })
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

        <Modal
          title='开通城市'
          visible={this.state.isShowOpenCity}
          onCancel={()=>{
            this.setState({
              isShowOpenCity: false
            })
          }}
          onOk={this.handleSubmit}
        >
          <OpenCityForm ref='openCityForm' />
        </Modal>
      </div>
    );
  }
}

class FilterForm extends React.Component {

  render() {
    return (
      <div>
        <Form layout='inline'>
          <FormItem
            label='城市'
            name="city"
            rules={[{ required: true, message: 'city is required' }]}
          >
            <Select placeholder='全部' style={{width: '100px'}}>
              <Option value=''>全部</Option>
              <Option value='1'>北京市</Option>
              <Option value='2'>上海市</Option>
              <Option value='3'>天津市</Option>
            </Select>
          </FormItem>

          <FormItem
            label='用车模式'
            name="model"
            rules={[{ required: true, message: 'model is required' }]}
          >
            <Select placeholder='全部' style={{width: '150px'}}>
              <Option value=''>全部</Option>
              <Option value='1'>指定停车点模式</Option>
              <Option value='2'>禁停区模式</Option>
            </Select>
          </FormItem>

          <FormItem
            label='营运模式'
            name="op_model"
            rules={[{ required: true, message: 'op_model is required' }]}
          >
            <Select placeholder='全部' style={{width: '100px'}}>
              <Option value=''>全部</Option>
              <Option value='1'>自营</Option>
              <Option value='2'>加盟</Option>
            </Select>
          </FormItem>

          <FormItem
            label='加盟商授权状态'
            name="auth_status"
            rules={[{ required: true, message: 'model is required' }]}
          >
            <Select placeholder='全部' style={{width: '100px'}}>
              <Option value=''>全部</Option>
              <Option value='1'>已授权</Option>
              <Option value='2'>未授权</Option>
            </Select>
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

class OpenCityForm extends React.Component {
  formRef = React.createRef();
  
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5,
        offset: 4
      },
      wrapperCol: {
        span: 11,
      }
    }
    return (
      <div>
        <Form
          ref={this.formRef}
          layout='horizontal'
          onFinish={this.handleSubmit}
        >
          <FormItem
            label='选择城市' {...formItemLayout}
            name='city'
            initialValue='1'
          >
            <Select placeholder='全部'>
              <Option value=''>全部</Option>
              <Option value='1'>北京市</Option>
              <Option value='2'>上海市</Option>
              <Option value='3'>天津市</Option>
            </Select>
          </FormItem>

          <FormItem
            label='营运模式' {...formItemLayout}
            name='op_model'
            initialValue='1'
          >
            <Select placeholder='全部'>
              <Option value='1'>自营</Option>
              <Option value='2'>加盟</Option>
            </Select>
          </FormItem>

          <FormItem
            label='用车模式' {...formItemLayout}
            name='model'
            initialValue='1'
          >
            <Select placeholder='全部'>
              <Option value='1'>指定停车点模式</Option>
              <Option value='2'>禁停区模式</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    );
  }
}