import React, { Component, PropTypes } from 'react';

import {  Icon, Input, Button,Popconfirm,Select, Spin ,Checkbox ,message } from 'antd';
import HorizontalAddForm from '../../../../../common/HorizontalAddForm';
import TableData from '../../../../../common/TableData';


const { Option, OptGroup } = Select;

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

export default class PageOne extends Component{
  constructor(props) {
    super(props);
    const { data, entityModelAttr} = props;
   
    this.state = {
      alldata:null,
      modelData:{},
      relObject: [],
      data_type_name:'',
      rel_name:'',
      selectReferObj:'',//引用对象 选中项
      data: entityModelAttr.length>0 ? entityModelAttr : [],     
    };
   
    this.cacheData; 
    this.copytableData = data.slice(0);

  }
 
    saveAllData(){
      const {editEntityModelAttr ,entityModelAttr,modelData,alldata, editModal} = this.props;
  
      let adata = { ...modelData,entityAttrParam:[...entityModelAttr]};
      
      
      this.setState({
        alldata:adata
      })
      
      
    }
  postData(){
    const {saveEntity} = this.props;
    saveEntity(this.state.alldata);
  }
  

  componentWillReceiveProps(nextProps,nextState){   
    
  }

  newAttri = ()=>{
    const {modelData,editModal,editEntityModelAttr,entityModelAttr,data,setcanNext} = this.props;
    //获取实体模型数据
    let formdata = this.refs.HorizontalAddForm.getFieldsValue();
        editModal(formdata);
        
      //table添加一行供编辑 
      
      let _v = entityModelAttr || [];
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

  componentWillReceiveProps(nextProps,nextState){
    //同步更新state中的modelData等属性
    
  }

  render (){ 
    
    let d = [...this.state.data];

    return(
      <div>
        <HorizontalAddForm ref="HorizontalAddForm" {...this.props} />   
        <Button type="primary" onClick={this.newAttri}>新建属性</Button>
        <TableData  dataSource={d} columns={this.columns} rowKey="key" /> 
      </div>
    )
  }
}