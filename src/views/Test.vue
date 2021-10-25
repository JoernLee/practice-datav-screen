<template>
  <div style="width: 100%;height: 100%">
    <vue-echarts :options="options"/>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import VueEcharts from '../components/VueEcharts/VueEcharts'

  export default {
    components: { VueEcharts },
    setup () {
      const options = ref({})

      const update = () => {
        options.value = {
          // baseOption在timeline中和options来结合，确定取的数据index
          // options给变化组件用，base给timeline用
          baseOption: {
            timeline: {
              axisType: 'category',
              controlStyle: {
                position: 'left'
              },
              // 打开自动播放
              autoPlay: true,
              playInterval: 1000,
              loop: true, // 循环播放
              inverse: false, // 是否反向放置timeline
              rewind: false, // 是否反向播放
              currentIndex: 1, // 初始播放节点
              realtime: true, // 拖动圆点是否实时渲染视图
              data: [
                {
                  value: '2002-01-01',
                  // 切换节点图表
                  symbol: 'diamond',
                  symbolSize: 18
                },
                '2003-01-01',
                '2004-01-01',
                '2005-01-01',
                '2006-01-01',
                {
                  value: '2007-01-01',
                  symbol: 'triangle',
                  symbolSize: 18
                }
              ],
              label: {
                formatter (v) {
                  return new Date(v).getFullYear()
                }
              }
            }
          },
          options: []
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

</style>
