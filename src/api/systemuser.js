import request from "../http/request";
const url = {
    addManager: '/manager/add_manager',
    addWorker: '/manager/add_maintain',
    delManager: '/manager/delete_manager',
    delWorker: '/manager/delete_maintain',
    getManagerList: '/manager/get_all_manager',
    getWorkList: '/manager/get_all_maintain',
    editManager: '/manager/change_manager',
    editWorker: '/manager/change_maintain',
}
export class SystemUserManage{
    static async AddManager(data) {
        return await request({
            url:url.addManager,
            method:"post",
            data
        })
    }

    static async AddWorker(data) {
        return await request({
            url:url.addWorker,
            method:"post",
            data
        })
    }

    static async DelManager(data) {
        return await request({
            url:url.delManager,
            method:"post",
            data
        })
    }

    static async DelWorker(data) {
        return await request({
            url:url.login,
            method:"post",
            data
        })
    }

    static async GetManagerList(data) {
        return await request({
            url:url.getManagerList,
            method:"post",
            data
        })
    }

    static async GetWorkList(data) {
        return await request({
            url:url.getWorkList,
            method:"post",
            data
        })
    }

    static async EditManager(data) {
        return await request({
            url:url.editManager,
            method:"post",
            data
        })
    }

    static async EditWorker(data) {
        return await request({
            url:url.editWorker,
            method:"post",
            data
        })
    }
}