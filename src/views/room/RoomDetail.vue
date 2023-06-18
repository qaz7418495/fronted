<template>

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

</style>