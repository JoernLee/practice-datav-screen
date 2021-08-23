<template>
  <div class="average-age">
    <div class="title-wrapper">
      <div class="left">
        <div class="title">慕课外卖用户年龄分布&平均年龄</div>
        <div class="sub-title">Distribution of Age</div>
      </div>
      <div class="right">
        <div class="age">
          <vue-count-to
            :startVal="startAge"
            :endVal="avgAge"
            :duration="1000"
            :decimals="2"
          />
          <span class="age-unit">岁</span>
        </div>
      </div>
    </div>
    <div id="average-age-chart">
      <vue-echarts :options="options"/>
    </div>
    <div class="average-data-wrapper">
      <div class="average-data" v-for="(item, index) in data" :key="index">
        <div class="average-data-value">
          <vue-count-to
            :startVal="item.startValue"
            :endVal="item.value"
            :duration="1000"
          />
        </div>
        <div class="average-data-axis">
          <div class="point" :style="{background: item.color}"/>
          <div class="text">{{item.axis}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, watch, onMounted } from 'vue'
  import VueCountTo from '../VueCountTo/vue-countTo'
  import VueEcharts from '../VueEcharts/VueEcharts'

  // const color = ['rgb(116,166,49)', 'rgb(190,245,99)', 'rgb(202,252,137)', 'rgb(251,253,142)']

  export default {
    name: 'averageAge',
    components: {
      VueCountTo,
      VueEcharts
    },
    props: {
      data: Array,
      avgAge: Number
    },
    setup (ctx) {
      const startAge = ref(0)
      const options = ref(null)
      const updateChart = () => {
        // 基于外部传入的props-data来更新内部echart需要用到的图表数据
        const data = ['指标']
        const color = []
        const axis = ['指标']
        let max = 0
        ctx.data.forEach(item => {
          data.push(item.value)
          color.push(item.color)
          axis.push(item.axis)
          max += +item.value
        })
        options.value = {
          color,
          grid: {
            //  调整图表位置,有时候图表不出来可以尝试调节这个属性
            left: 40,
            right: 40,
            top: 0
          },
          dataset: {
            source: [
              axis,
              data
            ]
          },
          // 横向图表，是对Y轴进行分类，所以X轴是value类型
          xAxis: {
            type: 'value',
            max,
            //  定制一些X轴样式
            splitLine: {
              lineStyle: {
                color: 'rgb(50,51,53)',
                width: 3
              }
            },
            axisTick: { show: false },
            axisLabel: {
              color: 'rgb(98,105,113)',
              fontSize: 18
            }
          },
          yAxis: {
            type: 'category',
            show: false
          },
          series: [
            // 配置四个数据的展现
            {
              type: 'bar',
              stack: 'total',
              barWidth: 15
            }, {
              type: 'bar',
              stack: 'total'
            }, {
              type: 'bar',
              stack: 'total'
            }, {
              type: 'bar',
              stack: 'total'
            }
          ],
          tooltip: {
            //  支持交互
            textStyle: {
              fontSize: 28
            },
            padding: 10
          }
        }
      }
      watch(() => ctx.avgAge, (nextValue, prevValue) => {
        startAge.value = prevValue
      })
      watch(() => ctx.data, () => {
        updateChart()
      })
      onMounted(() => {
        updateChart()
      })

      return {
        startAge,
        options
      }
    }
  }
</script>

<style lang="scss" scoped>
  .average-age {
    width: 100%;
    height: 100%;
    background: rgb(43, 44, 46);
    padding: 10px 20px;
    box-sizing: border-box;

    .title-wrapper {
      display: flex;
      align-items: center;

      .left {
        max-width: 75%;

        .title {
          font-size: 32px;
        }

        .sub-title {
          font-size: 16px;
          margin-top: 10px;
        }
      }

      .right {
        flex: 1;
        font-weight: bold;

        .age {
          font-size: 38px;
          font-family: DIN;

          .age-unit {
            font-size: 20px;
          }
        }
      }
    }

    #average-age-chart {
      height: 120px;
    }

    .average-data-wrapper {
      display: flex;

      .average-data {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 30px;
        font-weight: bolder;

        .average-data-value {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .average-data-axis {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin-top: 5px;

          .point {
            width: 10px;
            height: 10px;
            border-radius: 50%;
          }

          .text {
            margin-left: 10px;
            font-size: 16px;
          }
        }
      }
    }
  }
</style>
