import React, { Component, PropTypes } from 'react';
import { Form,Row, Col, Icon, Input, Select,Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;




class HorizontalAddForm extends React.Component {
  constructor(props){
    super(props);
    const {getCategory, category} = this.props;
    this.state = {
      form:{
        entity_name:'',
        entity_encode:'',
        entity_category:'',
      },
      disable:false,
      select:null,
      option:category
      
    }
    
  }

  componentWillMount(){
    
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

  handleSelectChange = (e)=>{
    const {getCategory} = this.props;
    console.log(e);
    // getCategory()
  }


  render() {
    const {getCategory, category} = this.props;
    
    console.log(category);
    
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
              <Option value=''>无</Option>
               {/* {
                 category ? category.map(v=>{ <Option value={v.id}>{v.nodeName}</Option> }) : <Option value=''>无</Option>
              }  */}
                
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
      </Form>
    ); 
  }
}

HorizontalAddForm = Form.create()(HorizontalAddForm);
export default HorizontalAddForm;
