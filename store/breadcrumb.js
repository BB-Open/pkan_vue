import { make } from 'vuex-pathify'

export const VUEX_NAMESPACE = "breadcrumb";

export const state = () => ({
// used in all views
  titles: {},

});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
};

export const getters = {
};

