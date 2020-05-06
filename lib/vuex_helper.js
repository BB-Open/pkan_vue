import Vuex from "vuex"

export default function add_ep_set (store) {

  Vuex.Store.prototype.ep_set = function ep_set(
    _ns,
    _property,
    _payload,
    _options
  ) {
    var _type = _ns + "@" + _property;
    return this.set(_type, _payload, _options);
  }
  Vuex.Store.prototype.ep_get = function ep_get(
    _ns,
    _property,
  ) {
    var _type = _ns + "@" + _property;
    return this.get(_type );
  }
}
