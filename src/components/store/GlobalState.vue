<script>

  const state = {
    // used in all views
    currentView: null,
  };

  const mutations = {
    set_currentView(state, data) {
      state.currentView = data
    },
  };

  const getters = {
    sharing_url: function() {
      return ''
    }
  };

  export default {
    name: 'GlobalState',
    namespaced: true,
    state,
    getters,
    actions: {},
    mutations,
  }
</script>

<style scoped>

</style>
