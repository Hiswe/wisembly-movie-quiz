<script>
import { mapActions } from 'vuex'

import { GAME, GAME_START } from '~/store/game'

export default {
  name: `aw-page-index`,
  components: {},
  head: {
    title: `welcome`,
  },
  methods: {
    ...mapActions(GAME, {
      startGame: GAME_START,
    }),
  },
}
</script>

<template lang="pug">
wa-main(title="Da Movie Quiz")
  p
    button(type="button" @click="startGame") play!
  p
    nuxt-link(to="/highscores") highscores
</template>

<style lang="scss" scoped>
</style>
