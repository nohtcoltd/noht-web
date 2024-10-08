import { defineNuxtConfig } from 'nuxt'
import svgLoader from 'vite-svg-loader'

const isProduction = process.env.NODE_ENV === 'production'
export default defineNuxtConfig({
  publicRuntimeConfig: {
    siteRecaptchaKey: process.env.SITE_RECAPTCHA_KEY
  },
  vite: {
    plugins: [svgLoader()],
  },
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  // Global page headers: https://go.nuxtjs.dev/config-head
  meta: {
    title: 'NOHT CO.,LTD.',
    charset: 'utf-8',
    viewport: 'width=device-width,initial-scale=1.0,maximum-scale=1.0',
    htmlAttrs: {
      lang: 'ja',
    },
    script: [
      {
        src: '//cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js',
      },
    ],
    meta: [
      {
        hid: 'description',
        name: 'description',
        content:
          '株式会社ノート（NOHT CO.,LTD.）はウェブサイトやサービスの企画・運営、システムやアプリケーションの開発を行っています。',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'stylesheet', href: '//cdn.jsdelivr.net/npm/modern-css-reset/dist/reset.min.css' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/css/main.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/tailwindcss',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // safariのホットリロードバグ対策
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].[hash].js' : '[chunkhash].js'),
      chunk: ({ isDev }) => (isDev ? '[name].[hash].js' : '[chunkhash].js'),
    },

    // @ts-ignore
    extractCSS: {
      ignoreOrder: true,
    },

    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },

    // hardSource: true,
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
