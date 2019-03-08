<script>
import { mapActions } from 'vuex'

import { GAME, GAME_START } from '~/store/game'

export default {
  name: `wa-button-play`,
  methods: {
    ...mapActions(GAME, {
      startGame: GAME_START,
    }),
  },
}
</script>

<template lang="pug">
button(type="button" @click="startGame")
  slot
</template>
