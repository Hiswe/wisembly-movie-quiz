import { GAME, GAME_GETTER_HAS_GAME } from '~/store/game'

export default function stateRouteRedirections(nuxtCtx) {
  const { store, redirect, route } = nuxtCtx

  const hasGame = store.getters[`${GAME}/${GAME_GETTER_HAS_GAME}`]
  const hasScored = store.state.highscores.lastScore !== false

  if (hasGame && route.name !== `play`) redirect(`/play`)
  if (!hasGame && route.name === `play`) redirect(`/`)
  if (!hasScored && route.name === `end`) redirect(`/`)
}
