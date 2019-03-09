<script>
import { mapState, mapGetters } from 'vuex'

import QButtonPlay from '~/components/button-play'
import QTextField from '~/components/ui/text-field'
import {
  HIGHSCORES,
  HIGHSCORES_GETTER_HAS_BETTER_SCORE,
} from '~/store/highscores'

export default {
  name: `q-page-end`,
  components: {
    QButtonPlay,
    QTextField,
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
q-main(title="That's all Folks")
  p
    | finale score:
    strong {{score}}
  form(v-if="hasBetterScore" @submit.prevent="saveHighscore")
    p
      | WOW, you've been doing great!
      br
      | You've made it to the highscores!
    .q-fieldset(role="group")
      q-text-field.q-fieldset__input(v-model="name")
      q-button.q-fieldset__button(type="submit" secondary) ok
  p
    q-button-play play again!
  p
    nuxt-link(to="/") highscores
</template>

<style lang="scss" scoped>
.q-fieldset {
  max-width: 300px;
  display: flex;
  margin: 0 auto;
}
.q-fieldset__input {
  flex: 1 0 auto;
  margin: 0;
  text-align: left;
}
.q-fieldset__button {
  margin: 0 0 0 var(--gutter);
}
</style>
