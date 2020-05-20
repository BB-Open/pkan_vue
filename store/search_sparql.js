import { make } from 'vuex-pathify'

export const VUEX_NAMESPACE = "search_sparql"

export const DEFAULT_SPARQL_QUERY = 'prefix dcat: <http://www.w3.org/ns/dcat#>\n' +
    'SELECT DISTINCT ?id WHERE {\n' +
    '  ?id a dcat:Dataset .\n' +
    '}'

export const state = () => ({
  sparql_query: DEFAULT_SPARQL_QUERY,
  batch_start: 0,
  batch_end: 1,
  results: [],
  batch_results: {},
  // null to differentiate between 0 results and nothing loaded
  result_count: null,
  error: '',
});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),

  RESET_ALL (state) {
    state['sparql_query'] = DEFAULT_SPARQL_QUERY
  },
}

export const getters = {
  search_params: function (state) {
    return {
      sparql: state.sparql_query,
      batch_start: state.batch_start,
      batch_end: state.batch_end,
    }
  },
  search_params_no_batch: function (state) {
    return {
      sparql: state.sparql_query,
    }
  }
};
