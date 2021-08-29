<template>
  <div class="line-chart">
    <div class="title-wrapper">
      <div class="title">慕课外卖骑手概况</div>
      <div class="sub-title">Rider Growth rate</div>
    </div>
    <div id="average-age-chart2">
      <vue-echarts :options="options"/>
    </div>
  </div>
</template>

<script>
  import { watch, onUnmounted, onMounted, ref } from 'vue'
  import VueEcharts from '../VueEcharts/VueEcharts'

  const colors = ['rgb(209,248,139)', 'rgb(115,201,245)', 'rgb(124,136,146)']

  export default {
    name: 'totalRider',
    props: {
      data: Object
    },
    components: {
      VueEcharts
    },
    setup (props) {
      let task
      let currentChart = 0
      const options = ref({})

      const update = () => {
        function createOption () {
          const { axisX, orderData, rateData } = props.data
          // 两种数据，一个是接单数据，一个是棋手增长率数据
          const axisData = axisX
          let legendData = []
          let data1 = []
          let data2 = []
          if (currentChart === 0) {
            legendData = [orderData.legend1, orderData.legend2]
            data1 = orderData.data1
            data2 = orderData.data2
          } else {
            legendData = [rateData.legend1, rateData.legend2]
            data1 = rateData.data1
            data2 = rateData.data2
          }
          return {
            color: colors,
            tooltip: {
              trigger: 'none',
              axisPointer: {
                type: 'cross'
              }
            },
            legend: {
              top: 20,
              right: 40,
              icon: 'rect',
              textStyle: {
                fontSize: 16,
                color: colors[2]
              },
              data: legendData
            },
            grid: {
              top: 60,
              bottom: 30,
              left: 80,
              right: 40
            },
            xAxis: [{
              type: 'category',
              axisTick: { show: false },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                fontSize: 16
              },
              data: axisData
            }, {
              type: 'category',
              axisTick: { show: false },
              axisLine: { show: false }
            }],
            yAxis: [{
              type: 'value',
              axisTick: { show: false },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                fontSize: 16
              },
              splitLine: {
                lineStyle: {
                  type: 'dotted'
                }
              }
            }],
            // 两条折现，分别对应data1和data2
            series: [{
              name: legendData[0],
              type: 'line',
              xAxisIndex: 1,
              smooth: true,
              lineStyle: {
                width: 2
              },
              symbol: 'none',
              data: data1
            }, {
              name: legendData[1],
              type: 'line',
              smooth: true,
              lineStyle: {
                width: 2
              },
              symbol: 'none',
              data: data2
            }]
          }
        }

        options.value = createOption()
        // 判断chart，进行chart-数据源的切换
        if (currentChart === 0) {
          currentChart = 1
        } else {
          currentChart = 0
        }
      }
      // 这里我们使用到了一个watch特性来实现setInterval
      const stop = watch(() => props.data, () => {
        // 数据变化时先更新数据源，更新图表
        // 然后执行stop()，它其实执行的是watch的返回值，将当前watch进行终止
        // 5s以后会自动完成update，并销毁watch，后续因为启动IntervalTask，会进行5s任务
        // 总结：通过执行watch返回函数来关掉监听器帮助我们解决和setInerval矛盾（多次渲染）问题
        update()
        task = setInterval(() => {
          update()
        }, 5000)
        stop()
      })
      onUnmounted(() => task && clearInterval(task))
      onMounted(() => {
        update()
      })
      return {
        options
      }
    }
  }
</script>

<style lang="scss" scoped>
  .line-chart {
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);

    .title-wrapper {
      padding: 20px 40px 0;
      box-sizing: border-box;

      .title {
        font-size: 32px;
      }

      .sub-title {
        font-size: 16px;
        margin-top: 10px;
      }
    }

    #average-age-chart2 {
      width: 100%;
      height: 250px;
    }
  }
</style>
