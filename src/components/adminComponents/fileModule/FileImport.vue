<script lang="ts" setup>
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
const uploadURL = 'http://8.134.48.185' + ALLUPLOADURLS[fileModule]

const openFileUploadDialog = () => {
  fileUploadDialogVisible.value = true
}

const confirmImport = () => {
  console.log(uploadRef.value)
}
</script>

<template>
  <div style="margin: 0 10px">
    <el-button type="success" :icon="UploadFilled" circle @click="openFileUploadDialog" />
  </div>
  <el-dialog v-model="fileUploadDialogVisible" title="文件上传" width="500">
    <el-upload ref="uploadRef" class="upload-demo" drag :action="uploadURL" multiple :limit="1">
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">拖拽上传或 <em>点击上传</em></div>
    </el-upload>
    <template #footer>
      <div class="dialog-footer">
        <el-button>Cancel</el-button>
        <el-button type="primary" @click="confirmImport"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>
