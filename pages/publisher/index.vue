<template>
  <base-view :namespace="namespace" :breadcrumb="namespace" :display_info_column="true">
    <template slot="content">
      <h1>Datenbereitsteller</h1>
      <plonelisting_url :portal_type="portal_type" :view_url="view_url" :sort_on="sort_on" style_class="box_area"
                        element_style_class="box"></plonelisting_url>
    </template>
  </base-view>
</template>

<script>

  import plonelisting_url from "../../components/page/plone/plonelisting_url";
  import BaseView from "../../components/page/views/BaseView";
  import {PUBLISHER_URL} from "../../components/configs/routing";
  import {PLONE_INDEX_TITLE, PLONE_PT_PUBLISHER_CARD} from "../../components/configs/plone_keywords";

  export default {
    name: 'Publisher',
    components: {
      plonelisting_url,
      BaseView
    },
    data() {
      return {
        namespace: 'Publisher',
        view_url: PUBLISHER_URL,
        portal_type: PLONE_PT_PUBLISHER_CARD,
        sort_on: PLONE_INDEX_TITLE,
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
