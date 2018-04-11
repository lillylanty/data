import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Button, Checkbox,Select } from 'antd';
import { systemmanageAction } from '../../../actions/systemmanageAction';

const mapState = state => ({
  roles: state.usermanage.roles, 
});
const mapDispatch = dispatch => ({
  getUserRoleList:(p)=> dispatch(systemmanageAction.getUserRoleList(p)),
});

@connect(mapState, mapDispatch)

export default class NewUserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    var plainOptions = [];
  }


  componentWillMount(){
  	const {getUserRoleList} = this.props;
  	const {data} = this.props.location.state;
  	if(data){
  		getUserRoleList({userId:data.userId});
  		plainOptions = this.props.roles

  	}

  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    
  }
  render() {
  	console.log(this.props)
    return (
      <div className="content">
      <p className="operation-area">
      	<Button type="primary" size="large" style={{float:'right',marginRight:'10%'}} onClick={this.addCategory}> 新增用户 </Button >
      	<Checkbox options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
      </p>
      </div>
    )
  }
}