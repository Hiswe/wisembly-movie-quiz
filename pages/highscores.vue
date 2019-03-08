<script>
import { mapState } from 'vuex'

import { HIGHSCORES, HIGHSCORES_LIST } from '~/store/highscores'

export default {
  name: `wa-highscores`,
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
      loading: state => state.loading,
    }),
  },
}
</script>

<template lang="pug">
wa-main(title="highscores")
  p
    nuxt-link(to="/") home
  p(v-if="loading") loading
  ol(v-if="!loading && highscores.length")
    li(v-for="highscore in highscores")
      span {{highscore.name}}
      span {{highscore.score}}
</template>

<style lang="scss" scoped>
// .wa-highscores {
//   border: 1px solid var(--c-grey-lighter);
// }
</style>
