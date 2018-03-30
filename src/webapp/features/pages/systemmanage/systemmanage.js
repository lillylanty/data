import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Row, Col } from 'antd';
import { systemmanageAction } from '../../actions/systemmanageAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import './style.scss';

const mapState = state => ({
  systemmanageData: state.systemmanage.systemmanageData,
});
const mapDispatch = dispatch => ({
  getSystemmanageData(params) {
    dispatch(systemmanage.getSystemmanageData(params));
  },
});

@connect(mapState, mapDispatch)
export default class Systemmanage extends Component {
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
       <CategoryTable />
      </div>
    )
  }
}
