import React from 'react';
import {Input, Popover,Button,Checkbox } from 'antd';
import TableData from '../../../../../common/TableData';
import { systemmanageAction } from '../../../actions/systemmanageAction';

export default class UserTable extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			dataSource: props.UserTableData || [],
			filteredInfo:null,
			columns:[{
				title: '账号',
				dataIndex: 'account'
			},  
			{
				title: '邮箱',
				dataIndex:'email'
			},
			{
				title: '手机号码',
				dataIndex:'phone'
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
						</div>
						)
				}
			}
			],

			pagination: {
				showSizeChanger:true,
				onShowSizeChange:this.onShowSizeChange,
				onChange:this.onChange,
				defaultCurrent:1,
				total:300
			},

		}  
	}
	componentWillReceiveProps(nextProps,nextState){
		this.setState({
			dataSource: nextProps.userTableData.slice(0),
			pagination: {...this.state.pagination,...nextProps.pager}
		})
	}
	onShowSizeChange=(current, pageSize)=> {
		const {setPager} = this.props;
		setPager({current:current,pageSize:pageSize})
	}

	onChange = (pageNum)=>{
		console.log('pageNum',pageNum)
	}
	editEle =(record)=>{
		this.props.router.push({pathname:'/newusermanage',state:{data:record}})  
		console.log(record);
	}

	deletEle = (record)=>{
		//this.props.handleEvent && this.props.handleEvent.deletEle(record);
		const {deleteUser} = this.props;
		deleteUser({id:record.userId});

	}
	render(){
	    const {dataSource} = this.state;
	    console.log('child',dataSource)
	    return(
	      <div className="table-style">   
	        <TableData columns={this.state.columns} rowKey="userId" dataSource={dataSource} pagination={this.state.pagination} />
	      </div>
        )
    }


}
