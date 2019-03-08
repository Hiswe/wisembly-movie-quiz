<script>
export default {
  name: `wa-main`,
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<template lang="pug">
main.wa-main(role="main")
  h1.wa-main__title {{ title }}
  .wa-main__content
    slot
</template>

<style lang="scss" scoped>
.wa-main {
  text-align: center;
}
</style>
