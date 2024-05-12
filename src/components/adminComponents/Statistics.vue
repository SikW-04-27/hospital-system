<script lang="ts" setup>
import { countOrder } from '@/request/api'
import { formatDate } from '@/utils/utils'
import { nextTick, onMounted, reactive, ref } from 'vue'
import * as echarts from 'echarts'

const time = ref('')
const echartsDOM = ref<HTMLElement | null>(null)
let echartsInstance: any
const xAxisArr: string[] = reactive([])
const yAxisArr: number[] = reactive([])

const option = {
  xAxis: {
    type: 'category',
    data: xAxisArr,
    axisLabel: { interval: 0, rotate: 30 }
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: yAxisArr,
      type: 'bar'
    }
  ]
}
const statistics = () => {
  console.log(time.value)
  countOrder({
    startTime: formatDate(time.value[0]),
    endTime: formatDate(time.value[1])
  }).then((res) => {
    console.log(res)
    res.forEach((item: any) => {
      xAxisArr.push(formatDate(item.visitorDate, 'YYYY-MM-DD HH:mm'))
      yAxisArr.push(item.num)
    })
    console.log(option)
    echartsInstance.setOption(option)
  })
}
nextTick(() => {
  echartsInstance = echarts.init(echartsDOM.value!)
  console.log(echartsInstance)
})
</script>

<template>
  <div>
    <el-date-picker
      v-model="time"
      type="daterange"
      start-placeholder="Start Date"
      end-placeholder="End Date"
      :default-value="[new Date(2024, 3, 1), new Date(2024, 6, 6)]"
    />
    <el-button style="margin-left: 20px" type="primary" @click="statistics">统计 </el-button>
  </div>
  <div ref="echartsDOM" style="width: 900px; height: 400px"></div>
</template>
