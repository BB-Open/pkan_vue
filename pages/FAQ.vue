<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <h1>Fragen und Antworten</h1>
      <plonepage></plonepage>
      <p>Oder</p>
      <plonelisting></plonelisting>
    </template>
  </base-view>
</template>

<script>
  import BaseView from '../components/page/BaseView';
  import plonepage from '../components/page/plone/plonepage';
  import plonelisting from '../components/page/plone/plonelisting'

  export default {
    name: "FAQ",
    components: {
      BaseView,
      plonepage,
      plonelisting
    },
  }
</script>

<style scoped>

</style>
