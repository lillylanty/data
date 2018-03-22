import React from 'react';
/* var echarts = require('echarts/lib/echarts')
 require('echarts/lib/chart/pie')
 require('echarts/lib/component/tooltip')
 require('echarts/lib/component/title')
 */
export default class PieChart extends React.Component{
    constructor(props){
        super(props);
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
    }

    ComponentDidMount(){
        // this.init();   
    }
    componentDidUpdate() {
    //   this.init();
    }

    init=()=>{
        let {option} = this.props;
        if(!option){
            option = this.option;
        }
        var myChart = echarts.init(this.refs.mypie);
        myChart.setOption(option);

        /* const{handleEvent} = this.props;//传入的事件
        if(!handleEvent || handleEvent == null){  return }
        for(let key in handleEvent ){
           if(key && handleEvent[key] instanceof Function && handleEvent.hasOwnProperty(key)){ 
              myChart.on(`${key}`,(params)=>{
                   handleEvent[key](params,myChart);     
              })
            }
        } */
        
        window.addEventListener('resize' , function() {
            myChart.resize();
        }) 
    }



render(){
    const {width="100%",height="200px"} = this.props.style
    return ( <div ref="mypie" style={{width,height}}>饼图</div> )
}   
}
