import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { ModelManageAction } from '../../actions/modelManageAction';
import { newModelManageAction } from '../../actions/newModelManageAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';

import SideTree from './SideTree'
import ModelTable from './ModelTable'

import './style.scss'

const mapState = state => ({
  tree: state.model.tree,
  newData: state.model.newData, //新建
  pager: state.model.pager,
  tableData: state.model.tableData,
  recordAttr: state.model.recordAttr, 
  //新建页面的
  modelData: state.newModel.modelData,

});
const mapDispatch = dispatch => ({
  getTree:(params)=> dispatch(ModelManageAction.getTree(params)),
  setPager: (params) => dispatch(ModelManageAction.setPager(params)), //当改变煤业显示条目数时
  deleteData: (params) => dispatch(ModelManageAction.deleteData(params)),
  getTableData:(params)=> dispatch(ModelManageAction.getTableData(params)),
  getRecordAttr:(params)=> dispatch(ModelManageAction.getRecordAttr(params)),

  //新建页面的
  editModal:(params) => dispatch(newModelManageAction.editModal(params)),     //编辑实体表单字段
  editEntityModelAttr:(params)=> dispatch(newModelManageAction.editEntityModelAttr(params)), //编辑属性表格
});

@connect(mapState, mapDispatch)
export default class ModelManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  testDelete = ()=>{
    this.props.deleteData({id:1});
    console.log(this.props.tableData);
  }
 

  render() {
    return (
      <div className="content">
        <div className="wrap-style">
        <div className="left-tree">
          <SideTree {...this.props} />
        </div>
        
        <div className ="data-area">
          <ModelTable {...this.props}/>
        </div>
        </div>
      </div>
    )
  }
}
