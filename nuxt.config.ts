import { defineNuxtConfig } from '@nuxt/bridge'

export default defineNuxtConfig({
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'NOHT CO.,LTD.',
    htmlAttrs: {
      lang: 'ja',
    },
    link: [{ rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/modern-css-reset/dist/reset.min.css' }],
    script: [
      {
        src: '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js',
      },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,initial-scale=1.0,maximum-scale=1.0' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/VeeValidate'],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/svg', 'nuxt-webfontloader', '@nuxtjs/tailwindcss'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vee-validate/dist/rules'],

    // safariのホットリロードバグ対策
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].[hash].js' : '[chunkhash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].[hash].js' : '[chunkhash].js'),
    },

    // @ts-ignore
    extractCSS: {
      ignoreOrder: true,
    },

    // hardSource: true,
  },

  router: {
    extendRoutes: (routes) => {
      if (process.env.NODE_ENV === 'production') {
        routes.filter(({ name }) => name !== 'demoTurnBox')
      }
    },
  },

  webfontloader: {
    google: {
      families: ['Poppins:400,500,600,700'],
    },
  },
})
