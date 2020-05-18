<template>
  <base-view :vuex_ns="vuex_ns" :breadcrumb="vuex_ns" :display_info_column="true">
    <template slot="content">
      <h1>Datenbereitsteller</h1>
      <plonelisting_url :portal_type="portal_type" :view_url="view_url" :sort_on="sort_on" style_class="box_area"
                        element_style_class="box" :plone_ns="PLONE_NS" :plone_prop="plone_prop"></plonelisting_url>
    </template>
  </base-view>
</template>

<script>

  import plonelisting_url from "../../components/page/plone/plonelisting_url";
  import BaseView from "../../components/page/views/BaseView";
  import {PUBLISHER_URL} from "../../components/configs/routing";
  import {PLONE_INDEX_TITLE, PLONE_PT_PUBLISHER_CARD} from "../../components/configs/plone_keywords";
  import {write_aria_polite} from "../../components/mixins/utils";
  import {VUEX_NAMESPACE as PLONE_NS} from '../../store/plone'


  export default {
    name: 'Publisher',
    components: {
      plonelisting_url,
      BaseView
    },
    created() {
      
        this.vuex_ns = 'Publisher';
        this.view_url = PUBLISHER_URL;
        this.portal_type = PLONE_PT_PUBLISHER_CARD;
        this.sort_on = PLONE_INDEX_TITLE;
      this.PLONE_NS = PLONE_NS;
      this.plone_prop = 'publisher_listing'
    
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.vuex_ns + ' mounted');
      write_aria_polite(this, 'Die Seite Datenbereitsteller wurde geladen.');
    },

  }
</script>

<style scoped>

</style>
