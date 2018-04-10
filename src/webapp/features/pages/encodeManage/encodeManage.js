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
      edit:false, //告知子组件是编辑还是新建
      visible:false,
      formItems: {}
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
    if(nextProps.codeDetail !== this.props.codeDetail){ //说明点了编辑发送了更新codeDetail请求
      this.setState({
        formItems: nextProps.codeDetail
      })
    }
    
  }

  searchCategory=(v)=>{
    const {getTableData,pager} = this.props; //,tableData,pager
    getTableData({...pager,entityName:v.toString()}); //
  }

  addCategory=()=>{
    const{ setFormItems } = this.props;
    setFormItems({})
    this.setState({
      visible: true,
      edit:false,
      formItems:null
    });
    

  }

/*******子组件中的函数******/
editEle = (record) =>{
  this.setState({
    visible: true,
    edit: true
  });
  if(record && record.id){
    this.props.getCodeDetail({id:record.id});
  }
}

deletEle = (record)=>{
  const {deleteCategory,getTableData,pager} = this.props;
  record && record.id && deleteCategory({id:record.id});
  getTableData({ ...pager}); 
}




/********/



  handleOk = (v) => {
    const{ setFormItems,saveCategory,formItems } = this.props;
     //let v = this.refs.NewCodeForm.getFieldsValue();
    console.log('handleOk',v);
    this.setState({
      visible: false,
    });
    if(v){
      saveCategory(v) ;//上传编辑的内容
    }

  }

  handleCancel = (e) => {
    const{ setFormItems } = this.props;
    this.setState({
      visible: false,
    });
    setFormItems({});//清空编辑的内容
  }

  render() {
    let handleEvent = {
      editEle: this.editEle,
      deletEle: this.deletEle,
    }

    let {formItems,edit} = this.state;
    return (
      <div className="content">
      <h3 style={{margin:'20px'}}>编码规则管理</h3>
      <div className="operation-area">
      <div>
      <Search
          placeholder="输入编码名称搜索"
          onSearch={value => this.searchCategory(value)}
          style={{height:40,fontSize:16,paddingLeft:'10px' }}
          size="large"
          />
      </div>
      <Button type="primary" size="large" style={{float:'right',marginRight:'10%'}} onClick={this.addCategory}> 新增编码规则 </Button >
            
      </div>
         <CodeTable {...this.props} handleEvent={handleEvent}/>
        <Modal
          title="新建编码规则"
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
        <NewCodeManage ref="NewCodeForm" handleOk={this.handleOk}  handleCancel={this.handleCancel} {...this.props} edit={edit} formItems={formItems}/>
        </Modal> 
      </div>
    )
  }
}
