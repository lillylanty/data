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
      listItem:props.codeDetail || items, //已经判断是编辑还是新建了 DidMount不许再次判断
    };    
  }

  componentWillMount(){
    
  }

  componentDidMount() {   
    
  }

  componentWillReceiveProps(nextProps) {
    
  }


  componentDidMount(){ 
      this.props.form.setFieldsValue({...this.state.formItems});
      if(!this.state.listItem.ruleCfg){
        this.setState({
          listItem:{...this.state.listItem,ruleCfg:items.ruleCfg}
        })
      }
     /*  let Cfg = [] ;
    if(codeDetail && codeDetail.ruleCfg){//编辑
      Cfg= codeDetail.ruleCfg;
    }else{ //新建
     Cfg = [...items.ruleCfg];
    }
    this.setState({
      listItem:{...this.state.listItem, ruleCfg:Cfg}
    }) */
  }

  handleLabelChange(v){
    // console.log(v)
  }
  onEditChange(v){
    // console.log(v)
  }

  operate=(type,v,index)=>{
    console.log(v,index);
    
    let listConfigs = this.state.listItem.ruleCfg;//form的上半部分不变，Cfg变
    if(!listConfigs){
      return
    }
    let target;
    console.log(listConfigs);

    switch(type){
      case 'up':
        if(index == 0){return}
        target = listConfigs[index]; 
        listConfigs.splice(index,1);
        listConfigs.splice(index-1,0,target);
        console.log('up')
        break;
      case 'down':
      if(index == listConfigs.length){return}
        target = listConfigs[index]; 
        listConfigs.splice(index,1);
        listConfigs.splice(index+1,0,target);
        console.log('dowm')
        break;
      case 'plus':
        target = listConfigs[index]; 
        listConfigs.splice(index,0,target);
        console.log('plus')
        break;
      case 'del':
      if(listConfigs.length === 0){return}
        target = listConfigs[index]; 
        listConfigs.splice(index,1,target);
        console.log('del')
        break;
    }
    this.setState({
      listItem:{...this.state.listItem,ruleCfg:listConfigs}
    },()=>{
      console.log(this.state.listItem)
    })
    
  }
  shouldComponentUpdate(nextProps,nextState){
    if(nextState.listItem !== this.state.listItem){
      console.log(true)
      return true
    }else{
      console.log(false)
      return false
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
   
    let {listItem} = this.state; //{id: null, ruleName: null, ruleDesc: null, ruleLength: null, ruleExplain: null, …}
    
    console.log('render',listItem.ruleCfg);
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

        <div label={'编码规则配置'}>
            {
               listItem.ruleCfg && listItem.ruleCfg.map((v,index,k)=>{
               return (
                    <div key={index} style={{minWidth:'400px',display:'block'}}> 
                      <Select style={{ width: 110 ,margin:'0 10px' }} defaultValue={v.ruleType} onChange={this.handleLabelChange.bind(this,v)}>
                        <Option key={v}>{v.ruleType}</Option>
                      </Select>
            
                     <Select style={{ width: 110 ,margin:'0 10px'}} defaultValue={v.ruleValue} onChange={this.onEditChange.bind(this,v)}>
                          <Option key={v}>{v.ruleValue}</Option>
                      </Select> 
                    <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'up'  ,v,index)    } type="up-square" /></span>
                    <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'down',v,index)  } type="down-square" /></span>
                    <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'plus',v,index)  } type="plus" /></span>
                    <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'del' ,v,index)  } type="delete" /></span>
                    </div>
                  )  
              })
          }
        </div>
       
      </Form>        
      </div>
    )
  }
}


const NewCodeManage = Form.create()(codeManageForm);
export default NewCodeManage;

//在编辑 时已经更新formitem的值了
   /*  this.props.formItems && this.setState({
      listItem:this.props.formItems
    }) */