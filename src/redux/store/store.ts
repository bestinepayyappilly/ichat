import {createStore, combineReducers} from 'redux';
import userReducers from '../reducers/userReducers';

const appReducer = combineReducers({
  user: userReducers,
});

const rootReducer = (state: any, action: any) => {
  if (action.type == 'USER_LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = createStore(rootReducer);
