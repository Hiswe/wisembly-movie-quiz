<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import QButtonPlay from '~/components/button-play'
import QTextField from '~/components/ui/text-field'
import {
  HIGHSCORES,
  HIGHSCORES_GETTER_HAS_BETTER_SCORE,
  HIGHSCORES_LAST_SAVE,
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
      error: false,
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
    onSubmit() {
      if (!this.name) return (this.error = true)
      this.error = false
      this.saveHighscore({
        highscore: {
          name: this.name,
          score: this.score,
        },
      })
    },
    ...mapActions(HIGHSCORES, {
      saveHighscore: HIGHSCORES_LAST_SAVE,
    }),
  },
}
</script>

<template lang="pug">
//- this will display score
//- if needed add an entry to the dashboard
q-main(title="That's all Folks")
  p
    nuxt-link(to="/highscores") highscores
  p
    | finale score:
    strong {{score | numeric}}
  form(v-if="hasBetterScore" @submit.prevent="onSubmit")
    p
      | WOW, you've been doing great!
      br
      | You've made it to the highscores!
    .q-fieldset(role="group")
      q-text-field.q-fieldset__input(
        v-model="name"
        name="name"
        required
      )
      q-button.q-fieldset__button(type="submit" secondary) ok
  p
    q-button-play play again!

</template>

<style lang="scss" scoped>
// fieldset elements don't support `flex` display property
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
