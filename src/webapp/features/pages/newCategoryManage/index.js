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
    const {categoryList,formsItems,getParentCategory} = this.props;

    if(formsItems){
      this.setState({
        form: {formsItems}
      },()=>{
        console.log(this.state.form)
      })
    }

  }
  componentWillReceiveProps(nextProps) {
 
    if(nextProps.categoryList){
      this.setState({
        options:nextProps.categoryList
      },()=>{
        console.log(this.state.options)
      })
    }
    if(nextProps.formsItems){
      this,this.setState({
        form: {...nextProps.formsItems}
      },()=>{
        console.log(this.state.form)
      })
    }
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
              { 
                this.state.options.length >0 ?
                  this.state.options.map((v,i)=>{
                      <Option key={v.id}>{v.groupName}</Option>
                   }):<Option key='undefined' >父节点为空</Option>  
              }
            </Select>
           
          )}
        </FormItem>
        <FormItem label={'排序值'}>
          {getFieldDecorator('sortOrder', {
            rules: [{ required: true, message: 'Please input your Password!' }],
            initialValue: sortOrder,
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

/*


        <Button type="primary"onOk={this.handleOk}
         >
            确定
          </Button>
          <Button type="primary"  onClick={this.handleCancel} >
            取消
          </Button>

            handleOk = (e) => {
    const{ setFormItems,saveCategory } = this.props;
    console.log(e);
    
    let v = this.props.form.getFieldsValue();//this.refs.NewCategoryForm.getFieldsValue();
    let a = {};
    for(var k in v){
      if(v.hasOwnProperty(k) && v[k]){
        a[k] = v[k]
      }
    }
    if(a){
      setFormItems(a);
      saveCategory(a)
    } 
  }

  handleCancel = (e) => {
    console.log(e);
    const{ setFormItems } = this.props;
    this.setState({
      form:{
        groupName:'',
        parentId:'',
        sortOrder:''
      }
    });
    setFormItems({});
  }
*/
