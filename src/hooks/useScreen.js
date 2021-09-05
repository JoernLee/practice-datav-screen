import { ref, onMounted } from 'vue'

// 用于获取屏幕参数的hook - 业务逻辑解耦
export default function useScreen (id) {
  const width = ref(0)
  const height = ref(0)
  let dom
  onMounted(() => {
    // 根据id获取目标元素，不使用class是为了避免获取页面重复组件
    // onMounted生命周期才能保证dom绘制完毕，拿到
    dom = document.getElementById(id)
    width.value = dom.clientWidth
    height.value = dom.clientHeight
  })

  return {
    width,
    height
  }
}
