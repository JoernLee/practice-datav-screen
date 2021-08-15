import { ref, onMounted, onUnmounted } from 'vue'

// 解耦Home组件业务数据
export default function () {
  // 封装hooks来传递变量，vue2的state是必须维护在组件中，但是vue3则可以解耦
  // 这样使用的组件，例如TotalUser组件只需要关注业务逻辑实现就行了
  // 变量需要具有响应式能力（一变化就会刷新）,ref包一下
  const todayUser = ref(10000)
  const growthLastDay = ref(10)
  const growthLastMonth = ref(15)

  // 模拟数据变化
  let task

  onMounted(() => {
    task = setInterval(() => {
      todayUser.value = todayUser.value + 10
      growthLastDay.value = growthLastDay.value + 1
      growthLastMonth.value = growthLastMonth.value + 1
    }, 1000)
  })

  onUnmounted(() => {
    task && clearInterval(task)
  })

  return {
    todayUser,
    growthLastDay,
    growthLastMonth
  }
}
