export const state = () => ( {
  // used in all views
  currentView: null,
});

export const mutations = {
  set_currentView(state, data) {
    state.currentView = data
  },
};

export const getters = {
  sharing_url: function() {
    return ''
  }
};
