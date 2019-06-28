<template>
  <base-view :namespace="namespace" :breadcrumb="breadcrumb">
    <template slot="content">
      <plonepage_search portal_type="Document" sort_on="created" sort_order="reverse" tag="landing"></plonepage_search>
      <div class="link-collection box_area">
        <nuxt-link class="box" to="/faq">Fragen und Antworten</nuxt-link>
        <nuxt-link class="box" to="/search">Einfache Suche</nuxt-link>
        <nuxt-link class="box" to="/search/sparql">SPARQL</nuxt-link>
        <nuxt-link class="box" to="/publisher">Datenbereitsteller</nuxt-link>
        <nuxt-link class="box" to="/contact">Kontakt</nuxt-link>
      </div>
      <h2>Die Neuesten Blogbeiträge:</h2>
      <plonelisting_url portal_type="Document" view_url="blog" sort_on="created" sort_order="reverse" max_number="3" tag="blog" style_class="box_area" element_style_class="box" >
      </plonelisting_url>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../components/page/views/BaseView';
  import plonepage_search from '../components/page/plone/plonepage_search';
  import plonelisting_url from '../components/page/plone/plonelisting_url'

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
        breadcrumb: null
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
