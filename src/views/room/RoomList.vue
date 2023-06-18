<template>
<div>
    <div>
        <div class="cardBox"></div>	
        <div style="display: flex">
            <div v-for="(i,index) in rooms" :key="index">
                <el-card class="text item box-card greycard" v-if="i.room.repair_status == 0 && i.room.is_rent == false">
                    <!-- 是否租用改背景颜色 -->
                    <div class="clearfix">
                        <span class="roomId">{{i.room.id}}</span>
                        <el-button style="float: right; padding: 3px 0; color: white" type="text">操作按钮</el-button>
                    </div>
                    <div>
                        <!-- 楼层+是否租用+用户名字 -->
                        <div class="text item">楼层：{{i.room.floor}}</div>
                        <div v-if="i.room.is_rent" class="text item">是否租用：是</div>
                        <div v-else class="text item">是否租用：否</div>
                        <div class="text item">租用用户：{{i.user}}</div>
                    </div>
                </el-card>
                <el-card class="text item box-card blackcard" v-if="i.room.repair_status == 0 && i.room.is_rent == true">
                    <!-- 是否租用改背景颜色 -->
                    <div class="clearfix">
                        <span class="roomId">{{i.room.id}}</span>
                        <el-button style="float: right; padding: 3px 0; color: white" type="text">操作按钮</el-button>
                    </div>
                    <div>
                        <!-- 楼层+是否租用+用户名字 -->
                        <div class="text item">楼层：{{i.room.floor}}</div>
                        <div v-if="i.room.is_rent" class="text item">是否租用：是</div>
                        <div v-else class="text item">是否租用：否</div>
                        <div class="text item">租用用户：{{i.user}}</div>
                    </div>
                </el-card>
                <el-card class="text item box-card redcard" v-if="(i.room.repair_status == 2 ? true : false)">
                    <!-- 是否租用改背景颜色 -->
                    <div class="clearfix">
                        <span class="roomId">{{i.room.id}}</span>
                        <el-button style="float: right; padding: 3px 0; color: white" type="text">操作按钮</el-button>
                    </div>
                    <div>
                        <!-- 楼层+是否租用+用户名字 -->
                        <div class="text item">楼层：{{i.room.floor}}</div>
                        <div v-if="i.room.is_rent" class="text item">是否租用：是</div>
                        <div v-else class="text item">是否租用：否</div>
                        <div class="text item">租用用户：{{i.user}}</div>
                    </div>
                </el-card>
                <el-card class="text item box-card redcard" v-if="(i.room.repair_status == 1 ? true : false)">
                    <!-- 是否租用改背景颜色 -->
                    <div class="clearfix">
                        <span class="roomId">{{i.room.id}}</span>
                        <el-button style="float: right; padding: 3px 0; color: white" type="text">操作按钮</el-button>
                    </div>
                    <div>
                        <!-- 楼层+是否租用+用户名字 -->
                        <div class="text item">楼层：{{i.room.floor}}</div>
                        <div v-if="i.room.is_rent" class="text item">是否租用：是</div>
                        <div v-else class="text item">是否租用：否</div>
                        <div class="text item">租用用户：{{i.user}}</div>
                    </div>
                </el-card>
            </div>
        </div>	
    </div>
</div>
</template>

<script setup>
import { useGlobalState } from "../../stores/state.js";
import { Room } from "../../api/room";
import { useRoute,useRouter } from "vue-router";
import { onBeforeMount } from "vue";
const globalState = useGlobalState();
const router = useRouter();
const route = useRoute();
const AUTHORIZATION = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6NiwibmFtZSI6Ilx1NWMwMVx1NTNmN1x1NjU5N1x1N2Y1NyIsInBob25lX251bWJlciI6IjEzMTcxODgwNTQ1IiwidXNlcl90eXBlIjoiMiIsImV4cCI6MTY4ODc4NzAxNC41NDA1NjA3fQ.H1rEV5jpu0Y5i4utM4US9PZGMrCIX5B5a7gvHlDmNHg";
var rooms = []
onMounted(()=>{
        Room.getRoomList().then((res)=>{
            rooms = res.data.rooms
            console.log(rooms)
        }).catch((err) =>{
            console.log(err)
        })
    }
)
</script>

<style scoped lang="scss">
.text {
    font-size: 14px;
}

.item {
    margin-top: 10px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both
}

.box-card {
    width: 300px;
    display: inline-block;
}

// 未租赁
.greycard {
    // position: absolute;
    // width: 280px;
    // height: 166px;
    // left: 500px;
    // top: 50px;

    background: #949494;
    opacity: 0.9;
    color: white;
}

// 已租赁
.blackcard {
    // position: absolute;
    // width: 280px;
    // height: 166px;
    // left: 500px;
    // top: 500px;

    background: #000000;
    opacity: 0.9;
    color: white;
}

// 待维修
.redcard {
    // position: absolute;
    // width: 280px;
    // height: 166px;
    // left: 500px;
    // top: 50px;
    // float: left;
    background: #ff1111;
    opacity: 0.9;
    color: white;
}

// 正在维修
.bluecard {
    // position: absolute;
    // width: 280px;
    // height: 166px;
    // left: 500px;
    // top: 50px;

    background: #21b9ff;
    opacity: 0.9;
    color: white;
}

.cardBox{
    background: url("../../assets/bg.png");
    height: 450px;
    width: 600px;
    position: absolute;
    background-size: 100% 100%;
    right: 0px;
    top: 250px;
}

.roomId{
    font-weight: bold;
    font-size: 1.7em;
    display: inline-block;
    top: -7px;
    position: relative;
}
</style>