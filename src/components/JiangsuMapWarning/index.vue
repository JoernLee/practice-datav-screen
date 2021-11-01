<template>
  <div style="width: 100%;height: 100%">
    <vue-echarts :options="options"/>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import VueEcharts from '../VueEcharts/VueEcharts'
  import ECharts from 'echarts'

  export default {
    name: 'JiangsuMapWarning',
    components: { VueEcharts },
    setup () {
      const options = ref({})
      const update = () => {
        // 调用接口获取地图数据
        fetch('http://www.youbaobao.xyz/datav-res/datav/jiangsuMapData.json')
          .then(response => response.json())
          .then(data => {
            // 注册地图 - options中才可以引用
            ECharts.registerMap('jiangsu', data)
            options.value = {
              geo: [{
                map: 'jiangsu', // 使用自定义地图
                zoom: 1, // 初始倍率
                roam: true, // 允许鼠标滚轮地图缩放
                // 地图缩放范围
                scaleLimit: {
                  min: 0,
                  max: 3
                },
                itemStyle: {
                  // 修改地图区域style
                  areaColor: '#013c62',
                  shadowColor: '#013c62',
                  shadowBlur: 20, // 阴影大小
                  shadowOffsetX: -5,
                  shadowOffsetY: 15
                }
              }]
            }
          })
        options.value = {}
      }
      onMounted(() => {
        update()
      })
      return {
        options
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
