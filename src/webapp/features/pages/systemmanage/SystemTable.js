import React from 'react';
import {Input, Popover,Button,Checkbox } from 'antd';
import TableData from '../../../../common/TableData';
import './style.scss'

const Search = Input.Search;

export default class SystemTable extends React.Component{
  constructor(props){
      super(props);
  
      this.state = {
        dataSource: props.roleTableData || [],
          filteredInfo:null,
          columns:[{
            title: '角色名称',
            key: 'roleName',
            render:(text,record) =>{
              let content = (
                <div>
                  <p>类目名称：{record.ruleName}</p>
                  <p>长度：{record.ruleLength||''}</p>
                </div>
              );
              return (
                <Popover content={content} title="编码规则详细">
                  <span style={{color:'#098FFF'}}>{record.roleName}</span>
                </Popover>
              )
            }

          },  
          {
            title: '管理员',
            dataIndex:'admin',
            render: (text, record) => {
              return (
                <span>{record.admin?'是':'否'}</span>
              )
            }
          }, 
          {
            title: '最近修改人',
            dataIndex: 'modified',
            key: 'modified',
          }, 
          {
            title: '最近修改时间',
            dataIndex: 'gmtModified',
            key: 'encode',
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
    console.log('child-willreceive',nextProps.roleTableData)
    // if(nextProps.roleTableData){
      this.setState({
        dataSource: nextProps.roleTableData.slice(0),
        pagination: {...this.state.pagination,...nextProps.pager}
      })
    // }
  }
  renderCheckbox(text, record, column){
    return (
      <div>
        <Checkbox  checked={record[column]}  onChange={(e) => this.onCheckChange(e,record,column)}></Checkbox>
       
      </div>
      
    )
  }
  onCheckChange(e,record,column){
    console.log(e,record,column)
    // this.handleChange(record.key,e.target.checked,column)
  }


  onShowSizeChange=(current, pageSize)=> {
    // console.log(current, pageSize);
    const {setPager} = this.props;
    setPager({current:current,pageSize:pageSize})
  }

  onChange = (pageNum)=>{
    // console.log('pageNum',pageNum)
  }
  editEle =(record)=>{
    // this.props.handleEvent && this.props.handleEvent.editEle(record);
    // this.props.router.replace('/newsystemmanage')
    this.props.router.push({pathname:'/newsystemmanage',state:{data:record}})  //{recordAttr:recordAttr}});
  
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
    console.log('child',dataSource)
    return(
      <div className="table-style">   
        <TableData style={{background:'#fff'}} columns={this.state.columns} rowKey="id" dataSource={dataSource} pagination={this.state.pagination} />
      </div>
        )
     }

}