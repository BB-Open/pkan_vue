<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <plonepage_search portal_type="Document" sort_on="created" sort_order="reverse" tag="contact"></plonepage_search>
    </template>
  </base-view>
</template>

<script>
    import BaseView from "../components/page/views/BaseView";
    import plonepage_search from "../components/page/plone/plonepage_search";

    export default {
        name: "Contact",
      components: {
        BaseView,
        plonepage_search
      },
    }
</script>

<style scoped>

</style>
