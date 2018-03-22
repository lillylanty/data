import React,{ Component } from 'react';
import {  Tree, Popconfirm, Checkbox,Select , Input,Icon, } from 'antd';

const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const Search = Input.Search;
// const { Column, ColumnGroup } = Table;
const { TextArea } = Input;

export default class SideTree extends Component{
  constructor(props){
    super(props)
    const {getTree,tree } = this.props;
    getTree(123);
   
    this.state = {
      expandedKeys:[],
      value: undefined,
      treeData: [],
    }
    
  }
  componentWillMount(){
     let {getTree,tree } = this.props;
    getTree(1);
   /* tree.map((v,i)=>{v.key = v.id})
    this.setState({
      treeData:tree
    }) */
    
  }

  componentDidMount(){
     
  }
  componentWillReceiveProps(nextProps,nextState){
    if(nextProps.tree.length>0){
      nextProps.tree.map(v=>v.key=v.id);
      this.setState({
        treeData:nextProps.tree
      })
    }
    
  }

  componentWillUpdate(){
    // console.log(this.state.treeData);
    this.renderTreeNodes(this.state.treeData)
    this.onLoadData(this.state.treeData)
  }



  onLoadData = (treeNode) => { 
    if(treeNode.length>0)   {
     console.log(treeNode)
    }
  }
  renderTreeNodes = (data) => {  
    if(data.length>0){
      return data.map((item) => {
        if (item.child) {
          return (
            <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.child)}
          </TreeNode>
        );
      }
      
      return <TreeNode {...item} dataRef={item} />;
    });
  }

  }

  onTreeExpand=(expandedKeys,expandedObj)=>{
    console.log('TreeExpand',expandedKeys,expandedObj);
    console.log(expandedObj.node.props.dataRef);
    let tempKeys=this.state.tempExpanded;
    let curKeysObj= this.cloneObj(expandedObj);

    if(tempExpanded.level == 1){
      if(expandedObj.expanded){
        tempKeys.push(tempExpanded.key)
      }
      if(tempKeys.length>1){
        tempKeys=[tempKeys[0],tempExpanded.key];
       }
       if(curKeysObj.node.props.children){
        this.setState({
            expandedKeys:expandedObj.expanded?tempKeys:expandedKeys
        });
    }else{
        let tempF=this.onLoadData(expandedObj.node);
        tempF.then(res=>{  
            this.setState({...res});
        })
    }
    }else{
      this.setState({
        expandedKeys: expandedKeys
    });
    }
  }

  onTreeSelect = (selectedKeys, info)=>{
    console.log('treeSelect',selectedKeys, info);
    if (!info.selected)return;
    let _data = info.selectedNodes[0].props.dataRef||{};
    this.onLoadData(info.node);

  }

  cloneObj = (obj)=>{
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } /* else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } */
     else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            this.cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
  }


  render() {   
    const { expandedKeys } = this.state;
    return (
      <div>
      {

        this.state.treeData.length< 0 ? null :
        <Tree 
            expandedKeys={expandedKeys}
            onExpand={this.onTreeExpand.bind(this)}
            onSelect={this.onTreeSelect.bind(this)}
            loadData={this.onLoadData}
            >
          {this.renderTreeNodes(this.state.treeData)}
        </Tree>
      }
      </div>
    );
  }


  
}

