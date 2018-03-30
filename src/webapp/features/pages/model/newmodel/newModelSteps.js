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
    };
  }
  next() {
    const current = this.state.current + 1;
    const {modalData } = this.props;

    if(current == 0){
      /* if(!modalData.entityCode){
        message.console.warn('请先填写实体模型编码');
        return
      } */
      this.saveAllData();

    }else if(current == 1){
      this.postData();
    }
    this.setState({ current });
  }
  //保存新建数据 进行下一步
  saveAllData(){
    const {editEntityModelAttr ,entityModalAttr,modalData,alldata, } = this.props;
    //组合表单和表格字段
    let adata = {...modalData,entityAttrParam:[...entityModalAttr]}
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
 

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  render() {
    const { current } = this.state;
    let hint = current == 0?'下一步':'确认新建';
    let disable = true;
    const{modalData} = this.props;
    //若没填编码就阻止添加属性
    if(modalData && modalData.entityAttrCode){
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
            <Button type="primary" onClick={() => this.next()} disabled={this.props.modalData }>{hint}</Button>
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