export const state = () => ({
// used in all views
  currentView: null,
  last_title: null,
  title: '',

});

export const mutations = {
  set_currentView(state, data) {
    state.currentView = data
  },
  set_last_title(state, data) {
    state.last_title = data
  },
  set_title(state, data) {
    state.title = data
  }
};

export const getters = {
  breadcrumb: function (state) {
    return [state.currentView, state.last_title]
  },
  title: function (state) {
    return state.title
  }
};
