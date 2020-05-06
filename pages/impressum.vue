<template>
  <base-view :vuex_ns="vuex_ns" :breadcrumb="vuex_ns" :display_info_column="true">
    <template slot="content">
      <plonepage_search :vuex_ns='plone_ns' :vuex_prop='tag' :portal_type="portal_type" :sort_on="sort_on" :sort_order="sort_order"
                        :tag="tag"></plonepage_search>
    </template>
  </base-view>
</template>

<script>
  import BaseView from "../components/page/views/BaseView";
  import plonepage_search from "../components/page/plone/plonepage_search";
  import {
    PLONE_INDEX_CREATED,
    PLONE_PT_DOCUMENT,
    PLONE_REVERSE_ORDERING,
    PLONE_TAG_IMPRESSUM
  } from "../components/configs/plone_keywords";
  import {VUEX_NAMESPACE as PLONE_NS} from '../store/plone'
  export default {
    name: "Impressum",
    components: {
      BaseView,
      plonepage_search
    },
    data() {
      return {
        vuex_ns: 'Impressum',
        plone_ns: PLONE_NS,
        portal_type: PLONE_PT_DOCUMENT,
        sort_on: PLONE_INDEX_CREATED,
        sort_order: PLONE_REVERSE_ORDERING,
        tag: PLONE_TAG_IMPRESSUM
      }
    },
    mounted() {
      this.$log.debug(this.name + ' mounted');
    },
  }
</script>

<style scoped>

</style>
