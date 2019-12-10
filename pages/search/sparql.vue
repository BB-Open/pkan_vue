<template>
  <search-base-view namespace="Sparql" :display_info_column="false">
    <template slot="additional_widget">
      <search-field-multiline property="sparql" store_namespace="Search" :initial_value="this.search_initial()"
                              :place_holder="placeholder" :next_view="next_view" rows="4" button_label="Abfrage senden"
                              label="SPARQL Abfrage:"></search-field-multiline>
    </template>
  </search-base-view>
</template>

<script>
  import SearchBaseView from "../../components/page/views/SearchBaseView";
  import SearchFieldMultiline from "../../components/controls/SearchFieldMultiline";
  import {SPARQL_URL} from "../../components/configs/routing";

  export default {
    name: 'Sparql',
    components: {
      SearchBaseView,
      SearchFieldMultiline,
    },
    data() {
      return {
        placeholder: 'SPARQL Query',
        next_view: SPARQL_URL,
      }
    },
    methods: {
      search_initial() {
        return this.$store.state['Search']['sparql'];
      },
    },
  }
</script>

<style scoped>


</style>
