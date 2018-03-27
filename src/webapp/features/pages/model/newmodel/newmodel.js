import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

import { newModelManageAction } from '../../../actions/newModelManageAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';

import NewModelSteps from './newModelSteps'
import {Button} from 'antd';

import './newmodel.css'

const mapState = state => ({
  modelData: state.newModel.modelData, //新建
  entity: state.newModel.entity, //
  displayTable: state.newModel.displayTable, //是否显示表格
  relObj: state.newModel.relObj, //引用类型
});
const mapDispatch = dispatch => ({
  getCategory:(params)=> dispatch(newModelManageAction.getCategory(params)),
  editEntityModel:(params)=> dispatch(newModelManageAction.editEntityModel(params)),
  getDataType: (params) => dispatch(newModelManageAction.getDataType(params)),
  toggleShowTable:()=> dispatch(newModelManageAction.toggleShowTable()),
});

@connect(mapState, mapDispatch)
export default class NewModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  

  render() {
    let data = [{
      key:'1',
      attr_name: '名称',
      attr_code: 'name',
      data_type: '',
      refer_obj:'无',
      attr_length:20,
      valid_rule:'/[a-zA-Z0-9]/',
      is_require:false,
      is_only:false,
      editable:true
    }, {
      key: '2',
      attr_name: '编码',
      attr_code: 'code',
      data_type: '',
      refer_obj:'无',
      attr_length:20,
      valid_rule:'/[a-zA-Z0-9]/',
      is_require:false,
      is_only:false,
      editable:false
    }, {
      key: '3',
      attr_name: '描述',
      attr_code: 'desc',
      data_type: '',
      refer_obj:'无',
      attr_length:20,
      valid_rule:'/[a-zA-Z0-9]/',
      is_require:false,
      is_only:false,
      editable:false
    }];

    return (
      <div className="content">
        <div className="wrapper">
          <div className="title">
            <p style={{float:'left',width:'80%'}}>新建模型页</p>
            <Button style={{float:'left'}}>返回实体模型管理</Button>
          </div>
            <NewModelSteps {...this.props} data={data}/>
        </div>
      </div>
    )
  }
}

 //,marginRight:'20%'
