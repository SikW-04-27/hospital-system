<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="编号" width="120" />
    <el-table-column prop="departmentName" label="挂号科室" width="150" />
    <el-table-column prop="visitorName" label="就诊人" width="150" />
    <el-table-column prop="doctorName" label="医生" width="150" />
    <el-table-column prop="resMoney" label="挂号费" width="150" />
    <el-table-column prop="visitorDate" label="预约时间" width="200" />
    <el-table-column prop="resStatus" label="预约状态" width="150" filter-placement="bottom-end">
      <template #default="scope">
        <el-tag :type="scope.row.resStatus === 1 ? 'success' : 'info'" disable-transitions>{{
          scope.row.resStatus === 1 ? '已预约' : '取消预约'
        }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button
          v-if="scope.row.resStatus === 1"
          link
          type="primary"
          size="small"
          @click="cancelAppointment(scope.row)"
        >
          取消预约
        </el-button>
      </template>
    </el-table-column>
  </el-table>
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
import { cancelOrder, getUserOrder } from '@/request/api'
import showMsg from '@/utils/showMsg'
import { userAppointmentRecordType } from '@/utils/type'
import { formatDate } from '@/utils/utils'
import { onMounted, reactive, ref } from 'vue'

const userId = sessionStorage.getItem('USERID')

const totalNum = ref(0)
const tableData: userAppointmentRecordType[] = reactive([])

const getUserOrderList = (pageIndex: number = 1, pageSize: number = 10) => {
  if (!userId) {
    showMsg('error', '请先登录')
    return
  }
  getUserOrder({
    current: pageIndex,
    size: pageSize,
    userId
  }).then((res) => {
    const { records, total } = res
    tableData.length = 0
    tableData.push(...records)
    tableData.forEach((item) => {
      item.visitorDate = formatDate(item.visitorDate, 'YYYY-MM-DD HH:mm')
    })
    totalNum.value = total
  })
}

const changePage = (index: number) => {
  // 切换页码
  getUserOrderList(index)
}

const cancelAppointment = (row: userAppointmentRecordType) => {
  cancelOrder(row.id).then((res) => {
    console.log(res)
    getUserOrderList()
  })
}

onMounted(() => {
  getUserOrderList()
})
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
