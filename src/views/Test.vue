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
      const headerStyle = [{ color: 'red' }]
      config.value = {
        headerData,
        headerStyle,
        headerBg: 'rgb(80,80,80)',
        headerHeight: 40,
        headerIndex: true,
        headerIndexContent: '#'
      }
      return {
        config
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
