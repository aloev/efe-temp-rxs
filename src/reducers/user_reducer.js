

import { authConstants, userConstants } from "../actions/constants";


const initialState = {
    error: null,
    message: '',
    loading: false
};


export const userReducer = ( state= initialState, action ) => {

    switch(action.type){

        case userConstants.USER_REGISTER_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        
        case userConstants.USER_REGISTER_SUCCESS:
            state = {
                ...state,
                loading: false,
                message: action.payload.msg
            }
            break;

        case userConstants.USER_REGISTER_FAILURE:
            state = {
                ...state,
                loading: false,
                error: action.payload.error
            }
            break;

        
    }


    return state;
} 

