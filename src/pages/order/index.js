import React from 'react'
import { 
  Table, Form, Card, Button, Select,
  DatePicker, Modal, message
} from 'antd'
import axios from './../../axios/index'
import Utils from './../../utils/utils'

const FormItem = Form.Item;
const { Option } = Select;

export default class order extends React.Component {
  state = {
    orderConfirmVisible: false,
    orderInfo: {},
  }

  params = {
    page: 1
  }

  requestList = () => {
    const _this = this;
    axios.ajax({
      url: '/order/list',
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
    })
  }

  // 订单确认
  handleConFirm = () => {
    let item = this.state.selectedItem;

    if (!item) {
      Modal.info({
        title: '信息',
        content: '请选择一条订单进行结束'
      });
      return;
    } 
    axios.ajax({
      url: '/order/ebike_info',
      data: {
        params: item.id
      }
    }).then((res)=>{
      if (res.code === 0) {
        this.setState({
          orderInfo: res.result,
          orderConfirmVisible: true
        })
      }
    })
  }

  // 结束订单
  handleFinishOrder = () => {
    axios.ajax({
      url: '/order/finish_order',
      data: {
        params: 1
      }
    }).then((res)=>{
      if (res.code === 0) {
        message.success('订单结束成功')
        this.setState({
          orderInfo: res.result,
          orderConfirmVisible: false
        })
        this.requestList();
      }
    })
  }

  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
        selectedRowKeys: selectKey,
        selectedItem: record
    })
  }

  openOrderDetail = () => {
    let item = this.state.selectedItem;

    if (!item) {
      Modal.info({
        title: '信息',
        content: '请先选择一条订单进行结束'
      })
      return ;
    }
    window.open(`/#/common/order/detail/${item.id}`, '_blank')
  }

  componentDidMount() {
    this.requestList();
  }

  render () {
    const columns = [
      {
          title:'订单编号',
          dataIndex:'order_sn'
      },
      {
          title: '车辆编号',
          dataIndex: 'bike_sn'
      },
      {
          title: '用户名',
          dataIndex: 'user_name'
      },
      {
          title: '手机号',
          dataIndex: 'mobile'
      },
      {
          title: '里程',
          dataIndex: 'distance',
          // render(distance){
          //     return distance/1000 + 'Km';
          // }
      },
      {
          title: '行驶时长',
          dataIndex: 'total_time'
      },
      {
          title: '状态',
          dataIndex: 'status'
      },
      {
          title: '开始时间',
          dataIndex: 'start_time'
      },
      {
          title: '结束时间',
          dataIndex: 'end_time'
      },
      {
          title: '订单金额',
          dataIndex: 'total_fee'
      },
      {
          title: '实付金额',
          dataIndex: 'user_pay'
      }
    ];

    const formItemLayout = {
      labelCol: {span: 5},
      wrapperCol: {span: 19}
    }

    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    }

    return (
      <div style={{width: '100%'}}>
        <Card>
          <FilterForm />
        </Card>

        <Card style={{marginTop: 10}}>
          <Button type='primary' onClick={this.openOrderDetail}>订单详情</Button>
          <Button 
            type='primary' style={{marginLeft: 10}}
            onClick={this.handleConFirm}
          >
            结束订单
          </Button>
        </Card>

        <div className='content-wrap'>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.list}
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={(record, index) => {
              return {
                onClick: (e) => {
                  e.preventDefault();
                  // e.stopPropagation();
                  console.log(e, '----------------------')
                  this.onRowClick(record, index);
                }
              };
            }}
          />
        </div>

        <Modal
          title='结束订单'
          visible={this.state.orderConfirmVisible}
          onCancel={()=>{
            this.setState({
              orderConfirmVisible: false
            })
          }}
          onOk={this.handleFinishOrder}
          width={600}
        >
          <Form layout='horizontal'>
            <FormItem
              label='车辆编号'
              {...formItemLayout}
            >
              {this.state.orderInfo.bike_sn}
            </FormItem>
            <FormItem
              label='剩余电量'
              {...formItemLayout}
            >
              {this.state.orderInfo.battery + '%'}
            </FormItem>
            <FormItem
              label='行程开始时间'
              {...formItemLayout}
            >
              {this.state.orderInfo.start_time}
            </FormItem>
            <FormItem
              label='当前位置'
              {...formItemLayout}
            >
              {this.state.orderInfo.location}
            </FormItem>
          </Form>
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
            // noStyle
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
            label='订单时间'
            name="start_time"
            rules={[{ required: true, message: 'start_time is required' }]}
          >
            <DatePicker />
          </FormItem>
          <FormItem
            // style={{marginLeft: '5px'}}
            label='~'
            name="end_time"
          >
            <DatePicker />
          </FormItem>

          <FormItem
            label='订单状态'
            name="op_model"
            rules={[{ required: true, message: 'op_model is required' }]}
          >
            <Select placeholder='全部' style={{width: '100px'}}>
              <Option value=''>全部</Option>
              <Option value='1'>进行中</Option>
              <Option value='2'>结束行程</Option>
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
