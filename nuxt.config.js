import colors from 'vuetify/es5/util/colors';

export default {
  target: 'static',
  components: true,
  head: {
    titleTemplate: `%s - ${process.env.npm_package_name}`,
    title: process.env.npm_package_name || '',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1'
      },
      {
        hid: 'description ',
        name: 'description ',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  },

  loading: {
    color: '#00C58E'
  },

  plugins: [
    '~/plugins/books-api'
  ],

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
  ],

  pwa: {
    meta: {
      'theme_color': '#795548'
    },
    icon: {
      fileName: 'logo.png'
    },
    manifest: {
      'name': 'hLib - Home library',
      'short_name': 'hLib',
      'start_url': '/',
      'display': 'standalone',
      'background_color': '#fff',
      'description': 'Easy to use home library in your browser'
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
};
