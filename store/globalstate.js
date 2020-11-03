import { make } from 'vuex-pathify'

export const VUEX_NAMESPACE = "globalstate";

export const state = () => ({
  error_message: '',
  aria_polite: '',
  aria_assertive: ''
});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

