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
  mode: "universal",
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
    {src:"./plugins/vue_static", ssr: true},
    {src:"./plugins/vue_socket_io", ssr: false},
    {src:"./plugins/event_bus", ssr: true},
    {src:"./plugins/infinite_scroll", ssr: false},
    {src:"./plugins/VueMQ", ssr: true}
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ["nuxt-log", logOptions],
    "@nuxtjs/axios"
  ],
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
//    transpile: ["vue_static"],
    transpile: ["vue-static", "vue-socket.io", "bootstrap-vue"],
    babel: {
      presets({ envName }) {
        const envTargets = {
          client: { ie: 10 },
          server: { node: "current" },
        }
        return [
          [
            "@nuxt/babel-preset-app",
            {
              targets: envTargets[envName]
            }
          ]
        ]
      }
    }
  }
};
