export const state = () => ({
// used in all views
  currentView: null,
  last_title: null,

});

export const mutations = {
  set_currentView(state, data) {
    state.currentView = data
  },
  set_last_title(state, data) {
    state.last_title = data
  }
};

export const getters = {
  breadcrumb: function (state) {
    return [state.currentView, state.last_title]
  }
};
