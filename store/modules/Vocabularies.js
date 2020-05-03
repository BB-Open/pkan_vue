import { make } from 'vuex-pathify'

function state () {
  return {
    vocabularies: {}
  }
}

const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

export default {
  namespaced: true,
  state,
  mutations
}
