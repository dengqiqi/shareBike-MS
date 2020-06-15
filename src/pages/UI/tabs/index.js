import React from 'react'
import { Card, Button, Tabs, message, Icon } from 'antd'
import './../ui.less'
import { AppleOutlined, AndroidOutlined } from '@ant-design/icons';

export default class Tab extends React.Component {
  newTabIndex = 0;
  handleChange = (activeKey) => {
    message.info({
      content: 'hello world' + activeKey,
      activeKey
    })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  };

  add = () => {
    const { panes } = this.state;
    const activeKey = `newTab${this.newTabIndex++}`;
    const newPanes = [...panes];
    newPanes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
    this.setState({
      panes: newPanes,
      activeKey,
    });
  };

  remove = targetKey => {
    const { panes, activeKey } = this.state;
    let newActiveKey = activeKey;
    let lastIndex;
    panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter(pane => pane.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    this.setState({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };

  componentWillMount() {
    const panes = [
      {
        title: 'Tab 1',
        content: 'Tab 1',
        key: '1'
      },
      {
        title: 'Tab 2',
        content: 'Tab 2',
        key: '2'
      },
      {
        title: 'Tab 3',
        content: 'Tab 3',
        key: '3'
      },
    ];
    this.setState({
      panes
    })
  }

  render() {
    const { TabPane } = Tabs;

    return (
      <div style={{ width: '100%' }}>
        <Card title='Tab标签页' className='card-wrap'>
          <Tabs defaultActiveKey="1" onChange={this.handleChange}>
            <TabPane tab="Tab 1" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tab 2" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
          </TabPane>
          </Tabs>
        </Card>

        <Card title='Tab标签页2' className='card-wrap'>
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane 
              tab={
                <span>
                  <AppleOutlined />
                  Tab 1
                </span>
              }
             key="1"
            >
              Content of Tab Pane 1
            </TabPane>
            <TabPane 
              tab={
                <span>
                  <AndroidOutlined />
                  Tab 2
                </span>
              }
              key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
          </TabPane>
          </Tabs>
        </Card>

        <Card title='Tab标签页3' className='card-wrap'>
          <Tabs 
            activeKey={this.state.activeKey}
            type="editable-card" 
            defaultActiveKey="1" 
            onChange={this.handleChange}
            onEdit={this.onEdit}
          >
            {
              this.state.panes.map((item) =>
                <TabPane
                  tab={item.title}
                  key={item.key}
                >
                  {item.content}
                </TabPane>
              )
            }
          </Tabs>
        </Card>
      </div>
    );
  }
}
