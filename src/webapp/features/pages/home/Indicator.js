import React from 'react';
import { Row, Col } from 'antd';
import PieChart from '../../../../common/PieChart';
var echarts = require('echarts/lib/echarts')
 require('echarts/lib/chart/pie')
 require('echarts/lib/component/tooltip')
 require('echarts/lib/component/title')

export default class Top extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
        this.option = {
            color:['#2CA2FF','#26CECA','#28CF73','#FED332','#A35AE1'], //'#FED332','#FF3754',
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                y:'middle',
                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
            },
            series: [
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:335, name:'直接访问'},
                        {value:310, name:'邮件营销'},
                        {value:234, name:'联盟广告'},
                        {value:135, name:'视频广告'},
                        {value:1548, name:'搜索引擎'}
                    ]
                }
            ]
        };
      this.state = {
          model_counts:0,
          data_counts:0,
      }
    }
    componentWillMount(){
        const {tableData,getTableData} = this.props;
        getTableData();
        console.log(tableData,getTableData);
        
        
        this.setState({
            model_counts:tableData.filter(v=>v.name == 'model').length,
            data_counts: tableData.filter(v=>v.name == 'data').length
        })
    }
    ComponentDidMount(){
        
    }
    componentDidUpdate() {
        
    }

    test=()=>{
        const{tableData,pager,getTableData} = this.props;
        getTableData(80);
        console.log(tableData,pager)
    }
render(){
    

    return (
          <Row>
            <Col span={6}>
                <h1>实体模型总数</h1>
                <h1>{12}</h1>
            </Col>
            <Col span={4}>
                <h1>主数据数量 </h1>
                <h1>{928}</h1>
            </Col>
             <Col span={8}>
                <PieChart option={this.option} style={{width:'300px',height:'200px'}}/>
            </Col>
            <Col>
                <button onClick={this.test}>test</button>
            </Col>
          </Row>
      )
  } 
}
