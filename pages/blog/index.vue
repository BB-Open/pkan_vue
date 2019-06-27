<template>
  <base-view :namespace="namespace">
    <template slot="content">
      <h1>{{ this.namespace }}</h1>
      <plonelisting_url portal_type="Document" view_url="blog" sort_on="created" sort_order="reverse" tag="blog"></plonelisting_url>

    </template>
  </base-view>
</template>

<script>
  import BaseView from '../../components/page/views/BaseView';
  import plonelisting_url from "../../components/page/plone/plonelisting_url";

  export default {
    name: 'Blog',
    components: {
      plonelisting_url,
      BaseView
    },
    data() {
      return {
        namespace: 'Blog',
      }
    },
    mounted() {
      // Force the initialization
      this.$log.debug(this.namespace + ' mounted');
    },
    methods: {
    }

  }
</script>

<style scoped>

</style>
