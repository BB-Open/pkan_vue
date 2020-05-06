import { make } from 'vuex-pathify'

export const VUEX_NAMESPACE = "search_detail"

export const state = () => ({
// used in all views
  category: {
    'value_pos': [],
    'value_neg': []
  },
  file_format: {
    'value_pos': [],
    'value_neg': []
  },
  publisher: {
    'value_pos': [],
    'value_neg': []
  },
  license: {
    'value_pos': [],
    'value_neg': []
  },
  order_by: null,

  batch_start: 0,
  batch_end: 1,
  results: [],
  result_count: 0,
  error: [],
});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

export const getters = {
  search_params: function (state) {
    return {
      file_format: state.file_format,
      category: state.category,
      publisher: state.publisher,
      license: state.license,
      order_by: state.order_by,
      batch_start: state.batch_start,
      batch_end: state.batch_end,
      last_change: state.last_change
    }
  },
};
