import React from 'react';
import {Input, Popover,Button } from 'antd';
import TableData from '../../../../common/TableData';

const Search = Input.Search;

export default class ModelTable extends React.Component{
  constructor(props){
      super(props);
      
      this.state = {
          filteredInfo:null,
          columns:[{
            title: '实体模型名称',
            dataIndex: 'entityName',
            key: 'name',
          },    
          {
            title: '编码',
            dataIndex: 'entityCode',
            key: 'encode',
          }, {
            title: '描述',
            dataIndex: 'entityDesc',
            key: 'description',
          }, {
            title: '最新修改人',
            dataIndex: 'modifier',
            key: 'latestModifier',
          },
          {
            title: '发起修改时间',
            dataIndex: 'gmtModified',
            key: 'lastModifyTime',
          },
          {
            title: '操作',
            key: 'action',
            render:(text,record) =>{
            console.log(record)
              return (
              <div>
                <span style={{color:"#2CA2FF"}} >
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
      // filterData:[]
      }  
  }


  componentWillMount(){
    const {getTableData,tableData,pager} = this.props;
    getTableData({
      "pageNo": 0,
      "pageSize": 15
    });
  }
  componentWillReceiveProps(nextProps,nextState){
    console.log(nextProps.tableData);
    if(nextProps.tableData.length>0){
      this.setState({
        dataSource: nextProps.tableData.slice(0),
        pagination: {...this.state.pagination,...nextProps.pager}
      })
    }
  }
  // onShowSizeChange=(current, pageSize)=> {
  //   console.log(current, pageSize);
  // }

  onChange = (pageNum)=>{
    // console.log('pageNum',pageNum)
  }
  deleteElement = (record)=>{
    const {deleteData,getTableData,tableData,pager} = this.props;
    deleteData({id:record.entityGroupId});
    getTableData({
      "entityName":record.entityName,
      "pageNo": 1,
      "pageSize": 5
    });
    console.log(tableData)
  }


  searchModel(v){
    console.log(v);
    const {getTableData,tableData,pager} = this.props;
    getTableData({
      "entityName":v.toString(),
      "pageNo": 1,
      "pageSize": 5
    });
    console.log(tableData)

  }

  render(){
     return(
          <div>
            <p className="search-input">
             <Search
                placeholder="输入实体名称"
                onSearch={value => this.searchModel(value)}
                style={{ width: 300,height:40,fontSize:16,paddingLeft:'10px' }}
                size="large"
              />
              {/* <span style={{backgroundColor:"#1C8DE7"}}>搜索</span> */}
              {/* <Button type="primary"  style={{ width: 100,height:50,fontSize:16 }}> 搜索 </Button > */}
              <Button type="primary" size="large" style={{float:'right',marginRight:'10%'}}> 新建实体模型 </Button >
            </p>
    
            <TableData columns={this.state.columns} dataSource = {this.state.dataSource} pagination={this.state.pagination} />
          </div>
          )
     }

}