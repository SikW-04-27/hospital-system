<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import HospitalInfo from '@/components/userComponents/detailComponents/HospitalInfo.vue'
import HospitalDepart from '@/components/userComponents/detailComponents/HospitalDepart.vue'
import { getHospById } from '@/request/api'
import { hospitalInfoType } from '@/utils/type'

const hospInfo = ref<hospitalInfoType | null>(null)

onMounted(() => {
  // 初始化数据
  // ...
  getHospById(1).then((res: any) => {
    console.log(res)
    hospInfo.value = res
  })
})
</script>

<template>
  <div class="detail">
    <HospitalInfo :hosp-info="hospInfo" />
    <el-divider style="margin: 5px 0" />
    <HospitalDepart :id="1" />
  </div>
</template>

<style lang="scss" scoped>
.detail {
  width: 100%;
  // display: flex;
  // justify-content: space-between;
}
</style>
