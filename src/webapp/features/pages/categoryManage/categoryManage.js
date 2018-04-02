import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { categoryManageAction } from '../../actions/categoryManageAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import {CategoryTable} from './CategoryTable'
import './style.scss';

const mapState = state => ({
  categoryManageData: state.categoryManage.categoryManageData,
});
const mapDispatch = dispatch => ({
  getCategoryManageData(params) {
    dispatch(categoryManage.getCategoryManageData(params));
  },
});

@connect(mapState, mapDispatch)
export default class CategoryManage extends Component {
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
        <CategoryTable {...this.props}/>
      </div>
    )
  }
}
