<template>
  <div style="width: 500px;height: 400px">
    <base-scroll-list
      :config="config"
    />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import BaseScrollList from '../components/BaseScrollList'

  export default {
    components: { BaseScrollList },
    setup () {
      const config = ref({})
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
        rowNum: 5,
        aligns,
        headerFontSize,
        rowFontSize,
        headerColor,
        rowColor
      }
      return {
        config
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
