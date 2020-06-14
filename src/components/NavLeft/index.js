import React from 'react'
import MenuConfig from './../../config/menuConfig'
import { Menu } from 'antd';
import './index.less'
import { NavLink } from 'react-router-dom'

const { SubMenu } = Menu;

export default class NavLeft extends React.Component{
  componentWillMount() {
    const menuTreeNode = this.renderMenu(MenuConfig);

    this.setState({
      menuTreeNode
    });
  }

  renderMenu = (data) => {
    return data.map((item)=>{
      if (item.children) {
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item title={item.title} key={item.key}>
        <NavLink to={item.key}>{item.title}</NavLink>
      </Menu.Item>
    })
  }

  render() {
    return (
      <div>
        <div className='logo'>
          <img src='/assets/logo-ant.svg' alt='' />
          <h1>Imooc MS</h1>
        </div>
        <Menu theme='dark'>
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}
