<script lang="ts" setup>
import { BASEURL } from '@/request/http'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadInstance } from 'element-plus'
import { ref } from 'vue'
type fileModuleType = 'hosp' | 'department' | 'schedule'

interface Props {
  fileModule: fileModuleType
}
const { fileModule } = defineProps<Props>()
const fileUploadDialogVisible = ref(false)
const uploadRef = ref<UploadInstance>()

const ALLUPLOADURLS = {
  hosp: '/hos/dict/hos/importHosp',
  department: '/hos/dict/hos/importDepartment',
  schedule: '/hos/dict/hos/importSchedule'
}
const UPLOADNAME = {
  hosp: 'hospFile',
  department: 'departmentFile',
  schedule: 'scheduleFile'
}
const uploadURL = BASEURL + ALLUPLOADURLS[fileModule]

const openFileUploadDialog = () => {
  fileUploadDialogVisible.value = true
}
</script>

<template>
  <div style="margin: 0 10px">
    <el-button type="success" :icon="UploadFilled" circle @click="openFileUploadDialog" />
  </div>
  <el-dialog v-model="fileUploadDialogVisible" title="文件上传" width="500">
    <el-upload
      :name="UPLOADNAME[fileModule]"
      ref="uploadRef"
      class="upload-demo"
      drag
      :action="uploadURL"
      multiple
      :limit="1"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽上传或 <em>点击上传</em></div>
    </el-upload>
  </el-dialog>
</template>
