import React from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Dropdown, Menu } from 'antd';
import classnames from 'classnames';

const { Header } = Layout;

const mapState = state => ({
  navData: state.global.navData,
  userData: state.global.userData
});
const mapDispatch = dispatch => ({});

@connect(mapState, mapDispatch)
export default class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      hasChild:false
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps;
  }

  componentDidMount() {}

  logout() {
    // ajax.logout().then(res => {
    //   if(window != top){
    //     top.location.href = LOGAPICONF.LOGINURL;
    //   }
    //   else{
    //     window.location.href = LOGAPICONF.LOGINURL;
    //   }
    // });
  }
  showList = ()=>{
    event.preventDefault();
    this.setState({
      hasChild:!this.state.hasChild
    })
  }

  renderList = (navi)=>{
   let li ;
   let astyle  ={
     padding:'0 15px',
     textDecoration:'none'
   }
   let ulhideStyle = {
     display:'none'
   }
   let ulshowStyle = {
    display:'block',
    padding:'0 10px'
  }
  let liStyle = {
    height:'40px',
    lineHeight:'40px',
    background:'#fff',
  }
  
  
     if(navi.children && navi.children.length >0){
       return <a href={ navi.resource }  style={astyle} onClick={this.showList} >{ navi.name } 
          <ul style={this.hasChild?ulshowStyle:ulhideStyle}>
          {
              navi.children.map(v=>{
               if( v.resource ){
                 return <li style={liStyle}><a  style={astyle} href={ v.resource }>{ v.name }</a></li>
               }
             }) 
          }
          </ul>
       </a>
     }else{
       return <a  style={astyle} href={ navi.resource }>{ navi.name }</a>
     }
  }

  render() {
    const { navData, location, userData } = this.props;
    console.log('topNav',navData)
    const { name,email,tel } = userData;
    const { pathname, hash } = location;
    const currentUrl = window.location.pathname + '#' + pathname;
    let navis = [];
    let settingNavi;
    navData && navData.forEach(navi => {
      if (navi.code === 'MENU_SETTING') {
        settingNavi = navi;
      }
      else {
        navis.push(navi);
      }
    });
    const userMenu = (<Menu>
      <Menu.Item style={{ overflow: 'hidden', textOverflow: '' }}>
        <a href="javascript:void(0)"
          style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
        >{ tel }</a>
      </Menu.Item>
      <Menu.Item>
        <a href={LOGAPICONF.LOGINURL}>用户中心</a>
      </Menu.Item>
      <Menu.Item>
        <a href="javascript:void(0)"
          onClick={ this.logout.bind(this) }
        >退出登录</a>
      </Menu.Item>
    </Menu>);

    const settingMenu = (<Menu>
      {settingNavi && settingNavi.children.map(o => <Menu.Item key={ o.code }>
        <a href={ o.url || o.children[0].url }>{ o.name }</a>
      </Menu.Item>)}
    </Menu>);

    const helpMenu = (<Menu style={{ left: -15 }}>
      <Menu.Item>
        <a href="/easylog.html#/contact">联系我们</a>
      </Menu.Item>
      <Menu.Item>
      <a href="/easylog.html#/contact">帮助文档</a>
      </Menu.Item>
    </Menu>)

    return <Header className="m-header">
      <div className="logo">
        <a href="/easylog.html#/home">
          <img src={ LOGAPICONF.COMPANYLOGO } alt="EasyLogo"/>
        </a>
      </div>
      <ul className="user f-fr">
        <li className="navitem">
          <Dropdown overlay={ userMenu } trigger={["click"]}>
            <a>{ name.length <= 24 ?
              name :
              name.substr(0, 24) + '...'
             } <Icon type="down" /></a>
          </Dropdown>
        </li>
        <li className="navitem">
          <Dropdown overlay={ settingMenu } trigger={["click"]}>
            <a style={{marginRight: -30}}>
              <i style={{fontSize:'22px'}} className="iconfont icon-shezhi"></i>
            </a>
          </Dropdown>
        </li>
        <li className="navitem">
          <Dropdown overlay={ helpMenu } trigger={["click"]}>
            <a href="javacript:void(0)">
              <i  style={{fontSize:'22px'}} className="iconfont icon-bangzhu3"></i>
            </a>
          </Dropdown>
        </li>
      </ul>
      <ul className="main">
        { navis.map(navi => {
          let url = navi.url;

          /* if(!url) {
            let nav = navi.children[0];
            while(!nav.url) {
              nav = nav.children[0];
            }
            url = nav.url;
          } */

          return <li key={ navi.code } className={classnames('navitem', {
            active: currentUrl.indexOf(navi.url) !== -1||(currentUrl.indexOf('/alert')!=-1&&navi.url.indexOf('/alert')!=-1)
          })}>
          {
           this.renderList(navi)
              
          }
            
          </li>
        }) }
      </ul>
    </Header>
  }
}
