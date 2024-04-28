<script lang="ts" setup>
import { hospitalInfoType } from '@/utils/type'
import { Histogram } from '@element-plus/icons-vue'
import HospitalAvatar from '@/components/common/HospitalAvatar.vue'

interface Props {
  hospInfo: hospitalInfoType | null
}
defineProps<Props>()
</script>

<template>
  <div class="hospitalInfo">
    <div style="display: flex">
      <HospitalAvatar :size="100" />
      <div style="margin-left: 30px">
        <div class="hospitalInfoTitle">
          <span class="title">{{ hospInfo?.hospName }}</span>
          <div class="infoTagBox">
            <el-icon class="infoTagIcon"><Histogram /></el-icon>
            <span class="infoTagText">{{ hospInfo?.hospLevel }}</span>
          </div>
        </div>

        <div class="hospDescribeBox">
          <div class="describeTitle">联系电话</div>
          <div>{{ hospInfo?.hospPhone }}</div>
        </div>
        <div class="hospDescribeBox">
          <div class="describeTitle">医院地址</div>
          <div>{{ hospInfo?.hospAddress }}</div>
        </div>
      </div>
    </div>

    <el-divider style="margin: 5px 0" />

    <div class="hospDescribeBox">
      <div class="describeTitle">医院简介</div>
      <div style="color: #91949a">{{ hospInfo?.hospIntroduce }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hospitalInfo {
  width: 60%;
  padding: 0 10px;
  .hospitalInfoTitle {
    display: flex;
    height: 30px;
    align-items: center;
    font-size: 18px;
    margin-bottom: 10px;
    .title {
      font-size: 18px;
      font-weight: 600;
      margin-right: 10px;
      color: #333;
    }

    .infoTagBox {
      display: flex;
      align-items: center;
      .infoTagIcon {
        font-size: 16px;
        margin-right: 5px;
      }
      .infoTagText {
        font-size: 14px;
      }
    }
  }
  .hospDescribeBox {
    font-size: 14px;
    margin-bottom: 10px;
    .describeTitle {
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style>
