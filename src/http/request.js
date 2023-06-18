import axios from "axios";
import { useGlobalState } from "../stores/state";
const globalState = useGlobalState();
const request = axios.create({
    baseURL: 'https://building.super2021.com/api',
    timeout: 0,
})
request.interceptors.request.use(
    (config) => {
        if(globalState.token){
            config.headers.Authorization = globalState.token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)
export default request;