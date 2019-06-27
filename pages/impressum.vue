<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <h1>Impressum</h1>
      <plonepage></plonepage>
    </template>
  </base-view>
</template>

<script>

  import BaseView from '../components/page/BaseView';
  import plonepage from "../components/page/plone/plonepage";

  export default {
    name: 'Impressum',
    components: {
      BaseView,
      plonepage
    },
    data() {
      return {
        text: 'Text',
        namespace: 'Impressum'
      }
    }

  }
</script>

<style scoped>

</style>
