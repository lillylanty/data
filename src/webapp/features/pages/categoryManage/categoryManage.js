import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Modal,Input, Popover,Button } from 'antd';
import TableData from '../../../../common/TableData';

import { categoryManageAction } from '../../actions/categoryManageAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import CategoryTable from './CategoryTable';
import './style.scss';
import NewCategoryManage from '../newCategoryManage/index';

const Search = Input.Search;

const mapState = state => ({
  tableData : state.categoryManage.tableData,
  pager: state.categoryManage.pager,
});
const mapDispatch = dispatch => ({
  getTableData:(p)=> dispatch(categoryManageAction.getTableData(p)),
  setPager:(p)=> dispatch(categoryManageAction.setPager(p)),
});

@connect(mapState, mapDispatch)
export default class CategoryManage extends Component {
  constructor(props) {
    super(props);
    const {getTableData,tableData} = props;
    this.state = {
      visible:false,
    };
  }


  componentWillMount(){
    const {getTableData,tableData,pager} = this.props;
    getTableData({
      "pageNo": 0,
      "pageSize": 15
    }); 
 }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.tableData)
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }





  searchCategory=(v)=>{

    const {getTableData,pager} = this.props; //,tableData,pager
    console.log(getTableData)
    getTableData({...pager,entityName:v.toString()}); //
    

  }

  addCategory=()=>{
    this.setState({
      visible: true,
    });
      // const {modelData,editModal,entityModelAttr,editEntityModelAttr,tableData,pager,recordAttr} = this.props;
      //新建时清空modelData和attr
   
      // this.props.router.replace("newcategorymanage")

  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    console.log(this.refs.NewCategoryForm.getFieldsValue());
    console.log(this.wrappedComponentRef('NewCategoryForm'))
    
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div className="content">
      <h3 className="title">类目管理</h3>
      <p className="operation-area">
      <Search
          placeholder="输入实体名称"
          onSearch={value => this.searchCategory(value)}
          style={{ width: 300,height:40,fontSize:16,paddingLeft:'10px' }}
          size="large"
          />
      <Button type="primary" size="large" style={{float:'right',marginRight:'10%'}} onClick={this.addCategory}> 新增类目 </Button >
            
      </p>
        <CategoryTable {...this.props}/>
        <Modal
          title="新建类目"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <NewCategoryManage ref="NewCategoryForm"/>
        </Modal>
      </div>
    )
  }
}
