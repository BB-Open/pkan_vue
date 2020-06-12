<template>
  <base-view :vuex_ns="vuex_ns" :display_info_column="true">
    <template slot="content">
      <plonepage_search :vuex_ns='plone_ns' :vuex_prop='tag' :portal_type="portal_type" :sort_on="sort_on" :sort_order="sort_order"
                        :tag="tag"></plonepage_search>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../components/page/views/BaseView';
  import {
    PLONE_ASC_ORDERING,
    PLONE_INDEX_TITLE,
    PLONE_PT_DOCUMENT,
    PLONE_TAG_FAQ
  } from "../components/configs/plone_keywords";
  import plonepage_search from "../components/page/plone/plonepage_search";
  import {VUEX_NAMESPACE as PLONE_NS} from '../store/plone'

  export default {
    name: 'faq',
    components: {
      plonepage_search,
      BaseView
    },
    data() {
      return {
        vuex_ns: 'FAQ',
        plone_ns: PLONE_NS,
        portal_type: PLONE_PT_DOCUMENT,
        sort_on: PLONE_INDEX_TITLE,
        sort_order: PLONE_ASC_ORDERING,
        tag: PLONE_TAG_FAQ,
      }
    },
    mounted() {
      this.$log.debug(this.name + ' mounted');
    },
    methods: {}

  }
</script>

<style scoped>

</style>
