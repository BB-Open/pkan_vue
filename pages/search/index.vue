<template>
  <base-view :vuex_ns="vuex_ns" :breadcrumb="vuex_ns" :display_search="true" :display_info_column="true">
    <template slot="content">
      <h1>Einfache Suche</h1>
      <vocab-box vocab_name="ordering" :clean_value="false" search_field="order_by"></vocab-box>
      <vocab-box vocab_name="category" :clean_value="true" search_field="category"></vocab-box>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import VocabBox from "../../components/controls/VocabBox";
  import {EV} from "../../components/configs/events";
  import {write_aria_polite} from "../../components/mixins/utils";

  export default {
    name: 'Search',
    components: {
      BaseView,
      VocabBox,
    },
    data() {
      return {
        vuex_ns: 'Search',
      }
    },
    mounted() {
      write_aria_polite('Die Seite einfache Suche wurde geladen.');
    }

  }
</script>

<style scoped>

</style>
