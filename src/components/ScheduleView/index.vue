<template>
  <div class="schedule-view">
    <vue-echarts :options="options"/>
    <div class="bg1 bg"/>
    <div class="bg2 bg"/>
  </div>
</template>

<script>
import Echarts from 'echarts'
import VueEcharts from '@/components/VueEcharts/VueEcharts'
import { onMounted, ref } from 'vue'

export default {
  name: 'ScheduleView',
  components: { VueEcharts },
  setup () {
    const options = ref({})
    const update = () => {
      function getVirtualData (year) {
        year = year || '2020'
        const date = +Echarts.number.parseDate(year + '-06-01')
        const end = +Echarts.number.parseDate((+year + 1) + '-12-31')
        const dayTime = 3600 * 24 * 1000
        const data = []
        for (let time = date; time < end; time += dayTime) {
          data.push([
            Echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ])
        }
        return data
      }

      const data = getVirtualData(2020)

      options.value = {
        // 绘图的第一个部分 - 独立的日历组件
        calendar: [{
          top: 30,
          left: 80,
          right: 40,
          bottom: 10,
          range: ['2020-06-01', '2020-12-31'],
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgb(127, 127, 127)'
            }
          },
          yearLabel: { show: false },
          dayLabel: {
            color: 'rgb(127, 127, 127)',
            fontSize: 18
          },
          monthLabel: {
            color: 'rgb(127, 127, 127)',
            fontSize: 18
          },
          itemStyle: {
            color: 'rgb(48, 48, 48)',
            borderWidth: 1,
            borderColor: 'rgb(48, 48, 48)'
          }
        }],
        series: [
          {
            // 绘制一个散点图
            name: '步数',
            type: 'scatter',
            // 最重要，定义为日历格式
            coordinateSystem: 'calendar',
            // 传入数据
            data: data,
            symbolSize: function (val) {
              // 根据data数组第一个数据-value来定义点大小
              return val[1] / 600
            },
            itemStyle: {
              color: 'rgb(208,248,138)'
            }
          },
          {
            name: 'Top 12',
            type: 'effectScatter',
            coordinateSystem: 'calendar',
            // 只筛选value最大的12个点进行涟漪效果展示
            data: data.sort(function (a, b) {
              return b[1] - a[1]
            }).slice(0, 12),
            symbolSize: function (val) {
              return val[1] / 500
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            itemStyle: {
              color: 'rgb(208,248,138)',
              shadowBlur: 10,
              shadowColor: '#333'
            },
            zlevel: 1
          }
        ]
      }
    }
    onMounted(update)
    return {
      options
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-view {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background: rgb(48, 48, 48);
  padding: 20px 0;
  box-sizing: border-box;

  #schedule-view-chart {
    width: 100%;
    height: 100%;
  }

  .bg {
    width: 100%;
    height: 20px;
    background: rgb(72, 122, 72);
  }

  .bg1 {
    position: absolute;
    top: 0;
    left: 0;
  }

  .bg2 {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
