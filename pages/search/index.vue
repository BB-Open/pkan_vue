<template>
  <base-view :namespace="namespace" :breadcrumb="namespace" :display_search="true" :display_info_column="true">
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

  export default {
    name: 'Search',
    components: {
      BaseView,
      VocabBox,
    },
    data() {
      return {
        namespace: 'Search',
      }
    },
    mounted() {
      this.$store.ep_commit('BreadCrumb', 'title', 'Einfache Suche');
      this.$EventBus.$emit(EV.PAGE_TITLE_CHANGED, {});
    }

  }
</script>

<style scoped>

</style>
