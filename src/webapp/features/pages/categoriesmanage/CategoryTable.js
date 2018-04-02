import React from 'react';
import {Input, Popover,Button } from 'antd';
import TableData from '../../../../common/TableData';
import './index.scss'

const Search = Input.Search;

export default class CategoryTable extends React.Component{
  constructor(props){
      super(props);
      this.state = {
          filteredInfo:null,
          columns:[{
            title: '类目名称',
            dataIndex: 'entityName',
            key: 'name',
          },    
          {
            title: '创建时间',
            dataIndex: 'entityCode',
            key: 'encode',
          }, {
            title: '创建者',
            dataIndex: 'entityDesc',
            key: 'description',
          },
          {
            title: '操作',
            key: 'action',
            render:(text,record) =>{
            return (
              <div>
                <span style={{color:"#2CA2FF"}} onClick={this.editEle.bind(this,record)}>
                  编辑
                </span>
                <span style={{margin:'0 15px'}}>|</span>
                <span style={{color:"#2CA2FF"}} onClick={this.deleteElement.bind(this,record)} >
                  删除
                </span>
              </div>
         )
            }
          }
        ],
          dataSource:[],
          pagination: {
            showSizeChanger:true,
            onShowSizeChange:this.onShowSizeChange,
            onChange:this.onChange,
            defaultCurrent:1,
            total:300
      },
     
      }  
  }


  componentWillMount(){
    /* const {getTableData,tableData,pager} = this.props;
    getTableData({
      "pageNo": 0,
      "pageSize": 15
    }); */
  }
  componentWillReceiveProps(nextProps,nextState){
    // console.log(nextProps.tableData);
    if(nextProps.tableData.length>0){
      this.setState({
        dataSource: nextProps.tableData.slice(0),
        pagination: {...this.state.pagination,...nextProps.pager}
      })
    }
  }
  onShowSizeChange=(current, pageSize)=> {
    console.log(current, pageSize);
   /*  const {setPager} = this.props;
    setPager({current:current,pageSize:pageSize}) */
  }

  onChange = (pageNum)=>{
    // console.log('pageNum',pageNum)
  }

  editEle = (record) =>{
    /* const {getRecordAttr,getTableData,tableData,pager,recordAttr} = this.props;
    getRecordAttr({id:record.entityGroupId});
    this.props.router.push({pathname:'/model/newmodel',query:{id:record.entityGroupId}})  */ //{recordAttr:recordAttr}});
  }
  
  deleteElement = (record)=>{
   /*  const {deleteData,getTableData,tableData,pager} = this.props;
    deleteData({id:record.entityGroupId});
    getTableData({
       ...pager,"entityName":record.entityName
    }); */
  }


  searchModel(v){
    /* const {getTableData,tableData,pager} = this.props;
    getTableData({
      ...pager,entityName:v.toString()
    }); */
    
    

  }

  goToNewModel=()=>{
    // this.props.router.replace("model/newModel")
  }

  
  render(){
    return(
      <div>
            <p className="title">
              <span>类目管理</span>
              <Button type="primary" size="large" style={{float:'right',marginRight:'10%'}} onClick={this.goToNewModel}> 新增类目 </Button >
            </p>
    
            <TableData columns={this.state.columns} dataSource = {this.state.dataSource} pagination={this.state.pagination} />
          </div>
          )
     }

}