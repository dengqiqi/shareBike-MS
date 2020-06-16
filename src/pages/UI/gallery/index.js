import React from 'react'
import { Card, Row, Col, Modal  } from 'antd'
import './../ui.less'
import {
  SmileOutlined,
} from '@ant-design/icons';

export default class Gallery extends React.Component {
  state = {
    visible: false,
  }

  handleOpenGallery = (imgSrc) => {
    this.setState({
      currentImg: '/gallery/' + imgSrc,
      visible: true
    })
  }
  

  render () {
    const { Meta } = Card
    const imgs = [
      ['1.png', '2.png', '3.png', '4.png', '5.png',],
      ['6.png', '7.png', '8.png', '9.png', '10.png',],
      ['11.png', '12.png', '13.png', '14.png', '15.png',],
      ['16.png', '17.png', '18.png', '19.png', '20.png',],
      ['21.png', '22.png', '23.png', '24.png', '25.png',],
    ];
    const imgLst = imgs.map((list) => {
      return list.map((item) =>
        <Card
          className='card-wrap'
          hoverable
          cover={<img alt={item} src={'/gallery/' + item} onClick={()=>this.handleOpenGallery(item)} />}
        >
          <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
      )
    })
    return (
      <div style={{width: '100%'}}>
        <Row gutter={10}>
          <Col md={5}>
            {imgLst[0]}
          </Col>
          <Col md={5}>
            {imgLst[1]}
          </Col>
          <Col md={5}>
            {imgLst[2]}
          </Col>
          <Col md={5}>
            {imgLst[3]}
          </Col>
          <Col md={4}>
            {imgLst[4]}
          </Col>
        </Row>
        <Modal
          width={300}
          height={500}
          visible={this.state.visible}
          onCancel={()=>{
            this.setState({
              visible: false
            })
          }}
          footer={null}
          title='图标画廊'
        >
          {<img src={this.state.currentImg} alt='' style={{width: '100%'}} />}
        </Modal>
      </div>
    );
  }
}