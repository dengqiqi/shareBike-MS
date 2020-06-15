import React from 'react'
import { Card, Button, Modal } from 'antd'
import './../ui.less'
import './index.less'

export default class Modals extends React.Component {
  state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false,
  };

  handleOpen = (type) => {
    this.setState({
      [type]: true,
    })
  }

  handleHideModal = (type) => {
    this.setState({
      [type]: false
    })
  }

  handleConfirm = (type) => {
    Modal[type]({
      title: '确认？',
      content: '你会编程吗？',
      onOk(){

      },
      onCancel(){

      }
    })
  }

  render () {
    return (
      <div style={{width: '100%'}}>
        <Card title='基础弹框' className='card-wrap'>
          <Button type='primary' onClick={()=>this.handleOpen('showModal1')}>Open</Button>
          <Button type='primary' onClick={()=>this.handleOpen('showModal2')}>自定义页脚</Button>
          <Button type='primary' onClick={()=>this.handleOpen('showModal3')}>顶部20px弹框</Button>
          <Button type='primary' onClick={()=>this.handleOpen('showModal4')}>水平垂直居中</Button>
        </Card>
        <Card title='信息确认框' className='card-wrap'>
          <Button type='primary' onClick={()=>this.handleConfirm('confirm')}>Confirm</Button>
          <Button type='primary' onClick={()=>this.handleConfirm('info')}>Info</Button>
          <Button type='primary' onClick={()=>this.handleConfirm('success')}>顶部20px弹框</Button>
          <Button type='primary' onClick={()=>this.handleConfirm('warning')}>水平垂直居中</Button>
        </Card>

        <Modal
          title='Study AntD'
          visible={this.state.showModal1}
          onCancel={()=>this.handleHideModal('showModal1')}
          onOk={()=>this.handleHideModal('showModal1')}
        >
          <p>This is a Modal</p>
        </Modal>
        <Modal
          title='Study AntD'
          visible={this.state.showModal2}
          cancelText='No'
          okText='Yes'
          onCancel={()=>this.handleHideModal('showModal2')}
          onOk={()=>this.handleHideModal('showModal2')}
        >
          <p>确定吗</p>
        </Modal>
        <Modal
          title='Study AntD'
          visible={this.state.showModal3}
          onCancel={()=>this.handleHideModal('showModal3')}
          onOk={()=>this.handleHideModal('showModal3')}
          style={{top:20}}
        >
          <p>确定吗</p>
        </Modal>
        <Modal
          title='Study AntD'
          wrapClassName='vertical-center-modal '
          visible={this.state.showModal4}
          onCancel={()=>this.handleHideModal('showModal4')}
          onOk={()=>this.handleHideModal('showModal4')}
          style={{top:20}}
        >
          <p>确定吗</p>
        </Modal>
      </div>
    );
  }
}