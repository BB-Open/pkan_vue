<template>
  <base-view :namespace="namespace" :breadcrumb="breadcrumb" :display_search="true">
    <template slot="content">
      <plonepage_search :portal_type="pt" :sort_on="sort_on" :sort_order="sort_order" :tag="landing_tag" content_class="twocolumnsgrey"></plonepage_search>
      <h2>Unsere Kategorien:</h2>
      <vocab-box vocab_name="category" :clean_value="true" search_field="category"></vocab-box>

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
  import VocabBox from "../components/controls/VocabBox";

  export default {
    name: 'Start',
    components: {
      BaseView,
      plonepage_search,
      plonelisting_url,
      VocabBox,
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
