<script>
import { mapActions } from 'vuex'

export default {
  name: `aw-page-index`,
  components: {},
  head: {
    title: `welcome`,
  },
  methods: {},
}
</script>

<template lang="pug">
wa-main(title="Da Movie Quiz")
  p
    nuxt-link(to="/play") play!
  p
    nuxt-link(to="/highscores") highscores
</template>

<style lang="scss" scoped>
</style>

