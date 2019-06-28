<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <h1>Datenbereitsteller</h1>
      <plonelisting_url portal_type="PublisherCard" view_url="publisher" sort_on="sortable_title" style_class="box_area" element_style_class="box"></plonelisting_url>
    </template>
  </base-view>
</template>

<script>

  import plonelisting_url from "../../components/page/plone/plonelisting_url";
  import BaseView from "../../components/page/views/BaseView";

  export default {
    name: 'PlonePages',
    components: {
      plonelisting_url,
      BaseView
    },
    data() {
      return {
        namespace: 'Publisher',
      }
    },

  }
</script>

<style scoped>

</style>
