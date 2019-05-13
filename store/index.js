import Vuex from 'vuex';

export const state = () => ({
});

export const mutations = {

};

Vuex.Store.prototype.ep_commit = function ep_commit(_ns, _property, _payload, _options) {
    var _type = _ns + '/set_' + _property;
    return this.commit(_type, _payload, _options)
};