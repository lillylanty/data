import { Modal,Table, Form, Icon, Input,Popover, Button, Checkbox,Tree,Select} from 'antd';
import React, { Component, PropTypes } from 'react'
import AddEntityAutority from './AddEntityAutority';
const TreeNode = Tree.TreeNode;

const Search = Input.Search;

export default class NewSystemTab2  extends Component {
  constructor(props){
    super(props);
    this.state={
      // data: props.tableData ||[],      
      columns:[
        {
          title: '实体名称',
          key: 'entityName',
          render:(text,record) =>{
            let content = (
              <div>
                <p>描述：{record.entityDescription}</p>
              </div>
            );
            return (
              <Popover content={content} title="实体详细">
                <span style={{color:'#098FFF'}}>{record.entityName}</span>
              </Popover>
            )
          }

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
            </div>)
          }
        }

      ],
      visible:false,
      editRoleEntityData:'',
      pagination: {
        showSizeChanger:true,
        onShowSizeChange:this.onShowSizeChange,
        onChange:this.onChange,
        defaultCurrent:1,
        total:300
    },

    }

  }


/*   shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
 */
editEle=(record)=>{
  this.setState({
    visible:true,
    editRoleEntityData:record
  });

}
deletEle=()=>{

}
handleOk = (e) => {
  this.setState({
    visible: false,
  });
}

handleCancel = (e) => {
  // const{ setFormItems } = this.props;

  this.setState({
    visible: false,
  });
  // setFormItems({});
}

  
onSelect = (selectedKeys, info) => {
  console.log('selected', selectedKeys, info);
}
onCheck = (checkedKeys, info) => {
  console.log('onCheck', checkedKeys, info);
}
handleSelect=()=>{

}
search =(e)=>{
  const {roleId,getRoleEntity,pager} = this.props; //,tableData,pager
  setTimeout(()=>{
    getRoleEntity({roleId:roleId,search:`${e}`}); //暂时没有对应的pager
  },1000
  )
}

  render(){
    // console.log(this.props.tableData)
    let style1={
      display:'block'
    }
    let style2={
      display:'none'
    }
    console.log(this.props.roleId)
    let {columns,editRoleEntityData} = this.state;
    let dataSource = this.props.tableData;
    return (
    <div style={this.props.roleId?style1:style2} >
    <div >
      <div className="operation-area">
        <div><Search placeholder='全部实体' onSearch={value => this.search(value)}/></div>
        <Button onClick={()=>this.setState({visible:true})}>添加实体权限</Button> 
      </div>  
      <div className="entity-autority-table-wrapper">
        <Table className='entity-autority-table' dataSource={dataSource} columns={columns} rowKey="entityId" />
      </div>
        <Modal
          style={{minWidth:'800px',minHeight:'400px'}}
          title="添加实体权限"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <AddEntityAutority  {...this.props} editRoleEntityData={editRoleEntityData} />
        </Modal> 
    </div>
  </div>
  )}
}