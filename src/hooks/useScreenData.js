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

const salesListMockData = [
  {
    order: '北京 +11%',
    shop: '北京 +3%',
    rider: '北京 +17%',
    newShop: '北京 -1%',
    avgOrder: '北京 +2%'
  },
  {
    order: '上海 -12%',
    shop: '上海 -7%',
    rider: '上海 +9%',
    newShop: '上海 +9%',
    avgOrder: '上海 +19%'
  },
  {
    order: '广州 -4%',
    shop: '广州 +20%',
    rider: '广州 +18%',
    newShop: '广州 -19%',
    avgOrder: '广州 +21%'
  },
  {
    order: '深圳 -2%',
    shop: '深圳 +3%',
    rider: '深圳 -21%',
    newShop: '深圳 -13%',
    avgOrder: '深圳 -9%'
  },
  {
    order: '南京 -9%',
    shop: '南京 -8%',
    rider: '南京 +10%',
    newShop: '南京 +15%',
    avgOrder: '南京 -13%'
  },
  {
    order: '杭州 -17%',
    shop: '杭州 +12%',
    rider: '杭州 +13%',
    newShop: '杭州 -23%',
    avgOrder: '杭州 -15%'
  },
  {
    order: '合肥 -9%',
    shop: '合肥 +10%',
    rider: '合肥 -16%',
    newShop: '合肥 +3%',
    avgOrder: '合肥 -15%'
  },
  {
    order: '济南 -6%',
    shop: '济南 -11%',
    rider: '济南 +9%',
    newShop: '济南 -19%',
    avgOrder: '济南 -6%'
  },
  {
    order: '太原 +4%',
    shop: '太原 +10%',
    rider: '太原 +2%',
    newShop: '太原 -3%',
    avgOrder: '太原 +9%'
  },
  {
    order: '成都 -11%',
    shop: '成都 -12%',
    rider: '成都 -10%',
    newShop: '成都 +16%',
    avgOrder: '成都 -14%'
  },
  {
    order: '重庆 +20%',
    shop: '重庆 -5%',
    rider: '重庆 +14%',
    newShop: '重庆 +3%',
    avgOrder: '重庆 +17%'
  },
  {
    order: '苏州 +15%',
    shop: '苏州 -14%',
    rider: '苏州 -22%',
    newShop: '苏州 -2%',
    avgOrder: '苏州 -23%'
  },
  {
    order: '无锡 +13%',
    shop: '无锡 -18%',
    rider: '无锡 -23%',
    newShop: '无锡 -16%',
    avgOrder: '无锡 -21%'
  },
  {
    order: '常州 -18%',
    shop: '常州 -15%',
    rider: '常州 -18%',
    newShop: '常州 +6%',
    avgOrder: '常州 -4%'
  },
  {
    order: '温州 -17%',
    shop: '温州 -15%',
    rider: '温州 -18%',
    newShop: '温州 -8%',
    avgOrder: '温州 +17%'
  },
  {
    order: '哈尔滨 -4%',
    shop: '哈尔滨 +20%',
    rider: '哈尔滨 +15%',
    newShop: '哈尔滨 -3%',
    avgOrder: '哈尔滨 -16%'
  },
  {
    order: '长春 -16%',
    shop: '长春 -8%',
    rider: '长春 +16%',
    newShop: '长春 +20%',
    avgOrder: '长春 +11%'
  },
  {
    order: '大连 +19%',
    shop: '大连 -21%',
    rider: '大连 -16%',
    newShop: '大连 -7%',
    avgOrder: '大连 +4%'
  },
  {
    order: '沈阳 +4%',
    shop: '沈阳 +19%',
    rider: '沈阳 -20%',
    newShop: '沈阳 -14%',
    avgOrder: '沈阳 -14%'
  },
  {
    order: '拉萨 +21%',
    shop: '拉萨 +9%',
    rider: '拉萨 +15%',
    newShop: '拉萨 +9%',
    avgOrder: '拉萨 -12%'
  },
  {
    order: '呼和浩特 -5%',
    shop: '呼和浩特 -3%',
    rider: '呼和浩特 -14%',
    newShop: '呼和浩特 +16%',
    avgOrder: '呼和浩特 -6%'
  },
  {
    order: '武汉 +16%',
    shop: '武汉 +17%',
    rider: '武汉 +9%',
    newShop: '武汉 +1%',
    avgOrder: '武汉 +19%'
  },
  {
    order: '南宁 -11%',
    shop: '南宁 +21%',
    rider: '南宁 +22%',
    newShop: '南宁 +21%',
    avgOrder: '南宁 -11%'
  }
]

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
  const salesListData = ref(salesListMockData)

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
    headerData,
    salesListData
  }
}
