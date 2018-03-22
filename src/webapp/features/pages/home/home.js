import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Layout, Menu, Breadcrumb } from 'antd';
import { homeAction } from '../../actions/homeAction';

 import TabSwitch from './TabSwitch';
 import Indicator from './Indicator';

import { isEmpty } from 'lodash';
import moment from 'moment';
moment.locale('zh-cn');
import assign from 'object-assign';
import './style.scss';

const { Header, Content, Footer } = Layout;
const mapState = state => ({
  filterData: state.home.filterData,
  pager: state.home.pager,
  tableData: state.home.tableData,
  homeData: state.home.homeData,
  userData: state.home.userData,
  navData: state.home.navData,
});
const mapDispatch = dispatch => ({
  getHomeData(params) {
    dispatch(homeAction.getHomeData(params));
  },
  getUserData(params) {
    dispatch(homeAction.getUserData(params));
  },
  getNavData(params) {
    dispatch(homeAction.getNavData(params));
  },
  getFilterData: (v) => dispatch(homeAction.getFilterData(v)), //v:{type:'awaitJudge/judged'}
  getTableData: (v)=> dispatch(homeAction.getTableData(v)),
  setPager: (v) => dispatch(homeAction.setPager(v)),
});

@connect(mapState, mapDispatch)
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }
  componentDidMount() {
    this.props.getHomeData({});
  }
  componentWillReceiveProps(nextProps) {
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }

  render() {
    return (
      <Layout className="layout">
        <div style={{ height: "900px","padding":"20px"}}>
          <Indicator {...this.props} />
          {/* <TabSwitch {...this.props} />*/}  
        </div>
      </Layout>
    )
  }
}
