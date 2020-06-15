import React from 'react'
import { Card, Button, Spin, Icon, Alert } from 'antd'
import './../ui.less'
import {
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons';

export default class Loadings extends React.Component {

  render () {
    const loading = <LoadingOutlined />
    const plus = <PlusOutlined />
    
    return (
      <div style={{width: '100%'}}>
        <Card title='Spin的用法' className='card-wrap'>
          <Spin indicator={loading} />
          <Spin indicator={loading} size='large' />
          <Spin indicator={plus} spinning={true} size='large' />
        </Card>
        <Card title='内容遮罩' className='card-wrap'>
          <Alert 
            message="Alert message title"
            description="Further details about the context of this alert."
            type="info"
          />
          <Alert 
            message="Alert message title"
            description="Further details about the context of this alert."
            type="warning"
          />
          <Spin indicator={loading}>
            <Alert 
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
          <Spin indicator={loading} tip='Loading...'>
            <Alert 
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
        </Card>
      </div>
    );
  }
}