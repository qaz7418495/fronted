import request from "../http/request";
const url = {
    visitorApplication: '/visitor/reserve'
}
export class Visitor{
    static async VisitorApplication(data) {
        return await request({
            url:url.login,
            method:"post",
            data
        })
    }
}