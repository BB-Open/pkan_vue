import { make } from 'vuex-pathify'

export const VUEX_NAMESPACE = "simple_view";

export const state = () => {
  return {
    titles: {},
    descriptions: {},
    datasets: {},
    catalogs: {},
    distributions: {},
    result_fields: {},
  }
};

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
};
