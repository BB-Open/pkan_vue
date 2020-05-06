import Vuex from "vuex"

function make_path ( ns, property) {
  var path
  if (ns.includes('/')) {
      path = ns + "@" + property;
    }
    else {
      path = ns + "/" + property;
    }
    return path
}

export default function add_ep_set (store) {

  Vuex.Store.prototype.ep_set = function ep_set(
    ns,
    property,
    payload
  ) {
    var path = make_path( ns, property, )
    return this.set(path, payload);
  }
  Vuex.Store.prototype.ep_get = function ep_get(
    ns,
    property,
  ) {
    var path = make_path( ns, property, )
    return this.get(path);
  }
}
