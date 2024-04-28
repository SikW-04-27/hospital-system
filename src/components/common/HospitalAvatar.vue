<script lang="ts" setup>
import hosptialAvatar from '@/assets/hospitalAvatar.jpg'
defineProps<{ size: number }>()
</script>

<template>
  <el-avatar :size="size" :src="hosptialAvatar" />
</template>
