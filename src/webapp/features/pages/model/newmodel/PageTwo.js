import React, { Component, PropTypes } from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col,Checkbox, Button, AutoComplete } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class ShowEntityForm extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.state = {
      current: 0,
      confirmDirty: false,
      autoCompleteResult: [],
      attrCode_1:'',
      attrCode_2:'',
      attrCode_3:'',
      attrCode: "name",
      attrDataType: "varchar",
      attrDesc: "描述",
      attrLength: 20,
      attrName: "名称",
      checkRule: "^[(0-9){17}[0-9X]]",
      isRequired: 1,
      isUnique: 1,
      relObject: "entityCode:entityName;entityAttrId:entityAttrCode",
      sortOrder: 1
    };
  }

  componentDidMount(){
     
  }


  dynamicFormItem = ()=>{
    const {entityModalAttr} = this.props;
    let arr = [];
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    if(entityModalAttr.length <1){
      return
    }
     
      entityModalAttr.forEach(e => {
        switch(e.attrName){
          case '编码':
            arr.push(
              <FormItem
                {...formItemLayout}
                label={(
                  <span>
                    {e.attrName}&nbsp;
                    <Tooltip title="业务部门填写编码时将会看到编码规则的解释，如果编码规则中包含自定义编码，则建议填写较详细的解释">
                      <Icon type="question-circle-o" />
                    </Tooltip>
                  </span>
                )}
              >
              
                <Row gutter={2}>
                    <Col span={8}>
                    {getFieldDecorator('attrCode_1', {
                    rules: [ {
                      required: true, message: '!',
                    }],
                  })(
                    <Input />
                  )}
                    </Col>
                    <Col span={8}>
                    {getFieldDecorator('attrCode_2', { //最后checkRule由code组合而得2可以自定义被编辑
                    
                  })(
                      <Input />
                  )}
                    </Col>
                    <Col span={8}>
                    {getFieldDecorator('attrCode_3', {
                    rules: [ {
                      required: true
                    }],
                  })(
                      <Input />
                  )}
                    </Col>
                </Row>
              </FormItem>
            );
            break;
            // case '名称': case '描述':
            default:
            arr.push(
              <FormItem {...formItemLayout}
              label = {e.attrName}
              >
              {getFieldDecorator(`${e.attrName}`, {
              rules: [ {
                required: e.isRequired, message: '!',
              }],
            })(
              <Input />
            )}
              </FormItem>
            );
            break;
        }
        
    });
    return arr
  
  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

 
    // Warning: `getFieldDecorator` will override `value`, so please don't set `value` directly and use `setFieldsValue` to set it.
    const {editEntityModelAttr ,entityModalAttr,modalData,saveEntity,alldata } = this.props;
    //动态展示表单
 
  

    let style ={
      width:'50%',
      margin:'0 auto',
      transformX:'-50%',
  }

    return (
      <div style={style}>
        <Form style={{width:'100%'}}>
          {this.dynamicFormItem()}
        </Form>
      </div>
    );
}
}
const PageTwo = Form.create()(ShowEntityForm);
export default PageTwo;

/**
 * <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('attrName', {
              rules: [ {
                required: true, message: '!',
              }],
            })(
              <Input />
            )}
          </FormItem>
            
          <FormItem
            {...formItemLayout}
          
            label={(
              <span>
                {msg}&nbsp;
                <Tooltip title="业务部门填写编码时将会看到编码规则的解释，如果编码规则中包含自定义编码，则建议填写较详细的解释">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
          
          <Row gutter={2}>
              <Col span={8}>
              {getFieldDecorator('attrCode_1', {
              rules: [ {
                required: true, message: '!',
              }],
            })(
              <Input />
            )}
              </Col>
              <Col span={8}>
              {getFieldDecorator('attrCode_2', { //最后checkRule由code组合而得2可以自定义被编辑
              
            })(
                <Input />
            )}
              </Col>
              <Col span={8}>
              {getFieldDecorator('attrCode_3', {
              rules: [ {
                required: true, message: '业务部门填写编码时将会看到编码规则的解释，如果编码规则中包含自定义编码，则建议填写较详细的解释',
              }],
            })(
                <Input />
            )}
              </Col>
          </Row>
          </FormItem>

          <FormItem
            {...formItemLayout}
            label="描述"
          >
            {getFieldDecorator('attrDesc', {
              rules: [{ required: true, message: 'attrDesc!' }],
            })(
              <Input size="large" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="岗位"
            style={{display:this.show('岗位')}}
          >
            {getFieldDecorator('station', {
              rules: [{
                required: true, message: 'station!',
              }, {
                // validator: this.validateToNextPassword,
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="部门"
            style={{display:this.show('部门')}}
          >
            {getFieldDecorator('department', {
              rules: [{
                required: true, message: 'department!',
              }, {
                // validator: this.compareToFirstPassword,
              }],
            })(
              <Input  /> //onBlur={this.handleConfirmBlur}
            )}
          </FormItem> 
          <FormItem
            {...formItemLayout}
            label="身份证号"
            style={{display:this.show('身份证号')}}
          >
            {getFieldDecorator('ID', {
              rules: [ {
                // validator: this.compareToFirstPassword,
              }],
            })(
              <Input /> // onBlur={this.handleConfirmBlur} 
            )}
          </FormItem> 

          <FormItem
            {...formItemLayout}
            label="邮箱"
            style={{display:this.show('邮箱')}}
          >
            {getFieldDecorator('email', {
              rules: [ {
                // validator: this.compareToFirstPassword,
              }],
            })(
              <Input   /> //onBlur={this.handleConfirmBlur}
            )}
          </FormItem> 
                
          
       
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
    <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              valuePropName: 'checked',
            })(
              <Checkbox>I have read the <a href="">agreement</a></Checkbox>
            )}
          </FormItem>          
          
          
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
 * 
 */