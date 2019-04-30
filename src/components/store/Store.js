/* This is the vuex store
https://flaviocopes.com/vuex/
 */

import Vue from 'vue'
import Vuex from 'vuex'
import GlobalState from './GlobalState';
Vue.use(Vuex);

/* curently only one state is distributed: detail_view_open.
There is a mutator (setter) and a getter defined.
*/


//Vue.use(WPProfile);
//Vue.use(WPPlan);


Vuex.Store.prototype.ep_commit = function ep_commit(_ns, _property, _payload, _options) {
  var _type = _ns + '/set_' + _property;
  return this.commit(_type, _payload, _options)
};


export const store = new Vuex.Store({

  modules: {
    GlobalState,
  }

});
