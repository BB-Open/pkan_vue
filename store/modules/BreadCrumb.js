import { make } from 'vuex-pathify'

export const state = () => ({
// used in all views
  currentView: null,
  last_title: null,
  title: '',

});

const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

export const getters = {
  breadcrumb: function (state) {
    return [state.currentView, state.last_title]
  },
  title: function (state) {
    return state.title
  }
};

export default {
  namespaced: true,
  state,
  mutations
}
