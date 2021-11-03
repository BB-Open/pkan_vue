<template>
  <base-view :vuex_ns="name" :display_search="true">
    <template slot="content">
      <plonepage_search :vuex_ns="plone_ns" :vuex_prop="tag"  :portal_type="pt" :sort_on="sort_on" :sort_order="sort_order" :tag="landing_tag"
                        content_class="columnsgrey"></plonepage_search>
      <h2>Unsere Kategorien:</h2>
      <vocab-box
        :vocab_ns="voc_ns" vocab_prop='category'
        :target_ns="search_ns" target_prop='category_filter'
      ></vocab-box>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../components/page/views/BaseView';
  import plonepage_search from '../components/page/plone/plonepage_search';
  import {BLOG_URL} from "../components/configs/routing";
  import {
    PLONE_INDEX_CREATED,
    PLONE_PT_DOCUMENT,
    PLONE_REVERSE_ORDERING,
    PLONE_TAG_BLOG,
    PLONE_TAG_LANDING
  } from "../components/configs/plone_keywords";
  import {VUEX_NAMESPACE as PLONE_NS} from '../store/plone'
  import {VUEX_NAMESPACE as SEARCH_NS} from '../store/search_detail'
  import {VUEX_NAMESPACE as VOC_NS} from '../store/vocabularies'
  import VocabBox from "../components/controls/VocabBox";

  export default {
    name: 'Start',
    components: {
      BaseView,
      plonepage_search,
      VocabBox,
    },
    data() {
      return {
        text: 'Text',
        name: 'Startseite',
        plone_ns: PLONE_NS,
        search_ns: SEARCH_NS,
        voc_ns: VOC_NS,
        view_url: BLOG_URL,
        sort_on: PLONE_INDEX_CREATED,
        sort_order: PLONE_REVERSE_ORDERING,
        tag: PLONE_TAG_BLOG,
        pt: PLONE_PT_DOCUMENT,
        landing_tag: PLONE_TAG_LANDING,
      }
    },
    mounted() {
      this.$log.debug(this.name + ' mounted');
    },

  }
</script>

<style scoped>


</style>
