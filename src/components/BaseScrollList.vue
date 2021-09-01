<template>
  <div class="base-scroll-list">
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
  export default {
    name: 'BaseScrollList',
    props: {
      // 标题数据， 格式类似['a','b',...]
      header: Array,
      // 标题样式, 支持定制每个标题的样式 [{},{},...]
      headerStyle: Array,
      headerBg: {
        type: String,
        default: 'rgb(90,90,90)'
      },
      headerHeight: {
        type: [String, Number],
        default: 35
      }
    },
    setup (ctx) {

    }
  }
</script>
<style scoped lang="scss">
  .base-scroll-list {
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
        width: 150px;
      }
    }
  }

</style>
