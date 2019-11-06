<template>
  <base-view :namespace="namespace" :breadcrumb="namespace" :search_initial="this.search_initial()" :display_info_column="this.display_info_column">
    <template slot="content">
      <div class="detail_search">

        <div class="content">
          <h1>Suche</h1>
          <div class="additional_widget">
            <slot name="additional_widget"></slot>
          </div>
          <div class="controls_overview"><controls-over-view></controls-over-view><ordering></ordering></div>

          <div class="results hidesmallscreen"><search_results namespace="Search" :view_url="view_url"></search_results></div>
          <div class="results hidebigscreen"><search_results_mobile namespace="Search" :view_url="view_url"></search_results_mobile></div>
        </div>
        <div class="controls">
          <h1>Kriterien</h1>
          <button
            @click="remove_all()"
            class="button"
            type="button">Remove all
          </button>
          <search-selector title="Dateiformat" store_namespace="Search" property="file_format" :options="file_format_options"></search-selector>
          <search-selector title="Datenbereitsteller" store_namespace="Search" property="publisher" :options="publisher_options"></search-selector>
          <search-selector title="Kategorie" store_namespace="Search" property="category" :options="category_options"></search-selector>
          <search-selector title="Lizens" store_namespace="Search" property="license" :options="license_options"></search-selector>
          <pkan_datepicker label="Letzte Änderung:" namespace="Search" property="last_change"></pkan_datepicker>
          <search-selector title="Stichworte" store_namespace="Search" property="keywords" :options="keywords_options"></search-selector>
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
  import {EV} from "../../configs/events";
  import {SEARCH_URL} from "../../configs/routing";
  import search_results_mobile from "../entity/search_results_mobile";
  import pkan_datepicker from "../../controls/DatePicker";

  export default {
    components: {
      Ordering,
      search_results,
      search_results_mobile,
      BaseView,
      SearchSelector,
      ControlsOverView,
      pkan_datepicker,
    },
    props: ['namespace', 'display_info_column'],
    data() {
      return {
        category_options: {
          vocab_name: 'category',
          number_displayed: 3
        },
        file_format_options: {
          vocab_name: 'file_format',
          number_displayed: 3
        },
        publisher_options: {
          vocab_name: 'publisher',
          number_displayed: 3
        },
        license_options: {
          vocab_name: 'license',
          number_displayed: 3
        },
        keywords_options: {
          vocab_name: 'keywords',
          number_displayed: 3
        },
        search_selector_fields: ['category', 'file_format', 'publisher', 'license', 'keywords'],
        view_url: SEARCH_URL,
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
    },
    methods: {
      search_initial() {
        return this.$store.state['Search']['textline_keywords'];
      },
      remove_all() {
        this.$store.ep_commit('Search', 'textline_keywords', '');
        this.$store.ep_commit('Search', 'sparql', '');
        this.search_selector_fields.forEach(function (field) {
          this.$store.ep_commit('Search', field, {
            'value_pos': [],
            'value_neg': []
          },);
        }, this);
        this.$store.ep_commit('Search', 'last_change', [null, null]);

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
    width: 70%
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
    width: 30%;
    padding-left: 15px;
  }

  .results {
    width: 100%;
  }

  @media (max-width: 640px) {
    .controls {
      width: 35%;
      padding-left: 5px;
    }

    .content {
      width: 65%;
    }
  }

</style>
