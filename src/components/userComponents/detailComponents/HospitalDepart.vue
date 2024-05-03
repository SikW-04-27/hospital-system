<template>
  <div class="title">
    <div class="titleLogo"></div>
    <div class="titleText">门诊选择</div>
  </div>
  <div class="departContainer">
    <DepartCard v-for="item in tableData" :key="item.id" :departInfo="item" />
  </div>
</template>

<script lang="ts" setup>
import DepartCard from '@/components/common/DepartCard.vue'
import { getDepart } from '@/request/api'
import { departInfoType } from '@/utils/type'
import { onMounted, reactive } from 'vue'

const tableData: departInfoType[] = reactive([])
const props = defineProps<{
  id: number
}>()
const { id } = props

onMounted(() => {
  getDepart({
    hospId: id
  }).then((res) => {
    const { records } = res
    tableData.push(...records)
  })
})
</script>

<style scoped lang="scss">
.title {
  display: flex;
  align-items: center;
  margin: 10px 0;
  .titleLogo {
    width: 5px;
    height: 20px;
    background-color: rgb(98, 183, 240);
    margin-right: 10px;
  }
  .titleText {
    font-size: 16px;
    font-weight: 600;
  }
}
.departContainer {
  display: flex;
}
</style>
