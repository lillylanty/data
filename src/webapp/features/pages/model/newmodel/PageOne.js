import React, { Component, PropTypes } from 'react';

import {  Icon, Input, Button } from 'antd';
import HorizontalAddForm from '../../../../../common/HorizontalAddForm';
import TableData from '../../../../../common/TableData';



export default class PageOne extends Component{
  constructor(props) {
    super(props);
    
    this.state = {
      columns : [
        {
        title: '属性名称',
        dataIndex: 'attr_name',
        key: 'attr_name',
      },
       {
        title: '编码',
        dataIndex: 'attr_code',
        key: 'attr_code',
         render:(text,record) =>{
          console.log(record)
            return (
            <div>
              <Input />
            </div>
            )} 
      }, 
      {
        title: '数据类型',
        dataIndex: 'data_type',
        key: 'data_type',
      },
       {
        title: '引用对象',
        dataIndex: 'refer_obj',
        key: 'refer_obj',
      },
      {
        title: '长度',
        dataIndex: 'attr_length',
        key:'attr_length'
      },
      {
        title: '校验规则',
        dataIndex: 'valid_rule',
        key:'valid_rule'
      },
      {
        title: '是否必填',
        dataIndex: 'is_require',
        key:'is_require'
      },
      {
        title: '是否唯一',
        dataIndex: 'is_only',
        key:'is_only'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        key:'operation',
         render:(text,record) =>{
          console.log(record)
            return (
            <div>
              <span style={{color:"#2CA2FF"}} >
                编辑
              </span>
              <span style={{margin:'0 15px'}}>|</span>
              <span style={{color:"#2CA2FF"}}  > 
                删除
              </span>
            </div>
            )}  
    }
      ],
      sourceData: [{
        key:'1',
        attr_name: '名称',
        attr_code: 'name',
        data_type: '',
        refer_obj:'无',
        attr_length:20,
        valid_rule:'/[a-zA-Z0-9]/',
        is_require:false,
        is_only:false
      }, {
        key: '2',
        attr_name: '编码',
        attr_code: 'code',
        data_type: '',
        refer_obj:'无',
        attr_length:20,
        valid_rule:'/[a-zA-Z0-9]/',
        is_require:false,
        is_only:false
      }, {
        key: '3',
        attr_name: '描述',
        attr_code: 'desc',
        data_type: '',
        refer_obj:'无',
        attr_length:20,
        valid_rule:'/[a-zA-Z0-9]/',
        is_require:false,
        is_only:false
      }],
      display:false,
      attr : [
        {
          attr_name:'名称',
          attr_code:'name',
  
        },
        {
          attr_name:'编码',
          attr_code:'code',
          
        },
        {
          attr_name:'描述',
          attr_code:'desc',
          
        }
    ]
    };
  }
  componentDidMount(){
   let column = [
      {
      title: '属性名称',
      dataIndex: 'attr_name',
      key: 'attr_name',
    },
     {
      title: '编码',
      dataIndex: 'attr_code',
      key: 'attr_code',
       render:(text,record) =>{
        console.log(record)
          return (
          <div>
            <Input />
          </div>
          )} 
    }, 
    {
      title: '数据类型',
      dataIndex: 'data_type',
      key: 'data_type',
    },
     {
      title: '引用对象',
      dataIndex: 'refer_obj',
      key: 'refer_obj',
    },
    {
      title: '长度',
      dataIndex: 'attr_length',
      key:'attr_length'
    },
    {
      title: '校验规则',
      dataIndex: 'valid_rule',
      key:'valid_rule'
    },
    {
      title: '是否必填',
      dataIndex: 'is_require',
      key:'is_require'
    },
    {
      title: '是否唯一',
      dataIndex: 'is_only',
      key:'is_only'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key:'operation',
       render:(text,record) =>{
        console.log(record)
          return (
          <div>
            <span style={{color:"#2CA2FF"}} >
              编辑
            </span>
            <span style={{margin:'0 15px'}}>|</span>
            <span style={{color:"#2CA2FF"}}  > 
              删除
            </span>
          </div>
          )}  
  }
    ];
    // onChange={this.edit.bind(this,record)} 
//onClick={deleteElement.bind(this,record)}

let data = [{
  key:'1',
  attr_name: '名称',
  attr_code: 'name',
  data_type: '',
  refer_obj:'无',
  attr_length:20,
  valid_rule:'/[a-zA-Z0-9]/',
  is_require:false,
  is_only:false
}, {
  key: '2',
  attr_name: '编码',
  attr_code: 'code',
  data_type: '',
  refer_obj:'无',
  attr_length:20,
  valid_rule:'/[a-zA-Z0-9]/',
  is_require:false,
  is_only:false
}, {
  key: '3',
  attr_name: '描述',
  attr_code: 'desc',
  data_type: '',
  refer_obj:'无',
  attr_length:20,
  valid_rule:'/[a-zA-Z0-9]/',
  is_require:false,
  is_only:false
}];
    this.setState({
      column: column,
      sourceData:data
    });

    
  
  }

   deleteElement = (r)=>{
    // console.log(r)
  }
   edit = (r)=>{
    // console.log(r)
  }

 

  componentWillReceiveProps(nextProps,nextState){
    console.log(nextProps,nextState);
    const { displayTable } = this.props;
    this.setState({
      display:nextProps.displayTable
    })
  }

  render (){
    console.log(this.state)
    let dis = this.state.display;
    

    return(
      <div>
        <HorizontalAddForm {...this.props} />
        {
          dis? <TableData {...this.state} /> : null
        }
        
      </div>
    )
  }
}