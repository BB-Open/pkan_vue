<template>
  <base-view :namespace="namespace" :breadcrumb="breadcrumb">
    <template slot="content">
      <plonepage_search :portal_type="pt" :sort_on="sort_on" :sort_order="sort_order" :tag="landing_tag"></plonepage_search>
      <div class="link-collection box_area">
        <nuxt-link class="box" to="/faq">Fragen und Antworten</nuxt-link>
        <nuxt-link class="box" to="/search">Einfache Suche</nuxt-link>
        <nuxt-link class="box" to="/search/sparql">SPARQL</nuxt-link>
        <nuxt-link class="box" to="/publisher">Datenbereitsteller</nuxt-link>
        <nuxt-link class="box" to="/contact">Kontakt</nuxt-link>
      </div>
      <h2>Die Neuesten Blogbeiträge:</h2>
      <plonelisting_url :portal_type="pt" :view_url="view_url" :sort_on="sort_on" :sort_order="sort_order" max_number="3" :tag="tag" style_class="box_area" element_style_class="box" >
      </plonelisting_url>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../components/page/views/BaseView';
  import plonepage_search from '../components/page/plone/plonepage_search';
  import plonelisting_url from '../components/page/plone/plonelisting_url'
  import {BLOG_URL} from "../components/configs/routing";
  import {
    PLONE_TAG_BLOG,
    PLONE_INDEX_CREATED, PLONE_TAG_LANDING,
    PLONE_PT_DOCUMENT,
    PLONE_REVERSE_ORDERING
  } from "../components/configs/plone_keywords";

  export default {
    name: 'Start',
    components: {
      BaseView,
      plonepage_search,
      plonelisting_url
    },
    data() {
      return {
        text: 'Text',
        namespace: 'Start',
        breadcrumb: null,
        view_url: BLOG_URL,
        sort_on: PLONE_INDEX_CREATED,
        sort_order: PLONE_REVERSE_ORDERING,
        tag: PLONE_TAG_BLOG,
        pt: PLONE_PT_DOCUMENT,
        landing_tag: PLONE_TAG_LANDING,
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
    },

  }
</script>

<style scoped>


</style>
