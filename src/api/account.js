import request from "../http/request";
const url = {
    postCode:"/user/post_code",
    login:"/user/login",
}
export class Account{
    static async login(data){
        return await request({
            url:url.login,
            method:"post",
            data
        })
    }
    static async postCode(data){
        return await request({
            url:url.postCode,
            method:"post",
            data
        })
    }
}