import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { encodeManageAction } from '../../actions/encodeManageAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss';

const mapState = state => ({
  encodeManageData: state.encodeManage.encodeManageData,
});
const mapDispatch = dispatch => ({
  getEncodeManageData(params) {
    dispatch(encodeManage.getEncodeManageData(params));
  },
});

@connect(mapState, mapDispatch)
export default class EncodeManage extends Component {
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
    return (
      <div className="content">
        恭喜，EncodeManage主页新建成功,你可以对页面DIY了.
      </div>
    )
  }
}
