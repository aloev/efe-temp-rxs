

import { combineReducers } from 'redux';
import { authReducer  } from './auth_reducer';

export const rootReducer = combineReducers({
    auth: authReducer
});