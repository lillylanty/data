import React, { Component, PropTypes } from 'react'
import { Form,  Table, Icon, Input, Button, Checkbox,Select } from 'antd';
import './index.scss'
const Option = Select.Option;
const FormItem = Form.Item;

/* let attrParams = [
  {
    condition: "string",
    conditionValue: "string",
    editPerm: false,
    entityAttrId: 0,
    viewPerm: false
  }
] */
let symbols = ['LIKE','is null','is not null','in not in','=','>','<','>=','<=','!=']

class AddEntityForm extends Component {
  constructor(props){
    super(props);
    const {referEntity,getReferEntity} = this.props;
    getReferEntity();
    this.state = {
      deletePerm: false,
      entityId: '',
      freezePerm: false,
      thawPerm: false,
      addPerm: false,

      editRoleEntityData:props.editRoleEntityData || referEntity,
      attrData:null,//仅作属性权限表左边展示
      data:[],
      columns:[
        {
          title: '属性',
          key: 'attrName',           
          render:(text,record) =>{
            return (
                <span style={{color:'#098FFF'}}>{record.attrName}</span>
            )
          }
        },
        {
          title:'字段名',
          key:'attrCode',
          render:(text,record) =>{

          }
        },
        {
          title:'运算符',
          key:'condition',
          render:(text,record) =>{
            return (
              <div style={{width:'80px'}}>
              {
                record.symbol?<span>{record.symbol}</span>:
                <Select style={{color:'#098FFF'}} onChange={(e)=>this.changeRecord.bind(this,e,record,'attrCode')}>
                  {
                     symbols.map(v=>{
                      return <Option key={v}>{v}</Option>
                    })
                }
                </Select>
              }
              </div>
            )
          }
        },
        {
          title:'过滤条件',
          key:'conditionValue',
          render:(text,record) =>{
            return (
              <div>
                {
                  record.conditionValue? <span>{record.conditionValue}</span>:
                  <Input onChange={(e)=>this.changeRecord.bind(this,e,record,'conditionValue')}>{record.conditionValue}</Input>
                }
              </div>
            )
          }
        },
        {
          title:'查看',
          key:'viewPerm',
          render:(text,record) =>{
            return (
              <span>           
                  <Checkbox checked={record.viewPerm} onChange={(e)=>this.changeRecord.bind(this,e,record,'viewPerm')} />
              </span>
            )
          }
        },
        {
          title:'编辑',
          key:'editPerm',
          render:(text,record) =>{
            return (
              <span>           
                  <Checkbox checked={record.editPerm} onChange={(e)=>this.changeRecord.bind(this,e,record,'editPerm')} />
              </span>
            )
          }
        }
      ]
    }
  }

  componentDidMount(){
    if(!this.props.editRoleEntityData){
      const {referEntity,getReferEntity} = this.props;
      getReferEntity();
      this.setState({
        editRoleEntityData:referEntity     
      })
    }else{
      this.setState({
        entityId: this.props.editRoleEntityData.entityId
      })
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  renderOpt = (arr)=>{
    if(arr){
      if(Object.prototype.toString.call(arr) == '[object Object]' ){
        return <Option key={arr.entityId} >{arr.entityName}</Option>
      }else if(Object.prototype.toString.call(arr) == '[object Array]'){
        return arr.map(v=>{
          <Option key={v.entityId} >{v.entityName}</Option>
        })
      }else{
        return <Option>''</Option>
      }
    }
  }

  handleCheck=(e,t)=>{
    this.setState({
      [t]:e.target.checked
    })     
  }
  handleChange = (v)=>{
    const{ attr,getAttr } = this.props;
    getAttr({id:v})
   
    this.setState({
      entityId:v
    },()=>{
      console.log(attr);
    })
    setTimeout(()=>{
      /* this.setState({
        attrData:attr
      }) */
      //由于后端返回为空，在新建时应不能编辑整个表格，此处为模拟可编辑的情况
        this.setState({
        attrData:[
          {
            id:'0',
            attrCode: "name",
            attrName: "名称",
            symbol:null,
            condition:'',
            viewPerm:true,
            editPerm:true,
          },
          {
            id:'1',
            attrCode: "code",
            attrName: "编码",
            symbol:null,
            condition:'',
            viewPerm:true,
            editPerm:true,
          },
          {
            id:'2',
            attrCode: "descrip",
            attrName: "描述",
            symbol:null,
            condition:'',
            viewPerm:true,
            editPerm:true,
          }
        ]
      },()=>{
       
      });
    },1000);

  }


  render() {
    const { getFieldDecorator } = this.props.form;
    let {data, columns,editRoleEntityData,attrData} = this.state;   
    
    return (
      <Form onSubmit={this.handleSubmit} className="entity-autority-form">
        <FormItem  style={{display:'flex'}}
        label={'选择实体：'}>
          {getFieldDecorator('entityName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Select  onChange={(e)=>this.handleChange(e)}  style={{width:'200px'}}  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} >
              {
                this.renderOpt(editRoleEntityData)
              }
            </Select>
          )}
        </FormItem>
        
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <div style={{marginLeft:'80px'}}>
            <Checkbox onChange={(e)=>this.handleCheck(e,'addPerm')} >新增记录</Checkbox>
            <Checkbox onChange={(e)=>this.handleCheck(e,'deletePerm')} >删除记录</Checkbox>
            <Checkbox onChange={(e)=>this.handleCheck(e,'freezePerm')} >冻结记录</Checkbox>
            <Checkbox onChange={(e)=>this.handleCheck(e,'thawPerm')} >解冻记录</Checkbox>
            </div>
          )}
        </FormItem>
        <FormItem style={{display:'flex'}} label={'属性权限：'}>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Table style={{minWidth:'600px'}} dataSource={attrData} columns={columns} />
          )}
        </FormItem>
      </Form>
    );
  }
}

const AddEntityAutority = Form.create()(AddEntityForm);
export default AddEntityAutority;

/**
checked={this.state.addPerm}   
checked={this.state.deletePerm}
checked={this.state.freezePerm}
checked={this.state.thawPerm}  
 * 
 * 
*/
