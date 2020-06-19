import React from 'react'
import {
  Card,
  Table,
  message,
  Button
} from 'antd'
// import axios from 'axios'
import axios from './../../axios'
import {Modal} from 'antd';
import utils from '../../utils/utils';

export default class BasicTable extends React.Component{
  state = {};

  params = {
    page: 1
  }

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
    let _this = this;
   axios.ajax({
     url: '/table/list',
     data:{
       params: {
         page:this.params.page
       },
       loading: true
     }
   }).then((res)=>{
     res.result.list.map((item, index)=>{
      item.key = index;
     })
     if (res.code === 0) {
       this.setState({
         dataSource2: res.result.list,
         selectedRowKeys: [],
         selectedRows: null,
         pagination: utils.pagination(res, (current)=>{
          // todo
          _this.params.page = current;
          this.request();
         })
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

  handleDelete = () => {
    let rows = this.state.selectedRows;
    let ids = [];
    rows.map((item)=>{
      ids.push(item.id)
    })
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗?${ids.join(',')}`,
      onOk: ()=>{
        message.success('删除成功');
        this.request();
      }
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
    };

    const rowCheckSelection = {
      type:'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows)=>{
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    };

    return (
      <div style={{width: '100%'}}>
        <Card
          title="基础表格"
        >
          <Table 
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            pagination={this.state.pagination}
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
            pagination={this.state.pagination}
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
            pagination={this.state.pagination}
            onRow={(record, index) => {
              return {
                onClick: () => {
                  this.onRowClick(record, index)
                },
              };
            }}
          />
        </Card>

        <Card
          title="Mock-复选"
          style={{margin: '10px 0'}}
        >
          <div>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table 
            columns={columns}
            rowSelection={rowCheckSelection}
            dataSource={this.state.dataSource2}
            bordered
            pagination={this.state.pagination}
          />
        </Card>

        <Card
          title="Mock-表格分页"
          style={{margin: '10px 0'}}
        >
          <div>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table 
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}