import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Modal,Input, Popover,Button } from 'antd';
import { systemmanageAction } from '../../actions/systemmanageAction';
//systemmanage
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import SystemTable from './SystemTable';
import './style.scss';
import NewSystemManage from '../newsystemmanage/index';


const Search = Input.Search;

const mapState = state => ({
  roleTableData : state.systemmanage.roleTable,
  pager: state.systemmanage.pager,
  formItems: state.systemmanage.formItems,
  
});
const mapDispatch = dispatch => ({
  getRoleTableData:(p)=> dispatch(systemmanageAction.getRoleTableData(p)),
  setPager:(p)=> dispatch(systemmanageAction.setPager(p)),
 /*  setFormItems: (p)=> dispatch(systemmanageAction.setFormItems(p)),
  saveCategory: (p)=> dispatch(systemmanageAction.saveCategory(p)),
  deleteCategory: (p) => dispatch(systemmanageAction.deleteCategory(p)), */
});

@connect(mapState, mapDispatch)
export default class Systemmanage extends Component {
  constructor(props) {
    super(props);
    this.state = {

      formItems: {}
    };
  }


  componentWillMount(){
    const {getRoleTableData,pager} = this.props;
   
    getRoleTableData({
      "pageNo": 0,
      "pageSize": 15
    }); 
 }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
   /*  if(nextProps.roleTableData !== this.props.roleTableData){ //说明点了编辑发送了更新codeDetail请求
      this.setState({
        dataSource: nextProps.roleTableData
      })
    } */
    
  }
/*   shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  } */

  searchCategory=(v)=>{
    const {getRoleTableData,pager} = this.props; //,tableData,pager
    getRoleTableData({...pager,search:v.toString()}); //
  }

  addCategory=()=>{
   // const {modelData,editModal,entityModelAttr,editEntityModelAttr,tableData,pager,recordAttr} = this.props;
      //新建时清空modelData和attr
   
    this.props.router.replace("/newsystemmanage");

  }

/*******子组件中的函数******/
/* editEle = (record) =>{
  this.setState({
    visible: true,
    edit: true
  });
  record && record.id && this.props.getCodeDetail({id:record.id});
}

deletEle = (record)=>{
  // console.log(record)
  const {deleteCategory,getRoleTableData,pager} = this.props;
  record && record.id && deleteCategory({id:record.id});
  getRoleTableData({ ...pager}); 
}
 */



/********/



/*   handleOk = (e) => {
    const{ setFormItems,saveCategory,formItems } = this.props;
    this.setState({
      visible: false,
    });
    if(formItems){
      saveCategory(formItems)
    }

  }
 */
/*   handleCancel = (e) => {
    const{ setFormItems } = this.props;
    // let v = this.refs.NewCodeForm.getFieldsValue();
    // console.log(v.ruleCfg)
    this.setState({
      visible: false,
    });
    setFormItems({});
  }
 */
/*   close=()=>{
    const{saveCategory } = this.props;
    if(this.state.items){
      this.props.setFormItems({...this.state.items,ruleCfg:this.state.ruleCfg});
      saveCategory({...this.state.items,ruleCfg:this.state.ruleCfg})
    }
    else{
      this.props.setFormItems({...this.state.listItem,ruleCfg:this.state.ruleCfg});
      saveCategory({...this.state.listItem,ruleCfg:this.state.ruleCfg})
    }
    this.setState({
      visible:false
    });
    
    
  } */

  render() {
   

    let {roleTableData} = this.state;
    console.log('parent',roleTableData)
    return (
      <div className="content">
      <p style={{display:'flex',justifyContent:'space-between'}}>  
      <div >
        <Search
          placeholder="输入角色名称搜索"
          onSearch={value => this.searchCategory(value)}
          style={{height:40,fontSize:16,paddingLeft:'10px' }}
          size="large"
        />
      </div>
      
      <Button type="primary" size="large" style={{marginRight:'10%'}} onClick={this.addCategory}> 新建角色 </Button >
            
      </p>
         <SystemTable {...this.props}  />
      </div>
    )
  }
}
