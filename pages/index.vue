<script>
import QButtonPlay from '~/components/button-play'

export default {
  name: `q-page-index`,
  components: {
    QButtonPlay,
  },
  transition: `page`,
  head: {
    title: `welcome`,
  },
}
</script>

<template lang="pug">
q-main(title="Da Movie Quiz")
  p
    nuxt-link(to="/highscores") highscores
  article
    | You should answer correctly to the questions.
    br
    | Answer as many questions as you can during the imparted time…
    br
    | …and make it to the Highscores!! (maybe)
  p
    q-button-play play!
</template>

<style lang="scss" scoped>
</style>
