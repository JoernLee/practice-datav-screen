<template>
  <div class="sales-list">
    <base-scroll-list
      :config="config"
    />
  </div>
</template>

<script>
  import { ref, onMounted, watch } from 'vue'
  import BaseScrollList from '../BaseScrollList'

  export default {
    name: 'SalesList',
    components: { BaseScrollList },
    props: {
      data: Array
    },
    setup (props) {
      const config = ref({})
      const update = () => {
        const data = []
        const headerIndexData = []
        const aligns = []
        // 数据处理逻辑 - 一共六列算上序号列
        for (let i = 0; i < props.data.length; i++) {
          data[i] = []
          if (i % 2 === 0) {
            // 偶数列 支持传入html
            headerIndexData[i] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <div style="width:15px;height:15px;background:rgb(72,122,72);border-radius:50%;border:1px solid #fff;"/>
          </div>`
          } else {
            headerIndexData[i] = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;">
            <div style="width:15px;height:15px;background:rgb(38,88,104);border-radius:50%;border:1px solid #fff;"/>
          </div>`
          }
          for (let j = 0; j < 5; j++) {
            aligns.push('center')
            let text = ''
            switch (j) {
              case 0:
                text = props.data[i].order
                break
              case 1:
                text = props.data[i].shop
                break
              case 2:
                text = props.data[i].rider
                break
              case 3:
                text = props.data[i].newShop
                break
              case 4:
                text = props.data[i].avgOrder
                break
            }
            if (j === 1 || j === 3) {
              // 这两列text为绿色 - 这样可以实现不同列的文字颜色
              data[i].push(`<div style="color: rgb(178,209,126)">${text}</div>`)
            } else {
              data[i].push(`<div>${text}</div>`)
            }
          }
        }
        config.value = {
          headerData: ['城市订单量', '店铺数', '接单人数', '新店铺数量', '人均订单量'],
          headerHeight: 55, // 表头高度
          headerFontSize: 24, // 表头字号
          headerColor: '#fff', // 表头文本颜色
          headerBg: 'rgb(80,80,80)', // 表头背景色
          headerIndex: true,
          headerIndexContent: '', // 标题序号列内容
          headerIndexData,
          rowNum: 10, // 一次性展示数据数量
          rowBg: ['rgb(40,40,40)', 'rgb(55,55,55)'],
          rowFontSize: 24,
          rowColor: '#fff',
          aligns,
          data
        }
        console.log(config)
      }
      onMounted(() => {
        // 父组件的onMounted是在子组件都mounted完成之后进行的，所以只是这样处理列表子组件是没办法更新拿到config的
        update()
      })
      watch(() => props.data, () => {
        update()
      })
      return {
        config
      }
    }
  }
</script>

<style scoped lang="scss">
  .sales-list {
    width: 100%;
    height: 100%;
  }
</style>
