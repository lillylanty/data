import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { newModelManageAction } from '../../../actions/newModelManageAction';
import { ModelManageAction } from '../../../actions/modelManageAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';

import NewModelSteps from './newModelSteps'
import {Button} from 'antd';

import './newmodel.css'

const mapState = state => ({
  entityModalAttr: state.newModel.entityModalAttr, //属性表格
  modelData: state.newModel.modelData, //表单
  entity: state.newModel.entity, //

  relObj: state.newModel.relObj, //引用类型,
  enumObj: state.newModel.enumObj,//
  codeObj: state.newModel.codeObj,//
  category: state.newModel.category, //类目
  uploadResult: state.newModel.uploadResult, //上传结果
});
const mapDispatch = dispatch => ({

  getCategory:(params)=> dispatch(newModelManageAction.getCategory(params)),
  editModal:(params) => dispatch(newModelManageAction.editModal(params)),     //编辑实体表单字段
  editEntityModelAttr:(params)=> dispatch(newModelManageAction.editEntityModelAttr(params)), //编辑属性表格
  saveEntity:(params) => dispatch(newModelManageAction.saveEntity(params)), //上传新建的模型所有数据
  getDataType: (params) => dispatch(newModelManageAction.getDataType(params)),

  getRecordAttr:(params) =>dispatch(newModelManageAction.getRecordAttr(params)), //实际上是更新modalAttr表
});

@connect(mapState, mapDispatch)
export default class NewModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modelForm:{}
    };
   
  }
  componentWillMount() {
  let id = this.props.location.state && this.props.location.state.id;
   if(id){
     this.props.getRecordAttr({id:id}); //是编辑的情况，请求编辑页面的属性列表   
   }
  }
  componentWillReceiveProps(nextProps) {
    console.log('newmodel nextProps',nextProps)
    this.setState({
      modelForm:{...this.state.modelForm,...nextProps.modelData}
    },()=>{
      console.log(this.state.modelForm)
    })
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  backToModel = ()=>{
    this.props.router.replace('/model');
  }

  render() {
    return (
      <div className="content">
        <div className="wrapper">
          <div style={{height:'80px'}}>
            <p style={{float:'left',width:'80%'}}>新建模型页</p>
            <Button style={{float:'left'}} onClick={this.backToModel}>返回实体模型管理</Button>
          </div>
            <NewModelSteps {...this.props}  modelForm={this.state.modelForm}/>
        </div>
      </div>
    )
  }
}

