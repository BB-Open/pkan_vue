<template>
  <search-base-view vuex_ns="search_detail" :display_info_column="false">
    <template slot="additional_widget">
      <form @submit.prevent="">
        <search-field-single-line :vuex_ns="search_ns"
                                  vuex_prop="search_phrase"
                                  :place_holder="placeholder"
                                  :next_view="next_view" rows="1" button_label="Suchen"
                                  :hidden_label="hidden_help"></search-field-single-line>
      </form>
    </template>
  </search-base-view>
</template>

<script>
  import SearchBaseView from "../../components/page/views/SearchBaseView";
  import SearchFieldSingleLine from "../../components/controls/SearchFieldSingleLine";
  import {DETAIL_SEARCH_URL} from "../../components/configs/routing";
  import {VUEX_NAMESPACE as SPARQL_NS} from '../../store/search_sparql'
  import {VUEX_NAMESPACE as SEARCH_NS} from '../../store/search_detail'


  export default {
    name: 'detail_search',
    components: {
      SearchFieldSingleLine,
      SearchBaseView,
    },
    created() {

      this.placeholder =  'In den Datensätzen suchen';
      this.next_view =  DETAIL_SEARCH_URL;
      this.sparql_ns =  SPARQL_NS;
      this.search_ns = SEARCH_NS;
      this.hidden_help = 'In den Datensätzen '
    },
    data() {
      return {
        placeholder: 'In den Datensätzen suchen',
        next_view: DETAIL_SEARCH_URL,

        search_ns: search_ns,
      }
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
