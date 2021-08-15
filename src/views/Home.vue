<template>
  <div class="home">
    <imooc-loading v-if="loading">
      <div class="loading-text">
        数据大屏加载中...
      </div>
    </imooc-loading>
    <imooc-container :options="{width: 3840, height: 2160}" v-else>
      <div>111</div>
    </imooc-container>
  </div>
</template>

<script>
  import { ref, onMounted } from 'vue'
  import ImoocLoading from '../components/ImoocLoading'
  import ImoocContainer from '../components/Container'

  export default {
    name: 'Home',
    components: {
      ImoocContainer,
      ImoocLoading
    },
    setup () {
      const loading = ref(true)

      onMounted(() => {
        // 默认展示loading状态，2.5s后展示容器界面
        setTimeout(() => {
          loading.value = false
        }, 2500)
      })

      return {
        loading
      }
    }
  }
</script>

<style lang="scss">
  .home {
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: rgb(29, 29, 29);
    color: #fff;
    font-size: 48px;
  }
  .loading-text {
    font-size: 20px;
  }
</style>
