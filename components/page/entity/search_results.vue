<template>
  <div :class="style_class">
    <h2>Suchergebnisse:</h2>
    <b-pagination
      v-model="pagination_page"
      :total-rows="rows"
      :per-page="perPage"
      first-text="Erste"
      prev-text="Vorherige"
      next-text="Nächste"
      last-text="Letzte"
      align="fill"
    ></b-pagination>

    <div v-for="item in this.result" :class="element_style_class">
      <p class="element_title">{{ item.type}}: {{ item.title }}</p>
      <p class="element_description">{{ item.description }}</p>
      <p><NuxtLink :to="get_nuxt_link(item.id)">Weiterlesen</NuxtLink></p>
    </div>
    <b-pagination
      v-model="pagination_page"
      :total-rows="rows"
      :per-page="perPage"
      first-text="Erste"
      prev-text="Vorherige"
      next-text="Nächste"
      last-text="Letzte"
      align="fill"
    ></b-pagination>
  </div>
</template>

<script>
    import SocketPromise from "../../mixins/SocketPromise";
    import {EV} from "../../configs/events";
    import {BATCH_SIZE, REQUEST_SEARCH_RESULTS} from "../../configs/socket";
    import { BPagination } from 'bootstrap-vue'

    export default {
        name: "search_results",
      props: ['view_url', 'element_style_class', 'style_class', 'namespace'],
      data() {
        return {
          result: [],
          rows: 0,
          perPage: BATCH_SIZE,
          property_end: 'batch_end',
          property_start: 'batch_start',
        }
      },
      computed: {
        pagination_page: {
          set(pagination_page) {
            this.$store.ep_commit(this.namespace, this.property_end, pagination_page);
            this.$store.ep_commit(this.namespace, this.property_start, pagination_page - 1);
            this.$EventBus.$emit(EV.CHANGED_BATCH, pagination_page);
          },
          get() {
            return this.$store.state[this.namespace][this.property_end];
          }
        }
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
        get_data() {
          let request = Object.assign({}, this.$store.getters[this.namespace + '/search']);
          return this.sendPromise(REQUEST_SEARCH_RESULTS, request)
            .then(
              this.handle_result.bind(this)
            )
        },
        handle_result(data){
          this.result = data.results;
          this.rows = data.number_results;
          this.$forceUpdate()
        },
        init_events(){
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

  .element_title, .element_description {
    margin-bottom: 0;
  }

</style>

