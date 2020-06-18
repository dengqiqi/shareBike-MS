import React from 'react'
import {
  Card,
  Table
} from 'antd'
// import axios from 'axios'
import axios from './../../axios'
import {Modal} from 'antd';

export default class BasicTable extends React.Component{
  state = {};

  componentDidMount() {
    const dataSource = [
      {
        id: '0',
        userName: '0',
        sex: '0',
        state: '0',
        interest: '0',
        birthday: '0',
        address: '0',
        time: '0',
      },
      {
        id: '0',
        userName: '0',
        sex: '0',
        state: '0',
        interest: '0',
        birthday: '0',
        address: '0',
        time: '0',
      },
      {
        id: '0',
        userName: '0',
        sex: '0',
        state: '0',
        interest: '0',
        birthday: '0',
        address: '0',
        time: '0',
      },
    ];
    dataSource.map((item, index) => {
      return item.key = index;
    });
    this.setState({
      dataSource
    });
    this.request();
  }

  request = () => {
   axios.ajax({
     url: '/table/list',
     data:{
       params: {
         page:1
       },
       loading: true
     }
   }).then((res)=>{
     if (res.code === 0) {
       this.setState({
         dataSource2: res.result
       })
     }
   })
  }

  onRowClick = (record, index) => {
    let selectKey = [index];
    this.setState({
      selectedRowKeys: selectKey,
      selectedItem: record
    })
    Modal.info({
      title: '信息',
      content: `${record.userName}`
    })
  }

  render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex){
          return sex  === 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state){
          let config  = {
              '1':'咸鱼一条',
              '2':'风华浪子',
              '3':'北大才子',
              '4':'百度FE',
              '5':'创业者'
          }
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(abc) {
          let config = {
              '1': '游泳',
              '2': '打篮球',
              '3': '踢足球',
              '4': '跑步',
              '5': '爬山',
              '6': '骑行',
              '7': '桌球',
              '8': '麦霸'
          }
          return config[abc];
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      },
    ];
    const { selectedRowKeys } = this.state;
    const rowSelection = {
        type:'radio',
        selectedRowKeys
    }

    return (
      <div style={{width: '100%'}}>
        <Card
          title="基础表格"
        >
          <Table 
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            pagination={false}
          />
        </Card>

        <Card
          title="Mock"
          style={{margin: '10px 0'}}
        >
          <Table 
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            pagination={false}
          />
        </Card>

        <Card
          title="Mock-单选"
          style={{margin: '10px 0'}}
        >
          <Table 
            columns={columns}
            rowSelection={rowSelection}
            dataSource={this.state.dataSource2}
            bordered
            pagination={false}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                },
              };
            }}
          />
        </Card>
      </div>
    );
  }
}