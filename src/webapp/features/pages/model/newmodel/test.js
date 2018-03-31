
import React, { Component, PropTypes } from 'react';
import { Table, Input, Popconfirm } from 'antd';

let data = [{
  attrName: '名称',
  attrCode: '122',
  attrDataType: 'int',
  attrDataType_name:'整型',
  relObject:'',
  relObject_name:'',
  attrLength:20,
  checkRule:'-',
  isRequired:true,
  isUnique:false,
  editable:true,
  key:1
}, {
  attrName: '编码',
  attrCode: '11113',
  attrDataType: 'int',
  attrDataType_name:'整型',
  relObject:'',
  relObject_name:'',
  attrLength:20,
  checkRule:'-',
  isRequired:true,
  isUnique:false,
  editable:true,
  key:2
}, {
  attrName: '描述',
  attrCode: '',
  attrDataType: 'int',
  attrDataType_name:'整型',
  relObject:'',
  relObject_name:'',
  attrLength:20,
  checkRule:'-',
  isRequired:true,
  isUnique:false,
  editable:true,
  key:3
}];
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [ {
      title: '属性名称',
      dataIndex: 'attrName',
      render: (text, record) => this.renderColumns(text, record, 'attrName'),
    },
     {
      title: '编码',
      dataIndex: 'attrCode',
      render: (text, record) => this.renderColumns(text, record, 'attrCode'),
    }, {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.attrName)}>Save</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.attrName)}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                : <a onClick={() => this.edit(record.attrName)}>Edit</a>
            }
          </div>
        );
      },
    }];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.attrName, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.attrName)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.attrName)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  save(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.attrName)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.attrName)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.attrName)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  render() {
    return <Table bordered dataSource={this.state.data} columns={this.columns} rowKey="key" />;
  }
}
