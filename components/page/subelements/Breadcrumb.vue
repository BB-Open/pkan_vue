<template>
  <div class="breadcrumb">
  <p><span class="describer">Sie sind hier: </span> <span v-for="item in breadcrumb_elements">
      <span v-if="item in breadcrumb_clear">
        <span v-if="item !== 'Start'">&#62;&#62;</span>
        <span v-if="breadcrumb_clear[item].url"><nuxt-link class="" :to="breadcrumb_clear[item].url">{{breadcrumb_clear[item].title}}</nuxt-link></span>
        <span v-if="!breadcrumb_clear[item].url">{{breadcrumb_clear[item].title}}</span>
      </span>
    </span>

  </p>
  </div>
</template>

<script>
  import {EV} from "../../configs/events";
  import {PATHS_FOR_BREADCRUMB, TITLES_FOR_BREADCRUMB} from "../../configs/routing";

  export default {
    name: "Breadcrumb",
    data() {
      return {
        breadcrumb_elements: [],
        breadcrumb_clear: {}
      }
    },
    mounted() {
      // Force the initialization
      this.init_breadcrumbs();
      this.init_events();
    },
    beforeDestroy: function () {
      this.$EventBus.$off(EV.BREADCRUMB_CHANGED);
    },

    methods: {
      init_breadcrumbs() {
        this.breadcrumb_elements = ['Start'];
        this.breadcrumb_elements = this.breadcrumb_elements.concat(this.$store.getters['BreadCrumb' + '/breadcrumb']);
        this.breadcrumb_elements.forEach(
          function (item) {
            let url = null;
            let title = item;

            if (item in PATHS_FOR_BREADCRUMB) {
              url = PATHS_FOR_BREADCRUMB[item]
            }

            if (item in TITLES_FOR_BREADCRUMB) {
              title = TITLES_FOR_BREADCRUMB[item]
            }

            if (item !== undefined && item !== null) {
              this.breadcrumb_clear[item] = {
                'url': url,
                'title': title
              }
            }

          }, this);
        this.$forceUpdate()


      },
      init_events() {
        this.$EventBus.$on(EV.BREADCRUMB_CHANGED, () => {
          this.$log.debug('breadcrumb changed');
          this.init_breadcrumbs()
        });
      }
    },
  }
</script>

<style scoped>
  .describer {
    color: #C73C35;
    font-weight: bold;
  }

  .breadcrumb {
    font-size: 0.8125rem;
  }

  .breadcrumb p {
    margin-bottom: 0;
  }
</style>
