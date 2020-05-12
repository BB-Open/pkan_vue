import { make } from 'vuex-pathify'

export const VUEX_NAMESPACE = "globalstate"

export const state = () => ({
// used in all views
  error_message: '',
  aria_polite: 'XXXX',
  aria_assertive: '>>>>'
});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

