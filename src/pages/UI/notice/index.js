import React from 'react'
import { Card, Button, notification  } from 'antd'
import './../ui.less'
import {
  SmileOutlined,
} from '@ant-design/icons';

export default class Notice extends React.Component {
  openNotification = (type, dir) => {
    if (dir) {
      notification[type]({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        placement: dir
      })
    } else {
      notification[type]({
        message: 'Notification Title',
        description:
          'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        // icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      })
    }
  }

  render () {
    return (
      <div style={{width: '100%'}}>
        <Card title='通知提醒框' className='card-wrap'>
          <Button type="primary" onClick={()=>this.openNotification('success')}>Success</Button>
          <Button type="primary" onClick={()=>this.openNotification('info')}>info</Button>
          <Button type="primary" onClick={()=>this.openNotification('warning')}>warning</Button>
          <Button type="primary" onClick={()=>this.openNotification('error')}>error</Button>
        </Card>
        <Card title='通知提醒框' className='card-wrap'>
          <Button type="primary" onClick={()=>this.openNotification('success', 'topLeft')}>topLeft</Button>
          <Button type="primary" onClick={()=>this.openNotification('info', 'topRight')}>topRight</Button>
          <Button type="primary" onClick={()=>this.openNotification('warning', 'bottomRight')}>bottomRight</Button>
          <Button type="primary" onClick={()=>this.openNotification('error', 'bottomLeft')}>bottomLeft</Button>
        </Card>
      </div>
    );
  }
}