import React from 'react'
import {
  Card,
  Table
} from 'antd'

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
    this.setState({
      dataSource
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
        dataIndex: 'sex'
      },
      {
        title: '状态',
        dataIndex: 'state'
      },
      {
        title: '爱好',
        dataIndex: 'interest'
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

    return (
      <div style={{width: '100%'}}>
        <Card
          title="基础表格"
        >
          <Table 
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
          />
        </Card>
      </div>
    );
  }
}