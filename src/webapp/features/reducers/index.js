import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { homeReducer } from './home';
import {modelReducer } from './model';
import {newModelReducer } from './model/newModelReducer';
import { globalReducer } from './global';
import { systemmanageReducer } from './systemmanage';
import { categoryManageReducer } from './categoryManage';
import { encodeManageReducer } from './encodeManage';
import { usermanageReducer } from './usermanage';

const appReducer = combineReducers({
  routing,
  model: modelReducer,
  newModel:newModelReducer,
  home: homeReducer,
  global: globalReducer
 ,systemmanage:systemmanageReducer
 ,categoryManage:categoryManageReducer
 ,encodeManage:encodeManageReducer,
 usermanage:usermanageReducer
});

export default appReducer;
