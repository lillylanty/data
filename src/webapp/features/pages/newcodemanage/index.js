import React, { Component, PropTypes } from 'react'
import { Form, Icon, Input, Button, Checkbox,Popover,Select } from 'antd';
import { encodeManageAction } from '../../actions/encodeManageAction';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {ruleConfig} from './fileds.js';
import * as zhItems from './zhName.json';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


class codeManageForm extends Component {
  constructor(props) {
    let arr = [];
    if(props.formItems && props.formItems.ruleCfg){
      if(Object.prototype.toString.call(props.formItems.ruleCfg) === '[object Array]'){
        arr = JSON.parse(props.formItems.ruleCfg)
      }else{
        arr = props.formItems.ruleCfg
      }
    }else{
      arr = ruleConfig;
    }
    super(props);
    this.state = {
      listItem:{...props.formItems,ruleCfg:arr} ||{}, //已经判断是编辑还是新建了 DidMount不需再次判断
    };    
  }



componentWillReceiveProps(nextProps,nextState){
  if(nextProps.formItems !== this.state.listItems){
    let arr = [];
    if(nextProps.formItems && nextProps.formItems.ruleCfg){
      if(Object.prototype.toString.call(nextProps.formItems.ruleCfg) === '[object Array]'){
        arr = JSON.parse(nextProps.formItems.ruleCfg)
      }else{
        arr = nextProps.formItems.ruleCfg
      }
    }else{
      arr = ruleConfig;
    }
    this.setState({
      listItem:{...nextProps.formItems,ruleCfg:arr}
    },()=>{
      //  console.log(this.state.listItem.ruleCfg)
    });
  }
}




  handleLabelChange=(e,index,v)=>{  
    let newarr = this.state.listItem.ruleCfg.slice(0);
    let value = newarr.filter((v,idx)=>idx == e)[0];
     newarr.map((v,i)=>{
      if(i==index){
        v.ruleType = value.ruleType
      }
    }) 
    this.setState({
      listItem:{...this.state.listItem,ruleCfg:newarr}
    });
  }
 

  operate=(type,v,index)=>{
    if(!v){
      return
    }
    let listConfigs = this.state.listItem.ruleCfg.slice(0); 
    typeof listConfigs !=='object' && (listConfigs = JSON.parse(listConfigs));
    if(!listConfigs){
      return
    }
    let target;
       switch(type){
      case 'up':
        if(index == 0){return}
        target = {...listConfigs[index]};    
        listConfigs.splice(index,1);
        listConfigs.splice(index-1,0,target);
        break;
      case 'down':
      if(index == listConfigs.length){return}
        target = {...listConfigs[index]};    
        listConfigs.splice(index,1);
        listConfigs.splice(index+1,0,target);
        break;
      case 'plus':
        target = {...listConfigs[index]}; 
        listConfigs.splice(index,0,target);
        listConfigs[index +1].edit = true; 
        break;
      case 'del':
      if(listConfigs.length <1){return}
        target = {...listConfigs[index]};         
        listConfigs.splice(index,1);
        break;
    }
 
      this.setState({
        listItem:{...this.state.listItem,ruleCfg:listConfigs}
      });
    
  }



  onEditChange=(e,index)=>{
    let value = e.target.value;
    let a = this.state.listItem.ruleCfg ;
    let newarr ;
    if(typeof a == 'string'){
      newarr = JSON.parse(a);
    }else{
      newarr = [...a]
    } 
 
     newarr.map((v,i)=>{  
      if(i==index){
        v.ruleValue = value
      }
    });
    this.setState({
      listItems:{...this.state.listItem,ruleCfg:newarr}
    },()=>{
      // console.log(this.state.listItems);
    }) 
  }
  handleItem = (e,type)=>{
     switch(type){
      case 'ruleName':
      this.setState({
        listItems:{...this.state.listItem,ruleName:e.target.value}
      });
      break;
      case 'ruleDesc':
      this.setState({
        listItems:{...this.state.listItem,ruleDesc:e.target.value}
      });
      break;
      case 'ruleName':
      this.setState({
        listItems:{...this.state.listItem,ruleExplain:e.target.value}
      });
      break;
    }
       
  }
  showEle=(config)=>{  
    let labelChildren = []; let valueChildren = [];
    // console.log(config);
    let ruleCfg = [];
    if(Object.prototype.toString.call(config)=== '[object String]'){
      ruleCfg = JSON.parse(config);
    }else{
      ruleCfg = config;
    }

    // console.log(ruleCfg)
      for(let i =0;i<ruleCfg.length;i++){
        labelChildren.push( <Option  key={i}>{ruleCfg[i].ruleType}</Option>);  
        valueChildren.push( <Option key={i}>{ruleCfg[i].ruleValue}</Option> );
      }
       return  ruleCfg.map((v,index,arr)=>{
        return (
             <div key={index} style={{minWidth:'400px',display:'block'}}> 
             {

               v.edit ? <Select 
               style={{ width: 110 ,margin:'0 10px' }} 
               value={v.ruleType}
               onChange={(e)=>this.handleLabelChange(e,index,v)}
              >
                { labelChildren }
               </Select>:
               <Input value={v.ruleType}   style={{ width: 110 ,margin:'0 10px' }}  disabled={true} />
               
              }
              {
                <Input placeholder={v.ruleValue}   style={{ width: 110 ,margin:'0 10px' }}   onChange={e=>this.onEditChange(e,index)}/>  
              }
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'up'  ,v,index)  } type="up-square" /></span>
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'down',v,index)  } type="down-square" /></span>
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'plus',v,index)  } type="plus" /></span>
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'del' ,v,index)  } type="delete" /></span>
             </div>
           )  
       }) 
  }

  showEft =(config)=>{
    let ruleCfg = [];
    if(Object.prototype.toString.call(config)=== '[object String]'){
      ruleCfg = JSON.parse(config);
    }else{
      ruleCfg = config;
    }
      for(var i =0,arr='';i<ruleCfg.length;i++){
         arr += `${ruleCfg[i].ruleValue}`
      }
    
   return arr?arr.trim():arr
  }
  
 
  render() {
    const { getFieldDecorator } = this.props.form;
    const {handleCancel,handleOk} = this.props;

    let {listItem} = this.state; 
    if(typeof listItem.ruleCfg == 'string'){
      listItem.ruleCfg = JSON.parse(listItem.ruleCfg);
    }
    return (
      <div className="content">
      <Form  className="login-form">
        <FormItem
        label={'编码规则名称'}>
          {getFieldDecorator('ruleName', {
            rules: [{ required: true}]
          })(
            <Input placeholder={listItem && listItem.ruleName} onChange={(e=>this.handleItem(e,'ruleName'))} />
          )}
        </FormItem>
         <FormItem
        label={'编码规则描述'}>
          {getFieldDecorator('ruleDesc')(
            <TextArea placeholder={listItem && listItem.ruleName}  onChange={(e=>this.handleItem(e,'ruleDesc'))} />
          )}
        </FormItem>
        <FormItem
        label={'编码规则解释'}>
          {getFieldDecorator('ruleExplain', {
            rules: [{ required:false}],
          })(
            <TextArea placeholder={listItem && listItem.ruleName}  onChange={(e=>this.handleItem(e,'ruleExplain'))} />
          )}
        </FormItem>
 
        <FormItem label={'编码规则配置'}
        >
        {getFieldDecorator('ruleCfg')}
            { 
             listItem? this.showEle(listItem.ruleCfg) : null 
            }
        </FormItem>
      </Form>  
      <p style={{fontSize:'16px',color:'#888'}}> 
       {
         listItem? <span>编码预览：{this.showEft(listItem.ruleCfg)}</span>  : null
        }
         </p>
         <p style={{padding:'20px 10px',textAlign:'right'}}>
           <Button onClick={handleCancel.bind(this)} >取消</Button>
           <Button disabled={!listItem} style={{margin:'0 20px'}} onClick={handleOk.bind(this,listItem)} type="primary">确定</Button>
         </p>
      </div>
    )
  } 
}


const NewCodeManage = Form.create()(codeManageForm);
export default NewCodeManage;


/***
 * 
/* const mapState = state => ({
  codeDetail: state.encodeManage.codeDetail, //编辑页面的级联选择
});
const mapDispatch = dispatch => ({
  getCodeDetail:(p)=> dispatch(encodeManageAction.getCodeDetail(p)),
});

@connect(mapState, mapDispatch) 
 *    componentDidUpdate(nextProps,nextState){

  }
   
    componentDidMount(){ 
       let {codeDetail} = this.props;
      if(!this.props.formItems && codeDetail.ruleCfg){
        this.setState({
          listItem:{...this.state.formItems,ruleCfg:codeDetail.ruleCfg}  
        });
      }
} 
  componentWillUnmount(){

  }


 * 
 * **/          