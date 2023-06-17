import {defineStore} from 'pinia'
export const useGlobalState = defineStore({
    id: 'globalState',
    state: () => ({
        return:{
            token: localStorage.getItem('token') || '',
            userType: JSON.parse(localStorage.getItem('userType')) || {},
        }
    }),
    getters: {
        isLogin: (state) => (state.token !== ''),
    },
    actions: {
        setToken(token){
            this.token = token;
            localStorage.setItem('token', token);
        },
        setUserType(userType){
            this.userType = userType;
            localStorage.setItem('userType', JSON.stringify(userType));
        }
    }
})