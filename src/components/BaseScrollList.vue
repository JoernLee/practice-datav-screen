<template>
  <div class="base-scroll-list" :id="id">
    <div class="base-scroll-list-header" :style="{
      backgroundColor: actualConfig.headerBg,
      height: `${actualConfig.headerHeight}px`,
      fontSize: `${actualConfig.headerFontSize}px`,
      color: `${actualConfig.headerColor}`
    }">
      <div
        class="header-item base-scroll-list-text"
        v-for="(headerItem, i) in headerData"
        :key="headerItem + i"
        :style="{
          width: `${columnWidths[i]}px`,
          ...headerStyle[i]
        }"
        v-html="headerItem"
        :align="aligns[i]"
      />
    </div>
    <div
      class="base-scroll-list-rows"
      v-for="(rowData,rowIndex) in rowsData"
      :key="rowIndex"
      :style="{
        height: `${rowHeights[rowIndex]}px`,
        backgroundColor: rowIndex % 2 === 0 ? rowBg[1] : rowBg[0],
        fontSize: `${actualConfig.rowFontSize}px`,
        color: `${actualConfig.rowColor}`
      }"
    >
      <div
        class="base-scroll-list-columns"
        v-for="(colData,colIndex) in rowData"
        :key="colData + colIndex"
        :style="{
          width: `${columnWidths[colIndex]}px`,
          ...rowStyle[colIndex]
        }"
        v-html="colData"
        :align="aligns[colIndex]"
      >

      </div>

    </div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { v4 as uuidv4 } from 'uuid'
  import useScreen from '../hooks/useScreen'
  // 按需加载，避免把整个lodash引入
  import cloneDeep from 'lodash/cloneDeep'
  // 这种千万不要！
  // import _ from 'lodash'
  import assign from 'lodash/assign'

  const defaultConfig = {
    // 标题数据， 格式类似['a','b',...]
    headerData: [],
    // 标题item样式, 支持定制每个标题的样式 [{},{},...]
    headerStyle: [],
    // 行背景色（奇偶）
    rowBg: [],
    // 行样式
    rowStyle: [],
    // 标题背景色
    headerBg: 'rgb(90,90,90)',
    // 标题高度
    headerHeight: 35,
    // 标题是否展示序号
    headerIndex: false,
    headerIndexContent: '#',
    headerIndexStyle: {
      // 默认index的宽度 - 对列宽算法也需要更改
      width: '50px'
    },
    // 序号列内容样式
    rowIndexStyle: {
      width: '50px'
    },
    // 数据项
    data: [],
    // 每页显示数据量
    rowNum: 10,
    // 居中方式
    aligns: [],
    headerFontSize: 28,
    rowFontSize: 28,
    headerColor: '#fff',
    rowColor: '#000'
  }

  export default {
    name: 'BaseScrollList',
    props: {
      config: {
        // 为了避免混淆外部props和内部return的state，外部传入全部移入config
        type: Object,
        default: () => ({})
      }
    },
    setup (props) {
      const actualConfig = ref([])
      // 生成唯一id，避免get时获取目标不对
      const id = `base-scroll-list-${uuidv4()}`
      // 下面代码拿不到dom和宽高，是因为dom是在mounted才进行绘制，而setup是mounted之前就执行了
      // 需要修改useScreen内部的生命周期
      const { width, height } = useScreen(id)
      const headerData = ref([])
      const headerStyle = ref([])
      const rowStyle = ref([])
      const rowBg = ref([])
      const columnWidths = ref([])
      const rowsData = ref([])
      const rowHeights = ref([])
      const rowNum = ref(defaultConfig.rowNum)
      const aligns = ref([])

      const handleHeader = (config) => {
        // 做一个深copy，避免后续对header本身数据的影响污染（因为是一维数组所以直接扩展运算符就可以）
        // 否则可以使用lodash的deepclone函数
        const _headerData = cloneDeep(config.headerData)
        const _headerStyle = cloneDeep(config.headerStyle)
        const _rowsData = cloneDeep(config.data)
        const _rowStyle = cloneDeep(config.rowStyle)
        const _aligns = cloneDeep(config.aligns)
        if (_headerData.length === 0) {
          return
        }
        if (config.headerIndex) {
          // 这里不建议直接对headerData操作，因为这一步会导致每一次值变更进行页面重绘
          _headerData.unshift(config.headerIndexContent)
          _headerStyle.unshift(config.headerIndexStyle)
          _rowStyle.unshift(config.rowIndexStyle)
          _rowsData.forEach((rows, index) => {
            // 行数据是二维数组，需要这样处理，把index列补上
            rows.unshift(index + 1)
          })
          _aligns.unshift('center')
        }
        // 动态计算header每一列宽度， 并且生成一个length等长数组赋值平均宽度
        // 需要计算一个使用过的width，避免用户自定义某个style-width
        let usedWidth = 0
        let useColumnNum = 0
        // 判断是否自定义width
        _headerStyle.forEach(style => {
          if (style.width) {
            // 把width变为number相加
            usedWidth += +style.width.replace('px', '')
            useColumnNum++
          }
        })
        // 需要考虑到剩余宽度和列数
        const avgWidth = (width.value - usedWidth) / (_headerData.length - useColumnNum)
        const _columnWidths = new Array(_headerData.length).fill(avgWidth)
        // 再进行一轮循环，避免used的列被avgWidth覆盖了，header没有出现这个问题是因为merge时被下面覆盖了
        // 但是计算row的列宽时拿到的columnWidths就全是平均值了，需要还原used那部分！
        _headerStyle.forEach((style, index) => {
          if (style.width) {
            const headerWidth = +style.width.replace('px', '')
            _columnWidths[index] = headerWidth
          }
        })

        columnWidths.value = _columnWidths
        headerData.value = _headerData
        headerStyle.value = _headerStyle
        rowStyle.value = _rowStyle
        rowsData.value = _rowsData
        aligns.value = _aligns
      }

      const handleRows = (config) => {
        // 动态计算每行数据的高度
        // 先拿到header高度，得出后续用于动态计算的可用高度
        const { headerHeight } = config
        rowNum.value = config.rowNum
        const unusedHeight = height.value - headerHeight
        // 如果rowNum大于实际长度，则以实际数据长度为准
        if (rowNum.value > rowsData.value.length) {
          rowNum.value = rowsData.value.length
        }
        const avgHeight = unusedHeight / rowNum.value
        rowHeights.value = new Array(rowNum.value).fill(avgHeight)

        // 获取行背景色
        if (config.rowBg) {
          rowBg.value = config.rowBg
        }
      }

      onMounted(() => {
        // 这里的onMounted是在后面定义的，所以里面也能拿到useScreen的参数
        // headerIndex通过新增一列来实现
        console.log(width, height, props.header, props.headerIndex)
        // 合并config，避免外部传入config直接覆盖config的default字段的功能
        // 注意前后关系，不然会把default覆盖
        const _actualConfig = assign(defaultConfig, props.config)
        // 赋值rowsData
        rowsData.value = _actualConfig.data || []
        handleHeader(_actualConfig)
        handleRows(_actualConfig)
        // 避免计算之前就进行重新渲染
        actualConfig.value = _actualConfig
      })

      return {
        id,
        headerData,
        headerStyle,
        columnWidths,
        rowsData,
        rowHeights,
        rowStyle,
        rowBg,
        aligns,
        actualConfig
      }
    }
  }
</script>
<style scoped lang="scss">
  .base-scroll-list {
    /*让宽高适应父容器，在父容器内部作定制就可以了*/
    width: 100%;
    height: 100%;

    .base-scroll-list-text {
      /*  为文本加一些默认样式，例如文字太长省略...*/
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      box-sizing: border-box;
    }

    .base-scroll-list-header {
      display: flex;
      align-items: center;
      font-size: 15px;

      .header-item {
      }
    }

    .base-scroll-list-rows {
      display: flex;
      align-items: center;

      .base-scroll-list-columns {
        font-size: 28px;

      }
    }

  }

</style>
