<template>
  <div>
    <base-scroll-list
      :header="header"
      :header-style="headerStyle"
      header-height="40"
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
