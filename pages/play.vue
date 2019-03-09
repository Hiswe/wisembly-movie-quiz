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
  p
    a(href="#venere" @click.prevent="rageQuit") rage quit
  header.game-header
    dl.game-header__item
      dt.game-header__text remaining:
      dd.game-header__value {{ duration | duration }}

    dl.game-header__item
      dt.game-header__text score:
      dd.game-header__value {{ score | number }}
  p(v-if="isLoading") …loading…
  template(v-if="question")
    dl.question
      dt.question__text-container: div.question__text(v-html="question.text")
      dd.question__image: img(:src="question.image")
    .quiz-actions
      q-button(@click="answerYes" :disabled="isLoading" big) YES
      q-button(@click="answerNo" :disabled="isLoading" secondary big) NO
</template>

<style lang="scss" scoped>
.game-header {
  display: flex;
  background: var(--c-white-darker);
  padding: var(--half-gutter) var(--gutter);
  border-radius: var(--border-radius);
}
.game-header__item {
  margin: 0;
  text-align: left;

  &:last-child {
    margin-left: auto;
    text-align: right;
  }
}
.game-header__value {
  font-family: var(--font-monospace);
  margin: 0;
  font-size: 1.35em;
  font-weight: bold;
}

.question {
  margin-top: var(--gutter);
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  border: 2px solid var(--c-grey-lighter);
  background: var(--c-white-darker);
  border-radius: var(--border-radius);
}
.question__text-container {
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  padding: var(--gutter);
}
.question__text {
  line-height: 1.4;
}
.question__image {
  width: 50%;
  margin: 0;
  object-fit: cover;

  img {
    display: block;
    height: 100%;
    width: 100%;
  }
}
.quiz-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: var(--gutter) 0 0;
  grid-gap: var(--gutter);
}
hr {
  margin: var(--gutter) 0;
}
</style>
