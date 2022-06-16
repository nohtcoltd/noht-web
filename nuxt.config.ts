import { defineNuxtConfig } from '@nuxt/bridge'

const isProduction = process.env.NODE_ENV === 'production'
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
      {
        hid: 'description',
        name: 'description',
        content:
          '株式会社ノート（NOHT CO.,LTD.）はウェブサイトやサービスの企画・運営、システムやアプリケーションの開発を行っています。',
      },
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
  modules: [
    '@nuxtjs/svg',
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/recaptcha',
      {
        hideBadge: false,
        siteKey: process.env.SITE_RECAPTCHA_KEY,
        size: 'normal',
        version: 2,
      },
    ],
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Poppins: {
            wght: [600, 700],
          },
        },
        display: 'block',
        download: true,
        base64: true,
        inject: true,
        outputDir: '~/assets/dist',
      },
    ],
  ],

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

    // hardSource: true,
  },

  generate: {
    subFolders: false,
    fallback: '404.html',
  },

  router: {
    extendRoutes: (routes) => {
      if (isProduction) {
        routes = routes.filter(({ name }) => name !== 'demoTurnBox')
      }

      return routes
    },
  },
})
