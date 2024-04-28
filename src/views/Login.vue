<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock, Key } from '@element-plus/icons-vue'
import showMsg from '@/utils/showMsg'
import createLoading from '@/utils/loading'

type role = 'admin' | 'user'

const username = ref()
const password = ref()
const currentUserRole = ref<role>('user')

function loginbtn() {
  if (!username.value || !password.value) {
    showMsg('error', '请输入账号和密码')
    return
  }
  const loading = createLoading()
  // proxy.$X.API.LOGIN({
  //   username: username.value,
  //   password: password.value
  // })
  //   .then((result) => {
  //     const code = result.code
  //     loading.close()
  //     console.log(result)
  //     if (code === 0) {
  //       // proxy.$X.updata('manageinfo', result.data)
  //       sessionStorage.setItem('USERINFO', JSON.stringify(result.data))
  //       sessionStorage.setItem('USER', result.data.token)
  //       proxy.$X.router.replace({ path: '/SurveyCenter' })
  //       proxy.$X.showmes('success', '成功')
  //     } else {
  //       loading.close()
  //       proxy.$X.showmes('error', result.message)
  //     }
  //   })
  //   .catch((e) => {
  //     loading.close(e)
  //     proxy.$X.showmes('error', '请求失败，请重新登录')
  //   })
}

const changeRole = () => {
  currentUserRole.value = currentUserRole.value === 'admin' ? 'user' : 'admin'
}
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
        <el-button type="primary" @click="loginbtn" color="#1a16fd">登录</el-button><br />
        <el-link type="info" @click="changeRole">{{
          currentUserRole === 'admin' ? '用户登录' : '管理员登录'
        }}</el-link>
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
