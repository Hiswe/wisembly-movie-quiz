import { Duration } from 'luxon'

const GAME_DURATION_IN_SECOND = process.env.GAME_DURATION_IN_SECOND

export const GAME = `game`

export const state = () => {
  return {
    duration: false,
    question: false,
    results: [],
  }
}

export const GAME_GETTER_HAS_GAME = `GAME_GETTER_HAS_GAME`
export const GAME_GETTER_REMAINING_TIME = `GAME_GETTER_REMAINING_TIME`

export const GAME_START = `GAME_START`
export const GAME_TICK = `GAME_TICK`
export const GAME_QUIT = `GAME_QUIT`

export const getters = {
  [GAME_GETTER_HAS_GAME](state) {
    return state.duration !== false
  },
  [GAME_GETTER_REMAINING_TIME](state) {
    if (typeof state.duration !== `number`) return `00:00`
    return Duration.fromObject({ seconds: state.duration }).toFormat(`mm:ss`)
  },
}

const M_GAME_START = `M_GAME_START`
const M_GAME_END = `M_GAME_END`
const M_GAME_TICK = `M_GAME_TICK`

export const mutations = {
  [M_GAME_START](state) {
    state.duration = GAME_DURATION_IN_SECOND
  },
  [M_GAME_TICK](state) {
    state.duration = state.duration - 1
  },
  [M_GAME_END](state) {
    state.duration = false
  },
}

export const actions = {
  async [GAME_START](vuexCtx) {
    const { $router } = this
    const { commit } = vuexCtx
    commit(M_GAME_START)
    $router.push(`/play`)
  },
  async [GAME_TICK](vuexCtx) {
    const { $router } = this
    const { commit, state } = vuexCtx
    if (state.duration > 0) return commit(M_GAME_TICK)
    commit(M_GAME_END)
    $router.push(`/end`)
  },
  async [GAME_QUIT](vuexCtx) {
    const { $router } = this
    const { commit } = vuexCtx
    commit(M_GAME_END)
    $router.push(`/`)
  },
}
