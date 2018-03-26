import React, { Component, PropTypes } from 'react';
import { Form,Row, Col, Icon, Input, Select,Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;




class HorizontalAddForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      form:{
        entity_name:'',
        entity_encode:'',
        entity_category:'',
      },
      disable:false,
      
    }
   
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
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  queryCategory = ()=>{

  }

  handleSelectChange = ()=>{

  }
  newAttri = ()=>{
    const {editEntityModel,entity,toggleShowTable,displayTable} = this.props;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    let formdata = this.props.form.getFieldsValue();
    Object.values(formdata).forEach(element => {
      if(!element){
        return 
      }
      this.setState({
        ...this.state.form,...formdata
      })
    }); 
    editEntityModel(formdata);
    toggleShowTable();
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    
      let xs = {span:6, offset: 0};
      let lg = {span:6, offset: 0};

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
              <Select  size= 'large' placeholder = "请选择类目"
              style={{ width: '100%',minWidth:'120px' }}
              onFocus = {this.queryCategory} 
              onChange = {this.handleSelectChange}
              >
                <Option value="china">China</Option>
                
              </Select>
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
        <Row>
          <Col span={24} style={{textAlign:'right'}}>
            <Button type="primary" onClick={this.newAttri}>新建属性</Button>
          </Col>
        </Row>
      </Form>
    ); 
  }
}

HorizontalAddForm = Form.create()(HorizontalAddForm);
export default HorizontalAddForm;


        {/* <Row gutter={24}>
        
        <Col xs={xs} lg={lg} >
          <FormItem label={`实体模型名称：`} >
              {getFieldDecorator('entity_name', {
                rules: [{ required: true, message: 'Please input your modelName!' }],
              })
              (
                <Input />
              )}
          </FormItem>
        </Col>

        <Col xs={xs} lg={lg} >
          <FormItem label={`实体模型编码：`}
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
          >
            {getFieldDecorator('entity_encode', {
              rules: [{ required: true, message: 'Please input your modelEncode!' }],
            })(
              <Input type="password" placeholder="Password" />
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
                { required: true, message: 'Please select your entity_category!' },
              ],
            })(
              <Select placeholder="Please select a entity_category">
                <Option value="china">China</Option>
                <Option value="use">U.S.A</Option>
              </Select>
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
            <TextArea rows={4} />
          )}
        </FormItem>
      </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Button type="primary">新建属性</Button>
          </Col>
        </Row> */}

        /**
         * let mock = [
  {
    label:'实体模型名称',
    type:'<Input />',
    key:'entity_name',
    required:true,
    validator:'validEntityName'
  },
  {
    label:'实体模型编码',
    type:' <Input />',
    key:'entity_encode',
    required:true,
    validator:'validEntityEncode'
  },
  {
    label:'所属类目',
    type:`
          <Select placeholder="请选择类目">
            <Option value="china">China</Option>
            <Option value="use">U.S.A</Option>
          </Select>`,
    key:'entity_category',
    required:true,
    validator:'validCategory'
  },
  {
    label:'描述',
    type:'<TextArea rows={4} />',
    key:'entity_description',
    required:true,
    validator:'validEntityDescription'
  }
];

         */


/**
 *  <FormItem label={`实体模型名称：`} >
              {getFieldDecorator('entity_name', {
                rules: [{ required: true, message: 'Please input your modelName!' }],
              })
              (
                <Input />
              )}
          </FormItem>
*/