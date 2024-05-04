<script lang="ts" setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import AdminNav from '@/components/common/AdminNav.vue'
</script>
<template>
  <el-container class="layout-container">
    <el-container>
      <el-aside width="200px">
        <el-scrollbar>
          <AdminNav />
        </el-scrollbar>
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped></style>
