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
  modelData: state.newModel.modelData, //新建
  entity: state.newModel.entity, //
  canNext: state.newModel.canNext, //是否填写实体编码字段
  relObj: state.newModel.relObj, //引用类型,
  enumObj: state.newModel.enumObj,//
  codeObj: state.newModel.codeObj,//
  category: state.newModel.category, //类目
  uploadResult: state.newModel.uploadResult, //上传结果
  //主页的
  recordAttr: state.model.recordAttr, 
});
const mapDispatch = dispatch => ({
  setcanNext:(p) => dispatch(newModelManageAction.canNext(p)),
  getCategory:(params)=> dispatch(newModelManageAction.getCategory(params)),
  editModal:(params) => dispatch(newModelManageAction.editModal(params)),     //编辑实体表单字段
  // editEntityModel:(params)=> dispatch(newModelManageAction.editEntityModel(params)),
  editEntityModelAttr:(params)=> dispatch(newModelManageAction.editEntityModelAttr(params)), //编辑属性表格
  saveEntity:(params) => dispatch(newModelManageAction.saveEntity(params)), //上传新建的模型所有数据
  getDataType: (params) => dispatch(newModelManageAction.getDataType(params)),
  toggleShowTable:()=> dispatch(newModelManageAction.toggleShowTable()),

  //主页的
  getRecordAttr:(params) =>dispatch(ModelManageAction.getRecordAttr(params)),
});

@connect(mapState, mapDispatch)
export default class NewModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    var data = this.props.location.query;
   
    // const {recordAttr, getRecordAttr} = this.props;
    // getRecordAttr({...data})
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  backToModel = ()=>{
    this.props.router.replace('/model');
  }

  render() {
    console.log(this.props.recordAttr);
    let data = [{
      attrName: '名称',
      attrCode: '122',
      attrDataType: 'int',
      attrDataType_name:'整型',
      relObject:'',
      relObject_name:'',
      attrLength:20,
      checkRule:'-',
      isRequired:true,
      isUnique:false,
      editable:true
      
    }, {
      attrName: '编码',
      attrCode: '11113',
      attrDataType: 'int',
      attrDataType_name:'整型',
      relObject:'',
      relObject_name:'',
      attrLength:20,
      checkRule:'-',
      isRequired:true,
      isUnique:false,
      editable:true
    }, {
      attrName: '描述',
      attrCode: '',
      attrDataType: 'int',
      attrDataType_name:'整型',
      relObject:'',
      relObject_name:'',
      attrLength:20,
      checkRule:'-',
      isRequired:true,
      isUnique:false,
      editable:true
    }];

    return (
      <div className="content">
        <div className="wrapper">
          <div className="title">
            <p style={{float:'left',width:'80%'}}>新建模型页</p>
            <Button style={{float:'left'}} onClick={this.backToModel}>返回实体模型管理</Button>
          </div>
            <NewModelSteps {...this.props} data={data}/>
        </div>
      </div>
    )
  }
}

 //,marginRight:'20%'
