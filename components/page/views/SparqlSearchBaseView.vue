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
        </div>
      </div>
    </template>
  </base-view>
</template>

<script>

  import search_results from "../entity/search_results";
  import BaseView from "./BaseView";
  import SearchSelector from "../../controls/SearchSelector";
  import {EV} from "../../configs/events";
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
        view_url: SEARCH_URL,
        request_type: REQUEST_SEARCH_RESULTS_SPARQL,
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.name + ' is mounted');
      write_aria_polite('Die Seite SPARQL Suche wurde geladen.');
    },
    methods: {
/*      remove_all() {
        this.$store.ep_set(this.keyword_ns, 'textline_keywords', '');
        this.$store.ep_set(this.sparql_ns, 'sparql', 'prefix dcat: <http://www.w3.org/ns/dcat#>\n' +
          'SELECT DISTINCT ?id WHERE {\n' +
          '  ?id a dcat:Dataset .\n' +
          '}');
        this.search_selector_fields.forEach(function (field) {
          this.$store.ep_set(this.sparql_ns, field, {
            'value_pos': [],
            'value_neg': []
          },);
        }, this);
        this.$store.ep_set(this.date_ns, 'last_change', [null, null]);

        this.update_page()
      },
      update_page() {
        this.$EventBus.$emit(EV.RESET_SEARCH_TERMS, {});
      },

    },
    beforeDestroy: function () {
      // clear for next search when we leave search namespace
      if (!this.$router.currentRoute.fullPath.includes('search')) {
        this.remove_all()
      }
*/
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
