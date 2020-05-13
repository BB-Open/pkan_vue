import { make } from 'vuex-pathify';
import Vue from "vue";

export const VUEX_NAMESPACE = "search_detail"

export const state = () => ({
// used in all views
  category_filter: {},
  file_format_filter: {},
  publisher_filter : {},
  license_filter: {},
  textline_keywords: '',
  order_by: null,
  last_change: [null, null],
  batch_start: 0,
  batch_end: 1,
  results: [],
  result_count: 0,
  error: [],
});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),

  SET_FILTER_STATE (state, {filter, category, new_state}) {
    let new_filter = state[filter]
    new_filter[category] = new_state
    state[filter] = Object.assign({}, new_filter)
  },
  RESET_FILTER (state, {filter}) {
    Vue.set( state, filter, {})
  }
}

export const getters = {
  search_params: function (state) {
    return {
      file_format: state.file_format_filter,
      category: state.category_filter,
      publisher: state.publisher_filter,
      license: state.license_filter,
      order_by: state.order_by,
      batch_start: state.batch_start,
      batch_end: state.batch_end,
      last_change: state.last_change,
      textline_keywords:state.textline_keywords,
    }
  },
};
