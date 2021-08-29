<template>
  <div class="hot-category">
    <div class="title-wrapper">
      <div class="left-part">
        <div class="title">当前热卖品类</div>
        <div class="sub-title">Hot Categories</div>
      </div>
      <div class="right-part">
        <div class="sub-title">最后更新时间：{{date}} {{time}}</div>
      </div>
    </div>
    <div id="hot-category-chart">
      <vue-echarts :options="options"/>
    </div>
  </div>
</template>

<script>
  import { watch, onMounted, ref } from 'vue'
  import { clock as useClock } from '../../utils/clock'
  import VueEcharts from '../VueEcharts/VueEcharts'

  export default {
    name: 'hotCategory',
    components: { VueEcharts },
    props: {
      data: Object
    },
    setup (props) {
      // 通过自定义hook来实现之前的filter功能，把时间戳转为humanTime
      const { time, date } = useClock()
      let currentChart = 0
      const options = ref({})
      const update = () => {
        function createOption () {
          const sourceData = []
          const { data1, data2 } = props.data
          if (currentChart === 0) {
            data1.axisX.forEach((axis, index) => {
              sourceData.push([axis, data1.data1[index], data1.data2[index]])
            })
          } else {
            data2.axisX.forEach((axis, index) => {
              sourceData.push([axis, data2.data1[index], data2.data2[index]])
            })
          }
          const source = [
            ['指标', '国内', '海外'],
            ...sourceData
          ]
          return {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            color: ['rgb(209,248,138)', 'rgba(65,65,65,.5)'],
            grid: {
              left: 20,
              right: 0,
              bottom: 30,
              top: 20
            },
            dataset: {
              source
            },
            yAxis: {
              type: 'value',
              splitLine: {
                lineStyle: {
                  type: 'dotted'
                }
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'rgb(124,136,146)'
                }
              },
              axisLabel: {
                color: 'rgb(98,105,113)',
                fontSize: 16
              },
              axisTick: { show: false }
            },
            xAxis: {
              type: 'category',
              splitLine: { show: false },
              axisTick: { show: false },
              axisLabel: {
                color: 'rgb(98,105,113)',
                fontSize: 16
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: 'rgb(124,136,146)'
                }
              }
            },
            series: [
              {
                type: 'bar',
                stack: 'total',
                barWidth: 40
              },
              {
                type: 'bar',
                stack: 'total'
              }
            ]
          }
        }

        options.value = createOption()
        currentChart === 0 ? currentChart = 1 : currentChart = 0
      }
      watch(() => props.data, () => {
        update()
      })
      onMounted(() => {
        update()
      })
      return {
        time,
        date,
        options
      }
    }
  }
</script>

<style lang="scss" scoped>
  .hot-category {
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);
    padding: 20px 40px;
    box-sizing: border-box;

    .title-wrapper {
      display: flex;

      .right-part {
        flex: 1;
        text-align: right;
      }

      .title {
        font-size: 32px;
      }

      .sub-title {
        font-size: 16px;
        margin-top: 10px;
      }
    }

    #hot-category-chart {
      height: 250px;
    }
  }
</style>
