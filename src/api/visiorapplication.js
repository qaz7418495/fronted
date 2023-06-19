import request from "../http/request";
const url = {
    visitorApplication: '/visitor/reserve',
    getAllApplications: '/visitor/get_visitor_list',
    getOwnApplicatins: '/visitor/get_user_visitor_list',
    resendCptcha: '/visitor/resend_visitor_code',
    delApplicationByManager: '/visitor/del_visitor_list',
    delApplicationByself: '/visitor/del_user_visitor_list'
}
export class Visitor{
    static async VisitorApplication(data) {
        return await request({
            url:url.visitorApplication,
            method:"post",
            data
        })
    }

    static async GetAllApplications(data) {
        return await request({
            url:url.getAllApplications,
            method:"post",
            data
        })
    }

    static async GetOwnApplicatins(data) {
        return await request({
            url:url.getOwnApplicatins,
            method:"post",
            data
        })
    }

    static async DelApplicationByManager(data) {
        return await request({
            url:url.delApplicationByManager,
            method:"post",
            data
        })
    }

    static async DelApplicationByself(data) {
        return await request({
            url:url.delApplicationByself,
            method:"post",
            data
        })
    }

    static async ResendCptcha(data) {
        return await request({
            url:url.resendCptcha,
            method:"post",
            data
        })
    }
}