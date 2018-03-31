import React, { Component, PropTypes } from 'react';
import { Steps, Button, message, Icon } from 'antd';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';

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



export default class NewModelSteps extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      alldata:null,
      modelData:{},
      
    };
  }
  next() {
    const current = this.state.current + 1;
    const {modelData } = this.props;

    if(current == 0){
      
      this.saveAllData();

    }else if(current == 1){
      this.postData();
    }
    this.setState({ current });
  }
  //保存新建数据 进行下一步
  saveAllData(){
    const {editEntityModelAttr ,entityModelAttr,modelData,alldata, editModal} = this.props;
    //组合表单和表格字段
    // let entityCode;
    // entityCode = modelData.code || ''; //因为用form组件时，填写entityCode作为属性，会报错，改成code
    // let newData = Object.assign({},modelData,{entityCode:entityCode});
    let adata = { ...modelData,entityAttrParam:[...entityModelAttr]};
    // 组合上传字段
    
    this.setState({
      alldata:adata
    })
    console.log(this.state.alldata)
    //成功后供第二页调用展示
    
  }
postData(){
  const {saveEntity} = this.props;
  saveEntity(this.state.alldata);
}

componentWillReceiveProps(nextProps,nextState){
  console.log('willReceive',nextProps.modelForm);
  this.setState({
    modelData:nextProps.modelForm,
  })
}
// componentWillUpdate(nextProps,nextState){
//   console.log('willUpdata',nextProps.modelForm);
// }
 

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    // const { entityModelAttr,editEntityModelAttr } = this.props;
    // editEntityModelAttr([...entityModelAttr])
    
    const {current} =this.state;
    let hint = current == 0?'下一步':'确认新建';
    let disable = true;
    if(this.state.modelData && this.state.modelData.entityCode){
      disable = false;
    }
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
            <Button type="primary" onClick={() => this.next()} disabled={disable }>{hint}</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" onClick={() => message.success('Processing complete!')}>完成</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          }
        </div>
      </div>
    );
  }
}