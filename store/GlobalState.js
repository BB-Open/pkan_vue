export const state = () => ({
// used in all views
  error_message: '',
});

export const mutations = {
  set_error_message(state, data) {
    state.error_message = data
  },

};

export const getters = {
};
