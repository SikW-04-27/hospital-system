<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { hospitalInfoType } from '@/utils/type'
import { delHosp, editHosp, exportHosp, getHospitals } from '@/request/api'
import { formatDate } from '@/utils/utils'
import { Delete, Download } from '@element-plus/icons-vue'
import showMsg from '@/utils/showMsg'
import FileImport from './fileModule/FileImport.vue'

const searchText = ref('')
const selectLevel = ref('')
const totalNum = ref(0)
const hospitalInfoList: hospitalInfoType[] = reactive([])
const selectIdList: number[] = reactive([])
const dialogVisible = ref(false)
const form: Partial<hospitalInfoType> = reactive({})

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
  const tempselectIdList = val.map((item) => {
    return item.id
  })
  selectIdList.length = 0
  selectIdList.push(...tempselectIdList)
}

const delHosps = () => {
  if (selectIdList.length === 0) {
    showMsg('warning', '请选择要删除的医院')
    return
  }
  const ids = selectIdList.join(',')
  delHosp(ids).then((res) => {
    showMsg('success', '删除成功')
    getHospitalsList()
  })
}

const downloadHosps = () => {
  if (selectIdList.length === 0) {
    showMsg('warning', '请选择要下载的医院')
    return
  }
  const ids = selectIdList.join(',')
  exportHosp(ids).then((res) => {
    getHospitalsList()
  })
}

const editOneHosp = (row: hospitalInfoType) => {
  dialogVisible.value = true
  Object.assign(form, row)
}

const delOneHosp = (row: hospitalInfoType) => {
  const delHospId = row.id + ''
  delHosp(delHospId).then((res) => {
    showMsg('success', '删除成功')
    getHospitalsList()
  })
}

const confirmEdit = () => {
  editHosp({
    ...form
  })
    .then(() => {
      showMsg('success', '修改成功')
      getHospitalsList()
    })
    .catch(() => {
      showMsg('error', '删除成功')
    })
    .finally(() => {
      dialogVisible.value = false
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
    <FileImport file-module="hosp" />
    <el-button type="primary" :icon="Download" circle @click="downloadHosps" />
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
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="editOneHosp(scope.row)">
          编辑
        </el-button>
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
  <el-dialog v-model="dialogVisible" title="医院信息编辑" width="800">
    <el-form :model="form" label-width="auto">
      <el-form-item label="医院名字">
        <el-input v-model="form.hospName" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.hospPhone" />
      </el-form-item>
      <el-form-item label="医院地址">
        <el-input v-model="form.hospAddress" />
      </el-form-item>
      <el-form-item label="医院等级">
        <el-input v-model="form.hospLevel" />
      </el-form-item>
      <el-form-item label="医院等级">
        <el-radio-group v-model="form.hospLevel">
          <el-radio value="一级">一级</el-radio>
          <el-radio value="二级乙等">二级乙等</el-radio>
          <el-radio value="二级甲等">二级甲等</el-radio>
          <el-radio value="三级乙等">三级乙等</el-radio>
          <el-radio value="三级甲等">三级甲等</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="医院描述">
        <el-input v-model="form.hospIntroduce" type="textarea" />
      </el-form-item>
      <el-form-item>
        <div style="width: 100%; text-align: center">
          <el-button type="primary" @click="confirmEdit">确定编辑</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>
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
