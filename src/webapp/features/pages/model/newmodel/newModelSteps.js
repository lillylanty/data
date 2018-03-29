import React, { Component, PropTypes } from 'react';
import { Steps, Button, message, Icon } from 'antd';
import PageOne from './PageOne';
import PageTwo from './PageTwo';

import './newmodel.css'

const Step = Steps.Step;

const steps = [{
  title: 'First',
  content: 'First-content',
}, {
  title: 'Second',
  content: 'Second-content',
}, {
  title: 'Last',
  content: 'Last-content',
}];

var backToModel = ()=>{
//  window.location.href = `${window.location.origin}/#${window.location.pathname}/model`;//replace("/model")
}
const PageThree = (res)=>{
  var icon = <Icon type="frown-o" />
  var style={
    fontSize: '26px'
  };

  if(res){
    var counter = 5;
    setTimeout(()=>{
      counter--;
      if(counter = 0){
        backToModel();
      }
    },1000)
    return (
      <div>
       <p> <Icon type="smile-o"/></p>
       <h1>操作成功 </h1>
       <p>{counter}秒后自动返回</p>
       <p>
         {/* <Button type="primary" onClick={()=>{this.setState({current:0})}}>继续创建</Button> */}
         <Button onClick={()=>{backToModel()}}>返回</Button>
       </p>
      </div>
    )
  }

}

export default class NewModelSteps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      alldata:null,
    };
  }
  next() {
    const current = this.state.current + 1;
    if(current == 0){
      this.saveAllData()
    }
    this.setState({ current });
  }
  //保存新建数据 进行下一步
  saveAllData(){
    const {editEntityModelAttr ,entityModalAttr,modalData,saveEntity,alldata } = this.props;
    //组合表单和表格字段
    let adata = {...modalData,entityAttrParam:[...entityModalAttr]}
    // 组合上传字段
    saveEntity(adata);
    this.setState({
      alldata:adata
    })
    console.log(alldata)
    //成功后供第二页调用展示
    
  }

 

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <Steps current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <div className="steps-content">
          {
            this.state.current == 0 && <PageOne {...this.props}/>
          }
         {
            this.state.current == 1 && <PageTwo {...this.props}/>
          }
          {
            this.state.current == 2 && <PageThree {...this.props}/>
          }
        </div>
        <div className="steps-action">
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>Next</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          }
        </div>
      </div>
    );
  }
}