<script>
import { mapActions } from 'vuex'

import { GAME, GAME_START } from '~/store/game'
import QButton from '~/components/ui/button'

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
q-button(@click="startGame")
  slot
</template>
