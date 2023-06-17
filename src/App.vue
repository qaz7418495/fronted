<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import { RouterLink } from 'vue-router';
const noSpace = {
  autoInsertSpace: false
}
</script>

<template>
  <el-config-provider :locale="zhCn" :button="noSpace">
    <RouterLink to="/home">
      Home
    </RouterLink>
    <RouterLink to="/about">
      About
    </RouterLink>
    <RouterView />
   </el-config-provider>
</template>

<style scoped>
</style>
