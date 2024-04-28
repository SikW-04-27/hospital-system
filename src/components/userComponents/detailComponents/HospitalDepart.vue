<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="departName" label="门诊" width="180" />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="enterAppointment"> 进入预约 </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import { getDepart } from '@/request/api'
import { departInfoType } from '@/utils/type'
import { onMounted, reactive } from 'vue'

const tableData: departInfoType[] = reactive([])
const props = defineProps<{
  id: number
}>()
const { id } = props

const enterAppointment = () => {
  console.log('进入预约')
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
