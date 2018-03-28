import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { ModelManageAction } from '../../actions/modelManageAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';

import SideTree from './SideTree'
import ModelTable from './ModelTable'

import './style.scss'

const mapState = state => ({
  tree: state.model.tree,
  newData: state.model.newData, //新建
  pager: state.model.pager,
  // filterData: state.model.filterData,
  tableData: state.model.tableData,
   
});
const mapDispatch = dispatch => ({
  getTree:(params)=> dispatch(ModelManageAction.getTree(params)),
  setPager: (params) => dispatch(ModelManageAction.setPager(params)), //当改变煤业显示条目数时
  deleteData: (params) => dispatch(ModelManageAction.deleteData(params)),
  getTableData:(params)=> dispatch(ModelManageAction.getTableData(params)),
  // filterTableData:(params) => dispatch(ModelManageAction.filterTableData(params))
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
