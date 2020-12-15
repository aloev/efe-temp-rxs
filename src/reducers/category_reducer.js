import { categoryConstants } from "../actions/constants";

const initialState = {
    categories: [],
    loading: false,
    error: null
}



export const categoryReducer = ( state = initialState, action ) => {

    switch(action.type){

        case categoryConstants.GET_ALL_CATEGORIES_SUCCESS:
            state = {
                ...state,
                categories: action.payload.categories
            }
            break;

        case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        
        case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
            state = {
                ...state,
                loading: false,
                // categories: action.payload.categories
            }
            break;
        
        case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
            state = {
                ...initialState
            }
            break;
    }

    return state;
}