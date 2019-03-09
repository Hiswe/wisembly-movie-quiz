import Vue from 'vue'

import {
  HIGHSCORES,
  HIGHSCORES_LAST_SET,
  HIGHSCORES_LAST_FLUSH,
} from '~/store/highscores'

const GAME_DURATION_IN_SECOND = process.env.GAME_DURATION_IN_SECOND

export const GAME = `game`

export const state = () => {
  return {
    duration: false,
    isLoading: false,
    questions: [],
  }
}

export const GAME_GETTER_HAS_GAME = `GAME_GETTER_HAS_GAME`
export const GAME_GETTER_LAST_QUESTION = `GAME_GETTER_LAST_QUESTION`
export const GAME_GETTER_SCORE = `GAME_GETTER_SCORE`

export const GAME_START = `GAME_START`
export const GAME_ANSWER = `GAME_ANSWER`
export const GAME_TICK = `GAME_TICK`
export const GAME_QUIT = `GAME_QUIT`

export const getters = {
  [GAME_GETTER_HAS_GAME](state) {
    return state.duration !== false
  },
  [GAME_GETTER_LAST_QUESTION](state) {
    const cannotDisplayQuestion = state.isLoading && !state.questions.length
    if (cannotDisplayQuestion) return false
    return state.questions.slice(-1)[0]
  },
  [GAME_GETTER_SCORE](state) {
    return state.questions
      .filter(question => question.isCorrect)
      .reduce(score => (score += 1000), 0)
  },
}

const M_GAME_START = `M_GAME_START`
const M_GAME_ADD_QUESTION = `M_GAME_ADD_QUESTION`
const M_GAME_UPDATE_QUESTION = `M_GAME_UPDATE_QUESTION`
const M_GAME_LOADING = `M_GAME_LOADING`
const M_GAME_END = `M_GAME_END`
const M_GAME_TICK = `M_GAME_TICK`

export const mutations = {
  [M_GAME_START](state) {
    state.duration = GAME_DURATION_IN_SECOND
    Vue.set(state, `questions`, [])
  },
  [M_GAME_TICK](state) {
    state.duration = state.duration - 1
  },
  [M_GAME_LOADING](state) {
    state.isLoading = true
  },
  [M_GAME_ADD_QUESTION](state, payload) {
    const { question } = payload
    state.isLoading = false
    state.questions.push(question)
  },
  [M_GAME_UPDATE_QUESTION](state, payload) {
    const { question } = payload
    const questionIndex = state.questions.findIndex(q => q.id === question.id)
    // Vue reactivity caveat
    state.questions.splice(questionIndex, 1, question)
  },
  [M_GAME_END](state) {
    state.questions = []
    state.duration = false
  },
}

export const actions = {
  async [GAME_START](vuexCtx) {
    const { $router, $axios } = this
    const { commit, dispatch } = vuexCtx
    commit(M_GAME_START)
    $router.push(`/play`)
    await $axios.$post(`/questions`)
    commit(M_GAME_LOADING)
    dispatch(`${HIGHSCORES}/${HIGHSCORES_LAST_FLUSH}`, {}, { root: true })
    const question = await $axios.$get(`/questions`)
    commit(M_GAME_ADD_QUESTION, { question })
  },
  async [GAME_ANSWER](vuexCtx, payload) {
    const { $axios } = this
    const { commit } = vuexCtx
    const { question } = payload
    // this can be done on the background
    // we should go ASAP to the next question
    $axios
      .$put(`/questions/${question.id}`, { question })
      .then(questionResult => {
        commit(M_GAME_UPDATE_QUESTION, { question: questionResult })
      })
    commit(M_GAME_LOADING)
    const nextQuestion = await $axios.$get(`/questions`)
    commit(M_GAME_ADD_QUESTION, { question: nextQuestion })
  },
  async [GAME_TICK](vuexCtx) {
    const { $router } = this
    const { commit, state, dispatch, getters } = vuexCtx
    if (state.duration > 0) return commit(M_GAME_TICK)
    const score = getters[GAME_GETTER_SCORE]
    dispatch(`${HIGHSCORES}/${HIGHSCORES_LAST_SET}`, { score }, { root: true })
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
