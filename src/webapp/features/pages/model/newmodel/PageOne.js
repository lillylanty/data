import React, { Component, PropTypes } from 'react';

import {  Icon, Input, Button,Popconfirm,Select, Spin ,Checkbox ,message } from 'antd';
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
    // this.fetchOption = debounce(this.fetchOption, 800);
    const {relObj, data} = props;
    this.state = {
      display:false, //表格显示
      isEditting:false, //切换编辑 和保存操作
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
      render: (text, record) => this.renderColumnsSpecial(text, record, 'attr_name'),
    },
     {
      title: '编码',
      dataIndex: 'attr_code',
      render: (text, record) => this.renderColumnsSpecial(text, record, 'attr_code'),
    }, 
    {
      title: '数据类型',
      dataIndex: 'data_type',
      render: (text, record) => this.renderSelectableCol(text, record, 'data_type'),
    },
     {
      title: '引用对象',
      dataIndex: 'refer_obj',
      render: (text, record) => this.renderSelectRefer( record, 'refer_obj'),
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
                  <a onClick={() => this.save(record.key,record)} style={{color:"#2CA2FF"}}>保存</a>
                  <strong style={{margin:'0 15px'}}>|</strong>
                  <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                    <a>取消</a>
                  </Popconfirm>
                </span>
                : <span>
                    <a onClick={() => this.edit(record.key)}>编辑</a>
                     
                    <a onClick={() => this.delEle(record.key)} style={this.getClassName(record.key)} >
                    <strong style={{margin:'0 15px'}} >|</strong>删除</a>
                  </span> 
            }
          </div>
        );
      }   
    }
    ];


    this.cacheData; 
    this.copytableData = data.slice(0);

  }
  
  renderCheckbox(text, record, column){
    return <Checkbox onChange={(e) => this.onCheckChange(e,record,column)}></Checkbox>
  }

  onCheckChange(e,record,column){
    this.handleChange(record.key,e.target.checked,column)
  }

  renderColumnsSpecial(text, record, column){
    let editable;
    switch(record.key){
      case '1': case '2': case '0':
       editable = false;
       break;
       default: 
        editable = record.editable;
    }
    return (
        <EditableCell
        editable={editable}
        value={ record[column]}
        onChange={value => this.handleChange( record.key,value, column)}
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
    //selectValue  int 数据类型
   return (
   <SelectableCell
    editable = {record.editable}
    value={record.data_type_name} 
    onChange={value => this.handleSelectChange(value, record, column)}
  />
);
  }

//数据类型下拉选项
  handleSelectChange(value,record,column){
    this.setState({
      selectValue:value,
      data_type:value
    });
    const {relObj, getDataType} = this.props;
    switch(value){
     case 'entity_refer': case 'encode_rule': case 'enum':
       getDataType({type:value});
       this.setState({
         refer_obj:relObj
       });
       this.handleChange( record.key, value,column)

       break;
        default:
          console.log(value);
          this.handleChange( record.key, value,column)
    }
     //结束选择后更改record保存到temp中  直接更改data就可以了  

  }

//渲染引用对象
  renderSelectRefer( record,column){
    switch(this.state.data_type){
      case 'entity_refer': case 'encode_rule': case 'enum':
        const {relObj } = this.props;
          
        let _v = relObj.length>0 ?relObj : [{value:'',type:''}];
        
        return ( //引用对象
          <div>
          {
            record.editable
            ?
            <Select  style={{width:'100%'}}
            type = {column}    
            value={record.refer_obj_name}  
            onChange={(value,e) => this.handleReferChange(value,record,column,e)}>
              { _v.map((d,i)=><Option key={d.value || i}>{d.type || '-'}</Option>) }
            </Select> 
            : record.refer_obj_name 
          }
          </div>
          
        );
        default:
        return <span>无</span>;
      }
  }


//选择引用对象
  handleReferChange(value,record,column,e){
    const {relObj } = this.props;
    let selected = relObj.filter(v => v.value === value);
    //筛选出选项
    this.setState({
      selectReferObj: selected[0]
    });
    this.handleChange(record.key,selected[0],column);
    this.handleChange(record.key,record.refer_obj.type,'refer_obj_name')
  }

  

/*   saveTempRecord(key,column,value){
     if(!key || !value) {return}
     let newdata = this.state.data.slice(0),obj = {};
     newdata.map(d=>{
       if(d.key === key ){
         d[column] = value;
       }
     });
     obj[key] = newdata
     this.setState({
       tempData: obj
     })
     this.handleChange(key,value,column)

  } */

hasRepeat( value, column){
  let r;
  switch (column){
    case 'attr_name': case 'attr_code':
      this.state.data.forEach((v,i)=>{
        if(v === value){ //重复的属性名或编码
            r = false;
        }
      });
      break;
      default: r = true;      
   }
   return r
}

  handleChange( key, value, column) {
    /* if(this.hasRepeat( value, column)){
      message.error(`${column} 重复`);
      return
    } */
   
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
   
    if (target) {
      target[column] = value;
      this.setState({ data: newData },()=>{
        console.log(this.state.data)
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
    // hasRepeat(key,data,column){
    //   this.state.data.filter(v=>v[column] === data)
    // }

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
    getClassName(key){
      if(key === '0'|| key === '1' || key === '2'){
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
    const {modelData,editModal,editEntityModelAttr,entityModalAttr,displayTable,data} = this.props;
    //获取实体模型数据
    let formdata = this.refs.HorizontalAddForm.getFieldsValue();
   
    /* const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    let formdata = this.props.form.getFieldsValue();
    Object.values(formdata).forEach(element => {
      if(!element){
        return 
      }
      this.setState({
        ...this.state.form,...formdata
      })
    });  */
    editModal(formdata)
  //table添加一行供编辑 
  
  let v = data.concat(entityModalAttr);
  let _v = Array.from( new Set(v));
  _v.push({
  key: `${_v.length}-${Math.floor(Math.random() * 1000 )}`,
  attr_name: '',
  attr_code: '',
  data_type: 'int',
  data_type_name:'整型',
  refer_obj:'',
  refer_obj_name:'',
  attr_length:20,
  valid_rule:'-',
  is_require:false,
  is_only:false,
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
    d.map((v,i)=>{ return v.key = `${i}-${Math.floor(Math.random() * 1000 )}`});
    
    return(
      <div>
        <HorizontalAddForm ref="HorizontalAddForm" {...this.props} />   
        <Button type="primary" onClick={this.newAttri}>新建属性</Button>
        <TableData  dataSource={d} columns={this.columns} /> 
      </div>
    )
  }
}