import pkg from "./package";

const logOptions = {
  // optional : defaults to true if not specified
  isEnabled: true,
  // required ['debug', 'info', 'warn', 'error', 'fatal']
  logLevel: "debug",
  // optional : defaults to false if not specified
  stringifyArguments: false,
  // optional : defaults to false if not specified
  showLogLevel: false,
  // optional : defaults to false if not specified
  showMethodName: false,
  // optional : defaults to '|' if not specified
  separator: "|",
  // optional : defaults to false if not specified
  showConsoleColors: false
};

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    title: "DatenAdler: Das Open-Data-Portal für Brandenburg",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: pkg.description }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [{ src: "/js/object-assign.js" }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },

  /*
   ** Global CSS
   */
  css: [
    "assets/styles.css",
    "assets/plone_styles.css",
    "assets/font_awesome/font-awesome.min.css"
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "./plugins/vue_static",
    "./plugins/vue_socket_io",
    "./plugins/event_bus",
    "./plugins/infinite_scroll",
    "./plugins/VueMQ",
    "./plugins/datepicker"
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [["nuxt-log", logOptions], "@nuxtjs/axios"],
  axios: {
    // proxyHeaders: false
  },

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    transpile: ["vue-socket.io", "bootstrap-vue"],
    babel: {
      presets: [
        [
          "@babel/env",
          {
            // useBuiltIns: true
            targets: { ie: 10, uglify: true }
          }
        ]
      ]
    }
  }
};
