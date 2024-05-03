<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { User, Lock, Connection } from '@element-plus/icons-vue'
import showMsg from '@/utils/showMsg'
import createLoading from '@/utils/loading'
import { getCode, login } from '@/request/api'
import router from '@/router'

type roleType = 'admin' | 'user'

const username = ref()
const password = ref()
const code = ref()
const role = ref<roleType>('user')
const codeImage = ref('')
const codeKey = ref('')

const getCodeImage = () => {
  getCode()
    .then((res) => {
      codeImage.value = res.codeImage
      codeKey.value = res.codeKey
    })
    .catch(() => {
      showMsg('error', '获取验证码失败')
    })
}

function loginbtn() {
  if (!username.value || !password.value) {
    showMsg('error', '请输入账号和密码')
    return
  }
  const loading = createLoading()

  login({
    userName: username.value,
    password: password.value,
    codeKey: codeKey.value,
    code: code.value
  })
    .then((res) => {
      if (!res) {
        showMsg('error', '登录失败')
        return
      }
      console.log(res.userId)

      sessionStorage.setItem('USERID', res.userId)
      showMsg('success', '登录成功')
      if (res.userFlag === 0) {
        router.push('/userHome/hospitalList')
      } else {
        // TODO：进入管理端
        router.push('/adminHome')
      }
    })
    .finally(() => {
      loading.close()
    })
}

onMounted(() => {
  getCodeImage()
})
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="font">
        <div>医疗系统</div>
      </el-header>
      <el-main>
        <el-input
          v-model="username"
          class="w-50 m-2"
          placeholder="请输入账号"
          :prefix-icon="User"
        ></el-input>
        <br />
        <el-input
          v-model="password"
          type="password"
          placeholder="请输入密码"
          show-password
          :prefix-icon="Lock"
        />
        <br />
        <el-input
          v-model="code"
          style="max-width: 600px"
          placeholder="请输入验证码"
          :prefix-icon="Connection"
        >
          <template #append>
            <img
              v-if="codeImage"
              :src="codeImage"
              style="height: 40px; cursor: pointer"
              @click="getCodeImage"
            />
            <span v-else>
              <a type="primary" style="padding: 0 10px" @click="getCodeImage">点击重新获取验证码</a>
            </span>
          </template>
        </el-input>
        <br />
        <el-radio-group v-model="role" style="margin: -20px 0 10px">
          <el-radio value="admin" size="large">管理端</el-radio>
          <el-radio value="user" size="large">用户端</el-radio>
        </el-radio-group>
        <br />
        <el-button type="primary" @click="loginbtn">登录</el-button>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss" scoped>
.common-layout {
  width: auto;
  .font {
    text-align: center;
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: #1a16fd;
    margin-top: 50px;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
      'Courier New', monospace;
  }
  .el-input {
    width: 400px;
    margin-bottom: 30px;
    :deep(.el-input__inner) {
      height: 40px !important;
    }
    &:focus {
      border: #1a16fd 1px solid;
    }
    :deep(.el-input-group__append) {
      padding: 0;
    }
  }
  .el-button {
    width: 400px;
    height: 40px;
  }
  .el-link {
    margin-top: 10px;
    margin-right: -250px;
  }
}
</style>
