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
  formItems: state.categoryManage.formItems,
});
const mapDispatch = dispatch => ({
  getTableData:(p)=> dispatch(categoryManageAction.getTableData(p)),
  setPager:(p)=> dispatch(categoryManageAction.setPager(p)),
  setFormItems: (p)=> dispatch(categoryManageAction.setFormItems(p)),
  saveCategory: (p)=> dispatch(categoryManageAction.saveCategory(p)),
  deleteCategory: (p) => dispatch(categoryManageAction.deleteCategory(p)),
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
    // console.log(nextProps.tableData)
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

/*******子组件中的函数******/
editEle = (record) =>{
  console.log('editEle',record)
  const{ setFormItems,saveCategory } = this.props;
  this.setState({
    visible: true
  });

}

deletEle = (record)=>{
  // console.log(record)
  const {deleteCategory,getTableData,pager} = this.props;

  record && record.id && deleteCategory({id:record.id});
  getTableData({ ...pager}); 
}

/********/



  handleOk = (e) => {
    const{ setFormItems,saveCategory } = this.props;
    this.setState({
      visible: false,
    });
    let v = this.refs.NewCategoryForm.getFieldsValue();
    let a = {};
    for(var k in v){
      if(v.hasOwnProperty(k) && v[k]){
        a[k] = v[k]
      }
    }
    if(a){
      setFormItems(a);
      saveCategory(a)
    } 
  }

  handleCancel = (e) => {
    const{ setFormItems } = this.props;
    this.setState({
      visible: false,
    });
    setFormItems({});
  }

  render() {
    let handleEvent = {
      editEle: this.editEle,
      deletEle: this.deletEle,
    }
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
        <CategoryTable {...this.props} handleEvent={handleEvent}/>
        <Modal
          title="新建类目"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <NewCategoryManage ref="NewCategoryForm" formItems={this.props.formItems}/>
        </Modal>
      </div>
    )
  }
}
