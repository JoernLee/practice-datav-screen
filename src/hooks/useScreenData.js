import { ref, onMounted, onUnmounted } from 'vue'

// 平均年龄组件mock数据
const ageMockData = [{
  startValue: 0,
  value: 131107,
  axis: '0-20',
  color: 'rgb(116,166,49)'
}, {
  startValue: 0,
  value: 330831,
  axis: '20-30',
  color: 'rgb(190,245,99)'
}, {
  startValue: 0,
  value: 551238,
  axis: '30-50',
  color: 'rgb(202,252,137)'
}, {
  startValue: 0,
  value: 31088,
  axis: '>50',
  color: 'rgb(251,253,142)'
}]

const deviceMockData = {
  totalDevices: 1070909,
  devices: [{
    key: 'Android',
    value: 423676
  }, {
    key: 'iOS',
    value: 373581
  }, {
    key: 'PC',
    value: 273652
  }]
}

function random (val) {
  return Math.floor(Math.random() * val)
}

// 解耦Home组件业务数据
export default function () {
  // 封装hooks来传递变量，vue2的state是必须维护在组件中，但是vue3则可以解耦
  // 这样使用的组件，例如TotalUser组件只需要关注业务逻辑实现就行了
  // 变量需要具有响应式能力（一变化就会刷新）,ref包一下
  const todayUser = ref(10000)
  const growthLastDay = ref(10)
  const growthLastMonth = ref(15)
  const ageData = ref(ageMockData)
  const deviceData = ref(deviceMockData)
  const averageAge = ref(0)

  // 模拟数据变化
  let task

  onMounted(() => {
    task = setInterval(() => {
      todayUser.value = todayUser.value + 10
      growthLastDay.value = growthLastDay.value + 1
      growthLastMonth.value = growthLastMonth.value + 1
      // 模拟数据变化
      averageAge.value = averageAge.value + 1
      const _ageData = [...ageData.value]
      _ageData.forEach(item => {
        item.startValue = item.value
        item.value = item.value + random(100)
      })
      ageData.value = _ageData
      // device相关数据更新
      const _deviceData = { ...deviceData.value }
      _deviceData.totalDevices += random(100)
      _deviceData.devices.forEach(item => {
        item.value += random(100)
      })
      deviceData.value = _deviceData
    }, 3000)
  })

  onUnmounted(() => {
    task && clearInterval(task)
  })

  return {
    todayUser,
    growthLastDay,
    growthLastMonth,
    ageData,
    averageAge,
    deviceData
  }
}
