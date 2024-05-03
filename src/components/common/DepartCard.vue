<script lang="ts" setup>
import type { departInfoType, departmentType } from '@/utils/type'
import { Clock } from '@element-plus/icons-vue'
import { formatDate } from '@/utils/utils'
import { reactive, ref } from 'vue'
import { getDepartment } from '@/request/api'
import UserAppointment from '@/components//userComponents/detailComponents/UserAppointment.vue'
interface Props {
  departInfo: departInfoType
}
defineProps<Props>()

const departmentSelectDialog = ref(false)
const departmentList: departmentType[] = reactive([])
const departmentSelect = ref()
const appointmentDialog = ref(false)

const enterSelectDepartment = (id: number) => {
  getDepartment({
    departId: id
  })
    .then((res) => {
      const { records } = res
      departmentList.length = 0
      departmentList.push(...records)
    })
    .finally(() => {
      departmentSelectDialog.value = true
    })
}

const enterAppointment = () => {
  appointmentDialog.value = true
  departmentSelectDialog.value = false
}
</script>

<template>
  <el-card
    class="card"
    :body-style="{ padding: '10px' }"
    shadow="hover"
    @click="enterSelectDepartment(departInfo.id)"
  >
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

  <el-dialog v-model="departmentSelectDialog" title="选择科室" width="500" destroy-on-close>
    <el-select v-model="departmentSelect" placeholder="请选择科室">
      <el-option
        v-for="item in departmentList"
        :key="item.id"
        :label="item.departmentName"
        :value="item.id"
      />
    </el-select>
    <div style="text-align: center; margin-top: 20px">
      <el-button type="primary" @click="enterAppointment">确 认</el-button>
    </div>
  </el-dialog>
  <el-dialog v-model="appointmentDialog" title="预约" width="500" fullscreen destroy-on-close>
    <UserAppointment :departmentId="departmentSelect" />
  </el-dialog>
</template>

<style lang="scss" scoped>
.card {
  margin-right: 20px;
  width: 280px;
  height: fit-content;
  margin-bottom: 20px;
  &:hover {
    transition: 0.5s;
    // background-color: rgb(201, 238, 224);
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
