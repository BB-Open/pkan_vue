import Vuex from 'vuex'
import pathify from 'vuex-pathify'

import vocabularies from './modules/Vocabularies'
import breadcrumb from './modules/BreadCrumb'
import globalstate from './modules/GlobalState'
import search from './modules/Search'

console.log('STORE FILE LOADED!')

const createStore = () => {

  console.log('CREATE STORE!')

  return new Vuex.Store({

    plugins: [ pathify.plugin ],

    modules: {
      vocabularies,
      breadcrumb,
      globalstate,
      search,
    },

    actions: {
      nuxtServerInit(context, value) {
        console.log('NUXT_SERVER_INIT!')
      }
    }

  })
}

export default createStore

Vuex.Store.prototype.ep_commit = function ep_commit(
  _ns,
  _property,
  _payload,
  _options
) {
  var _type = _ns + "/" + _property;
  return this.set(_type, _payload, _options);
};
