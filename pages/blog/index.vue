<template>
  <base-view :namespace="namespace" :breadcrumb="namespace">
    <template slot="content">
      <h1>{{ this.namespace }}</h1>
      <plonelisting_url :view_url="view_url" :portal_type="portal_type" :sort_on="sort_on" :sort_order="sort_order" :tag="tag"></plonelisting_url>

    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import plonelisting_url from "../../components/page/plone/plonelisting_url";
  import {BLOG_URL} from "../../components/configs/routing";
  import {
    PLONE_INDEX_CREATED,
    PLONE_PT_DOCUMENT,
    PLONE_REVERSE_ORDERING,
    PLONE_TAG_BLOG
  } from "../../components/configs/plone_keywords";

  export default {
    name: 'Blog',
    components: {
      plonelisting_url,
      BaseView
    },
    data() {
      return {
        namespace: 'Blog',
        view_url: BLOG_URL,
        portal_type: PLONE_PT_DOCUMENT,
        sort_on: PLONE_INDEX_CREATED,
        sort_order: PLONE_REVERSE_ORDERING,
        tag: PLONE_TAG_BLOG
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
