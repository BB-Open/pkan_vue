import { make } from 'vuex-pathify'

export const VUEX_NAMESPACE = "search_sparql"

export const state = () => ({
  sparql_query: 'prefix dcat: <http://www.w3.org/ns/dcat#>\n' +
    'SELECT DISTINCT ?id WHERE {\n' +
    '  ?id a dcat:Dataset .\n' +
    '}',
  batch_start: 0,
  batch_end: 1,
  results: [],
  result_count: 0,
  error: '',
});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

export const getters = {
  search_params: function (state) {
    return {
      sparql: state.sparql_query,
      batch_start: state.batch_start,
      batch_end: state.batch_end,
    }
  }
};