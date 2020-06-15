import React from 'react'
import { Card, Button, message } from 'antd'
import './../ui.less'

export default class Modals extends React.Component {
  handleShowMessage = (type) => {
    message[type]({
      content: 'This is a prompt message with custom className and style'
    });
  }
  

  render () {
    return (
      <div style={{width: '100%'}}>
        <Card title='全局提示框' className='card-wrap'>
          <Button type='primary' onClick={()=>this.handleShowMessage('success')}>success</Button>
          <Button type='primary' onClick={()=>this.handleShowMessage('info')}>Info</Button>
          <Button type='primary' onClick={()=>this.handleShowMessage('warning')}>warning</Button>
          <Button type='primary' onClick={()=>this.handleShowMessage('error')}>error</Button>
          <Button type='primary' onClick={()=>this.handleShowMessage('loading')}>loading</Button>
        </Card>
      </div>
    );
  }
}