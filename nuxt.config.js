import pkg from "./package";

export default {
//  mode: "spa",
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
    {src:"./plugins/event_bus", ssr: true},
    {src:"./plugins/infinite_scroll", ssr: false},
    {src:"./plugins/VueMQ", ssr: true},
    {src:"./plugins/vuejs_logger", ssr: true},
    {src:"./store/index", ssr: true},
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
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
