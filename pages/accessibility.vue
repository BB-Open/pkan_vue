<template>
  <base-view :namespace="namespace" :breadcrumb="namespace" :display_info_column="true">
    <template slot="content">
      <plonepage_search :portal_type="portal_type" :sort_on="sort_on" :sort_order="sort_order"
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
    PLONE_TAG_ACCESS
  } from "../components/configs/plone_keywords";

  export default {
    name: "Accessibility",
    components: {
      BaseView,
      plonepage_search
    },
    data: function () {
      return {
        namespace: 'Accessibility',
        portal_type: PLONE_PT_DOCUMENT,
        sort_on: PLONE_INDEX_CREATED,
        sort_order: PLONE_REVERSE_ORDERING,
        tag: PLONE_TAG_ACCESS
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
