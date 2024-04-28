<script lang="ts" setup>
import Nav from '@/components/common/Nav.vue'
import { RouterView } from 'vue-router'
</script>
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Nav></Nav>
      </el-header>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>
