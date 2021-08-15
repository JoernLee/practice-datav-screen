<template>
  <div class="imooc-loading">
    <svg :width="width" :height="height" viewBox="0 0 50 50" preserveAspectRatio="xMidYMid meet">
      <!--
          dasharray = 2Π*r/4 -> 计算被切除的length
          linecap: 修改边角为圆形
      -->
      <circle
        r="22"
        cx="25"
        cy="25"
        fill="none"
        stroke-width="3"
        :stroke="outsideColor"
        stroke-dasharray="34"
        stroke-linecap="round"
      >
        <!-- 注意控制旋转中心，为中心点才行， 就是控制from和
         to的2，3参数来更新参考点(1参数是角度)
         也可以通过values="0 25 25;360 25 25"来代替from和to
         -->
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          values="#3be6cb;#02bcfe;#3be6cb"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        r="12"
        cx="25"
        cy="25"
        fill="none"
        stroke-width="3"
        :stroke="insideColor"
        stroke-dasharray="19"
        stroke-linecap="round"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="360 25 25"
          to="0 25 25"
          :dur="`${+duration}s`"
          repeatCount="indefinite"
        />
        <animate
          attributeName="stroke"
          values="#02bcfe;#3be6cb;#02bcfe"
          :dur="`${+duration * 2}s`"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
    <div class="imooc-loading-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { computed } from 'vue'

  export default {
    name: 'ImoocLoading',
    props: {
      width: {
        type: [Number, String],
        default: 50
      },
      height: {
        type: [Number, String],
        default: 50
      },
      outsideColor: {
        type: String,
        default: '#3be6cb'
      },
      insideColor: {
        type: String,
        default: '#02bcfe'
      },
      duration: {
        type: [Number, String],
        default: 2
      }
    },
    setup (ctx) {
      // 通过计算属性得到animate的变色values
      const outSideColorAnimation = computed(() =>
        `${ctx.outsideColor};${ctx.insideColor};${ctx.outsideColor}`)
      const inSideColorAnimation = computed(() =>
        `${ctx.insideColor};${ctx.outsideColor};${ctx.insideColor}`)

      return {
        outSideColorAnimation,
        inSideColorAnimation
      }
    }
  }
</script>

<style lang="scss">
  .imooc-loading {
    /*保证loading可以垂直居中*/
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
