<template>
  <div class="base-scroll-list" :id="id">
    <div class="base-scroll-list-header" :style="{
      backgroundColor: headerBg,
      height: `${headerHeight}px`
    }">
      <div
        class="header-item base-scroll-list-text"
        v-for="(headerItem, i) in header"
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
  import useScreen from '../hooks/useScreen'
  export default {
    name: 'BaseScrollList',
    props: {
      // 标题数据， 格式类似['a','b',...]
      header: Array,
      // 标题item样式, 支持定制每个标题的样式 [{},{},...]
      headerStyle: Array,
      // 标题背景色
      headerBg: {
        type: String,
        default: 'rgb(90,90,90)'
      },
      // 标题高度
      headerHeight: {
        type: [String, Number],
        default: 35
      }
    },
    setup (ctx) {
      // 生成唯一id，避免get时获取目标不对
      const id = `base-scroll-list-${uuidv4()}`
      // 下面代码拿不到dom和宽高，是因为dom是在mounted才进行绘制，而setup是mounted之前就执行了
      // 需要修改useScreen内部的生命周期
      const { width, height } = useScreen(id)

      return {
        id
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
