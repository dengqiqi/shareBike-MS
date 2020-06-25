import React from 'react'
import {Table} from 'antd'
import Utils from './../../utils/utils'

export default class QTable extends React.Component {
  
  onSelectChange = (selectedRowKeys, selectedItems) => {
    this.props.updateSelectedItem(selectedRowKeys, selectedItems)
  }

  tableInit = () => {
    let row_selection = this.props.rowSelection;
    let selectedRowKeys = this.props.selectedRowKeys;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange,
    }

    if (row_selection === false || row_selection === null) {
      row_selection = false;
    } else if (row_selection === 'checkbox') {
      rowSelection.type = 'checkbox';
    } else {
      row_selection = 'radio';
    }

    return (
      <Table 
        bordered
        {...this.props}
        rowSelection={row_selection ? rowSelection : null}
      />
    );
  }

  render() {
    return (
      <div>
        {this.tableInit()}
      </div>
    );
  }
}
