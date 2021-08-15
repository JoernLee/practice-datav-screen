import { reactive, computed, watch } from 'vue'

export function useTest () {
// 创建状态 - 类似react的useState - 响应式（状态发生变化，页面重新渲染-MVVM核心）
  const state = reactive({
    count: 1
  })

  const increment = () => {
    state.count++
  }

  // 实现对状态的监听器
  watch(() => state.count, () => {
    console.log('state.count changed' + state.count)
  })

  const doubleCount = computed(() => state.count * 2)
  // return的结果作为组件的状态和function来使用
  return {
    state,
    doubleCount,
    increment
  }
}
