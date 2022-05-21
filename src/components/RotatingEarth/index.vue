<template>
  <div class="rotating-earth">
    <vue-echarts :options="options"/>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import VueEcharts from '@/components/VueEcharts/VueEcharts'
import 'echarts-gl'

// 项目部署以后assets就在当前目录下
const ROOT_PATH = './'

export default {
  name: 'RotatingEarth',
  components: { VueEcharts },
  setup () {
    const options = ref({})
    const update = () => {
      options.value = {
        globe: {
          // 配置纹理贴图，包裹在默认球体上面
          baseTexture: `${ROOT_PATH}assets/datav-gl-texture.jpg`,
          // 配置背景贴图
          environment: `${ROOT_PATH}assets/star-bg.jpg`,
          // 配置高度贴图
          heightTexture: `${ROOT_PATH}assets/datav-gl-texture.jpg`,
          // 地球顶点位移的大小 - 更具有立体感
          displacementScale: 0.06,
          // 三维地图着色效果
          shading: 'realistic',
          // 真实感材质相关的配置项
          realisticMaterial: {
            roughness: 0.8
          },
          // 使用后处理，更明亮，有质感
          postEffect: {
            enable: true
          },
          // 增强主光源，明亮
          light: {
            main: {
              intensity: 5,
              shadow: true
            },
            // 全局的环境光设置。
            ambient: {
              intensity: 1
            }
          }
        }
      }
    }
    onMounted(update)
    return { options }
  }
}
</script>

<style scoped>
.rotating-earth {
  width: 100%;
  height: 100%;
}
</style>
