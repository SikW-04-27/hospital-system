<template>
  <el-menu
    :default-active="activeIndex"
    class="nav"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0"> 医疗系统 </el-menu-item>
    <div class="flex-grow" />
    <el-avatar
      v-if="isLogin"
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      @click="toUserCenter"
    ></el-avatar>
    <el-link v-else type="primary" @click="toLogin">登录</el-link>
  </el-menu>
</template>

<script lang="ts" setup>
import router from '@/router'
import { ref } from 'vue'

const activeIndex = ref('1')
const isLogin = sessionStorage.getItem('USERID') !== null

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

const toLogin = () => {
  router.push('/login')
}

const toUserCenter = () => {
  router.push('/userHome/userCenter')
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.nav {
  display: flex;
  align-items: center;
}
</style>
