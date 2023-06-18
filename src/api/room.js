import request from "../http/request";
const url = {
    getRoomList:"/room/get_room_list"
}
export class Room{
    static async getRoomList(data){
        return await request({
            url:url.getRoomList,
            method:"post",
            headers: {
                AUTHORIZATION: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwibmFtZSI6Ilx1NWMwMVx1NTNmN1x1NjU5N1x1N2Y1NyIsInBob25lX251bWJlciI6IjEzMTcxODgwNTQ1IiwidXNlcl90eXBlIjoiMiIsImV4cCI6MTY4ODc4NzAxNC41NDA1NjA3fQ.H1rEV5jpu0Y5i4utM4US9PZGMrCIX5B5a7gvHlDmNHg",
            },
            data
        })
    }
}