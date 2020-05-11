import Vue from 'vue'
import Pathify from 'vuex-pathify'

Pathify.options.deep = 2

Pathify.setValue = function setValue (obj, path, value, create) {
    if ( create === void 0 ) create = false;

    var keys = getKeys(path);
    return keys.reduce(function (obj, key, index)  {
      var isIndex = /^\d+$/.test(key);
      if (isIndex) {
        key = parseInt(key);
      }
      if (!obj) {
        return false
      }
      else if (index === keys.length - 1) {
        Vue.set(obj, key, value);
//        obj[key] = value;
        return true
      }
      else if (!isObject(obj[key]) || !(key in obj)) {
        if (create) {
          Vue.set(obj, key, isIndex ? [] : {});
//          obj[key] = isIndex ? [] : {};
        } else {
          return false
        }
      }
      return obj[key]
    }, obj)
  }




import add_ep_set from '../lib/vuex_helper'

export const  plugins = [
  Pathify.plugin,
  add_ep_set
]

export const state = () => ({
})
