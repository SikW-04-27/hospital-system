<template>
  <div class="title">
    <div class="titleLogo"></div>
    <div class="titleText">门诊选择</div>
  </div>
  <div class="departContainer">
    <DepartCard
      v-for="item in tableData"
      :key="item.id"
      :departInfo="item"
      @click="enterAppointment(item.id, item.departName)"
    />
  </div>
  <el-dialog v-model="dialogVisible" :title="departmentName" width="500" fullscreen>
    <UserAppointment :departmentId="departmentId" />
  </el-dialog>
</template>

<script lang="ts" setup>
import DepartCard from '@/components/common/DepartCard.vue'
import { getDepart } from '@/request/api'
import { departInfoType } from '@/utils/type'
import { onMounted, reactive, ref } from 'vue'
import UserAppointment from './UserAppointment.vue'

const tableData: departInfoType[] = reactive([])
const dialogVisible = ref(false)
const departmentId = ref(-1)
const departmentName = ref('')
const props = defineProps<{
  id: number
}>()
const { id } = props

const enterAppointment = (id: number, departName: string) => {
  console.log('进入预约')
  departmentId.value = id
  departmentName.value = departName
  dialogVisible.value = true
}

onMounted(() => {
  getDepart({
    hospId: id
  }).then((res) => {
    console.log(res)
    const { records } = res
    tableData.push(...records)
  })
})
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  margin: 10px 0;
  .titleLogo {
    width: 5px;
    height: 20px;
    background-color: rgb(98, 183, 240);
    margin-right: 10px;
  }
  .titleText {
    font-size: 16px;
    font-weight: 600;
  }
}
.departContainer {
  display: flex;
}
</style>
