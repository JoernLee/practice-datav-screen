<template>
  <div style="width: 100%;height: 100%">
    <vue-echarts :options="options"/>
  </div>
</template>

<script>
  import { ref, onMounted, onUnmounted } from 'vue'
  import VueEcharts from '../VueEcharts/VueEcharts'
  import ECharts from 'echarts'
  import cloneDeep from 'lodash/cloneDeep'

  export default {
    name: 'JiangsuMapWarning',
    components: { VueEcharts },
    setup () {
      const options = ref({})
      let timer = null
      const update = () => {
        // 调用接口获取地图数据
        fetch('http://www.youbaobao.xyz/datav-res/datav/jiangsuMapData.json')
          .then(response => response.json())
          .then(data => {
            const center = []
            data.features.forEach(item => {
              if (item.properties) {
                center.push({
                  key: item.properties.name,
                  value: item.properties.center
                })
              }
            })
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
                roam: false, // 允许鼠标滚轮地图缩放
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
                  const value = Math.random() * 100 // 生成0-100w随机人口数
                  return {
                    name: item.key,
                    value
                  }
                })
              }, {
                type: 'effectScatter',
                // data是动态填充的
                data: [],
                // 指定geo地理坐标系
                coordinateSystem: 'geo',
                itemStyle: {
                  color: '#feae21'
                },
                symbolSize: 16,
                // 展示散点文字面板
                label: {
                  normal: {
                    show: true,
                    position: 'top', // 调节位置
                    formatter: function (params) {
                      // rich的模板语法
                      return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                    },
                    backgroundColor: 'rgba(254,174,33,.8)',
                    padding: [0, 0],
                    borderRadius: 3,
                    lineHeight: 32,
                    color: '#f7fafb',
                    rich: {
                      title: {
                        padding: [0, 10, 10, 10],
                        color: '#fff'
                      },
                      content: {
                        padding: [10, 10, 0, 10],
                        color: '#fff'
                      }
                    }
                  },
                  emphasis: {
                    show: true
                  }
                }
              }, {
                type: 'effectScatter',
                data: [],
                // 指定geo地理坐标系
                coordinateSystem: 'geo',
                itemStyle: {
                  color: '#e93f42'
                },
                symbolSize: 16,
                // 展示散点文字面板
                label: {
                  normal: {
                    show: true,
                    position: 'top', // 调节位置
                    formatter: function (params) {
                      // rich的模板语法
                      return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                    },
                    backgroundColor: 'rgba(233,63,66,.9)',
                    padding: [0, 0],
                    borderRadius: 3,
                    lineHeight: 32,
                    color: '#fff',
                    rich: {
                      title: {
                        padding: [0, 10, 10, 10],
                        color: '#fff'
                      },
                      content: {
                        padding: [10, 10, 0, 10],
                        color: '#fff'
                      }
                    }
                  },
                  emphasis: {
                    show: true
                  }
                }
              }, {
                type: 'effectScatter',
                data: [],
                // 指定geo地理坐标系
                coordinateSystem: 'geo',
                itemStyle: {
                  color: '#08baec'
                },
                symbolSize: 16,
                // 展示散点文字面板
                label: {
                  normal: {
                    show: true,
                    position: 'top', // 调节位置
                    formatter: function (params) {
                      // rich的模板语法
                      return `{title|${params.data.city}}\n{content|发生 xx 事件}`
                    },
                    backgroundColor: 'rgba(8,186,236,.9)',
                    padding: [0, 0],
                    borderRadius: 3,
                    lineHeight: 32,
                    color: '#fff',
                    rich: {
                      title: {
                        padding: [0, 10, 10, 10],
                        color: '#fff'
                      },
                      content: {
                        padding: [10, 10, 0, 10],
                        color: '#fff'
                      }
                    }
                  },
                  emphasis: {
                    show: true
                  }
                }
              }]
            }
            // 测试：随机展示事件信息
            timer = setInterval(() => {
              // 不希望影响原先的options，所以先clone
              const _options = cloneDeep(options.value)
              // 初始化数据
              for (let i = 1; i < 4; i++) {
                _options.series[i].data = []
              }
              // 生成城市随机数 - 随机的城市和effect等级
              const cityLength = center.length
              const cityIndex = Math.floor(Math.random() * cityLength)
              const eventIndex = Math.floor(Math.random() * 3) + 1
              _options.series[eventIndex].data = [{
                city: center[cityIndex].key,
                value: center[cityIndex].value
              }]
              options.value = _options
            }, 2000)
          })
        options.value = {}
      }
      onMounted(() => {
        update()
      })
      onUnmounted(() => timer && clearInterval(timer))
      return {
        options
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
