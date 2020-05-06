import { make } from 'vuex-pathify'

export const state = () => ({
// used in all views
  textline_keywords: '',
});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}
