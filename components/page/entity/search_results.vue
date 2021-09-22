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

    <ol :start="offset">
      <li v-if="result_count > 0" v-for="(item, index) in results" :class="element_style_class" >
        <h3 class="element_title">{{ item.type}}: {{ item.title }}</h3>
        <p class="element_description">{{ item.description }}</p>
        <p>
          <NuxtLink :to="get_nuxt_link(item)" :aria-label="item.type + ' ' +item.title + ' weiterlesen'">Weiterlesen</NuxtLink>
        </p>
      </li>
      <li v-if="result_count === 0">
        <h2>Es wurden keine Suchergebnisse gefunden.</h2>
      </li>
    </ol>
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
  import {BATCH_SIZE} from '../../configs/socket';
  import {BPagination} from 'bootstrap-vue'
  import {get_flask_data, write_aria_polite} from '../../mixins/utils';

  export default {
    name: "search_results",
    props: ['view_url', 'element_style_class', 'style_class', 'vuex_ns', 'request_type'],
    created() {
        this.perPage = BATCH_SIZE;
        this.property_end = 'batch_end';
        this.property_start = 'batch_start';
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
      offset: function () {
        console.log(this.vuex_ns);
        let result = this.$store.ep_get(this.vuex_ns, this.property_start) * this.perPage + 1;
        console.log(result);
        return result
      },
      results: function () {
        console.log(this.vuex_ns);
        let result = this.$store.ep_get(this.vuex_ns, 'results');
        console.log(result);
        return result
      },
      result_count: function () {
        let result = this.$store.ep_get(this.vuex_ns, 'result_count');
        console.log('result count: ' + result);
        if (result === null) {
          this.get_data()
        }
        return result
      },
      error: function () {
        return this.$store.ep_get(this.vuex_ns, 'error')
      },
      search_params: {
        get() {
          return this.$store.ep_get(this.vuex_ns,'search_params')
        }
      }
    },
    watch: {
      search_params: async function (value) {
        await this.get_data()
      }
    },
    components: {
      BPagination,
    },
    methods: {
      get_nuxt_link(item) {
        let type_id = item.type_id;
        let type_part = '';
        if (type_id === 'http://www.w3.org/ns/dcat#Dataset') {
          type_part = 'dataset'
        } else if (type_id === 'http://www.w3.org/ns/dcat#Catalog') {
          type_part = 'catalog'
        }

        return this.view_url + '/simple_view/' + type_part + '/' + encodeURIComponent(item.id)
      },
      async get_data() {
        var response = await get_flask_data(this, this.request_type, this.search_params);
        await this.$store.ep_set(this.vuex_ns, 'results', response.results);
        await this.$store.ep_set(this.vuex_ns, 'result_count', response.result_count);
        if (response.response_code === 400) {
          await this.$store.ep_set(this.vuex_ns, 'error', response.error_message)
        } else {
          await this.$store.ep_set(this.vuex_ns, 'error', '')
        }
        write_aria_polite(this, 'Neue Suchergebnisse wurden geladen.');
        return response;
      },
    },
    serverPrefetch() {
      return this.get_data();
    }
  }
</script>

<style scoped>

  ol ::marker {
    content: counter(list-item) ")\00A0";
  }

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

