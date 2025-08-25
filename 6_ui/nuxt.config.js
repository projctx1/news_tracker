export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Components',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          ''
      },

      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: true
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap'
      }
    ],
    script: [
      {
        src: 'https://accounts.google.com/gsi/client',
        async: true,
        defer: true
      },
      {
        src: 'https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js',
        type: 'text/javascript'
      },
      {
        //src: '/scripts/index.js'
      },
      {
        //src: '/scripts/firebase.js'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  //plugins: ['~/plugins/vue-lazyload.js'],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],
  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
      '~/assets/scss/mixins.scss',
      '~/assets/scss/main.scss',
      '~/assets/scss/animations.scss',
      '~/assets/scss/classes.scss',
      '~/assets/scss/marketswidget.scss',
      //'~/assets/scss/index.scss',
    ],
    hoistUseStatements: true
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'axios']
  },
  target: 'static',
  generate: {
    fallback: true // creates 200.html for S3
  }
}