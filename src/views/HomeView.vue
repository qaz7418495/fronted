<template>
    <div class="home">
        <el-menu route="true" class="menu" :collapse="isCollapse" @open="handleOpen">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <location />
                    </el-icon>
                    <span>Navigator One</span>
                </template>
                <el-menu-item-group>
                    <template #title><span>Group One</span></template>
                    <el-menu-item index="/admin/vistorapplication">item one</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="Group Two">
                    <el-menu-item index="1-3">item three</el-menu-item>
                </el-menu-item-group>
                <el-sub-menu index="1-4">
                    <template #title><span>item four</span></template>
                    <el-menu-item index="1-4-1">item one</el-menu-item>
                </el-sub-menu>
            </el-sub-menu>
            <el-menu-item index="2">
                <el-icon><icon-menu /></el-icon>
                <template #title>Navigator Two</template>
            </el-menu-item>
            <el-menu-item index="3">
                <el-icon>
                    <Setting />
                </el-icon>
                <template #title>Navigator Three</template>
            </el-menu-item>
        </el-menu>
        <router-view>
        </router-view>
    </div>
</template>
  
<script setup>
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
} from '@element-plus/icons-vue'
const isCollapse = ref(false)
</script>
  
<style scoped lang="scss">
.menu {
    width: 200px;
    height: 100vh;
    background-color: #545c64;
}
.home{
    display: flex;
    height: 100vh;
    width: 100vw;
}
</style>
  