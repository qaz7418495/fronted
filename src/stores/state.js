import {defineStore} from 'pinia'
export const useGlobalState = defineStore({
    id: 'globalState',
    state: () => {
        return {
            token: localStorage.getItem('token') || '',
            userType: Number(localStorage.getItem('userType')) || 0,
            userInformation: JSON.parse(localStorage.getItem('userInformation')) || {},
        }
    },
    getters: {
        isLogin: (state) => (state.userInformation?.id !== undefined),
    },
    actions: {
        setToken(token){
            this.token = token;
            localStorage.setItem('token', token);
        },
        setUserInformation(userInformation){
            this.userInformation = userInformation;
            localStorage.setItem('userType', userInformation.user_type);
            localStorage.setItem('userInformation', JSON.stringify(userInformation));
        }
    }
})