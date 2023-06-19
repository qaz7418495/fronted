<template>
    <div class="main-wrap" id="shiny-shadow">
        <!-- 分页 -->
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="管理人员" name="manager">
                <button @click="addManager()" class="btn addBtn h-button">添加管理人员</button>
                <el-table v-if="managerList.length != 0" :data="managerList">
                    <el-table-column prop="name" label="姓名" />
                    <!-- <el-table-column prop="id_number" label="Name" width="180" /> -->
                    <el-table-column prop="phone_number" label="手机号" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="warning" @click.prevent="editUser(scope.row)">
                                修改
                            </el-button>
                            <el-button type="danger" @click.prevent="deleteUser(scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-empty v-else description="暂无信息"></el-empty>
                <!-- {{ managerList }} -->
            </el-tab-pane>
            <el-tab-pane label="维修人员" name="worker">
                <el-button @click="addManager()" class="btn addBtn">添加维修人员</el-button>
                <el-table v-if="workerList.length != 0" :data="workerList" >
                    <el-table-column prop="name" label="姓名" />
                    <!-- <el-table-column prop="id_number" label="Name" width="180" /> -->
                    <el-table-column prop="phone_number" label="手机号" />
                    <el-table-column prop="email" label="邮箱" />
                    <el-table-column label="类型">
                        <template #default="scope">
                            {{ workerType[scope.row.job] }}
                        </template>
                    </el-table-column>
                    <el-table-column label="状态">
                        <template #default="scope">
                            {{ scope.row.is_free ? '空闲' : '非空闲' }}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button link type="warning"  @click.prevent="editUser(scope.row)">
                                修改
                            </el-button>
                            <el-button link type="danger"  @click.prevent="deleteUser(scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-empty v-else description="暂无信息"></el-empty>
                <!-- {{ workerList }} -->
            </el-tab-pane>
        </el-tabs>
        <!-- 添加 / 编辑人员弹出框 管理人员/维修人员 -->
        <el-dialog v-model="addDialog" :title="selectTitle()" width="500" :append-to-body="false">
            <div class="add-dialog-item" v-if="activeName == 'manager'">
                <span class="left-tab">管理员姓名</span>
                <el-input v-model="newUser.manager_name" class="right-content"></el-input>
            </div>
            <div class="add-dialog-item" v-else>
                <span class="left-tab">维修人员姓名</span>
                <el-input v-model="newUser.maintain_name" class="right-content"></el-input>
            </div>
            <div class="add-dialog-item">
                <span class="left-tab">手机号</span>
                <el-input v-model="newUser.phone_number" class="right-content"></el-input>
            </div>
            <div class="add-dialog-item">
                <span class="left-tab">邮箱</span>
                <el-input v-model="newUser.email" class="right-content"></el-input>
            </div>
            <div class="add-dialog-item" v-if="activeName == 'worker'">
                <span class="left-tab">维修人员类型</span>
                <el-select v-model="newUser.job" placeholder="类型" class="right-content" :teleported="false">
                    <el-option label="机械工" :value="2" />
                    <el-option label="电工" :value="1" />
                    <el-option label="水工" :value="0" />
                </el-select>
            </div>
            <!-- <div class="add-dialog-item" v-if="activeName == 'worker' && editMode">
                <span class="left-tab">是否空闲</span>
                <el-select v-model="newUser.is_free" placeholder="是否可用" class="right-content">
                    <el-option label="非空闲" value="false" />
                    <el-option label="空闲" value="true" />
                </el-select>
            </div> -->
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelAddUser()">取消</el-button>
                    <el-button type="primary" @click="addUserConfirm()">{{ editMode ? '保存' : '添加' }}</el-button>
                </span>
            </template>
        </el-dialog>
        <!-- 删除人员确认弹出框 -->
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
import { SystemUserManage } from '../../api/systemuser'
// tab记录
const activeName = ref('manager')

// 管理人员列表
const managerList = ref([
    {
        "id": 1,
        "name": "管理员一号",
        "email": '20373638@buaa.edu.cn',
        "phone_number": "13632984172"
    },
    {
        "id": 2,
        "name": "管理员2号安璟坤",
        "email": '20373638@buaa.edu.cn',
        "phone_number": "13120356833"
    },
    {
        "id": 3,
        "name": "管理员三号",
        "email": '20373638@buaa.edu.cn',
        "phone_number": "15130585160"
    },
    {
        "id": 4,
        "name": "侯博",
        "email": '20373638@buaa.edu.cn',
        "phone_number": "15175667868"
    },
    {
        "id": 6,
        "name": "封号斗罗",
        "email": '20373638@buaa.edu.cn',
        "phone_number": "13171880545"
    }
])

// 维修人员列表
const workerList = ref([
    {
        "id": 1,
        "name": "维修工侯博",
        "phone_number": "15175667868",
        "job": 0,
        "email": '20373638@buaa.edu.cn',
        "is_free": true
    }
])

// 修理类型
const workerType = ['水工', '电工', '机械工']

// 控制添加人员信息的弹出框
const addDialog = ref(false)


// 新添加的人员
const newUser = ref({
    manager_name: '',
    maintain_name: '',
    phone_number: '',
    job: 0,
    if_free: true,
    id: 12,
    email: '',
})

// 清空newUser
const clearNewUser = () => {
    newUser.value = {
        manager_name: '',
        maintain_name: '',
        phone_number: '',
        job: 0,
        if_free: true,
        id: 12,
        email: '',
    }
}

// 添加人员信息函数
const addManager = () => {
    editMode.value = false
    clearNewUser()
    addDialog.value = true
}

// 编辑人员模式 确定弹出框内容
const editMode = ref(false)

// 取消添加
const cancelAddUser = () => {
    clearNewUser()
    addDialog.value = false
    editMode.value = false
}

// 编辑人员
const editUser = (data) => {
    // console.log('编辑人员', index)
    editMode.value = true
    newUser.value = data
    if( activeName.value == 'manager' ) {
        newUser.value.manager_name = data.name
        newUser.value.manager_id = data.id
    } else {
        newUser.value.maintain_name = data.name
        newUser.value.maintain_id = data.id
    }
    addDialog.value = true
}

// 删除弹出框
const delDialog = ref(false)

// 删除人员
const deleteUser = (data) => {
    console.log('删除人员', data)
    newUser.value = data
    if( activeName.value == 'manager' ) {
        newUser.value.manager_name = data.name
    } else {
        newUser.value.maintain_name = data.name
    }
    delDialog.value = true
}

// 取消删除
const cancelDelUser = () => {
    clearNewUser()
    delDialog.value = false
}

// 确定删除
const delUserConfirm = () => {
    if (activeName.value == 'manager') {
        SystemUserManage.DelManager({
            manager_id: newUser.value.id
        }).then((res) => {
            console.log(res)
            if (res.data.result == 1) {
                ElNotification({
                    title: "删除成功",
                    message: "删除成功",
                    type: "success",
                    duration: 3000
                })
                getManagerList()
                clearNewUser()
                delDialog.value = false
            } else {
                ElNotification({
                    title: "删除失败",
                    message: res.data.message,
                    type: "error",
                    duration: 3000
                })
                clearNewUser()
                delDialog.value = false
            }
        }).catch((err) => {
            ElNotification({
                title: "很遗憾",
                message: err.message,
                type: "error",
                duration: 3000
            })
            clearNewUser()
            delDialog.value = false
        })
    } else {
        SystemUserManage.DelWorker({
            maintain_id: newUser.value.id
        }).then((res) => {
            console.log(res)
            if (res.data.result == 1) {
                ElNotification({
                    title: "删除成功",
                    message: "删除成功",
                    type: "success",
                    duration: 3000
                })
                getWorkerList()
                clearNewUser()
                delDialog.value = false
            } else {
                ElNotification({
                    title: "删除失败",
                    message: res.data.message,
                    type: "error",
                    duration: 3000
                })
                clearNewUser()
                delDialog.value = false
            }
        }).catch((err) => {
            ElNotification({
                title: "很遗憾",
                message: err.message,
                type: "error",
                duration: 3000
            })
            clearNewUser()
            delDialog.value = false
        })
    }
}

// 检查信息是否完全有误 0 管理员 1 维修工
const checkVisitor = (type) => {
    if(type == 0) {
        // 管理员
        console.log("管理人员", newUser.value)
        /* LLLeo's comment: 消除代码异味 */
        // if(!(newUser.value.manager_name && newUser.value.phone_number)) return false
        // else return true
        return newUser.value.manager_name && newUser.value.phone_number && newUser.value.email;
    } else {
        console.log("维修人员", newUser.value)
        // if(!(newUser.value.maintain_name && newUser.value.phone_number)) return false
        // else return true
        return newUser.value.maintain_name && newUser.value.phone_number && newUser.value.email;
    }
}

// 添加用户或者编辑用户确认
const addUserConfirm = () => {
    switch (activeName.value) {
        // 管理员的添加或者编辑
        case 'manager':
            if (!editMode.value) { // 添加
                if (checkVisitor(0)) {// 信息无误
                    SystemUserManage.AddManager(newUser.value).then((res) => {
                        if (res.data.result == 1) {
                            ElNotification({
                                title: "添加成功！",
                                message: "添加成功！",
                                type: "success",
                                duration: 3000
                            })
                            clearNewUser()
                            getManagerList()
                            addDialog.value = false
                        } else {
                            ElNotification({
                                title: "添加失败",
                                message: res.data.message,
                                type: "error",
                                duration: 3000
                            })
                            clearNewUser()
                            // getManagerList()
                            addDialog.value = false
                        }
                    }).catch((err) => {
                        ElNotification({
                            title: "很遗憾",
                            message: err.message,
                            type: "error",
                            duration: 3000
                        })
                        clearNewUser()
                        // getManagerList()
                        addDialog.value = false
                    })
                } else {
                    ElNotification({
                        title: "很遗憾",
                        message: "请完善信息",
                        type: "error",
                        duration: 3000
                    })
                    return
                }
            } else { // 编辑
                if (checkVisitor(0)) {// 信息无误
                    SystemUserManage.EditManager(newUser.value).then((res) => {
                        if (res.data.result == 1) {
                            ElNotification({
                                title: "修改成功！",
                                message: "修改成功！",
                                type: "success",
                                duration: 3000
                            })
                            clearNewUser()
                            getManagerList()
                            addDialog.value = false
                        } else {
                            ElNotification({
                                title: "修改失败",
                                message: res.data.message,
                                type: "error",
                                duration: 3000
                            })
                            clearNewUser()
                            // getManagerList()
                            addDialog.value = false
                        }
                    }).catch((err) => {
                        ElNotification({
                            title: "很遗憾",
                            message: err.message,
                            type: "error",
                            duration: 3000
                        })
                        clearNewUser()
                        // getManagerList()
                        addDialog.value = false
                    })
                    editMode.value = false
                } else {
                    ElNotification({
                        title: "很遗憾",
                        message: "请完善信息",
                        type: "error",
                        duration: 3000
                    })
                    return
                }
            }
            break
        case 'worker':
            if (!editMode.value) { // 添加
                if (checkVisitor(1)) {// 信息无误
                    SystemUserManage.AddWorker(newUser.value).then((res) => {
                        if (res.data.result == 1) {
                            ElNotification({
                                title: "添加成功！",
                                message: "添加成功！",
                                type: "success",
                                duration: 3000
                            })
                            clearNewUser()
                            getWorkerList()
                            addDialog.value = false
                        } else {
                            ElNotification({
                                title: "添加失败",
                                message: res.data.message,
                                type: "error",
                                duration: 3000
                            })
                            clearNewUser()
                            // getManagerList()
                            addDialog.value = false
                        }
                    }).catch((err) => {
                        ElNotification({
                            title: "很遗憾",
                            message: err.message,
                            type: "error",
                            duration: 3000
                        })
                        clearNewUser()
                        // getManagerList()
                        addDialog.value = false
                    })
                } else {
                    ElNotification({
                        title: "很遗憾",
                        message: "请完善信息",
                        type: "error",
                        duration: 3000
                    })
                    return
                }
            } else { // 编辑
                if (checkVisitor(1)) {// 信息无误
                    SystemUserManage.EditWorker(newUser.value).then((res) => {
                        if (res.data.result == 1) {
                            ElNotification({
                                title: "修改成功！",
                                message: "修改成功！",
                                type: "success",
                                duration: 3000
                            })
                            clearNewUser()
                            getWorkerList()
                            addDialog.value = false
                        } else {
                            ElNotification({
                                title: "修改失败",
                                message: res.data.message,
                                type: "error",
                                duration: 3000
                            })
                            clearNewUser()
                            // getManagerList()
                            addDialog.value = false
                        }
                        editMode.value = false
                    }).catch((err) => {
                        ElNotification({
                            title: "很遗憾",
                            message: err.message,
                            type: "error",
                            duration: 3000
                        })
                        clearNewUser()
                        // getManagerList()
                        addDialog.value = false
                    })
                } else {
                    ElNotification({
                        title: "很遗憾",
                        message: "请完善信息",
                        type: "error",
                        duration: 3000
                    })
                    return
                }
            }
            break
        default:
            clearNewUser()
            addDialog.value = false
    }
}

//获取管理员列表
const getManagerList = () => {
    SystemUserManage.GetManagerList({}).then((res) => {
        // console.log(res)
        if (res.data.result == 1) {
            // ElNotification({
            //     title: "获取管理员列表成功",
            //     message: "获取管理员列表成功",
            //     type: "success",
            //     duration: 3000
            // })
            managerList.value = res.data.all_manager_information
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

//获取维修人员列表
const getWorkerList = () => {
    SystemUserManage.GetWorkList({}).then((res) => {
        // console.log(res)
        if (res.data.result == 1) {
            // ElNotification({
            //     title: "获取维修人员列表成功",
            //     message: "获取维修人员列表成功",
            //     type: "success",
            //     duration: 3000
            // })
            workerList.value = res.data.all_maintain_information
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

// 根据不同的状体选择标题
const selectTitle = () => {
    if(activeName.value == 'manager') {
        if(editMode.value) return '编辑管理员信息'
        return '添加管理员信息'
    } else {
        if(editMode.value) return '编辑维修人员信息'
        return '添加维修人员信息'
    }    
}

onMounted(() => {
    // 获取系统人员列表
    getManagerList()
    getWorkerList()
})
</script>
<style lang="scss" scoped>
.main-wrap {
    width: 100%;
    height: 100%;
    padding: 20px;
    
    .addBtn {
        float: right;
        // margin-right: 20px;
        margin-bottom: 10px;
    }
}

// 弹出框左侧标签
.left-tab {
    margin-right: 10px;
    display: inline-block;
    width: 90px;
    margin-bottom: 10px;
}

// 弹出框右侧组件
.right-content {
    max-width: 300px;
    margin: 10px 0px;
}

// 按钮
#loading-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

#shiny-shadow {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
  background: #1c2541;
}

.h-button {
  border: 2px solid white;
  background: transparent;
  text-transform: uppercase;
  color: white;
  padding: 10px 20px;
  outline: none;
  overflow: hidden;
  position: relative;
}

span {
  z-index: 20;  
}

.h-button:after {
  content: '';
    display: block;
    position: absolute;
    top: -36px;
    left: -100px;
    background: white;
    width: 50px;
    height: 125px;
    opacity: 20%;
    transform: rotate(-45deg);
}

.h-button:hover:after {
  left: 120%;
  transition: all 600ms cubic-bezier(0.3, 1, 0.2, 1);
   -webkit-transition: all 600ms cubic-bezier(0.3, 1, 0.2, 1);
}
</style>