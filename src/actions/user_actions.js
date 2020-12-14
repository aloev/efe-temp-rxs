
import { axiosInstance } from "../helpers/axios";
import {  userConstants } from "./constants"


// Signup

export const signup = ( user ) => {


    return async ( dispatch ) => {


        dispatch({ type: userConstants.USER_REGISTER_REQUEST })

        const res = await axiosInstance.post(`/admin/signup`, {
            ...user
        });

        if( res.status === 200 ){
            const { msg } = res.data;
          
            dispatch({
                type: userConstants.USER_REGISTER_SUCCESS,
                payload: {
                    msg
                }
            });
        } else {
            if( res.status === 400){
                dispatch({ 
                    type: userConstants.USER_REGISTER_FAILURE,
                    payload: { error: res.data.error }
                });
            }

        }

    }
}