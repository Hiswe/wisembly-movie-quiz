<script>
import { mapActions, mapGetters, mapState } from 'vuex'

import {
  GAME,
  GAME_QUIT,
  GAME_TICK,
  GAME_ANSWER,
  GAME_GETTER_LAST_QUESTION,
  GAME_GETTER_SCORE,
} from '~/store/game'

export default {
  name: `q-page-play`,
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
      question: GAME_GETTER_LAST_QUESTION,
      score: GAME_GETTER_SCORE,
    }),
    ...mapState(GAME, {
      isLoading: state => state.isLoading,
      duration: state => state.duration,
    }),
  },
  methods: {
    answerYes() {
      this.answer({
        question: {
          ...this.question,
          answer: true,
        },
      })
    },
    answerNo() {
      this.answer({
        question: {
          ...this.question,
          answer: false,
        },
      })
    },
    ...mapActions(GAME, {
      rageQuit: GAME_QUIT,
      tick: GAME_TICK,
      answer: GAME_ANSWER,
    }),
  },
}
</script>

<template lang="pug">
q-main(title="play")
  p {{ duration | duration }}
  p score: {{ score | number }}
  p(v-if="isLoading") …loading…
  div(v-if="question")
    p(v-html="question.text")
    img(:src="question.image")
    q-button(@click="answerYes" :disabled="isLoading") YES
    q-button(@click="answerNo" :disabled="isLoading" secondary) NO
  button(type="button" @click="rageQuit") rage quite
</template>
