

import { combineReducers } from 'redux';
import { authReducer  } from './auth_reducer';
import { userReducer } from './user_reducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    user : userReducer
});