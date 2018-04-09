import mirror from 'mirror-creator';

export const encodeManageType = mirror([
  'GET_CODE_DETAIL',
  'GET_TABLE',
  'SET_PAGE',
  'GET_PARENT_CATEGORY',
  'SET_FORM_ITEM',
],'encodeManage/');

export const categoryManageType = mirror([
  'GET_TABLE',
  'SET_PAGE',
  'GET_PARENT_CATEGORY',
  'SET_FORM_ITEM',
  
  
],'categoryManage/');

export const systemmanageType = mirror([
  'GET_ENTITY_ATTR',
  'GET_REFER_ENTITY',
  'EDIT_ROLE',
  'GET_ROLE_ENTITY',
  'GET_TREE',
  'ROLE_TABLE',
  'SET_PAGE',
],'systemmanage/');

export const newModelType = mirror([
  'CAN_NEXT',
  'UPLOAD_MODEL_RESULT',
  'REL_ENTITY',
  'SAVE_NEW_ENTITY',
  'EDIT_ENTITY_MODAL_ATTR',
  'UPDATE_DATA_TYPE',
  'SHOW_TABLE',
  'EDIT_ENTITY',
  'EDIT_MODEL_DATA',
  'UPDATE_MODEL_DATA',
  'SET_NEW_DATA',
  'GET_GATEGORY',
],'newModel/')

export const manageModelType = mirror([
  'SET_CATEGORY_ID',
  'GET_ATTR',
  'SET_PAGE',
  'GET_TREE',
  'GET_TABLE_DATA',
  'GET_FILTER_DATA',
  'SET_NEW_DATA',
  'GATEGORY_MANAGE'
],'model/')

export const homeType = mirror([
  'GET_FILTER',
  'GET_NEXT_PAGE',
  'SET_PAGER',
  'GET_TABLE_DATA',
  'GET_HOME_DATA',
  'GET_USER_DATA',
  'GET_NAV_DATA',
],'home/')
export const globalType = mirror([
  'GET_FILTER',
  'SET_PAGER',
  'GET_TABLE_DATA',
  'GET_USER_DATA',
  'GET_NAV_DATA',
],'home/')
