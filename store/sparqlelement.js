import { make } from 'vuex-pathify'

export const VUEX_NAMESPACE = "sparqlelement";

export const state = () => {
  return {
    titles: {},
    descriptions: {},
    downloads: {},
    fields: {},
    networks: {},
    labels: {},

  }
};

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
};
