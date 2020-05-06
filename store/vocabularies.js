import { make } from 'vuex-pathify'

export const state = () => {
  return {
    vocabularies: {}
  }
}

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}
