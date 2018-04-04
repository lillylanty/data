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
      editLabel:false,
      editValue:false,
      ruleCfg:[]
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
      let {codeDetail} = this.props;
      if(!codeDetail || !codeDetail.ruleCfg ){
        items.ruleCfg.map((v,i)=>{
          v.sortId = i;
        })
        this.setState({
          listItem:items,
          ruleCfg:items.ruleCfg
        })
      }else if(codeDetail && codeDetail.ruleCfg) {
        codeDetail.ruleCfg.map((v,i)=>{
          v.sortId = i;
        })
        this.setState({
          listItem:codeDetail,
          ruleCfg:codeDetail.ruleCfg
        })
      }
  }

  handleLabelChange=(value)=>{
    console.log(value);     

  }
  onEditChange=(v)=>{
    console.log(v);
  }

  operate=(type,v,index)=>{
    if(!v){
      return
    }
    let listConfigs = this.state.listItem.ruleCfg;//form的上半部分不变，Cfg变
    if(!listConfigs){
      return
    }
    let target;
       switch(type){
      case 'up':
        if(index == 0){return}
        target = listConfigs[index]; 
        listConfigs.splice(index,1);
        listConfigs.splice(index-1,0,target);
      
        break;
      case 'down':
      if(index == listConfigs.length){return}
        target = listConfigs[index]; 
        listConfigs.splice(index,1);
        listConfigs.splice(index+1,0,target);
      
        break;
      case 'plus':
        target = listConfigs[index]; 
        listConfigs.splice(index,0,target);
        break;
      case 'del':
      if(listConfigs.length <1){return}
        target = listConfigs[index]; 
        listConfigs.splice(index,1);
        break;
    }
    listConfigs.map((v,i)=>{
      v.sortId = i;
    })
    this.setState({
      ruleCfg:listConfigs
    },()=>{
  
    })
    
  }

  componentWillUnmount(){
    const {setFormItems} = this.props;
    setFormItems(this.state.listItem);//关闭
  }

  shouldComponentUpdate(nextProps,nextState){
    if(nextState.listItem !== this.state.listItem){
      return true
    }else{
      return false
    }
  }

  handleLabelChange2=(value)=>{
    console.log(value)
    this.setState({
      ruleCfg:[...this.state.ruleCfg,{ruleType:value}]
    })
  }
  onEditChange2=(value)=>{
    console.log(value);
    this.setState({
      listItem:[...this.state.ruleCfg,{ruleValue:value}]
    })
  }

  showEle(ruleCfg){
    let labelChildren = []; let valueChildren = [];
    if(ruleCfg){
      for(let i =0;i<ruleCfg.length;i++){
        labelChildren.push( <Option  key={`${i}`}>{ruleCfg[i].ruleType}</Option>);  
        valueChildren.push( <Option key={`${i}`}>{ruleCfg[i].ruleValue}</Option> );
      }
      return  ruleCfg.map((v,index,arr)=>{
        return (
             <div key={index} style={{minWidth:'400px',display:'block'}}> 
               <Select mode='tags' maxTagCount={1} style={{ width: 110 ,margin:'0 10px' }} placeholder={v.ruleType} onChange={this.handleLabelChange}>
                { labelChildren }
               </Select>
              <Select mode='tags' maxTagCount={1} style={{ width: 110 ,margin:'0 10px'}} placeholder={v.ruleValue} onChange={this.onEditChange}>
                { valueChildren }
               </Select> 
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'up'  ,v,index)  } type="up-square" /></span>
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'down',v,index)  } type="down-square" /></span>
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'plus',v,index)  } type="plus" /></span>
             <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'del' ,v,index)  } type="delete" /></span>
             </div>
           )  
       })
    }else{
      return <div style={{display:'flex'}}>
            <Input placeholder='自定义属性' style={{width:'45%'}} onChange={this.handleLabelChange2}/> 
            <Input style={{width:'45%'}} placeholder='自定义值'  onChange={this.onEditChange2}/>
            <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'up'  ,null)  } type="up-square" /></span>
            <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'down',null)  } type="down-square" /></span>
            <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'plus',null)  } type="plus" /></span>
            <span style={{fontSize:'16px', margin:'0 10px'}}><Icon onClick={this.operate.bind(this,'del' ,null)  } type="delete" /></span>
            </div>
    }
 
    //key={`listItem.ruleCfg[i]-${i}`}  //Select>.bind(this,v,index)}>
    // key={`listItem.ruleCfg[i]-${i}`} //.bind(this,v,index)}>

   
  }

  render() {
    const { getFieldDecorator } = this.props.form;
   
    let {listItem,ruleCfg} = this.state; //{id: null, ruleName: null, ruleDesc: null, ruleLength: null, ruleExplain: null, …}
    
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

        <FormItem label={'编码规则配置'}>
            {
              /* getFieldDecorator('ruleCfg', {
                rules: [{ required:false}],
              })
              (
              ) */
              this.showEle(ruleCfg)
          }
        </FormItem>
       
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