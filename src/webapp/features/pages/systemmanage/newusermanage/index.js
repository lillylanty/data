import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Checkbox,Select,Row, Col,Input,Popover} from 'antd';
import { systemmanageAction } from '../../../actions/systemmanageAction';
import './style.scss';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const mapState = state => ({
  roles: state.usermanage.roles, 
  validuser:state.usermanage.validuser
});
const mapDispatch = dispatch => ({
  getUserRoleList:(p)=> dispatch(systemmanageAction.getUserRoleList(p)),
  validUser:(p)=> dispatch(systemmanageAction.validUser(p))
});

@connect(mapState, mapDispatch)

export default class NewUserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.plainOptions = [];
  }


  componentWillMount(){
  	const {getUserRoleList,validUser} = this.props;
    if(this.props.location.state){
      const {data} = this.props.location.state;
      getUserRoleList({userId:data.userId});
      validUser({search:data.account});
    }else{
      validUser();
    }
    console.log(this.props)

  }
  componentDidMount() {
  }
  componentWillReceiveProps(nextProps) {
    
  }
  onChange = ()=>{
    console.log(123)
  }
  handleInputChange = (e) =>{
    this.setState({
      Inputvalue: e.target.value,
    },()=>{
      this.props.validUser({search:this.state.Inputvalue});
    });
  }
  SelectUser = (e) =>{
    this.setState({
      value: e.target.value,
      visible:false
    },()=>{
      console.log(this.state.value)
      this.props.getUserRoleList({userId:this.state.value});
    });
  }
  handleVisibleChange = (visible) =>{
    this.setState({ visible });
  }
  render() {
    const options = this.props.roles;
    const user = this.props.validuser;
    var option = user.map((item,i) => {
      return <li key={i} onClick={this.SelectUser} value={item.userId}>{item.username}</li>
    })   
    const content = (
        <ul className="popUl">
          {option}
        </ul>
      );
    if(options){
      var list = options.map((item,i) => {
        return <Checkbox key={i} className="ant-checkbox-inline" defaultChecked={item.checked}>{item.roleName}</Checkbox>
      });
    }
    
    return (
      <div className="content">
         <div>
            <Row type="flex" justify="center">
              <Col span = {24}>
                <p className="operation-area">
                  新增/编辑用户
                </p>
              </Col>
              <Col span = {18}>
                <Form className="newUser">
                  <FormItem label="选择用户" labelCol={{span : 6}} wrapperCol={{ span: 18 }} >
                    {/*<Select disabled={this.props.location.state?true:false} defalutValue={user[0] && user[0].username} size="large" style={{ width: 200 }} onChange={this.handleSelectChange}>
                      {option}
                    </Select>*/}
                    <Popover visible={this.state.visible} onVisibleChange={this.handleVisibleChange} content={content} trigger="click">
                      <Input  onChange={this.handleInputChange} defaultValue={user[0] && user[0].username} value={this.state.Inputvalue} />
                    </Popover>
                  </FormItem>
                  <FormItem label="角色设定" labelCol={{span:6}} wrapperCol={{ span: 18 }} >
                    {list}
                  </FormItem>
                  <FormItem wrapperCol={{ span: 18 ,offset: 6}}>
                    <Button type="primary" className="submitBtn">确认</Button>
                    <Button type="ghost">取消</Button>
                  </FormItem>
                </Form>
              </Col>
            </Row>
          </div>
      </div>
    )
  }
}