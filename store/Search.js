export const state = () => ({
// used in all views
  textline_keywords: '',
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
  last_change: [null, null],
  sparql: 'prefix dcat: <http://www.w3.org/ns/dcat#>\n' +
    'SELECT DISTINCT ?id WHERE {\n' +
    '  ?id a dcat:Dataset .\n' +
    '}',
  batch_start: 0,
  batch_end: 1
});

export const mutations = {
  set_textline_keywords(state, data) {
    state.textline_keywords = data
  },
  set_publisher(state, data) {
    state.publisher = data
  },
  set_license(state, data) {
    state.license = data
  },
  set_category(state, data) {
    state.category = data
  },
  set_file_format(state, data) {
    state.file_format = data
  },
  set_order_by(state, data) {
    state.order_by = data
  },
  set_sparql(state, data) {
    state.sparql = data
  },
  set_search_results(state, data) {
    state.search_results = data
  },
  set_batch_start(state, data) {
    state.batch_start = data
  },
  set_batch_end(state, data) {
    state.batch_end = data
  },
  set_last_change(state, data) {
    state.last_change = data
  }

};

export const getters = {
  search: function (state) {
    return {
      textline_keywords: state.textline_keywords,
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
  search_sparql: function (state) {
    return {
      sparql: state.sparql,
      batch_start: state.batch_start,
      batch_end: state.batch_end,
    }
  }
};
