<template>
  <svg :style="{...style}">
    <use :href="iconName"/>
  </svg>
</template>

<script>
  export default {
    name: 'Icon',
    props: {
      name: String,
      prefix: {
        type: String,
        default: 'icon-'
      },
      style: Object
    },
    setup (ctx) {
      const iconName = `#${ctx.prefix}${ctx.name}`
      return {
        iconName
      }
    }
  }
</script>
<style scoped>
</style>
