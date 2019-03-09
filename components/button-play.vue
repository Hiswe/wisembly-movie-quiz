<script>
import { mapActions } from 'vuex'

import { GAME, GAME_START } from '~/store/game'

export default {
  name: `q-button-play`,
  methods: {
    ...mapActions(GAME, {
      startGame: GAME_START,
    }),
  },
}
</script>

<template lang="pug">
q-button(@click="startGame" big)
  slot
</template>
