<script lang="ts" setup>
import type { appointmentType } from '@/utils/type'
import { SuitcaseLine, Money, User, Clock } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/utils'
import { addOrder } from '@/request/api'
import { ref } from 'vue'
import showMsg from '@/utils/showMsg'
interface Props {
  appointment: appointmentType
}
const { appointment } = defineProps<Props>()
const appointmentDialogVisible = ref(false)
const visitorName = ref('')
const visitorCard = ref('')
const userId = sessionStorage.getItem('USERID')

const openAppointmentDialog = () => {
  appointmentDialogVisible.value = true
}

const comfirmAppointment = () => {
  if (!userId) {
    showMsg('warning', '请登陆后再操作')
    return
  }
  addOrder({
    scheduleId: appointment.id,
    visitorName: visitorName.value,
    visitorCard: visitorCard.value,
    userId
  }).then((res) => {
    showMsg('success', '预约成功')
    appointmentDialogVisible.value = false
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
        <el-link type="primary" @click="openAppointmentDialog">预约</el-link>
      </div>
    </template>
  </el-card>
  <el-dialog
    v-model="appointmentDialogVisible"
    title="预约信息填写"
    width="500"
    style="text-align: center"
  >
    <el-input v-model="visitorName" placeholder="请填写就诊人姓名" /><br /><br />
    <el-input v-model="visitorCard" placeholder="请填写就诊人卡号" /><br /><br />
    <el-button type="primary" @click="comfirmAppointment">确认预约</el-button>
  </el-dialog>
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
