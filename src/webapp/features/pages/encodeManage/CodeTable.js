import React from 'react';
import {Input, Popover,Button } from 'antd';
import TableData from '../../../../common/TableData';
import './style.scss'

const Search = Input.Search;

export default class CodeTable extends React.Component{
  constructor(props){
      super(props);
    
      this.state = {
          dataSource: props.dataSource || [],
          filteredInfo:null,
          columns:[{
            title: '编码规则名称',
            key: 'ruleName',
            render:(text,record) =>{
              console.log(record)
              let content = (
                <div>
                  <p>类目名称：{record.ruleName}</p>
                  <p>长度：{record.ruleLength||''}</p>
                </div>
              );
              return (
                <Popover content={content} title="编码规则详细">
                  <span style={{color:'#098FFF'}}>{record.ruleName || ''}</span>
                </Popover>
              )
            }

          },  
          {
            title: '描述',
            dataIndex:'ruleDesc',
            key:'ruleDesc'
          },  
          {
            title: '最近修改时间',
            dataIndex: 'gmtModified',
            key: 'encode',
          }, {
            title: '最近修改人',
            dataIndex: 'modifier',
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
                <span style={{color:"#2CA2FF"}} onClick={this.deletEle.bind(this,record)} >
                  删除
                </span>
              </div>
         )
            }
          }
        ],
          
          pagination: {
            showSizeChanger:true,
            onShowSizeChange:this.onShowSizeChange,
            onChange:this.onChange,
            defaultCurrent:1,
            total:300
      },
     
      }  
  }


  componentWillReceiveProps(nextProps,nextState){
    /* if(nextProps.tableData && nextProps.tableData.length>0){
      // console.log('CategoryTable - will Receive',nextProps.tableData)
      this.setState({
        dataSource: nextProps.tableData.slice(0),
        pagination: {...this.state.pagination,...nextProps.pager}
      })
    } */
  }

  shouldComponentUpdate(){
    return false
  }
  onShowSizeChange=(current, pageSize)=> {
    console.log(current, pageSize);
    const {setPager} = this.props;
    setPager({current:current,pageSize:pageSize})
  }

  onChange = (pageNum)=>{
    // console.log('pageNum',pageNum)
  }
  editEle =(record)=>{
    this.props.handleEvent && this.props.handleEvent.editEle(record);
   }

 
  
  deletEle = (record)=>{
    this.props.handleEvent && this.props.handleEvent.deletEle(record);
   /*  const {deleteData,getTableData,tableData,pager} = this.props;
    deleteData({id:record.entityGroupId});
    getTableData({
       ...pager,"entityName":record.entityName
    }); */
  }


  
  render(){
    const {dataSource} = this.state;
    return(
      <div className="table-style">   
        <TableData columns={this.state.columns} rowKey="id" dataSource = {dataSource} pagination={this.state.pagination} />
      </div>
        )
     }

}