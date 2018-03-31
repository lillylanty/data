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
      

    render(){
         let param = {
			rowKey:this.props.rowKey,
			bordered: this.props.bordered,
			expandedRowRender: this.props.expandedRowRender,
		    pagination: this.props.pagination,
		    rowSelection: !!this.props.rowSelection?this.props.rowSelection:undefined,
		    columns: this.props.columns,
		    dataSource: this.props.dataSource,
		    onChange: this.props.onChange?this.props.onChange:undefined,
		    onRowClick:this.props.onRowClick,
			} 
        
         return  <Table {...param} /> //onchange={this.doParentChange} //dataSource={dataSource} columns={columns}  pagination={pagination} onChange={onChange}
    }
}