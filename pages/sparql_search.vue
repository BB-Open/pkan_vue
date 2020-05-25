<template>
  <sparql-search-base-view vuex_ns="sparql_ns" :display_info_column="false">
    <template slot="additional_widget">
      <search-field-multiline :vuex_ns="sparql_ns"
                              vuex_prop="sparql_query"
                              :place_holder="placeholder" :next_view="next_view" rows="4" button_label="Abfrage senden"
                              label="SPARQL Abfrage:"
                              help="In diesem Feld können Sie eine Sparqlquery formulieren. Die Query muss eine Liste von ids als ?id zurückliefern. Die Query darf ein Ordering beinhalten, jedoch kein Limit oder Offset, da dieses vom Batching verwendet wird"></search-field-multiline>
    </template>
  </sparql-search-base-view>
</template>

<script>
  import SparqlSearchBaseView from "../components/page/views/SparqlSearchBaseView";
  import SearchFieldMultiline from "../components/controls/SearchFieldMultiline";
  import {SPARQL_URL} from "../components/configs/routing";
  import {VUEX_NAMESPACE as SPARQL_NS} from '../store/search_sparql'
  import {VUEX_NAMESPACE as SEARCH_NS} from '../store/search_detail'

  export default {
    name: 'Sparql',
    components: {
      SparqlSearchBaseView,
      SearchFieldMultiline,
    },
    created() {
      
        this.placeholder =  'SPARQL Query';
        this.next_view =  SPARQL_URL;
        this.sparql_ns =  SPARQL_NS;
      this.search_ns = SEARCH_NS
    },
    beforeRouteLeave (to, from, next) {
      if (!to.path.includes('search')) {
        this.$store.commit(this.sparql_ns + '/'+ 'RESET_ALL');
        this.$store.commit(this.search_ns + '/' + 'RESET_ALL')
      }
      next()
    },
  }
</script>

<style scoped>


</style>
