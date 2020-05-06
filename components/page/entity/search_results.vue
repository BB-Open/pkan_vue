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
    <div v-bind:class="{hide: rows <= perPage}">
      <b-pagination
        v-model="pagination_page"
        :total-rows="rows"
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
    <p v-if="rows > 0">Es wurden insgesamt {{rows}} Ergebnisse gefunden</p>


    <ul class="nobull">
      <li v-for="item in result" :class="element_style_class" v-if="result.length">
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
    <div v-bind:class="{hide: result.length <= perPage}">
      <b-pagination
        v-model="pagination_page"
        :total-rows="rows"
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
  import {EV} from "../../configs/events";
  import {BATCH_SIZE, REQUEST_SEARCH_RESULTS, REQUEST_SEARCH_RESULTS_SPARQL} from "../../configs/socket";
  import {BPagination} from 'bootstrap-vue'
  import {get_flask_data, write_aria_polite} from '../../mixins/utils';

  export default {
    name: "search_results",
    props: ['view_url', 'element_style_class', 'style_class', 'vuex_ns', 'request_type'],
    data() {
      return {
        result: [],
        rows: 0,
        perPage: BATCH_SIZE,
        property_end: 'batch_end',
        property_start: 'batch_start',
        error: null,
      }
    },
    computed: {
      pagination_page: {
        set(pagination_page) {
          this.$store.ep_set(this.vuex_ns , this.property_end, pagination_page);
          this.$store.ep_set(this.vuex_ns,  this.property_start, pagination_page - 1);
          this.$EventBus.$emit(EV.CHANGED_BATCH, pagination_page);
        },
        get() {
          return this.$store.ep_get(this.vuex_ns , this.property_end);
        }
      }
    },
    components: {
      BPagination,

    },
    serverPrefetch() {
      this.init_events();
      return this.get_data();
    },
    mounted() {
      // Force the initialization
      this.init_events();
      return this.get_data();
    },
    methods: {
      get_nuxt_link(id) {
        return this.view_url + '/' + encodeURIComponent(id)
      },

      get_data () {
        var request = Object.assign({}, this.$store.get(this.vuex_ns + '/search'))
        var response = get_flask_data(this, this.request_type, request )
        return this.handle_result(response)
      },
      async handle_result(data) {
        this.$store.ep_set(this.vuex_ns, 'results', await data.results)
        this.$store.ep_set(this.vuex_ns, 'rows', await data.number_results)
        if (await data.response_code === 400) {
          this.$store.ep_set(this.vuex_ns, 'error', await data.error_message)
        } else {
          this.$store.ep_set(this.vuex_ns, 'error', '')
        }
        await write_aria_polite('Neue Suchergebnisse wurden geladen.')
      },
      init_events() {
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

    },
    beforeDestroy: function () {
      this.$EventBus.$off(EV.RESET_SEARCH_TERMS)
      this.$EventBus.$off(EV.CHANGED_SEARCH_TERMS)
      this.$EventBus.$off(EV.CHANGED_BATCH)
    },
  }
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

