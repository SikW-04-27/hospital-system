<script lang="ts" setup>
import router from '@/router'
import {
  OfficeBuilding,
  Calendar,
  Refrigerator,
  User,
  Histogram,
  Wallet
} from '@element-plus/icons-vue'

const handleSelect = (key: string, keyPath: string[]) => {
  router.push(`/adminHome/${key}`)
}
</script>

<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="hospitalList"
    text-color="#fff"
    style="height: 100vh"
    @select="handleSelect"
  >
    <el-menu-item index="hospitalList">
      <el-icon><OfficeBuilding /></el-icon>
      <span>医院管理</span>
    </el-menu-item>
    <el-menu-item index="departmentList">
      <el-icon><Refrigerator /></el-icon>
      <span>科室管理</span>
    </el-menu-item>
    <el-menu-item index="scheduleList">
      <el-icon><Calendar /></el-icon>
      <span>排班管理</span>
    </el-menu-item>
    <el-menu-item index="userList">
      <el-icon><User /></el-icon>
      <span>用户管理</span>
    </el-menu-item>
    <el-menu-item index="appointmentList">
      <el-icon><Wallet /></el-icon>
      <span>订单管理</span>
    </el-menu-item>
    <!-- <el-menu-item index="6">
      <el-icon><Histogram /></el-icon>
      <span>统计管理</span>
    </el-menu-item> -->
  </el-menu>
</template>
