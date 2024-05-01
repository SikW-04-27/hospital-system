<script lang="ts" setup>
import type { departInfoType } from '@/utils/type'
import { Clock } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/utils'
interface Props {
  departInfo: departInfoType
}
defineProps<Props>()
</script>

<template>
  <el-card class="card" :body-style="{ padding: '10px' }" shadow="hover">
    <div class="title">
      <span class="titleText">{{ departInfo.departName }}</span>
    </div>
    <div class="infoTagBox">
      <div class="infoTag">
        <el-icon class="infoTagIcon"><Clock /></el-icon>
        <span class="infoTagText">创建时间：{{ formatDate(departInfo.createTime) }}</span>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.card {
  margin-right: 20px;
  width: 280px;
  height: fit-content;
  margin-bottom: 20px;
  &:hover {
    transition: 0.5s;
    background-color: rgb(201, 238, 224);
    cursor: pointer;
  }
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
