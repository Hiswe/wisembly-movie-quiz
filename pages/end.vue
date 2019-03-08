<script>
import { mapState, mapGetters } from 'vuex'

import WaButtonPlay from '~/components/button-play'
import {
  HIGHSCORES,
  HIGHSCORES_GETTER_HAS_BETTER_SCORE,
} from '~/store/highscores'

export default {
  name: `wa-page-end`,
  components: {
    WaButtonPlay,
  },
  head: {
    title: `game end`,
  },
  data() {
    return {
      name: ``,
    }
  },
  computed: {
    ...mapState(HIGHSCORES, {
      score: state => state.lastScore,
    }),
    ...mapGetters(HIGHSCORES, {
      hasBetterScore: HIGHSCORES_GETTER_HAS_BETTER_SCORE,
    }),
  },
  methods: {
    saveHighscore() {},
  },
}
</script>

<template lang="pug">
//- this will display score
//- if needed add an entry to the dashboard
wa-main(title="That's all Folks")
  p
    | finale score:
    strong {{score}}
  form(v-if="hasBetterScore" @submit.prevent="saveHighscore")
    p
      | WOW, you've been doing great!
      br
      | You've made it to the highscores!
    input(v-model="name")
    button(type="submit") I want to be remembered
  p
    wa-button-play play again!
  p
    nuxt-link(to="/") highscores
</template>

