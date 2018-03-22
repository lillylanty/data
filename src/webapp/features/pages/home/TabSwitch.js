import React from 'react';
import {Tabs, Popover, } from 'antd';
import TableData from '../../../../common/TableData';

const TabPane = Tabs.TabPane;
let filteredInfo = {};
const columns = [{
    title: '实体',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
 /*    filters:[
        {text:'已冻结',value:'freezed'},
        {text:'正常',value:'normal'},
        {text:'审批中',value:'judging'},
        {text:'已拒绝',value:'rejected'},
    ],
    filteredValue: filteredInfo.name || null,
    onFilter: (value,record) => record.status.includes( value), */
  }, {
    title: '编码',
    dataIndex: 'encode',
    key: 'encode',
  }, {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
  }, {
    title: '最新审批时间',
    dataIndex: 'latesttime',
    key: 'latesttime',
  },
  {
    title: '发起审批时间',
    dataIndex: 'starttime',
    key: 'starttime',
  },
  {
    title: '操作',
    key: 'action',
    /* render: (text, record) => {
        let content = null;
            content = record.detail && Array.isArray(record.detail) && (record.detail.map((v,i)=>{
            <p key={v+ '_'}>{v}</p>
        }));
        
      return (<Popover content={<div>{content}</div>} >
        <span style={{color:"#2CA2FF"}} >
             查看详情
        </span>
      </Popover>)
    }, */
  }
];

export default class TabSwitch extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            filteredInfo:null,
            columns:columns,
            dataSource1:tableData,
            dataSource2:[],
            dataSource3:[],
            pagination:{},
        }
       
    }
 /**  
handleTableChange = (pagination, filters, sorter)=>{
    console.log('params', pagination, filters, sorter);
    const pages = {...this.state.pagenation};
    
    pages.current = pagination.current;
    this.setState({
      pagenation:pages,
    });
    this.props.setPager({
        page:pagination.current,
        pageSize:pagination.pageSize
    })

    this.props.getTableData({
        type:'myInitiate',
        page:pagination.current,
        ...filters,
    });
    pagination.total = this.props.pager.total;
    pagination.current = this.props.pager.page;

}*/

    ComponentDidMount(){
        /* const {tableData,getTableData } = this.props;
        getTableData({page:10});
        
       this.setState({
           dataSource1:tableData,
       })  */
       
    }
    componentDidUpdate() {
        
    }
   /*  judgeNow=(v)=>{
        console.log(v)
    } */

 
    changeTab =(activeKey)=>{
        const {getFilterData,filterData,pager,tableData,getTableData,setPager} = this.props;
        
        if(activeKey == '2'){
            getFilterData({type:'awaitJudge'});
            this.updateColumns(activeKey);
            this.setState({
                dataSource2:filterData
            })
        }else if(activeKey == '3'){
            getFilterData({type:'judged'});
            this.updateColumns(activeKey);
            this.setState({
                dataSource3:filterData
            })
        }else {
            getTableData({page:10});
            this.setState({
                dataSource1:tableData,
                columns:columns
            })
        }
        console.log(this.state)
        
    }

    updateColumns = (key)=>{
        let copyColumns = columns.slice(0);
        if(key == '2'){
            copyColumns.splice(1,1,{title:"发起人",dataIndex:"starter",key:"starter"});
             /**copyColumns[length-1] = 
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span style={{color:"#2CA2FF"}} > 立即审批{record.name}</span>  //onClick={this.judgeNow.bind(this,record)}
                    ),
                  }*/
        }else if(key == '3'){
            copyColumns.splice(1,2,{title:"发起人",dataIndex:"starter",key:"starter"},{title:"审批结果",dataIndex:"judgeResult",key:"judgeResult"})
           /** copyColumns[length-1] = 
                {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => {
                        let content = null;
                            content = record.detail && Array.isArray(record.detail) && (record.detail.map((v,i)=>{
                            <p key={v+ '_'}>{v}</p>
                        }));
                        
                      return (<Popover content={<div>{content}</div>} >
                        <span style={{color:"#2CA2FF"}} >
                             查看详情
                        </span>
                      </Popover>)
                    },
                  }
                  */
        }else {
            copyColumns = columns.slice(0);
    };
        this.setState({
            columns:copyColumns
        })
    }

    

render(){
   /*  const {tableData,getTableData } = this.props;
        getTableData({page:10}); */
    return(
    <div>
            <h1>的国家福利国家发的是高级饭店旅馆</h1>
         </div>)
    /* return (
      <Tabs defaultActiveKey="1" onChange={this.changeTab}>
        <TabPane tab="Tab 1" key="1">
            <TableData dataSource = {this.state.dataSource1} columns={this.state.columns} />
        </TabPane> 
        <TabPane tab="Tab 2" key="2">
            <TableData dataSource = {this.state.dataSource2} columns={this.state.columns}/>
        </TabPane>
        <TabPane tab="Tab 3" key="3">
            <TableData dataSource = {this.state.dataSource3} columns={this.state.columns}/>
        </TabPane>
      </Tabs>
      ) */
  } 
}
