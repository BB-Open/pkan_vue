import { make } from 'vuex-pathify'

export const VUEX_NAMESPACE = "plone/plone"

export const state = () => {
  return {
    plone: {}
  }
}

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

import {get_plone_data} from '../components/mixins/utils';

export const actions = {
  plone_request: function ({commit}, payload) {
    get_plone_data(this, payload)
  }
}
