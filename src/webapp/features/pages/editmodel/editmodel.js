import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { newModelManageAction } from '../../actions/newModelManageAction';
import { ModelManageAction } from '../../actions/modelManageAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';

import NewModelSteps from './newModelSteps'
import { Modal, Button } from 'antd';

import './newmodel.css'

const mapState = state => ({
  entityModelAttr: state.newModel.entityModelAttr, //属性表格
  modelData: state.newModel.modelData, //表单
  entity: state.newModel.entity, //
  category: state.newModel.category, //类目
  uploadResult: state.newModel.uploadResult, //上传结果
  //主页的
  recordAttr: state.model.recordAttr, 
});
const mapDispatch = dispatch => ({

  //主页的
  getRecordAttr:(params) =>dispatch(ModelManageAction.getRecordAttr(params)),
});

@connect(mapState, mapDispatch)
export default class EditModal extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      modelForm:{}
    }
  }
  componentDidMount() {
    var data = this.props.location.query;
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.modelData, this.props.modelData);
    this.setState({
      modelForm:{...this.state.modelForm,...nextProps.modelData}
    })
    //redux中的modelData变化后强制使子组件能更新
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div className="content">
        <div className="wrapper">
          <div className="title">
            <p style={{float:'left',width:'80%'}}>新建模型页</p>
            <Button style={{float:'left'}} onClick={this.backToModel}>返回实体模型管理</Button>
          </div>
      <div>
        
      </div>
        </div>
      </div>
    )
  }
}

 //,marginRight:'20%'
