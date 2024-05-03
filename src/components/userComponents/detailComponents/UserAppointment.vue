<template>
  <div></div>
  <div class="cardList">
    <AppointmentCard
      v-for="appointment in scheduleList"
      :key="appointment.id"
      :appointment="appointment"
    />
  </div>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :total="totalNum"
    />
  </div>
</template>

<script lang="ts" setup>
import AppointmentCard from '@/components/common/AppointmentCard.vue'
import { getSchedule } from '@/request/api'
import { appointmentType } from '@/utils/type'
import { onMounted, reactive, ref } from 'vue'

interface Props {
  departmentId: number
}
const { departmentId } = defineProps<Props>()
const scheduleList: appointmentType[] = reactive([])
const totalNum = ref(0)

const getScheduleList = (pageIndex: number = 1, pageSize: number = 10) => {
  getSchedule({
    current: pageIndex,
    size: pageSize,
    departmentId
  }).then((res) => {
    console.log(res)
    const { records, total } = res
    scheduleList.length = 0
    scheduleList.push(...records)
    totalNum.value = total
  })
}

const changePage = (index: number) => {
  // 切换页码
  console.log('切换页码', index)
  getScheduleList(index)
}

onMounted(() => {
  getScheduleList()
})
</script>

<style scoped lang="scss">
.cardList {
  display: flex;
  min-height: 300px;
  flex-wrap: wrap;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
