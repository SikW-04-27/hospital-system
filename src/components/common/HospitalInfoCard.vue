<script lang="ts" setup>
import type { hospitalInfoType } from '@/utils/type'
import { Histogram, PhoneFilled } from '@element-plus/icons-vue'
import hosptialAvatar from '@/assets/hospitalAvatar.jpg'
interface Props {
  hospitalInfo: hospitalInfoType
}
defineProps<Props>()
</script>

<template>
  <el-card class="card" :body-style="{ padding: '10px' }" shadow="hover">
    <div class="title">
      <el-avatar :size="30" :src="hosptialAvatar" />
      <span class="titleText">{{ hospitalInfo.hospName }}</span>
    </div>
    <div class="infoTagBox">
      <div class="infoTag">
        <el-icon class="infoTagIcon"><Histogram /></el-icon>
        <span class="infoTagText">{{ hospitalInfo.hospLevel }}</span>
      </div>
      <div class="infoTag">
        <el-icon class="infoTagIcon"><PhoneFilled /></el-icon>
        <span class="infoTagText">{{ hospitalInfo.hospPhone }}</span>
      </div>
    </div>
    <div class="intro">{{ hospitalInfo.hospIntroduce }}</div>
    <!-- <template #footer>Footer content</template> -->
  </el-card>
</template>

<style lang="scss" scoped>
.card {
  margin-right: 20px;
  width: 280px;
  height: fit-content;
  margin-bottom: 20px;
  cursor: pointer;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .titleText {
      font-size: 18px;
      font-weight: 600;
      margin-left: 15px;
    }
  }
  .infoTagBox {
    display: flex;
    margin-bottom: 5px;
    .infoTag {
      display: flex;
      align-items: center;
      margin-right: 20px;
      .infoTagIcon {
        font-size: 18px;
        margin-right: 5px;
      }
      .infoTagText {
        font-size: 14px;
      }
    }
  }

  .intro {
    font-size: 14px;
    color: rgb(140, 141, 141);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
