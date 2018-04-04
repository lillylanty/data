import React, { Component, PropTypes } from 'react'
import { Form, Icon, Input, Button, Checkbox,Popover,Select } from 'antd';
import { encodeManageAction } from '../../actions/encodeManageAction';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as items from './fileds.json';
import * as zhItems from './zhName.json';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class codeManageForm extends Component {

  handleItem = (e,type)=>{
    console.log(e,type)
  }
render(){
  const { getFieldDecorator } = this.props.form;
  return (
    <Form onSubmit={this.handleSubmit} className="login-form">
      <FormItem
      label={'编码规则名称'}>
        {getFieldDecorator('ruleName', {
          rules: [{ required: true}]
        })(
          <Input onChange={(e=>this.handleItem(e,'ruleDesc'))} />
        )}
      </FormItem>
      </Form>
  )
}
}

const Test = Form.create()(codeManageForm);
export default Test;