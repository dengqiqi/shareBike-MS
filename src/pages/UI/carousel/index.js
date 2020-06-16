import React from 'react'
import { Carousel, Card, Col, Modal  } from 'antd'
import './../ui.less'
import {
  SmileOutlined,
} from '@ant-design/icons';

export default class Carousels extends React.Component {
  

  render () {
    const imgs = ['carousel-1.jpg', 'carousel-2.jpg', 'carousel-3.jpg']
    
    return (
      <div style={{width: '100%'}}>
        <Card title='文字背景轮播' className='card-wrap'>
          <Carousel autoplay style={{ marginBottom: '20px' }}>
            <div>
              <h3>1</h3>
            </div>
            <div>
              <h3>2</h3>
            </div>
            <div>
              <h3>3</h3>
            </div>
            <div>
              <h3>4</h3>
            </div>
          </Carousel>
        </Card>

        <Card title='图片轮播' className='card-wrap'>
          <Carousel autoplay effect="fade">
            {imgs.map((item) => {
              return (
                <div>
                  <img alt='' src={'/carousel-img/' + item} style={{width: '100%'}} />
                </div>
              )
            })}
          </Carousel>
        </Card>
      </div>
    );
  }
}