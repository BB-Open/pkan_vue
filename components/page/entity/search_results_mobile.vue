<template>
  <div :class="style_class">
    <div role="alert">
      <div class="portalMessage error" v-if="error">
        <div>Fehler</div>
        <div>{{error}}</div>
      </div>
    </div>
    <p v-if="result_count > 0">Es wurden insgesamt {{result_count}} Ergebnisse gefunden</p>
    <div v-infinite-scroll="load_more" infinite-scroll-disabled="busy" :infinite-scroll-distance="perPage">
      <ul class="nobull">
        <li v-for="item in combined_batches" :class="element_style_class">
          <h3 class="element_title">{{ item.type}}: {{ item.title }}</h3>
          <p class="element_description">{{ item.description }}</p>
          <p>
            <NuxtLink :to="get_nuxt_link(item.id)" :aria-label="item.type + ' ' +item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
          </p>
        </li>
        <li v-if="!combined_batches.length">
          <p>Es wurden keine Suchergebnisse gefunden.</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {BATCH_SIZE} from "../../configs/socket";
  import {BPagination} from 'bootstrap-vue'
  import {get_flask_data, write_aria_polite} from '../../mixins/utils';

  export default {
    name: "search_results_mobile",
    props: ['view_url', 'element_style_class', 'style_class', 'vuex_ns', 'request_type'],
    created() {
      this.perPage = BATCH_SIZE;
      this.property_end = 'batch_end';
      this.property_start = 'batch_start';
    },
    components: {
      BPagination
    },
    computed: {
      pagination_page: {
        set(pagination_page) {
          this.$store.ep_set(this.vuex_ns, this.property_end, pagination_page);
          this.$store.ep_set(this.vuex_ns, this.property_start, pagination_page - 1);
        },
        get() {
          return this.$store.ep_get(this.vuex_ns, this.property_end);
        }
      },
      batch_results: function () {
        this.$log.debug(this.vuex_ns);
        let result = this.$store.ep_get(this.vuex_ns, 'batch_results');
        this.$log.debug(result);
        return result
      },
      result_count: function () {
        let result = this.$store.ep_get(this.vuex_ns, 'result_count');
        this.$log.debug('result count: ' + result);
        if (result === null) {
          this.get_data()
        }
        return result
      },
      combined_batches: function () {
        let batch_results = this.batch_results;
        let batch_keys = Object.keys(batch_results);
               let data = [];

               batch_keys.sort(function (a, b) {
                 return a - b;
               });
               batch_keys.forEach(
                 function (item) {
                   data = data.concat(batch_results[item])
                 }, this);
               return data
      },
      error: function () {
        return this.$store.ep_get(this.vuex_ns, 'error')
      },
      search_params_no_batch: {
        get() {
          return this.$store.ep_get(this.vuex_ns,'search_params_no_batch')
        }
      },
      search_params: {
        get() {
          return this.$store.ep_get(this.vuex_ns,'search_params')
        }
      }
    },
    watch: {
      search_params_no_batch: async function (value) {
        await this.get_initial_data()
      }
    },
    methods: {
      get_nuxt_link(id) {
        return this.view_url + '/' + encodeURIComponent(id)
      },
      async get_data() {
        let params = this.search_params;
        var response = await get_flask_data(this, this.request_type, params);
        await this.$store.ep_set(this.vuex_ns, 'batch_results@' + params.batch_start, response.results);
        await this.$store.ep_set(this.vuex_ns, 'result_count', response.result_count);
        if (response.response_code === 400) {
          await this.$store.ep_set(this.vuex_ns, 'error', response.error_message)
        } else {
          await this.$store.ep_set(this.vuex_ns, 'error', '')
        }
        write_aria_polite(this, 'Neue Suchergebnisse wurden geladen.')
      },

      async get_initial_data() {
        this.pagination_page = 1;
        await this.$store.ep_set(this.vuex_ns, 'batch_results', {});
        await this.get_data();
      },
      async load_more() {
        if (this.pagination_page * this.perPage < this.result_count) {
          this.pagination_page += 1;
          this.$log.debug('Load more, Page:');
          this.$log.debug(this.pagination_page);
          await this.get_data()
        }
      }
    }
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

