<template>
  <base-view :namespace="namespace">
    <template slot="heading">
      <h1>{{ this.namespace }}</h1>
    </template>
    <template slot="content">
      <p>Prototype</p>
      <p>{{ number }}</p>
      <button
        @click="handle_click()"
        class="button"
        type="button">Get new Number from Socket
      </button>
      <search-selector :options="search_options_test" :title="title_test">

      </search-selector>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../components/BaseView';
  import SocketPromise from '../components/mixins/SocketPromise';
  import SearchSelector from '../components/controls/SearchSelector';

  export default {
    name: 'Search',
    components: {
      BaseView,
      SearchSelector
    },
    mixins: [
      SocketPromise
    ],
    data() {
      return {
        text: 'Text',
        namespace: 'Search',
        number: 0,
        title_test: 'Test Widget',
        search_options_test: {
          values: ['ABC', 'DEF', 'GHI', 'Blubblah', 'Hallo Welt', 'Test me', 'No Problem'],
          number_displayed: 4,
        },
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
      this.$store.ep_commit('GlobalState', 'currentView', this.namespace);
    },
    methods: {
      handle_click() {
        // send request
        let request = Object.assign({}, {});
        return this.sendPromise('request_number', request)
          .then(
            this.handle_result.bind(this)
          )
      },
      handle_result(data) {
        // read result from request
        this.number = data.number
      }
    }

  }
</script>

<style scoped>

</style>
