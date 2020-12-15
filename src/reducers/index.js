

import { combineReducers } from 'redux';
import { authReducer  } from './auth_reducer';
import { userReducer } from './user_reducer';
import { orderReducer } from './order_reducer';
import { productReducer } from './product_reducer';
import { categoryReducer } from './category_reducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    user : userReducer,
    category: categoryReducer,
    // product: productReducer,
    // order: orderReducer
});