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
      listItem:{}, //已经判断是编辑还是新建了 DidMount不需再次判断
      ruleCfg:[],
      items:{}, //上部分FormItem字段
      value:''
    };    
  }

  componentDidMount(){ 
      this.props.form.setFieldsValue({...this.state.formItems});
      let {codeDetail} = this.props;
      if(!codeDetail || !codeDetail.ruleCfg ){
        this.setState({
          listItem:items,
          ruleCfg:items.ruleCfg
        })
      }else if(codeDetail && codeDetail.ruleCfg) {
        this.setState({
          listItem:codeDetail,
          ruleCfg:codeDetail.ruleCfg
        })
      }
  }
  shouldComponentUpdate(nextProps,nextState){
    if( nextState.ruleCfg !== this.state.ruleCfg || nextState.listItem !== this.state.listItem ){
      console.log(true)
      return true
    }else{
      return false
    }
  }
  componentDidUpdate(){
    //保存到redux的state中
    if(this.state.items){
      this.props.setFormItems({...this.state.items,ruleCfg:this.state.ruleCfg});
    }else{
      this.props.setFormItems({...this.state.listItem,ruleCfg:this.state.ruleCfg});
    }
  }


  handleLabelChange=(e,index,v)=>{
    console.log(e,index,v);     
    let newarr = [...this.state.ruleCfg];
    let value = newarr.filter((v,idx)=>idx == e)[0];
    console.log(value)
    
     newarr.map((v,i)=>{
      if(i==index){
        v.ruleType = value.ruleType
      }
    }) 
    this.setState({
      ruleCfg:newarr
    },()=>{
      console.log(newarr)
    })
 
  }
 

  operate=(type,v,index)=>{
    if(!v){
      return
    }
    let listConfigs = [...this.state.ruleCfg];//form的上半部分不变，Cfg变
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
      ruleCfg:listConfigs
    },()=>{
      // console.log(this.state.ruleCfg)
    })
    
  }



  onEditChange=(e,index)=>{
    console.log(e.target.value,index);
    let value = e.target.value;
    let newarr = [...this.state.ruleCfg];
     newarr.map((v,i)=>{
      if(i==index){
        v.ruleValue = value
      }
    }) 
    this.setState({
      ruleCfg:newarr
    },()=>{
      console.log(newarr)
    })
  }
  handleItem = (e,type)=>{
    switch(type){
      case 'ruleName':
      this.setState({
        items:{...this.state.items,ruleName:e.target.value}
      });
      break;
      case 'ruleDesc':
      this.setState({
        items:{...this.state.items,ruleDesc:e.target.value}
      });
      break;
      case 'ruleName':
      this.setState({
        items:{...this.state.items,ruleExplain:e.target.value}
      });
      break;
    }    
  }

  showEle(ruleCfg){
    let labelChildren = []; let valueChildren = [];
     if(ruleCfg){
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
                <Input value={v.ruleValue}   style={{ width: 110 ,margin:'0 10px' }}   onChange={e=>this.onEditChange(e,index)}/>  
              }
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'up'  ,v,index)  } type="up-square" /></span>
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'down',v,index)  } type="down-square" /></span>
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'plus',v,index)  } type="plus" /></span>
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'del' ,v,index)  } type="delete" /></span>
             </div>
           )  
       })
    }
  }

  showEft =(ruleCfg)=>{
    for(var i =0,arr='';i<ruleCfg.length;i++){
      arr += `${ruleCfg[i].ruleValue}`
   }
   return arr?arr.trim():arr
  }
 
  render() {
    const { getFieldDecorator } = this.props.form;
    let {listItem,ruleCfg} = this.state; 
    return (
      <div className="content">
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
        label={'编码规则名称'}>
          {getFieldDecorator('ruleName', {
            rules: [{ required: true}]
          })(
            <Input onChange={(e=>this.handleItem(e,'ruleDesc'))} />
          )}
        </FormItem>
        <FormItem
        label={'编码规则描述'}>
          {getFieldDecorator('ruleDesc', {
           
          })(
            <TextArea   onChange={(e=>this.handleItem(e,'ruleDesc'))} />
          )}
        </FormItem>
        <FormItem
        label={'编码规则解释'}>
          {getFieldDecorator('ruleExplain', {
            rules: [{ required:false}],
          })(
            <TextArea   onChange={(e=>this.handleItem(e,'ruleExplain'))} />
          )}
        </FormItem>

        <FormItem label={'编码规则配置'}>
            { this.showEle(ruleCfg) }
        </FormItem>
      </Form>  
      <p>编码预览： 
       {
          this.showEft(ruleCfg)
        }
         </p>
      </div>
    )
  }
}


const NewCodeManage = Form.create()(codeManageForm);
export default NewCodeManage;


          