<template>
  <base-view :vuex_ns="vuex_ns" :breadcrumb="vuex_ns" :display_info_column="true">
    <template slot="content">
      <h1>{{ vuex_ns }}</h1>
      <plonelisting_url :view_url="view_url" :portal_type="portal_type" :sort_on="sort_on" :sort_order="sort_order"
                        :tag="tag" :display_date="true" :vuex_ns="PLONE_NS" :vuex_prop="plone_prop"></plonelisting_url>

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
  import {write_aria_polite} from "../../components/mixins/utils";
  import {VUEX_NAMESPACE as PLONE_NS} from '../../store/plone'

  export default {
    name: 'Blog',
    created () {
        this.view_url = BLOG_URL;
        this.portal_type = PLONE_PT_DOCUMENT;
        this.sort_on = PLONE_INDEX_CREATED;
        this.sort_order = PLONE_REVERSE_ORDERING;
        this.tag = PLONE_TAG_BLOG;
        this.PLONE_NS = PLONE_NS;
        this.plone_prop = 'blog_listing'
    },
    components: {
      plonelisting_url,
      BaseView
    },
    data() {
      return {
        vuex_ns: 'Blog',
        
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.vuex_ns + ' mounted');

      write_aria_polite(this, 'Die Seite ' + this.vuex_ns + ' wurde geladen.');


    },
    methods: {}

  }
</script>

<style scoped>

</style>
