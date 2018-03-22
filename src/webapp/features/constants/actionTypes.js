import mirror from 'mirror-creator';

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
