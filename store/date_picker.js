import { make } from 'vuex-pathify'

export const state = () => ({
// used in all views
  date_picker: {
    last_change: [null, null],
  },
});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

