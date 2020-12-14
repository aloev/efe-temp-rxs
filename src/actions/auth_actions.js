import { axiosInstance } from "../helpers/axios";
import { authConstants } from "./constants"


export const login = ( user ) => {


    return async ( dispatch ) => {


        dispatch({ type: authConstants.LOGIN_REQUEST })

        const res = await axiosInstance.post(`/admin/signin`, {
            ...user
        });

        if( res.status === 200 ){
            const { token, user } = res.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        } else {
            if( res.status === 400){
                dispatch({ 
                    type: authConstants.LOGIN_FAILURE,
                    payload: { error: res.data.error }
                });
            }

        }

    }
}

// Check if its loggedin

export const isUserLoggedIn = () => {

    return async (dispatch) => {
        const token = localStorage.getItem('token');
        if(token){
            const user = JSON.parse(localStorage.getItem('user'));
            dispatch({
                type: authConstants.LOGIN_SUCCESS,
                payload: {
                    token, user
                }
            });
        }
        else {
            dispatch({ 
                type: authConstants.LOGIN_FAILURE,
                payload: { error: 'Failed to Login' }
            });
        }
    }
}

// Logout

export const signout = () => {

    return async (dispatch) => {
        localStorage.clear();
        dispatch({
            type: authConstants.LOGOUT_REQUEST
        })
    }
}


// Signup

// export const signup = ( user ) => {


//     return async ( dispatch ) => {


//         dispatch({ type: authConstants.LOGIN_REQUEST })

//         const res = await axiosInstance.post(`/admin/signup`, {
//             ...user
//         });

//         if( res.status === 200 ){
//             const { msg } = res.data;
          
//             dispatch({
//                 type: authConstants.LOGIN_SUCCESS,
//                 payload: {
//                     token, user
//                 }
//             });
//         } else {
//             if( res.status === 400){
//                 dispatch({ 
//                     type: authConstants.LOGIN_FAILURE,
//                     payload: { error: res.data.error }
//                 });
//             }

//         }

//     }
// }