<script>
import { mapActions, mapGetters } from 'vuex'

import {
  GAME,
  GAME_QUIT,
  GAME_TICK,
  GAME_GETTER_REMAINING_TIME,
} from '~/store/game'

export default {
  name: `aw-page-play`,
  head: {
    title: `play`,
  },
  data() {
    return {
      intervalID: false,
    }
  },
  created() {
    this.intervalID = setInterval(() => this.tick(), 1000)
  },
  beforeDestroy() {
    clearInterval(this.intervalID)
  },
  computed: {
    ...mapGetters(GAME, {
      remainingTime: GAME_GETTER_REMAINING_TIME,
    }),
  },
  methods: {
    ...mapActions(GAME, {
      rageQuit: GAME_QUIT,
      tick: GAME_TICK,
    }),
  },
}
</script>

<template lang="pug">
wa-main(title="play")
  p {{ remainingTime }}
  button(type="button" @click="rageQuit") rage quite
</template>
