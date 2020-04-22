<template>
  <search-base-view namespace="DetailSearch" :display_info_column="false">
    <template slot="additional_widget">
      <form @submit.prevent=""><search-field-single-line property="textline_keywords" store_namespace="Search"
                                :initial_value="this.search_initial()" :place_holder="placeholder"
                                      :next_view="next_view" rows="1" button_label="Suchen" :hidden_label="hidden_help"></search-field-single-line></form>
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
    methods: {
      search_initial() {
        return this.$store.state['Search']['keywords'];
      },
    },

  }
</script>

<style scoped>


</style>
