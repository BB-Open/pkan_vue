<template>
  <div :class="style_class">
    <div role="alert">
      <div class="portalMessage error" v-if="error">
        <div>Fehler</div>
        <div>{{error}}</div>
      </div>
    </div>
    <div class="hidden_help_text" id="page_description">Für die Seitenverwaltung nutzen Sie die Pfeiltasten zum wechseln
      zwischen den Buttons. Bestätigen sie mit Enter. Mit Tab verlassen sie die Seitenverwaltung.
    </div>
    <div v-bind:class="{hide: result_count <= perPage}">
      <b-pagination
        v-model="pagination_page"
        :total-rows="result_count"
        :per-page="perPage"
        first-text="Erste"
        prev-text="Vorherige"
        next-text="Nächste"
        last-text="Letzte"
        label-page="Gehe zu Seite"
        align="fill"
        aria-label="Seitenverwaltung."
        aria-describedby="page_description"
      ></b-pagination>
    </div>
    <H2 v-if="result_count > 0">Es wurden insgesamt {{result_count}} Ergebnisse gefunden</H2>

    <ul class="nobull">
      <li v-if="result_count > 0" v-for="(item, index) in results" :class="element_style_class" >
        <h3 class="element_title">{{index + offset}}) {{ item.type}}: {{ item.title }}</h3>
        <p class="element_description">{{ item.description }}</p>
        <p>
          <NuxtLink :to="get_nuxt_link(item.id)" :aria-label="item.type + ' ' +item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
        </p>
      </li>
      <li v-if="result_count === 0">
        <h2>Es wurden keine Suchergebnisse gefunden.</h2>
      </li>
    </ul>
    <div v-bind:class="{hide: (result_count <= perPage || result_count === 0)}">
      <b-pagination
        v-model="pagination_page"
        :total-rows="result_count"
        :per-page="perPage"
        first-text="Erste"
        prev-text="Vorherige"
        next-text="Nächste"
        last-text="Letzte"
        label-page="Gehe zu Seite"
        align="fill"
        aria-label="Seitenverwaltung."
        aria-describedby="page_description"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
  import {EV} from '../../configs/events';
  import {BATCH_SIZE} from '../../configs/socket';
  import {BPagination} from 'bootstrap-vue'
  import {get_flask_data, write_aria_polite} from '../../mixins/utils';

  export default {
    name: "search_results",
    props: ['view_url', 'element_style_class', 'style_class', 'vuex_ns', 'request_type'],
    data() {
      return {
        perPage: BATCH_SIZE,
        property_end: 'batch_end',
        property_start: 'batch_start',
      }
    },
    computed: {
      pagination_page: {
        set(pagination_page) {
          this.$store.ep_set(this.vuex_ns, this.property_end, pagination_page);
          this.$store.ep_set(this.vuex_ns, this.property_start, pagination_page - 1);
//          this.$EventBus.$emit(EV.CHANGED_BATCH, pagination_page);
        },
        get() {
          return this.$store.ep_get(this.vuex_ns, this.property_end);
        }
      },
      offset: function () {
        console.log(this.vuex_ns)
        let result = this.$store.ep_get(this.vuex_ns, this.property_start) * this.perPage + 1
        console.log(result)
        return result
      },
      results: function () {
        console.log(this.vuex_ns)
        let result = this.$store.ep_get(this.vuex_ns, 'results')
        console.log(result)
        return result
      },
      result_count: function () {
        let result = this.$store.ep_get(this.vuex_ns, 'result_count')
        console.log('result count: ' + result)
        return result
      },
      error: function () {
        return this.$store.ep_get(this.vuex_ns, 'error')
      },
      search_request: {
        get() {
          return Object.assign({}, this.$store.get(this.vuex_ns + '/search_params'))
        }
      }
    },
    watch: {
      search_request: async function (value) {
        await this.get_data()
      }
    },
    components: {
      BPagination,
    },
    serverPrefetch() {
//      this.init_events();
      return this.get_data();
    },
    mounted() {
      // Force the initialization
//      this.init_events();
      this.get_data();
    },
    methods: {
      get_nuxt_link(id) {
        return this.view_url + '/' + encodeURIComponent(id)
      },
      async get_data() {
//        var request = Object.assign({}, this.$store.get(this.vuex_ns + '/search_params'))
        var response = await get_flask_data(this, this.request_type, this.search_request)
        await this.$store.ep_set(this.vuex_ns, 'results', response.results)
        await this.$store.ep_set(this.vuex_ns, 'result_count', response.result_count)
        if (response.response_code === 400) {
          await this.$store.ep_set(this.vuex_ns, 'error', response.error_message)
        } else {
          await this.$store.ep_set(this.vuex_ns, 'error', '')
        }
        write_aria_polite(this, 'Neue Suchergebnisse wurden geladen.')
      },
      /*      init_events() {
        this.$EventBus.$on(EV.RESET_SEARCH_TERMS, () => {
          this.get_data()
        });
        this.$EventBus.$on(EV.CHANGED_SEARCH_TERMS, () => {
          this.get_data()
        });
        this.$EventBus.$on(EV.CHANGED_BATCH, () => {
          this.get_data()
        });
      }
*/
    }
  }
/*    beforeDestroy: function () {
      this.$EventBus.$off(EV.RESET_SEARCH_TERMS)
      this.$EventBus.$off(EV.CHANGED_SEARCH_TERMS)
      this.$EventBus.$off(EV.CHANGED_BATCH)
    },
  }
*/
</script>

<style scoped>

  .element_title {
    margin-bottom: 10px;
  }

  .element_logo img {
    max-width: 100px;
  }

  .element_description {
    margin-bottom: 0;
  }

  .hide {
    display: none
  }

</style>

