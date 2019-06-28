<template>
  <base-view :namespace="namespace" :breadcrumb="namespace">
    <template slot="content">
      <plonepage_search portal_type="Document" sort_on="created" sort_order="reverse" tag="accessibility"></plonepage_search>
    </template>
  </base-view>
</template>

<script>
  import BaseView from "../components/page/views/BaseView";
  import plonepage_search from "../components/page/plone/plonepage_search";

  export default {
    name: "Accessibility",
    components: {
      BaseView,
      plonepage_search
    },
    data() {
      return {
        namespace: 'Accessibility',
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
