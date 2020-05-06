<template>
  <div :class="style_class">
    <div role="alert">
      <div class="portalMessage error" v-if="error">
        <div>Fehler</div>
        <div>{{error}}</div>
      </div>
    </div>
    <p v-if="rows > 0">Es wurden insgesamt {{rows}} Ergebnisse gefunden</p>
    <div v-infinite-scroll="load_more" infinite-scroll-disabled="busy" :infinite-scroll-distance="perPage">
      <ul class="nobull">
        <li v-for="item in result" :class="element_style_class">
          <h3 class="element_title">{{ item.type}}: {{ item.title }}</h3>
          <p class="element_description">{{ item.description }}</p>
          <p>
            <NuxtLink :to="get_nuxt_link(item.id)" :aria-label="item.type + ' ' +item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
          </p>
        </li>
        <li v-if="!result.length">
          <p>Es wurden keine Suchergebnisse gefunden.</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {EV} from "../../configs/events";
  import {BATCH_SIZE, REQUEST_SEARCH_RESULTS, REQUEST_SEARCH_RESULTS_SPARQL} from "../../configs/socket";
  import {BPagination} from 'bootstrap-vue'
  import {get_flask_data, write_aria_polite} from '../../mixins/utils';

  export default {
    name: "search_results_mobile",
    props: ['view_url', 'element_style_class', 'style_class', 'vuex_ns', 'request_type'],
    data() {
      return {
        prefetched: false,
        result: [],
        result_batches: {},
        rows: 0,
        perPage: BATCH_SIZE,
        max_batch_loaded: 0,
        property_end: 'batch_end',
        property_start: 'batch_start',
        error: null,
      }
    },
    computed: {
      selected: {
        set(selected) {
          if (this.max_batch_loaded * this.perPage < this.rows) {
            this.$store.ep_set(this.vuex_ns, this.property_end, selected);
            this.$store.ep_set(this.vuex_ns, this.property_start, selected - 1);
            this.max_batch_loaded = selected;
            this.$EventBus.$emit(EV.CHANGED_BATCH, selected);
          }

        },
        get() {
          return this.$store.state[this.vuex_ns][this.property_end];
        }
      },
    },
    components: {
      BPagination,

    },
    serverPrefetch () {
      // Force the initialization
      this.init_events();
      return this.get_data();
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

      async get_data() {
        var request = {}
        if (this.request_type === REQUEST_SEARCH_RESULTS) {
          request = Object.assign({}, this.$store.getters[this.vuex_ns + '/search']);
        } else if (this.request_type === REQUEST_SEARCH_RESULTS_SPARQL) {
          request = Object.assign({}, this.$store.getters[this.vuex_ns + '/search_sparql']);
        }
        var response = await get_flask_data(this, this.request_type, request )
        return await this.handle_result(response)
      },
      async handle_result(data) {
        this.result_batches[data.batch_start] = data.results;
        this.rows = data.number_results;
        this.result = this.get_display_result();
        if (data.response_code === 400) {
          this.error = data.error_message;
        } else {
          this.error = ''
        }
        write_aria_polite('Neue Suchergebnisse wurden geladen.');
        this.prefetched = true
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

  .element_description {
    margin-bottom: 0;
  }

  .element_title {
    font-weight: bolder;
    margin-bottom: 10px;
  }

  .element_logo img {
    max-width: 100px;
  }

</style>

