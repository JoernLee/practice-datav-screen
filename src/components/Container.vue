<template>
  <div id="imooc-container" :ref="refName" :style="style">
    <template v-if="ready">
      <slot></slot>
    </template>
  </div>
</template>

<script>
  import { getCurrentInstance, onMounted, onUnmounted, ref } from 'vue'
  import { debounce } from '../utils/index'

  export default {
    name: 'ImoocContainer',
    props: {
      options: Object
    },
    setup (ctx) {
      const refName = 'imoocContainer'
      const width = ref(0)
      const height = ref(0)
      const originalWidth = ref(0)
      const originalHeight = ref(0)
      const ready = ref(false)
      let context, dom, observer

      const initSize = () => {
        dom = context.$refs[refName]
        // 用户指定了宽高，就从用户获取，反之从dom获取
        // 目的：获取大屏的真实尺寸
        if (ctx.options && ctx.options.width && ctx.options.height) {
          width.value = ctx.options.width
          height.value = ctx.options.height
        } else {
          width.value = dom.clientWidth
          height.value = dom.clientHeight
        }
        // 上述获取的宽高是实际宽高，接下来还需要视口区域的宽高获取
        // 需要对外层的body标签设置宽高比为100%，取消margin和padding，默认视口就会盛满全屏
        // 目的：通过window的screen对象来获取画布尺寸
        if (!originalWidth.value || !originalHeight.value) {
          originalWidth.value = window.screen.width
          originalHeight.value = window.screen.height
        }
      }

      const updateSize = () => {
        // 保证外层dom容器的width和height的样式值
        if (width.value && height.value) {
          dom.style.width = `${width.value}px`
          dom.style.height = `${height.value}px`
        } else {
          dom.style.width = `${originalWidth.value}px`
          dom.style.height = `${originalHeight.value}px`
        }
      }

      const updateScale = () => {
        // 目的：获取真实（可视）的视口尺寸
        const currentWidth = document.body.clientWidth
        const currentHeight = document.body.clientHeight
        // 目的：获取大屏最终的宽高
        const realWidth = width.value || originalWidth.value
        const realHeight = height.value || originalHeight.value
        // 计算宽高比：当前用户实际要求的尺寸如何变化适配到当前的视口尺寸上
        const widthScale = currentWidth / realWidth
        const heightScale = currentHeight / realHeight
        dom && (dom.style.transform = `scale(${widthScale},${heightScale})`)
      }

      const onResize = (e) => {
        console.log('onResize', e)
        initSize()
        updateScale()
      }

      const initMutationObserver = () => {
        // 实例化监听器并启动观察，传入回调函数和配置
        observer = new window.MutationObserver(onResize)
        observer.observe(dom, {
          attributes: true,
          attributeFilter: ['style'],
          attributeOldValue: true
        })
      }

      const removeMutationObserver = () => {
        if (observer) {
          observer.disconnect()
          observer.takeRecords()
          observer = null
        }
      }

      onMounted(() => {
        ready.value = false
        // 渲染完成后拿到dom id指定的元素内容 - 获取dom宽高
        context = getCurrentInstance().ctx
        initSize()
        updateSize()
        updateScale()
        window.addEventListener('resize', debounce(100, onResize))
        initMutationObserver()
        ready.value = true
      })

      onUnmounted(() => {
        window.removeEventListener('resize', onResize)
        removeMutationObserver()
      })

      return {
        refName,
        ready
      }
    }
  }
</script>
<style scoped lang="scss">
  #imooc-container {
    /*transform-origin默认是center center 导致放缩后区域位置变化*/
    /*设置left top 回到左上方*/
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    transform-origin: left top;
    z-index: 999;
  }
</style>
