<script>
import { mapState } from 'vuex'

import { HIGHSCORES, HIGHSCORES_LIST } from '~/store/highscores'

export default {
  name: `q-highscores`,
  head: {
    title: `Highscores`,
  },
  async fetch(nuxtCtx) {
    const { store } = nuxtCtx
    await store.dispatch(`${HIGHSCORES}/${HIGHSCORES_LIST}`)
  },
  computed: {
    ...mapState(HIGHSCORES, {
      highscores: state => state.list,
      isLoading: state => state.isLoading,
    }),
  },
}
</script>

<template lang="pug">
wa-main(title="highscores")
  p
    nuxt-link(to="/") home
  p(v-if="isLoading") …loading…
  ol(v-if="!isLoading && highscores.length")
    li(v-for="highscore in highscores" :key="highscore.id")
      span {{highscore.name}}
      span {{highscore.score}}
</template>

<style lang="scss" scoped>
</style>
