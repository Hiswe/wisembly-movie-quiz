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
q-main(title="highscores")
  p
    nuxt-link(to="/") home
  p(v-if="isLoading  && !highscores.length") …loading…
  ol.highscores(v-if="!isLoading && highscores.length")
    li.highscores__item(v-for="highscore in highscores" :key="highscore.id")
      span.highscores__name {{highscore.name}}
      span.highscores__score {{highscore.score | number }}
</template>

<style lang="scss" scoped>
.highscores {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  border: 2px solid var(--c-grey-lightest);
  padding: 2.85rem 1.4rem;
  border-radius: var(--border-radius);
  outline: 0;
  counter-reset: highscore;

  &::after {
    content: '';
    border-style: solid;
    border-width: 26px 26px 0 0;
    border-color: var(--c-grey-lightest) white white;
    position: absolute;
    bottom: -2px;
    right: -2px;
  }
}
.highscores__item {
  display: flex;
  padding: 0.5rem 0;

  &::before {
    counter-increment: highscore;
    content: counter(highscore, decimal-leading-zero) ' - ';
    padding-right: 0.5em;
    font-family: var(--font-monospace);
    color: var(--c-grey-lighter);
  }

  &::after {
    content: '';
    order: 2;
    flex: 1 1 auto;
    border-bottom: 2px dotted var(--c-grey-lightest);
  }
}
.highscores__name {
  order: 1;
  color: var(--c-primary);
}
.highscores__score {
  order: 3;
  font-family: var(--font-monospace);
  color: var(--c-accent);
}
</style>
