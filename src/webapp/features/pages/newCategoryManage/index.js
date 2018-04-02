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
      }
      
    };
    this.categoryList = [];
  }

  componentWillMount(){
    // this.props.getParentCategory();
    // this.categoryList = this.props.categoryList;
  }

  componentDidMount() {
    if(this.props.formsItems){
      this,this.setState({
        form: {...this.props.formsItems}
      })
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log('newcategorypop',nextProps)
  }
 /*  shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  } */





   handleSubmit=(v)=>{
/*
    const {getTableData,pager} = this.props; //,tableData,pager
    console.log(getTableData)
    getTableData({...pager,entityName:v.toString()}); //
    */

  } 

  backToCategory=()=>{
   
      // const {modelData,editModal,entityModelAttr,editEntityModelAttr,tableData,pager,recordAttr} = this.props;
      //新建时清空modelData和attr
   
      // this.props.router.replace("/categorymanage")

  }

  getOption=()=>{
    if(this.categoryList.length >0){
     this.categoryList.map((v,i)=>{
      return <Option key={v.id}>{v.groupName}</Option>
    })
  }else {
    return  <Option key='0' >父节点为空</Option>
  }

     
    
  }
  cancel = ()=>{
    this.setState({
      form:{
        groupName:'',
        parentId:'',
        sortOrder:''
      }
    })
  }
  add =()=>{

  }


  render() {
    const { getFieldDecorator } = this.props.form;
    const { groupName,parentId, sortOrder} = this.state.form;
    return (
      <div className="content">

      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem
        label={'类目名称'}>
          {getFieldDecorator('groupName', {
            initialValue:groupName,
            rules: [{ required: true, message: 'Please input your groupName!' }],
          })(
            <Input placeholder="水泥" />
          )}
        </FormItem>
        <FormItem label={'上级(父)类目'}>
          {getFieldDecorator('parentId', {
            initialValue:parentId,
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            // <Cascader options={residences} />
            <Select>
              { this.getOption()}
            </Select>
           
          )}
        </FormItem>
        <FormItem label={'排序值'}>
          {getFieldDecorator('sortOrder', {
            rules: [{ required: true, message: 'Please input your Password!' }],
            initialValue: sortOrder,
          })(
           <Input />
          )} 
        </FormItem>
       {/*  <FormItem>
        <Button type="primary" onClick={this.add}>
            确定
          </Button>
          <Button type="primary"  onClick={this.cancel} >
            取消
          </Button>
        </FormItem> */}
      </Form>        
      </div>
    )
  }
}

const NewCategoryManage = Form.create()(categoryForm);
export default NewCategoryManage;

/*
      <p className="operation-area">
        <h1 style={{width:'70%'}}></h1>        <Button  size="large" style={{float:'right',marginRight:'10%'}} onClick={this.backToCategory()}> 返回类目管理 </Button >
      </p>
*/