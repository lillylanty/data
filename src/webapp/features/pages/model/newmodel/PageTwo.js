import React, { Component, PropTypes } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

export default class PageTwo extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      current: 0,
    };
  }

  componentDidMount(){
      const {allData,modelData,editModal,editEntityModelAttr,entityModalAttr,displayTable,data} = this.props;
      console.log(allData)
  }

  render(){
    return (
      <h1>怕个2</h1>
    )
  }

}