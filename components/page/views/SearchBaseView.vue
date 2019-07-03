<template>
  <base-view :namespace="namespace" :breadcrumb="namespace" :search_initial="this.search_initial()">
    <template slot="content">
      <div class="detail_search">
        <div class="controls">
          <button
            @click="remove_all()"
            class="button"
            type="button">Remove all
          </button>
          <search-selector title="Kategorie" store_namespace="Search" property="category" :options="category_options"></search-selector>
        </div>
        <div class="content">
          <div class="controls_overview"><controls-over-view></controls-over-view><ordering></ordering></div>
          <div class="additional_widget">
            <slot name="additional_widget"></slot>
          </div>
          <div class="results"><search_results namespace="Search" view_url="search"></search_results></div>
        </div>
      </div>
    </template>
  </base-view>
</template>

<script>

  import Ordering from "../../controls/Ordering";
  import search_results from "../entity/search_results";
  import BaseView from "./BaseView";
  import SearchSelector from "../../controls/SearchSelector";
  import ControlsOverView from "../../controls/ControlsOverView";
  import {EV} from "../../events";

  export default {
    components: {
      Ordering,
      search_results,
      BaseView,
      SearchSelector,
      ControlsOverView,
    },
    props: ['namespace'],
    data() {
      return {
        category_options: {
          vocab_name: 'category',
          number_displayed: 4,
        }
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
    },
    methods: {
      search_initial() {
        return this.$store.state['Search']['keywords'];
      },
      remove_all() {
        // todo
        this.$store.ep_commit('Search', 'keywords', '');
        this.$store.ep_commit('Search', 'sparql', '');
        this.$store.ep_commit('Search', 'category', {
          'value_pos': [],
          'value_neg': []
        },);
        this.update_page()
      },
      update_page() {
        this.$EventBus.$emit(EV.RESET_SEARCH_TERMS, {});
      },

    },
    beforeDestroy: function () {
      // clear for next search when we leave search namespace
      if (!this.$router.currentRoute.fullPath.includes('search')){
        this.remove_all()
      }

    },

  }
</script>

<style scoped>
  .content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 100%
  }
  .detail_search, .controls_overview {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
  }
  .controls_overview {
    justify-content: space-between;
  }
  .controls {
    width: 300px;
  }

</style>