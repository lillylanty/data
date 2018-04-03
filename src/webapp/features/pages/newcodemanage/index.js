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


/* const mapState = state => ({
  codeDetail: state.encodeManage.codeDetail, //编辑页面的级联选择
});
const mapDispatch = dispatch => ({
  getCodeDetail:(p)=> dispatch(encodeManageAction.getCodeDetail(p)),
});

@connect(mapState, mapDispatch) */

class codeManageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.itemConfig = items.ruleCfg;
    
  }

  componentWillMount(){
    
  }

  componentDidMount() {
   
    

  }
  // shouldComponentUpdate(){
  //   return false
  // }
  componentWillReceiveProps(nextProps) {
 
    // if(nextProps.categoryList){
    //   this.setState({
    //     options:nextProps.categoryList,
    //     form:{...nextProps.formItems}
    //   },()=>{
       
    //   })
    // }
    
  }


  componentDidMount(){
    console.log(items)
    this.props.form.setFieldsValue({...items}) 
  
  }
  selectChange = (value)=>{

    /* this.props.form.setFieldValue({
      parentId:value
    }) */
  }
  handleLabelChange(){}
  onEditChange(){}

  operate=(v)=>{
    console.log(v,event,event.target.getAttribute('data-opt'));
    
  }

  render() {
 
    const { getFieldDecorator } = this.props.form;
   
    let {codeDetail} = this.props;
    /* if(codeDetail && codeDetail.length <1){
    } */
    codeDetail = [...items.ruleCfg];
    
    return (
      <div className="content">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
        label={'编码规则名称'}>
          {getFieldDecorator('ruleName', {
            rules: [{ required: true}],
          })(
            <Input  />
          )}
        </FormItem>
        <FormItem
        label={'编码规则描述'}>
          {getFieldDecorator('ruleDesc', {
            rules: [{ required:false}],
          })(
            <TextArea  />
          )}
        </FormItem>
        <FormItem
        label={'编码规则解释'}>
          {getFieldDecorator('ruleExplain', {
            rules: [{ required:false}],
          })(
            <TextArea  />
          )}
        </FormItem>

        <FormItem label={'编码规则配置'}>
            {
               codeDetail && codeDetail.map((v,i)=>{
               return (
                    <div style={{minWidth:'400px',display:'block'}}> 
                      <Select style={{ width: 110 ,margin:'0 10px' }} defaultValue={zhItems[v.ruleType]} onChange={this.handleLabelChange}>
                        <Option key={v}>{v.ruleType}</Option>
                      </Select>
            
                     <Select style={{ width: 110 ,margin:'0 10px'}} defaultValue={zhItems[v.ruleValue]} onChange={this.onEditChange}>
                          <Option key={v}>{v.ruleValue}</Option>
                      </Select> 
                    <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'up')    } type="up-square" /></span>
                    <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'down')  } type="down-square" /></span>
                    <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'edit')  } type="edit" /></span>
                    <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'delete')  } type="delete" /></span>
                    </div>
                  )  
              })
          }
        </FormItem>
       
      </Form>        
      </div>
    )
  }
}


const NewCodeManage = Form.create()(codeManageForm);
export default NewCodeManage;

