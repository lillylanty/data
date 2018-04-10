import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
import { Form, Icon, Input, Button, Checkbox,Popover,Select,Tabs } from 'antd';
import { systemmanageAction } from '../../actions/systemmanageAction';
import NewSystemTab1 from './NewSystemTab1';
import NewSystemTab2 from './NewSystemTab2';

import './index.scss';
const TabPane = Tabs.TabPane;

const mapState = state => ({
  attr: state.systemmanage.attr, //新建角色页面的实体权限
  tree: state.systemmanage.tree, //新建角色页面的树
  role: state.systemmanage.role, //新建 角色-功能权限
  roleEntity: state.systemmanage.roleEntity, //实体权限列表
  referEntity: state.systemmanage.referEntity, //实体权限列表
});
const mapDispatch = dispatch => ({
  getAttr:(p)=> dispatch(systemmanageAction.getAttr(p)),
  getTree:(p)=> dispatch(systemmanageAction.getTree(p)),
  getRoleEntity:(p) => dispatch(systemmanageAction.getRoleEntity(p)),
  addRole:(p)=> dispatch(systemmanageAction.addRole(p)), //编辑 角色-功能权限
  getReferEntity:(p)=> dispatch(systemmanageAction.getReferEntity(p)), //编辑 角色-实体权限-获取关联实体
});
@connect(mapState, mapDispatch)

export default class NewSystemManage  extends Component {
  constructor(props){
    super(props);
    this.state={
      roleName:'',
      roleDesc:'',
      roleId:'',
      isAdmin:false,
      treeData:null,
      key:1,
      Autority:[]
    }
    
  }

  componentDidMount(){
    var {data} = this.props.location.state;
   
    if(data){
      this.queryAutorityTree({roleId:data.roleId});
      this.setState({
        roleDesc:data.roleDesc || '',
        roleName: data.roleName|| '',
        roleId:data.roleId
      },()=>{
        
      })
    }else{
      this.queryAutorityTree();
    }
  }

  queryAutorityTree=(v)=>{
    const {tree,getTree} = this.props;
    getTree(v);
    this.setState({
      treeData:tree
    })
  }

callback=(key)=>{
  if(key == 2){
    const {roleEntity,getRoleEntity} = this.props;
    if(this.state.roleId){
        getRoleEntity({roleId:this.state.roleId});
    }
  }
  this.setState({
    key:key
  })
}
  backToModel = ()=>{
    this.props.router.replace('/systemmanage');
  }
  handleInput = (e,t)=>{
    switch(t){
      case '管理员':
       this.setState({
        isAdmin:e.target.checked
       });break;
      case '描述':
       this.setState({
         roleDesc: e.target.value
       });break;
      case '名称':
      this.setState({
        roleName: e.target.value
      });break;
    }
  }
  handleCancel = ()=>{
    if( this.state.key== 1){
      const {role,addRole} =this.props;
      addRole();
  }else{

  }
  }

  handleSubmit = (p)=>{
    if( this.state.key== 1){
        const {role,addRole} =this.props;
        addRole({
          admin: this.state.isAdmin,
          desc: this.state.roleDesc,
          name: this.state.roleName,
          permissionIds: this.state.Autority
        })
    }else {
      
    }
   
  
}

  render(){
    
    return (
    <div className="content">
    <div className="wrapper">
      <div className="title">
        <p style={{float:'left',width:'80%'}}>新建角色</p>
        <Button style={{float:'left'}} onClick={this.backToModel}>返回实体模型管理</Button>
      </div>
      <ul className="inline-form">
        <li><span>角色名称：</span><Input placeholder={this.state.roleName} onChange={(e)=>{this.handleInput(e,'名称')}}/></li>
        <li><span>角色描述：</span><Input placeholder={this.state.roleDesc} onChange={(e)=>{this.handleInput(e,'描述')}}/></li>
        <li><span>管理员：</span><Checkbox  onChange={(e)=>{this.handleInput(e,'管理员')}}/></li>
      </ul>
      <Tabs defaultActiveKey="1" onChange={this.callback}>
        <TabPane tab="功能权限" key="1"><NewSystemTab1 {...this.props} treeData={this.props.tree} isAdmin={this.state.isAdmin}/></TabPane>
        <TabPane tab="实体权限" key="2"><NewSystemTab2 {...this.props} roleId={this.state.roleId} tableData={this.props.roleEntity}  /></TabPane>
      </Tabs>
      <p>
        <Button onClick={this.handleCancel}>取消</Button>
        <Button type="primary" style={{marginLeft:'20px'}} onClick={this.handleSubmit}>确定</Button>
      </p>
        
    </div>
  </div>
  )}
}