<script setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const noSpace = {
  autoInsertSpace: false
}
</script>

<template>
  <el-config-provider :locale="zhCn" :button="noSpace">
    <RouterView />
   </el-config-provider>
</template>

<style scoped>
</style>
