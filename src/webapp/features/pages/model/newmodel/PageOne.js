import React, { Component, PropTypes } from 'react';

import {  Icon, Input, Button,Popconfirm,Select, Spin ,Checkbox ,message } from 'antd';
import HorizontalAddForm from './HorizontalAddForm';
import TableData from '../../../../../common/TableData';

const { Option, OptGroup } = Select;

let options2 =[
  {
  text:'实体引用',
  value:'rel'
  },
  {
    text:'编码规则',
    value:'code'
  },
  {
    text:'枚举',
    value:'enum'
  }
];

let options1 = [
  {
    text:'字符串',
    value:'varchar'
  },
  {
    text:'整型',
    value:'int'
  },
  {
    text:'浮点型',
    value:'decimal'
  },
  {
    text:'日期',
    value:'date'
  },
  {
    text:'时间',
    value:'time'
  },
  {
    text:'日期时间',
    value:'datetime'
  },
  {
    text:'大文本',
    value:'text'
  }
];

 const EditableCell = ({ editable, value, onChange,column }) =>{
  return (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value,column)} />
      : value
    }
  </div> 
  )
}

const SelectableCell = ({ value,onChange,column,editable }) => {
  return (
    <div>
      {editable
       ? <Select style={{ width: '100%' }} value={value} onChange={(e,value) =>onChange(e,value,column)} >
          <OptGroup label="基本类型">
              {options1.length>0 && options1.map(d => <Option key={d.value}>{d.text}</Option>)}
          </OptGroup>
          <OptGroup label='复杂数据类型'>
              {options2.length>0 && options2.map(d => <Option key={d.value}>{d.text}</Option>)} 
          </OptGroup>
        </Select>
        :value
      }
    </div> 
)
}; 

/**
 * 注意handleChange的参数顺序要正确传，不然会更改不了表单显示的value
 */

export default class PageOne extends Component{
  constructor(props) {
    super(props);
    const {entityModalAttr} = props;
    this.state = {
      relObject: [],
      data_type_name:'',
      rel_name:'',
      selectReferObj:'',//引用对象 选中项
      data: entityModalAttr || [],     
    };
     this.columns = [
      {
      title: '属性名称',
      dataIndex: 'attrName',
      width:150,
      render: (text, record) => this.renderColumnsSpecial(text, record, 'attrName'),
    },
     {
      title: '编码',
      dataIndex: 'attrCode',
      width:150,
      render: (text, record) => this.renderColumnsSpecial(text, record, 'attrCode'),
    }, 
    {
      title: '数据类型',
      dataIndex: 'attrDataType',
      width:150,
      render: (text, record) => this.renderSelectableCol(text, record, 'attrDataType'),
    },
     {
      title: '引用对象',
      dataIndex: 'relObject',
      width:150,
      render: (text, record) => this.renderSelectRefer( record, 'relObject'),
    },
    {
      title: '长度',
      dataIndex: 'attrLength',
      width:150,
      render: (text, record) => this.renderColumns(text, record, 'attrLength'),
    },
    {
      title: '校验规则',
      dataIndex: 'checkRule',
      width:150,
      render: (text, record) => this.renderColumns(text, record, 'checkRule'),
    },
    {
      title: '是否必填',
      dataIndex: 'isRequired',
      width:150,
      render: (text, record) => this.renderCheckbox(text, record, 'isRequired'),
    },
    {
      title: '是否唯一',
      dataIndex: 'isUnique',
      width:150,
      render: (text, record) => this.renderCheckbox(text, record, 'isUnique'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      width:200,
      key:'operation',
      render:(text,record) =>{
        const { editable } = record;
       
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key,record)} style={{color:"#2CA2FF"}}>保存</a>
                  <strong style={{margin:'0 15px'}}>|</strong>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                : <span>
                    <a onClick={() => this.edit(record.key)}>编辑</a>
                     
                    <a onClick={() => this.delEle(record.key)} style={this.getClassName(record)} >
                    <strong style={{margin:'0 15px'}} >|</strong>删除</a>
                  </span> 
            }
          </div>
        );
      }   
    }
    ];
 

    this.cacheData; 
    this.copytableData = entityModalAttr.slice(0);

  }
  
  renderCheckbox(text, record, column){
    return (
      <div>
        {
          record.editable? <Checkbox  checked={record[column]}  onChange={(e) => this.onCheckChange(e,record,column)}></Checkbox> : record[column]?'是':'否'
        }
      </div>
      
    )
  }

  onCheckChange(e,record,column){
    this.handleChange(record.key,e.target.checked,column)
  }

  renderColumnsSpecial(text, record, column){
    let editable;
    if(column == 'attrName'){
      switch(record[column]){
        case '名称': case '编码': case '描述':
         editable = false;
         break;
         default: 
          editable = record.editable;
      }
    }
    if(column == 'attrCode' ){
      if(record.attrName == '名称' || record.attrName == '编码' || record.attrName == '描述'){
        editable = false;
      }else{
        editable = record.editable;
      }
    }
    return (
        <EditableCell
        editable={editable}
        value={ record[column]}
        value={ text }
        onChange={value => this.handleSpecialChange( record.key,value, column)}
      />  
      
    );
  

  }
  
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange( record.key, value,column)}
      />
    );
  }
//渲染数据类型
  renderSelectableCol(text, record,column) { 
   return (
   <SelectableCell
    editable = {record.editable}
    value= {record.attrDataType_name} 
    onChange={value => this.handleSelectChange(value, record, column)}
  />
);
  }

//数据类型下拉选项
  handleSelectChange(value,record,column){
    const {getDataType} = this.props;
    let selectedItem;
    if(value === 'rel' || value === 'code' || value === 'enum'){
      getDataType(value);
      selectedItem = options2.filter(a=>a.value==value)[0]
      
    }else{
      selectedItem = options1.filter(a=>a.value==value)[0]
    }
     this.setState({
      attrDataType:value,
      data_type_name:selectedItem.text
    }); 

       this.handleChange( record.key, value,column);
       selectedItem && this.handleChange(record.key, selectedItem.text, 'attrDataType_name')
  }



//渲染引用对象
  renderSelectRefer( record,column){
    const {relObj, enumObj, codeObj } = this.props;
    switch(record.attrDataType){
      case 'rel': 
        return ( //引用对象
          <div>
            {
              record.editable
              ?
              <Select  style={{width:'100%'}}
              type = {column}    
              value={record.rel_name}  
              onChange={(value,e) => this.handleReferChange(value,record,column,e)}>
                {relObj && relObj.map((d,i)=><Option key={d.entityCode || i}>{d.entityName || '-'}</Option>) }
              </Select> 
              : record.rel_name
            }
          </div>
          
        );
      case 'enum':
          return (
            <div>
            {
              record.editable
              ?
              <Select  style={{width:'100%'}}
              type = {column}    
              value={record.rel_name}  
              onChange={(value,e) => this.handleReferChange(value,record,column,e)}>
                {enumObj && enumObj.map((d,i)=><Option key={d.value || i}>{d.type || '-'}</Option>) }
              </Select> 
              : record.rel_name
            }
            </div>
          );

        case 'code':
          return (
            <div>
            {
              record.editable
              ?
              <Select  style={{width:'100%'}}
              type = {column}    
              value={record.rel_name}  
              onChange={(value) => this.handleReferChange(value,record,column)}>
                { codeObj && codeObj.map((d,i)=><Option key={d.id || i}>{d.ruleName || '-'}</Option>) }
              </Select> 
              : record.rel_name
            }
            </div>
          );

        default:
        return <span>无</span>;
      }
  }


//选择引用对象
  handleReferChange(e,record,column){
    let key = record.key;
    const {relObj, enumObj, codeObj } = this.props;
    //筛选出选项
    let checkedItem ;
    switch(this.state.attrDataType){
      case 'enum': 
        checkedItem = enumObj.filter(a=>a.value == e)[0];
        this.handleChange(record.key,enumObj,column);
        checkedItem && this.handleChange(key,checkedItem.type,'rel_name');
        break;
      case 'rel':
        checkedItem = relObj.filter(a=>a.entityCode == e )[0];
        this.handleChange(record.key,relObj,column);
        checkedItem && this.handleChange(key, checkedItem.entityAttrId, 'rel_name');
        break;
      case 'code':
        checkedItem = codeObj.filter(a=>a.id == e)[0];
        this.handleChange(record.key,codeObj,column);
        checkedItem && this.handleChange(key, checkedItem.ruleName, 'rel_name');
        break;
    }
    this.setState({
      selectReferObj: checkedItem
    });
    this.handleChange(record.key,checkedItem,'selectReferObj');
    
  }

  handleSpecialChange(key, value, column){
    if(this.hasRepeat(key,value,column)){
      message.warn(`属性名称重复`);
    return
  }
  const newData = [...this.state.data];
  const target = newData.filter(item => key === item.key)[0];
 
  if (target) {
    target[column] = value;
    this.setState({ data: newData },()=>{
      
    });
  }

  }


  hasRepeat(key,value,column){
    let r = false;
    if( column== 'attrName' || column == 'attrCode'){
      this.state.data.forEach((v,i)=>{
        if(key !== v.key){
            value === v[column] && (r = true);
        }
      })
    }  
    return r;
   }


  handleChange( key, value, column) {
    
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
   
    if (target) {
      target[column] = value;
      this.setState({ data: newData },()=>{
        
      });
    }
  }

    edit(key) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.setState({ data: newData },()=>{  
        });
      }
    }

    

    save(key,record) {
      //如果属性名称和编码没有填写则认为此属性是无效的
      if(!record.attrName.trim()){
        message.warn('请先填写属性名称');
        return 
      }
       
     

      const {editEntityModelAttr ,entityModalAttr } = this.props;
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = false;
        this.setState({ data: newData });
        this.cacheData = newData.map(item => ({ ...item }));
        editEntityModelAttr(newData);
      }

    }
    

    cancel(key) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
        delete target.editable;
        this.setState({ data: newData });
      }
    }
    delEle(key){
      const {editEntityModelAttr ,entityModalAttr } = this.props;
      let newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
          newData = this.cacheData.filter(item => key !== item.key);
          this.setState({ data: newData });
          editEntityModelAttr(newData);
      }
    }
    getClassName(record){
      if(record.attrName === '名称'|| record.attrName === '编码' || record.attrName === '描述'){
        return {
          display:'none'
        }
      }
      return {
        display:'inline-block',
        color:"#2CA2FF"
      }
    }
 

  componentWillReceiveProps(nextProps,nextState){   
    
  }

  newAttri = ()=>{
    const {modelData,editModal,editEntityModelAttr,entityModalAttr} = this.props;
  
  let v = entityModalAttr.length>0 ? entityModalAttr : [];
  let _v = Array.from( new Set(v));
  _v.push({
  key: `${_v.length + 1}`,
  attrName: '',
  attrCode: '',
  attrDataType: 'int',
  attrDataType_name:'整型',
  relObject:'',
  relObject_name:'',
  attrLength:20,
  checkRule:'-',
  isRequired:false,
  isUnique:false,
  editable:true
});
this.setState({
  data:_v
},()=>{
  
});
 
}

  render (){ 
    
    let d = [...this.state.data];

    return(
      <div style={{background:'#fff'}}>
        <HorizontalAddForm ref="HorizontalAddForm" {...this.props} />   
        <p style={{textAlign:'left',padding:'20px',background:'#f2f7fa'}} ><Button type="primary"  onClick={this.newAttri}>新建属性</Button></p>
        <TableData  dataSource={d} columns={this.columns} rowKey="key" /> 
      </div>
    )
  }
}




/**
 *   rel: {
            "data": [
              {
                "entityAttrCode": "id",
                "entityAttrId": 1,
                "entityCode": 1,
                "entityName": "原材料"
              }
            ],
            "message": "string",
            "success": true
          }


    code: {
            {
            "success": true,
            "message": "执行成功~~",
            "data": [
              {
                "id": 1,
                "ruleName": "规则1"
              }
            ]
          }
    }
    enum: {
            {
            "data": [
              {
                "name": "名族",
                "type": "enum",
                "value": "nationality"
              }
            ],
            "message": "string",
            "success": true
          }

    }

*/