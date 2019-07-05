<template>
  <base-view :namespace="namespace" :breadcrumb="namespace">
    <template slot="content">
      <h1>Fragen und Antworten</h1>
      <plonelisting_url :view_url="view_url" :portal_type="portal_type" :sort_on="sort_on" :sort_order="sort_order" :tag="tag"></plonelisting_url>
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

  export default {
    name: 'Blog',
    components: {
      plonelisting_url,
      BaseView
    },
    data() {
      return {
        namespace: 'FAQ',
        view_url: BLOG_URL,
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
