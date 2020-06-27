import React from 'react'
import {Card, Button, Form, Input, Select, Tree, Transfer, Modal} from 'antd'
import axios from '../../axios/index'
import QTable from './../../components/QTable'
import menuConfig from '../../config/menuConfig'
import Utils from '../../utils/utils'

const FormItem = Form.Item;
const { Option } = Select;
const { TreeNode } = Tree;

export default class PermissionUser extends React.Component {

  state = {}

  componentWillMount() {
    axios.requestList(this, '/role/list', {});
  }

  createRole = () => {
    this.setState({
      isRoleVisible: true
    })
  }

  // 角色提交
  handleRoleSubmit = () => {
    let data = this.refs.roleForm.formRef.current.getFieldsValue();

    axios.ajax({
      url: '/role/create',
      data: {
        params: data
      }
    }).then((res)=>{
      if (res.code === 0) {
        this.setState({
          isRoleVisible: false
        })
        axios.requestList(this, '/role/list', {});
      }
    })
  }

  setPermission = () => {
    console.log('is OK')
    let item = this.state.selectedItem;

    if (!item) {
      Modal.info({
        title: '请选择一个角色'
      })
      return;
    }
    this.setState({
      isPermVisible: true,
      detailInfo: item,
      menuInfo: item[0].menus
    })
  }

  handlePermEditSubmit = () => {
    let data = this.refs.permEditForm.formRef.current.getFieldsValue();
    data.role_id = this.state.selectedItem[0].id;
    data.menus = this.state.menuInfo;

    axios.ajax({
      url: '/permission/edit',
      data: {
        params: {...data}
      }
    }).then((res)=>{
      if (res) {
        this.setState({
          isPermVisible: false,
        })
        axios.requestList(this, '/role/list', {});
      }
    })
  }

  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      }, {
        title: '角色名称',
        dataIndex: 'role_name'
      }, {
        title: '创建时间',
        dataIndex: 'create_time',
        render: Utils.formatTime
      }, {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          if (status === 1) {
            return "启用"
          } else {
            return "停用"
          }
        }
      }, {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: Utils.formatTime
      }, {
        title: '授权人',
        dataIndex: 'authorize_user_name',
      }
    ];
    return (
      <div style={{width: '100%'}}>
        <Card>
          <Button type='primary' onClick={this.createRole} style={{marginRight: 10}}>创建角色</Button>
          <Button type='primary' onClick={this.setPermission} style={{marginRight: 10}}>设置权限</Button>
          <Button type='primary' style={{marginRight: 10}}>用户授权</Button>
        </Card>
        <div className='content-wrap'>
          <QTable 
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            columns={columns}
            dataSource={this.state.list}
          />
        </div>

        <Modal
          title='创建角色'
          visible={this.state.isRoleVisible}
          onCancel={()=>{
            this.refs.roleForm.formRef.current.resetFields();
            this.setState({
              isRoleVisible: false
            })
          }}
          onOk={this.handleRoleSubmit}
        >
          <RoleForm ref='roleForm' />
        </Modal>

        <Modal
          title='设置权限'
          visible={this.state.isPermVisible}
          width={800}
          onCancel={()=>{
            this.refs.permEditForm.formRef.current.resetFields();
            this.setState({
              isPermVisible: false
            })
          }}
          onOk={this.handlePermEditSubmit}
        >
          <PermEditForm ref='permEditForm' 
            menuInfo={this.state.menuInfo}
            detailInfo={this.state.detailInfo}
            patchMenuInfo={(checkedKeys)=>{
              this.setState({
                menuInfo: checkedKeys
              })
            }}
          />
        </Modal>
      </div>
    );
  }
}

class RoleForm extends React.Component {
  formRef = React.createRef();
  
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5,
        offset: 4
      },
      wrapperCol: {
        span: 11,
      }
    }
    return (
      <div>
        <Form
          ref={this.formRef}
          layout='horizontal'
        >
          <FormItem label="角色名称" name='role_name' {...formItemLayout}>
            <Input placeholder="请输入角色名称" />
          </FormItem>

          <FormItem
            label='状态' {...formItemLayout}
            name='status'
          >
            <Select placeholder='全部'>
              <Option value={1}>开启</Option>
              <Option value={2}>关闭</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
    );
  }
}

class PermEditForm extends React.Component {
  formRef = React.createRef();

  renderTreeNodes = (data) => {
    return data.map((item)=>{
      if (item.children) {
        return <TreeNode title={item.title} key={item.key}>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      } else {
        return <TreeNode {...item} />
      }
    })
  }

  onCheck = (checkedKeys) => {
    this.props.patchMenuInfo(checkedKeys);
  }
  
  render() {
    const formItemLayout = {
      labelCol: {
        span: 5,
        offset: 4
      },
      wrapperCol: {
        span: 11,
      }
    }
    const [detail_info] = this.props.detailInfo;
    const menuInfo = this.props.menuInfo;
    return (
      <div>
        <Form
          ref={this.formRef}
          layout='horizontal'
        >
          <FormItem label="角色名称" name='role_name' {...formItemLayout}>
            <Input disabled placeholder={detail_info.role_name} />
          </FormItem>

          <FormItem
            label='状态' {...formItemLayout}
            name='status'
          >
            <Select placeholder='全部'>
              <Option value={1}>开启</Option>
              <Option value={2}>关闭</Option>
            </Select>
          </FormItem>

          <Tree
            checkable
            defaultExpandAll
            onCheck={(checkedKeys)=>{
              this.onCheck(checkedKeys)
            }}
            checkedKeys={menuInfo}
          >
            <TreeNode title='平台权限' key='platform_all'>
              {this.renderTreeNodes(menuConfig)}
            </TreeNode>
          </Tree>
        </Form>
      </div>
    );
  }
}
