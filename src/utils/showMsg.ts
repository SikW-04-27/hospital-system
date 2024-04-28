import { ElMessage } from 'element-plus'

type msgType = 'success' | 'error' | 'warning'
export default function showMsg(type: msgType, message: string) {
  ElMessage({
    message,
    type
  })
}
