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
    const {getTableData,tableData,pager} = this.props;
    getTableData({
      "pageNo": 0,
      "pageSize": 15
    });
  }
  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.tableData !== this.props.tableData){
      this.setState({
        dataSource: nextProps.tableData.slice(0),
        pagination: {...this.state.pagination,...nextProps.pager}
      })
    }
  }
  onShowSizeChange=(current, pageSize)=> {
    const {setPager} = this.props;
    setPager({current:current,pageSize:pageSize})
  }

  onChange = (pageNum)=>{
    // console.log('pageNum',pageNum)
  }

  editEle = (record) =>{
    
    const {modelData,editModal,getRecordAttr,getTableData,editEntityModelAttr,tableData,pager,recordAttr} = this.props;
    getRecordAttr({id:record.entityGroupId});
    editModal(Object.assign({},record));
    //如果该记录有属性的话，就更新新建页面的列表 调的是api/v1/entity/attr?id=1接口,id是record的groupId
    recordAttr && recordAttr.length>0 && editEntityModelAttr([...recordAttr]);
    this.props.router.push({pathname:'/model/newmodel',query:{id:record.entityGroupId}})  //{recordAttr:recordAttr}});
  }
  
  deleteElement = (record)=>{
    const {deleteData,getTableData,tableData,pager} = this.props;
    deleteData({id:record.entityGroupId});
    getTableData({
       ...pager,"entityName":record.entityName
    });
  }


  searchModel(v){
    const {getTableData,tableData,pager} = this.props;
    getTableData({
      ...pager,entityName:v.toString()
    });
    
    

  }

  goToNewModel=()=>{
    const {modelData,editModal,entityModelAttr,editEntityModelAttr,tableData,pager,recordAttr} = this.props;
    //新建时清空modelData和attr
    editModal({});
    editEntityModelAttr(
      [{
        key:1,
        attrName: '名称',
        attrCode: '122',
        attrDataType: 'int',
        attrDataType_name:'整型',
        relObject:'',
        relObject_name:'',
        attrLength:20,
        checkRule:'-',
        isRequired:true,
        isUnique:false,
        editable:true 
      }, {
        key:2,
        attrName: '编码',
        attrCode: '11113',
        attrDataType: 'int',
        attrDataType_name:'整型',
        relObject:'',
        relObject_name:'',
        attrLength:20,
        checkRule:'-',
        isRequired:true,
        isUnique:false,
        editable:true
      }, {
        key:3,
        attrName: '描述',
        attrCode: '',
        attrDataType: 'int',
        attrDataType_name:'整型',
        relObject:'',
        relObject_name:'',
        attrLength:20,
        checkRule:'-',
        isRequired:true,
        isUnique:false,
        editable:true
      }]
    );
    this.props.router.replace("model/newModel")
  }
  
  
  render(){
    // console.log(this.props.tableData)
    return(
      <div>
            <p className="search-input">
             <Search
                placeholder="输入实体名称"
                onSearch={value => this.searchModel(value)}
                style={{ width: 300,height:40,fontSize:16,paddingLeft:'10px' }}
                size="large"
              />
              <Button type="primary" size="large" style={{float:'right',marginRight:'10%'}} onClick={this.goToNewModel}> 新建实体模型 </Button >
            </p>
    
            <TableData columns={this.state.columns}  dataSource = {this.state.dataSource} pagination={this.state.pagination} />
          </div>
          )
     }

}