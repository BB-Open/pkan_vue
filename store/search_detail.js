import { make } from 'vuex-pathify';
import Vue from "vue";

export const VUEX_NAMESPACE = "search_detail";

export const state = () => ({
// used in all views
  category_filter: {},
  file_format_filter: {},
  publisher_filter : {},
  license_filter: {},
  search_phrase: '',
  order_by: null,
  search_date_period: [null, null],
  batch_start: 0,
  batch_end: 1,
  batch_results: {},
  results: [],
  result_count: null,
  error: '',
  disable_get_data: false,
});

export const search_selector_fields = ['category_filter', 'file_format_filter', 'publisher_filter', 'license_filter']

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),

  SET_FILTER_STATE (state, {filter, category, new_state}) {
    let new_filter = state[filter];
    new_filter[category] = new_state;
    state[filter] = Object.assign({}, new_filter)
  },
  RESET_FILTER (state, {filter}) {
    state[filter] = {}
  },
  RESET_ALL (state) {
    state['search_phrase'] = '';
    state['search_date_period'] = [null, null];
    search_selector_fields.forEach(function (filter) {
      state[filter] = {}
    })
    state['result_count'] = null;
    state['results'] = [];
    state['order_by'] = null;
    state['batch_start'] = 0;
    state['batch_end'] = 1;
  },
  RESET_SEARCH_RESULTS (state) {
    state['result_count'] = null;
    state['results'] = [];
  },
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
      search_date_period: state.search_date_period,
      search_phrase: state.search_phrase,
    }
  },
  search_params_no_batch: function (state) {
    return {
      file_format: state.file_format_filter,
      category: state.category_filter,
      publisher: state.publisher_filter,
      license: state.license_filter,
      order_by: state.order_by,
      search_date_period: state.search_date_period,
      search_phrase:state.search_phrase,
    }
  },
};
