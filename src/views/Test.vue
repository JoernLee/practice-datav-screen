<template>
  <button @click="increment">{{state.count}}</button>
  <div>{{doubleCount}}</div>
</template>
<script>
  import { useTest } from './useTest'

  export default {
    // vue3新增方法
    setup () {
      const { state, increment, doubleCount } = useTest()
      // return的结果作为组件的状态和function来使用
      return {
        state,
        doubleCount,
        increment
      }
    }
  }
</script>
