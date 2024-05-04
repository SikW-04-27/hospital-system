<script lang="ts" setup>
import UserNav from '@/components/common/UserNav.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <UserNav />
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>
