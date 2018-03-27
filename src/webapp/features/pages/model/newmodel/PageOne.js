import React, { Component, PropTypes } from 'react';

import {  Icon, Input, Button,Popconfirm,Select, Spin ,Checkbox  } from 'antd';
import HorizontalAddForm from '../../../../../common/HorizontalAddForm';
import TableData from '../../../../../common/TableData';
import debounce from 'lodash/debounce';
const { Option, OptGroup } = Select;

let options2 =[
  {
  text:'实体引用',
  value:'entity_refer'
  },
  {
    text:'编码规则',
    value:'encode_rule'
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
    value:'float'
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
    value:'blob'
  }
];

const EditableCell = ({ editable, value, onChange,column }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value,column)} />
      : value
    }
  </div>
);

const SelectableCell = ({ value,onChange,column }) => {
  return (
    <div>
        <Select style={{ width: '100%' }} value={value} onChange={(e,value) =>onChange(e,value,column)} >
          <OptGroup label="基本类型">
              {options1.length>0 && options1.map(d => <Option key={d.value}>{d.text}</Option>)}
          </OptGroup>
          <OptGroup label='复杂数据类型'>
              {options2.length>0 && options2.map(d => <Option key={d.value}>{d.text}</Option>)} 
          </OptGroup>
        </Select>
    </div> 
)
};



export default class PageOne extends Component{
  constructor(props) {
    super(props);
    // this.fetchOption = debounce(this.fetchOption, 800);
    const {relObj, data} = props;
    this.state = {
      display:false, //表格显示
      selectValue: 'int', //数据类型
      refer_obj: [],
      selectReferObj:'',//引用对象 选中项
      fetching: false,
      tempData:{}, // 更改record列保存的临时table的一条record {"2":{data[0]}}

      data: data,
      
      
    };
    this.columns = [
      {
      title: '属性名称',
      dataIndex: 'attr_name',
      render: (text, record) => this.renderColumns(text, record, 'attr_name'),
    },
     {
      title: '编码',
      dataIndex: 'attr_code',
      render: (text, record) => this.renderColumns(text, record, 'attr_code'),
    }, 
    {
      title: '数据类型',
      dataIndex: 'data_type',
      render: (text, record) => this.renderSelectableCol(text, record, 'data_type'),
    },
     {
      title: '引用对象',
      dataIndex: 'refer_obj',
      render: (text, record) => this.renderSelectRefer(text, record, 'refer_obj'),
    },
    {
      title: '长度',
      dataIndex: 'attr_length',
      render: (text, record) => this.renderColumns(text, record, 'attr_length'),
    },
    {
      title: '校验规则',
      dataIndex: 'valid_rule',
      render: (text, record) => this.renderColumns(text, record, 'valid_rule'),
    },
    {
      title: '是否必填',
      dataIndex: 'is_require',
      render: (text, record) => this.renderCheckbox(text, record, 'is_require'),
    },
    {
      title: '是否唯一',
      dataIndex: 'is_only',
      render: (text, record) => this.renderCheckbox(text, record, 'is_only'),
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key:'operation',
      render:(text,record) =>{
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.key)} style={{color:"#2CA2FF"}}>保存</a>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                : <span>
                    <a onClick={() => this.edit(record.key)}>编辑</a>
                      <strong style={{margin:'0 15px'}}>|</strong>
                    <a onClick={() => this.delEle(record.key)} style={{color:"#2CA2FF"}} >删除</a>
                  </span> 
            }
          </div>
        );
      }   
    }
    ];


    this.cacheData; 

  }

  renderCheckbox(text, record, column){
    return <Checkbox onChange={(e) => this.onCheckChange(e,record,column)}></Checkbox>
  }

  onCheckChange(e,record,column){
    this.saveTempRecord(record.key,e.target.checked,column)
  }
  
  renderColumns(text, record, column) {
    let editable = true;
    switch(record.key){
      case '1': case '2': case '3':
        if(column === record.attr_name || column === record.attr_code){
          editable = false;
        }
       break;
       default: 
        editable = true;
    }
    return (
      <EditableCell
        editable={editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }

  renderSelectableCol(text, record,column) { 
    //selectValue  int 数据类型
      return (
        <SelectableCell
          value={this.state.selectValue} 
          onChange={value => this.handleSelectChange(value, record,column)}
        />
      ); 
  }


//渲染引用对象
  renderSelectRefer(text, record,column){
    switch(this.state.data_type){
      case 'entity_refer': case 'encode_rule': case 'enum':
        const {relObj } = this.props;
          
        let _v = relObj.length>0 ?relObj : [{value:'',type:''}];
        
        return ( //引用对象
          <Select  style={{width:'100%'}}
          type = {column}    
          value={this.state.selectReferObj.type}  
          onChange={(value,e) => this.handleReferChange(value,record,column)}>
            { _v.map((d,i)=><Option key={d.value || i}>{d.type || '-'}</Option>) }
          </Select> 
        );
        default:
        return <span>无</span>;
      }
  }


//选择引用对象
  handleReferChange(value,record,column){
    const {relObj } = this.props;
    let selected = relObj.filter(v => v.value === value);
    //筛选出选项
    this.setState({
      selectReferObj: selected[0]
    });
    this.saveTempRecord(record.key,value,column);
  }

  //数据类型下拉选项
  handleSelectChange(value,record){
    this.setState({
      selectValue:value,
      data_type:value
    });
    const {relObj, getDataType} = this.props;
    switch(value){
     case 'entity_refer': case 'encode_rule': case 'enum': case '实体引用': case '编码规则': case '枚举':
       getDataType({type:value});
       this.setState({
         refer_obj:relObj
       });
       break;
        
    }
     //结束选择后更改record保存到temp中
     this.saveTempRecord(record.key,'data_type', value)

  }

  saveTempRecord(key,column,value){
    /* if(!key || !value) {return}
     let newdata = this.state.data.slice(0),obj = {};
     newdata.map(d=>{
       if(d.key === key ){
         d[attr] = value;
       }
     });
     obj[key] = newdata
     this.setState({
       tempData: obj
     }) */
     this.handleChange(value,key,column)

  }



  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }

    edit(key) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        target.editable = true;
        this.setState({ data: newData });
      }
    }
    save(key) {
      const newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
        delete target.editable;
        this.setState({ data: newData });
        this.cacheData = newData.map(item => ({ ...item }));
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
      let newData = [...this.state.data];
      const target = newData.filter(item => key === item.key)[0];
      if (target) {
          newData = this.cacheData.filter(item => key !== item.key);
          this.setState({ data: newData });
      }
    }
 

  componentWillReceiveProps(nextProps,nextState){   
    
  }

  render (){ 

    return(
      <div>
        <HorizontalAddForm {...this.props} />        
        <TableData  dataSource={this.state.data} columns={this.columns} /> 
      </div>
    )
  }
}