import React, { Component, PropTypes } from 'react';
import { Button,  Icon } from 'antd';

class PageThree extends Component{
  constructor(props){
    super(props);
  }
  

  backToModel = ()=>{
    this.props.router.replace('/model');
  }
  render(){
    const {uploadResult} = this.props;
    var style={
      fontSize: '26px'
    };
    var counter = 5;
    setTimeout(()=>{
      counter--;
      if(counter = 0){
        backToModel();
      }
    },1000);
    return (
      <div>
       <p>
         {
           uploadResult?  <Icon type="smile-o"/> : <Icon type="frown-o" />
         }
        </p>
       <h1>{uploadResult?'上传成功':'上传失败' }</h1>
       <p>{counter}秒后自动返回</p>
       <p>
         {/* <Button type="primary" onClick={()=>{this.setState({current:0})}}>继续创建</Button> */}
         <Button onClick={()=>{this.backToModel}}>返回建模管理主页</Button>
       </p>
      </div>
    )
  }

}
export default PageThree;