import React, { Component, PropTypes } from 'react';
import { Form,Row, Col, Icon, Input, Select,Button,Cascader } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;




class HorizontalAddForm extends React.Component {
  constructor(props){
    super(props);
    const {getCategory, category} = this.props;
    getCategory({source : 0});  //0:建模管理 1:主数据维护

    this.state = {
      form:{
        entity_name:'',
        entity_encode:'',
        entity_category:'',
      },
      disable:false,
      select:null,
      option:null,
    }
    
   this.arr = null;
    
  }


  componentDidMount() {
    this.props.form.validateFields(); 
  }

  hasErrors = (fieldsError)=> {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }
  validEntityEncode = (rule, value, callback) =>{
    callback("实体模型编码只能录入一次，点击新建属性保存后不可编辑");
    if(value){
      setTimeout(() => {
        this.setState({
          disable:true
        })
      }, 1500);
    }
  }

  handleSubmit = (e) => {
    console.log(e,values)
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

 
  handleSelectChange = (value)=>{
    let v = value.length>0 ?value[length-1] : value
    this.props.form.setFieldsValue({ entity_category: v });
  }

  replaceKey(category){
    if(!category){
      return null
    }
    category.map((v,i)=>{
      v.value = v.id;
      v.label = v.nodeName;
     /*  delete v.id;
      delete v.nodeName; */
      if(v.children.length>0){
        this.replaceKey(v.children);
      }
    });
    return category
  }


  render() {
    const {getCategory, category} = this.props;
    this.arr = this.replaceKey(category);
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    
      let xs = {span:12, offset: 0};
      let lg = {span:12, offset: 0};

    const userNameError = isFieldTouched('userName') && getFieldError('userName');
    const passwordError = isFieldTouched('password') && getFieldError('password');
     return (
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <Row gutter={24}>       
        <Col xs={xs} lg={lg} >
          <FormItem label={`实体模型名称：`} >
              {getFieldDecorator('entity_name', {
               rules: [{ required: true, message: '请输入实体模型名称'}], 
              })
              (
                <Input placeholder="请输入实体模型名称" />
              )}
          </FormItem>
        </Col>

        <Col xs={xs} lg={lg} >
          <FormItem label={`实体模型编码：`}
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('entity_encode', {
              rules: [{ required: true, message: '实体模型编码只能录入一次，保存后不可编辑' },{validator:this.validEntityEncode}],
            })(
              <Input type="password" placeholder="请输入实体模型编码"  disabled={this.state.disable} />
            )}
          </FormItem>
        </Col>

        <Col xs={xs} lg={lg} >
          <FormItem
            label={`所属类目：`}
            hasFeedback
          >
            {getFieldDecorator('entity_category', {
              rules: [
                { required: true, message: '请选择类目' },
              ],
            })(
              <Cascader  
              options={this.arr}
              placeholder = "请选择类目"
              style={{ width: '100%',minWidth:'120px' }}      
              onChange = {this.handleSelectChange}
              /> 
              
            )}
          </FormItem>
        </Col>
        
        <Col xs={xs} lg={lg}>
        <FormItem label={`描述：`}
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('entity_description', {
            rules: [{ required: true, message: 'Please input your modelEncode!' }],
          })(
            <TextArea rows={4} placeholder="请填写实体描述" />
          )}
        </FormItem>
      </Col>
        </Row>
      </Form>
    ); 
  }
}

HorizontalAddForm = Form.create()(HorizontalAddForm);
export default HorizontalAddForm;
