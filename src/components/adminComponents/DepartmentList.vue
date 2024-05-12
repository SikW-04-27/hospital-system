<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { departmentType } from '@/utils/type'
import { delDepartment, editDepartment, exportDepartment, getDepartment } from '@/request/api'
import { formatDate } from '@/utils/utils'
import { Delete, Download } from '@element-plus/icons-vue'
import showMsg from '@/utils/showMsg'
import FileImport from './fileModule/FileImport.vue'
import { BASEURL } from '@/request/http'

const totalNum = ref(0)
const departmentList: departmentType[] = reactive([])
const selectIdList: number[] = reactive([])
const dialogVisible = ref(false)
const form: Partial<departmentType> = reactive({})

// 获取医院信息列表
const getDepartmentList = (pageIndex: number = 1, pageSize: number = 10) => {
  getDepartment({
    current: pageIndex,
    size: pageSize
  }).then((res) => {
    const { records, total } = res
    departmentList.length = 0
    departmentList.push(...records)
    departmentList.forEach((item) => {
      item.createTime = formatDate(item.createTime)
    })
    totalNum.value = total
    console.log(res)
  })
}

const changePage = (index: number) => {
  // 切换页码
  getDepartmentList(index)
}

const handleSelectionChange = (val: departmentType[]) => {
  const tempselectIdList = val.map((item) => {
    return item.id
  })
  selectIdList.length = 0
  selectIdList.push(...tempselectIdList)
}

const delDepartments = () => {
  if (selectIdList.length === 0) {
    showMsg('warning', '请选择要删除的医院')
    return
  }
  const ids = selectIdList.join(',')
  delDepartment(ids).then(() => {
    showMsg('success', '删除成功')
    getDepartmentList()
  })
}

const downloadDepartments = () => {
  if (selectIdList.length === 0) {
    showMsg('warning', '请选择要下载的医院')
    return
  }
  const ids = selectIdList.join(',')
  window.open(`${BASEURL}hos/dict/hos/exportDepartment/${ids}`)
}

const editOneDepartment = (row: departmentType) => {
  dialogVisible.value = true
  Object.assign(form, row)
}

const delOneDepartment = (row: departmentType) => {
  const delDepartmentId = row.id + ''
  delDepartment(delDepartmentId).then(() => {
    showMsg('success', '删除成功')
    getDepartmentList()
  })
}

const confirmEdit = () => {
  editDepartment({
    ...form
  })
    .then(() => {
      showMsg('success', '修改成功')
      getDepartmentList()
    })
    .catch(() => {
      showMsg('error', '删除成功')
    })
    .finally(() => {
      dialogVisible.value = false
    })
}

onMounted(() => {
  getDepartmentList()
})
</script>

<template>
  <div class="operatorBtns">
    <el-button type="danger" :icon="Delete" circle @click="delDepartments" />
    <FileImport file-module="department" />
    <el-button type="primary" :icon="Download" circle @click="downloadDepartments" />
  </div>
  <el-table
    table-layout="auto"
    :data="departmentList"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column fixed prop="id" label="编号" />
    <el-table-column prop="departmentName" label="科室" />
    <el-table-column prop="departmentAddress" label="地址" />
    <el-table-column prop="departName" label="所属门诊" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column fixed="right" label="操作">
      <template #default="scope">
        <el-button link type="primary" size="small" @click="editOneDepartment(scope.row)">
          编辑
        </el-button>
        <el-button link type="danger" size="small" @click="delOneDepartment(scope.row)">
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
  <el-dialog v-model="dialogVisible" title="医院信息编辑" width="800">
    <el-form :model="form" label-width="auto">
      <el-form-item label="科室名字">
        <el-input v-model="form.departmentName" />
      </el-form-item>
      <el-form-item label="科室地址">
        <el-input v-model="form.departmentAddress" />
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
