<script lang="ts" setup>
import { showMessage } from '@/request/api'
import { remindType } from '@/utils/type'
import { onMounted, reactive, ref } from 'vue'
const userId = sessionStorage.getItem('USERID')
const userRemindList: remindType[] = reactive([])
const totalNum = ref(0)
const getUserReminds = (pageIndex: number = 1, pageSize: number = 5) => {
  showMessage({
    current: pageIndex,
    size: pageSize,
    userId: userId
  }).then((res) => {
    const { records, total } = res
    userRemindList.length = 0
    userRemindList.push(...records)
    totalNum.value = total
    console.log(res)
  })
}

const changePage = (index: number) => {
  // 切换页码
  getUserReminds(index)
}

onMounted(() => {
  getUserReminds()
})
</script>

<template>
  <div v-if="userRemindList.length > 0">
    <div class="remindList">
      <el-card class="remindItem" v-for="item in userRemindList" :key="item.id">
        {{ item.message }}
      </el-card>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="changePage"
        :total="totalNum"
        :page-size="5"
      />
    </div>
  </div>

  <el-empty v-else :image-size="200" />
</template>

<style scoped lang="scss">
.remindList {
  min-height: 300px;
  .remindItem {
    margin-bottom: 10px;
  }
}
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
