<template>
  <div class="sales-list">
    <base-scroll-list
      :config="config"
    />
  </div>
</template>

<script>
  import { ref, onMounted, watch } from 'vue'
  import BaseScrollList from '../BaseScrollList'

  export default {
    name: 'SalesList',
    components: { BaseScrollList },
    props: {
      data: Array
    },
    setup (props) {
      const config = ref({})
      const update = () => {
        const headerData = ['姓名', '年龄', '月薪']
        const headerStyle = [{
          color: 'red'
        }]
        const headerFontSize = 24
        const headerColor = '#fff'
        const rowFontSize = 20
        const rowColor = '#000'
        const rowStyle = [{ color: 'blue' }]
        const data = []
        for (let i = 0; i < 10; i++) {
          data.push(['同学' + (i + 1), Math.floor(Math.random() * 10 + 20), Math.floor(Math.random() * 10000 + 10000)])
        }
        const rowBg = [('rgb(240,240,240)'), ('rgb(255,255,255)')]
        const aligns = ['center', 'center', 'center']

        config.value = {
          headerData,
          headerStyle,
          rowStyle,
          rowBg,
          data,
          headerBg: 'rgb(80,80,80)',
          headerHeight: 40,
          headerIndex: true,
          headerIndexContent: '#',
          rowNum: 10,
          aligns,
          headerFontSize,
          rowFontSize,
          headerColor,
          rowColor
        }
      }
      onMounted(() => {
        // 父组件的onMounted是在子组件都mounted完成之后进行的，所以只是这样处理列表子组件是没办法更新拿到config的
        update()
      })
      watch(() => props.data, () => {
        update()
      })
      return {
        config
      }
    }
  }
</script>

<style scoped lang="scss">
  .sales-list {
    width: 100%;
    height: 100%;
  }
</style>
