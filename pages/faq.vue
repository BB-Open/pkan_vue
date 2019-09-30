<template>
  <base-view :namespace="namespace" :breadcrumb="namespace" :display_info_column="true">
    <template slot="content">
      <plonepage_search :portal_type="portal_type" :sort_on="sort_on" :sort_order="sort_order" :tag="tag"></plonepage_search>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../components/page/views/BaseView';
  import plonelisting_url from "../components/page/plone/plonelisting_url";
  import {BLOG_URL} from "../components/configs/routing";
  import {
    PLONE_PT_DOCUMENT,
    PLONE_INDEX_TITLE,
    PLONE_ASC_ORDERING,
    PLONE_TAG_FAQ
  } from "../components/configs/plone_keywords";
  import plonepage_search from "../components/page/plone/plonepage_search";

  export default {
    name: 'Blog',
    components: {
      plonepage_search,
      BaseView
    },
    data() {
      return {
        namespace: 'FAQ',
        portal_type: PLONE_PT_DOCUMENT,
        sort_on: PLONE_INDEX_TITLE,
        sort_order: PLONE_ASC_ORDERING,
        tag: PLONE_TAG_FAQ,
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
    },
    methods: {
    }

  }
</script>

<style scoped>

</style>
