<script lang="ts" setup>
import type { appointmentType } from '@/utils/type'
import { SuitcaseLine, Money, User, Clock } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/utils'
import { addOrder } from '@/request/api'
interface Props {
  appointment: appointmentType
}
const { appointment } = defineProps<Props>()

const confirmAppointment = () => {
  console.log('确定预约')
  addOrder({
    scheduleId: appointment.id
  }).then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <el-card class="card" :body-style="{ padding: '10px' }" shadow="hover">
    <div class="title">
      <span class="titleText">{{ appointment.doctorName }}</span>
      <el-tag class="titleTag" size="small" type="primary">{{
        appointment.doctorIntroduce
      }}</el-tag>
    </div>
    <div class="infoTagBox">
      <div class="infoTag">
        <el-icon class="infoTagIcon"><SuitcaseLine /></el-icon>
        <span class="infoTagText">医生介绍：{{ appointment.doctorPro }}</span>
      </div>
      <div class="infoTag">
        <el-icon class="infoTagIcon"><Money /></el-icon>
        <span class="infoTagText">预约金额：{{ appointment.scheMoney }} 元</span>
      </div>
      <div class="infoTag">
        <el-icon class="infoTagIcon"><User /></el-icon>
        <span class="infoTagText">剩余预约数：{{ appointment.scheNumber }} </span>
      </div>
      <div class="infoTag">
        <el-icon class="infoTagIcon"><Clock /></el-icon>
        <span class="infoTagText"
          >预约日期：{{ formatDate(appointment.scheDate, 'YYYY-MM-DD HH:mm:ss') }}
        </span>
      </div>
    </div>

    <template #footer>
      <div class="footer">
        <el-popconfirm
          title="确定预约?"
          confirm-button-text="确定"
          cancel-button-text="取消"
          @confirm="confirmAppointment"
        >
          <template #reference>
            <el-link type="primary">预约</el-link>
          </template>
        </el-popconfirm>
      </div>
    </template>
  </el-card>
</template>

<style lang="scss" scoped>
.card {
  margin-right: 20px;
  width: 280px;
  height: fit-content;
  margin-bottom: 20px;
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .titleText {
      font-size: 18px;
      font-weight: 600;
      margin-left: 15px;
    }
    .titleTag {
      margin-left: 10px;
    }
  }
  .infoTagBox {
    // display: flex;
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
  .footer {
    text-align: center;
  }
}
</style>
