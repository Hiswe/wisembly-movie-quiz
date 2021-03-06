import rc from 'rc'

const config = rc(`quiz`, {
  GAME_DURATION_IN_SECOND: 60,
})

export default {
  css: [`@/assets/global.css`],
  modules: [`@nuxtjs/axios`],
  plugins: [`@/plugins/global-components.js`, `@/plugins/vue-filters.js`],
  router: {
    middleware: [`state-route-redirections`],
  },
  env: {
    GAME_DURATION_IN_SECOND: config.GAME_DURATION_IN_SECOND,
  },
  axios: {
    baseURL: `http://localhost:4080`,
    browserBaseURL: `http://localhost:4080`,
  },
  loading: {
    color: `#3adda2`,
  },
  head: {
    titleTemplate: `Da Movie Quiz  – %s`,
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` },
      { rel: `icon`, href: `/favicon.png`, type: `image/png` },
    ],
  },
}
