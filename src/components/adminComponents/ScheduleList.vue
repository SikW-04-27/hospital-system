<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { userAppointmentRecordType } from '@/utils/type'
import { exportSchedule, getSchedule } from '@/request/api'
import { formatDate } from '@/utils/utils'
import { Delete, Download } from '@element-plus/icons-vue'
import showMsg from '@/utils/showMsg'
import FileImport from './fileModule/FileImport.vue'

const totalNum = ref(0)
const scheduleList: userAppointmentRecordType[] = reactive([])
const selectIdList: number[] = reactive([])

// 获取医院信息列表
const getScheduleList = (pageIndex: number = 1, pageSize: number = 10) => {
  getSchedule({
    current: pageIndex,
    size: pageSize
  }).then((res) => {
    const { records, total } = res
    scheduleList.length = 0
    scheduleList.push(...records)
    scheduleList.forEach((item) => {
      item.visitorDate = formatDate(item.visitorDate)
    })
    totalNum.value = total
    console.log(res)
  })
}

const changePage = (index: number) => {
  // 切换页码
  console.log('切换页码', index)
  getScheduleList(index)
}

const handleSelectionChange = (val: userAppointmentRecordType[]) => {
  const tempselectIdList = val.map((item) => {
    return item.id
  })
  selectIdList.length = 0
  selectIdList.push(...tempselectIdList)
}

const delSchedules = () => {
  if (selectIdList.length === 0) {
    showMsg('warning', '请选择要删除的医院')
    return
  }
  const ids = selectIdList.join(',')
  // delHosp(ids).then((res) => {
  //   showMsg('success', '删除成功')
  //   getScheduleList()
  // })
}

const downloadSchedules = () => {
  if (selectIdList.length === 0) {
    showMsg('warning', '请选择要下载的预约数据')
    return
  }
  const ids = selectIdList.join(',')
  exportSchedule(ids).then((res) => {
    getScheduleList()
  })
}

const delOneSchedule = (row: userAppointmentRecordType) => {
  const delHospId = row.id + ''
  // delHosp(delHospId).then((res) => {
  //   showMsg('success', '删除成功')
  //   getScheduleList()
  // })
}

onMounted(() => {
  getScheduleList()
})
</script>

<template>
  <div class="operatorBtns">
    <el-button type="danger" :icon="Delete" circle @click="delSchedules" />
    <FileImport file-module="schedule" />
    <el-button type="primary" :icon="Download" circle @click="downloadSchedules" />
  </div>
  <el-table
    table-layout="auto"
    :data="scheduleList"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column fixed prop="id" label="编号" />
    <el-table-column prop="departmentName" label="科室" />
    <el-table-column prop="visitorDate" label="预约日期" />
    <el-table-column prop="doctorName" label="医生" />
    <el-table-column prop="doctorPro" label="医生等级" />
    <el-table-column prop="visitorName" label="患者" />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button link type="danger" size="small" @click="delOneSchedule(scope.row)">
          删除
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

<style scoped>
.search-box {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
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
.operatorBtns {
  display: flex;
  justify-content: end;
}
</style>