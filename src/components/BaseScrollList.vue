<template>
  <div class="base-scroll-list" :id="id">
    <div class="base-scroll-list-header" :style="{
      backgroundColor: config.headerBg,
      height: `${config.headerHeight}px`
    }">
      <div
        class="header-item base-scroll-list-text"
        v-for="(headerItem, i) in headerData"
        :key="headerItem + i"
        :style="headerStyle[i]"
        v-html="headerItem"
      />
    </div>
    <div class="base-scroll-list-rows">

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
      const defaultConfig = {
        // 标题数据， 格式类似['a','b',...]
        headerData: [],
        // 标题item样式, 支持定制每个标题的样式 [{},{},...]
        headerStyle: [],
        // 标题背景色
        headerBg: 'rgb(90,90,90)',
        // 标题高度
        headerHeight: 35,
        // 标题是否展示序号
        headerIndex: false,
        headerIndexContent: '#',
        headerIndexStyle: {}
      }
      const actualConfig = ref([])
      // 生成唯一id，避免get时获取目标不对
      const id = `base-scroll-list-${uuidv4()}`
      // 下面代码拿不到dom和宽高，是因为dom是在mounted才进行绘制，而setup是mounted之前就执行了
      // 需要修改useScreen内部的生命周期
      const { width, height } = useScreen(id)
      const headerData = ref([])
      const headerStyle = ref([])

      const handleHeader = (config) => {
        // 做一个深copy，避免后续对header本身数据的影响污染（因为是一维数组所以直接扩展运算符就可以）
        // 否则可以使用lodash的deepclone函数
        const _headerData = cloneDeep(config.headerData)
        const _headerStyle = cloneDeep(config.headerStyle)
        if (_headerData.length === 0) {
          return
        }
        if (config.headerIndex) {
          // 这里不建议直接对headerData操作，因为这一步会导致每一次值变更进行页面重绘
          _headerData.unshift(config.headerIndexContent)
          _headerStyle.unshift(config.headerIndexStyle)
        }
        headerData.value = _headerData
        headerStyle.value = _headerStyle
      }

      onMounted(() => {
        // 这里的onMounted是在后面定义的，所以里面也能拿到useScreen的参数
        // headerIndex通过新增一列来实现
        console.log(width, height, props.header, props.headerIndex)
        // 合并config，避免外部传入config直接覆盖config的default字段的功能
        // 注意前后关系，不然会把default覆盖
        const _actualConfig = assign(defaultConfig, props.config)
        handleHeader(_actualConfig)
        // 避免计算之前就进行重新渲染
        actualConfig.value = _actualConfig
      })

      return {
        id,
        headerData,
        headerStyle
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
  }

</style>
