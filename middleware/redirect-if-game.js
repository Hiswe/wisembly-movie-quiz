import { GAME, GAME_GETTER_HAS_GAME } from '~/store/game'

export default function redirectIfGame(nuxtCtx) {
  const { store, redirect, route } = nuxtCtx

  const hasGame = store.getters[`${GAME}/${GAME_GETTER_HAS_GAME}`]

  if (hasGame && route.name !== `play`) redirect(`/play`)
  if (!hasGame && route.name === `play`) redirect(`/`)
}
