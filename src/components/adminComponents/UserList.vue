<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { userAppointmentRecordType } from '@/utils/type'
import { getAllUser } from '@/request/api'
import { formatDate } from '@/utils/utils'

const totalNum = ref(0)
const userList: userAppointmentRecordType[] = reactive([])

// 获取医院信息列表
const getScheduleList = (pageIndex: number = 1, pageSize: number = 10) => {
  getAllUser({
    current: pageIndex,
    size: pageSize
  }).then((res) => {
    const { records, total } = res
    userList.length = 0
    userList.push(...records)
    userList.forEach((item) => {
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

onMounted(() => {
  getScheduleList()
})
</script>

<template>
  <el-table table-layout="auto" :data="userList" style="width: 100%">
    <el-table-column fixed prop="id" label="编号" />
    <el-table-column prop="userName" label="用户名" />
    <el-table-column prop="nickName" label="昵称" />
    <el-table-column prop="phone" label="联系电话" />
    <el-table-column prop="card" label="卡号" />
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
