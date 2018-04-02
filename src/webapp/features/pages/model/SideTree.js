import React,{ Component } from 'react';
import {  Tree, Popconfirm, Checkbox,Select , Input,Icon, } from 'antd';

const TreeNode = Tree.TreeNode;
const Option = Select.Option;
const Search = Input.Search;

const { TextArea } = Input;



export default class SideTree extends Component{
  constructor(props){
    super(props)
    this.state = {
      expandedKeys:[],
      value: undefined,
      treeData: [],
    }
    
  }
  componentWillMount(){
   
  }

  componentDidMount(){
    this.queryTree()
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
    this.onLoadData(this.state.treeData)
  }



  onLoadData = (treeNode) => { 
    
        let expandedKeys=[]
        if(treeNode.props && treeNode.props.dataRef.level==0&&treeNode.props.dataRef.key!=expandedKeys[0]){
            expandedKeys =[ treeNode.props.dataRef.key];
        }

        return new Promise((resolve) => {
          if(treeNode.props && treeNode.props.dataRef.level <=3) {
            //根据子节点发送请求,返回后数据遍历赋给当前节点的子节点 _arr应为返回的res
            let _arr = treeNode.props.dataRef.child.slice(0) || [];
            _arr.map((v,i)=>{
              return {
                title: v.name,
                key:v.id || `${treeNode.level}-${i}`,
                level:treeNode.level + 1 || treeNode.props.dataRef.level +1 
              }
            });
            treeNode.props.dataRef.child = _arr;
            this.setState({
              treeData: [...this.state.treeData],
              expandedKeys:_arr[0].key,
              tempExpanded:_arr[0].key
            });
            resolve();
          }else {
              if(!treeNode.props || !treeNode.props.dataRef){
                return
              }
                  let _arr =treeNode.props.dataRef.child.slice(0) || [];
                  _arr.map((val,ind) => {
                      return {
                          title : val.name,
                          key : val.id || `${treeNode.level}-${i}`,
                          level : treeNode.level + 1 || treeNode.props.dataRef.level +1 ,
                          isLeaf : true
                      }
                  })
                  treeNode.props.dataRef.child = _arr;
                  let childKeys=[];
                  _arr.forEach(item=>{
                      childKeys.push(item.key);
                  })
                  let parentNode=this.cloneObj( this.state.tempExpanded);
                
                  if(this.state.tempExpanded.length>2){
                      parentNode=[parentNode[0],treeNode.props.dataRef.key]
                  }
                
                  this.setState({
                      treeData: [...this.state.treeData],
                      expandedKeys:parentNode,
                      rangeVar:Math.random()
                  });
                  let reqParma={ treeData: [...this.state.treeData],
                      expandedKeys:parentNode}
                  resolve(reqParma);
              }
              
          })

        

  
    
  }

  renderTreeNodes = (data) => {  
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode  title={item.title} key={item.id} dataRef={item} isLeaf={true}/>;
    });

  }

  queryTree = ()=>{
    let {getTree,tree } = this.props;
    getTree({source:0});
    
  }

  onTreeExpand=(expandedKeys,expandedObj)=>{

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
    
    if (!info.selected)return;
    let _data = info.selectedNodes[0].props.dataRef||{};
    this.onLoadData(info.node);

  }

  cloneObj = (obj)=>{
    var str, newobj = obj.constructor === Array ? [] : {};
    if(Object.prototype.toString.call(obj) !== ['object','Object']){
        return;
    }  else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } 
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
    
    let {tree} = this.props;
    let treeData =[...tree] ;
    
    treeData.map((val,i)=>{
          val.title = val.groupName; //后端老改这个字段
          val.key =val.id;
      });
     
    return (
      <div>
      {

        this.state.treeData.length> 0 ? <Tree loadData={this.onLoadData}>
            {this.renderTreeNodes(treeData)}
          </Tree> : null
      }
      </div>
    );
  }


  
}

