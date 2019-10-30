<template>
  <search-base-view namespace="DetailSearch" :display_info_column="false">
    <template slot="additional_widget">
      <search-field property="keywords" store_namespace="Search" :initial_value="this.search_initial()" :place_holder="placeholder" :next_view="next_view" rows="1" button_label="Suchen"></search-field>
    </template>
  </search-base-view>
</template>

<script>
  import SearchBaseView from "../../components/page/views/SearchBaseView";
  import SearchField from "../../components/controls/SearchFieldSingleLine";
  import {DETAIL_SEARCH_URL} from "../../components/configs/routing";


  export default {
    components: {
      SearchBaseView,
      SearchField,
    },
    data() {
      return {
        placeholder: 'In den Datensätzen suchen',
        next_view: DETAIL_SEARCH_URL,
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
