//import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import add_ep_set from '../lib/vuex_helper'

export const  plugins = [
  pathify.plugin,
  add_ep_set
]

export const state = () => ({
})
