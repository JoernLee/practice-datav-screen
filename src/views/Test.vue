<template>
  <div style="width: 500px;height: 400px">
    <base-scroll-list
      :header="header"
      :header-style="headerStyle"
      header-bg="rgb(80,80,80)"
      header-height="40"
      header-index
    />
  </div>
</template>

<script>
  import { ref } from 'vue'
  import BaseScrollList from '../components/BaseScrollList'

  export default {
    components: { BaseScrollList },
    setup () {
      const header = ref([])
      const headerStyle = ref([])
      header.value = ['姓名', '年龄', '月薪']
      headerStyle.value = [{ color: 'red' }]
      return {
        header,
        headerStyle
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
