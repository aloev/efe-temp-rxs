import { categoryConstants } from "../actions/constants";

const initialState = {
    categories: [],
    loading: false,
    error: null
}

const buildNewCategories = ( papaId, categories, category ) => {
    
    let myCategories = [];

    // if ain't no son

    if( papaId == undefined ){

        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                children: [],
            }

        ];
    }


    // if they  == , we know is a son category

    for(let cat of categories ){

        //if papaID given equals id within categories arrays passed

        if(cat._id == papaId ){
            // Tree expansion at its finest
    
            myCategories.push({
                ...cat,
                // You just wanna modify the category, so that's the only one u have to pass
                children: cat.children ? buildNewCategories(papaId, [...cat.children, {
                    _id: category._id,
                    name: category.name,
                    slug: category.slug,
                    parentId: category.parentId,
                    children: category.children,
                }], category) : []
            });
        } else {
            // If they are diff, 
            myCategories.push({
                ...cat,
                children: cat.children ? buildNewCategories(papaId, cat.children, category) : []
            });
        }

    }

    return myCategories;
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
            
            const category =  action.payload.category;
            const updatecat = buildNewCategories( category.parentId ,state.categories, category);

            state = {
                ...state,
                loading: false,
                categories: updatecat,
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