import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { homeReducer } from './home';
import {modelReducer } from './model';
import {newModelReducer } from './model/newModelReducer';
import { globalReducer } from './global';

const appReducer = combineReducers({
  routing,
  model: modelReducer,
  newModel:newModelReducer,
  home: homeReducer,
  global: globalReducer
});

export default appReducer;
