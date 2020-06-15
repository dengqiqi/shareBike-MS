import React from 'react'
import { Card, Button, Radio } from 'antd'
import './index.less'
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  DownloadOutlined,
  LeftOutlined,
  RightOutlined
} from '@ant-design/icons';



export default class Buttons extends React.Component {
  state = {
    loading: true,
    size: 'default'
  };

  hadnleLoading = () => {
    this.setState({
      loading: false,
    });
  }

  handleSizeChange = (e) => {
    this.setState({
      size: e.target.value
    });
  }

  render () {
    return (
      <div style={{ width: '100%' }}>
        <Card title="基础按钮" bordered={true} className='card-button'>
          <Button className='button-base' type='primary'>Primary</Button>
          <Button className='button-base'>default</Button>
          <Button className='button-base' type='dashed'>dashed</Button>
          <Button className='button-base' type='danger'>danger</Button>
          <Button className='button-base' disabled>disabled</Button>
        </Card>
        <Card title="图形按钮" bordered={true} className='card-button'>
          <Button className='button-base' icon={<PlusOutlined />} type='primary'>添加</Button>
          <Button className='button-base' icon={<EditOutlined />} type='primary'>编辑</Button>
          <Button className='button-base' icon={<DeleteOutlined />} type='primary'>删除</Button>
          <Button className='button-base' icon={<SearchOutlined />} shape='circle'></Button>
          <Button className='button-base' icon={<SearchOutlined />} type='primary'>搜索</Button>
          <Button className='button-base' icon={<DownloadOutlined />} type='primary'>下载</Button>
        </Card>
        <Card title="Loading按钮" bordered={this.state.loading} className='card-button'>
          <Button className='button-base' type='primary' loading={this.state.loading}>OK</Button>
          <Button className='button-base' type='primary' loading={this.state.loading} shape='circle'></Button>
          <Button className='button-base' loading={this.state.loading}>点击加载</Button>
          <Button className='button-base' shape='circle' loading={this.state.loading}></Button>
          <Button className='button-base' type='primary' onClick={this.hadnleLoading}>关闭</Button>
        </Card>
        <Card title="按钮组" bordered={true} className='card-button'>
          {/* <Button.Group> */}
            <Button type='primary' icon={<LeftOutlined />}>返回</Button>
            <Button type='primary' icon={<RightOutlined />}>前进</Button>
          {/* </Button.Group> */}
        </Card>
        <Card title="按钮尺寸" bordered={true} className='card-button'>
          <Radio.Group value={this.state.size} onChange={this.handleSizeChange}>
            <Radio value='small'>小</Radio>
            <Radio value='default'>中</Radio>
            <Radio value='large'>大</Radio>
          </Radio.Group>
          <Button className='button-base' size={this.state.size} type='primary'>Primary</Button>
          <Button className='button-base' size={this.state.size}>default</Button>
          <Button className='button-base' size={this.state.size} type='dashed'>dashed</Button>
          <Button className='button-base' size={this.state.size} type='danger'>danger</Button>
          <Button className='button-base' size={this.state.size} disabled>disabled</Button>
        </Card>
      </div>
    );
  }
}