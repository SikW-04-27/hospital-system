<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import type { departmentType, hospitalInfoType } from '@/utils/type'
import { delHosp, getDepartment } from '@/request/api'
import { formatDate } from '@/utils/utils'
import { Delete, UploadFilled } from '@element-plus/icons-vue'
import showMsg from '@/utils/showMsg'

const totalNum = ref(0)
const departmentList: departmentType[] = reactive([])
const delDepartmentIdList: number[] = reactive([])
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
  console.log('切换页码', index)
  getDepartmentList(index)
}

const handleSelectionChange = (val: hospitalInfoType[]) => {
  const tempDelDepartmentIdList = val.map((item) => {
    return item.id
  })
  delDepartmentIdList.length = 0
  delDepartmentIdList.push(...tempDelDepartmentIdList)
}

const delHosps = () => {
  if (delDepartmentIdList.length === 0) {
    showMsg('warning', '请选择要删除的医院')
    return
  }
  const ids = delDepartmentIdList.join(',')
  // delHosp(ids).then((res) => {
  //   showMsg('success', '删除成功')
  //   getDepartmentList()
  // })
}

const editOneDepartment = (row: hospitalInfoType) => {
  dialogVisible.value = true
  Object.assign(form, row)
}

const delOneDepartment = (row: hospitalInfoType) => {
  const delHospId = row.id + ''
  // delHosp(delHospId).then((res) => {
  //   showMsg('success', '删除成功')
  //   getDepartmentList()
  // })
}

const confirmEdit = () => {
  // editHosp({
  //   ...form
  // })
  //   .then(() => {
  //     showMsg('success', '修改成功')
  //     getHospitalsList()
  //   })
  //   .catch(() => {
  //     showMsg('error', '删除成功')
  //   })
  //   .finally(() => {
  //     dialogVisible.value = false
  //   })
}

onMounted(() => {
  getDepartmentList()
})
</script>

<template>
  <div class="operatorBtns">
    <el-button type="danger" :icon="Delete" circle @click="delHosps" />
    <el-button type="success" :icon="UploadFilled" circle />
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
