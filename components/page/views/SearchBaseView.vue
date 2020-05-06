<template>
  <base-view :vuex_ns="vuex_ns" :breadcrumb="vuex_ns"
             :display_info_column="this.display_info_column">
    <template slot="content">
      <div class="detail_search">

        <div class="content">
          <h1>Suche</h1>
          <div class="additional_widget">
            <slot name="additional_widget"></slot>
          </div>
          <div class="controls_overview">
            <div><h2>Suchergebnisse:</h2></div>
            <ordering vuex_ns="search_detail" vuex_prop="ordering"></ordering>
          </div>

          <div class="results hidesmallscreen">
            <search_results vuex_ns="search_detail" request_type=REQUEST_SEARCH_RESULTS
                            :view_url="view_url" v-if="$mq === 'screen'"></search_results>
          </div>
          <div class="results hidebigscreen">
            <search_results_mobile vuex_ns="search_detail" :view_url="view_url" request_type=REQUEST_SEARCH_RESULTS
                                   v-if="$mq === 'mobile'"></search_results_mobile>
          </div>
        </div>
        <section class="controls" aria-labelledby="controls_heading" aria-describedby="controls_description">
          <h2 id="controls_heading">Kriterien</h2>
          <p id="controls_description" class="hidden_help_text">TODO</p>
          <button
            @click="remove_all()"
            class="selectorbutton"
            type="button">Alle zurücksetzen
          </button>
          <search-selector title="Dateiformat" vuex_ns="search_detail" vuex_prop="file_format"
                           :options="file_format_options"></search-selector>
          <search-selector title="Datenbereitsteller" vuex_ns="search_detail" vuex_prop="publisher"
                           :options="publisher_options"></search-selector>
          <search-selector title="Kategorie" vuex_ns="search_detail" vuex_prop="category"
                           :options="category_options"></search-selector>
          <search-selector title="Lizenz" vuex_ns="search_detail" vuex_prop="license"
                           :options="license_options"></search-selector>
          <date-picker label="Letzte Änderung:" vuex_ns="date_picker" vuex_prop="last_change"></date-picker>
        </section>
      </div>
    </template>
  </base-view>
</template>

<script>

  import Ordering from "../../controls/Ordering";
  import search_results from "../entity/search_results";
  import BaseView from "./BaseView";
  import SearchSelector from "../../controls/SearchSelector";
  import {EV} from "../../configs/events";
  import {SEARCH_URL} from "../../configs/routing";
  import search_results_mobile from "../entity/search_results_mobile";
  import DatePicker from "../../controls/DatePicker";
  import {REQUEST_SEARCH_RESULTS} from "../../configs/socket";
  import {write_aria_polite} from "../../mixins/utils";

  export default {
    components: {
      DatePicker,
      Ordering,
      search_results,
      search_results_mobile,
      BaseView,
      SearchSelector,
    },
    name: 'SearchBaseView',
    props: ['vuex_ns', 'display_info_column'],
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
        search_selector_fields: ['category', 'file_format', 'publisher', 'license'],
        view_url: SEARCH_URL
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.vuex_ns + ' mounted');
      write_aria_polite('Die Seite Suche wurde geladen.');
    },
    methods: {
      remove_all() {
        this.$store.ep_set(this.vuex_ns,'textline_keywords', '');
        this.search_selector_fields.forEach(function (field) {
          this.$store.ep_set(this.vuex_ns,field, {
            'value_pos': [],
            'value_neg': []
          },);
        }, this);
        this.$store.ep_set(this.vuex_ns,'last_change', [null, null]);

        this.update_page()
      },
      update_page() {
        this.$EventBus.$emit(EV.RESET_SEARCH_TERMS, {});
      },

    },
    beforeDestroy: function () {
      // clear for next search when we leave search namespace
      if (!this.$router.currentRoute.fullPath.includes('search')) {
        this.remove_all();
        this.$store.ep_set(
          this.vuex_ns,'sparql',
          'prefix dcat: <http://www.w3.org/ns/dcat#>\n' +
          'SELECT DISTINCT ?id WHERE {\n' +
          '  ?id a dcat:Dataset .\n' +
          '}');
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

  #controls_heading {
    font-size: 2em;
  }

  @media (max-width: 640px) {
    .controls {
      width: 35%;
      padding-left: 5px;
    }

    .content {
      width: 65%;
    }

    .controls_overview {
      flex-wrap: wrap;
    }
  }

</style>
