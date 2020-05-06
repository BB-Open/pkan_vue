import { make } from 'vuex-pathify'

export const state = () => ({
// used in all views
  error_message: '',
});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

