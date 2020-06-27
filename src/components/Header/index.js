import React from 'react'
import { Row, Col } from 'antd'
import './index.less'
import Util from '../../utils/utils'
import { connect } from 'react-redux'

class Header extends React.Component{
  state = {
    userName: 'dengqq'
  }
  componentWillMount() {
    this.setState({
      usrname: 'dengqq'
    })
    setInterval(()=>{
      let sysTiem = Util.formateDate(new Date().getTime());
      this.setState({
        sysTiem
      })
    }, 1000);
  }

  render() {
    const {menuType, menuName} = this.props;
    return (
      <div className='header'>
        <Row className="header-top">
          {
            menuType ?
              <Col span="6" className="logo">
                <img src="/assets/logo-ant.svg" alt="" />
                <span>IMooc 通用管理系统</span>
              </Col> : ''
          }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.userName}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        {
          menuType ? '' :
            <Row className="breadcrumb">
              <Col span="4" className="breadcrumb-title">
                {menuName || '首页'}
              </Col>
              <Col span="20" className="weather">
                <span className="date">{this.state.sysTime}</span>
                <span className="weather-img">
                  <img src={this.state.dayPictureUrl} alt="" />
                </span>
                <span className="weather-detail">
                  {this.state.weather}
                </span>
              </Col>
            </Row>
        }
        
      </div>
    )
  }
}

const mapToProps = state => {
  return {
    menuName: state.menuName
  }
}

export default connect(mapToProps)(Header)
