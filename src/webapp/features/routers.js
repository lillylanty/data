import { asyncComponent } from 'react-async-component';
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import WebApp from './container';

import Home from'./pages/home'
import Contact from './pages/contact';
import NotFound from './pages/404';
import Noauth from './pages/noauth';
import ModelManage from './pages/model/model';
import NewModel from './pages/model/newmodel';
import Systemmanage from './pages/systemmanage';
import CategoryManage from './pages/categoryManage';
import newCategoryManage from './pages/newCategoryManage'
import EncodeManage from './pages/encodeManage';



const Routers = <Route path="/" component={WebApp}>
  <IndexRoute component={Home}></IndexRoute>
  <Route path='encodemanage' component={EncodeManage}></Route>
  <Route path='categorymanage' component={CategoryManage}></Route>
  <Route path='newcategorymanage' component={newCategoryManage}></Route>
  <Route path='systemmanage' component={Systemmanage}></Route>
  <Route path="home" component={Home}></Route>
  <Route path="model" component={ModelManage}></Route>
  <Route path="model/newmodel" component={NewModel}></Route>
  <Route path="contact" component={Contact}/>
  <Route path="noauth(/:notuser)" component={Noauth} />
  <Route path="*" component={NotFound}></Route>
</Route>;
export default Routers;
