<template>
  <el-menu
    :default-active="activeIndex"
    class="nav"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <!-- <el-menu-item index="0"> 医疗系统 </el-menu-item> -->
    <span class="logo" @click="toHomePage">医疗系统</span>
    <div class="flex-grow" />

    <el-dropdown v-if="isLogin">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        style="cursor: pointer"
      ></el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="toUserCenter">用户中心</el-dropdown-item>
          <el-dropdown-item @click="toMedicalRemind">预约提醒</el-dropdown-item>
          <el-dropdown-item @click="toLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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

const toHomePage = () => {
  router.push('/userHome/hospitalList')
}

const toUserCenter = () => {
  router.push('/userHome/userCenter')
}
const toMedicalRemind = () => {
  router.push('/userHome/medicalRemind')
}

const toLogin = () => {
  sessionStorage.clear()
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.flex-grow {
  flex-grow: 1;
}
.nav {
  display: flex;
  align-items: center;
  .logo {
    font-weight: 600;
    font-size: 22px;
    font-family: cursive;
    font-style: italic;
    cursor: pointer;
  }
}
</style>
