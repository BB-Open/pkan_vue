<template>
  <div :class="style_class">
    <h2>Suchergebnisse:</h2>
    <div v-for="item in this.result" :class="element_style_class">
      <div class="element_title">{{ item.type}}: {{ item.title }}</div>
      <div class="element_description">{{ item.description }}</div>
      <NuxtLink :to="get_nuxt_link(item.id)">[Mehr]</NuxtLink>
    </div>
  </div>
</template>

<script>
    import SocketPromise from "../../mixins/SocketPromise";
    import {EV} from "../../configs/events";
    import {REQUEST_SEARCH_RESULTS} from "../../configs/socket";

    export default {
        name: "search_results",
      props: ['view_url', 'element_style_class', 'style_class', 'namespace'],
      data() {
        return {
          result: []
        }
      },
      mixins: [
        SocketPromise
      ],
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
          this.$forceUpdate()
        },
        init_events(){
          this.$EventBus.$on(EV.RESET_SEARCH_TERMS, () => {
            this.get_data()
          });
          this.$EventBus.$on(EV.CHANGED_SEARCH_TERMS, () => {
            this.get_data()
          });
        }


      },
      beforeDestroy: function () {
        this.$EventBus.$off(EV.RESET_SEARCH_TERMS);
        this.$EventBus.$off(EV.CHANGED_SEARCH_TERMS)
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

