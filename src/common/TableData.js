import React from 'react';
import { Table } from 'antd';

export default class TableData extends React.Component{
    constructor(props){
        super(props);
        this.state={
          
        };
      

    }

    ComponentDidMount(){
       
    }
    //执行传过来的筛选、排序等功能
    doParentChange = ()=>{
      const {onchange} = this.props;
      if(!onchange){return } 
      onchange();
    }

    
  

    render(){
        let {dataSource =[], columns = [],pages=20} = this.props;  
        
         return  <Table dataSource={dataSource} columns={columns}   /> //onchange={this.doParentChange}
    }
}