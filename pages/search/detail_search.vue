<template>
  <search-base-view vuex_ns="search_detail" :display_info_column="false">
    <template slot="additional_widget">
      <form @submit.prevent="">
        <search-field-single-line vuex_ns="search_keyword"
                                  vuex_prop="textline_keywords"
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


  export default {
    name: 'detail_search',
    components: {
      SearchFieldSingleLine,
      SearchBaseView,
    },
    data() {
      return {
        placeholder: 'In den Datensätzen suchen',
        next_view: DETAIL_SEARCH_URL,
        hidden_help: 'In den Datensätzen '
      }
    },
  }
</script>

<style scoped>


</style>
