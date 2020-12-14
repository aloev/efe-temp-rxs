


import axios from 'axios';
import { api } from '../urlConfig';

export const axiosInstance = axios.create({

    baseURL: api,
    // headers: {
    //     'Authorization':''
    // }
});