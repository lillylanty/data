import React, { Component, PropTypes } from 'react'
import { Form, Icon, Input, Button, Checkbox,Tree} from 'antd';
const TreeNode = Tree.TreeNode;

export default class NewSystemTab1  extends Component {
  constructor(props){
    super(props);
    this.state={}

  }
/*   shouldComponentUpdate(nextProps, nextState) {
    return this.props != nextProps || this.state != nextState;
  }
 */
componentDidMount(){
 
}

renderTreeNodes = (data) => { 
  if(!data){
    return
  }
  return data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.name} key={item.id} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode  title={item.name} key={item.id} dataRef={item} isLeaf={true}/>;
  });

}
  
onSelect = (selectedKeys, info) => {
  console.log('selected', selectedKeys, info);
}
onCheck = (checkedKeys, info) => {
  console.log('onCheck', checkedKeys, info);
}

  render(){
    // console.log(this.props.treeData);
    let {treeData} = this.props;
    return (
    <div >
    <div style={{margin:'20px 0',minHeight:'300px'}}>
   
      <Tree
        checkable
        defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultSelectedKeys={['0-0-0', '0-0-1']}
        defaultCheckedKeys={['0-0-0', '0-0-1']}
        onSelect={this.onSelect}
        onCheck={this.onCheck}
      >
        {this.renderTreeNodes(treeData)}
      </Tree>
    </div>
  </div>
  )}
}

//disabled  disableCheckbox