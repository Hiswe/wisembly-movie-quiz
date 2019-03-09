<script>
import QButtonPlay from '~/components/button-play'

export default {
  name: `q-page-index`,
  components: {
    QButtonPlay,
  },
  head: {
    title: `welcome`,
  },
}
</script>

<template lang="pug">
q-main(title="Da Movie Quiz")
  article
    | You should answer correctly to the questions.
    br
    | Answer as many questions as you can during the imparted time…
    br
    | …and make it to the Highscores!! (maybe)
  p
    q-button-play play!
  p
    nuxt-link(to="/highscores") highscores
</template>

<style lang="scss" scoped>
</style>
