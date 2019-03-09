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
  max-width: 550px;
  margin: 0 auto;
  min-height: 100vh;
  padding: 0 var(--gutter) var(--gutter);
  display: flex;
  flex-direction: column;
}
.q-main__title {
  margin: 0;
  padding: var(--gutter) 0;
}
.q-main__content {
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
}
</style>
