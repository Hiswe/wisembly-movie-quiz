import Vue from 'vue'

export const HIGHSCORES = `highscores`

export const state = () => {
  return {
    list: [],
    isLoading: false,
    isLoaded: false,
    lastScore: false,
  }
}

export const HIGHSCORES_GETTER_HAS_BETTER_SCORE = `HIGHSCORES_GETTER_HAS_BETTER_SCORE`

export const getters = {
  [HIGHSCORES_GETTER_HAS_BETTER_SCORE](state) {
    if (!state.isLoaded) return false
    if (!state.lastScore) return false
    return state.list.slice(-1)[0].score < state.lastScore
  },
}

export const HIGHSCORES_LIST = `HIGHSCORES_LIST`
export const HIGHSCORES_LAST_SET = `HIGHSCORES_LAST_SET`
export const HIGHSCORES_LAST_SAVE = `HIGHSCORES_LAST_SAVE`
export const HIGHSCORES_LAST_FLUSH = `HIGHSCORES_LAST_FLUSH`

const M_HIGHSCORES_SET_ALL = `M_HIGHSCORES_SET_ALL`
const M_HIGHSCORES_LOADING = `M_HIGHSCORES_LOADING`
const M_HIGHSCORES_SET_LAST_SCORE = `M_HIGHSCORES_SET_LAST_SCORE`
const M_HIGHSCORES_SET = `M_HIGHSCORES_SET`

export const mutations = {
  [M_HIGHSCORES_SET_ALL](state, payload) {
    const { highscores } = payload
    Vue.set(state, `list`, highscores)
    state.isLoading = false
    state.isLoaded = true
  },
  [M_HIGHSCORES_LOADING](state) {
    state.isLoading = true
  },
  [M_HIGHSCORES_SET_LAST_SCORE](state, payload) {
    const { score } = payload
    state.lastScore = score
  },
  [M_HIGHSCORES_SET](state, payload) {
    const { highscores } = payload
    Vue.set(state, `list`, highscores)
    state.isLoading = false
  },
}

export const actions = {
  async [HIGHSCORES_LIST](vuexCtx) {
    const { $axios } = this
    const { commit, state } = vuexCtx
    if (state.isLoaded) return
    commit(M_HIGHSCORES_LOADING)
    const highscores = await $axios.$get(`/${HIGHSCORES}`)
    commit(M_HIGHSCORES_SET_ALL, { highscores })
  },
  async [HIGHSCORES_LAST_SET](vuexCtx, payload) {
    const { commit, dispatch, state } = vuexCtx
    const { score } = payload
    commit(M_HIGHSCORES_SET_LAST_SCORE, { score })
    if (!state.isLoaded) dispatch(HIGHSCORES_LIST)
  },
  async [HIGHSCORES_LAST_FLUSH](vuexCtx) {
    const { commit } = vuexCtx
    commit(M_HIGHSCORES_SET_LAST_SCORE, { score: false })
  },
  async [HIGHSCORES_LAST_SAVE](vuexCtx, payload) {
    const { $axios, $router } = this
    const { commit } = vuexCtx
    const { highscore } = payload
    commit(M_HIGHSCORES_LOADING)
    const dbHighscore = await $axios.$post(`/${HIGHSCORES}`, { highscore })
    commit(M_HIGHSCORES_SET, { highscores: dbHighscore })
    commit(M_HIGHSCORES_SET_LAST_SCORE, { score: false })
    $router.push(`/highscores`)
  },
}
