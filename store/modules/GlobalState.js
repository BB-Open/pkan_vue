import { make } from 'vuex-pathify'

export const state = () => ({
// used in all views
  error_message: '',
});

const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

export default {
  namespaced: true,
  state,
  mutations
}
