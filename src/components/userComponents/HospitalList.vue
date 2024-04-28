<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import HospitalInfoCard from '@/components/common/HospitalInfoCard.vue'
import type { hospitalInfoType } from '@/utils/type'
import { getHospitals } from '@/request/api'

const searchText = ref('')
const selectLevel = ref('')
const total = ref(0)
const hospitalInfoList: hospitalInfoType[] = reactive([])

// 获取医院信息列表
const getHospitalsList = (pageIndex: number = 1, pageSize: number = 10) => {
  getHospitals({
    current: pageIndex,
    size: pageSize,
    hospName: searchText.value,
    hospLevel: selectLevel.value
  }).then((res) => {
    const { records, total } = res
    console.log(records)
    hospitalInfoList.length = 0
    hospitalInfoList.push(...records)
    total.value = res.total
    console.log(res)
  })
}

const changePage = (index: number) => {
  // 切换页码
  console.log('切换页码', index)
  getHospitalsList(index)
}

const search = () => {
  getHospitalsList()
}

onMounted(() => {
  getHospitalsList()
})
</script>

<template>
  <div class="search-box">
    <el-input v-model="searchText" placeholder="Please input">
      <template #prepend>
        <el-select v-model="selectLevel" placeholder="医院等级" style="width: 120px">
          <el-option label="全部" value="" />
          <el-option label="一级" value="一级" />
          <el-option label="二级乙等" value="二级乙等" />
          <el-option label="二级甲等" value="二级甲等" />
          <el-option label="三级乙等" value="三级乙等" />
          <el-option label="三级甲等" value="三级甲等" />
        </el-select>
      </template>
    </el-input>
    <el-button type="primary" style="margin-left: 20px" @click="search">搜索</el-button>
  </div>
  <div class="cardList">
    <HospitalInfoCard
      v-for="hospitalInfo in hospitalInfoList"
      :key="hospitalInfo.id"
      :hospital-info="hospitalInfo"
    />
  </div>
  <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="changePage"
      :total="total"
    />
  </div>
</template>

<style>
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
</style>
