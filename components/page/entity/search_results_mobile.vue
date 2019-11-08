<template>
  <div :class="style_class">
    <h2>Suchergebnisse:</h2>
    <div v-infinite-scroll="load_more" infinite-scroll-disabled="busy" :infinite-scroll-distance="perPage">
      <div v-for="item in this.result" :class="element_style_class">
        <div class="element_title">{{ item.type}}: {{ item.title }}</div>
        <div class="element_description">{{ item.description }}</div>
        <NuxtLink :to="get_nuxt_link(item.id)">Weiterlesen</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
  import SocketPromise from "../../mixins/SocketPromise";
  import {EV} from "../../configs/events";
  import {BATCH_SIZE, REQUEST_SEARCH_RESULTS} from "../../configs/socket";
  import {BPagination} from 'bootstrap-vue'

  export default {
    name: "search_results",
    props: ['view_url', 'element_style_class', 'style_class', 'namespace'],
    data() {
      return {
        result: [],
        result_batches: {},
        rows: 0,
        perPage: BATCH_SIZE,
        max_batch_loaded: 0,
        property_end: 'batch_end',
        property_start: 'batch_start',
      }
    },
    computed: {
      selected: {
        set(selected) {
          if (this.max_batch_loaded * this.perPage < this.rows) {
            this.$store.ep_commit(this.namespace, this.property_end, selected);
            this.$store.ep_commit(this.namespace, this.property_start, selected - 1);
            this.max_batch_loaded = selected;
            this.$EventBus.$emit(EV.CHANGED_BATCH, selected);
          }

        },
        get() {
          return this.$store.state[this.namespace][this.property_end];
        }
      },
    },
    mixins: [
      SocketPromise
    ],
    components: {
      BPagination,

    },
    mounted() {
      // Force the initialization
      this.init_events();
      this.get_data();
    },
    methods: {
      get_nuxt_link(id) {
        return this.view_url + '/' + encodeURIComponent(id)
      },
      get_display_result() {
        let batch_keys = Object.keys(this.result_batches);
        let data = [];

        batch_keys.sort(function (a, b) {
          return a - b;
        });
        batch_keys.forEach(
          function (item) {
            data = data.concat(this.result_batches[item])
          }, this);
        return data
      },

      get_data() {
        let request = Object.assign({}, this.$store.getters[this.namespace + '/search']);
        return this.sendPromise(REQUEST_SEARCH_RESULTS, request)
          .then(
            this.handle_result.bind(this)
          )
      },
      handle_result(data) {
        this.result_batches[data.batch_start] = data.results;
        this.rows = data.number_results;
        this.result = this.get_display_result();
        this.$forceUpdate()
      },
      init_events() {
        this.$EventBus.$on(EV.RESET_SEARCH_TERMS, () => {
          this.result_batches = {};
          this.get_data()
        });
        this.$EventBus.$on(EV.CHANGED_SEARCH_TERMS, () => {
          this.result_batches = {};
          this.get_data()
        });
        this.$EventBus.$on(EV.CHANGED_BATCH, () => {
          this.get_data()
        });
      },
      load_more() {
        this.selected = this.max_batch_loaded + 1
      }


    },
    beforeDestroy: function () {
      this.$EventBus.$off(EV.RESET_SEARCH_TERMS);
      this.$EventBus.$off(EV.CHANGED_SEARCH_TERMS);
      this.$EventBus.$off(EV.CHANGED_BATCH);
    },
  }
</script>

<style scoped>

  .element_title {
    font-weight: bold;
  }

  .element_logo img {
    max-width: 100px;
  }

</style>

