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
            <ordering vuex_ns="search_detail" vuex_prop="order_by" :vocab_ns="vocab_ns" vocab_prop='order_by'></ordering>
          </div>

          <div class="results hidesmallscreen">
            <search_results vuex_ns="search_detail" :request_type="request_type"
                            :view_url="view_url" v-if="$mq === 'screen'"></search_results>
          </div>
          <div class="results hidebigscreen">
            <search_results_mobile vuex_ns="search_detail" :view_url="view_url" :request_type="request_type"
                                   v-if="$mq === 'mobile'"></search_results_mobile>
          </div>
          <noscript>Um die Suche zu verwenden, aktivieren Sie bitte JavaScript.</noscript>
        </div>
        <section class="controls" aria-labelledby="controls_heading" aria-describedby="controls_description">
          <h2 id="controls_heading">Kriterien</h2>
          <p id="controls_description" class="hidden_help_text">TODO</p>
          <button
            @click="remove_all()"
            class="selectorbutton"
            type="button">Alle zurücksetzen
          </button>
          <search-selector title='Dateiformat' search_ns='search_detail' search_prop='file_format_filter'
                           vocab_ns='vocabularies/vocabularies' vocab_prop='file_format'
                           :options="file_format_options"></search-selector>
          <search-selector title='Datenbereitsteller' search_ns='search_detail' search_prop='publisher_filter'
                           vocab_ns='vocabularies/vocabularies' vocab_prop='publisher'
                           :options="publisher_options"></search-selector>
          <search-selector title='Kategorie' search_ns='search_detail' search_prop='category_filter'
                           vocab_ns='vocabularies/vocabularies' vocab_prop='category'
                           :options='category_options'></search-selector>
          <search-selector title='Lizenz' search_ns='search_detail' search_prop='license_filter'
                           vocab_ns='vocabularies/vocabularies' vocab_prop='license'
                           :options='license_options'></search-selector>
          <date-picker label='Letzte Änderung:' :vuex_ns='search_ns' vuex_prop='search_date_period'></date-picker>
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
  import {SEARCH_URL} from "../../configs/routing";
  import search_results_mobile from "../entity/search_results_mobile";
  import DatePicker from "../../controls/DatePicker";
  import {REQUEST_SEARCH_RESULTS} from "../../configs/socket";
  import {write_aria_polite} from "../../mixins/utils";
  import {VUEX_NAMESPACE as SEARCH_DETAIL_NS} from '../../../store/search_detail';
  import {VUEX_NAMESPACE as VOCAB_NS} from "../../../store/vocabularies";


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
    created() {
        this.vocab_ns = VOCAB_NS;
        this.category_options = {
          vocab_name: 'category',
          number_displayed: 3
        };
        this.file_format_options = {
          vocab_name: 'file_format',
          number_displayed: 3
        };
        this.publisher_options = {
          vocab_name: 'publisher',
          number_displayed: 3
        };
        this.license_options = {
          vocab_name: 'license',
          number_displayed: 3
        };
        this.search_selector_fields = ['category_filter', 'file_format_filter', 'publisher_filter', 'license_filter'];
        this.view_url = SEARCH_URL;
        this.request_type = REQUEST_SEARCH_RESULTS;
        this.search_ns = SEARCH_DETAIL_NS;
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.vuex_ns + ' mounted');
      write_aria_polite(this, 'Die Seite Suche wurde geladen.');
    },
    methods: {
      remove_all() {
        this.$store.commit(this.search_ns + '/'+ 'RESET_ALL')
      },
    }
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
    font-size: 2rem;
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
