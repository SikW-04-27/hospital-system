<script lang="ts" setup>
import { ref } from 'vue'
import {
  OfficeBuilding,
  Calendar,
  Refrigerator,
  User,
  Histogram,
  Wallet
} from '@element-plus/icons-vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <el-container class="layout-container">
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu default-active="hospitalList" style="height: 100vh">
            <el-menu-item index="hospitalList">
              <el-icon><OfficeBuilding /></el-icon>
              <span>医院管理</span>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon><Refrigerator /></el-icon>
              <span>科室管理</span>
            </el-menu-item>
            <el-menu-item index="3">
              <el-icon><Calendar /></el-icon>
              <span>排班管理</span>
            </el-menu-item>
            <el-menu-item index="4">
              <el-icon><User /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="5">
              <el-icon><Wallet /></el-icon>
              <span>订单管理</span>
            </el-menu-item>
            <el-menu-item index="6">
              <el-icon><Histogram /></el-icon>
              <span>统计管理</span>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
