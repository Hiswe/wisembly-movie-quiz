<script>
export default {
  name: `q-main`,
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<template lang="pug">
main.q-main(role="main")
  h1.q-main__title {{ title }}
  .q-main__content
    slot
</template>

<style lang="scss" scoped>
.q-main {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}
</style>
