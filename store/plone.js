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
