export const state = () => ({
// used in all views
  keywords: '',
  category: {
    'value_pos': [],
    'value_neg': []
  },
  order_by: null,
  sparql: ''
});

export const mutations = {
  set_keywords(state, data) {
    state.keywords = data
  },
  set_category(state, data) {
    state.category = data
  },
  set_order_by(state, data) {
    state.order_by = data
  },
  set_sparql(state, data) {
    state.sparql = data
  },
  set_search_results(state, data) {
    state.search_results = data
  }
};

export const getters = {
  search: function (state) {
    return {
      keywords: state.keywords,
      category: state.category,
      order_by: state.order_by,
      sparql: state.sparql,
    }
  }
};
