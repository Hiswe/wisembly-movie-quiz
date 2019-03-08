import Vue from 'vue'

export const HIGHSCORES = `highscores`

export const state = () => {
  return {
    list: [],
    isLoading: false,
    isLoaded: false,
  }
}

export const HIGHSCORES_LIST = `HIGHSCORES_LIST`

const M_HIGHSCORES_SET_ALL = `M_HIGHSCORES_SET_ALL`
const M_HIGHSCORES_LOADING = `M_HIGHSCORES_LOADING`

export const mutations = {
  [M_HIGHSCORES_SET_ALL](state, payload) {
    const { highscores } = payload
    Vue.set(state, `list`, highscores)
    state.isLoading = false
    state.isLoaded = true
  },
  [M_HIGHSCORES_LOADING](state) {
    state.loading = true
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
}
