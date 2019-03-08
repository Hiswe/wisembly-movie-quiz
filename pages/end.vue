<script>
export default {
  name: `wa-page-end`,
}
</script>

<template lang="pug">
//- this will display score
//- if needed add an entry to the dashboard
wa-main(title="That's all Folks")
  p
    nuxt-link(to="/") home
  p
    nuxt-link(to="/") highscores
</template>

