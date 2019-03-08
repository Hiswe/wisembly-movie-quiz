import rc from 'rc'

const config = rc(`wisembly`)

export default {
  css: [`@/assets/global.css`],
  plugins: [`@/plugins/global-wisembly-components.js`],
  loading: {
    color: `#3adda2`,
  },
  head: {
    titleTemplate: `Do Movie Quiz  – %s`,
    meta: [
      { charset: `utf-8` },
      { name: `viewport`, content: `width=device-width, initial-scale=1` },
      { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` },
      { rel: `icon`, href: `/favicon.png`, type: `image/png` },
    ],
  },
}
