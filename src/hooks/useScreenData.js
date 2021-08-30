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

const genderMockData = [{
  key: 'male',
  value: 1442542
}, {
  key: 'female',
  value: 1442548
}]

const riderMockData = {
  // 这个mock数据的X轴是固定的，Y轴数据有两种，一种骑手接单数据，还要新增骑手数据
  axisX: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
  ],
  orderData: {
    legend1: '去年骑手月人均接单',
    legend2: '今年骑手月人均接单',
    data1: [
      '330',
      '420',
      '560',
      '450',
      '610',
      '890',
      '720',
      '610',
      '580',
      '750',
      '770',
      '600'
    ],
    data2: [
      '430',
      '510',
      '660',
      '550',
      '710',
      '990',
      '620',
      '550',
      '760',
      '810',
      '930',
      '720'
    ]
  },
  rateData: {
    legend1: '去年月新增骑手',
    legend2: '今年月新增骑手',
    data1: [
      '129',
      '223',
      '202',
      '197',
      '300',
      '112',
      '333',
      '249',
      '178',
      '322',
      '401',
      '167'
    ],
    data2: [
      '179',
      '263',
      '282',
      '297',
      '330',
      '344',
      '222',
      '299',
      '190',
      '455',
      '566',
      '233'
    ]
  }
}

const hotCategoryMockData = {
  data1: {
    axisX: [
      '粉面粥店',
      '简餐便当',
      '汉堡披萨',
      '香锅冒菜',
      '小吃炸串',
      '地方菜系',
      '轻食简餐'
    ],
    data1: [
      89,
      36,
      62,
      90,
      39,
      2,
      11
    ],
    data2: [
      11,
      64,
      38,
      10,
      61,
      98,
      89
    ]
  },
  data2: {
    axisX: [
      '草莓',
      '甘蔗',
      '榴莲',
      '菠萝',
      '香蕉',
      '梨',
      '苹果'
    ],
    data1: [
      93,
      3,
      79,
      79,
      42,
      47,
      40
    ],
    data2: [
      7,
      97,
      21,
      21,
      58,
      53,
      60
    ]
  }
}

const headerMockData = {
  salesToday: 30801679,
  orderToday: 2045494,
  orderUser: 21409,
  covertRate: 11.22,
  returnRate: 5.59,
  userToday: 1021990
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
  const genderData = ref(genderMockData)
  const riderData = ref(riderMockData)
  const hotCategoryData = ref(hotCategoryMockData)
  const headerData = ref(headerMockData)

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
      // gender数据更新 - 常见的坑，写成genderData而非取其中value！
      const _genderData = [...genderData.value]
      _genderData.forEach(item => {
        item.value += random(100)
      })
      genderData.value = _genderData

      const _riderData = { ...riderData.value }
      _riderData.orderData.data1 = _riderData.orderData.data1.map(item => {
        return item + random(100)
      })
      _riderData.orderData.data2 = _riderData.orderData.data2.map(item => {
        return item + random(100)
      })
      _riderData.rateData.data1 = _riderData.rateData.data1.map(item => {
        return item + random(100)
      })
      _riderData.rateData.data2 = _riderData.rateData.data2.map(item => {
        return item + random(100)
      })
      riderData.value = _riderData

      const _hotCategoryData = { ...hotCategoryData.value }
      _hotCategoryData.data1.data1 = _hotCategoryData.data1.data1.map(item => {
        return item + random(100)
      })
      _hotCategoryData.data1.data2 = _hotCategoryData.data2.data2.map(item => {
        return item + random(100)
      })
      hotCategoryData.value = _hotCategoryData
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
    deviceData,
    genderData,
    riderData,
    hotCategoryData,
    headerData
  }
}
