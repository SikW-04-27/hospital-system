<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import HospitalInfoCard from '@/components/common/HospitalInfoCard.vue'
import type { hospitalInfoType } from '@/utils/type'
import { delHosp, getHospitals } from '@/request/api'
import router from '@/router'
import { formatDate } from '@/utils/utils'
import { Delete, UploadFilled } from '@element-plus/icons-vue'
import showMsg from '@/utils/showMsg'

const searchText = ref('')
const selectLevel = ref('')
const totalNum = ref(0)
const hospitalInfoList: hospitalInfoType[] = reactive([])
const delHospIdList: number[] = reactive([])

// 获取医院信息列表
const getHospitalsList = (pageIndex: number = 1, pageSize: number = 10) => {
  getHospitals({
    current: pageIndex,
    size: pageSize,
    hospName: searchText.value,
    hospLevel: selectLevel.value
  }).then((res) => {
    const { records, total } = res
    hospitalInfoList.length = 0
    hospitalInfoList.push(...records)
    hospitalInfoList.forEach((item) => {
      item.createTime = formatDate(item.createTime)
    })
    totalNum.value = total
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

const handleSelectionChange = (val: hospitalInfoType[]) => {
  const tempDelHospIdList = val.map((item) => {
    return item.id
  })
  delHospIdList.length = 0
  delHospIdList.push(...tempDelHospIdList)
}

const delHosps = () => {
  if (delHospIdList.length === 0) {
    showMsg('warning', '请选择要删除的医院')
    return
  }
  const ids = delHospIdList.join(',')
  delHosp(ids).then((res) => {
    showMsg('success', '删除成功')
    getHospitalsList()
  })
}

const delOneHosp = (row: hospitalInfoType) => {
  const delHospId = row.id + ''
  delHosp(delHospId).then((res) => {
    showMsg('success', '删除成功')
    getHospitalsList()
  })
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
  <div class="operatorBtns">
    <el-button type="danger" :icon="Delete" circle @click="delHosps" />
    <el-button type="success" :icon="UploadFilled" circle />
  </div>
  <el-table
    table-layout="auto"
    :data="hospitalInfoList"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column fixed prop="id" label="编号" />
    <el-table-column prop="hospName" label="医院" />
    <el-table-column prop="hospPhone" label="联系电话" />
    <el-table-column prop="hospAddress" label="地址" />
    <el-table-column prop="hospLevel" label="医院等级" />
    <el-table-column prop="createTime" label="医院介绍" />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small"> 编辑 </el-button>
        <el-button link type="danger" size="small" @click="delOneHosp(scope.row)"> 删除 </el-button>
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
