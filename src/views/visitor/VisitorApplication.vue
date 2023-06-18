<template>
    <div class="main-warp">
        <el-button @click="addVisitorApplication()" class="btn addBtn">添加访客申请</el-button>
        <el-table v-if="visitorList.length == 0">
            <el-table-column prop="name" label="姓名" />
            <!-- <el-table-column prop="id_number" label="Name" width="180" /> -->
            <el-table-column prop="reservation_time" label="到访时间" />
            <el-table-column prop="application_time" label="申请时间" />
        </el-table>
        <el-empty v-else description="暂无信息"></el-empty>
        <el-dialog v-model="addVistorDialog" title="访客申请">
            <span class="left-tab">到访时间</span>
            <el-date-picker v-model="newVisitor.reservation_time" type="datetime" placeholder="Pick a Date"
                format="YYYY/MM/DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" :disabled-date="setDisableDate"/>
            <span class="left-tab">姓名</span>
            <el-input v-model="newVisitor.name"></el-input>
            <span class="left-tab">身份证号</span>
            <el-input v-model="newVisitor.id_number"></el-input>
            <span class="left-tab">手机号</span>
            <el-input v-model="newVisitor.phone_number"></el-input>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="cancelAddVisior()">取消</el-button>
                    <el-button type="primary" @click="addVisitorApplicationConfirm()">添加</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
// 设置禁用时间
const setDisableDate = (time) => {
    return time.getTime() < (Date.now()-(24 * 60 * 60 * 1000));
}

// 访客列表
const visitorList = ref([
    {
        name: 'Harbour',
        reservation_time: '2023-06-13-16-06-53',
        application_time: '2023-06-13-16-06-53',
        id_number: '1145141141514',
        phone_number: '110120119911'
    },
])
// 控制添加访客信息的弹出框
const addVistorDialog = ref(false)
// 新添加的访客
const newVisitor = ref({
    name: '',
    id_number: '',
    reservation_time: '',
    phone_number: ''
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
        phone_number: ''
    }
    addVistorDialog.value = false
}

// 检查信息是否完全有误
const checkVisitor = () => {
    for(key in newVisitor.value.keys) {
        console.log(key)
        if(newVisitor.value[key] == '') return false
    }
}

// 添加访客
const addVisitorApplicationConfirm = () => {
    // 判断访客信息是否填写完全 时间是否正确
    
    // 向后端发送请求 todo
}

//获取访客列表
const getVisitorList = () => {
    // todo
}

onMounted(() => {
    // 获取访客列表
    getVisitorList()
})
</script>
<style scoped>
.main-wrap {
    width: 100%;
    height: 100%;
    padding: 20px;

}
</style>