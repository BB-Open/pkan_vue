import { make } from 'vuex-pathify'

export const state = () => ({
  sparql: 'prefix dcat: <http://www.w3.org/ns/dcat#>\n' +
    'SELECT DISTINCT ?id WHERE {\n' +
    '  ?id a dcat:Dataset .\n' +
    '}',
  batch_start: 0,
  batch_end: 1
});

export const mutations = {
  // create SET_VALUE automatically
  ...make.mutations(state),
}

export const getters = {
  search: function (state) {
    return {
      sparql: state.sparql,
      batch_start: state.batch_start,
      batch_end: state.batch_end,
    }
  }
};
