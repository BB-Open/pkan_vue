<template>
  <div :class="style_class">
    <h2>Suchergebnisse:</h2>
    <b-pagination
      v-model="selected"
      :total-rows="rows"
      :per-page="perPage"
      first-text="Erste"
      prev-text="Vorherige"
      next-text="Nächste"
      last-text="Letzte"
      align="fill"
    ></b-pagination>

    <div v-for="item in this.result" :class="element_style_class">
      <div class="element_title">{{ item.type}}: {{ item.title }}</div>
      <div class="element_description">{{ item.description }}</div>
      <NuxtLink :to="get_nuxt_link(item.id)">Weiterlesen</NuxtLink>
    </div>
    <b-pagination
      v-model="selected"
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
        selected: {
          set(selected) {
            this.$store.ep_commit(this.namespace, this.property_end, selected);
            this.$store.ep_commit(this.namespace, this.property_start, selected - 1);
            this.$EventBus.$emit(EV.CHANGED_BATCH, selected);
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

</style>

