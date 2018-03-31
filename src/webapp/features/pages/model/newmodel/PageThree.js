import React, { Component, PropTypes } from 'react';
import { Button,  Icon } from 'antd';

let counter = 5;
class PageThree extends Component{
  constructor(props){
    super(props);
    this.state = {
      counter:5
    }
  }
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    let {counter} = this.state
    this.setState({
      counter: counter-1
    });
    if(counter == 0){
      this.backToModel();
    }
  }
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
 
  
  backToModel = ()=>{
    this.props.router.replace('/model');
  }
  render(){
    const {uploadResult} = this.props;
    var style={
      fontSize: '26px'
    };
    
    
    return (
      <div>
       <p>
         {
           uploadResult?  <Icon type="smile-o"/> : <Icon type="frown-o" />
         }
        </p>
       <h1>{uploadResult?'上传成功':'上传失败' }</h1>
       <p>{this.state.counter}秒后自动返回</p>
       <p>
         {/* <Button type="primary" onClick={()=>{this.setState({current:0})}}>继续创建</Button> */}
         <Button onClick={this.backToModel}>返回建模管理主页</Button>
       </p>
      </div>
    )
  }

}
export default PageThree;