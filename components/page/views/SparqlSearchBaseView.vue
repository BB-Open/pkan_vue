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

          <div class="results hidesmallscreen">
            <search_results :vuex_ns="sparql_ns" :view_url="view_url" v-if="$mq === 'screen'"
                            :request_type="request_type"></search_results>
          </div>
          <div class="results hidebigscreen">
            <search_results_mobile :vuex_ns="sparql_ns" :view_url="view_url" :request_type="request_type"
                                   v-if="$mq === 'mobile'"></search_results_mobile>
          </div>
          <noscript><br/>Um die Suche zu verwenden, aktivieren Sie bitte JavaScript.</noscript>
        </div>
      </div>
    </template>
  </base-view>
</template>

<script>

  import search_results from "../entity/search_results";
  import BaseView from "./BaseView";
  import SearchSelector from "../../controls/SearchSelector";
  import {SEARCH_URL} from "../../configs/routing";
  import search_results_mobile from "../entity/search_results_mobile";
  import {write_aria_polite} from "../../mixins/utils";
  import {VUEX_NAMESPACE as SPARQL_NS} from '../../../store/search_sparql';
  import {VUEX_NAMESPACE as KEYWORD_NS} from '../../../store/search_detail';
  import {REQUEST_SEARCH_RESULTS_SPARQL} from '../../configs/socket';

  export default {
    components: {
      search_results,
      search_results_mobile,
      BaseView,
      SearchSelector,
    },
    name: 'SparqlSearchBaseView',
    props: ['vuex_ns', 'display_info_column'],
    data() {
      return {
        sparql_ns: SPARQL_NS,
        keyword_ns: KEYWORD_NS,
        view_url: SEARCH_URL,
        request_type: REQUEST_SEARCH_RESULTS_SPARQL,
      }
    },
    mounted() {
      this.$log.debug(this.name + ' is mounted');
      write_aria_polite(this, 'Die Seite SPARQL Suche wurde geladen.');
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
