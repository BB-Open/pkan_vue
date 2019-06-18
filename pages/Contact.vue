<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <h1>Kontakt</h1>
      <plonepage></plonepage>
    </template>
  </base-view>
</template>

<script>
    import BaseView from "../components/page/BaseView";
    import plonepage from "../components/page/plone/plonepage";

    export default {
        name: "Contact",
      components: {
        BaseView,
        plonepage
      },
    }
</script>

<style scoped>

</style>
