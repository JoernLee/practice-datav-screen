<template>
  <div class="echarts">

  </div>
</template>

<script>
  import { watch, onMounted } from 'vue'
  import Echarts from 'echarts'

  export default {
    name: 'VueEcharts',
    props: {
      options: Object
    },
    setup (ctx) {
      let dom
      let chart
      const initChart = () => {
        if (!chart) {
          dom = document.getElementsByClassName('echarts')[0]
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
    }
  }
</script>

<style scoped lang="scss">
  .echarts {
    width: 100%;
    height: 100%;
  }
</style>
