<template>
  <!--  class作为一个复合值，避免css无法应用，也避免className重复-->
  <div :class="[className, 'echarts']">

  </div>
</template>

<script>
  import { watch, onMounted } from 'vue'
  import Echarts from 'echarts'
  import { v4 as uuidv4 } from 'uuid'

  export default {
    name: 'VueEcharts',
    props: {
      options: Object
    },
    setup (ctx) {
      let dom
      let chart
      // 保证每一个生成的echarts组件的className唯一，否则会被后续组件的class样式覆盖掉，造成混乱
      // 也可以通过timestamp，不过uuid是最可靠的
      const className = `echarts${uuidv4()}`
      const initChart = () => {
        if (!chart) {
          dom = document.getElementsByClassName(className)[0]
          chart = Echarts.init(dom, ctx.theme)
        }
        if (ctx.options) {
          chart.setOption(ctx.options)
        }
      }
      onMounted(() => {
        initChart()
      })
      watch(() => ctx.options, () => {
        initChart()
      })
      return {
        className
      }
    }
  }
</script>

<style scoped lang="scss">
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
