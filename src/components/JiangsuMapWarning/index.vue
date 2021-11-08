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
            console.log(data)
            const center = []
            data.features.forEach(item => {
              if (item.properties) {
                center.push({
                  [item.properties.name]: item.properties.center
                })
              }
            })
            console.log('城市中心点坐标', center)
            // 注册地图 - options中才可以引用
            ECharts.registerMap('jiangsu', data)
            options.value = {
              visualMap: {
                show: true, // 控制左下角标识
                max: 100,
                seriesIndex: [0], // 如果下面添加了多组series数据就需要配置
                // 自定义深浅分布颜色
                inRange: {
                  color: ['#a5dcf4', '#006edd']
                }
              },
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
              }],
              series: [{
                // 使用series-map类型来构建精细化地图
                type: 'map',
                mapType: 'jiangsu',
                zoom: 1,
                roam: false,
                label: {
                  show: true,
                  color: '#fff',
                  emphasis: {
                    color: '#fff',
                    show: false
                  }
                },
                itemStyle: {
                  normal: {
                    borderColor: '#2980b9',
                    borderWidth: 1,
                    areaColor: '#12235c'
                  },
                  // 鼠标悬浮时
                  emphasis: {
                    areaColor: '#fa8c16',
                    borderWidth: 0
                  }
                },
                data: center.map(item => {
                  // item = {'南京市':[123,321]}
                  // value可以给visualMap来进行视图映射
                  const key = Object.keys(item)[0]
                  const value = Math.random() * 100 // 生成0-100w随机人口数
                  return {
                    name: key,
                    value
                  }
                })
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
