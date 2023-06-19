<template>
    <div class="main-wrap">
        <el-button @click="addVisitorApplication()" class="btn addBtn">添加访客申请</el-button>
        <el-table v-if="visitorList.length != 0" :data="visitorList">
            <el-table-column prop="name" label="姓名" />
            <el-table-column prop="phone_number" label="手机号" />
            <!-- <el-table-column prop="id_number" label="Name" width="180" /> -->
            <el-table-column prop="reservation_time" label="到访时间" />
            <el-table-column prop="post_time" label="申请时间" />
            <el-table-column label="是否发送">
                <template #default="scope">
                    {{ scope.row.is_send == 1 ? '已发送' : '未发送' }}
                </template>
            </el-table-column>
            <el-table-column label="申请人" v-if="globalState.userType == 2">
                <template #default="scope">
                    {{ scope.row.user_info.contact_name }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button link type="warning" @click.prevent="reSendCode(scope.row)"
                        :disabled="!scope.row.can_resend">
                        重新发送
                    </el-button>
                    <el-button link type="danger" @click.prevent="deleteApplication(scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-empty v-else description="暂无信息"></el-empty>
        <el-dialog v-model="addVistorDialog" title="访客申请" width="500" :append-to-body="false">
            <span class="left-tab">到访时间</span>
            <el-date-picker v-model="newVisitor.reservation_time" type="datetime" placeholder="Pick a Date"
                format="YYYY/MM/DD HH:mm" value-format="YYYY-MM-DD HH:mm" :disabled-date="setDisableDate"
                class="right-content" style="margin-bottom: 10px" :teleported="false" /><br />
            <span class="left-tab">姓名</span>
            <el-input v-model="newVisitor.name" class="right-content"></el-input> <br />
            <span class="left-tab">身份证号</span>
            <el-input v-model="newVisitor.id_number" class="right-content"></el-input> <br />
            <span class="left-tab">手机号</span>
            <el-input v-model="newVisitor.phone_number" class="right-content"></el-input> <br />
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelAddVisior()">取消</el-button>
                    <el-button type="primary" @click="addVisitorApplicationConfirm()">添加</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 删除记录确认弹出框 -->
        <el-dialog v-model="delDialog" title="确认删除吗？" width="500">
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelDelUser()">取消</el-button>
                    <el-button type="danger" @click="delUserConfirm()">删除</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { Visitor } from '../../api/visiorapplication';
import { useGlobalState } from '../../stores/state';
// 用户类型
const globalState = useGlobalState();

// 设置禁用时间
const setDisableDate = (time) => {
    // return time.getTime() < (Date.now() - (24 * 60 * 60 * 1000));
    const currentDate = new Date();
    currentDate.setSeconds(0, 0); // Reset seconds and milliseconds to avoid rounding issues

    return time.getTime() < currentDate.getTime();
}

// 访客列表
const visitorList = ref([
    {
        id: '1',
        name: 'Harbour',// 为谁申请
        reservation_time: '2023-06-13-16-06-53',
        post_time: '2023-06-13-16-06-53',
        id_number: '1145141141514',
        phone_number: '110120119911',
        is_send: 1, // 是否已发送
        user_info: { // 谁申请的
            "id": 3,
            "legal_person_name": "安璟坤",
            "company_name": "智信医疗",
            "contact_name": "李毅骁",
            "phone_number": "15130585160",
            "email": "20373252@buaa.edu.cn"
        }
    },
])
// 控制添加访客信息的弹出框
const addVistorDialog = ref(false)
// 新添加的访客
const newVisitor = ref({
    name: '',
    id_number: '',
    reservation_time: '',
    phone_number: '',
    time_delta: '3', //todo  正式运行的时候需要改为30
    can_resend: false,
})



// 添加访客信息
const addVisitorApplication = () => {
    addVistorDialog.value = true
}

// 取消添加
const cancelAddVisior = () => {
    newVisitor.value = {
        name: '',
        id_number: '',
        reservation_time: '',
        phone_number: '',
        time_delta: '3',
        can_resend: false,
    }
    addVistorDialog.value = false
}

// 检查信息是否完全有误
const checkVisitor = () => {
    for (key in newVisitor.value.keys) {
        console.log(key)
        if (newVisitor.value[key] == '') return false
    }
}

// 添加访客
const addVisitorApplicationConfirm = () => {
    // 判断访客信息是否填写完全 时间是否正确
    if (!checkVisitor) {
        ElNotification({
            title: "很遗憾",
            message: "请完善信息",
            type: "error",
            duration: 3000
        })
        return
    }
    console.log('访客信息', newVisitor.value)
    newVisitor.value.reservation_time = newVisitor.value.reservation_time + ':00'
    // 向后端发送请求 todo
    Visitor.VisitorApplication(newVisitor.value).then((res) => {
        console.log(res)
        if (res.data.result == 1) {
            ElNotification({
                title: "申请成功",
                message: "申请成功",
                type: "success",
                duration: 3000
            })
            // 重新获取列表
            getVisitorList()
            // 清空信息 关闭窗口
            cancelAddVisior()
        } else {
            ElNotification({
                title: "申请失败",
                message: res.data.message,
                type: "error",
                duration: 3000
            })
        }
    }).catch((err) => {
        ElNotification({
            title: "很遗憾",
            message: err.message,
            type: "error",
            duration: 3000
        })
    })
}

//获取访客列表
const getVisitorList = () => {
    if (globalState.userType == 2) {
        Visitor.GetAllApplications().then((res) => {
            // console.log(res)
            if (res.data.result == 1) {
                // ElNotification({
                //     title: "获取管列表成功",
                //     message: "获取列表成功",
                //     type: "success",
                //     duration: 3000
                // })
                visitorList.value = res.data.visitor_list
            } else {
                ElNotification({
                    title: "获取失败",
                    message: res.data.message,
                    type: "error",
                    duration: 3000
                })
            }
        }).catch((err) => {
            ElNotification({
                title: "很遗憾",
                message: err.message,
                type: "error",
                duration: 3000
            })
        })
    } else {
        Visitor.GetOwnApplications().then((res) => {
            // console.log(res)
            if (res.data.result == 1) {
                // ElNotification({
                //     title: "获取管列表成功",
                //     message: "获取列表成功",
                //     type: "success",
                //     duration: 3000
                // })
                visitorList.value = res.data.visitor_list
            } else {
                ElNotification({
                    title: "获取失败",
                    message: res.data.message,
                    type: "error",
                    duration: 3000
                })
            }
        }).catch((err) => {
            ElNotification({
                title: "很遗憾",
                message: err.message,
                type: "error",
                duration: 3000
            })
        })
    }
}

// 重新发送
const reSendCode = (data) => {
    Visitor.ResendCptcha({
        visitor_id: data.id
    }).then((res) => {
        // console.log(res)
        if (res.data.result == 1) {
            ElNotification({
                title: "发送成功",
                message: "发送成功",
                type: "success",
                duration: 3000
            })
            getVisitorList()
        } else {
            ElNotification({
                title: "发送失败",
                message: res.data.message,
                type: "error",
                duration: 3000
            })
        }
    }).catch((err) => {
        ElNotification({
            title: "很遗憾",
            message: err.message,
            type: "error",
            duration: 3000
        })
    })
}

// 删除弹出框
const delDialog = ref(false)
const chosenApplication = ref()

// 删除人员
const deleteApplication = (data) => {
    chosenApplication.value = data
    delDialog.value = true
}

// 取消删除
const cancelDelUser = () => {
    delDialog.value = false
}

// 确定删除
const delUserConfirm = () => {
    if (globalState.userType == 2) {
        Visitor.DelApplicationByManager({
            visitor_id_list: [chosenApplication.value.id]
        }).then((res) => {
            console.log(res)
            if (res.data.result == 1) {
                ElNotification({
                    title: "删除成功",
                    message: "删除成功",
                    type: "success",
                    duration: 3000
                })
                getVisitorList()
                delDialog.value = false
            } else {
                ElNotification({
                    title: "删除失败",
                    message: res.data.message,
                    type: "error",
                    duration: 3000
                })
                delDialog.value = false
            }
        }).catch((err) => {
            ElNotification({
                title: "很遗憾",
                message: err.message,
                type: "error",
                duration: 3000
            })
            delDialog.value = false
        })
    } else {
        Visitor.DelApplicationBySelf({
            visitor_id_list: [chosenApplication.value.id]
        }).then((res) => {
            console.log(res)
            if (res.data.result == 1) {
                ElNotification({
                    title: "删除成功",
                    message: "删除成功",
                    type: "success",
                    duration: 3000
                })
                getVisitorList()
                delDialog.value = false
            } else {
                ElNotification({
                    title: "删除失败",
                    message: res.data.message,
                    type: "error",
                    duration: 3000
                })
                delDialog.value = false
            }
        }).catch((err) => {
            ElNotification({
                title: "很遗憾",
                message: err.message,
                type: "error",
                duration: 3000
            })
            delDialog.value = false
        })
    }
}

onMounted(() => {
    // 获取访客列表
    getVisitorList()
})
</script>
<style lang="scss" scoped>
.main-wrap {
    width: 100%;
    height: 100%;
    padding: 20px;
}

// 添加按钮
.addBtn {
    float: right;
}

// 弹出框左侧标签
.left-tab {
    margin-right: 10px;
    display: inline-block;
    width: 70px;
    margin-bottom: 10px;
}

// 弹出框右侧组件
.right-content {
    max-width: 300px;
    margin: 10px 0px;
}
</style>