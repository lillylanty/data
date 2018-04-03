import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Modal,Input, Popover,Button } from 'antd';
import { encodeManageAction } from '../../actions/encodeManageAction';
//EncodeManage
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import CodeTable from './CodeTable';
import './style.scss';
import NewCodeManage from '../newcodemanage/index';

const Search = Input.Search;

const mapState = state => ({
  tableData : state.encodeManage.tableData,
  pager: state.encodeManage.pager,
  formItems: state.encodeManage.formItems,
  codeDetail: state.encodeManage.codeDetail, //编辑页面的级联选择
});
const mapDispatch = dispatch => ({
  getCodeDetail:(p)=> dispatch(encodeManageAction.getCodeDetail(p)),
  getTableData:(p)=> dispatch(encodeManageAction.getTableData(p)),
  setPager:(p)=> dispatch(encodeManageAction.setPager(p)),
  setFormItems: (p)=> dispatch(encodeManageAction.setFormItems(p)),
  saveCategory: (p)=> dispatch(encodeManageAction.saveCategory(p)),
  deleteCategory: (p) => dispatch(encodeManageAction.deleteCategory(p)),
});

@connect(mapState, mapDispatch)
export default class encodeManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      formItems:props.formItems || {}
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
/*   shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  } */

  searchCategory=(v)=>{
    const {getTableData,pager} = this.props; //,tableData,pager
    getTableData({...pager,entityName:v.toString()}); //
  }

  addCategory=()=>{
    this.setState({
      visible: true,
    });
    

  }

/*******子组件中的函数******/
editEle = (record) =>{
  this.setState({
    visible: true
  });
  record && record.id && this.props.getCodeDetail({id:record.id});
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
    let v = this.refs.NewCodeForm.getFieldsValue();
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

    let {formItems} = this.state;
    return (
      <div className="content">
      <h3 className="title">编码规则管理</h3>
      <p className="operation-area">
      <Search
          placeholder="输入编码名称搜索"
          onSearch={value => this.searchCategory(value)}
          style={{ width: 300,height:40,fontSize:16,paddingLeft:'10px' }}
          size="large"
          />
      <Button type="primary" size="large" style={{float:'right',marginRight:'10%'}} onClick={this.addCategory}> 新增编码规则 </Button >
            
      </p>
         <CodeTable {...this.props} handleEvent={handleEvent}/>
        <Modal
          title="新建编码规则"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <NewCodeManage ref="NewCodeForm" {...this.props} formItems={formItems}/>
        </Modal> 
      </div>
    )
  }
}
