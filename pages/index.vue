<script>
import WaButtonPlay from '~/components/button-play'

export default {
  name: `aw-page-index`,
  components: {
    WaButtonPlay,
  },
  head: {
    title: `welcome`,
  },
}
</script>

<template lang="pug">
wa-main(title="Da Movie Quiz")
  article
    | You should answer correctly to the questions.
    br
    | Answer as many questions as you can during the imparted time…
    br
    | …and make it to the Highscores!! (maybe)
  p
    wa-button-play play!
  p
    nuxt-link(to="/highscores") highscores
</template>

<style lang="scss" scoped>
</style>
