import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Modal, Popover,Button } from 'antd';
import { systemmanageAction } from '../../../actions/systemmanageAction';
import { isEmpty } from 'lodash';
import assign from 'object-assign';
import UserTable from './UserTable';

const mapState = state => ({
  userTableData : state.usermanage.userTableData,
  pager: state.usermanage.pager,
});
const mapDispatch = dispatch => ({
  getUserTableData:(p)=> dispatch(systemmanageAction.getUserTableData(p)),
  setPager:(p)=> dispatch(systemmanageAction.setPager(p)),
  deleteUser:(p)=> dispatch(systemmanageAction.deleteUser(p))
});

@connect(mapState, mapDispatch)
export default class Usermanage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  componentWillMount(){
    const {getUserTableData,pager} = this.props;
    getUserTableData({
      "pageNo": 0,
      "pageSize": 15
    }); 
 }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    
  }
  addUser = () => {
    this.props.router.push({pathname:'/newusermanage'});
  }
  render() {
    return (
      <div className="content">
      <p className="operation-area">
        用户管理
      	<Button type="primary" size="large" style={{float:'right'}} onClick={this.addUser}> 新增用户 </Button >
      </p>
      <UserTable {...this.props} />
      </div>
    )
  }
}