import React, { Component, PropTypes } from 'react'
import { Form, Icon, Input, Button, Checkbox,Popover,Select } from 'antd';
import { categoryManageAction } from '../../actions/categoryManageAction';
import { connect } from 'react-redux';

const Search = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;


const mapState = state => ({
  categoryList: state.categoryManage.categoryList,
});
const mapDispatch = dispatch => ({
  getParentCategory:()=> dispatch(categoryManageAction.getPrentCategory()),
});

@connect(mapState, mapDispatch)

class categoryForm extends Component {
  constructor(props) {
    super(props);
    props.getParentCategory();

    this.state = {
      form:{
        groupName:'',
        parentId:'',
        sortOrder:''
      },
      options:[]
      
    };
    
  }

  componentWillMount(){
    // this.props.getParentCategory();
    // this.categoryList = this.props.categoryList;
  }

  componentDidMount() {
    


  }
  componentWillReceiveProps(nextProps) {
 
    if(nextProps.categoryList){
      this.setState({
        options:nextProps.categoryList,
        form:{...nextProps.formItems}
      },()=>{
       console.log(this.state.form)
      })
    }
    
  }
 /*  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  } */

  componentDidMount(){
    console.log('didMount',this.props.formItems)
    let v =this.props.formItems;
    if(v){
       this.props.form.setFieldsValue({
        groupName: v.groupName,
        parentId:  v.parentId,
        sortOrder: v.sortOrder
    })
    } 
  }
  selectChange = (value)=>{
    // console.log(value)
    this.props.form.setFieldsValue({
      parentId:value.parentId
    })
  }




  render() {
 
    const { getFieldDecorator } = this.props.form;
    const { groupName,parentId, sortOrder} = this.state.form;

    console.log(this.state.form);
    return (
      <div className="content">

      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
        label={'类目名称'}>
          {getFieldDecorator('groupName', {
            rules: [{ required: true, message: 'Please input your groupName!' }],
          })(
            <Input placeholder={groupName||''} />
          )}
        </FormItem>
        <FormItem label={'上级(父)类目'}>
          {getFieldDecorator('parentId', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            // <Cascader options={residences} />
            <Select onChange={(value)=>this.selectChange(value)}>
              { 
                this.state.options.length >0 ?
                  this.state.options.map((v,i)=>{
                     return <Option key={v.id}>{v.groupName}</Option>
                   }): <Option key='undefined' >父节点为空</Option>  
              }
            </Select>
           
          )}
        </FormItem>
        <FormItem label={'排序值'}>
          {getFieldDecorator('sortOrder', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
           <Input type="number" />
          )} 
        </FormItem>
        <FormItem>

        </FormItem> 
      </Form>        
      </div>
    )
  }
}


const NewCategoryManage = Form.create()(categoryForm);
export default NewCategoryManage;

