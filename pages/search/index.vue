<template>
  <base-view :voc_ns="voc_ns" :display_search="true" :display_info_column="true">
    <template slot="content">
      <h1>Einfache Suche</h1>
      <vocab-box-order-by
        :vocab_ns="voc_ns" vocab_prop='order_by'
        :target_ns="search_ns" target_prop='order_by'
        :clean_value="false" ></vocab-box-order-by>
      <vocab-box :vocab_ns="voc_ns" vocab_prop='category'
                 :target_ns="search_ns" target_prop='category_filter'
                 :clean_value="true"></vocab-box>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import VocabBox from "../../components/controls/VocabBox";
  import {write_aria_polite} from "../../components/mixins/utils";
  import {VUEX_NAMESPACE as voc_ns} from '../../store/vocabularies';
  import {VUEX_NAMESPACE as search_ns} from '../../store/search_detail';
  import VocabBoxOrderBy from "../../components/controls/VocabBoxOrderBy";

  export default {
    name: 'Search',
    components: {
      BaseView,
      VocabBox,
      VocabBoxOrderBy
    },
    created() {
        this.voc_ns = voc_ns;
        this.search_ns = search_ns;
    },
    mounted() {
      write_aria_polite(this, 'Die Seite einfache Suche wurde geladen.');
    },
    beforeRouteLeave (to, from, next) {
      if (!this.$router.currentRoute.fullPath.includes('search')) {
        this.$store.commit(this.search_ns + '/'+ 'RESET_ALL')
      }
      next()
    },
  }
</script>

<style scoped>

</style>
